import { Triangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ArbitrageCard() {
  return (
    <Card className="flex items-center gap-3.5 bg-[linear-gradient(105deg,#0d1724,#101d33)] p-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-soft">
        <Triangle
          className="h-5 w-5 fill-[#6366f1] text-[#818cf8]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-ink">¿Arbitraje disponible?</p>
        <p className="truncate text-xs text-muted">Te ayudamos a encontrar valor</p>
      </div>

      <Button size="sm" className="shrink-0">
        Ver oportunidades
      </Button>
    </Card>
  );
}
