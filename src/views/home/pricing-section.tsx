// 📖 Docs: obsidian/workflows/new-page.md
/**
 * Pricing — the three licence tiers plus the enterprise strip. Each CTA carries
 * its plan slug to `/checkout`, so the visitor lands on the flow with the tier
 * already selected.
 */
import { ActionLink } from "@/components/ui/action-link";
import { Bezel } from "@/components/ui/bezel";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { TickList } from "@/components/ui/tick-list";
import type { Plan } from "@/data/mocks/plans";
import { formatUsd } from "@/utils/format/currency";

export interface PricingSectionProps {
  plans: readonly Plan[];
  email: string;
}

export const PricingSection = ({ plans, email }: PricingSectionProps) => (
  <section id="precios" className="py-20 md:py-28">
    <Shell>
      <header className="mb-12 flex max-w-[62ch] flex-col items-start gap-5">
        <Reveal>
          <Eyebrow>Precios</Eyebrow>
        </Reveal>
        <SectionHeading lead="Transparente." muted="Sin sorpresas." />
        <Reveal step={2}>
          <p className="max-w-[52ch] text-foreground-muted">
            Licencia mensual en USD, impuestos no incluidos. Todos los planes incluyen la API
            REST, el esquema unificado y el onboarding con nuestro equipo de integración.
          </p>
        </Reveal>
      </header>

      <ul className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Reveal tag="li" key={plan.slug} step={index} className="h-full">
            <Bezel
              glow={plan.featured}
              className="h-full"
              innerClassName="relative flex h-full flex-col gap-2 p-7"
            >
              {plan.featured && (
                <span className="absolute top-7 right-7 rounded-pill border border-accent-soft-strong bg-accent-soft px-3 py-0.5 text-[0.625rem] tracking-[0.16em] text-accent-emphasis uppercase">
                  Más elegido
                </span>
              )}
              <h3 className="text-lg font-normal tracking-tight">{plan.name}</h3>
              <p className="min-h-[2.6em] max-w-[28ch] text-sm text-foreground-subtle">
                {plan.audience}
              </p>

              <p className="my-2 flex items-baseline gap-1.5 border-b border-border-hairline pb-5">
                <span className="text-xs text-foreground-subtle">USD</span>
                <b className="text-5xl font-light tracking-tight tabular-nums">
                  {formatUsd(plan.price)}
                </b>
                <span className="text-sm text-foreground-subtle">/mes</span>
              </p>

              <TickList items={plan.features} className="mb-6" />

              <ActionLink
                href={`/checkout?plan=${plan.slug}`}
                tone={plan.featured ? "primary" : "ghost"}
                icon={plan.featured ? "arrow" : "chevron"}
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
              con ingeniero asignado. Facturación anual y condiciones a medida.
            </p>
          </div>
          <ActionLink href={`mailto:${email}`} tone="light" size="lg">
            Hablar con ventas
          </ActionLink>
        </Bezel>
      </Reveal>
    </Shell>
  </section>
);
