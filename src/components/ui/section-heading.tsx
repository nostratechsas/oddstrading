// 📖 Docs: obsidian/frontend/text-engine.md
/**
 * Section headline: a lead line in full colour above a muted one.
 *
 * Each line is its own `TextEngine` span rather than one engine with a `<br>` —
 * the engine renders a wrapping flex row, so a `<br>` between words is not a
 * line break it can honour. Two containers give exact control and let the
 * second line trail the first. `leading-display` is mandatory because
 * `overflow` clips each line to its line-height box.
 */
"use client";

import TextEngine from "spring-text-engine";

export interface SectionHeadingProps {
  /** Heading level — the tag carries meaning, the class carries looks. */
  tag?: "h1" | "h2" | "h3";
  lead: string;
  muted?: string;
  className?: string;
}

const LINE_CONFIG = { tension: 90, friction: 22 };

const LINE_PROPS = {
  mode: "once",
  lineIn: { y: "0%", opacity: 1 },
  lineOut: { y: "100%", opacity: 0 },
  lineConfig: LINE_CONFIG,
  overflow: true,
} as const;

export const SectionHeading = ({
  tag: Tag = "h2",
  lead,
  muted,
  className = "",
}: SectionHeadingProps) => (
  <Tag className={`text-headline leading-display font-normal tracking-tight ${className}`}>
    <TextEngine tag="span" {...LINE_PROPS} className="block justify-start text-left">
      {lead}
    </TextEngine>
    {muted ? (
      <TextEngine
        tag="span"
        {...LINE_PROPS}
        delayIn={120}
        className="block justify-start text-left text-foreground-subtle"
      >
        {muted}
      </TextEngine>
    ) : null}
  </Tag>
);
