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
import type { CountryOption, PaymentMethod } from "@/data/mocks/checkout";
import type { Plan } from "@/data/mocks/plans";
import { ApiClientError, apiFetch } from "@/lib/api-client";

import { BillingFields, type BillingData } from "./billing-fields";
import { OrderSummary } from "./order-summary";
import { PaymentPicker } from "./payment-picker";
import { PlanPicker } from "./plan-picker";

export interface CheckoutFlowProps {
  plans: readonly Plan[];
  countries: readonly CountryOption[];
  methods: readonly PaymentMethod[];
  guarantees: readonly string[];
  initialPlan: string;
  steps: readonly { index: string; title: string; body: string }[];
}

interface CheckoutResult {
  reference: string;
  nextStep: string;
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
  <section aria-labelledby={`paso-${step.index}`} className="flex flex-col gap-5">
    <header className="flex flex-col gap-1">
      <span className="text-xs tracking-widest text-accent-emphasis">{step.index}</span>
      <h2 id={`paso-${step.index}`} className="text-xl font-normal tracking-tight">
        {step.title}
      </h2>
      <p className="text-sm text-foreground-muted">{step.body}</p>
    </header>
    {children}
  </section>
);

export const CheckoutFlow = ({
  plans,
  countries,
  methods,
  guarantees,
  initialPlan,
  steps,
}: CheckoutFlowProps) => {
  const [planSlug, setPlanSlug] = useState(initialPlan);
  const [billing, setBilling] = useState<BillingData>(EMPTY_BILLING);
  const [method, setMethod] = useState(methods[0].id);
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
      if (!billing[key].trim()) found[key] = "Este campo es obligatorio.";
    }
    if (billing.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(billing.email.trim())) {
      found.email = "Escribe un correo válido.";
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
      setResult(data);
      setStatus("done");
    } catch (error) {
      setFailure(
        error instanceof ApiClientError
          ? error.message
          : "No pudimos registrar la solicitud. Inténtalo de nuevo.",
      );
      setStatus("error");
    }
  };

  if (status === "done" && result) {
    return (
      <Bezel glow innerClassName="flex flex-col items-start gap-4 p-9">
        <h2 className="text-2xl font-normal tracking-tight">Solicitud registrada</h2>
        <p className="max-w-[60ch] text-foreground-muted">
          Tu referencia es{" "}
          <b className="font-normal text-accent-emphasis">{result.reference}</b>. {result.nextStep}
        </p>
        <p className="text-sm text-foreground-subtle">
          Enviamos una copia a {billing.email}. Plan {plan.name} · USD {plan.price} al mes.
        </p>
      </Bezel>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]"
    >
      <div className="flex min-w-0 flex-col gap-12">
        <Step step={steps[0]}>
          <PlanPicker plans={plans} value={planSlug} onChange={setPlanSlug} />
        </Step>

        <Step step={steps[1]}>
          <BillingFields
            countries={countries}
            value={billing}
            errors={errors}
            onChange={update}
          />
        </Step>

        <Step step={steps[2]}>
          <PaymentPicker methods={methods} value={method} onChange={setMethod} />
          <p className="text-xs text-foreground-subtle">
            No pedimos datos de tarjeta en esta página. Al confirmar te llevamos a la pasarela
            del proveedor, que es quien procesa y guarda el medio de pago.
          </p>
        </Step>
      </div>

      <div className="lg:sticky lg:top-28 lg:h-fit">
        <OrderSummary plan={plan} guarantees={guarantees}>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-pill bg-action-primary px-6 py-3.5 text-base font-medium tracking-tight text-action-primary-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-primary-hover disabled:opacity-60"
          >
            {status === "sending" ? "Procesando…" : "Confirmar contratación"}
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
