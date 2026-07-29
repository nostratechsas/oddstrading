// 📖 Docs: obsidian/frontend/component-conventions.md
/**
 * Pill call-to-action with the trailing icon nested in its own circular well.
 * Hover only shifts colour and nudges the icon a few px, so it stays CSS per
 * ADR-0014 (obsidian/frontend/design-system.md → "Motion").
 */
import Link from "next/link";
import type { ReactNode } from "react";

export type ActionTone = "primary" | "ghost" | "light";

export interface ActionLinkProps {
  href: string;
  children: ReactNode;
  tone?: ActionTone;
  size?: "md" | "lg";
  /** `arrow` for outbound intent, `chevron` for in-page navigation, `none` for plain. */
  icon?: "arrow" | "chevron" | "none";
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}

const TONES: Record<ActionTone, string> = {
  primary:
    "border-transparent bg-action-primary text-action-primary-foreground hover:bg-action-primary-hover",
  ghost:
    "border-border-hairline-strong bg-action-neutral text-foreground hover:bg-action-neutral-hover",
  light:
    "border-transparent bg-foreground text-background hover:bg-foreground-muted",
};

const WELL: Record<ActionTone, string> = {
  primary: "bg-background/15",
  ghost: "bg-surface-strong",
  light: "bg-background/10",
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ActionLink = ({
  href,
  children,
  tone = "primary",
  size = "md",
  icon = "arrow",
  fullWidth = false,
  className = "",
  onClick,
}: ActionLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`group inline-flex items-center gap-3 rounded-pill border font-medium tracking-tight transition-colors duration-[var(--duration-fast)] ease-entrance ${TONES[tone]} ${
      size === "lg" ? "py-2.5 pr-2.5 pl-6 text-base" : "py-2 pr-2 pl-5 text-sm"
    } ${fullWidth ? "w-full justify-center px-6" : ""} ${className}`}
  >
    {children}
    {icon !== "none" && (
      <span
        aria-hidden="true"
        className={`grid shrink-0 place-items-center rounded-pill transition-transform duration-[var(--duration-normal)] ease-entrance group-hover:translate-x-0.5 group-hover:-translate-y-px ${WELL[tone]} ${
          size === "lg" ? "h-8.5 w-8.5" : "h-7.5 w-7.5"
        }`}
      >
        {icon === "arrow" ? <ArrowIcon /> : <ChevronIcon />}
      </span>
    )}
  </Link>
);
