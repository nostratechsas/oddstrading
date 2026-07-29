/**
 * Resolves which bookmakers have an official logo file on disk.
 *
 * **Server-only** — reads `public/assets/bookmakers/` once at module load, so
 * dropping in a press-kit file needs no code change and no manifest to keep in
 * sync. Call it from a Server Component and pass the result down as props.
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";

const DIR = join(process.cwd(), "public", "assets", "bookmakers");
const EXTENSIONS = [".svg", ".png", ".webp", ".avif"];

/** slug → public path, for every logo file actually present. */
const resolveAvailable = (): Record<string, string> => {
  let entries: string[] = [];
  try {
    entries = readdirSync(DIR);
  } catch {
    // Folder not created yet — every tile falls back to its colour treatment.
    return {};
  }

  const found: Record<string, string> = {};
  for (const entry of entries) {
    const dot = entry.lastIndexOf(".");
    if (dot < 1) continue;
    const slug = entry.slice(0, dot).toLowerCase();
    const extension = entry.slice(dot).toLowerCase();
    // First extension in EXTENSIONS order wins, so an .svg beats a .png.
    if (!EXTENSIONS.includes(extension)) continue;
    const rank = EXTENSIONS.indexOf(extension);
    const currentRank = found[slug]
      ? EXTENSIONS.indexOf(found[slug].slice(found[slug].lastIndexOf(".")))
      : Number.MAX_SAFE_INTEGER;
    if (rank < currentRank) found[slug] = `/assets/bookmakers/${entry}`;
  }
  return found;
};

const available = resolveAvailable();

/** Public path of a bookmaker's logo file, or `undefined` when none is present. */
export const getBookmakerLogo = (slug: string): string | undefined => available[slug.toLowerCase()];
