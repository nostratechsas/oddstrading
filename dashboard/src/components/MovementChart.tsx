"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useJitter } from "@/components/Locked";
import { StatCard } from "@/components/StatCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import {
  eventBookies,
  movementSeries,
  movementStats,
  movementTicks,
  rangeOptions,
} from "@/lib/data";
import { useDashboard } from "@/lib/store";

/**
 * Series colours from the reference capture — validated against the dark
 * surface (CVD ΔE 8.9, normal 22.4, contrast ≥ 3:1). Identity is never
 * colour-alone: the legend and the tooltip name every series.
 */
const SERIES = [
  { key: "local", label: "1 (Local)", color: "#2563eb" },
  { key: "empate", label: "X (Empate)", color: "#facc15" },
  { key: "visita", label: "2 (Visita)", color: "#22c55e" },
] as const;

const AXIS_TICK = { fontSize: 10, fill: "#64748b" } as const;

interface ChartTooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: ReadonlyArray<{ dataKey?: string | number; value?: number }>;
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line-strong bg-rail px-3 py-2 shadow-xl">
      <p className="pb-1 text-[11px] font-medium text-muted">{label}</p>
      {payload.map((entry) => {
        const series = SERIES.find((item) => item.key === entry.dataKey);
        return (
          <p key={String(entry.dataKey)} className="flex items-center gap-2 py-0.5 text-xs">
            <i
              className="h-2 w-2 rounded-full"
              style={{ background: series?.color }}
              aria-hidden="true"
            />
            <span className="text-muted">{series?.label}</span>
            <b className="ml-auto pl-3 font-semibold text-ink tabular-nums">
              {entry.value?.toFixed(2)}
            </b>
          </p>
        );
      })}
    </div>
  );
}

/** How many of the 25 sampled points each range keeps. */
const RANGE_POINTS: Record<string, number> = { "6h": 25, "12h": 13, "24h": 9 };

export function MovementChart() {
  const { chartBookie, setChartBookie, chartRange, setChartRange } = useDashboard();
  const jitter = useJitter();

  // A longer window is sampled more coarsely, so the line stays readable
  // instead of turning into noise at the same width.
  const step = Math.max(1, Math.round(25 / (RANGE_POINTS[chartRange] ?? 25)));
  const points = movementSeries
    .filter((_, index) => index % step === 0)
    .map((point, index) => ({
      ...point,
      local: jitter(point.local, index * 4),
      empate: jitter(point.empate, index * 4 + 1),
      visita: jitter(point.visita, index * 4 + 2),
      vol: jitter(point.vol, index * 4 + 3),
    }));

  const bookieOptions = eventBookies.map((bookie) => ({ value: bookie, label: bookie }));

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-wrap">
        <CardTitle>Análisis de movimientos</CardTitle>
        <div className="flex items-center gap-2">
          <Select
            options={bookieOptions}
            value={chartBookie}
            onChange={setChartBookie}
            ariaLabel="Casa de apuestas"
            align="end"
            className="w-auto min-w-[7.5rem] px-2.5 py-1.5 text-xs"
          />
          <Select
            options={rangeOptions}
            value={chartRange}
            onChange={setChartRange}
            ariaLabel="Rango temporal"
            align="end"
            className="w-auto min-w-[9.5rem] px-2.5 py-1.5 text-xs"
          />
        </div>
      </CardHeader>

      <div className="px-5">
        <p className="text-sm font-semibold text-ink">
          Barcelona SC vs Emelec{" "}
          <span className="ml-1 text-xs font-normal text-faint">1X2 · {chartBookie}</span>
        </p>
        <div className="mt-2 flex items-center gap-4">
          {SERIES.map((series) => (
            <span key={series.key} className="flex items-center gap-1.5 text-[11px] text-muted">
              <i
                className="h-2 w-2 rounded-full"
                style={{ background: series.color }}
                aria-hidden="true"
              />
              {series.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 h-40 min-h-0 flex-1 pr-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points} margin={{ top: 6, right: 6, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="time"
              ticks={movementTicks}
              tick={AXIS_TICK}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(value: number) => value.toFixed(2)}
              tick={AXIS_TICK}
              axisLine={false}
              tickLine={false}
              width={38}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.15)", strokeDasharray: "3 3" }}
            />
            {SERIES.map((series) => (
              <Line
                key={series.key}
                type="monotone"
                dataKey={series.key}
                stroke={series.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3, strokeWidth: 0 }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="px-5 pt-1">
        <p className="text-[10px] text-faint">Volumen</p>
        <div className="mt-1 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={points} margin={{ top: 0, right: 6, bottom: 0, left: 38 }}>
              <Bar
                dataKey="vol"
                fill="#22c55e"
                fillOpacity={0.45}
                radius={[2, 2, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 p-4 pt-3">
        {movementStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} tone={stat.tone} />
        ))}
      </div>
    </Card>
  );
}
