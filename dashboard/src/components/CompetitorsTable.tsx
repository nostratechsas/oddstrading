"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { BookieLogo } from "@/components/BookieLogo";
import { OddsCell } from "@/components/OddsCell";
import { Sparkline } from "@/components/Sparkline";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { competitors, type Competitor } from "@/lib/data";
import { cn } from "@/lib/utils";

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
  const table = useReactTable({
    data: competitors,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Top 10 competidores por Colombia</CardTitle>
        <Select value="Comparación: Margen" className="py-1.5 text-xs" />
      </CardHeader>

      <div className="min-h-0 flex-1 overflow-x-auto px-3">
        <table className="w-full min-w-[42rem] border-separate border-spacing-0">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      "px-2 pb-2 text-left text-[11px] font-medium text-faint",
                      header.column.id.startsWith("odds") && "text-center",
                      header.column.parent?.id === "market" && "pb-2",
                      header.column.id === "market" && "pt-1 pb-0.5 text-center",
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="group transition-colors duration-150 hover:bg-hover">
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
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3">
        <p className="text-xs text-faint">Mostrando 10 de 15 casas de apuestas</p>
        <Legend />
      </div>
    </Card>
  );
}
