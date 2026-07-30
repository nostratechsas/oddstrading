import Image from "next/image";

import { bookieLogos } from "@/lib/data";
import { cn } from "@/lib/utils";

export interface BookieLogoProps {
  name: string;
  size?: "sm" | "md";
  className?: string;
}

const BOX = { sm: "h-5 w-5", md: "h-6 w-6" } as const;

/**
 * Bookmaker mark, on a light plate.
 *
 * Several of these logos are dark-on-transparent — Ecuabet is flat black — so
 * they need a light chip regardless of the dark theme, the same treatment the
 * landing gives its logo wall. Unknown names fall back to a monogram.
 */
export function BookieLogo({ name, size = "md", className }: BookieLogoProps) {
  const src = bookieLogos[name];

  if (!src) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full bg-slate-600 text-[9px] font-bold text-white",
          BOX[size],
          className,
        )}
        aria-hidden="true"
      >
        {name.slice(0, 2)}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 ring-1 ring-line-strong",
        BOX[size],
        className,
      )}
    >
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        width={48}
        height={48}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
