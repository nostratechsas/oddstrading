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
  logo: string;
}

export interface BookmakerMarqueeProps {
  items: readonly MarqueeItem[];
  /** Accessible name for the wall. */
  label: string;
}

/** Tile width (`w-64`) plus the track gap (`gap-4`), in px at the 16px base. */
const TILE_WIDTH = 272;
/** One copy must out-run the widest viewport or the wrap shows a bare gap. */
const MIN_COPY_WIDTH = 2600;

export const BookmakerMarquee = ({ items, label }: BookmakerMarqueeProps) => {
  const track = useSpring({
    from: { x: "0%" },
    to: { x: "-50%" },
    loop: true,
    config: { duration: 52000 },
  });

  // The loop translates by exactly one copy, so a short catalogue has to be
  // repeated until that copy is wider than the screen — otherwise the tail of
  // each cycle is empty. Filtering the wall down to licensed logos made this
  // reachable, so it is computed rather than assumed.
  if (items.length === 0) return null;
  const repeats = Math.max(1, Math.ceil(MIN_COPY_WIDTH / (items.length * TILE_WIDTH)));
  const copy = Array.from({ length: repeats }, () => items).flat();

  return (
    <section
      aria-label={label}
      className="relative z-1 mt-20 overflow-hidden border-y border-border-hairline py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
    >
      <animated.ul style={track} className="flex w-max items-center gap-4">
        {[...copy, ...copy].map((item, index) => (
          // Only the first pass through the real catalogue is announced; every
          // repeat after it is decorative.
          <li key={`${item.slug}-${index}`} aria-hidden={index >= items.length}>
            <BookmakerTile name={item.name} logo={item.logo} />
          </li>
        ))}
      </animated.ul>
    </section>
  );
};
