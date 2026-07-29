// 📖 Docs: obsidian/workflows/new-page.md
/**
 * Pricing — monthly/annual switch plus the enterprise strip. Prices spring
 * between the two cycles instead of snapping.
 */
"use client";

import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";

import { ActionLink } from "@/components/ui/action-link";
import { Bezel } from "@/components/ui/bezel";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { TickList } from "@/components/ui/tick-list";
import type { Plan } from "@/data/mocks/home";

export interface PricingSectionProps {
  plans: readonly Plan[];
}

type Cycle = "monthly" | "yearly";

const PlanPrice = ({ plan, cycle }: { plan: Plan; cycle: Cycle }) => {
  const { amount } = useSpring({
    amount: cycle === "yearly" ? plan.yearly : plan.monthly,
    config: { tension: 190, friction: 26 },
  });

  return (
    <p className="my-2 flex items-baseline gap-1.5 border-b border-border-hairline pb-5">
      <span className="text-xs text-foreground-subtle">USD</span>
      <b className="text-5xl font-light tracking-tight tabular-nums">
        <animated.span>{amount.to((value) => Math.round(value))}</animated.span>
      </b>
      <span className="text-sm text-foreground-subtle">
        {cycle === "yearly" ? "/mes, facturado anual" : "/mes"}
      </span>
    </p>
  );
};

export const PricingSection = ({ plans }: PricingSectionProps) => {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <section id="precios" className="py-20 md:py-28">
      <Shell>
        <header className="mb-12 flex max-w-[62ch] flex-col items-start gap-5">
          <Reveal>
            <Eyebrow>Precios</Eyebrow>
          </Reveal>
          <SectionHeading lead="Transparente." muted="Sin sorpresas." />
          <Reveal step={2}>
            <p className="max-w-[52ch] text-foreground-muted">
              Todos los planes incluyen REST, esquema unificado y acceso al histórico de 30 días.
            </p>
          </Reveal>
          <Reveal step={3}>
            <div
              role="group"
              aria-label="Ciclo de facturación"
              className="inline-flex gap-1 rounded-pill border border-border-hairline bg-surface-glass p-1"
            >
              {(["monthly", "yearly"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={cycle === option}
                  onClick={() => setCycle(option)}
                  className={`rounded-pill px-4 py-2 text-sm transition-colors duration-[var(--duration-fast)] ease-entrance ${
                    cycle === option
                      ? "bg-foreground text-background"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {option === "monthly" ? "Mensual" : "Anual"}
                  {option === "yearly" && (
                    <span className={cycle === option ? "ml-1.5 text-xs" : "ml-1.5 text-xs text-accent-emphasis"}>
                      −20%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Reveal>
        </header>

        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <Reveal tag="li" key={plan.name} step={index} className="h-full">
              <Bezel glow={plan.featured} className="h-full" innerClassName="relative flex h-full flex-col gap-2 p-7">
                {plan.featured && (
                  <span className="absolute top-7 right-7 rounded-pill border border-accent-soft-strong bg-accent-soft px-3 py-0.5 text-[0.625rem] tracking-[0.16em] text-accent-emphasis uppercase">
                    Más elegido
                  </span>
                )}
                <h3 className="text-lg font-normal tracking-tight">{plan.name}</h3>
                <p className="min-h-[2.6em] text-sm text-foreground-subtle">{plan.audience}</p>
                <PlanPrice plan={plan} cycle={cycle} />
                <TickList items={plan.features} className="mb-6" />
                <ActionLink
                  href="#contacto"
                  tone={plan.featured ? "primary" : "ghost"}
                  icon={plan.featured ? "arrow" : "none"}
                  fullWidth
                  className="mt-auto"
                >
                  {plan.cta}
                </ActionLink>
              </Bezel>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-4">
          <Bezel innerClassName="flex flex-wrap items-center justify-between gap-8 p-9">
            <div>
              <span className="text-[0.625rem] tracking-[0.22em] text-accent-emphasis uppercase">
                Enterprise
              </span>
              <h3 className="mt-3 mb-2 text-2xl font-normal tracking-tight">
                Infraestructura dedicada, límites a medida
              </h3>
              <p className="max-w-[56ch] text-[0.9375rem] text-foreground-muted">
                Nodo privado en tu región, feeds personalizados, contrato con SLA y soporte 24/7
                con ingeniero asignado.
              </p>
            </div>
            <ActionLink href="#contacto" tone="light" size="lg">
              Hablar con ventas
            </ActionLink>
          </Bezel>
        </Reveal>
      </Shell>
    </section>
  );
};
