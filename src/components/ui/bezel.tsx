// 📖 Docs: obsidian/frontend/component-conventions.md
/**
 * Double-bezel shell — an outer tray with a hairline edge wrapping an inner
 * core with its own top highlight, so a card reads as machined hardware rather
 * than a flat rectangle. The concentric radii come from the `--radius-card` /
 * `--radius-card-inner` component tokens so nested content can match them.
 */
import type { ElementType, ReactNode } from "react";

export interface BezelProps {
  children: ReactNode;
  /** Semantic element for the outer shell. */
  tag?: ElementType;
  /** Tints the shell with the brand gradient — use to mark the hero surface. */
  glow?: boolean;
  className?: string;
  /** Classes for the inner core (padding, layout). */
  innerClassName?: string;
}

export const Bezel = ({
  children,
  tag: Tag = "div",
  glow = false,
  className = "",
  innerClassName = "",
}: BezelProps) => (
  <Tag
    className={`rounded-card border p-1.5 ${
      glow
        ? "border-accent-soft-strong bg-linear-160 from-accent-soft-strong via-surface-strong to-surface-glass"
        : "border-border-hairline bg-linear-160 from-surface-raised via-surface-glass to-surface-raised"
    } ${className}`}
  >
    <div
      className={`h-full rounded-card-inner border border-border-hairline bg-linear-to-b from-background-elevated to-background shadow-[inset_0_1px_0_var(--surface-strong)] ${innerClassName}`}
    >
      {children}
    </div>
  </Tag>
);
