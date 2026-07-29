// 📖 Docs: obsidian/frontend/design-system.md → "Motion"
/**
 * Continuous bookmaker ticker. The track is duplicated and translated by -50%
 * on an infinite spring loop — a CSS `@keyframes` marquee is banned (hard
 * rule #1). Masked at both edges so names fade instead of clipping.
 */
"use client";

import { animated, useSpring } from "@react-spring/web";

export interface BookmakerMarqueeProps {
  names: readonly string[];
}

export const BookmakerMarquee = ({ names }: BookmakerMarqueeProps) => {
  const track = useSpring({
    from: { x: "0%" },
    to: { x: "-50%" },
    loop: true,
    config: { duration: 48000 },
  });

  return (
    <div
      className="relative z-1 mt-20 overflow-hidden border-y border-border-hairline py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      aria-label="Casas de apuestas soportadas"
    >
      <animated.ul style={track} className="flex w-max items-center gap-14">
        {[...names, ...names].map((name, index) => (
          <li
            key={`${name}-${index}`}
            aria-hidden={index >= names.length}
            className="text-base font-light tracking-tight whitespace-nowrap text-foreground-subtle"
          >
            {name}
          </li>
        ))}
      </animated.ul>
    </div>
  );
};
