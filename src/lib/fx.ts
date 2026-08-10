/**
 * USD → COP conversion at the official TRM.
 *
 * **Server-only.** The rate is fetched from the Superintendencia Financiera's
 * open-data feed and cached until it expires, so a burst of checkouts hits the
 * upstream once, not once per visitor.
 *
 * The TRM is the legally recognised reference rate in Colombia, published daily
 * and valid for a stated window. It carries **no margin**: whoever charges at
 * TRM absorbs every move of the peso between the sale and the moment the money
 * is actually converted. `FX_SPREAD_PERCENT` exists so that policy is a
 * configuration change rather than a deploy — see [[decisions-log]] ADR-0024.
 */

/** Superfinanciera's TRM dataset on datos.gov.co. */
const TRM_ENDPOINT =
  "https://www.datos.gov.co/resource/32sa-8pi3.json?$limit=1&$order=vigenciadesde%20DESC";

export interface Trm {
  /** Pesos per US dollar, as published. */
  rate: number;
  /** First day the rate applies (ISO date, no time). */
  from: string;
  /** Last day the rate applies (ISO date, no time). */
  to: string;
}

interface CachedTrm extends Trm {
  /** Epoch ms after which the cache must be refetched. */
  expiresAt: number;
}

let cached: CachedTrm | null = null;

/** Cap on how long a rate is trusted, even if its window says otherwise. */
const MAX_CACHE_MS = 6 * 60 * 60 * 1000;

const isoDate = (value: string): string => value.slice(0, 10);

/**
 * Current TRM. Throws when the upstream is unreachable and nothing is cached —
 * quoting a made-up rate would be worse than failing the checkout loudly.
 */
export async function getTrm(): Promise<Trm> {
  if (cached && cached.expiresAt > Date.now()) {
    return { rate: cached.rate, from: cached.from, to: cached.to };
  }

  const response = await fetch(TRM_ENDPOINT, {
    headers: { accept: "application/json" },
    // Next would otherwise cache this indefinitely at build time.
    cache: "no-store",
  });

  if (!response.ok) {
    if (cached) return { rate: cached.rate, from: cached.from, to: cached.to };
    throw new Error(`TRM upstream responded ${response.status}`);
  }

  const [row] = (await response.json()) as { valor: string; vigenciadesde: string; vigenciahasta: string }[];
  const rate = Number(row?.valor);

  if (!Number.isFinite(rate) || rate <= 0) {
    if (cached) return { rate: cached.rate, from: cached.from, to: cached.to };
    throw new Error("TRM upstream returned no usable rate");
  }

  const trm: Trm = {
    rate,
    from: isoDate(row.vigenciadesde),
    to: isoDate(row.vigenciahasta),
  };

  // Expire at the end of the published window, but never trust one rate for
  // more than MAX_CACHE_MS — a stale window would silently freeze the price.
  const windowEnd = new Date(`${trm.to}T23:59:59Z`).getTime();
  cached = {
    ...trm,
    expiresAt: Math.min(windowEnd, Date.now() + MAX_CACHE_MS),
  };

  return trm;
}

/** Margin over the TRM, as a percentage. `0` charges the TRM exactly. */
export function getSpreadPercent(): number {
  const raw = Number(process.env.FX_SPREAD_PERCENT ?? 0);
  if (!Number.isFinite(raw) || raw < 0 || raw > 20) return 0;
  return raw;
}

export interface Conversion {
  trm: Trm;
  /** Percentage applied over the TRM. */
  spreadPercent: number;
  /** The rate actually used, TRM plus spread. */
  effectiveRate: number;
  /** Converted amount, rounded to whole pesos. */
  cop: number;
}

/**
 * Converts a USD amount to whole pesos.
 *
 * Rounding is to the peso: COP has no circulating decimal, and Wompi wants an
 * integer of cents, so a fractional peso would be silently truncated anyway.
 */
export async function usdToCop(usd: number): Promise<Conversion> {
  const trm = await getTrm();
  const spreadPercent = getSpreadPercent();
  const effectiveRate = trm.rate * (1 + spreadPercent / 100);

  return {
    trm,
    spreadPercent,
    effectiveRate,
    cop: Math.round(usd * effectiveRate),
  };
}
