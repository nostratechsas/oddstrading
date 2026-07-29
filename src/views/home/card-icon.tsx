// 📖 Docs: obsidian/frontend/html-semantics.md
/**
 * Decorative hairline glyph in a soft well, used at the head of bento cards.
 * Ultra-light strokes only — no icon-font dependency.
 */
export type CardIconName = "stream" | "globe" | "engine" | "history" | "shield";

const PATHS: Record<CardIconName, React.ReactNode> = {
  stream: <path d="M3 18V6M3 18h18M7 15l4-5 3.2 3.4L21 7" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
    </>
  ),
  engine: <path d="M4 7h16M4 12h16M4 17h10" />,
  history: <path d="M12 3v18M5 8l7-5 7 5v8l-7 5-7-5z" />,
  shield: (
    <>
      <path d="M12 3 4 6.5v5.2c0 4.6 3.3 8.4 8 9.3 4.7-.9 8-4.7 8-9.3V6.5L12 3z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
};

export interface CardIconProps {
  name: CardIconName;
}

export const CardIcon = ({ name }: CardIconProps) => (
  <span
    aria-hidden="true"
    className="mb-2 grid h-11 w-11 place-items-center rounded-control border border-border-hairline-strong bg-surface-raised text-accent-emphasis"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[1.15rem] w-[1.15rem]"
    >
      {PATHS[name]}
    </svg>
  </span>
);
