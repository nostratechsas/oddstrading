import { z } from "zod";

import { getServerEnv, publicEnv } from "@/env";
import { en } from "@/data/content/en";
import { ApiError, handle } from "@/lib/api";
import { buildCheckoutForm, buildInvoice, getEpaycoConfig } from "@/lib/epayco";
import { priceInCop } from "@/lib/pricing";

/**
 * Order intake for the checkout flow.
 *
 * This route **prices the order and hands back a signed payment form**. It does
 * not register a request for someone to follow up on: the browser posts that
 * form to ePayco and the buyer pays there.
 *
 * Everything that decides the amount happens here, never in the browser: the
 * plan comes from the catalogue, the peso figure from the day's TRM, the tax
 * from a constant, and the integrity signature is computed server-side. A
 * crafted payload cannot set its own total.
 *
 * Card data never touches this app. Capture belongs to ePayco's hosted page,
 * which is what keeps this out of PCI-DSS scope.
 */

const billingSchema = z.object({
  entity: z.enum(["company", "individual"]),
  legalName: z.string().min(1).max(160),
  taxId: z.string().min(1).max(40),
  contactName: z.string().min(1).max(120),
  email: z.email(),
  phone: z.string().max(40).optional().default(""),
  country: z.string().min(2).max(8),
  city: z.string().min(1).max(80),
  address: z.string().min(1).max(200),
  postalCode: z.string().max(20).optional().default(""),
});

const orderSchema = z.object({
  plan: z.string().min(1),
  paymentMethod: z.enum(["card", "transfer", "local"]),
  billing: billingSchema,
});

export const POST = handle(async (req) => {
  const order = orderSchema.parse(await req.json());

  // Price from the catalogue, never from the request. The catalogue is
  // locale-independent (same slugs, same prices), so either dictionary is
  // authoritative.
  const plan = en.pricing.plans.find((item) => item.slug === order.plan);
  if (!plan) {
    throw new ApiError(400, "unknown_plan", "El plan solicitado no existe.");
  }
  // The free demo is not sold: it is requested through the contact form. A
  // crafted payload must not be able to open a USD 0 order here.
  if (plan.billing === "free") {
    throw new ApiError(400, "not_billable", "El plan demo no se contrata por este flujo.");
  }

  let price;
  try {
    price = await priceInCop(plan);
  } catch (error) {
    // Quoting a guessed rate would be worse than refusing: the buyer would be
    // charged an amount nobody can justify afterwards.
    console.error("[api/checkout] no se pudo obtener la TRM:", error);
    throw new ApiError(
      503,
      "fx_unavailable",
      "No pudimos consultar la tasa de cambio oficial. Inténtalo en unos minutos.",
    );
  }

  const invoice = buildInvoice(plan.slug);
  const origin = publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const payload = {
    reference: invoice,
    plan: {
      slug: plan.slug,
      name: plan.name,
      listPriceUsd: plan.price,
      // A one-off setup fee must not reach the provider as a subscription.
      interval: plan.billing === "monthly" ? "month" : "one_time",
    },
    charge: {
      currency: "COP",
      subtotal: price.subtotalCop,
      iva: price.ivaCop,
      total: price.totalCop,
      // The monthly figure is locked at signup and never recalculated, so it
      // has to travel with the order for whoever bills the following cycles.
      lockedMonthly: price.recurring,
    },
    fx: {
      source: "TRM · Superintendencia Financiera",
      trm: price.conversion.trm.rate,
      validFrom: price.conversion.trm.from,
      validTo: price.conversion.trm.to,
      spreadPercent: price.conversion.spreadPercent,
      effectiveRate: price.conversion.effectiveRate,
    },
    paymentMethod: order.paymentMethod,
    billing: order.billing,
  };

  // Mirror the order to whatever CRM or billing hook is configured. This is
  // bookkeeping, not the payment: it must never block the buyer from paying.
  const { CHECKOUT_ENDPOINT } = getServerEnv();
  if (CHECKOUT_ENDPOINT) {
    try {
      await fetch(CHECKOUT_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("[api/checkout] no se pudo espejar la orden:", error);
    }
  } else {
    console.log("[api/checkout] orden:", payload);
  }

  const epayco = getEpaycoConfig();
  if (!epayco) {
    // Keys not configured yet — say so plainly instead of pretending the order
    // went through, which is exactly what the old "solicitud registrada" did.
    throw new ApiError(
      503,
      "gateway_unconfigured",
      "La pasarela de pagos todavía no está configurada en este entorno.",
    );
  }

  const form = buildCheckoutForm({
    config: epayco,
    invoice,
    description: `OddsTrading · plan ${plan.name}`,
    totalCop: price.totalCop,
    subtotalCop: price.subtotalCop,
    ivaCop: price.ivaCop,
    email: order.billing.email,
    responseUrl: `${origin}/checkout/resultado`,
    confirmationUrl: `${origin}/api/webhooks/epayco`,
  });

  return {
    reference: invoice,
    // The browser posts this; the signature travels inside it, so the amount
    // cannot be edited on the way.
    checkout: { action: form.action, fields: form.fields },
    charge: payload.charge,
    fx: payload.fx,
  };
});
