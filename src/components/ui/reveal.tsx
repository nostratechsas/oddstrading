// 📖 Docs: obsidian/frontend/components/animation-springs.md
/**
 * The page's standard scroll-entry: a heavy fade-up that settles once. Wraps
 * `<Inview>` so every section shares one spring config instead of repeating
 * `from`/`to` objects across the view.
 */
"use client";

import type { ReactNode } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import type { Tags } from "@/types/springs";

export interface RevealProps {
  children: ReactNode;
  /** Semantic element rendered by the animation component. */
  tag?: Tags;
  /** Stagger index — each step delays entry by 90 ms. */
  step?: number;
  className?: string;
}

export const Reveal = ({ children, tag = "div", step = 0, className }: RevealProps) => (
  <Inview
    tag={tag}
    mode="once"
    className={className}
    delayIn={step * 90}
    from={{ opacity: 0, y: 36 }}
    to={{ opacity: 1, y: 0 }}
    config={{ tension: 120, friction: 26 }}
  >
    {children}
  </Inview>
);
