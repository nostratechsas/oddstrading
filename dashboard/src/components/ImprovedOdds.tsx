"use client";

import { BookieLogo } from "@/components/BookieLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardLink, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/lib/store";

/** Every boosted price on offer; the card shows the first until expanded. */
const BOOSTS = [
  {
    market: "Barcelona SC gana",
    event: "vs Emelec",
    before: 1.85,
    after: 2.15,
    lift: "+16.2%",
    bookie: "Ecuabet",
  },
  {
    market: "Liga de Quito gana",
    event: "vs Aucas",
    before: 1.42,
    after: 1.55,
    lift: "+9.2%",
    bookie: "Betano",
  },
  {
    market: "Más de 2.5 goles",
    event: "Man City vs Bayern",
    before: 1.7,
    after: 1.92,
    lift: "+12.9%",
    bookie: "Bet365",
  },
] as const;

export function ImprovedOdds() {
  const { expanded, toggleExpanded, notify } = useDashboard();

  const showAll = expanded.boosts ?? false;
  const shown = showAll ? BOOSTS : BOOSTS.slice(0, 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuotas mejoradas</CardTitle>
        <CardLink onClick={() => toggleExpanded("boosts")}>
          {showAll ? "Ver menos" : "Ver todas"}
        </CardLink>
      </CardHeader>

      <div className="flex flex-col gap-2 px-4 pb-4">
        {shown.map((boost) => (
          <div key={boost.market} className="rounded-xl border border-line bg-raised p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Badge variant="solid">Mejorada</Badge>
                <p className="mt-1.5 truncate text-sm font-semibold text-ink">{boost.market}</p>
                <p className="truncate text-xs text-muted">{boost.event}</p>
              </div>

              <div className="flex shrink-0 items-start gap-3">
                <span className="text-right">
                  <span className="block text-[11px] text-faint">Antes</span>
                  <span className="block text-sm text-muted line-through tabular-nums">
                    {boost.before.toFixed(2)}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block text-[11px] text-faint">Ahora</span>
                  <span className="block text-base font-bold text-up tabular-nums">
                    {boost.after.toFixed(2)}
                  </span>
                </span>
                <Badge variant="up" className="mt-0.5">
                  {boost.lift}
                </Badge>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
              <span className="flex items-center gap-2 text-xs text-muted">
                <BookieLogo name={boost.bookie} size="sm" />
                {boost.bookie}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => notify(`Cuota ${boost.after.toFixed(2)} añadida al boleto`)}
              >
                Apostar ahora
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
