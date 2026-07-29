/**
 * Commercial plans — shared by the pricing section and the checkout flow, so
 * the price a visitor sees and the price the order summary charges can never
 * drift apart.
 *
 * Prices are the monthly licence fee in USD, excluding tax. `slug` is what the
 * checkout route accepts as `?plan=`.
 */

export interface Plan {
  slug: string;
  name: string;
  audience: string;
  /** Monthly licence fee in USD, tax excluded. */
  price: number;
  /** One-line summary of what the tier unlocks, used in the order summary. */
  scope: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    slug: "starter",
    name: "Starter",
    audience: "Para lanzar tu primer comparador de cuotas.",
    price: 3000,
    scope: "Integración 1X2 a la media de mercado",
    cta: "Elegir Starter",
    features: [
      "Integración del mercado 1X2 a la media de mercado",
      "Cuotas pre-match y en vivo",
      "API REST con esquema unificado",
      "Fútbol y competiciones principales",
      "Soporte por correo",
    ],
  },
  {
    slug: "pro",
    name: "Pro",
    audience: "Para producto con varios deportes y mercados.",
    price: 5000,
    scope: "Multideporte + mapeo de cuotas mejorado",
    cta: "Elegir Pro",
    featured: true,
    features: [
      "Todo lo del plan Starter",
      "Integración a la media de mercado del resto de deportes",
      "Mapeo de cuotas mejorado",
      "Los mercados más apostados y sus variantes",
      "Handicap asiático, over/under y props",
      "Soporte prioritario",
    ],
  },
  {
    slug: "elite",
    name: "Elite",
    audience: "Para trading, arbitraje y operadores.",
    price: 6500,
    scope: "40+ casas y feed en tiempo real",
    cta: "Elegir Elite",
    features: [
      "Todo lo del plan Pro",
      "Integración completa de más de 40 casas de apuestas",
      "Acceso exclusivo a datos en tiempo real",
      "Feed de cuotas por WebSocket sin límite de eventos",
      "Motor de arbitraje y value bets",
      "Histórico completo y exportación",
      "Slack compartido con ingeniero asignado",
    ],
  },
];

/** Looks a plan up by the slug the checkout route receives. */
export const findPlan = (slug?: string | null): Plan | undefined =>
  plans.find((plan) => plan.slug === slug);
