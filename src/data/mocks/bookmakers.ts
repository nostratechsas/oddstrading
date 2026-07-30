/**
 * Bookmaker catalogue for the logo wall.
 *
 * `color` is each operator's primary brand colour, used for the tile that
 * renders while no logo file is present. Drop the official press-kit file at
 * `public/assets/bookmakers/<slug>.svg` (or `.png`/`.webp`) and the tile picks
 * it up automatically — see `utils/assets/bookmaker-logos.ts`.
 *
 * Colours are the brand hue lifted to stay legible on the OLED canvas — a few
 * operators use navies (Sisal, William Hill) that would disappear at their
 * exact value. Replace with the exact brand value once the real logo file is in
 * place, since at that point the colour only drives the accent rule.
 *
 * > These logos are registered trademarks of their owners. Only files you are
 * > licensed to display should be placed in that folder.
 */

export interface Bookmaker {
  slug: string;
  name: string;
  /** Primary brand colour, used by the fallback tile. */
  color: string;
  region: "latam" | "eu" | "global";
}

export const bookmakers: Bookmaker[] = [
  // Con archivo oficial en public/assets/bookmakers/
  { slug: "draftkings", name: "DraftKings", color: "#53D337", region: "global" },
  { slug: "betmgm", name: "BetMGM", color: "#BFA36A", region: "global" },
  { slug: "williamhill", name: "William Hill", color: "#5AA6DC", region: "eu" },
  { slug: "ladbrokes", name: "Ladbrokes", color: "#E4483C", region: "eu" },
  { slug: "888sport", name: "888sport", color: "#FF9A3D", region: "eu" },
  { slug: "stake", name: "Stake", color: "#4FB3FF", region: "global" },
  { slug: "22bet", name: "22bet", color: "#3FB877", region: "global" },
  { slug: "betrivers", name: "BetRivers", color: "#4C9FE0", region: "global" },

  // Pendientes de archivo oficial — se dibujan con su color de marca
  { slug: "bet365", name: "bet365", color: "#22B587", region: "global" },
  { slug: "betano", name: "Betano", color: "#FF7A1A", region: "latam" },
  { slug: "betplay", name: "BetPlay", color: "#FFD84D", region: "latam" },
  { slug: "wplay", name: "Wplay", color: "#FF5A50", region: "latam" },
  { slug: "rushbet", name: "RushBet", color: "#FF7043", region: "latam" },
  { slug: "codere", name: "Codere", color: "#2BC466", region: "latam" },
  { slug: "betsson", name: "Betsson", color: "#FF8A4C", region: "global" },
  { slug: "pinnacle", name: "Pinnacle", color: "#F0576B", region: "global" },
  { slug: "betfair", name: "Betfair Exchange", color: "#FFC93C", region: "eu" },
  { slug: "1xbet", name: "1xBet", color: "#5B8CFF", region: "global" },
  { slug: "caliente", name: "Caliente", color: "#FF4D66", region: "latam" },
  { slug: "betcris", name: "Betcris", color: "#FF5252", region: "latam" },
  { slug: "bplay", name: "bplay", color: "#3EBEF0", region: "latam" },
  { slug: "doradobet", name: "Doradobet", color: "#FFC24D", region: "latam" },
  { slug: "rivalo", name: "Rivalo", color: "#FFA347", region: "latam" },
  { slug: "winamax", name: "Winamax", color: "#FF5470", region: "eu" },
  { slug: "bwin", name: "bwin", color: "#FFC94A", region: "eu" },
  { slug: "unibet", name: "Unibet", color: "#3FB877", region: "eu" },
  { slug: "tipico", name: "Tipico", color: "#FF5148", region: "eu" },
  { slug: "sisal", name: "Sisal", color: "#4C9FE0", region: "eu" },
  { slug: "sportium", name: "Sportium", color: "#FF6B7A", region: "eu" },
];
