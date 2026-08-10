/**
 * Structural types shared by every locale file. Only the shapes that need to be
 * named live here — the rest of `SiteContent` is inferred from `es.ts`.
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

export interface Faq {
  question: string;
  answer: string;
}

export interface CodeSample {
  id: string;
  label: string;
  code: string;
}

/**
 * How a tier is billed. The demo is free, the integration is a one-off
 * setup fee and Pro is a monthly licence — so the price can never carry a
 * single hard-coded "/mes" suffix.
 */
export type Billing = "free" | "once" | "monthly";

export interface Plan {
  slug: string;
  name: string;
  audience: string;
  /** Fee in USD, tax excluded. `0` for the free demo. */
  price: number;
  billing: Billing;
  scope: string;
  features: readonly string[];
  cta: string;
  featured?: boolean;
  /**
   * How many bookmakers the tier integrates, pulled out of `features` and given
   * its own row — it is the axis tiers are actually chosen on. `capped: true`
   * states a ceiling and is styled as the constraint it is; `false` states the
   * ceiling being lifted.
   */
  coverage: { label: string; capped: boolean };
  /**
   * Featured tiers only: the one-line case for stepping up from the tier below,
   * shown against the price.
   */
  valueNote?: string;
}

export interface PaymentMethod {
  id: string;
  label: string;
  detail: string;
  handoff: string;
}

export interface CountryOption {
  code: string;
  label: string;
  /** Label of the tax identifier used in that country. */
  taxId: string;
}

/**
 * Countries are locale-independent: the tax-identifier names are the local legal
 * terms and are not translated.
 */
export const countries: CountryOption[] = [
  { code: "CO", label: "Colombia", taxId: "NIT" },
  { code: "MX", label: "México", taxId: "RFC" },
  { code: "PE", label: "Perú", taxId: "RUC" },
  { code: "AR", label: "Argentina", taxId: "CUIT" },
  { code: "CL", label: "Chile", taxId: "RUT" },
  { code: "BR", label: "Brasil", taxId: "CNPJ" },
  { code: "ES", label: "España", taxId: "CIF / NIF" },
  { code: "GB", label: "United Kingdom", taxId: "VAT number" },
  { code: "DE", label: "Deutschland", taxId: "USt-IdNr." },
  { code: "IT", label: "Italia", taxId: "Partita IVA" },
  { code: "MT", label: "Malta", taxId: "VAT number" },
  { code: "OTHER", label: "Other / Otro", taxId: "Tax ID" },
];

export const brand = {
  /** Symbol from the favicon master — crisp at any size. */
  mark: "/assets/brand/oddstrading-mark.png",
  /** Wordmark cropped from the logotype. */
  wordmark: "/assets/brand/oddstrading-wordmark.png",
  logoAlt: "OddsTrading",
  email: "contact@oddstradingview.com",
} as const;
