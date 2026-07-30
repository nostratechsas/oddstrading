// 📖 Docs: obsidian/frontend/components/common.md
/**
 * One operator plate in the logo wall.
 *
 * Real bookmaker logos are mostly dark-on-transparent — DraftKings' "KINGS" is
 * pure black, Stake's wordmark averages luminance 30 — so a logo file gets a
 * light chip to sit on. Operators without a file yet render their name in their
 * own brand colour over the page surface, which reads as part of the same wall.
 */
import Image from "next/image";

export interface BookmakerTileProps {
  name: string;
  color: string;
  /** Public path of the official logo, when available. */
  logo?: string;
  /** Localised caption under the name on the fallback plate. */
  label: string;
}

export const BookmakerTile = ({ name, color, logo, label }: BookmakerTileProps) => {
  if (logo) {
    return (
      <span className="flex h-28 w-64 shrink-0 items-center justify-center rounded-card-inner border border-border-hairline bg-logo-plate px-8 transition-transform duration-[var(--duration-normal)] ease-entrance hover:-translate-y-0.5">
        <Image
          src={logo}
          alt={name}
          width={480}
          height={150}
          className="max-h-14 w-auto object-contain"
        />
      </span>
    );
  }

  return (
    <span
      style={{ ["--tile" as string]: color }}
      className="relative flex h-28 w-64 shrink-0 flex-col items-center justify-center gap-3 overflow-hidden rounded-card-inner border border-border-hairline bg-surface-glass px-6 transition-colors duration-[var(--duration-normal)] ease-entrance hover:border-border-hairline-strong hover:bg-surface-raised"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-(--tile) opacity-60" />
      <span className="text-center text-2xl leading-none font-semibold tracking-tight text-(--tile)">
        {name}
      </span>
      <span className="text-[0.6875rem] tracking-[0.18em] text-foreground-subtle uppercase">
        {label}
      </span>
    </span>
  );
};
