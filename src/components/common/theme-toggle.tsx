// 📖 Docs: obsidian/frontend/components/common.md
/**
 * Light/dark switch. The knob slides on a spring; the icons cross-fade on a
 * token-backed CSS transition, since opacity on a discrete state change is the
 * ADR-0014 exception rather than a reason to wire two more springs.
 */
"use client";

import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";

import { useTheme } from "@/hooks/use-theme";

export interface ThemeToggleProps {
  /** Accessible name — localised by the caller. */
  label: string;
  className?: string;
}

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="h-3.5 w-3.5">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5z" />
  </svg>
);

export const ThemeToggle = ({ label, className = "" }: ThemeToggleProps) => {
  const theme = useTheme((s) => s.theme);
  const hydrated = useTheme((s) => s.hydrated);
  const hydrate = useTheme((s) => s.hydrate);
  const toggle = useTheme((s) => s.toggle);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  const isDark = theme === "dark";
  // Percentage, not px: the root font-size follows the viewport, so a pixel
  // travel that fits at 1920 overflows the track at 1280. The knob is exactly
  // half the track's inner width, so 100% of its own width is the full travel.
  const knob = useSpring({
    x: isDark ? 100 : 0,
    config: { tension: 320, friction: 26 },
  });

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
      onClick={toggle}
      className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-pill border border-border-hairline-strong bg-surface-raised px-1 transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-surface-strong ${className}`}
    >
      <animated.span
        style={{ transform: knob.x.to((v) => `translateX(${v}%)`) }}
        className="grid h-6 w-6 place-items-center rounded-pill bg-action-primary text-action-primary-foreground shadow-[0_2px_8px_var(--accent-soft-strong)]"
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </animated.span>
    </button>
  );
};
