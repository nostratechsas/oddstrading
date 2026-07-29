// 📖 Docs: obsidian/frontend/html-semantics.md
/**
 * Floating glass navigation pill plus the full-screen mobile menu. The
 * hamburger morphs into an X and the menu links stagger in — both driven by
 * springs, never keyframes (hard rule #1).
 */
"use client";

import { animated, useSpring, useTrail } from "@react-spring/web";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ActionLink } from "@/components/ui/action-link";

export interface SiteHeaderProps {
  links: readonly { href: string; label: string }[];
  logo: string;
  logoAlt: string;
}

export const SiteHeader = ({ links, logo, logoAlt }: SiteHeaderProps) => {
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
          aria-label="Principal"
          className="pointer-events-auto flex w-full max-w-shell items-center gap-6 rounded-pill border border-border-hairline bg-background-overlay py-2 pr-2 pl-5 shadow-[inset_0_1px_0_var(--surface-strong)] backdrop-blur-2xl"
        >
          <a href="#inicio" className="flex shrink-0 items-center" aria-label={`${logoAlt}, inicio`}>
            <Image src={logo} alt={logoAlt} width={510} height={127} priority className="h-7 w-auto" />
          </a>

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

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href="#contacto"
              className="text-sm text-foreground-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
            >
              Iniciar sesión
            </a>
            <ActionLink href="#precios">Prueba gratis</ActionLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="relative ml-auto grid h-10 w-10 place-items-center rounded-pill border border-border-hairline-strong bg-surface-raised lg:hidden"
          >
            <animated.span style={topBar} className="absolute h-px w-4 rounded-pill bg-foreground" />
            <animated.span style={bottomBar} className="absolute h-px w-4 rounded-pill bg-foreground" />
          </button>
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
                  <ActionLink href="#precios" size="lg" onClick={() => setOpen(false)}>
                    Empezar gratis
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
