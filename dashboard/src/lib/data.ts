/**
 * Mock data for the OddsTrading dashboard — every figure transcribed from the
 * reference capture. Series are generated with a seeded sine walk so the data
 * is deterministic: the server and the client render the exact same points.
 */

export type Dir = "up" | "down" | "flat" | "mixed";

export interface OddsValue {
  value: number;
  dir: Dir;
}

/* ----------------------------------------------------------------- series */

/** Deterministic pseudo-random walk — same output on server and client. */
const walk = (seed: number, points: number, drift: number): number[] => {
  let value = 50;
  const out: number[] = [];
  for (let i = 0; i < points; i += 1) {
    value += Math.sin(seed * 7.31 + i * 1.7) * 6 + Math.cos(seed * 3.7 + i) * 3 + drift;
    out.push(Math.round(value * 100) / 100);
  }
  return out;
};

/* ---------------------------------------------------------------- sidebar */

export interface Sport {
  icon: string;
  name: string;
  count: number;
  active?: boolean;
}

export const sports: Sport[] = [
  { icon: "⚽", name: "Fútbol", count: 1287, active: true },
  { icon: "🏀", name: "Baloncesto", count: 342 },
  { icon: "🎾", name: "Tenis", count: 198 },
  { icon: "⚾", name: "Béisbol", count: 154 },
  { icon: "🏒", name: "Hockey", count: 94 },
  { icon: "🏐", name: "Voleibol", count: 72 },
  { icon: "🎮", name: "eSports", count: 65 },
  { icon: "🏈", name: "Fútbol Americano", count: 58 },
  { icon: "🥊", name: "MMA", count: 41 },
  { icon: "🏏", name: "Críquet", count: 35 },
];

export const quickFilters = ["Todos los países", "Todas las ligas", "Próximas 24h"];

export interface NewsItem {
  initials: string;
  gradient: string;
  text: string;
  highlight?: string;
  time: string;
}

export const newsfeed: NewsItem[] = [
  {
    initials: "B",
    gradient: "linear-gradient(135deg,#16a34a,#065f46)",
    text: "Bet365 sube cuota en Real Madrid",
    highlight: "1.95 → 2.05",
    time: "Hace 2 min",
  },
  {
    initials: "A",
    gradient: "linear-gradient(135deg,#2563eb,#1e3a8a)",
    text: "Arbitraje detectado en PSG vs Lyon",
    time: "Hace 4 min",
  },
  {
    initials: "C",
    gradient: "linear-gradient(135deg,#f59e0b,#b45309)",
    text: "Nueva cuota mejorada en Boca Juniors",
    highlight: "2.10",
    time: "Hace 6 min",
  },
];

/* ------------------------------------------------------------- bookmakers */

export interface BookieLogo {
  bg: string;
  fg: string;
  label: string;
}

/**
 * Real bookmaker marks are registered trademarks, so tiles resolve to branded
 * monogram chips instead of unlicensed image files.
 */
export const bookieLogos: Record<string, BookieLogo> = {
  BetPlay: { bg: "#2563eb", fg: "#ffffff", label: "BP" },
  Bet365: { bg: "#14532d", fg: "#facc15", label: "b3" },
  Wplay: { bg: "#f59e0b", fg: "#0c0a09", label: "W" },
  Rushbet: { bg: "#f97316", fg: "#ffffff", label: "R" },
  Codere: { bg: "#16a34a", fg: "#ffffff", label: "C" },
  Bwin: { bg: "#18181b", fg: "#facc15", label: "bw" },
  Pinnacle: { bg: "#0f172a", fg: "#fb923c", label: "P" },
  Novibet: { bg: "#1d4ed8", fg: "#ffffff", label: "N" },
  Stake: { bg: "#334155", fg: "#ffffff", label: "S" },
  Sportium: { bg: "#dc2626", fg: "#ffffff", label: "Sp" },
};

/* ------------------------------------------------------- competitors table */

export interface Competitor {
  rank: number;
  bookie: string;
  margin: string;
  odds: [OddsValue, OddsValue, OddsValue];
  trend: number[];
  trendTone: "up" | "down";
}

export const competitors: Competitor[] = [
  {
    rank: 1,
    bookie: "BetPlay",
    margin: "4.21%",
    odds: [
      { value: 2.05, dir: "up" },
      { value: 3.4, dir: "up" },
      { value: 3.1, dir: "down" },
    ],
    trend: walk(1, 12, 0.6),
    trendTone: "up",
  },
  {
    rank: 2,
    bookie: "Bet365",
    margin: "4.35%",
    odds: [
      { value: 2.1, dir: "flat" },
      { value: 3.5, dir: "flat" },
      { value: 3.0, dir: "flat" },
    ],
    trend: walk(2, 12, 0.3),
    trendTone: "up",
  },
  {
    rank: 3,
    bookie: "Wplay",
    margin: "4.52%",
    odds: [
      { value: 2.03, dir: "up" },
      { value: 3.3, dir: "up" },
      { value: 3.2, dir: "mixed" },
    ],
    trend: walk(3, 12, 0.4),
    trendTone: "up",
  },
  {
    rank: 4,
    bookie: "Rushbet",
    margin: "4.67%",
    odds: [
      { value: 2.08, dir: "down" },
      { value: 3.45, dir: "down" },
      { value: 3.05, dir: "down" },
    ],
    trend: walk(4, 12, -0.2),
    trendTone: "up",
  },
  {
    rank: 5,
    bookie: "Codere",
    margin: "4.81%",
    odds: [
      { value: 2.0, dir: "up" },
      { value: 3.25, dir: "down" },
      { value: 3.35, dir: "flat" },
    ],
    trend: walk(5, 12, 0.5),
    trendTone: "up",
  },
  {
    rank: 6,
    bookie: "Bwin",
    margin: "4.95%",
    odds: [
      { value: 2.15, dir: "up" },
      { value: 3.55, dir: "down" },
      { value: 2.9, dir: "down" },
    ],
    trend: walk(6, 12, 0.2),
    trendTone: "up",
  },
  {
    rank: 7,
    bookie: "Pinnacle",
    margin: "5.10%",
    odds: [
      { value: 2.18, dir: "down" },
      { value: 3.6, dir: "up" },
      { value: 2.88, dir: "up" },
    ],
    trend: walk(7, 12, -0.3),
    trendTone: "up",
  },
  {
    rank: 8,
    bookie: "Novibet",
    margin: "5.21%",
    odds: [
      { value: 2.0, dir: "up" },
      { value: 3.4, dir: "up" },
      { value: 3.3, dir: "flat" },
    ],
    trend: walk(8, 12, 0.4),
    trendTone: "up",
  },
  {
    rank: 9,
    bookie: "Stake",
    margin: "5.34%",
    odds: [
      { value: 2.07, dir: "up" },
      { value: 3.38, dir: "up" },
      { value: 3.18, dir: "up" },
    ],
    trend: walk(9, 12, 0.5),
    trendTone: "up",
  },
  {
    rank: 10,
    bookie: "Sportium",
    margin: "5.48%",
    odds: [
      { value: 2.02, dir: "up" },
      { value: 3.28, dir: "flat" },
      { value: 3.25, dir: "flat" },
    ],
    trend: walk(10, 12, 0.3),
    trendTone: "up",
  },
];

/* ---------------------------------------------------------------- markets */

export interface Market {
  rank: number;
  name: string;
  share: string;
  trend: number[];
  tone: "up" | "down";
  highlighted?: boolean;
}

export const markets: Market[] = [
  { rank: 1, name: "1X2", share: "38.7%", trend: walk(11, 10, 0.8), tone: "up", highlighted: true },
  { rank: 2, name: "Más de 2.5 goles", share: "21.4%", trend: walk(12, 10, 0.5), tone: "up" },
  { rank: 3, name: "Ambos marcan", share: "15.2%", trend: walk(13, 10, 0.3), tone: "up" },
  { rank: 4, name: "Más de 1.5 goles", share: "8.7%", trend: walk(14, 10, -0.4), tone: "down" },
  { rank: 5, name: "Doble oportunidad", share: "6.1%", trend: walk(15, 10, -0.3), tone: "down" },
  { rank: 6, name: "Correcto", share: "4.3%", trend: walk(16, 10, -0.5), tone: "down" },
  { rank: 7, name: "Handicap asiático", share: "3.4%", trend: walk(17, 10, 0.4), tone: "up" },
  { rank: 8, name: "Primer goleador", share: "2.2%", trend: walk(18, 10, -0.6), tone: "down" },
];

/* ----------------------------------------------------------------- events */

export interface EventTeam {
  name: string;
  dot: string;
  score?: number;
}

export interface EventOdds {
  bookie: string;
  odds: [number, number, number];
}

export interface FeaturedEvent {
  league: string;
  live?: string;
  teams: [EventTeam, EventTeam];
  books: [EventOdds, EventOdds, EventOdds];
  more: number;
}

export const eventBookies = ["BetPlay", "Bet365", "Wplay"];

export const featuredEvents: FeaturedEvent[] = [
  {
    league: "CONMEBOL Libertadores",
    live: "En vivo 63'",
    teams: [
      { name: "Boca Juniors", dot: "#eab308", score: 1 },
      { name: "Palmeiras", dot: "#16a34a", score: 1 },
    ],
    books: [
      { bookie: "BetPlay", odds: [2.05, 3.3, 3.4] },
      { bookie: "Bet365", odds: [2.1, 3.5, 3.0] },
      { bookie: "Wplay", odds: [2.03, 3.25, 3.3] },
    ],
    more: 12,
  },
  {
    league: "Premier League",
    teams: [
      { name: "Manchester City", dot: "#38bdf8" },
      { name: "Chelsea", dot: "#2563eb" },
    ],
    books: [
      { bookie: "BetPlay", odds: [1.7, 4.0, 4.8] },
      { bookie: "Bet365", odds: [1.72, 4.1, 4.6] },
      { bookie: "Wplay", odds: [1.68, 3.9, 4.9] },
    ],
    more: 18,
  },
  {
    league: "La Liga",
    teams: [
      { name: "Real Madrid", dot: "#e2e8f0" },
      { name: "Betis", dot: "#22c55e" },
    ],
    books: [
      { bookie: "BetPlay", odds: [1.28, 5.9, 9.5] },
      { bookie: "Bet365", odds: [1.3, 5.5, 9.0] },
      { bookie: "Wplay", odds: [1.25, 6.1, 10.0] },
    ],
    more: 16,
  },
];

/* -------------------------------------------------------- movement series */

export interface MovementPoint {
  time: string;
  local: number;
  empate: number;
  visita: number;
  vol: number;
}

const clock = (index: number): string => {
  const total = 6 * 60 + index * 15;
  const hh = String(Math.floor(total / 60)).padStart(2, "0");
  const mm = String(total % 60).padStart(2, "0");
  return `${hh}:${mm}`;
};

export const movementSeries: MovementPoint[] = Array.from({ length: 25 }, (_, i) => ({
  time: clock(i),
  local: Math.round((4.05 + Math.sin(i * 0.52) * 0.34 + i * 0.006) * 100) / 100,
  empate: Math.round((3.28 + Math.sin(i * 0.41 + 2.1) * 0.2) * 100) / 100,
  visita: Math.round((1.82 + Math.sin(i * 0.66 + 4.2) * 0.16 + i * 0.008) * 100) / 100,
  vol: 26 + ((i * 37) % 53) + (i % 3) * 9,
}));

export const movementTicks = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];

export const movementStats = [
  { label: "Volumen total", value: "$2.45M", tone: "ink" as const },
  { label: "Variación promedio", value: "+4.3%", tone: "up" as const },
  { label: "Movimientos detectados", value: "24", tone: "ink" as const },
];

/* ----------------------------------------------------------------- alerts */

export interface Alert {
  icon: "change" | "arb" | "boost" | "activity";
  tone: "up" | "gold" | "down";
  title: string;
  body: string;
  time: string;
}

export const alerts: Alert[] = [
  {
    icon: "change",
    tone: "up",
    title: "Cambio significativo",
    body: "Bet365 subió cuota en Real Madrid",
    time: "Hace 2 min",
  },
  {
    icon: "arb",
    tone: "gold",
    title: "Arbitraje detectado",
    body: "PSG vs Lyon - Beneficio: 2.4%",
    time: "Hace 4 min",
  },
  {
    icon: "boost",
    tone: "up",
    title: "Cuota mejorada",
    body: "Boca Juniors ahora en 2.10",
    time: "Hace 6 min",
  },
  {
    icon: "activity",
    tone: "down",
    title: "Alta actividad",
    body: "Aumento inusual en Más de 2.5 goles",
    time: "Hace 8 min",
  },
];

/* ----------------------------------------------------------------- ticker */

export interface TickerItem {
  team: string;
  price: string;
  dir: "up" | "down";
}

export const tickerItems: TickerItem[] = [
  { team: "Liverpool", price: "1.75", dir: "up" },
  { team: "Arsenal", price: "2.10", dir: "down" },
  { team: "Tottenham", price: "3.80", dir: "up" },
  { team: "PSG", price: "1.45", dir: "up" },
  { team: "Marseille", price: "6.20", dir: "down" },
  { team: "Barca", price: "1.60", dir: "up" },
  { team: "Atleti", price: "2.30", dir: "up" },
  { team: "Sevilla", price: "5.50", dir: "up" },
  { team: "Milan", price: "1.85", dir: "down" },
  { team: "Inter", price: "2.05", dir: "up" },
];
