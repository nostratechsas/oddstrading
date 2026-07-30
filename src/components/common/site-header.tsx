// 📖 Docs: obsidian/frontend/html-semantics.md
/**
 * Floating glass navigation pill plus the full-screen mobile menu. The
 * hamburger morphs into an X and the menu links stagger in — both driven by
 * springs, never keyframes (hard rule #1).
 */
"use client";

import { animated, useSpring, useTrail } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandLockup } from "@/components/common/brand-lockup";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { ActionLink } from "@/components/ui/action-link";

export interface SiteHeaderProps {
  links: readonly { href: string; label: string }[];
  mark: string;
  wordmark: string;
  logoAlt: string;
  /** Localised labels for the header's own controls. */
  labels: { signIn: string; cta: string; theme: string; menuOpen: string; menuClose: string };
  /** Route the CTA points at, so the Spanish tree keeps its prefix. */
  ctaHref: string;
}

export const SiteHeader = ({
  links,
  mark,
  wordmark,
  logoAlt,
  labels,
  ctaHref,
}: SiteHeaderProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = useSpring({
    opacity: open ? 1 : 0,
    config: { tension: 210, friction: 30 },
  });

  const trail = useTrail(links.length + 1, {
    opacity: open ? 1 : 0,
    y: open ? 0 : 40,
    delay: open ? 90 : 0,
    config: { tension: 180, friction: 26 },
  });

  const topBar = useSpring({
    y: open ? 3.5 : -4,
    rotate: open ? 45 : 0,
    config: { tension: 260, friction: 24 },
  });
  const bottomBar = useSpring({
    y: open ? -3.5 : 3,
    rotate: open ? -45 : 0,
    config: { tension: 260, friction: 24 },
  });

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center px-5 pt-4 md:px-10">
        <nav
          aria-label={logoAlt}
          className="pointer-events-auto flex w-full max-w-shell items-center gap-6 rounded-pill border border-border-hairline bg-background-overlay py-3 pr-3 pl-6 shadow-[inset_0_1px_0_var(--surface-strong)] backdrop-blur-2xl"
        >
          <Link href="/" className="flex min-w-0 items-center" aria-label={`${logoAlt}, inicio`}>
            <BrandLockup mark={mark} wordmark={wordmark} alt={logoAlt} size="lg" priority />
          </Link>

          <ul className="ml-auto hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-foreground-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle label={labels.theme} />
            <Link
              href={`${ctaHref.replace("/checkout", "")}/#contacto`}
              className="text-sm text-foreground-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
            >
              {labels.signIn}
            </Link>
            <ActionLink href={ctaHref}>{labels.cta}</ActionLink>
          </div>

          <div className="ml-auto flex items-center gap-3 lg:hidden">
            <ThemeToggle label={labels.theme} />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? labels.menuClose : labels.menuOpen}
              className="relative grid h-10 w-10 place-items-center rounded-pill border border-border-hairline-strong bg-surface-raised"
            >
              <animated.span style={topBar} className="absolute h-px w-4 rounded-pill bg-foreground" />
              <animated.span style={bottomBar} className="absolute h-px w-4 rounded-pill bg-foreground" />
            </button>
          </div>
        </nav>
      </header>

      <animated.div
        id="menu-movil"
        style={{ ...overlay, visibility: overlay.opacity.to((v) => (v > 0.01 ? "visible" : "hidden")) }}
        className="fixed inset-0 z-20 bg-background/85 backdrop-blur-3xl lg:hidden"
      >
        <div className="flex h-full flex-col justify-center px-5 pt-24 pb-12">
          {trail.map((style, index) => {
            const link = links[index];
            if (!link) {
              return (
                <animated.div key="cta" style={style} className="mt-8">
                  <ActionLink href={ctaHref} size="lg" onClick={() => setOpen(false)}>
                    {labels.cta}
                  </ActionLink>
                </animated.div>
              );
            }
            return (
              <animated.a
                key={link.href}
                href={link.href}
                style={style}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-border-hairline py-2 text-4xl font-light tracking-tight"
              >
                {link.label}
                <span className="text-xs text-foreground-subtle tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </animated.a>
            );
          })}
        </div>
      </animated.div>
    </>
  );
};
