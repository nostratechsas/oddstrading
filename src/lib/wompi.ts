/**
 * Wompi — Bancolombia's gateway. Charges in COP and settles to a Colombian
 * bank account, which is why it is the one that fits here.
 *
 * **Server-only.** The private key and both secrets never reach the browser;
 * only the public key and the integrity signature do, and the signature is
 * computed here so the amount cannot be tampered with on the way to Wompi.
 *
 * The destination bank account is configured in the Wompi merchant panel, not
 * here — there is deliberately no account number anywhere in this repository.
 */
import { createHash, timingSafeEqual } from "node:crypto";

export interface WompiConfig {
  publicKey: string;
  integritySecret: string;
  eventsSecret: string;
  /** `https://checkout.wompi.co/p/` in production, the sandbox host otherwise. */
  checkoutUrl: string;
}

/**
 * Read at call time, not at module load: a missing key should fail the request
 * that needs it with a clear message, not crash the whole server at boot.
 */
export function getWompiConfig(): WompiConfig | null {
  const publicKey = process.env.WOMPI_PUBLIC_KEY;
  const integritySecret = process.env.WOMPI_INTEGRITY_SECRET;
  const eventsSecret = process.env.WOMPI_EVENTS_SECRET;

  if (!publicKey || !integritySecret || !eventsSecret) return null;

  return {
    publicKey,
    integritySecret,
    eventsSecret,
    checkoutUrl: process.env.WOMPI_CHECKOUT_URL ?? "https://checkout.wompi.co/p/",
  };
}

/**
 * Wompi's integrity signature: SHA-256 over reference, amount, currency and
 * the merchant's integrity secret, in that exact order.
 *
 * Without it the checkout would accept whatever amount the browser sent.
 */
export function integritySignature(
  reference: string,
  amountInCents: number,
  currency: string,
  secret: string,
): string {
  return createHash("sha256")
    .update(`${reference}${amountInCents}${currency}${secret}`)
    .digest("hex");
}

export interface CheckoutLink {
  /** Where to send the browser to pay. */
  url: string;
  reference: string;
}

/**
 * Builds the Web Checkout URL for an order.
 *
 * Wompi's hosted page takes the parameters on the query string and validates
 * them against the signature, so no card data ever touches this app — which is
 * what keeps it out of PCI-DSS scope.
 */
export function buildCheckoutLink({
  config,
  reference,
  amountInCents,
  currency = "COP",
  email,
  redirectUrl,
  legalId,
  legalIdType,
  fullName,
  phone,
}: {
  config: WompiConfig;
  reference: string;
  amountInCents: number;
  currency?: string;
  email: string;
  redirectUrl: string;
  legalId?: string;
  legalIdType?: string;
  fullName?: string;
  phone?: string;
}): CheckoutLink {
  const params = new URLSearchParams({
    "public-key": config.publicKey,
    currency,
    "amount-in-cents": String(amountInCents),
    reference,
    "redirect-url": redirectUrl,
    "signature:integrity": integritySignature(
      reference,
      amountInCents,
      currency,
      config.integritySecret,
    ),
  });

  // Prefilling shortens the form and keeps the buyer's data consistent with
  // the invoice we already collected.
  if (email) params.set("customer-data:email", email);
  if (fullName) params.set("customer-data:full-name", fullName);
  if (phone) params.set("customer-data:phone-number", phone);
  if (legalId) params.set("customer-data:legal-id", legalId);
  if (legalIdType) params.set("customer-data:legal-id-type", legalIdType);

  return { url: `${config.checkoutUrl}?${params.toString()}`, reference };
}

/* ------------------------------------------------------------------ events */

export interface WompiEvent {
  event: string;
  data: {
    transaction: {
      id: string;
      reference: string;
      status: "APPROVED" | "DECLINED" | "VOIDED" | "ERROR" | "PENDING";
      amount_in_cents: number;
      currency: string;
      customer_email?: string;
    };
  };
  signature: { properties: string[]; checksum: string };
  timestamp: number;
}

/**
 * Verifies a webhook came from Wompi.
 *
 * The checksum is SHA-256 over the values of the listed properties, in the
 * order given, then the timestamp, then the events secret. An unverified
 * webhook is an open door: anyone who knows the URL could mark orders paid.
 */
export function verifyEvent(event: WompiEvent, secret: string): boolean {
  if (!event?.signature?.checksum || !Array.isArray(event.signature.properties)) {
    return false;
  }

  const values = event.signature.properties.map((path) =>
    String(
      path
        .split(".")
        .reduce<unknown>(
          (node, key) => (node as Record<string, unknown> | undefined)?.[key],
          event.data,
        ) ?? "",
    ),
  );

  const expected = createHash("sha256")
    .update(`${values.join("")}${event.timestamp}${secret}`)
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(event.signature.checksum.toLowerCase());
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Human-readable reference the buyer can quote in an email. */
export const buildReference = (planSlug: string): string =>
  `OT-${planSlug.slice(0, 3).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
