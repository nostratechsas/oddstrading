"use client";

import { useState } from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { eventBookies, featuredEvents } from "@/lib/data";
import { cn } from "@/lib/utils";

const TABS = ["En vivo", "Próximos", "Finalizados"] as const;

const GRID = "grid grid-cols-[minmax(0,1.2fr)_repeat(9,minmax(0,1fr))_2.25rem] items-center gap-x-1";

export function EventsTable() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("En vivo");

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="gap-4">
        <CardTitle>Eventos destacados</CardTitle>
        <div role="tablist" aria-label="Estado de los eventos" className="flex items-center gap-1">
          {TABS.map((label) => {
            const selected = label === tab;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTab(label)}
                className={cn(
                  "flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-colors duration-150",
                  selected ? "bg-hover font-medium text-ink" : "text-muted hover:text-ink",
                )}
              >
                {label}
                {label === "En vivo" && (
                  <span className="rounded-full bg-up px-1.5 text-[10px] font-bold text-white">
                    12
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <div className="min-h-0 flex-1 overflow-x-auto px-4">
        <div className="min-w-[30rem]">
          {/* Bookie column headers: name over its 1 / X / 2 sub-labels. */}
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
                <span
                  key={`${bookie}-${market}`}
                  className="text-center text-[10px] text-faint"
                >
                  {market}
                </span>
              )),
            )}
            <span />
          </div>

          {featuredEvents.map((event, index) => (
            <div
              key={event.league}
              className={cn(index > 0 && "border-t border-line", "py-2.5")}
            >
              <p className="flex items-center gap-1.5 pb-1.5 text-[11px] text-faint">
                <i className="h-1 w-1 rounded-full bg-faint" aria-hidden="true" />
                {event.league}
              </p>

              <div className={cn(GRID, "cursor-pointer rounded-lg py-1 transition-colors duration-150 hover:bg-hover")}>
                <div className="min-w-0 pr-2">
                  {event.live && (
                    <p className="flex items-center gap-1.5 pb-1 text-[11px] font-medium text-down">
                      <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-down" aria-hidden="true" />
                      {event.live}
                    </p>
                  )}
                  {event.teams.map((team) => (
                    <p key={team.name} className="flex items-center gap-1.5 py-0.5 text-[13px]">
                      <i
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: team.dot }}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1 truncate text-ink">{team.name}</span>
                      {team.score !== undefined && (
                        <b className="pr-1 font-bold tabular-nums">{team.score}</b>
                      )}
                    </p>
                  ))}
                </div>

                {event.books.map((book) =>
                  book.odds.map((value, marketIndex) => (
                    <span
                      key={`${book.bookie}-${marketIndex}`}
                      className="text-center text-[12.5px] font-medium text-ink tabular-nums"
                    >
                      {value.toFixed(2)}
                    </span>
                  )),
                )}

                <span className="rounded bg-raised py-0.5 text-center text-[11px] font-medium text-muted">
                  +{event.more}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-line py-2.5 text-center">
        <a
          href="#"
          className="text-xs font-medium text-muted transition-colors duration-150 hover:text-ink"
        >
          Ver todos los eventos
        </a>
      </div>
    </Card>
  );
}
