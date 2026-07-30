import { cn } from "@/lib/utils";

export interface SparklineProps {
  data: number[];
  tone: "up" | "down";
  className?: string;
}

const TONES = { up: "#22c55e", down: "#ef4444" } as const;

/**
 * Inline SVG sparkline — the table trend column. Hand-rolled instead of a
 * Recharts instance because the dashboard renders ~20 of these per paint.
 */
export function Sparkline({ data, tone, className }: SparklineProps) {
  const width = 64;
  const height = 22;
  const pad = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = pad + (index / (data.length - 1)) * (width - pad * 2);
      const y = height - pad - ((value - min) / span) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-[22px] w-16", className)}
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke={TONES[tone]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 2.5px ${TONES[tone]}66)` }}
      />
    </svg>
  );
}
