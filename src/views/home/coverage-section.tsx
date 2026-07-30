// 📖 Docs: obsidian/frontend/html-semantics.md
/**
 * Coverage explorer — a real tablist over the three catalogues. The selection
 * rides a pill that slides between tabs ([[TabRail]]) and the panel enters from
 * the side the rail moved, so a switch reads as travel across one surface
 * rather than two unrelated cuts. See ADR-0022.
 */
"use client";

import { animated, useSpring } from "@react-spring/web";
import { useCallback, useId, useState } from "react";

import { Bezel } from "@/components/ui/bezel";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { TabRail } from "@/components/ui/tab-rail";
import type { SiteContent } from "@/data/content/es";

export interface CoverageSectionProps {
  content: SiteContent["coverage"];
}

/** How far off-axis the incoming panel starts, in px. */
const PANEL_TRAVEL = 28;

export const CoverageSection = ({ content }: CoverageSectionProps) => {
  const groups = content.groups;
  const baseId = useId();

  // Direction travels with the selection: the panel can only enter from the
  // correct side if it knows which way along the rail the choice moved.
  const [selection, setSelection] = useState({ id: groups[0].id, direction: 1 });
  const group = groups.find((item) => item.id === selection.id) ?? groups[0];

  const select = useCallback(
    (id: string) => {
      setSelection((current) => {
        const next = groups.findIndex((item) => item.id === id);
        const previous = groups.findIndex((item) => item.id === current.id);
        return { id, direction: next >= previous ? 1 : -1 };
      });
    },
    [groups],
  );

  const tabId = useCallback((id: string) => `${baseId}-tab-${id}`, [baseId]);
  const panelId = useCallback((id: string) => `${baseId}-panel-${id}`, [baseId]);

  const panel = useSpring({
    from: { opacity: 0, x: selection.direction * PANEL_TRAVEL },
    to: { opacity: 1, x: 0 },
    reset: true,
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

        <TabRail
          items={groups}
          active={selection.id}
          onSelect={select}
          label={content.tablistLabel}
          tabId={tabId}
          panelId={panelId}
          className="mb-4"
        />

        <Reveal>
          {/* Clips the panel's entry travel so it cannot ride out over the
              bezel's inner radius mid-transition. */}
          <Bezel innerClassName="overflow-hidden p-6 md:p-9">
            <animated.div
              style={panel}
              role="tabpanel"
              id={panelId(group.id)}
              aria-labelledby={tabId(group.id)}
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
