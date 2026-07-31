"use client";

import { Activity, ArrowUpRight, Check, TrendingUp, Zap } from "lucide-react";

import { Card, CardHeader, CardLink, CardTitle } from "@/components/ui/card";
import { alerts, type Alert } from "@/lib/data";
import { useDashboard } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const { setSection, notify } = useDashboard();
  // Dismissed alerts stay dismissed for the session — the list is the one
  // widget where "I have seen this" is the whole point.
  const [dismissed, setDismissed] = useState<string[]>([]);

  const shown = alerts.filter((alert) => !dismissed.includes(alert.title));

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Alertas activas</CardTitle>
        <CardLink onClick={() => setSection("alertas")}>Ver todas</CardLink>
      </CardHeader>

      <ul className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {shown.map((alert) => {
          const Icon = ICONS[alert.icon];
          const tone = TONES[alert.tone];
          return (
            <li
              key={alert.title}
              className="group flex items-start gap-3 border-b border-line px-4 py-3.5 transition-colors duration-150 last:border-0 hover:bg-hover"
            >
              <span
                className={cn(
                  "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  tone.chip,
                )}
              >
                <Icon className={cn("h-4 w-4", tone.text)} aria-hidden="true" />
              </span>
              <button
                type="button"
                onClick={() => notify(alert.body)}
                className="min-w-0 flex-1 cursor-pointer text-left"
              >
                <span className={cn("block text-[13px] font-semibold", tone.text)}>
                  {alert.title}
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted">{alert.body}</span>
              </button>
              <span className="mt-0.5 flex shrink-0 items-center gap-1.5">
                <span className="text-[11px] whitespace-nowrap text-faint">{alert.time}</span>
                <button
                  type="button"
                  onClick={() => setDismissed((current) => [...current, alert.title])}
                  aria-label={`Marcar "${alert.title}" como vista`}
                  className="cursor-pointer rounded p-1 text-faint opacity-0 transition-all duration-150 group-hover:opacity-100 hover:bg-raised hover:text-up"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
              </span>
            </li>
          );
        })}

        {shown.length === 0 && (
          <li className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center">
            <Check className="h-6 w-6 text-up" aria-hidden="true" />
            <p className="text-xs text-faint">Todo revisado.</p>
            <button
              type="button"
              onClick={() => setDismissed([])}
              className="cursor-pointer text-xs font-medium text-up transition-colors duration-150 hover:text-[#4ade80]"
            >
              Restaurar alertas
            </button>
          </li>
        )}
      </ul>
    </Card>
  );
}
