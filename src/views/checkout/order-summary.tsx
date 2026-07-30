// 📖 Docs: obsidian/frontend/component-conventions.md
/**
 * Sticky order summary. Tax is shown as "based on your country" rather than a
 * made-up rate: it depends on the buyer's jurisdiction and status, and the
 * invoicing provider is what resolves it.
 */
"use client";

import { Bezel } from "@/components/ui/bezel";
import type { SiteContent } from "@/data/content/es";
import type { Plan } from "@/data/content/shapes";
import { formatUsd } from "@/utils/format/currency";

export interface OrderSummaryProps {
  labels: SiteContent["checkout"]["summary"];
  plan: Plan;
  guarantees: readonly string[];
  children?: React.ReactNode;
}

export const OrderSummary = ({ labels, plan, guarantees, children }: OrderSummaryProps) => (
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
        <dd>{labels.cycleValue}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-foreground-muted">{labels.subtotal}</dt>
        <dd className="tabular-nums">USD {formatUsd(plan.price)}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-foreground-muted">{labels.taxes}</dt>
        <dd className="text-foreground-subtle">{labels.taxesValue}</dd>
      </div>
    </dl>

    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-foreground-muted">{labels.total}</span>
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
