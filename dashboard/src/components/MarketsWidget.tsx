"use client";

import { useJitter } from "@/components/Locked";
import { Sparkline } from "@/components/Sparkline";
import { Card, CardHeader, CardLink, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/lib/store";
import { cn } from "@/lib/utils";

/** Rows shown before "Ver todos". */
const PREVIEW = 5;

export function MarketsWidget() {
  const { visibleMarkets, expanded, toggleExpanded, notify, search } = useDashboard();
  const jitter = useJitter();

  const showAll = expanded.markets ?? false;
  const rows = showAll ? visibleMarkets : visibleMarkets.slice(0, PREVIEW);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mercados más apostados</CardTitle>
        <CardLink onClick={() => toggleExpanded("markets")}>
          {showAll ? "Ver menos" : "Ver todos"}
        </CardLink>
      </CardHeader>

      <div className="px-3 pb-3">
        <div className="grid grid-cols-[1.5rem_minmax(0,1fr)_auto_4rem] items-center gap-x-3 px-2 pb-1.5 text-[11px] font-medium text-faint">
          <span>#</span>
          <span>Mercado</span>
          <span className="text-right">% del total</span>
          <span className="text-right">Tendencia</span>
        </div>

        <ul className="flex flex-col">
          {rows.map((market) => (
            <li key={market.rank}>
              <button
                type="button"
                onClick={() => notify(`${market.name} · ${market.share} del volumen`)}
                className={cn(
                  "grid w-full cursor-pointer grid-cols-[1.5rem_minmax(0,1fr)_auto_4rem] items-center gap-x-3 rounded-lg px-2 py-[7px] text-left transition-colors duration-150 hover:bg-hover",
                  market.highlighted && "border-l-2 border-up bg-raised",
                )}
              >
                <span className="text-xs text-faint tabular-nums">{market.rank}</span>
                <span className="truncate text-[13px] text-ink">{market.name}</span>
                <span className="text-[13px] font-semibold text-ink tabular-nums">
                  {jitter(parseFloat(market.share), market.rank).toFixed(1)}%
                </span>
                <Sparkline data={market.trend} tone={market.tone} className="ml-auto w-14" />
              </button>
            </li>
          ))}
        </ul>

        {rows.length === 0 && (
          <p className="py-6 text-center text-xs text-faint">
            Ningún mercado coincide con «{search}».
          </p>
        )}
      </div>
    </Card>
  );
}
