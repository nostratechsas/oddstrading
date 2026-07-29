/**
 * Placeholder content for the OddsTrading landing page.
 *
 * Passed into the section components as props — never imported by a component
 * directly (obsidian/frontend/component-conventions.md → "Data rules").
 * Swap for a CMS/API payload without touching the components.
 */

export interface OddsRow {
  book: string;
  accent: "primary" | "secondary" | "tertiary" | "quaternary";
  home: number;
  draw: number;
  away: number;
}

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface CoverageGroup {
  id: string;
  label: string;
  summary: string;
  items: { name: string; note?: string }[];
}

export interface Plan {
  name: string;
  audience: string;
  monthly: number;
  yearly: number;
  features: string[];
  cta: string;
  featured?: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export const heroContent = {
  eyebrow: "Cuotas en vivo · LatAm & Europa",
  headline: ["Toda la línea", "del mercado."],
  headlineAccent: "Un solo endpoint.",
  lede: "OddsTrading unifica las cuotas pre-match, en vivo, props y líneas de cierre de 190+ casas de apuestas de Latinoamérica y Europa en una API REST y un stream WebSocket. Sin scrapers. Sin mantenimiento. Sub-120 ms.",
  note: "Sin tarjeta de crédito · 500 llamadas diarias gratis · Activación en 60 segundos",
  videoSrc: "/assets/hero/portada.mp4",
} as const;

export const liveBoard = {
  competition: "CONMEBOL · Libertadores",
  match: "Boca Juniors",
  rival: "Palmeiras",
  meta: "Minuto 63′ · 1 – 1 · Mercado 1X2",
  edge: "+1.8%",
  rows: [
    { book: "Bet365", accent: "primary", home: 2.14, draw: 3.4, away: 3.05 },
    { book: "Betano", accent: "secondary", home: 2.1, draw: 3.45, away: 3.12 },
    { book: "Betplay", accent: "quaternary", home: 2.18, draw: 3.35, away: 2.98 },
    { book: "Pinnacle", accent: "tertiary", home: 2.21, draw: 3.38, away: 3.1 },
    { book: "Betfair EX", accent: "secondary", home: 2.24, draw: 3.5, away: 3.15 },
  ] satisfies OddsRow[],
};

export const bookmakerMarquee = [
  "Bet365", "Betano", "Betplay", "Wplay", "Rushbet", "Codere", "Betsson",
  "Pinnacle", "Betfair Exchange", "1xBet", "Caliente", "Betcris", "bplay",
  "Winamax", "Bwin", "Unibet", "Tipico", "Sisal", "888sport", "Doradobet",
  "Sportium", "Stake", "Rivalo", "William Hill",
];

export const stats: Stat[] = [
  { value: 190, suffix: "+", label: "Casas de apuestas" },
  { value: 38, label: "Deportes cubiertos" },
  { value: 120, prefix: "<", suffix: " ms", label: "Latencia media" },
  { value: 14, suffix: "M+", label: "Cuotas por día" },
];

export const platformContent = {
  eyebrow: "La plataforma",
  headline: "Infraestructura de datos",
  headlineMuted: "construida para traders.",
  lede: "Normalizamos equipos, ligas y mercados de cada operador para que tu producto compare manzanas con manzanas desde la primera llamada.",
  streaming: {
    title: "Streaming real, no polling disfrazado",
    body: "Cada movimiento de línea se emite por WebSocket en el instante en que el operador lo publica. Sin ciclos de sondeo, sin cuotas fantasma, sin ventanas ciegas durante el minuto 90.",
  },
  regions: {
    title: "Doble región nativa",
    body: "Operadores regulados de Colombia, Perú, México, Argentina, Chile y Brasil junto a los principales books europeos, en el mismo esquema de datos.",
  },
  engines: {
    title: "Motores incluidos",
    body: "Endpoints de análisis listos para producción, sin que tengas que reimplementar la matemática.",
    items: [
      "Detección de arbitraje (2 y 3 vías)",
      "Value bets contra línea de referencia",
      "Probabilidad implícita sin margen",
      "Closing line value histórico",
      "Alertas de movimiento brusco de línea",
    ],
  },
  history: {
    title: "Histórico desde 2019",
    body: "Descarga snapshots minuto a minuto para entrenar modelos, auditar CLV o hacer backtesting serio sin depender de terceros.",
    metrics: [
      { value: "2.4B", label: "snapshots" },
      { value: "60 s", label: "granularidad" },
      { value: "CSV / Parquet", label: "exportación" },
    ],
  },
  identity: {
    title: "Identidad unificada",
    body: "Un mismo event_id para los 190 operadores. Resolvemos alias de equipos, husos horarios y variantes de mercado antes de entregarte el dato.",
    aliases: [
      { from: "Atl. Nacional · Nacional Medellín · A. Nacional", to: "team_1042" },
      { from: "Hándicap asiático · AH · Línea asiática", to: "market_ah" },
      { from: "Más/Menos 2.5 · O/U 2.5 · Total goles", to: "market_ou_2_5" },
    ],
  },
};

export const coverageGroups: CoverageGroup[] = [
  {
    id: "latam",
    label: "Latinoamérica",
    summary: "64 operadores regulados · 9 mercados nacionales",
    items: [
      { name: "Betplay", note: "CO" }, { name: "Wplay", note: "CO" },
      { name: "Rushbet", note: "CO" }, { name: "Codere", note: "CO" },
      { name: "Betsson", note: "PE" }, { name: "Doradobet", note: "PE" },
      { name: "Apuesta Total", note: "PE" }, { name: "Caliente", note: "MX" },
      { name: "Betcris", note: "MX" }, { name: "Winner", note: "MX" },
      { name: "bplay", note: "AR" }, { name: "Betwarrior", note: "AR" },
      { name: "Bplay Córdoba", note: "AR" }, { name: "Betano", note: "BR" },
      { name: "Superbet", note: "BR" }, { name: "Estrela Bet", note: "BR" },
      { name: "Betsson", note: "CL" }, { name: "Rivalo", note: "CL" },
    ],
  },
  {
    id: "europa",
    label: "Europa",
    summary: "126 operadores · 21 mercados nacionales",
    items: [
      { name: "Bet365", note: "UK" }, { name: "Betfair Exchange", note: "UK" },
      { name: "William Hill", note: "UK" }, { name: "Sky Bet", note: "UK" },
      { name: "Pinnacle", note: "MT" }, { name: "Winamax", note: "FR" },
      { name: "Unibet", note: "FR" }, { name: "Parions Sport", note: "FR" },
      { name: "Tipico", note: "DE" }, { name: "Bwin", note: "DE" },
      { name: "Interwetten", note: "AT" }, { name: "Sisal", note: "IT" },
      { name: "Snai", note: "IT" }, { name: "Eurobet", note: "IT" },
      { name: "Bet777", note: "ES" }, { name: "888sport", note: "ES" },
      { name: "Marathonbet", note: "ES" }, { name: "Betsson", note: "SE" },
    ],
  },
  {
    id: "deportes",
    label: "Deportes",
    summary: "38 deportes · 14.000+ ligas · 140+ tipos de mercado",
    items: [
      { name: "Fútbol" }, { name: "Baloncesto" }, { name: "Tenis" },
      { name: "NFL" }, { name: "MLB" }, { name: "NHL" },
      { name: "Béisbol LatAm" }, { name: "Boxeo" }, { name: "MMA" },
      { name: "Fórmula 1" }, { name: "Ciclismo" }, { name: "Voleibol" },
      { name: "Balonmano" }, { name: "Rugby" }, { name: "Golf" },
      { name: "Cricket" }, { name: "Esports · CS2" }, { name: "Esports · LoL" },
      { name: "Esports · Dota 2" }, { name: "Dardos" },
    ],
  },
];

export const integrationSteps = [
  {
    index: "01",
    title: "Genera tu key",
    body: "Registro con correo, sin tarjeta. La key queda activa al instante en el panel.",
  },
  {
    index: "02",
    title: "Elige tus books",
    body: "Selecciona operadores, deportes y mercados. Solo pagas por lo que consumes.",
  },
  {
    index: "03",
    title: "Conecta y escala",
    body: "REST para snapshots, WebSocket para movimientos. Mismo esquema en ambos.",
  },
];

export interface CodeSample {
  id: string;
  label: string;
  code: string;
}

export const codeSamples: CodeSample[] = [
  {
    id: "curl",
    label: "cURL",
    code: `$ curl "https://api.oddstrading.io/v1/odds" \\
  -H "Authorization: Bearer $ODDS_KEY" \\
  -d "sport=futbol" \\
  -d "region=latam,eu" \\
  -d "markets=1x2,ah,ou"

# 200 OK - 86 ms
{
  "event_id": "evt_9f31c0",
  "league": "Copa Libertadores",
  "books": [
    { "name": "bet365", "home": 2.14, "draw": 3.40, "away": 3.05 },
    { "name": "betano", "home": 2.10, "draw": 3.45, "away": 3.12 }
  ],
  "best_edge": 0.018
}`,
  },
  {
    id: "node",
    label: "Node.js",
    code: `import { OddsTrading } from "@oddstrading/sdk";

const ot = new OddsTrading(process.env.ODDS_KEY);

// Stream de movimientos de linea en vivo
const stream = ot.stream({
  sport: "futbol",
  region: ["latam", "eu"],
  markets: ["1x2", "ah"]
});

stream.on("odds", (tick) => {
  if (tick.arbitrage) {
    console.log(tick.event, tick.roi, tick.books);
  }
});`,
  },
  {
    id: "python",
    label: "Python",
    code: `from oddstrading import Client

client = Client(api_key=os.environ["ODDS_KEY"])

value = client.value_bets(
    sport="futbol",
    reference="pinnacle",
    min_edge=0.03,
    region=["latam", "eu"],
)

for bet in value:
    print(bet.event, bet.book, bet.odds, bet.edge)

# Boca vs Palmeiras - betplay - 2.18 - +4.1%`,
  },
];

export const sdks = [
  { name: "SDK Node.js", command: "npm i @oddstrading/sdk" },
  { name: "SDK Python", command: "pip install oddstrading" },
  { name: "Servidor MCP", command: "npx oddstrading-mcp" },
];

export const useCases = [
  {
    kicker: "Comparadores",
    title: "Portales de cuotas y afiliación",
    body: "Tablas siempre frescas, deeplinks por operador y ranking automático de la mejor línea por mercado.",
  },
  {
    kicker: "Arbitraje",
    title: "Escáneres surebet",
    body: "Detección cross-book en menos de 120 ms, con ROI, stake sugerido y ventana estimada de vida.",
  },
  {
    kicker: "Modelos",
    title: "Trading cuantitativo",
    body: "Histórico minuto a minuto, CLV y probabilidad sin margen para entrenar y auditar tus modelos.",
  },
  {
    kicker: "Operadores",
    title: "Casas y proveedores",
    body: "Vigila a tu competencia, ajusta márgenes y detecta líneas desalineadas antes que el mercado.",
  },
];

export const plans: Plan[] = [
  {
    name: "Free",
    audience: "Para explorar la API.",
    monthly: 0,
    yearly: 0,
    cta: "Empezar",
    features: ["3 casas recreativas", "500 llamadas al día", "Fútbol + baloncesto", "REST API"],
  },
  {
    name: "Starter",
    audience: "Comparadores y proyectos en lanzamiento.",
    monthly: 79,
    yearly: 63,
    cta: "Elegir Starter",
    features: ["8 casas a elección", "5.000 llamadas / hora", "38 deportes", "Histórico 30 días", "Soporte por correo"],
  },
  {
    name: "Growth",
    audience: "Escáneres de arbitraje y +EV en producción.",
    monthly: 189,
    yearly: 151,
    cta: "Elegir Growth",
    featured: true,
    features: [
      "20 casas · LatAm + Europa",
      "20.000 llamadas / hora",
      "Stream WebSocket incluido",
      "Motor de arbitraje y value bets",
      "Histórico 12 meses",
      "Soporte prioritario",
    ],
  },
  {
    name: "Scale",
    audience: "Trading cuantitativo y operadores.",
    monthly: 349,
    yearly: 279,
    cta: "Elegir Scale",
    features: [
      "Todas las casas del feed",
      "60.000 llamadas / hora",
      "WebSocket sin límite de eventos",
      "Histórico completo desde 2019",
      "Slack compartido + SLA 99,9%",
    ],
  },
];

export const faqs: Faq[] = [
  {
    question: "¿Qué casas de apuestas cubren en Latinoamérica?",
    answer: "Cubrimos 64 operadores regulados en Colombia, Perú, México, Argentina, Chile, Brasil, Ecuador, Panamá y Uruguay —incluyendo Betplay, Wplay, Rushbet, Codere, Caliente, Betcris, bplay, Betano y Doradobet—, además de los grandes books globales que operan en la región.",
  },
  {
    question: "¿Cuál es la latencia real del feed en vivo?",
    answer: "La mediana de entrega es de 84 ms y el percentil 95 se mantiene por debajo de 120 ms desde nuestros nodos de São Paulo, Bogotá, Fráncfort y Londres. Con WebSocket recibes el cambio por push; no dependes de tu intervalo de sondeo.",
  },
  {
    question: "¿Hay un plan gratuito de verdad?",
    answer: "Sí. El plan Free entrega 500 llamadas diarias sobre 3 casas recreativas, sin tarjeta de crédito y sin fecha de expiración. Es suficiente para prototipar e integrar antes de decidir.",
  },
  {
    question: "¿Puedo pedir una casa o un mercado que no esté en la lista?",
    answer: "Sí. Los clientes de Growth en adelante pueden solicitar operadores o mercados adicionales; el tiempo medio de incorporación de una casa nueva es de 7 a 10 días hábiles, sin costo extra en la mayoría de los casos.",
  },
  {
    question: "¿Cuánto tarda la integración?",
    answer: "La primera respuesta útil llega en minutos con cURL. Con los SDK oficiales de Node.js o Python, un comparador funcional suele estar en pie en menos de un día de trabajo.",
  },
  {
    question: "¿Los datos sirven para uso comercial?",
    answer: "Todos los planes de pago incluyen licencia comercial para mostrar y procesar las cuotas en tu producto. La redistribución masiva a terceros requiere un acuerdo Enterprise.",
  },
  {
    question: "¿Qué pasa si supero mi límite de llamadas?",
    answer: "No cortamos el servicio de golpe: aplicamos throttling suave y te avisamos al 80% del consumo. Puedes añadir paquetes de capacidad desde el panel en cualquier momento y se prorratean automáticamente.",
  },
];

export const navLinks = [
  { href: "#plataforma", label: "Plataforma" },
  { href: "#cobertura", label: "Cobertura" },
  { href: "#integracion", label: "Integración" },
  { href: "#precios", label: "Precios" },
  { href: "#faq", label: "FAQ" },
];

export const footerColumns = [
  {
    title: "Producto",
    links: [
      { href: "#plataforma", label: "Plataforma" },
      { href: "#cobertura", label: "Cobertura" },
      { href: "#integracion", label: "Documentación" },
      { href: "#precios", label: "Precios" },
      { href: "#contacto", label: "Estado del servicio" },
    ],
  },
  {
    title: "Deportes",
    links: [
      { href: "#cobertura", label: "API de fútbol" },
      { href: "#cobertura", label: "API de baloncesto" },
      { href: "#cobertura", label: "API de tenis" },
      { href: "#cobertura", label: "API de esports" },
      { href: "#cobertura", label: "Ver los 38 deportes" },
    ],
  },
  {
    title: "Casas",
    links: [
      { href: "#cobertura", label: "Bet365" },
      { href: "#cobertura", label: "Betano" },
      { href: "#cobertura", label: "Betplay" },
      { href: "#cobertura", label: "Pinnacle" },
      { href: "#cobertura", label: "Betfair Exchange" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { href: "#contacto", label: "Contacto" },
      { href: "#contacto", label: "Términos" },
      { href: "#contacto", label: "Privacidad" },
      { href: "#contacto", label: "Juego responsable" },
    ],
  },
];

export const brand = {
  logo: "/assets/brand/oddstrading-logo.png",
  logoAlt: "OddsTrading",
  email: "hola@oddstrading.io",
  tagline: "Infraestructura de cuotas en tiempo real para Latinoamérica y Europa.",
  legal: "© 2026 OddsTrading. Todos los derechos reservados.",
  compliance: "Servicio de datos B2B. +18. Juega con responsabilidad.",
} as const;
