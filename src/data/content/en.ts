/**
 * English content — the default locale, served at `/`.
 *
 * Typed as `SiteContent`, which is inferred from `es.ts`, so a missing or
 * misspelled key fails the build rather than shipping a blank section.
 */
import type { SiteContent } from "./es";

export const en: SiteContent = {
  locale: "en",
  htmlLang: "en",
  base: "",

  nav: {
    links: [
      { href: "/#platform", label: "Platform" },
      { href: "/#coverage", label: "Coverage" },
      { href: "/#integration", label: "Integration" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#faq", label: "FAQ" },
    ],
    signIn: "Sign in",
    cta: "Get started",
    theme: "Switch between light and dark theme",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },

  notice: {
    href: "/es",
    title: "¿Prefieres español?",
    body: "Estás viendo OddsTrading en inglés. Podemos mostrarte todo el sitio en español.",
    accept: "Ver en español",
    dismiss: "Keep reading in English",
    storageKey: "oddstrading-notice-es",
  },

  hero: {
    eyebrow: "Live odds · LatAm & Europe",
    headline: ["Every line", "on the market."],
    headlineAccent: "One endpoint.",
    lede: "OddsTrading unifies pre-match odds, in-play prices, player props and closing lines from 190+ bookmakers across Latin America and Europe into one REST API and one WebSocket stream. No scrapers. No maintenance. Under 120 ms.",
    note: "Demo on live data · Guided onboarding · Live in 24 hours",
    primaryCta: "Get started",
    secondaryCta: "Read the docs",
  },

  board: {
    live: "Live feed",
    competition: "CONMEBOL · Libertadores",
    match: "Boca Juniors",
    rival: "Palmeiras",
    versus: "vs",
    meta: "63′ · 1 – 1 · 1X2 market",
    footNote: "Updating in real time",
    edgeLabel: "Best line",
    edgeSuffix: "vs. average",
    edge: "+1.8%",
    rows: [
      { book: "Bet365", accent: "primary", home: 2.14, draw: 3.4, away: 3.05 },
      { book: "Betano", accent: "secondary", home: 2.1, draw: 3.45, away: 3.12 },
      { book: "Betplay", accent: "quaternary", home: 2.18, draw: 3.35, away: 2.98 },
      { book: "Pinnacle", accent: "tertiary", home: 2.21, draw: 3.38, away: 3.1 },
      { book: "Betfair EX", accent: "secondary", home: 2.24, draw: 3.5, away: 3.15 },
    ],
  },

  wall: { label: "Integrated bookmakers" },

  stats: [
    { value: 190, suffix: "+", label: "Bookmakers" },
    { value: 38, label: "Sports covered" },
    { value: 120, prefix: "<", suffix: " ms", label: "Median latency" },
    { value: 14, suffix: "M+", label: "Odds per day" },
  ],
  statsLabel: "OddsTrading by the numbers",

  platform: {
    eyebrow: "The platform",
    headline: "Data infrastructure",
    headlineMuted: "built for traders.",
    lede: "We normalise every operator's teams, leagues and markets so your product compares like with like from the very first call.",
    streaming: {
      title: "Real streaming, not polling in disguise",
      body: "Every line movement is pushed over WebSocket the moment the operator publishes it. No polling cycles, no ghost prices, no blind window in the 90th minute.",
    },
    regions: {
      title: "Two regions, natively",
      body: "Licensed operators from Colombia, Peru, Mexico, Argentina, Chile and Brazil alongside the major European books — all in one data schema.",
    },
    engines: {
      title: "Engines included",
      body: "Production-ready analysis endpoints, so you never reimplement the maths.",
      items: [
        "Arbitrage detection (2-way and 3-way)",
        "Value bets against a reference line",
        "Vig-free implied probability",
        "Historical closing line value",
        "Sharp line-movement alerts",
      ],
    },
    history: {
      title: "History since 2019",
      body: "Download minute-by-minute snapshots to train models, audit CLV or run serious backtests without depending on anyone else.",
      metrics: [
        { value: "2.4B", label: "snapshots" },
        { value: "60 s", label: "granularity" },
        { value: "CSV / Parquet", label: "export" },
      ],
    },
    identity: {
      title: "One unified identity",
      body: "A single event_id across all 190 operators. We resolve team aliases, time zones and market variants before the data reaches you.",
      aliases: [
        { from: "Atl. Nacional · Nacional Medellín · A. Nacional", to: "team_1042" },
        { from: "Asian handicap · AH · Asian line", to: "market_ah" },
        { from: "Over/Under 2.5 · O/U 2.5 · Total goals", to: "market_ou_2_5" },
      ],
    },
  },

  coverage: {
    eyebrow: "Coverage",
    headline: "Two continents,",
    headlineMuted: "one schema.",
    lede: "Filter by region, licence, sport or market. If an operator exists and publishes odds, chances are it is already in the feed.",
    tablistLabel: "Regions and sports",
    groups: [
      {
        id: "latam",
        label: "Latin America",
        summary: "64 licensed operators · 9 national markets",
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
        label: "Europe",
        summary: "126 operators · 21 national markets",
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
        label: "Sports",
        summary: "38 sports · 14,000+ leagues · 140+ market types",
        items: [
          { name: "Football" }, { name: "Basketball" }, { name: "Tennis" },
          { name: "NFL" }, { name: "MLB" }, { name: "NHL" },
          { name: "LatAm baseball" }, { name: "Boxing" }, { name: "MMA" },
          { name: "Formula 1" }, { name: "Cycling" }, { name: "Volleyball" },
          { name: "Handball" }, { name: "Rugby" }, { name: "Golf" },
          { name: "Cricket" }, { name: "Esports · CS2" }, { name: "Esports · LoL" },
          { name: "Esports · Dota 2" }, { name: "Darts" },
        ],
      },
    ],
  },

  integration: {
    eyebrow: "Integration",
    headline: "From API key",
    headlineMuted: "to production, today.",
    lede: "Flat JSON, predictable pagination and official SDKs. Your first price lands before the coffee is done.",
    steps: [
      { index: "01", title: "Generate your key", body: "Sign up with an email, no card. The key is live in the dashboard instantly." },
      { index: "02", title: "Pick your books", body: "Choose operators, sports and markets. You only pay for what you consume." },
      { index: "03", title: "Connect and scale", body: "REST for snapshots, WebSocket for movement. Identical schema in both." },
    ],
    tablistLabel: "Code samples",
    copy: "Copy",
    copied: "Copied",
    sdks: [
      { name: "Node.js SDK", command: "npm i @oddstrading/sdk" },
      { name: "Python SDK", command: "pip install oddstrading" },
      { name: "MCP server", command: "npx oddstrading-mcp" },
    ],
  },

  useCases: {
    eyebrow: "Use cases",
    headline: "Who builds",
    headlineMuted: "on OddsTrading.",
    items: [
      { kicker: "Comparison", title: "Odds portals and affiliates", body: "Always-fresh tables, per-operator deeplinks and automatic best-line ranking for every market." },
      { kicker: "Arbitrage", title: "Surebet scanners", body: "Cross-book detection in under 120 ms, with ROI, suggested stake and an estimated lifetime window." },
      { kicker: "Modelling", title: "Quantitative trading", body: "Minute-by-minute history, CLV and vig-free probability to train and audit your models." },
      { kicker: "Operators", title: "Books and providers", body: "Watch your competition, tune your margins and catch mispriced lines before the market does." },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    headline: "Transparent.",
    headlineMuted: "No surprises.",
    lede: "Prices in USD, tax excluded. You start with a 7-day demo; the integration is a one-off setup fee and Pro is a monthly licence. All of them include the REST API, the unified schema and onboarding with our team.",
    featuredBadge: "Most chosen",
    freeLabel: "Free",
    billingLabels: { free: "7 days", once: "one-off", monthly: "/mo" },
    coverageCappedLabel: "Limit",
    coverageOpenLabel: "Coverage",
    enterprise: {
      eyebrow: "Enterprise",
      title: "Dedicated infrastructure, limits to match",
      body: "A private node in your region, custom feeds, a contract with an SLA and 24/7 support with a named engineer. Annual billing and bespoke terms.",
      cta: "Talk to sales",
    },
    plans: [
      {
        slug: "demo", name: "Demo", price: 0, billing: "free",
        audience: "To prove the fit with your product.",
        scope: "13 bookmakers integrated",
        cta: "Start the demo",
        coverage: { label: "13 bookmakers integrated", capped: true },
        features: [
          "REST API and WebSocket with unified schema",
          "Full competitor ranking",
          "Markets and movement analysis in preview",
          "Hands-on support from our integration team",
          "No card: on day seven you decide",
        ],
      },
      {
        slug: "integracion", name: "Integration", price: 3000, billing: "once",
        audience: "To go to production with wider coverage.",
        scope: "Up to 20 bookmakers integrated",
        cta: "Choose Integration",
        coverage: { label: "Up to 20 bookmakers integrated", capped: true },
        features: [
          "Everything in the demo, with no day limit",
          "Seven more bookmakers than the demo",
          "Pre-match and in-play odds",
          "Local and international competitions",
          "Email support",
        ],
      },
      {
        slug: "pro", name: "Pro", price: 5000, billing: "monthly", featured: true,
        audience: "To trade with the whole picture of the market.",
        scope: "Up to 50 books · full dashboard",
        cta: "Choose Pro",
        coverage: { label: "Up to 50 bookmakers integrated", capped: false },
        valueNote:
          "The 20-book ceiling comes off and the whole dashboard opens up: markets, movement analysis, arbitrage and live alerts.",
        features: [
          "Everything in Integration",
          "Full dashboard, no locked sections",
          "Complete markets and movement analysis",
          "Arbitrage and boosted odds",
          "Live alerts and priority support",
        ],
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    headline: "Frequently asked",
    headlineMuted: "questions.",
    ledePrefix: "Can't find what you need? Write to us at",
    items: [
      { question: "Which bookmakers do you cover in Latin America?", answer: "We cover 64 licensed operators across Colombia, Peru, Mexico, Argentina, Chile, Brazil, Ecuador, Panama and Uruguay — including Betplay, Wplay, Rushbet, Codere, Caliente, Betcris, bplay, Betano and Doradobet — plus the global books that operate in the region." },
      { question: "What is the real latency of the live feed?", answer: "Median delivery is 84 ms and the 95th percentile stays under 120 ms from our São Paulo, Bogotá, Frankfurt and London nodes. Over WebSocket the change is pushed to you, so it never depends on your polling interval." },
      { question: "Can I test the API before signing?", answer: "Yes. We open a sandbox on live data with a temporary API key so you can validate the integration first. Write to us and we'll set up a technical demo with your team." },
      { question: "Can I request a book or market that isn't listed?", answer: "Yes. Pro customers can request additional operators or markets; onboarding a new book takes 7 to 10 business days on average, at no extra cost in most cases." },
      { question: "How long does integration take?", answer: "The first useful response takes minutes with cURL. With the official Node.js or Python SDKs, a working comparison product is usually standing in under a day." },
      { question: "Is the data licensed for commercial use?", answer: "Every paid plan includes a commercial licence to display and process the odds inside your product. Bulk redistribution to third parties requires an Enterprise agreement." },
      { question: "What happens if I exceed my call limit?", answer: "We don't cut you off. We throttle gently and warn you at 80% of your allowance. You can add capacity packs from the dashboard at any time and they prorate automatically." },
    ],
  },

  cta: {
    eyebrow: "Start today",
    headline: "The line moves.",
    headlineAccent: "Move first.",
    body: "Leave your email and we'll set up a technical demo on live data. If you already know which plan you need, you can buy it directly.",
    emailLabel: "Work email",
    placeholder: "you@company.com",
    submit: "Request a demo",
    sending: "Sending…",
    sent: "Done. We'll be in touch within one business day to book the demo.",
    invalid: "Enter a valid email address to continue.",
    error: "We couldn't register your email. Please try again in a moment.",
    trust: ["99.98% uptime", "Under 120 ms", "190+ books", "Support in English & Spanish"],
  },

  checkout: {
    eyebrow: "Checkout",
    headline: "Activate your licence",
    headlineMuted: "in three steps.",
    lede: "Pick a plan, fill in your billing details and confirm. Our team validates the account and hands over the API key within one business day.",
    steps: [
      { index: "01", title: "Plan", body: "Choose the licence that matches your integration." },
      { index: "02", title: "Billing", body: "The tax details that will appear on every invoice." },
      { index: "03", title: "Payment", body: "Pick a method and confirm the subscription." },
    ],
    planLegend: "Choose your plan",
    guarantees: [
      "Monthly contract, no lock-in",
      "Tax invoice in your country",
      "Onboarding with a named engineer",
      "Cancel whenever you want",
    ],
    summary: {
      title: "Summary",
      plan: "Plan",
      cycle: "Billing cycle",
      cycleValue: "Monthly",
      subtotal: "Subtotal",
      taxes: "Tax",
      taxesValue: "Based on your country",
      total: "Monthly total",
      submit: "Confirm subscription",
      sending: "Processing…",
    },
    billing: {
      accountType: "Account type",
      company: "Company",
      individual: "Individual",
      legalNameCompany: "Legal name",
      legalNameIndividual: "Full name",
      country: "Billing country",
      taxId: "Tax ID",
      contactName: "Contact person",
      email: "Billing email",
      emailPlaceholder: "billing@company.com",
      phone: "Phone",
      address: "Billing address",
      city: "City",
      postalCode: "Postal code",
      required: "This field is required.",
      invalidEmail: "Enter a valid email address.",
    },
    payment: {
      legend: "Payment method",
      disclaimer: "We never ask for card details on this page. On confirmation we hand you over to the provider's gateway, which is what processes and stores the payment method.",
      methods: [
        { id: "card", label: "Credit or debit card", detail: "Visa, Mastercard and American Express. Charged monthly.", handoff: "We'll take you to the secure gateway to enter the card. We never store its details." },
        { id: "transfer", label: "Bank transfer", detail: "SEPA, ACH or local transfer. Recommended for annual billing.", handoff: "We'll send the proforma invoice with our bank details within one business day." },
        { id: "local", label: "Local payment method (LatAm)", detail: "PSE, Mercado Pago, Pix, SPEI and regionally issued cards.", handoff: "We'll take you to the local provider to complete the payment in your currency." },
      ],
    },
    done: {
      title: "Request received",
      referencePrefix: "Your reference is",
      copySuffix: "We sent a copy to",
      failure: "We couldn't register the request. Please try again.",
    },
    contactPrefix: "Need bespoke terms or annual billing? Write to us at",
  },

  footer: {
    tagline: "Real-time odds infrastructure for Latin America and Europe.",
    legal: "© 2026 OddsTrading. All rights reserved.",
    compliance: "B2B data service. 18+. Please gamble responsibly.",
    columns: [
      { title: "Product", links: [
        { href: "/#platform", label: "Platform" },
        { href: "/#coverage", label: "Coverage" },
        { href: "/#integration", label: "Documentation" },
        { href: "/#pricing", label: "Pricing" },
        { href: "/#contact", label: "Service status" },
      ]},
      { title: "Sports", links: [
        { href: "/#coverage", label: "Football API" },
        { href: "/#coverage", label: "Basketball API" },
        { href: "/#coverage", label: "Tennis API" },
        { href: "/#coverage", label: "Esports API" },
        { href: "/#coverage", label: "All 38 sports" },
      ]},
      { title: "Bookmakers", links: [
        { href: "/#coverage", label: "Bet365" },
        { href: "/#coverage", label: "Betano" },
        { href: "/#coverage", label: "DraftKings" },
        { href: "/#coverage", label: "Pinnacle" },
        { href: "/#coverage", label: "Betfair Exchange" },
      ]},
      { title: "Company", links: [
        { href: "/#contact", label: "Contact" },
        { href: "/#contact", label: "Terms" },
        { href: "/#contact", label: "Privacy" },
        { href: "/#contact", label: "Responsible gambling" },
      ]},
    ],
  },

  codeSamples: [
    { id: "curl", label: "cURL", code: `$ curl "https://api.oddstrading.io/v1/odds" \\
  -H "Authorization: Bearer $ODDS_KEY" \\
  -d "sport=football" \\
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

// Stream live line movement
const stream = ot.stream({
  sport: "football",
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
    sport="football",
    reference="pinnacle",
    min_edge=0.03,
    region=["latam", "eu"],
)

for bet in value:
    print(bet.event, bet.book, bet.odds, bet.edge)

# Boca vs Palmeiras - betplay - 2.18 - +4.1%` },
  ],
};
