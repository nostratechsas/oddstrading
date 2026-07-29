/**
 * Checkout view — a Server Component that resolves the pre-selected plan from
 * the query string and hands the rest to the client flow.
 */
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { checkoutContent, countries, paymentMethods } from "@/data/mocks/checkout";
import { brand, navLinks } from "@/data/mocks/home";
import { findPlan, plans } from "@/data/mocks/plans";
import { SiteHeader } from "@/components/common/site-header";

import { CheckoutFlow } from "./checkout-flow";

export interface CheckoutViewProps {
  /** `?plan=` slug — falls back to the featured tier when absent or unknown. */
  plan?: string;
}

export const CheckoutView = ({ plan }: CheckoutViewProps) => {
  const selected = findPlan(plan) ?? plans.find((item) => item.featured) ?? plans[0];

  return (
    <>
      <SiteHeader
        links={navLinks}
        mark={brand.mark}
        wordmark={brand.wordmark}
        logoAlt={brand.logoAlt}
      />

      <main className="pt-32 pb-24 md:pt-40">
        <Shell>
          <header className="mb-14 flex max-w-[62ch] flex-col items-start gap-5">
            <Eyebrow>{checkoutContent.eyebrow}</Eyebrow>
            <SectionHeading
              tag="h1"
              lead={checkoutContent.headline}
              muted={checkoutContent.headlineMuted}
            />
            <p className="max-w-[56ch] text-foreground-muted">{checkoutContent.lede}</p>
          </header>

          <CheckoutFlow
            plans={plans}
            countries={countries}
            methods={paymentMethods}
            guarantees={checkoutContent.guarantees}
            steps={checkoutContent.steps}
            initialPlan={selected.slug}
          />

          <p className="mt-12 text-sm text-foreground-subtle">
            ¿Necesitas condiciones especiales o facturación anual? Escríbenos a{" "}
            <a
              href={`mailto:${brand.email}`}
              className="text-accent-emphasis transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-action-primary-hover"
            >
              {brand.email}
            </a>
            .
          </p>
        </Shell>
      </main>
    </>
  );
};
