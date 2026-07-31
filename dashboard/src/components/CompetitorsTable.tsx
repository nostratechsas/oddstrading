"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react";

import { BookieLogo } from "@/components/BookieLogo";
import { OddsCell } from "@/components/OddsCell";
import { Sparkline } from "@/components/Sparkline";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { comparisonOptions, type Competitor } from "@/lib/data";
import { useDashboard, type SortKey } from "@/lib/store";
import { cn } from "@/lib/utils";

/** Rows shown before "Ver todas" expands the list. */
const PREVIEW = 10;

const columnHelper = createColumnHelper<Competitor>();

const columns = [
  columnHelper.accessor("rank", {
    id: "rank",
    header: () => (
      <span className="block leading-tight">
        Ranking
        <br />
        <span className="font-normal">(por margen)</span>
      </span>
    ),
    cell: (info) => (
      <span className="pl-2 text-sm font-medium text-muted tabular-nums">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("bookie", {
    id: "bookie",
    header: "Casa de apuestas",
    cell: (info) => (
      <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
        <BookieLogo name={info.getValue()} />
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("margin", {
    id: "margin",
    header: "Margen total",
    // Sorts on the number, not the "4.21%" string — otherwise 10% would sort
    // before 5%.
    sortingFn: (a, b) => parseFloat(a.original.margin) - parseFloat(b.original.margin),
    cell: (info) => <span className="text-sm text-ink tabular-nums">{info.getValue()}</span>,
  }),
  columnHelper.group({
    id: "market",
    header: "Mercado 1X2 - Margen Promedio",
    columns: (["1", "X", "2"] as const).map((label, index) =>
      columnHelper.display({
        id: `odds-${label}`,
        header: label,
        cell: (info) => {
          const odds = info.row.original.odds[index];
          return <OddsCell value={odds.value} dir={odds.dir} />;
        },
      }),
    ),
  }),
  columnHelper.display({
    id: "trend",
    header: "",
    cell: (info) => (
      <Sparkline
        data={info.row.original.trend}
        tone={info.row.original.trendTone}
        className="ml-auto"
      />
    ),
  }),
];

function Legend() {
  return (
    <div className="flex items-center gap-4 text-xs text-faint">
      <span className="flex items-center gap-1.5">
        <i className="h-1.5 w-1.5 rounded-full bg-up" aria-hidden="true" /> Sube
      </span>
      <span className="flex items-center gap-1.5">
        <i className="h-1.5 w-1.5 rounded-full bg-down" aria-hidden="true" /> Baja
      </span>
      <span className="flex items-center gap-1.5">
        <i className="h-px w-2.5 bg-faint" aria-hidden="true" /> Sin cambios
      </span>
    </div>
  );
}

export function CompetitorsTable() {
  const { visibleCompetitors, sort, toggleSort, expanded, toggleExpanded, notify, search } =
    useDashboard();

  // The store owns the sort so the header and the comparison select cannot
  // disagree; TanStack consumes it as controlled state.
  const sorting: SortingState = [{ id: sort.key, desc: sort.dir === "desc" }];

  const table = useReactTable({
    data: visibleCompetitors,
    columns,
    state: { sorting },
    onSortingChange: () => {
      /* Sorting is driven through the store's toggleSort. */
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const allRows = table.getRowModel().rows;
  const showAll = expanded.competitors ?? false;
  const rows = showAll ? allRows : allRows.slice(0, PREVIEW);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Top 10 competidores por Ecuador</CardTitle>
        <Select
          options={comparisonOptions}
          value={sort.key}
          onChange={(value) => toggleSort(value as SortKey)}
          ariaLabel="Criterio de comparación"
          align="end"
          className="w-auto min-w-[12rem] py-1.5 text-xs"
        />
      </CardHeader>

      <div className="min-h-0 flex-1 overflow-x-auto px-3">
        <table className="w-full min-w-[42rem] border-separate border-spacing-0">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const key = header.column.id as SortKey;
                  const sortable = ["rank", "bookie", "margin"].includes(key);
                  const active = sortable && sort.key === key;
                  const Icon = !active ? ArrowDownUp : sort.dir === "asc" ? ArrowUp : ArrowDown;

                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        "px-2 pb-2 text-left text-[11px] font-medium text-faint",
                        header.column.id.startsWith("odds") && "text-center",
                        header.column.id === "market" && "pt-1 pb-0.5 text-center",
                      )}
                    >
                      {header.isPlaceholder ? null : sortable ? (
                        <button
                          type="button"
                          onClick={() => toggleSort(key)}
                          className={cn(
                            "group inline-flex cursor-pointer items-center gap-1 text-left transition-colors duration-150 hover:text-ink",
                            active && "text-ink",
                          )}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <Icon
                            className={cn(
                              "h-3 w-3 shrink-0 transition-opacity duration-150",
                              active ? "text-up opacity-100" : "opacity-0 group-hover:opacity-60",
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={() =>
                  notify(`${row.original.bookie} · margen ${row.original.margin}`)
                }
                className="group cursor-pointer transition-colors duration-150 hover:bg-hover"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={cn(
                      "border-b border-line px-2 py-2 first:rounded-l-lg last:rounded-r-lg group-last:border-0",
                      cell.column.id.startsWith("odds") && "text-center",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-sm text-faint">
                  Ninguna casa coincide con «{search}».
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3">
        <p className="text-xs text-faint">
          Mostrando {rows.length} de {visibleCompetitors.length} casas
          {visibleCompetitors.length > PREVIEW && (
            <button
              type="button"
              onClick={() => toggleExpanded("competitors")}
              className="ml-2 cursor-pointer font-medium text-up transition-colors duration-150 hover:text-[#4ade80]"
            >
              {showAll ? "Ver menos" : "Ver todas"}
            </button>
          )}
        </p>
        <Legend />
      </div>
    </Card>
  );
}
