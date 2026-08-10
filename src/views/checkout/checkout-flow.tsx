// 📖 Docs: obsidian/backend/api-architecture.md
/**
 * Checkout state machine: plan → billing data → payment method → confirmation.
 *
 * The order is submitted to the same-origin `/api/checkout` route, which is
 * where the payment provider gets called. Nothing card-shaped is collected
 * here by design — see `payment-picker.tsx`.
 */
"use client";

import { useState } from "react";

import { Bezel } from "@/components/ui/bezel";
import type { SiteContent } from "@/data/content/es";
import type { Billing, CountryOption, Plan } from "@/data/content/shapes";
import { ApiClientError, apiFetch } from "@/lib/api-client";
import { formatUsd } from "@/utils/format/currency";

import { BillingFields, type BillingData } from "./billing-fields";
import { OrderSummary, type FxQuote } from "./order-summary";
import { PaymentPicker } from "./payment-picker";
import { PlanPicker } from "./plan-picker";

export interface CheckoutFlowProps {
  content: SiteContent["checkout"];
  plans: readonly Plan[];
  countries: readonly CountryOption[];
  initialPlan: string;
  /** Suffix per billing cadence, shared with the pricing section. */
  billingLabels: Record<Billing, string>;
  /** Day's official rate, resolved on the server. Null when unreachable. */
  fx: FxQuote | null;
}

interface CheckoutResult {
  reference: string;
  /** Wompi's hosted checkout, already signed. */
  redirectUrl: string;
}

const EMPTY_BILLING: BillingData = {
  entity: "company",
  legalName: "",
  taxId: "",
  contactName: "",
  email: "",
  phone: "",
  country: "CO",
  city: "",
  address: "",
  postalCode: "",
};

const REQUIRED: (keyof BillingData)[] = [
  "legalName",
  "taxId",
  "contactName",
  "email",
  "address",
  "city",
];

const Step = ({
  step,
  children,
}: {
  step: { index: string; title: string; body: string };
  children: React.ReactNode;
}) => (
  <section aria-labelledby={`step-${step.index}`} className="flex flex-col gap-5">
    <header className="flex flex-col gap-1">
      <span className="text-xs tracking-widest text-accent-emphasis">{step.index}</span>
      <h2 id={`step-${step.index}`} className="text-xl font-normal tracking-tight">
        {step.title}
      </h2>
      <p className="text-sm text-foreground-muted">{step.body}</p>
    </header>
    {children}
  </section>
);

export const CheckoutFlow = ({
  content,
  plans,
  countries,
  initialPlan,
  billingLabels,
  fx,
}: CheckoutFlowProps) => {
  const [planSlug, setPlanSlug] = useState(initialPlan);
  const [billing, setBilling] = useState<BillingData>(EMPTY_BILLING);
  const [method, setMethod] = useState(content.payment.methods[0].id);
  const [errors, setErrors] = useState<Partial<Record<keyof BillingData, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [result, setResult] = useState<CheckoutResult | null>(null);
  const [failure, setFailure] = useState("");

  const plan = plans.find((item) => item.slug === planSlug) ?? plans[0];

  const update = <K extends keyof BillingData>(key: K, next: BillingData[K]) => {
    setBilling((current) => ({ ...current, [key]: next }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const found: Partial<Record<keyof BillingData, string>> = {};
    for (const key of REQUIRED) {
      if (!billing[key].trim()) found[key] = content.billing.required;
    }
    if (billing.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(billing.email.trim())) {
      found.email = content.billing.invalidEmail;
    }
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      const data = await apiFetch<CheckoutResult>("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ plan: plan.slug, paymentMethod: method, billing }),
      });
      // Straight to the gateway. `status` stays "sending" on purpose: the
      // button must not go idle while the browser is navigating away, or a
      // double click would open two orders.
      window.location.assign(data.redirectUrl);
    } catch (error) {
      setFailure(error instanceof ApiClientError ? error.message : content.done.failure);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]"
    >
      <div className="flex min-w-0 flex-col gap-12">
        <Step step={content.steps[0]}>
          <PlanPicker
            plans={plans}
            value={planSlug}
            onChange={setPlanSlug}
            legend={content.planLegend}
            billingLabels={billingLabels}
            featuredBadge={content.summary.plan}
          />
        </Step>

        <Step step={content.steps[1]}>
          <BillingFields
            labels={content.billing}
            countries={countries}
            value={billing}
            errors={errors}
            onChange={update}
          />
        </Step>

        <Step step={content.steps[2]}>
          <PaymentPicker
            legend={content.payment.legend}
            methods={content.payment.methods}
            value={method}
            onChange={setMethod}
          />
          <p className="text-xs text-foreground-subtle">{content.payment.disclaimer}</p>
        </Step>
      </div>

      <div className="lg:sticky lg:top-28 lg:h-fit">
        <OrderSummary
          labels={content.summary}
          plan={plan}
          guarantees={content.guarantees}
          fx={fx}
        >
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-pill bg-action-primary px-6 py-3.5 text-base font-medium tracking-tight text-action-primary-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-primary-hover disabled:opacity-60"
          >
            {status === "sending" ? content.summary.sending : content.summary.submit}
          </button>
          {status === "error" && (
            <p role="alert" className="text-xs text-signal-down">
              {failure}
            </p>
          )}
        </OrderSummary>
      </div>
    </form>
  );
};
