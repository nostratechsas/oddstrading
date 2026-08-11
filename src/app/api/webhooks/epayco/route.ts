import { NextResponse } from "next/server";

import { getServerEnv } from "@/env";
import {
  getEpaycoConfig,
  readStatus,
  verifyConfirmation,
  type EpaycoConfirmation,
} from "@/lib/epayco";

/**
 * ePayco's confirmation URL.
 *
 * This is the **only** source of truth for whether an order was paid. The
 * response page the buyer lands on is a browser navigation: they can close the
 * tab, lose signal, or type that URL by hand. Treating it as confirmation would
 * let anyone mark an order paid by visiting a link.
 *
 * ePayco posts this as a form, not JSON, and retries when it does not get a
 * 200 — so a rejected forgery answers 401 once and is not retried forever,
 * while anything we accepted answers 200 even if the downstream mirror failed.
 */
export async function POST(request: Request) {
  const config = getEpaycoConfig();
  if (!config) {
    console.error("[webhooks/epayco] llegó una confirmación sin llaves configuradas");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  let body: EpaycoConfirmation;
  try {
    // ePayco sends application/x-www-form-urlencoded; some accounts are
    // configured for JSON, so both are accepted rather than assumed.
    const type = request.headers.get("content-type") ?? "";
    if (type.includes("application/json")) {
      body = (await request.json()) as EpaycoConfirmation;
    } else {
      body = Object.fromEntries(await request.formData()) as EpaycoConfirmation;
    }
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (!verifyConfirmation(body, config)) {
    // A bad signature stays bad; do not invite a retry loop.
    console.warn("[webhooks/epayco] firma inválida, confirmación descartada", {
      ref: body.x_ref_payco,
    });
    return NextResponse.json({ ok: false, error: "bad_signature" }, { status: 401 });
  }

  const record = {
    type: "payment" as const,
    gateway: "epayco",
    invoice: body.x_id_invoice ?? null,
    refPayco: body.x_ref_payco ?? null,
    transactionId: body.x_transaction_id ?? null,
    status: readStatus(body.x_response),
    rawStatus: body.x_response ?? null,
    amount: body.x_amount ?? null,
    currency: body.x_currency_code ?? null,
    email: body.x_customer_email ?? null,
    test: body.x_test_request === "TRUE",
  };

  // Mirror to the CRM or billing hook so it sees the payment land against the
  // invoice it already has. A failure here must not make ePayco retry: from the
  // gateway's side the confirmation was delivered.
  const { CHECKOUT_ENDPOINT } = getServerEnv();
  if (CHECKOUT_ENDPOINT) {
    try {
      await fetch(CHECKOUT_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (error) {
      console.error("[webhooks/epayco] no se pudo reenviar el pago:", error);
    }
  }

  console.log("[webhooks/epayco]", record.status, record.invoice, record.refPayco);

  return NextResponse.json({ ok: true });
}
