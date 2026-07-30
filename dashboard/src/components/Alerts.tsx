import { Activity, ArrowUpRight, TrendingUp, Zap } from "lucide-react";

import { Card, CardHeader, CardLink, CardTitle } from "@/components/ui/card";
import { alerts, type Alert } from "@/lib/data";
import { cn } from "@/lib/utils";

const ICONS: Record<Alert["icon"], typeof TrendingUp> = {
  change: TrendingUp,
  arb: Zap,
  boost: ArrowUpRight,
  activity: Activity,
};

const TONES: Record<Alert["tone"], { chip: string; text: string }> = {
  up: { chip: "bg-up-soft", text: "text-up" },
  gold: { chip: "bg-gold-soft", text: "text-gold" },
  down: { chip: "bg-down-soft", text: "text-down" },
};

export function Alerts() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Alertas activas</CardTitle>
        <CardLink href="#">Ver todas</CardLink>
      </CardHeader>

      <ul className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {alerts.map((alert) => {
          const Icon = ICONS[alert.icon];
          const tone = TONES[alert.tone];
          return (
            <li
              key={alert.title}
              className="flex cursor-pointer items-start gap-3 border-b border-line px-4 py-3.5 transition-colors duration-150 last:border-0 hover:bg-hover"
            >
              <span
                className={cn(
                  "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  tone.chip,
                )}
              >
                <Icon className={cn("h-4 w-4", tone.text)} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className={cn("text-[13px] font-semibold", tone.text)}>{alert.title}</p>
                <p className="mt-0.5 truncate text-xs text-muted">{alert.body}</p>
              </div>
              <span className="mt-0.5 shrink-0 text-[11px] whitespace-nowrap text-faint">
                {alert.time}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
