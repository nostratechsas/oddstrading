import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { newsfeed, quickFilters, sports } from "@/lib/data";
import { cn } from "@/lib/utils";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 pb-2 text-[11px] font-semibold tracking-[0.14em] text-faint uppercase">
      {children}
    </p>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-[220px] shrink-0 flex-col overflow-y-auto border-r border-line bg-rail py-4 lg:flex">
      <SectionLabel>Deportes</SectionLabel>

      <nav className="flex flex-col gap-0.5 px-2" aria-label="Deportes">
        {sports.map((sport) => (
          <a
            key={sport.name}
            href="#"
            aria-current={sport.active ? "page" : undefined}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors duration-150",
              sport.active
                ? "bg-hover font-medium text-ink"
                : "text-muted hover:bg-hover hover:text-ink",
            )}
          >
            <span className="text-sm leading-none" aria-hidden="true">
              {sport.icon}
            </span>
            <span className="min-w-0 flex-1 truncate">{sport.name}</span>
            <span
              className={cn(
                "text-xs font-semibold tabular-nums",
                sport.active
                  ? "rounded-md bg-up-soft px-1.5 py-0.5 text-up"
                  : "text-up",
              )}
            >
              {sport.count}
            </span>
          </a>
        ))}
      </nav>

      <a href="#" className="mt-1.5 px-4.5 text-xs text-faint transition-colors duration-150 hover:text-muted">
        Ver todos
      </a>

      <div className="mt-6">
        <SectionLabel>Filtros rápidos</SectionLabel>
        <div className="flex flex-col gap-2 px-3">
          {quickFilters.map((filter) => (
            <Select key={filter} value={filter} className="w-full justify-between bg-raised text-[13px] text-muted" />
          ))}
          <Button fullWidth className="mt-1">
            Aplicar filtros
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <SectionLabel>Newsfeed</SectionLabel>
        <div className="flex flex-col gap-2 px-3">
          {newsfeed.map((item) => (
            <article
              key={item.text}
              className="flex cursor-pointer gap-2.5 rounded-lg border border-line bg-panel p-2.5 transition-colors duration-150 hover:bg-hover"
            >
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ background: item.gradient }}
                aria-hidden="true"
              >
                {item.initials}
              </span>
              <div className="min-w-0">
                <p className="text-xs leading-snug text-ink">
                  {item.text}
                  {item.highlight && (
                    <b className="ml-1 font-semibold text-up tabular-nums">{item.highlight}</b>
                  )}
                </p>
                <p className="mt-0.5 text-[11px] text-faint">{item.time}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
