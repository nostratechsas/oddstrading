// 📖 Docs: obsidian/workflows/new-page.md
/**
 * Showcase band — a full-viewport bento adapted from a dark portfolio layout.
 *
 * The band is **always dark**, in both themes: the glass borders and the video
 * card only read against a dark canvas. Its palette therefore comes from the
 * `--showcase-*` tokens, which are declared once and never flipped — the same
 * approach `--logo-plate` already takes for the opposite reason.
 *
 * Motion is spring-based (see [[ShowcaseMarquee]]); the reference design used
 * CSS keyframes, which hard rule #1 bans.
 */
import { ArrowUpRight, Sparkle } from "lucide-react";

import { ActionLink } from "@/components/ui/action-link";
import type { SiteContent } from "@/data/content/es";

import { ShowcaseMarquee } from "./showcase-marquee";

export interface ShowcaseSectionProps {
  content: SiteContent["showcase"];
  /** Locale route prefix, so the CTA keeps its language. */
  base: string;
  email: string;
  /** Brand film, reused as the moving backdrop of the pipeline card. */
  videoSrc: string;
}

/** Micro label with a spark on each side — the band's section marker. */
const BandLabel = ({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "start";
}) => (
  <p
    className={`flex items-center gap-2 ${align === "center" ? "justify-center" : "justify-start"}`}
  >
    <Sparkle className="h-3 w-3 text-showcase-ink-subtle" strokeWidth={1.5} aria-hidden="true" />
    <span className="text-[0.6875rem] tracking-[0.22em] text-showcase-ink-muted uppercase">
      {children}
    </span>
    <Sparkle className="h-3 w-3 text-showcase-ink-subtle" strokeWidth={1.5} aria-hidden="true" />
  </p>
);

export const ShowcaseSection = ({
  content,
  base,
  email,
  videoSrc,
}: ShowcaseSectionProps) => (
  <section
    aria-labelledby="showcase-title"
    className="bg-showcase-canvas px-4 py-6 text-showcase-ink sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-14"
  >
    <header className="mb-6 flex flex-col items-start justify-between gap-6 md:mb-8 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        <h2
          id="showcase-title"
          className="text-[1.75rem] leading-[1.15] font-normal tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem]"
        >
          {content.headline}{" "}
          <span className="text-showcase-ink-subtle">{content.headlineAccent}</span>
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-[1.6] text-showcase-ink-muted md:text-[0.9375rem]">
          {content.lede}
        </p>
      </div>

      <ActionLink href={`${base}/#contact`} tone="light" size="lg" className="shrink-0">
        {content.cta}
      </ActionLink>
    </header>

    <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
      {/* ── Column 1: the pipeline, over the brand film ─────────────────── */}
      <article className="relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-2xl bg-black p-5 md:p-6 lg:min-h-[30rem]">
        <video
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Keeps the timeline legible over whatever frame is playing. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/85"
        />

        <div className="relative z-1">
          <BandLabel>{content.pipeline.label}</BandLabel>
        </div>

        <ol className="relative z-1 grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3.5">
          {content.pipeline.steps.map((step) => (
            <li key={step.index} className="col-span-4 grid grid-cols-subgrid items-center">
              <span className="text-xs text-showcase-ink-subtle tabular-nums">{step.index}</span>
              <Sparkle
                className="h-3 w-3 text-showcase-ink-subtle"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="text-sm text-showcase-ink">{step.title}</span>
              <span className="text-right text-xs text-showcase-ink-muted">{step.detail}</span>
            </li>
          ))}
        </ol>
      </article>

      {/* ── Column 2: the case, then the headline number ────────────────── */}
      <div className="grid gap-4 md:gap-5 lg:grid-rows-[auto_minmax(0,1fr)]">
        <article className="noise-overlay relative overflow-hidden rounded-2xl bg-showcase-plate p-5 md:p-6">
          <BandLabel align="start">{content.quote.label}</BandLabel>
          <blockquote className="mt-4 text-[0.8125rem] leading-[1.6] text-showcase-ink/85 sm:text-[0.84375rem]">
            {content.quote.body}
          </blockquote>
          <footer className="mt-4 text-xs text-showcase-ink-muted">
            <b className="font-medium text-showcase-ink">{content.quote.author}</b>
            <span className="block">{content.quote.role}</span>
          </footer>
        </article>

        <article className="relative flex min-h-[13rem] flex-col items-center justify-center overflow-hidden rounded-2xl bg-black p-5 md:p-6">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,var(--brand-gradient-start),transparent_70%)] opacity-40"
          />
          <p className="relative z-1 text-5xl font-light tracking-tight tabular-nums drop-shadow-[0_2px_24px_rgb(0_0_0/0.6)] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {content.metric.value}
          </p>
          <p className="relative z-1 mt-3 text-center text-sm text-showcase-ink/85">
            {content.metric.caption}
          </p>
        </article>
      </div>

      {/* ── Column 3: the stack, then how to reach us ───────────────────── */}
      <div className="grid gap-4 md:col-span-2 md:gap-5 lg:col-span-1 lg:grid-rows-[minmax(0,1fr)_auto]">
        <article className="relative flex min-h-[16rem] flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-black p-5 md:p-6">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_0%,var(--brand-gradient-middle),transparent_65%)] opacity-25"
          />
          <div className="relative z-1">
            <BandLabel>{content.stack.label}</BandLabel>
          </div>

          <div className="relative z-1">
            <ShowcaseMarquee label={content.stack.marqueeLabel} />
          </div>
        </article>

        <article className="noise-overlay relative overflow-hidden rounded-2xl bg-showcase-plate p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <BandLabel align="start">{content.contact.label}</BandLabel>
              <a
                href={`mailto:${email}`}
                className="mt-3 block truncate text-sm text-showcase-ink transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent-emphasis"
              >
                {email}
              </a>
              <p className="text-sm text-showcase-ink-muted">{content.contact.site}</p>
            </div>

            <a
              href={`${base}/#contact`}
              aria-label={content.contact.linkLabel}
              className="liquid-glass grid h-9 w-9 shrink-0 place-items-center rounded-pill transition-transform duration-[var(--duration-fast)] ease-entrance hover:-translate-y-0.5"
            >
              <ArrowUpRight
                className="h-4 w-4 text-showcase-ink"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
);
