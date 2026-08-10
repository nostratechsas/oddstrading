import { z } from "zod";

import { getServerEnv } from "@/env";
import { en } from "@/data/content/en";
import { ApiError, handle } from "@/lib/api";

/**
 * Order intake for the checkout flow.
 *
 * The handler is deliberately provider-agnostic: it validates the order, prices
 * it **server-side** from the plan catalogue in `data/content` (never from the
 * client payload),
 * and forwards it to whatever `CHECKOUT_ENDPOINT` points at — a payment
 * provider's session API, a CRM, or a billing webhook. Swap that upstream to go
 * live without touching the UI.
 *
 * It never receives card data. Card capture belongs to the provider's hosted
 * page, which is what keeps this app out of PCI-DSS scope.
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

/** Human-readable reference the buyer can quote in an email. */
const buildReference = (planSlug: string) =>
  `OT-${planSlug.slice(0, 3).toUpperCase()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

const NEXT_STEP: Record<z.infer<typeof orderSchema>["paymentMethod"], string> = {
  card: "Te enviamos por correo el enlace seguro para registrar la tarjeta y activar el cobro recurrente.",
  transfer:
    "Te enviamos la factura proforma con los datos bancarios en menos de 24 horas hábiles.",
  local: "Te enviamos por correo el enlace del proveedor local para completar el pago en tu moneda.",
};

export const POST = handle(async (req) => {
  const order = orderSchema.parse(await req.json());

  // Price from the catalogue, never from the request — otherwise a crafted
  // payload could set its own amount.
  // The catalogue is locale-independent (same slugs, same prices), so either
  // dictionary is authoritative for pricing.
  const plan = en.pricing.plans.find((item) => item.slug === order.plan);
  if (!plan) {
    throw new ApiError(400, "unknown_plan", "El plan solicitado no existe.");
  }
  // The free demo is not sold: it is requested through the contact form. A
  // crafted payload must not be able to open a USD 0 order here.
  if (plan.billing === "free") {
    throw new ApiError(400, "not_billable", "El plan demo no se contrata por este flujo.");
  }

  const payload = {
    reference: buildReference(plan.slug),
    plan: {
      slug: plan.slug,
      name: plan.name,
      amount: plan.price,
      currency: "USD",
      // A one-off setup fee must not reach the provider as a subscription.
      interval: plan.billing === "monthly" ? "month" : "one_time",
    },
    paymentMethod: order.paymentMethod,
    billing: order.billing,
  };

  const { CHECKOUT_ENDPOINT } = getServerEnv();

  if (CHECKOUT_ENDPOINT) {
    const upstream = await fetch(CHECKOUT_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!upstream.ok) {
      throw new ApiError(502, "upstream_error", "No pudimos registrar la contratación.");
    }
  } else {
    // No upstream configured — log server-side so the flow is testable as-is.
    console.log("[api/checkout] order:", payload);
  }

  return { reference: payload.reference, nextStep: NEXT_STEP[order.paymentMethod] };
});
