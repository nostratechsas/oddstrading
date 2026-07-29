// 📖 Docs: obsidian/frontend/text-engine.md
/**
 * The page's single `<h1>`. Each line is its own `TextEngine` span so the
 * breaks are deliberate — the engine renders a wrapping flex row, where a
 * `<br>` between words is not a break it can honour. The closing line carries
 * the brand gradient.
 */
"use client";

import TextEngine from "spring-text-engine";

export interface HeroHeadlineProps {
  lines: readonly string[];
  accent: string;
}

const LINE_PROPS = {
  mode: "once",
  lineIn: { y: "0%", opacity: 1 },
  lineOut: { y: "100%", opacity: 0 },
  lineConfig: { tension: 80, friction: 21 },
  overflow: true,
} as const;

export const HeroHeadline = ({ lines, accent }: HeroHeadlineProps) => (
  <h1 className="text-display leading-display font-light tracking-tight">
    {lines.map((line, index) => (
      <TextEngine
        key={line}
        tag="span"
        {...LINE_PROPS}
        delayIn={index * 110}
        className="block justify-start text-left"
      >
        {line}
      </TextEngine>
    ))}
    {/* `seo={false}`: the engine's hidden plain-text copy paints on top of the
        animated slots once the container is `bg-clip-text text-transparent`.
        The animated slots already carry the real text for crawlers. */}
    <TextEngine
      tag="span"
      {...LINE_PROPS}
      seo={false}
      delayIn={lines.length * 110}
      className="block justify-start bg-linear-100 from-brand-gradient-start via-brand-gradient-middle to-brand-gradient-end bg-clip-text text-left text-transparent"
    >
      {accent}
    </TextEngine>
  </h1>
);
