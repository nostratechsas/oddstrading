// 📖 Docs: obsidian/frontend/components/common.md
/**
 * One operator plate in the logo wall.
 *
 * Renders the official logo file when one exists under
 * `public/assets/bookmakers/`. Until then it renders the operator's name in its
 * own brand colour over a hairline rule of the same hue — which reads as a logo
 * wall rather than a list of words, and carries no trademark file we are not
 * licensed to ship.
 */
import Image from "next/image";

export interface BookmakerTileProps {
  name: string;
  color: string;
  /** Public path of the official logo, when available. */
  logo?: string;
}

export const BookmakerTile = ({ name, color, logo }: BookmakerTileProps) => (
  <span
    style={{ ["--tile" as string]: color }}
    className="relative flex h-28 w-64 shrink-0 flex-col items-center justify-center gap-3 overflow-hidden rounded-card-inner border border-border-hairline bg-surface-glass px-6 transition-colors duration-[var(--duration-normal)] ease-entrance hover:border-border-hairline-strong hover:bg-surface-raised"
  >
    <span
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-px bg-(--tile) opacity-60"
    />
    {logo ? (
      <Image
        src={logo}
        alt={name}
        width={224}
        height={64}
        className="max-h-14 w-auto object-contain"
      />
    ) : (
      <>
        <span className="text-center text-2xl leading-none font-semibold tracking-tight text-(--tile)">
          {name}
        </span>
        <span className="text-[0.6875rem] tracking-[0.18em] text-foreground-subtle uppercase">
          Integrado
        </span>
      </>
    )}
  </span>
);
