import { BookieLogo } from "@/components/BookieLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardLink, CardTitle } from "@/components/ui/card";

export function ImprovedOdds() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuotas mejoradas</CardTitle>
        <CardLink href="#">Ver todas</CardLink>
      </CardHeader>

      <div className="px-4 pb-4">
        <div className="rounded-xl border border-line bg-raised p-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Badge variant="solid">Mejorada</Badge>
              <p className="mt-1.5 text-sm font-semibold text-ink">Real Madrid gana</p>
              <p className="text-xs text-muted">vs Betis</p>
            </div>

            <div className="flex shrink-0 items-start gap-3">
              <span className="text-right">
                <span className="block text-[11px] text-faint">Antes</span>
                <span className="block text-sm text-muted line-through tabular-nums">1.85</span>
              </span>
              <span className="text-right">
                <span className="block text-[11px] text-faint">Ahora</span>
                <span className="block text-base font-bold text-up tabular-nums">2.15</span>
              </span>
              <Badge variant="up" className="mt-0.5">
                +16.2%
              </Badge>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
            <span className="flex items-center gap-2 text-xs text-muted">
              <BookieLogo name="Bet365" size="sm" />
              Bet365
            </span>
            <Button variant="ghost" size="sm">
              Apostar ahora
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
