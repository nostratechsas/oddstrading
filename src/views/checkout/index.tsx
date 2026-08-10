/**
 * Checkout view — a Server Component that resolves the pre-selected plan from
 * the query string and hands the rest to the client flow. Locale comes in as
 * content, so `/checkout` and `/es/checkout` are the same tree.
 */
import { LocaleNotice } from "@/components/common/locale-notice";
import { SiteHeader } from "@/components/common/site-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import type { SiteContent } from "@/data/content/es";
import { brand, countries } from "@/data/content/shapes";

import { CheckoutFlow } from "./checkout-flow";

export interface CheckoutViewProps {
  content: SiteContent;
  /** `?plan=` slug — falls back to the featured tier when absent or unknown. */
  plan?: string;
}

export const CheckoutView = ({ content, plan }: CheckoutViewProps) => {
  // The free demo has nothing to bill, so it never reaches this flow: its card
  // links to the contact form instead. A stale `?plan=demo` therefore falls
  // back to the featured tier rather than rendering a USD 0 order.
  const plans = content.pricing.plans.filter((item) => item.billing !== "free");
  const selected =
    plans.find((item) => item.slug === plan) ?? plans.find((item) => item.featured) ?? plans[0];

  return (
    <div lang={content.htmlLang}>
      <SiteHeader
        links={content.nav.links}
        mark={brand.mark}
        wordmark={brand.wordmark}
        logoAlt={brand.logoAlt}
        labels={content.nav}
        ctaHref={`${content.base}/checkout`}
      />

      <LocaleNotice
        {...content.notice}
        href={`${content.notice.href === "/" ? "" : content.notice.href}/checkout`}
      />

      <main className="pt-32 pb-24 md:pt-40">
        <Shell>
          <header className="mb-14 flex max-w-[62ch] flex-col items-start gap-5">
            <Eyebrow>{content.checkout.eyebrow}</Eyebrow>
            <SectionHeading
              tag="h1"
              lead={content.checkout.headline}
              muted={content.checkout.headlineMuted}
            />
            <p className="max-w-[56ch] text-foreground-muted">{content.checkout.lede}</p>
          </header>

          <CheckoutFlow
            content={content.checkout}
            plans={plans}
            countries={countries}
            initialPlan={selected.slug}
            billingLabels={content.pricing.billingLabels}
          />

          <p className="mt-12 text-sm text-foreground-subtle">
            {content.checkout.contactPrefix}{" "}
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
    </div>
  );
};
