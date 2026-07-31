/**
 * Bookmaker registry for the logo wall.
 *
 * This is the full list of operators we know about — **not** the list the wall
 * renders. The wall shows only the entries whose official file is present at
 * `public/assets/bookmakers/<slug>.svg` (or `.png`/`.webp`); the rest sit here
 * waiting for one. Drop a licensed file in and the tile appears with no code
 * change — see `utils/assets/bookmaker-logos.ts` and [[decisions-log]] ADR-0021.
 *
 * > These logos are registered trademarks of their owners. Only files you are
 * > licensed to display should be placed in that folder.
 */

export interface Bookmaker {
  slug: string;
  name: string;
  region: "latam" | "eu" | "global";
}

export const bookmakers: Bookmaker[] = [
  // Con archivo oficial en public/assets/bookmakers/ — estas son las que salen.
  { slug: "draftkings", name: "DraftKings", region: "global" },
  { slug: "betmgm", name: "BetMGM", region: "global" },
  { slug: "williamhill", name: "William Hill", region: "eu" },
  { slug: "ladbrokes", name: "Ladbrokes", region: "eu" },
  { slug: "888sport", name: "888sport", region: "eu" },
  { slug: "stake", name: "Stake", region: "global" },
  { slug: "22bet", name: "22bet", region: "global" },
  { slug: "betrivers", name: "BetRivers", region: "global" },

  // Pendientes de archivo oficial — registradas, pero no se muestran todavía.
  { slug: "bet365", name: "bet365", region: "global" },
  { slug: "betano", name: "Betano", region: "latam" },
  { slug: "betplay", name: "BetPlay", region: "latam" },
  { slug: "wplay", name: "Wplay", region: "latam" },
  { slug: "rushbet", name: "RushBet", region: "latam" },
  { slug: "codere", name: "Codere", region: "latam" },
  { slug: "betsson", name: "Betsson", region: "global" },
  { slug: "pinnacle", name: "Pinnacle", region: "global" },
  { slug: "betfair", name: "Betfair Exchange", region: "eu" },
  { slug: "1xbet", name: "1xBet", region: "global" },
  { slug: "caliente", name: "Caliente", region: "latam" },
  { slug: "betcris", name: "Betcris", region: "latam" },
  { slug: "bplay", name: "bplay", region: "latam" },
  { slug: "doradobet", name: "Doradobet", region: "latam" },
  { slug: "rivalo", name: "Rivalo", region: "latam" },
  { slug: "winamax", name: "Winamax", region: "eu" },
  { slug: "bwin", name: "bwin", region: "eu" },
  { slug: "unibet", name: "Unibet", region: "eu" },
  { slug: "tipico", name: "Tipico", region: "eu" },
  { slug: "sisal", name: "Sisal", region: "eu" },
  { slug: "sportium", name: "Sportium", region: "eu" },
];
