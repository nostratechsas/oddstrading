// 📖 Docs: obsidian/frontend/text-engine.md
/**
 * Centred closing headline. `justify-center` does the real alignment work —
 * `text-center` alone is inert on the engine's flex container. Two engines,
 * one per line, because a `<br>` is not a break the engine can honour.
 */
"use client";

import TextEngine from "spring-text-engine";

export interface CtaHeadlineProps {
  lead: string;
  accent: string;
}

const LINE_PROPS = {
  mode: "once",
  lineIn: { y: "0%", opacity: 1 },
  lineOut: { y: "100%", opacity: 0 },
  lineConfig: { tension: 90, friction: 22 },
  overflow: true,
} as const;

export const CtaHeadline = ({ lead, accent }: CtaHeadlineProps) => (
  <h2 className="text-headline leading-display font-light tracking-tight">
    <TextEngine tag="span" {...LINE_PROPS} className="block justify-center text-center">
      {lead}
    </TextEngine>
    {/* See hero-headline.tsx — the SEO copy is disabled on gradient lines so it
        does not paint over the clipped text. */}
    <TextEngine
      tag="span"
      {...LINE_PROPS}
      seo={false}
      delayIn={120}
      className="block justify-center bg-linear-100 from-brand-gradient-start via-brand-gradient-middle to-brand-gradient-end bg-clip-text text-center text-transparent"
    >
      {accent}
    </TextEngine>
  </h2>
);
