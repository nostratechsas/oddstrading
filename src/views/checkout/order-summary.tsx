// 📖 Docs: obsidian/frontend/component-conventions.md
/**
 * Sticky order summary. Tax is shown as "por calcular" rather than a made-up
 * rate: it depends on the buyer's country and tax status, and the invoicing
 * provider is the one that resolves it.
 */
"use client";

import { Bezel } from "@/components/ui/bezel";
import type { Plan } from "@/data/mocks/plans";
import { formatUsd } from "@/utils/format/currency";

export interface OrderSummaryProps {
  plan: Plan;
  guarantees: readonly string[];
  children?: React.ReactNode;
}

export const OrderSummary = ({ plan, guarantees, children }: OrderSummaryProps) => (
  <Bezel glow innerClassName="flex flex-col gap-5 p-7">
    <h2 className="text-lg font-normal tracking-tight">Resumen</h2>

    <dl className="flex flex-col gap-3 border-b border-border-hairline pb-5 text-sm">
      <div className="flex items-start justify-between gap-4">
        <dt className="text-foreground-muted">Plan</dt>
        <dd className="text-right">
          {plan.name}
          <span className="block text-xs text-foreground-subtle">{plan.scope}</span>
        </dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-foreground-muted">Ciclo</dt>
        <dd>Mensual</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-foreground-muted">Subtotal</dt>
        <dd className="tabular-nums">USD {formatUsd(plan.price)}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-foreground-muted">Impuestos</dt>
        <dd className="text-foreground-subtle">Según tu país</dd>
      </div>
    </dl>

    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-foreground-muted">Total mensual</span>
      <span className="text-3xl font-light tracking-tight tabular-nums">
        <span className="mr-1 text-xs text-foreground-subtle">USD</span>
        {formatUsd(plan.price)}
      </span>
    </div>

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
