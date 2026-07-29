// 📖 Docs: obsidian/frontend/components/animation-springs.md
/**
 * Headline metrics. Each figure counts up on a spring the first time the band
 * enters the viewport.
 */
"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

import { Shell } from "@/components/ui/shell";
import type { Stat } from "@/data/mocks/home";
import { useDynamicInView } from "@/hooks/animation/use-dynamic-in-view";

export interface StatsBandProps {
  stats: readonly Stat[];
}

const StatFigure = ({ stat, run }: { stat: Stat; run: boolean }) => {
  const { value } = useSpring({
    from: { value: 0 },
    value: run ? stat.value : 0,
    config: { tension: 60, friction: 30 },
  });

  return (
    <p className="text-5xl font-light tracking-tight tabular-nums">
      {stat.prefix}
      <animated.span>{value.to((v) => Math.round(v))}</animated.span>
      {stat.suffix}
    </p>
  );
};

export const StatsBand = ({ stats }: StatsBandProps) => {
  const [setNode, inView] = useDynamicInView({ threshold: 0.4 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  return (
    <section aria-label="OddsTrading en cifras" className="py-16">
      <Shell>
        <ul ref={setNode} className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col gap-1 border-l border-border-hairline-strong pl-5"
            >
              <StatFigure stat={stat} run={started} />
              <span className="text-sm text-foreground-subtle">{stat.label}</span>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
};
