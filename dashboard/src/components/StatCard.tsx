import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string;
  tone?: "ink" | "up" | "down";
}

export function StatCard({ label, value, tone = "ink" }: StatCardProps) {
  return (
    <div className="rounded-lg border border-line bg-raised px-3 py-2.5">
      <p className="text-[11px] leading-tight text-faint">{label}</p>
      <p
        className={cn(
          "mt-1 text-[15px] font-bold tabular-nums",
          tone === "up" && "text-up",
          tone === "down" && "text-down",
        )}
      >
        {value}
      </p>
    </div>
  );
}
