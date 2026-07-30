import { ArrowDown, ArrowUp } from "lucide-react";

import { tickerItems } from "@/lib/data";

export function BottomTicker() {
  return (
    <footer className="flex h-9 shrink-0 items-stretch border-t border-line bg-rail">
      <div className="relative min-w-0 flex-1 overflow-hidden">
        {/* The list renders twice; the keyframe shifts by half its width. */}
        <div className="animate-ticker flex h-full w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {tickerItems.map((item) => (
                <span
                  key={`${copy}-${item.team}`}
                  className="flex items-center gap-2 px-5 text-xs whitespace-nowrap"
                >
                  <span className="text-muted">{item.team}</span>
                  <b className="font-semibold text-ink tabular-nums">{item.price}</b>
                  {item.dir === "up" ? (
                    <ArrowUp className="h-3 w-3 text-up" aria-label="Sube" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-down" aria-label="Baja" />
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
        <span className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-r from-transparent to-rail" />
      </div>
      <a
        href="#"
        className="flex shrink-0 items-center border-l border-line px-4 text-xs font-medium text-muted transition-colors duration-150 hover:text-ink"
      >
        Ver más
      </a>
    </footer>
  );
}
