// 📖 Docs: obsidian/frontend/component-conventions.md
/**
 * Centred content column. Width and gutters live here so no section has to
 * restate them.
 */
import type { ElementType, ReactNode } from "react";

export interface ShellProps {
  children: ReactNode;
  tag?: ElementType;
  className?: string;
}

export const Shell = ({ children, tag: Tag = "div", className = "" }: ShellProps) => (
  <Tag className={`relative z-1 mx-auto w-full max-w-shell px-5 md:px-10 ${className}`}>
    {children}
  </Tag>
);
