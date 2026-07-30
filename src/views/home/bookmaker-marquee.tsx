// 📖 Docs: obsidian/frontend/design-system.md → "Motion"
/**
 * Continuous logo wall. The track is duplicated and translated by -50% on an
 * infinite spring loop — a CSS `@keyframes` marquee is banned (hard rule #1).
 * Masked at both edges so tiles fade instead of clipping.
 */
"use client";

import { animated, useSpring } from "@react-spring/web";

import { BookmakerTile } from "./bookmaker-tile";

export interface MarqueeItem {
  slug: string;
  name: string;
  color: string;
  logo?: string;
}

export interface BookmakerMarqueeProps {
  items: readonly MarqueeItem[];
  /** Accessible name for the wall. */
  label: string;
  /** Caption under the name on plates without an official logo file. */
  caption: string;
}

export const BookmakerMarquee = ({ items, label, caption }: BookmakerMarqueeProps) => {
  const track = useSpring({
    from: { x: "0%" },
    to: { x: "-50%" },
    loop: true,
    config: { duration: 52000 },
  });

  return (
    <section
      aria-label={label}
      className="relative z-1 mt-20 overflow-hidden border-y border-border-hairline py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
    >
      <animated.ul style={track} className="flex w-max items-center gap-4">
        {[...items, ...items].map((item, index) => (
          <li key={`${item.slug}-${index}`} aria-hidden={index >= items.length}>
            <BookmakerTile name={item.name} color={item.color} logo={item.logo} label={caption} />
          </li>
        ))}
      </animated.ul>
    </section>
  );
};
