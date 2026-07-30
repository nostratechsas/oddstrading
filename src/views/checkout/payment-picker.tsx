// 📖 Docs: obsidian/frontend/html-semantics.md
/**
 * Step 3 — how the buyer wants to pay.
 *
 * This only records the *choice*. Card numbers are never entered here: the
 * confirmation hands off to the provider's hosted page, which is what keeps the
 * site outside PCI-DSS scope.
 */
"use client";

import type { PaymentMethod } from "@/data/content/shapes";

export interface PaymentPickerProps {
  methods: readonly PaymentMethod[];
  value: string;
  onChange: (id: string) => void;
  legend: string;
}

export const PaymentPicker = ({ methods, value, onChange, legend }: PaymentPickerProps) => (
  <fieldset className="flex flex-col gap-3">
    <legend className="sr-only">{legend}</legend>
    {methods.map((method) => {
      const selected = method.id === value;
      return (
        <label
          key={method.id}
          className={`flex cursor-pointer flex-col gap-1 rounded-card-inner border p-5 transition-colors duration-[var(--duration-fast)] ease-entrance ${
            selected
              ? "border-accent-soft-strong bg-accent-soft"
              : "border-border-hairline bg-surface-glass hover:bg-surface-raised"
          }`}
        >
          <span className="flex items-center gap-4">
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selected}
              onChange={() => onChange(method.id)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`grid h-4 w-4 shrink-0 place-items-center rounded-pill border ${
                selected ? "border-accent-emphasis" : "border-border-hairline-strong"
              }`}
            >
              {selected && <span className="h-2 w-2 rounded-pill bg-accent-emphasis" />}
            </span>
            <span className="text-base tracking-tight">{method.label}</span>
          </span>
          <span className="pl-8 text-sm text-foreground-muted">{method.detail}</span>
          {selected && (
            <span className="pl-8 text-xs text-accent-emphasis">{method.handoff}</span>
          )}
        </label>
      );
    })}
  </fieldset>
);
