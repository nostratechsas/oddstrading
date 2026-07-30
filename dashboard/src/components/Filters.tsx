import { CalendarDays, Search } from "lucide-react";

import { Select } from "@/components/ui/select";

export function Filters() {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <Select
        label="País"
        value={
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true">🇨🇴</span> Colombia
          </span>
        }
        className="min-w-[13rem] flex-1 py-2.5 sm:flex-none"
      />
      <Select label="Liga" value="Primera A" className="min-w-[13rem] flex-1 py-2.5 sm:flex-none" />
      <Select label="Evento" value="Todos" className="min-w-[13rem] flex-1 py-2.5 sm:flex-none" />

      <div className="ml-auto flex flex-wrap items-center gap-3">
        <Select
          value={
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted" aria-hidden="true" />
              Hoy, 22 May
            </span>
          }
          className="py-2.5"
        />
        <label className="flex items-center gap-2 rounded-input border border-line-strong bg-panel px-3.5 py-2.5 transition-colors duration-150 focus-within:border-up/40 hover:bg-hover">
          <Search className="h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar evento..."
            className="w-40 bg-transparent text-sm text-ink outline-none placeholder:text-faint"
          />
        </label>
      </div>
    </div>
  );
}
