// 📖 Docs: obsidian/frontend/html-semantics.md
/**
 * Coverage explorer — a real tablist over the three catalogues. Panels swap
 * with a spring fade so the transition is physical, not a hard cut.
 */
"use client";

import { animated, useSpring } from "@react-spring/web";
import { useId, useState } from "react";

import { Bezel } from "@/components/ui/bezel";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import type { SiteContent } from "@/data/content/es";

export interface CoverageSectionProps {
  content: SiteContent["coverage"];
}

export const CoverageSection = ({ content }: CoverageSectionProps) => {
  const groups = content.groups;
  const [active, setActive] = useState(groups[0].id);
  const baseId = useId();
  const group = groups.find((item) => item.id === active) ?? groups[0];

  const panel = useSpring({
    from: { opacity: 0, y: 10 },
    to: { opacity: 1, y: 0 },
    reset: true,
    key: active,
    config: { tension: 200, friction: 28 },
  });

  return (
    <section id="coverage" className="py-16 md:py-22">
      <Shell>
        <header className="mb-10 flex flex-wrap items-end justify-between gap-8">
          <div className="flex flex-col items-start gap-5">
            <Reveal>
              <Eyebrow>{content.eyebrow}</Eyebrow>
            </Reveal>
            <SectionHeading lead={content.headline} muted={content.headlineMuted} />
          </div>
          <Reveal step={2}>
            <p className="max-w-[52ch] text-foreground-muted">{content.lede}</p>
          </Reveal>
        </header>

        <div role="tablist" aria-label={content.tablistLabel} className="mb-4 flex flex-wrap gap-1.5">
          {groups.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${item.id}`}
                onClick={() => setActive(item.id)}
                className={`rounded-pill border px-4 py-2 text-sm transition-colors duration-[var(--duration-fast)] ease-entrance ${
                  selected
                    ? "border-transparent bg-foreground text-background"
                    : "border-border-hairline text-foreground-muted hover:bg-surface-glass hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <Reveal>
          <Bezel innerClassName="p-6 md:p-9">
            <animated.div
              style={panel}
              role="tabpanel"
              id={`${baseId}-panel-${group.id}`}
              aria-labelledby={`${baseId}-tab-${group.id}`}
            >
              <p className="mb-6 text-xs text-accent-emphasis">{group.summary}</p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={`${group.id}-${item.name}-${item.note ?? ""}`}
                    className="inline-flex items-center gap-2 rounded-pill border border-border-hairline bg-surface-glass px-4 py-2 text-sm transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-surface-raised"
                  >
                    {item.name}
                    {item.note && (
                      <span className="text-[0.6875rem] text-foreground-subtle">{item.note}</span>
                    )}
                  </li>
                ))}
              </ul>
            </animated.div>
          </Bezel>
        </Reveal>
      </Shell>
    </section>
  );
};
