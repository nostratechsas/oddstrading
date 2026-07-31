// 📖 Docs: obsidian/frontend/components/common.md
/**
 * One operator plate in the logo wall.
 *
 * Real bookmaker logos are mostly dark-on-transparent — DraftKings' "KINGS" is
 * pure black, Stake's wordmark averages luminance 30 — so the logo always gets a
 * light chip to sit on. Only operators with a licensed file on disk reach this
 * component; the wall filters the rest out upstream (ADR-0021).
 */
import Image from "next/image";

export interface BookmakerTileProps {
  name: string;
  /** Public path of the official logo file. */
  logo: string;
}

export const BookmakerTile = ({ name, logo }: BookmakerTileProps) => (
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
