import { cn } from "@/lib/utils";

/**
 * Flag of Ecuador — inline SVG (yellow half, blue and red quarters), so the
 * filter row needs no emoji font and no external flag CDN.
 */
export function FlagEcuador({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 14"
      className={cn("h-3.5 w-5 shrink-0", className)}
      role="img"
      aria-label="Bandera de Ecuador"
    >
      <clipPath id="flag-ec-round">
        <rect width="20" height="14" rx="2" />
      </clipPath>
      <g clipPath="url(#flag-ec-round)">
        <rect width="20" height="7" fill="#ffd100" />
        <rect y="7" width="20" height="3.5" fill="#0072ce" />
        <rect y="10.5" width="20" height="3.5" fill="#ef3340" />
      </g>
    </svg>
  );
}
