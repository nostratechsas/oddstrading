"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Lock, Shuffle, Sparkles, Timer } from "lucide-react";

import { cn } from "@/lib/utils";

/** How long a teaser stays open. */
const PREVIEW_SECONDS = 15;

interface PreviewState {
  preview: boolean;
  /** Changes on every reveal, so each teaser shows different numbers. */
  seed: number;
}

const PreviewContext = createContext<PreviewState>({ preview: false, seed: 0 });

/**
 * Scrambles a figure while a teaser is open.
 *
 * The preview deliberately shows *made-up* numbers — a locked widget must not
 * leak the real feed just because someone pressed the button. Values are
 * derived from the seed and the index rather than `Math.random()` per render,
 * so they hold still instead of flickering on every paint.
 */
export function useJitter() {
  const { preview, seed } = useContext(PreviewContext);

  return useCallback(
    (value: number, index = 0): number => {
      if (!preview) return value;
      const noise = Math.sin(seed * 0.0001 + index * 12.9898) * 43758.5453;
      const fraction = noise - Math.floor(noise);
      return value * (0.82 + fraction * 0.36);
    },
    [preview, seed],
  );
}

export interface LockedProps {
  children: ReactNode;
  /** Headline on the padlock panel. */
  title?: string;
  className?: string;
  /** Full-section lock — taller panel, its own copy. */
  variant?: "widget" | "section";
}

export function Locked({
  children,
  title = "Desbloquea con Pro",
  className,
  variant = "widget",
}: LockedProps) {
  const [openUntil, setOpenUntil] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    if (openUntil === null) return;

    const tick = () => {
      const remaining = Math.ceil((openUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setOpenUntil(null);
        setSecondsLeft(0);
      } else {
        setSecondsLeft(remaining);
      }
    };

    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [openUntil]);

  const revealed = openUntil !== null;

  const reveal = () => {
    // Seeded on the client only, after a click — never during render, so the
    // server and the first paint cannot disagree.
    setSeed(Math.floor(Math.random() * 1_000_000));
    setSecondsLeft(PREVIEW_SECONDS);
    setOpenUntil(Date.now() + PREVIEW_SECONDS * 1000);
  };

  return (
    <div className={cn("relative", className)}>
      <PreviewContext.Provider value={{ preview: revealed, seed }}>
        {/* `inert` keeps the blurred subtree out of the tab order and off the
            accessibility tree — a screen reader must not read what the eye
            cannot see. */}
        <div
          inert={!revealed}
          className={cn(
            "transition-[filter,opacity] duration-300",
            !revealed && "pointer-events-none blur-[7px] opacity-70 select-none",
          )}
        >
          {children}
        </div>
      </PreviewContext.Provider>

      {revealed ? (
        <span className="pointer-events-none absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full border border-gold/40 bg-rail/95 px-2.5 py-1 text-[11px] font-medium text-gold shadow-lg">
          <Timer className="h-3 w-3" aria-hidden="true" />
          Vista previa · {secondsLeft}s
        </span>
      ) : (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-card bg-bg/45 p-4 backdrop-blur-[2px]">
          <div
            className={cn(
              "flex max-w-[22rem] flex-col items-center gap-3 rounded-card border border-line-strong bg-rail/95 text-center shadow-[0_12px_40px_rgb(0_0_0/0.55)]",
              variant === "section" ? "px-8 py-9" : "px-5 py-5",
            )}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft">
              <Lock className="h-5 w-5 text-gold" aria-hidden="true" />
            </span>

            <div>
              <p
                className={cn(
                  "font-semibold text-ink",
                  variant === "section" ? "text-base" : "text-sm",
                )}
              >
                {title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {variant === "section"
                  ? "Esta sección está incluida en el plan Pro."
                  : "Contenido incluido en el plan Pro."}
              </p>
            </div>

            <div className="flex w-full flex-col gap-2">
              <button
                type="button"
                onClick={() => window.open("https://oddstradingview.com/#pricing", "_blank")}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-btn bg-up px-4 py-2 text-sm font-semibold text-white shadow-[0_0_16px_rgb(34_197_94/0.25)] transition-all duration-150 hover:bg-[#1db954] active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Pasar a Pro
              </button>

              <button
                type="button"
                onClick={reveal}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-btn border border-line-strong px-4 py-2 text-xs text-muted transition-colors duration-150 hover:bg-hover hover:text-ink"
              >
                <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
                Ver con datos aleatorios ({PREVIEW_SECONDS}s)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
