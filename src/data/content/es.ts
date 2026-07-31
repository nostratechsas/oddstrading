/**
 * Spanish content, served at `/es`.
 *
 * This file is the **shape reference**: `SiteContent` is inferred from it, so
 * `en.ts` is type-checked against it and a key can never go missing in one
 * locale. Keep the two in the same order.
 */
import type {
  OddsRow,
  Stat,
  CoverageGroup,
  Faq,
  CodeSample,
  Plan,
  PaymentMethod,
} from "./shapes";

export const es = {
  locale: "es",
  htmlLang: "es",
  /** Route prefix for this locale. Empty string for the default locale. */
  base: "/es",

  nav: {
    links: [
      { href: "/es#plataforma", label: "Plataforma" },
      { href: "/es#cobertura", label: "Cobertura" },
      { href: "/es#integracion", label: "Integración" },
      { href: "/es#precios", label: "Precios" },
      { href: "/es#faq", label: "FAQ" },
    ],
    signIn: "Iniciar sesión",
    cta: "Contratar",
    theme: "Cambiar entre tema claro y oscuro",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
  },

  notice: {
    href: "/",
    title: "Prefer English?",
    body: "You are viewing the Spanish version of OddsTrading. Switch back to English at any time.",
    accept: "View in English",
    dismiss: "Seguir en español",
    storageKey: "oddstrading-notice-en",
  },

  hero: {
    eyebrow: "Cuotas en vivo · LatAm & Europa",
    headline: ["Toda la línea", "del mercado."],
    headlineAccent: "Un solo endpoint.",
    lede: "OddsTrading unifica las cuotas pre-match, en vivo, props y líneas de cierre de 190+ casas de apuestas de Latinoamérica y Europa en una API REST y un stream WebSocket. Sin scrapers. Sin mantenimiento. Sub-120 ms.",
    note: "Demo con datos reales · Onboarding guiado · Activación en 24 horas",
    primaryCta: "Contratar ahora",
    secondaryCta: "Ver documentación",
  },

  board: {
    live: "Feed en vivo",
    competition: "CONMEBOL · Libertadores",
    match: "Boca Juniors",
    rival: "Palmeiras",
    versus: "vs",
    meta: "Minuto 63′ · 1 – 1 · Mercado 1X2",
    footNote: "Actualizado en tiempo real",
    edgeLabel: "Mejor línea",
    edgeSuffix: "vs. promedio",
    edge: "+1.8%",
    rows: [
      { book: "Bet365", accent: "primary", home: 2.14, draw: 3.4, away: 3.05 },
      { book: "Betano", accent: "secondary", home: 2.1, draw: 3.45, away: 3.12 },
      { book: "Betplay", accent: "quaternary", home: 2.18, draw: 3.35, away: 2.98 },
      { book: "Pinnacle", accent: "tertiary", home: 2.21, draw: 3.38, away: 3.1 },
      { book: "Betfair EX", accent: "secondary", home: 2.24, draw: 3.5, away: 3.15 },
    ] as OddsRow[],
  },

  wall: { label: "Casas de apuestas integradas" },

  stats: [
    { value: 190, suffix: "+", label: "Casas de apuestas" },
    { value: 38, label: "Deportes cubiertos" },
    { value: 120, prefix: "<", suffix: " ms", label: "Latencia media" },
    { value: 14, suffix: "M+", label: "Cuotas por día" },
  ] as Stat[],
  statsLabel: "OddsTrading en cifras",

  platform: {
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
  },

  coverage: {
    eyebrow: "Cobertura",
    headline: "Dos continentes,",
    headlineMuted: "un mismo esquema.",
    lede: "Filtra por región, licencia, deporte o mercado. Si un operador existe y publica cuotas, lo más probable es que ya esté en el feed.",
    tablistLabel: "Regiones y deportes",
    groups: [
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
          { name: "Betano", note: "BR" }, { name: "Superbet", note: "BR" },
          { name: "Estrela Bet", note: "BR" }, { name: "Rivalo", note: "CL" },
        ],
      },
      {
        id: "europa",
        label: "Europa",
        summary: "126 operadores · 21 mercados nacionales",
        items: [
          { name: "Bet365", note: "UK" }, { name: "Betfair Exchange", note: "UK" },
          { name: "William Hill", note: "UK" }, { name: "Ladbrokes", note: "UK" },
          { name: "Pinnacle", note: "MT" }, { name: "Winamax", note: "FR" },
          { name: "Unibet", note: "FR" }, { name: "Tipico", note: "DE" },
          { name: "Bwin", note: "DE" }, { name: "Sisal", note: "IT" },
          { name: "Snai", note: "IT" }, { name: "Eurobet", note: "IT" },
          { name: "888sport", note: "ES" }, { name: "Marathonbet", note: "ES" },
          { name: "Sportium", note: "ES" }, { name: "Betsson", note: "SE" },
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
    ] as CoverageGroup[],
  },

  integration: {
    eyebrow: "Integración",
    headline: "De la API key",
    headlineMuted: "a producción, hoy.",
    lede: "JSON plano, paginación predecible y SDKs oficiales. La primera cuota llega antes de que termines el café.",
    steps: [
      { index: "01", title: "Genera tu key", body: "Registro con correo, sin tarjeta. La key queda activa al instante en el panel." },
      { index: "02", title: "Elige tus books", body: "Selecciona operadores, deportes y mercados. Solo pagas por lo que consumes." },
      { index: "03", title: "Conecta y escala", body: "REST para snapshots, WebSocket para movimientos. Mismo esquema en ambos." },
    ],
    tablistLabel: "Ejemplos de código",
    copy: "Copiar",
    copied: "Copiado",
    sdks: [
      { name: "SDK Node.js", command: "npm i @oddstrading/sdk" },
      { name: "SDK Python", command: "pip install oddstrading" },
      { name: "Servidor MCP", command: "npx oddstrading-mcp" },
    ],
  },

  useCases: {
    eyebrow: "Casos de uso",
    headline: "Quién construye",
    headlineMuted: "sobre OddsTrading.",
    items: [
      { kicker: "Comparadores", title: "Portales de cuotas y afiliación", body: "Tablas siempre frescas, deeplinks por operador y ranking automático de la mejor línea por mercado." },
      { kicker: "Arbitraje", title: "Escáneres surebet", body: "Detección cross-book en menos de 120 ms, con ROI, stake sugerido y ventana estimada de vida." },
      { kicker: "Modelos", title: "Trading cuantitativo", body: "Histórico minuto a minuto, CLV y probabilidad sin margen para entrenar y auditar tus modelos." },
      { kicker: "Operadores", title: "Casas y proveedores", body: "Vigila a tu competencia, ajusta márgenes y detecta líneas desalineadas antes que el mercado." },
    ],
  },

  pricing: {
    eyebrow: "Precios",
    headline: "Transparente.",
    headlineMuted: "Sin sorpresas.",
    lede: "Licencia mensual en USD, impuestos no incluidos. Todos los planes incluyen la API REST, el esquema unificado y el onboarding con nuestro equipo de integración.",
    featuredBadge: "Más elegido",
    perMonth: "/mes",
    coverageCappedLabel: "Límite",
    coverageOpenLabel: "Cobertura",
    enterprise: {
      eyebrow: "Enterprise",
      title: "Infraestructura dedicada, límites a medida",
      body: "Nodo privado en tu región, feeds personalizados, contrato con SLA y soporte 24/7 con ingeniero asignado. Facturación anual y condiciones a medida.",
      cta: "Hablar con ventas",
    },
    plans: ([
      {
        slug: "starter", name: "Starter", price: 3000,
        audience: "Para validar la idea con una liga y un mercado.",
        scope: "1X2 a la media de mercado · tope de 12 casas",
        cta: "Elegir Starter",
        coverage: { label: "Máximo 12 casas de apuestas integradas", capped: true },
        features: [
          "Integración del mercado 1X2 a la media de mercado",
          "Cuotas pre-match y en vivo",
          "API REST con esquema unificado",
          "Solo fútbol y competiciones principales",
          "Soporte por correo",
        ],
      },
      {
        slug: "pro", name: "Pro", price: 5000, featured: true,
        audience: "Para el producto que sale a competir de verdad.",
        scope: "Multideporte, sin tope de casas",
        cta: "Elegir Pro",
        coverage: { label: "Sin el tope de 12 casas del plan Starter", capped: false },
        valueNote:
          "USD 2.000 más que Starter y se cae el techo: cobertura sin tope, todos los deportes y los mercados que de verdad se apuestan.",
        features: [
          "Todo lo del Starter, sin su tope de 12 casas",
          "Integración a la media de mercado del resto de deportes",
          "Mapeo de cuotas mejorado",
          "Los mercados más apostados y sus variantes",
          "Handicap asiático, over/under y props",
          "Soporte prioritario",
        ],
      },
      {
        slug: "elite", name: "Elite", price: 6500,
        audience: "Para trading, arbitraje y operadores.",
        scope: "40+ casas y feed en tiempo real",
        cta: "Elegir Elite",
        coverage: { label: "Integración completa de más de 40 casas", capped: false },
        features: [
          "Todo lo del plan Pro",
          "Acceso exclusivo a datos en tiempo real",
          "Feed de cuotas por WebSocket sin límite de eventos",
          "Motor de arbitraje y value bets",
          "Histórico completo y exportación",
          "Slack compartido con ingeniero asignado",
        ],
      },
    ] as Plan[]),
  },

  faq: {
    eyebrow: "FAQ",
    headline: "Preguntas",
    headlineMuted: "frecuentes.",
    ledePrefix: "¿No encuentras lo que buscas? Escríbenos a",
    items: [
      { question: "¿Qué casas de apuestas cubren en Latinoamérica?", answer: "Cubrimos 64 operadores regulados en Colombia, Perú, México, Argentina, Chile, Brasil, Ecuador, Panamá y Uruguay —incluyendo Betplay, Wplay, Rushbet, Codere, Caliente, Betcris, bplay, Betano y Doradobet—, además de los grandes books globales que operan en la región." },
      { question: "¿Cuál es la latencia real del feed en vivo?", answer: "La mediana de entrega es de 84 ms y el percentil 95 se mantiene por debajo de 120 ms desde nuestros nodos de São Paulo, Bogotá, Fráncfort y Londres. Con WebSocket recibes el cambio por push; no dependes de tu intervalo de sondeo." },
      { question: "¿Puedo probar la API antes de contratar?", answer: "Sí. Abrimos un entorno de prueba con datos reales y una API key temporal para que valides la integración antes de firmar. Escríbenos y coordinamos una demo técnica con tu equipo." },
      { question: "¿Puedo pedir una casa o un mercado que no esté en la lista?", answer: "Sí. Los clientes de Pro en adelante pueden solicitar operadores o mercados adicionales; el tiempo medio de incorporación de una casa nueva es de 7 a 10 días hábiles, sin costo extra en la mayoría de los casos." },
      { question: "¿Cuánto tarda la integración?", answer: "La primera respuesta útil llega en minutos con cURL. Con los SDK oficiales de Node.js o Python, un comparador funcional suele estar en pie en menos de un día de trabajo." },
      { question: "¿Los datos sirven para uso comercial?", answer: "Todos los planes de pago incluyen licencia comercial para mostrar y procesar las cuotas en tu producto. La redistribución masiva a terceros requiere un acuerdo Enterprise." },
      { question: "¿Qué pasa si supero mi límite de llamadas?", answer: "No cortamos el servicio de golpe: aplicamos throttling suave y te avisamos al 80% del consumo. Puedes añadir paquetes de capacidad desde el panel en cualquier momento y se prorratean automáticamente." },
    ] as Faq[],
  },

  cta: {
    eyebrow: "Empieza hoy",
    headline: "La línea se mueve.",
    headlineAccent: "Muévete antes.",
    body: "Déjanos tu correo y coordinamos una demo técnica con datos reales. Si ya sabes qué plan necesitas, puedes contratarlo directo.",
    emailLabel: "Correo de trabajo",
    placeholder: "tu@empresa.com",
    submit: "Solicitar demo",
    sending: "Enviando…",
    sent: "¡Listo! Te escribimos en menos de 24 horas hábiles para agendar la demo.",
    invalid: "Escribe un correo válido para continuar.",
    error: "No pudimos registrar tu correo. Inténtalo de nuevo en un momento.",
    trust: ["99,98% uptime", "Sub-120 ms", "190+ casas", "Soporte en español"],
  },

  checkout: {
    eyebrow: "Contratación",
    headline: "Activa tu licencia",
    headlineMuted: "en tres pasos.",
    lede: "Elige el plan, completa los datos de facturación y confirma. Nuestro equipo valida la cuenta y te entrega la API key en menos de 24 horas hábiles.",
    steps: [
      { index: "01", title: "Plan", body: "Elige la licencia que se ajusta a tu integración." },
      { index: "02", title: "Facturación", body: "Los datos fiscales que irán en cada factura." },
      { index: "03", title: "Pago", body: "Elige el medio y confirma la contratación." },
    ],
    planLegend: "Elige tu plan",
    perMonthShort: "USD / mes",
    guarantees: [
      "Contrato mensual, sin permanencia",
      "Factura fiscal en tu país",
      "Onboarding con ingeniero asignado",
      "Cancelas cuando quieras",
    ],
    summary: {
      title: "Resumen",
      plan: "Plan",
      cycle: "Ciclo",
      cycleValue: "Mensual",
      subtotal: "Subtotal",
      taxes: "Impuestos",
      taxesValue: "Según tu país",
      total: "Total mensual",
      submit: "Confirmar contratación",
      sending: "Procesando…",
    },
    billing: {
      accountType: "Tipo de cuenta",
      company: "Empresa",
      individual: "Persona natural",
      legalNameCompany: "Razón social",
      legalNameIndividual: "Nombre completo",
      country: "País de facturación",
      taxId: "Identificación fiscal",
      contactName: "Persona de contacto",
      email: "Correo de facturación",
      emailPlaceholder: "facturacion@empresa.com",
      phone: "Teléfono",
      address: "Dirección fiscal",
      city: "Ciudad",
      postalCode: "Código postal",
      required: "Este campo es obligatorio.",
      invalidEmail: "Escribe un correo válido.",
    },
    payment: {
      legend: "Medio de pago",
      disclaimer: "No pedimos datos de tarjeta en esta página. Al confirmar te llevamos a la pasarela del proveedor, que es quien procesa y guarda el medio de pago.",
      methods: ([
        { id: "card", label: "Tarjeta de crédito o débito", detail: "Visa, Mastercard y American Express. Cobro recurrente cada mes.", handoff: "Te llevamos a la pasarela segura para introducir la tarjeta. No guardamos sus datos." },
        { id: "transfer", label: "Transferencia bancaria", detail: "SEPA, ACH o transferencia local. Recomendado para facturación anual.", handoff: "Te enviamos la factura proforma con los datos bancarios en menos de 24 horas." },
        { id: "local", label: "Medio de pago local (LatAm)", detail: "PSE, Mercado Pago, Pix, SPEI y tarjetas emitidas en la región.", handoff: "Te llevamos al proveedor local para completar el pago en tu moneda." },
      ] as PaymentMethod[]),
    },
    done: {
      title: "Solicitud registrada",
      referencePrefix: "Tu referencia es",
      copySuffix: "Enviamos una copia a",
      planSuffix: "al mes",
      failure: "No pudimos registrar la solicitud. Inténtalo de nuevo.",
    },
    contactPrefix: "¿Necesitas condiciones especiales o facturación anual? Escríbenos a",
  },

  footer: {
    tagline: "Infraestructura de cuotas en tiempo real para Latinoamérica y Europa.",
    legal: "© 2026 OddsTrading. Todos los derechos reservados.",
    compliance: "Servicio de datos B2B. +18. Juega con responsabilidad.",
    columns: [
      { title: "Producto", links: [
        { href: "/es#plataforma", label: "Plataforma" },
        { href: "/es#cobertura", label: "Cobertura" },
        { href: "/es#integracion", label: "Documentación" },
        { href: "/es#precios", label: "Precios" },
        { href: "/es#contacto", label: "Estado del servicio" },
      ]},
      { title: "Deportes", links: [
        { href: "/es#cobertura", label: "API de fútbol" },
        { href: "/es#cobertura", label: "API de baloncesto" },
        { href: "/es#cobertura", label: "API de tenis" },
        { href: "/es#cobertura", label: "API de esports" },
        { href: "/es#cobertura", label: "Ver los 38 deportes" },
      ]},
      { title: "Casas", links: [
        { href: "/es#cobertura", label: "Bet365" },
        { href: "/es#cobertura", label: "Betano" },
        { href: "/es#cobertura", label: "DraftKings" },
        { href: "/es#cobertura", label: "Pinnacle" },
        { href: "/es#cobertura", label: "Betfair Exchange" },
      ]},
      { title: "Compañía", links: [
        { href: "/es#contacto", label: "Contacto" },
        { href: "/es#contacto", label: "Términos" },
        { href: "/es#contacto", label: "Privacidad" },
        { href: "/es#contacto", label: "Juego responsable" },
      ]},
    ],
  },

  codeSamples: [
    { id: "curl", label: "cURL", code: `$ curl "https://api.oddstrading.io/v1/odds" \\
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
}` },
    { id: "node", label: "Node.js", code: `import { OddsTrading } from "@oddstrading/sdk";

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
});` },
    { id: "python", label: "Python", code: `from oddstrading import Client

client = Client(api_key=os.environ["ODDS_KEY"])

value = client.value_bets(
    sport="futbol",
    reference="pinnacle",
    min_edge=0.03,
    region=["latam", "eu"],
)

for bet in value:
    print(bet.event, bet.book, bet.odds, bet.edge)

# Boca vs Palmeiras - betplay - 2.18 - +4.1%` },
  ] as CodeSample[],
};

/**
 * The contract every locale file must satisfy. Inferred from `es` — deliberately
 * without `as const`, so the types widen to `string` and a translation is not
 * forced to repeat the Spanish literals.
 */
export type SiteContent = typeof es;
