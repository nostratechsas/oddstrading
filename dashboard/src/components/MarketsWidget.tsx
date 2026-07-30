import { Sparkline } from "@/components/Sparkline";
import { Card, CardHeader, CardLink, CardTitle } from "@/components/ui/card";
import { markets } from "@/lib/data";
import { cn } from "@/lib/utils";

export function MarketsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mercados más apostados</CardTitle>
        <CardLink href="#">Ver todos</CardLink>
      </CardHeader>

      <div className="px-3 pb-3">
        <div className="grid grid-cols-[1.5rem_minmax(0,1fr)_auto_4rem] items-center gap-x-3 px-2 pb-1.5 text-[11px] font-medium text-faint">
          <span>#</span>
          <span>Mercado</span>
          <span className="text-right">% del total</span>
          <span className="text-right">Tendencia</span>
        </div>

        <ul className="flex flex-col">
          {markets.map((market) => (
            <li
              key={market.rank}
              className={cn(
                "grid cursor-pointer grid-cols-[1.5rem_minmax(0,1fr)_auto_4rem] items-center gap-x-3 rounded-lg px-2 py-[7px] transition-colors duration-150 hover:bg-hover",
                market.highlighted && "border-l-2 border-up bg-raised",
              )}
            >
              <span className="text-xs text-faint tabular-nums">{market.rank}</span>
              <span className="truncate text-[13px] text-ink">{market.name}</span>
              <span className="text-[13px] font-semibold text-ink tabular-nums">
                {market.share}
              </span>
              <Sparkline data={market.trend} tone={market.tone} className="ml-auto w-14" />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
