/**
 * Turns a plan's USD price into the peso amount actually charged.
 *
 * **Server-only.** The breakdown is computed here and never taken from the
 * client: a crafted payload must not be able to set its own total.
 */
import type { Plan } from "@/data/content/shapes";
import { usdToCop, type Conversion } from "@/lib/fx";

/** Colombian VAT. Added on top of the plan price, which is quoted net. */
export const IVA_RATE = 0.19;

export interface PriceBreakdown {
  /** List price, as published on the pricing page. */
  usd: number;
  conversion: Conversion;
  /** Net amount in pesos, before tax. */
  subtotalCop: number;
  ivaCop: number;
  totalCop: number;
  /** What the gateway wants: an integer of cents. */
  totalCents: number;
  /**
   * True when the amount repeats every month. The peso figure is locked at
   * signup and never recalculated — see the note in `checkout` content.
   */
  recurring: boolean;
}

export async function priceInCop(plan: Plan): Promise<PriceBreakdown> {
  const conversion = await usdToCop(plan.price);

  // Tax is computed on the converted subtotal, then rounded to the peso, so
  // subtotal + IVA always equals the total exactly. Rounding each part
  // independently would leave a one-peso gap the invoice cannot explain.
  const subtotalCop = conversion.cop;
  const ivaCop = Math.round(subtotalCop * IVA_RATE);
  const totalCop = subtotalCop + ivaCop;

  return {
    usd: plan.price,
    conversion,
    subtotalCop,
    ivaCop,
    totalCop,
    totalCents: totalCop * 100,
    recurring: plan.billing === "monthly",
  };
}

/** `1234567` → `"1.234.567"`, the Colombian convention. */
export const formatCop = (amount: number): string =>
  new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(amount);

/** `3157.43` → `"3.157,43"`. */
export const formatRate = (rate: number): string =>
  new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rate);
