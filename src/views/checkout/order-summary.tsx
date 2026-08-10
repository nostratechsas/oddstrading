// 📖 Docs: obsidian/frontend/component-conventions.md
/**
 * Sticky order summary, in the currency actually charged.
 *
 * The plan is quoted in USD but billed in Colombian pesos, so this shows the
 * conversion, the rate it used and where that rate comes from **before** the
 * buyer commits. Charging an amount the buyer never saw is a consumer problem,
 * not a rounding detail.
 *
 * The figures here are a quote for display: `/api/checkout` recomputes them
 * server-side from the same TRM, and that is what the gateway is signed with.
 */
"use client";

import { Bezel } from "@/components/ui/bezel";
import type { SiteContent } from "@/data/content/es";
import type { Plan } from "@/data/content/shapes";
import { formatUsd } from "@/utils/format/currency";

/** Mirrors `IVA_RATE` in `lib/pricing.ts`, which is the authority. */
const IVA_RATE = 0.19;

export interface FxQuote {
  rate: number;
  from: string;
  to: string;
  spreadPercent: number;
}

export interface OrderSummaryProps {
  labels: SiteContent["checkout"]["summary"];
  plan: Plan;
  guarantees: readonly string[];
  /** Null when the official rate could not be reached. */
  fx: FxQuote | null;
  children?: React.ReactNode;
}

const cop = (amount: number) =>
  new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(amount);

const rate = (value: number) =>
  new Intl.NumberFormat("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
    value,
  );

export const OrderSummary = ({
  labels,
  plan,
  guarantees,
  fx,
  children,
}: OrderSummaryProps) => {
  const effectiveRate = fx ? fx.rate * (1 + fx.spreadPercent / 100) : 0;
  const subtotal = fx ? Math.round(plan.price * effectiveRate) : 0;
  const iva = Math.round(subtotal * IVA_RATE);
  const total = subtotal + iva;

  return (
    <Bezel glow innerClassName="flex flex-col gap-5 p-7">
      <h2 className="text-lg font-normal tracking-tight">{labels.title}</h2>

      <dl className="flex flex-col gap-3 border-b border-border-hairline pb-5 text-sm">
        <div className="flex items-start justify-between gap-4">
          <dt className="text-foreground-muted">{labels.plan}</dt>
          <dd className="text-right">
            {plan.name}
            <span className="block text-xs text-foreground-subtle">{plan.scope}</span>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-foreground-muted">{labels.cycle}</dt>
          <dd>{plan.billing === "monthly" ? labels.cycleValue : labels.cycleOnce}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-foreground-muted">{labels.subtotal}</dt>
          <dd className="tabular-nums">
            {fx ? `COP ${cop(subtotal)}` : `USD ${formatUsd(plan.price)}`}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-foreground-muted">{labels.taxes}</dt>
          <dd className="tabular-nums">{fx ? `COP ${cop(iva)}` : "—"}</dd>
        </div>
      </dl>

      {/* Where the peso figure comes from. Without this the buyer sees a number
          appear out of nowhere and has no way to check it. */}
      <div className="rounded-control border border-border-hairline bg-surface-glass px-4 py-3">
        <p className="text-[0.6875rem] tracking-[0.14em] text-foreground-subtle uppercase">
          {labels.fxLabel}
        </p>
        {fx ? (
          <>
            <p className="mt-1.5 text-sm tabular-nums">
              USD {formatUsd(plan.price)} × {rate(effectiveRate)}
            </p>
            <p className="mt-0.5 text-xs text-foreground-subtle">
              {labels.fxRate}: {rate(fx.rate)} · {labels.fxSource}
            </p>
          </>
        ) : (
          <p className="mt-1.5 text-xs text-signal-down">{labels.fxError}</p>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-foreground-muted">{labels.total}</span>
        <span className="text-3xl font-light tracking-tight tabular-nums">
          <span className="mr-1 text-xs text-foreground-subtle">COP</span>
          {fx ? cop(total) : "—"}
        </span>
      </div>

      {/* The recurring tier locks its peso amount at signup, so the buyer is
          told that here rather than discovering it on the second invoice. */}
      {plan.billing === "monthly" && fx && (
        <p className="rounded-control border border-accent-soft-strong bg-accent-soft px-4 py-3 text-xs leading-relaxed text-accent-emphasis">
          {labels.lockNotice}
        </p>
      )}

      {children}

      <ul className="flex flex-col gap-2 border-t border-border-hairline pt-5">
        {guarantees.map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs text-foreground-subtle">
            <i aria-hidden="true" className="h-1 w-1 shrink-0 rounded-pill bg-accent-emphasis" />
            {item}
          </li>
        ))}
      </ul>
    </Bezel>
  );
};
