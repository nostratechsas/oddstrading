// 📖 Docs: obsidian/frontend/components/animation-springs.md
/**
 * Live-feed indicator: a brand dot with a halo that breathes. The halo is a
 * looping spring — CSS `@keyframes` are banned project-wide (hard rule #1), so
 * the loop is driven by `useSpring({ loop: true })` from the animation engine.
 */
"use client";

import { animated, useSpring } from "@react-spring/web";

export interface PulseDotProps {
  className?: string;
}

export const PulseDot = ({ className = "" }: PulseDotProps) => {
  const halo = useSpring({
    from: { scale: 1, opacity: 0.55 },
    to: { scale: 2.6, opacity: 0 },
    loop: true,
    config: { duration: 2400 },
  });

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex h-1.5 w-1.5 shrink-0 ${className}`}
    >
      <animated.span
        style={halo}
        className="absolute inset-0 rounded-pill bg-accent-emphasis"
      />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-pill bg-accent-emphasis" />
    </span>
  );
};
