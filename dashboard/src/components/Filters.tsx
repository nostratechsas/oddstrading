"use client";

import { CalendarDays, Search, X } from "lucide-react";

import { FlagEcuador } from "@/components/icons/flags";
import { Select } from "@/components/ui/select";
import { countryOptions, dayOptions, eventOptions, leagueOptions } from "@/lib/data";
import { useDashboard } from "@/lib/store";

export function Filters() {
  const { draft, setDraft, applyDraft, search, setSearch, filters } = useDashboard();

  // The top row commits on pick — it is the primary control surface. The
  // sidebar's copy of the same filters is the one that batches behind a button.
  const commit = (patch: Parameters<typeof setDraft>[0]) => {
    setDraft(patch);
    applyDraft();
  };

  const countries = countryOptions.map((option) => ({
    ...option,
    icon: option.value === "ec" ? <FlagEcuador className="h-3 w-4" /> : undefined,
  }));

  const dayLabel = dayOptions.find((option) => option.value === filters.day)?.label;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <Select
        options={countries}
        value={draft.country}
        onChange={(value) => commit({ country: value })}
        label="País"
        className="min-w-[13rem] flex-1 py-2.5 sm:max-w-[15rem] sm:flex-none"
      />
      <Select
        options={leagueOptions}
        value={draft.league}
        onChange={(value) => commit({ league: value })}
        label="Liga"
        className="min-w-[13rem] flex-1 py-2.5 sm:max-w-[16rem] sm:flex-none"
      />
      <Select
        options={eventOptions}
        value={draft.event}
        onChange={(value) => commit({ event: value })}
        label="Evento"
        className="min-w-[13rem] flex-1 py-2.5 sm:max-w-[14rem] sm:flex-none"
      />

      <div className="ml-auto flex flex-wrap items-center gap-3">
        <Select
          options={dayOptions}
          value={draft.day}
          onChange={(value) => commit({ day: value })}
          ariaLabel="Fecha"
          align="end"
          className="min-w-[11rem] py-2.5"
        />

        <label className="flex items-center gap-2 rounded-input border border-line-strong bg-panel px-3.5 py-2.5 transition-colors duration-150 focus-within:border-up/40 hover:bg-hover">
          <Search className="h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar evento..."
            aria-label="Buscar evento, equipo, casa o mercado"
            className="w-40 bg-transparent text-sm text-ink outline-none placeholder:text-faint [&::-webkit-search-cancel-button]:hidden"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Limpiar búsqueda"
              className="cursor-pointer text-faint transition-colors duration-150 hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </label>
      </div>

      {/* Restates the committed date when it is not today, so a filtered view
          never looks like live data for the current day. */}
      {filters.day !== "today" && (
        <p className="flex w-full items-center gap-1.5 text-xs text-faint">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          Mostrando datos de <b className="font-medium text-muted">{dayLabel}</b>
        </p>
      )}
    </div>
  );
}
