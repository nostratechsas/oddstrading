// 📖 Docs: obsidian/frontend/html-semantics.md
/**
 * Step 1 — plan selection. A real radio group, so it is keyboard-operable and
 * announced correctly; the cards are the labels.
 */
"use client";

import type { Plan } from "@/data/content/shapes";
import { formatUsd } from "@/utils/format/currency";

export interface PlanPickerProps {
  plans: readonly Plan[];
  value: string;
  onChange: (slug: string) => void;
  legend: string;
  perMonth: string;
  featuredBadge: string;
}

export const PlanPicker = ({
  plans,
  value,
  onChange,
  legend,
  perMonth,
}: PlanPickerProps) => (
  <fieldset className="flex flex-col gap-3">
    <legend className="sr-only">{legend}</legend>
    {plans.map((plan) => {
      const selected = plan.slug === value;
      return (
        <label
          key={plan.slug}
          className={`flex cursor-pointer items-start justify-between gap-5 rounded-card-inner border p-5 transition-colors duration-[var(--duration-fast)] ease-entrance ${
            selected
              ? "border-accent-soft-strong bg-accent-soft"
              : "border-border-hairline bg-surface-glass hover:bg-surface-raised"
          }`}
        >
          <span className="flex items-start gap-4">
            <input
              type="radio"
              name="plan"
              value={plan.slug}
              checked={selected}
              onChange={() => onChange(plan.slug)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-pill border ${
                selected ? "border-accent-emphasis" : "border-border-hairline-strong"
              }`}
            >
              {selected && <span className="h-2 w-2 rounded-pill bg-accent-emphasis" />}
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-base tracking-tight">{plan.name}</span>
              <span className="text-sm text-foreground-muted">{plan.scope}</span>
            </span>
          </span>

          <span className="shrink-0 text-right">
            <b className="block text-2xl font-light tracking-tight tabular-nums">
              {formatUsd(plan.price)}
            </b>
            <span className="text-xs text-foreground-subtle">{perMonth}</span>
          </span>
        </label>
      );
    })}
  </fieldset>
);
