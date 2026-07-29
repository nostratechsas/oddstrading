// 📖 Docs: obsidian/frontend/component-conventions.md
/**
 * Micro pill label that precedes a section headline. Optionally carries the
 * live indicator dot.
 */
import type { ReactNode } from "react";

import { PulseDot } from "@/components/ui/pulse-dot";

export interface EyebrowProps {
  children: ReactNode;
  live?: boolean;
  className?: string;
}

export const Eyebrow = ({ children, live = false, className = "" }: EyebrowProps) => (
  <span
    className={`inline-flex items-center gap-2 rounded-pill border border-border-hairline-strong bg-surface-glass px-3 py-1 text-[0.625rem] font-medium tracking-[0.22em] text-foreground-muted uppercase ${className}`}
  >
    {live && <PulseDot />}
    {children}
  </span>
);
