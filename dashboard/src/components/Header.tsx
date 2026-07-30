import Image from "next/image";
import { Bell, ChevronDown, Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard" },
  { label: "Mercados" },
  { label: "Competidores", active: true },
  { label: "Alertas" },
  { label: "Arbitraje" },
  { label: "Analytics" },
];

export function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-6 border-b border-line bg-rail pr-4 pl-5">
      {/* Brand lockup — the real mark and wordmark, shared with the landing.
          Sized with max-h so the pair scales down instead of overflowing. */}
      <a href="#" className="flex min-w-0 items-center gap-2">
        <Image
          src="/assets/brand/oddstrading-mark.png"
          alt=""
          aria-hidden="true"
          width={768}
          height={642}
          priority
          className="h-auto max-h-8 w-auto shrink-0 drop-shadow-[0_0_14px_rgb(34_197_94/0.28)]"
        />
        <Image
          src="/assets/brand/oddstrading-wordmark.png"
          alt="OddsTrading"
          width={385}
          height={72}
          priority
          className="h-auto max-h-4.5 w-auto min-w-0 max-w-full object-contain"
        />
      </a>

      {/* Primary nav */}
      <nav className="hidden h-full items-center gap-1 md:flex" aria-label="Principal">
        {NAV.map((item) => (
          <a
            key={item.label}
            href="#"
            aria-current={item.active ? "page" : undefined}
            className={cn(
              "relative flex h-full items-center px-3.5 text-sm transition-colors duration-150",
              item.active
                ? "font-semibold text-ink after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-up"
                : "text-muted hover:text-ink",
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        {/* Live pill */}
        <span className="flex items-center gap-2 rounded-full border border-line-strong bg-raised px-3 py-1.5 text-xs font-medium">
          <i className="animate-live h-1.5 w-1.5 rounded-full bg-up" aria-hidden="true" />
          En vivo
        </span>

        {/* Theme switch */}
        <button
          type="button"
          aria-label="Cambiar tema"
          className="flex cursor-pointer items-center gap-0.5 rounded-full border border-line-strong bg-raised p-1 transition-colors duration-150 hover:bg-hover"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-hover">
            <Moon className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full">
            <Sun className="h-3.5 w-3.5 text-faint" aria-hidden="true" />
          </span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notificaciones (3)"
          className="relative cursor-pointer rounded-full p-2 transition-colors duration-150 hover:bg-hover"
        >
          <Bell className="h-4.5 w-4.5 text-muted" aria-hidden="true" />
          <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-up text-[9px] font-bold text-white">
            3
          </span>
        </button>

        {/* Profile */}
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2.5 rounded-full py-1 pr-1.5 pl-1 transition-colors duration-150 hover:bg-hover"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white"
            style={{ background: "linear-gradient(135deg,#475569,#1e293b)" }}
            aria-hidden="true"
          >
            TP
          </span>
          <span className="hidden text-left lg:block">
            <span className="block text-[13px] leading-tight font-semibold">Trader Pro</span>
            <span className="block text-[11px] leading-tight text-faint">Nivel 4</span>
          </span>
          <ChevronDown className="hidden h-3.5 w-3.5 text-faint lg:block" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
