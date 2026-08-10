import { NextResponse } from "next/server";

import { getServerEnv } from "@/env";
import { getWompiConfig, verifyEvent, type WompiEvent } from "@/lib/wompi";

/**
 * Wompi transaction events.
 *
 * This is the **only** source of truth for whether an order was paid. The
 * redirect back from the hosted page is a browser navigation: a buyer can close
 * the tab, lose signal, or hand-write that URL. Treating the redirect as
 * confirmation would let anyone mark an order paid by visiting a link.
 *
 * Every event is verified against the merchant's events secret before anything
 * is acted on, and the endpoint always answers 200 once it has decided — Wompi
 * retries on any other status, and retrying a rejected forgery forever helps
 * nobody.
 */
export async function POST(request: Request) {
  const wompi = getWompiConfig();
  if (!wompi) {
    console.error("[webhooks/wompi] llegó un evento sin llaves configuradas");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  let event: WompiEvent;
  try {
    event = (await request.json()) as WompiEvent;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!verifyEvent(event, wompi.eventsSecret)) {
    // Not a retry-worthy failure: a bad signature will stay bad.
    console.warn("[webhooks/wompi] firma inválida, evento descartado");
    return NextResponse.json({ ok: false, error: "bad_signature" }, { status: 401 });
  }

  const tx = event.data.transaction;
  const record = {
    reference: tx.reference,
    transactionId: tx.id,
    status: tx.status,
    amountInCents: tx.amount_in_cents,
    currency: tx.currency,
    email: tx.customer_email ?? null,
  };

  // Forward to the same upstream the order was mirrored to, so the CRM sees
  // the payment land against the reference it already has.
  const { CHECKOUT_ENDPOINT } = getServerEnv();
  if (CHECKOUT_ENDPOINT) {
    try {
      await fetch(CHECKOUT_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "payment", ...record }),
      });
    } catch (error) {
      console.error("[webhooks/wompi] no se pudo reenviar el pago:", error);
    }
  }

  console.log("[webhooks/wompi]", record.status, record.reference, record.transactionId);

  return NextResponse.json({ ok: true });
}
