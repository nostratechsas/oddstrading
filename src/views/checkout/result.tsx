/**
 * Landing page after Wompi's hosted checkout.
 *
 * Deliberately does **not** claim the payment succeeded. This page is reached
 * by a browser redirect, which anyone can type; the webhook is what actually
 * confirms a charge. So it acknowledges the return, shows the reference, and
 * says the confirmation arrives by email once the gateway reports it.
 */
import Link from "next/link";

import { LocaleNotice } from "@/components/common/locale-notice";
import { SiteHeader } from "@/components/common/site-header";
import { ActionLink } from "@/components/ui/action-link";
import { Bezel } from "@/components/ui/bezel";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import type { SiteContent } from "@/data/content/es";
import { brand } from "@/data/content/shapes";
import { appUrl } from "@/lib/site";

export interface CheckoutResultViewProps {
  content: SiteContent;
  reference?: string;
  transactionId?: string;
}

export const CheckoutResultView = ({
  content,
  reference,
  transactionId,
}: CheckoutResultViewProps) => {
  const copy = content.checkout.result;

  return (
    <div lang={content.htmlLang}>
      <SiteHeader
        links={content.nav.links}
        mark={brand.mark}
        wordmark={brand.wordmark}
        logoAlt={brand.logoAlt}
        labels={content.nav}
        ctaHref={`${content.base}/checkout`}
        signInHref={`${appUrl}/login`}
      />

      <LocaleNotice {...content.notice} />

      <main className="pt-32 pb-24 md:pt-40">
        <Shell>
          <header className="mb-10 flex max-w-[62ch] flex-col items-start gap-5">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <SectionHeading tag="h1" lead={copy.headline} muted={copy.headlineMuted} />
          </header>

          <Bezel glow innerClassName="flex flex-col items-start gap-5 p-9">
            <p className="max-w-[62ch] text-foreground-muted">{copy.body}</p>

            {reference && (
              <dl className="flex flex-col gap-2 text-sm">
                <div className="flex flex-wrap gap-2">
                  <dt className="text-foreground-subtle">{copy.referenceLabel}</dt>
                  <dd className="font-medium text-accent-emphasis tabular-nums">{reference}</dd>
                </div>
                {transactionId && (
                  <div className="flex flex-wrap gap-2">
                    <dt className="text-foreground-subtle">{copy.transactionLabel}</dt>
                    <dd className="font-medium tabular-nums">{transactionId}</dd>
                  </div>
                )}
              </dl>
            )}

            <div className="mt-2 flex flex-wrap gap-3">
              <ActionLink href={`${content.base}/`}>{copy.backHome}</ActionLink>
              <Link
                href={`mailto:${brand.email}?subject=${encodeURIComponent(
                  `${copy.mailSubject}${reference ? ` ${reference}` : ""}`,
                )}`}
                className="inline-flex items-center rounded-pill border border-border-hairline px-5 py-2.5 text-sm text-foreground-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
              >
                {brand.email}
              </Link>
            </div>
          </Bezel>

          <p className="mt-6 max-w-[62ch] text-xs text-foreground-subtle">{copy.note}</p>
        </Shell>
      </main>
    </div>
  );
};
