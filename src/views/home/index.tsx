/**
 * Home view — a Server Component that assembles the landing page for one
 * locale. Everything it renders comes from the `content` object, so `/` and
 * `/es` are the same tree with a different dictionary.
 */
import { LocaleNotice } from "@/components/common/locale-notice";
import { SiteHeader } from "@/components/common/site-header";
import { bookmakers } from "@/data/mocks/bookmakers";
import type { SiteContent } from "@/data/content/es";
import { brand } from "@/data/content/shapes";
import { getBookmakerLogo } from "@/utils/assets/bookmaker-logos";

import { BookmakerMarquee } from "./bookmaker-marquee";
import { CoverageSection } from "./coverage-section";
import { CtaSection } from "./cta-section";
import { FaqSection } from "./faq-section";
import { Hero } from "./hero";
import { IntegrationSection } from "./integration-section";
import { PlatformSection } from "./platform-section";
import { PricingSection } from "./pricing-section";
import { SiteFooter } from "./site-footer";
import { StatsBand } from "./stats-band";
import { UseCasesSection } from "./use-cases-section";

export interface HomeViewProps {
  content: SiteContent;
}

export const HomeView = ({ content }: HomeViewProps) => {
  // Resolved on the server. Only operators whose official file is actually on
  // disk make the wall — the catalogue stays the full registry, so dropping a
  // licensed file into public/assets/bookmakers/ is still all it takes to add
  // one back (ADR-0021).
  const wall = bookmakers.flatMap((item) => {
    const logo = getBookmakerLogo(item.slug);
    return logo ? [{ slug: item.slug, name: item.name, logo }] : [];
  });

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

      <LocaleNotice {...content.notice} />

      <main>
        <Hero content={content} />
        <BookmakerMarquee items={wall} label={content.wall.label} />
        <StatsBand stats={content.stats} label={content.statsLabel} />
        <PlatformSection content={content.platform} />
        <CoverageSection content={content.coverage} />
        <IntegrationSection content={content.integration} samples={content.codeSamples} />
        <UseCasesSection content={content.useCases} />
        <PricingSection content={content.pricing} base={content.base} email={brand.email} />
        <FaqSection content={content.faq} email={brand.email} />
        <CtaSection content={content.cta} />
      </main>

      <SiteFooter
        content={content.footer}
        mark={brand.mark}
        wordmark={brand.wordmark}
        logoAlt={brand.logoAlt}
        email={brand.email}
      />
    </div>
  );
};
