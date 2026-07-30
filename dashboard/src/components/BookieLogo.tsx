import { bookieLogos } from "@/lib/data";
import { cn } from "@/lib/utils";

export interface BookieLogoProps {
  name: string;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Branded monogram chip. Real bookmaker marks are registered trademarks, so
 * the dashboard ships monograms in each brand's colour instead of unlicensed
 * logo files — drop real assets in later without touching callers.
 */
export function BookieLogo({ name, size = "md", className }: BookieLogoProps) {
  const logo = bookieLogos[name] ?? { bg: "#334155", fg: "#ffffff", label: name.slice(0, 2) };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-bold",
        size === "md" ? "h-6 w-6 text-[9px]" : "h-5 w-5 text-[8px]",
        className,
      )}
      style={{ background: logo.bg, color: logo.fg }}
      aria-hidden="true"
    >
      {logo.label}
    </span>
  );
}
