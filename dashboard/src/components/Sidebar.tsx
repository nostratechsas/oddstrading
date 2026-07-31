"use client";

import { RotateCcw, Shield, Trophy } from "lucide-react";

import { SportIcon } from "@/components/icons/sports";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import {
  countryOptions,
  dayOptions,
  leagueOptions,
  leagues,
  newsfeed,
  sports,
} from "@/lib/data";
import { useDashboard } from "@/lib/store";
import { cn } from "@/lib/utils";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 pb-2 text-[11px] font-semibold tracking-[0.14em] text-faint uppercase">
      {children}
    </p>
  );
}

/** Sports beyond this are hidden until "Ver todos" is pressed. */
const SPORTS_PREVIEW = 10;

export function Sidebar() {
  const {
    sport,
    setSport,
    filters,
    draft,
    setDraft,
    applyDraft,
    resetFilters,
    dirty,
    expanded,
    toggleExpanded,
    notify,
  } = useDashboard();

  const showAllSports = expanded.sports ?? false;
  const shownSports = showAllSports ? sports : sports.slice(0, SPORTS_PREVIEW);

  return (
    <aside className="hidden w-[220px] shrink-0 flex-col overflow-y-auto border-r border-line bg-rail py-4 lg:flex">
      <SectionLabel>Deportes</SectionLabel>

      <nav className="flex flex-col gap-0.5 px-2" aria-label="Deportes">
        {shownSports.map((item) => {
          const active = item.icon === sport;
          return (
            <button
              key={item.icon}
              type="button"
              aria-pressed={active}
              onClick={() => setSport(item.icon)}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors duration-150",
                active ? "bg-hover font-medium text-ink" : "text-muted hover:bg-hover hover:text-ink",
              )}
            >
              <SportIcon name={item.icon} tint={item.tint} />
              <span className="min-w-0 flex-1 truncate">{item.name}</span>
              <span
                className={cn(
                  "text-xs font-semibold tabular-nums",
                  active ? "rounded-md bg-up-soft px-1.5 py-0.5 text-up" : "text-up",
                )}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </nav>

      {sports.length > SPORTS_PREVIEW && (
        <button
          type="button"
          onClick={() => toggleExpanded("sports")}
          className="mt-1.5 cursor-pointer px-4.5 text-left text-xs text-faint transition-colors duration-150 hover:text-muted"
        >
          {showAllSports ? "Ver menos" : "Ver todos"}
        </button>
      )}

      <div className="mt-6">
        <SectionLabel>Ligas</SectionLabel>
        <nav className="flex flex-col gap-0.5 px-2" aria-label="Ligas">
          {leagues.map((league) => {
            const Icon = league.kind === "cup" ? Trophy : Shield;
            const active = filters.league === league.id;
            return (
              <button
                key={league.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  // The sidebar commits immediately — it is a navigation
                  // control, not part of the "Aplicar filtros" draft.
                  setDraft({ league: league.id });
                  applyDraft();
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors duration-150",
                  active
                    ? "bg-hover font-medium text-ink"
                    : "text-muted hover:bg-hover hover:text-ink",
                )}
              >
                <Icon
                  className="h-4 w-4 shrink-0"
                  style={{ color: league.tint }}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate">{league.name}</span>
                <span className="text-xs font-semibold text-up tabular-nums">{league.count}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-6">
        <SectionLabel>Filtros rápidos</SectionLabel>
        <div className="flex flex-col gap-2 px-3">
          <Select
            options={countryOptions}
            value={draft.country}
            onChange={(value) => setDraft({ country: value })}
            ariaLabel="País"
            className="bg-raised text-[13px] text-muted"
          />
          <Select
            options={leagueOptions}
            value={draft.league}
            onChange={(value) => setDraft({ league: value })}
            ariaLabel="Liga"
            className="bg-raised text-[13px] text-muted"
          />
          <Select
            options={dayOptions}
            value={draft.day}
            onChange={(value) => setDraft({ day: value })}
            ariaLabel="Periodo"
            className="bg-raised text-[13px] text-muted"
          />

          <Button fullWidth onClick={applyDraft} className="mt-1">
            Aplicar filtros
            {dirty && (
              <span
                className="h-1.5 w-1.5 rounded-full bg-white"
                aria-label="Hay cambios sin aplicar"
              />
            )}
          </Button>

          <button
            type="button"
            onClick={resetFilters}
            className="flex cursor-pointer items-center justify-center gap-1.5 rounded-btn py-1.5 text-xs text-faint transition-colors duration-150 hover:text-ink"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Restablecer
          </button>
        </div>
      </div>

      <div className="mt-6">
        <SectionLabel>Newsfeed</SectionLabel>
        <div className="flex flex-col gap-2 px-3">
          {newsfeed.map((item) => (
            <button
              key={item.text}
              type="button"
              onClick={() => notify(item.text)}
              className="flex w-full cursor-pointer gap-2.5 rounded-lg border border-line bg-panel p-2.5 text-left transition-colors duration-150 hover:bg-hover"
            >
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ background: item.gradient }}
                aria-hidden="true"
              >
                {item.initials}
              </span>
              <span className="min-w-0">
                <span className="block text-xs leading-snug text-ink">
                  {item.text}
                  {item.highlight && (
                    <b className="ml-1 font-semibold text-up tabular-nums">{item.highlight}</b>
                  )}
                </span>
                <span className="mt-0.5 block text-[11px] text-faint">{item.time}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
