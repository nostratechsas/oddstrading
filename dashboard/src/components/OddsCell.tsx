import { ArrowDown, ArrowUp, ChevronsUpDown, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Dir } from "@/lib/data";

export interface OddsCellProps {
  value: number;
  dir: Dir;
  className?: string;
}

const ICONS: Record<Dir, React.ReactNode> = {
  up: <ArrowUp className="h-3.5 w-3.5 text-up" aria-label="Sube" />,
  down: <ArrowDown className="h-3.5 w-3.5 text-down" aria-label="Baja" />,
  flat: <Minus className="h-3.5 w-3.5 text-faint" aria-label="Sin cambios" />,
  mixed: <ChevronsUpDown className="h-3.5 w-3.5 text-muted" aria-label="Mixto" />,
};

/** The dark odds pill with its movement arrow — the table's core cell. */
export function OddsCell({ value, dir, className }: OddsCellProps) {
  return (
    <span
      className={cn(
        "inline-flex w-[4.5rem] items-center justify-center gap-1.5 rounded-lg bg-raised py-1.5 text-[13px] font-semibold tabular-nums transition-colors duration-150 group-hover:bg-hover",
        className,
      )}
    >
      {value.toFixed(2)}
      {ICONS[dir]}
    </span>
  );
}
