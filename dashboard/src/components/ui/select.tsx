import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Muted prefix — "País", "Liga", "Evento". */
  label?: string;
  value: React.ReactNode;
}

/**
 * Dark select trigger. The capture shows closed selects only, so this renders
 * the trigger; wiring a listbox on top does not change the visual.
 */
export function Select({ label, value, className, ...props }: SelectProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-input border border-line-strong bg-panel px-3.5 py-2 text-sm transition-colors duration-150 hover:bg-hover",
        className,
      )}
      {...props}
    >
      {label && <span className="shrink-0 text-muted">{label}</span>}
      <span className="min-w-0 flex-1 truncate text-left font-medium">{value}</span>
      <ChevronDown className="h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
    </button>
  );
}
