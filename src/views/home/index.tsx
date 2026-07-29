/**
 * Home view — a Server Component that assembles the OddsTrading landing page
 * and feeds every section its content from `data/mocks`. Interactivity lives in
 * the client leaves each section imports.
 */
import { SiteHeader } from "@/components/common/site-header";
import {
  bookmakerMarquee,
  brand,
  codeSamples,
  coverageGroups,
  faqs,
  footerColumns,
  heroContent,
  integrationSteps,
  liveBoard,
  navLinks,
  platformContent,
  sdks,
  stats,
  useCases,
} from "@/data/mocks/home";
import { plans } from "@/data/mocks/plans";

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

const TRUST = ["99,98% uptime", "Sub-120 ms", "190+ casas", "Soporte en español"];

const COVERAGE_LEDE =
  "Filtra por región, licencia, deporte o mercado. Si un operador existe y publica cuotas, lo más probable es que ya esté en el feed.";

export const HomeView = () => (
  <>
    <SiteHeader links={navLinks} logo={brand.logo} logoAlt={brand.logoAlt} />

    <main>
      <Hero
        eyebrow={heroContent.eyebrow}
        headline={heroContent.headline}
        headlineAccent={heroContent.headlineAccent}
        lede={heroContent.lede}
        note={heroContent.note}
        videoSrc={heroContent.videoSrc}
        board={liveBoard}
      />
      <BookmakerMarquee names={bookmakerMarquee} />
      <StatsBand stats={stats} />
      <PlatformSection content={platformContent} />
      <CoverageSection groups={coverageGroups} lede={COVERAGE_LEDE} />
      <IntegrationSection steps={integrationSteps} samples={codeSamples} sdks={sdks} />
      <UseCasesSection items={useCases} />
      <PricingSection plans={plans} email={brand.email} />
      <FaqSection items={faqs} email={brand.email} />
      <CtaSection trust={TRUST} />
    </main>

    <SiteFooter
      columns={footerColumns}
      logo={brand.logo}
      logoAlt={brand.logoAlt}
      tagline={brand.tagline}
      email={brand.email}
      legal={brand.legal}
      compliance={brand.compliance}
    />
  </>
);
