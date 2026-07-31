"use client";

import { useState } from "react";

import { useJitter } from "@/components/Locked";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { eventBookies, type FeaturedEvent } from "@/lib/data";
import { useDashboard } from "@/lib/store";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "live", label: "En vivo" },
  { id: "upcoming", label: "Próximos" },
  { id: "finished", label: "Finalizados" },
] as const;

const GRID =
  "grid grid-cols-[minmax(0,1.2fr)_repeat(9,minmax(0,1fr))_2.25rem] items-center gap-x-1";

export function EventsTable() {
  const { visibleEvents, filters, notify, setSection } = useDashboard();
  const [tab, setTab] = useState<FeaturedEvent["status"]>("live");
  const jitter = useJitter();

  // The top-bar "Evento" filter, when narrowed, wins over the local tab —
  // otherwise picking "Solo en vivo" up there would be silently ignored here.
  const status = filters.event === "all" ? tab : (filters.event as FeaturedEvent["status"]);
  const rows = visibleEvents.filter((event) => event.status === status);
  const liveCount = visibleEvents.filter((event) => event.status === "live").length;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="gap-4">
        <CardTitle>Eventos destacados</CardTitle>
        <div role="tablist" aria-label="Estado de los eventos" className="flex items-center gap-1">
          {TABS.map((item) => {
            const selected = item.id === status;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-colors duration-150",
                  selected ? "bg-hover font-medium text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                {item.id === "live" && liveCount > 0 && (
                  <span className="rounded-full bg-up px-1.5 text-[10px] font-bold text-white">
                    {liveCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <div className="min-h-0 flex-1 overflow-x-auto px-4">
        <div className="min-w-[30rem]">
          <div className={cn(GRID, "pb-1")}>
            <span />
            {eventBookies.map((bookie) => (
              <span
                key={bookie}
                className="col-span-3 text-center text-[11px] font-semibold text-muted"
              >
                {bookie}
              </span>
            ))}
            <span />
          </div>
          <div className={cn(GRID, "border-b border-line pb-1.5")}>
            <span />
            {eventBookies.map((bookie) =>
              ["1", "X", "2"].map((market) => (
                <span key={`${bookie}-${market}`} className="text-center text-[10px] text-faint">
                  {market}
                </span>
              )),
            )}
            <span />
          </div>

          {rows.map((event, index) => (
            <div
              key={`${event.leagueId}-${event.teams[0].name}`}
              className={cn(index > 0 && "border-t border-line", "py-2.5")}
            >
              <p className="flex items-center gap-1.5 pb-1.5 text-[11px] text-faint">
                <i className="h-1 w-1 rounded-full bg-faint" aria-hidden="true" />
                {event.league}
                {event.time && !event.live && <span className="ml-auto">{event.time}</span>}
              </p>

              <button
                type="button"
                onClick={() =>
                  notify(`${event.teams[0].name} vs ${event.teams[1].name} · ${event.league}`)
                }
                className={cn(
                  GRID,
                  "w-full cursor-pointer rounded-lg py-1 text-left transition-colors duration-150 hover:bg-hover",
                )}
              >
                <span className="min-w-0 pr-2">
                  {event.live && (
                    <span className="flex items-center gap-1.5 pb-1 text-[11px] font-medium text-down">
                      <i
                        className="h-1.5 w-1.5 animate-pulse rounded-full bg-down"
                        aria-hidden="true"
                      />
                      {event.live}
                    </span>
                  )}
                  {event.teams.map((team) => (
                    <span key={team.name} className="flex items-center gap-1.5 py-0.5 text-[13px]">
                      <i
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: team.dot }}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1 truncate text-ink">{team.name}</span>
                      {team.score !== undefined && (
                        <b className="pr-1 font-bold tabular-nums">{team.score}</b>
                      )}
                    </span>
                  ))}
                </span>

                {event.books.map((book, bookIndex) =>
                  book.odds.map((value, marketIndex) => (
                    <span
                      key={`${book.bookie}-${marketIndex}`}
                      className="text-center text-[12.5px] font-medium text-ink tabular-nums"
                    >
                      {jitter(value, index * 10 + bookIndex * 3 + marketIndex).toFixed(2)}
                    </span>
                  )),
                )}

                <span className="rounded bg-raised py-0.5 text-center text-[11px] font-medium text-muted">
                  +{event.more}
                </span>
              </button>
            </div>
          ))}

          {rows.length === 0 && (
            <p className="py-10 text-center text-sm text-faint">
              No hay eventos con estos filtros.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-line py-2.5 text-center">
        <button
          type="button"
          onClick={() => setSection("mercados")}
          className="cursor-pointer text-xs font-medium text-muted transition-colors duration-150 hover:text-ink"
        >
          Ver todos los eventos
        </button>
      </div>
    </Card>
  );
}
