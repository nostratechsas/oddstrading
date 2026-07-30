import { Gamepad2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Sport icons — hand-drawn 24×24 stroke SVGs in the Lucide idiom (currentColor,
 * round caps and joins), because Lucide ships no soccer/basketball/tennis set.
 * Each sport tints its icon via text colour on the wrapper.
 */
export type SportIconName =
  | "soccer"
  | "basketball"
  | "tennis"
  | "baseball"
  | "hockey"
  | "volleyball"
  | "esports"
  | "football"
  | "mma"
  | "cricket";

interface GlyphProps {
  className?: string;
}

const base = (className?: string) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: cn("h-4 w-4", className),
  "aria-hidden": true as const,
});

const Soccer = ({ className }: GlyphProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8.8 15.05 11 13.9 14.6h-3.8L8.95 11 12 8.8Z" />
    <path d="M12 8.8V3.6M15.05 11l4.4-1.4M13.9 14.6l2.6 4M10.1 14.6l-2.6 4M8.95 11l-4.4-1.4" />
  </svg>
);

const Basketball = ({ className }: GlyphProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3 12h18" />
    <path d="M5.7 5.7a12.5 12.5 0 0 1 0 12.6M18.3 5.7a12.5 12.5 0 0 0 0 12.6" />
  </svg>
);

const Tennis = ({ className }: GlyphProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M5.3 6.2a12.8 12.8 0 0 1 0 11.6M18.7 6.2a12.8 12.8 0 0 0 0 11.6" />
  </svg>
);

const Baseball = ({ className }: GlyphProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M6.2 5.3a11.6 11.6 0 0 1 0 13.4M17.8 5.3a11.6 11.6 0 0 0 0 13.4" />
    <path d="M5.2 9.7l1.7.6M5.2 14.3l1.7-.6M18.8 9.7l-1.7.6M18.8 14.3l-1.7-.6" />
  </svg>
);

const Hockey = ({ className }: GlyphProps) => (
  <svg {...base(className)}>
    <path d="M4.5 3l6.1 11.3a2.5 2.5 0 0 0 2.2 1.3h4.7" />
    <path d="M19.5 3l-5.6 10.4" />
    <ellipse cx="8" cy="19.5" rx="3.4" ry="1.6" />
  </svg>
);

const Volleyball = ({ className }: GlyphProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 12a9 9 0 0 0 8.7-2.4M12 12a9 9 0 0 0-7.9 4.5M12 12a9 9 0 0 1-.8-9" />
  </svg>
);

const Football = ({ className }: GlyphProps) => (
  <svg {...base(className)}>
    <path d="M5 19c-1.6-3.9-.1-9.4 3.4-12.9S16.1 1.4 19 5c1.6 3.9.1 9.4-3.4 12.9S7.9 22.6 5 19Z" />
    <path d="M9.2 14.8l5.6-5.6" />
    <path d="M10.4 12.2l1.4 1.4M12.2 10.4l1.4 1.4" />
  </svg>
);

const Mma = ({ className }: GlyphProps) => (
  <svg {...base(className)}>
    <path d="M7.5 10.5v-4A3.5 3.5 0 0 1 11 3h3a3.5 3.5 0 0 1 3.5 3.5v4a4.5 4.5 0 0 1-2 3.7v2.3h-7v-2.3a4.5 4.5 0 0 1-2-3.7Z" />
    <path d="M7.5 7.5H6a1.8 1.8 0 0 0-1.8 1.8v.9A2.8 2.8 0 0 0 7 13h.5" />
    <path d="M9.5 16.5V21h5v-4.5" />
  </svg>
);

const Cricket = ({ className }: GlyphProps) => (
  <svg {...base(className)}>
    <path d="M3.6 19.2l1.2 1.2a1.5 1.5 0 0 0 2.1 0l8.6-9.4-2.5-2.5-9.4 8.6a1.5 1.5 0 0 0 0 2.1Z" />
    <path d="M13 8.5l3-3" />
    <circle cx="18" cy="17.5" r="2.5" />
  </svg>
);

const GLYPHS: Record<SportIconName, (props: GlyphProps) => React.ReactNode> = {
  soccer: Soccer,
  basketball: Basketball,
  tennis: Tennis,
  baseball: Baseball,
  hockey: Hockey,
  volleyball: Volleyball,
  esports: ({ className }) => <Gamepad2 className={cn("h-4 w-4", className)} aria-hidden="true" />,
  football: Football,
  mma: Mma,
  cricket: Cricket,
};

export interface SportIconProps {
  name: SportIconName;
  /** Icon tint, applied as text colour. */
  tint?: string;
  className?: string;
}

export function SportIcon({ name, tint, className }: SportIconProps) {
  const Glyph = GLYPHS[name];
  return (
    <span className="inline-flex shrink-0" style={tint ? { color: tint } : undefined}>
      <Glyph className={className} />
    </span>
  );
}
