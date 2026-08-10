// 📖 Docs: obsidian/frontend/design-system.md → "Motion"
/**
 * Two rows of glass tiles drifting in opposite directions.
 *
 * The reference design does this with `@keyframes marquee-left/right`, which
 * hard rule #1 bans. Same result on an infinite `useSpring` loop instead — the
 * track is duplicated and translated by exactly one copy, so the wrap is
 * seamless. Masked at both edges so tiles fade rather than clip.
 *
 * The icon sets live here rather than in the parent: icons are React component
 * *functions*, and a Server Component cannot hand a function to a Client one.
 */
"use client";

import { animated, useSpring } from "@react-spring/web";
import {
  Activity,
  Braces,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  LineChart,
  Network,
  Radio,
  Server,
  Terminal,
  Webhook,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ROWS: { icons: LucideIcon[]; direction: -1 | 1; duration: number }[] = [
  {
    icons: [Webhook, Braces, Terminal, Database, Server, Cloud, Network, Radio],
    direction: -1,
    duration: 22000,
  },
  {
    // Different length and duration, so the two rows never lock in step.
    icons: [LineChart, Activity, Cpu, GitBranch, Zap, Braces, Webhook, Terminal],
    direction: 1,
    duration: 26000,
  },
];

function Row({ icons, direction, duration }: (typeof ROWS)[number]) {
  const track = useSpring({
    from: { x: direction === -1 ? "0%" : "-50%" },
    to: { x: direction === -1 ? "-50%" : "0%" },
    loop: true,
    config: { duration },
  });

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <animated.ul style={track} className="flex w-max items-center gap-3">
        {[...icons, ...icons].map((Icon, index) => (
          <li key={index}>
            <span className="liquid-glass flex h-14 w-14 items-center justify-center rounded-xl md:h-16 md:w-16">
              <Icon
                className="h-5 w-5 text-showcase-ink-muted md:h-6 md:w-6"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
          </li>
        ))}
      </animated.ul>
    </div>
  );
}

export interface ShowcaseMarqueeProps {
  /** Accessible name — the tiles themselves are decorative. */
  label: string;
}

export const ShowcaseMarquee = ({ label }: ShowcaseMarqueeProps) => (
  <div role="img" aria-label={label} className="flex flex-col gap-3">
    {ROWS.map((row, index) => (
      <Row key={index} {...row} />
    ))}
  </div>
);
