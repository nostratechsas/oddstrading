// 📖 Docs: obsidian/frontend/components/ui.md
/**
 * Odometer — a digit-roll readout for figures that change in place.
 *
 * Each digit is a column of 0–9 clipped to a single line box; a spring drives
 * the column's offset, so 2.05 → 2.11 rolls the last two wheels instead of
 * hard-swapping the text. Port of 21st.dev's "Animated Number Flip" onto
 * `@react-spring/web` — the original drives it with framer-motion, which is
 * banned by hard rule #1 (ADR-0002). See ADR-0022.
 *
 * The rolling glyphs are decorative: assistive tech reads the formatted value
 * once, from a visually-hidden span, instead of ten digits per wheel.
 */
"use client";

import { animated, useSpring } from "@react-spring/web";

/** One wheel's glyphs. The column is exactly this many line boxes tall. */
const WHEEL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export interface OdometerProps {
  value: number;
  /** Fixed decimal places. Holds the glyph count steady so nothing reflows. */
  decimals?: number;
  className?: string;
}

const Wheel = ({ digit }: { digit: number }) => {
  // The spring carries the digit itself, so a wheel travels the short way
  // between values — a price ticking down rolls backwards, which reads as the
  // drop it is. No `from`, so the first paint sits at rest and the server and
  // client agree on the offset.
  const { position } = useSpring({
    position: digit,
    config: { tension: 210, friction: 26 },
  });

  return (
    // `1lh` is one inherited line box, so the mask tracks whatever type scale
    // the caller sets. It also sidesteps the leading trap that bites clipped
    // text elsewhere in the project: the box is never shorter than the glyphs.
    <span className="inline-block h-[1lh] overflow-hidden">
      <animated.span
        className="flex flex-col"
        style={{
          transform: position.to(
            (current) => `translateY(${(-current * 100) / WHEEL.length}%)`,
          ),
        }}
      >
        {WHEEL.map((glyph) => (
          <span key={glyph} className="block h-[1lh]">
            {glyph}
          </span>
        ))}
      </animated.span>
    </span>
  );
};

export const Odometer = ({
  value,
  decimals = 0,
  className = "",
}: OdometerProps) => {
  const formatted = value.toFixed(decimals);

  return (
    <span className={`inline-flex tabular-nums ${className}`}>
      <span className="sr-only">{formatted}</span>
      <span aria-hidden="true" className="inline-flex">
        {formatted.split("").map((glyph, index) =>
          // Keyed by position: a wheel is a slot, not a value. Crossing a digit
          // boundary (9.99 → 10.01) re-slots the row and snaps instead of
          // rolling — acceptable for the ranges this renders.
          /\d/.test(glyph) ? (
            <Wheel key={index} digit={Number(glyph)} />
          ) : (
            <span key={index} className="block h-[1lh]">
              {glyph}
            </span>
          ),
        )}
      </span>
    </span>
  );
};
