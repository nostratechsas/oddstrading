// 📖 Docs: obsidian/frontend/components/common.md
/**
 * Side panel offering the other language. The site is served in English by
 * default; this slides in from the edge to point Spanish speakers at `/es`
 * (and back). Dismissal is remembered in `localStorage`, so it appears once.
 *
 * It is a link, not a client-side locale switch: each language is its own
 * server-rendered route, which keeps both indexable.
 */
"use client";

import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface LocaleNoticeProps {
  /** Route for the other language. */
  href: string;
  title: string;
  body: string;
  accept: string;
  dismiss: string;
  /** Distinct per direction so dismissing one does not hide the other. */
  storageKey: string;
}

export const LocaleNotice = ({
  href,
  title,
  body,
  accept,
  dismiss,
  storageKey,
}: LocaleNoticeProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(storageKey) === "1";
    } catch {
      dismissed = false;
    }
    if (dismissed) return;
    const id = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(id);
  }, [storageKey]);

  const close = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(storageKey, "1");
    } catch {
      // Storage unavailable — it will simply offer again next visit.
    }
  };

  const panel = useSpring({
    x: open ? 0 : 120,
    opacity: open ? 1 : 0,
    config: { tension: 190, friction: 26 },
  });

  return (
    <animated.aside
      aria-label={title}
      style={{
        transform: panel.x.to((v) => `translateX(${v}%)`),
        opacity: panel.opacity,
        visibility: panel.opacity.to((v) => (v > 0.01 ? "visible" : "hidden")),
      }}
      className="fixed top-1/2 right-0 z-40 w-64 -translate-y-1/2 rounded-l-card border border-r-0 border-border-hairline-strong bg-background-overlay p-5 shadow-[0_24px_60px_-30px_var(--surface-strong)] backdrop-blur-2xl"
    >
      <p className="text-sm font-medium tracking-tight">{title}</p>
      <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{body}</p>

      <div className="mt-4 flex flex-col gap-2">
        <Link
          href={href}
          onClick={close}
          className="rounded-pill bg-action-primary px-4 py-2 text-center text-xs font-medium text-action-primary-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-primary-hover"
        >
          {accept}
        </Link>
        <button
          type="button"
          onClick={close}
          className="rounded-pill px-4 py-2 text-center text-xs text-foreground-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
        >
          {dismiss}
        </button>
      </div>
    </animated.aside>
  );
};
