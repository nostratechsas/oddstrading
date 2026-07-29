// 📖 Docs: obsidian/frontend/html-semantics.md
/**
 * Site footer — brand block plus the link columns and the compliance line.
 */
import Link from "next/link";

import { BrandLockup } from "@/components/common/brand-lockup";
import { Shell } from "@/components/ui/shell";

export interface SiteFooterProps {
  columns: readonly { title: string; links: readonly { href: string; label: string }[] }[];
  mark: string;
  wordmark: string;
  logoAlt: string;
  tagline: string;
  email: string;
  legal: string;
  compliance: string;
}

export const SiteFooter = ({
  columns,
  mark,
  wordmark,
  logoAlt,
  tagline,
  email,
  legal,
  compliance,
}: SiteFooterProps) => (
  <footer className="border-t border-border-hairline bg-background-elevated/60 pt-16 pb-10">
    <Shell>
      <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-[1.6fr_repeat(4,1fr)]">
        <div className="md:col-span-3 lg:col-span-1">
          <Link href="/" className="inline-flex" aria-label={`${logoAlt}, inicio`}>
            <BrandLockup mark={mark} wordmark={wordmark} alt={logoAlt} size="xl" />
          </Link>
          <p className="mt-4 max-w-[30ch] text-sm text-foreground-subtle">{tagline}</p>
          <a
            href={`mailto:${email}`}
            className="mt-4 inline-block text-sm text-accent-emphasis transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-action-primary-hover"
          >
            {email}
          </a>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
            <h2 className="mb-1 text-[0.6875rem] font-medium tracking-[0.18em] text-foreground-subtle uppercase">
              {column.title}
            </h2>
            {column.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-foreground-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-border-hairline pt-6 text-xs text-foreground-subtle">
        <span>{legal}</span>
        <span>{compliance}</span>
      </div>
    </Shell>
  </footer>
);
