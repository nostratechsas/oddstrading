/**
 * ePayco — the gateway. Charges in COP and settles to a Colombian bank
 * account, which is the constraint that rules the choice.
 *
 * **Server-only.** `p_key` never reaches the browser: it is only ever an input
 * to the signatures computed here, so the amount cannot be tampered with on the
 * way to ePayco.
 *
 * The destination bank account is configured in the ePayco merchant panel, not
 * here — there is deliberately no account number anywhere in this repository.
 *
 * Signature formulas are taken from ePayco's own plugin source, not guessed:
 * the request is MD5 and the confirmation is SHA-256, both caret-separated, and
 * they are **not** interchangeable.
 */
import { createHash, timingSafeEqual } from "node:crypto";

export interface EpaycoConfig {
  /** `P_CUST_ID_CLIENTE` — the merchant id. */
  custId: string;
  /** `P_KEY` — the secret both signatures are salted with. */
  key: string;
  /** Public key, used by ePayco's own checkout script. */
  publicKey: string;
  /** `"true"` keeps the gateway in sandbox. */
  test: boolean;
  /** Where the signed form is posted. */
  checkoutUrl: string;
}

/**
 * Read at call time, not at module load: a missing key should fail the request
 * that needs it with a clear message, not crash the whole server at boot.
 */
export function getEpaycoConfig(): EpaycoConfig | null {
  const custId = process.env.EPAYCO_CUST_ID;
  const key = process.env.EPAYCO_P_KEY;
  const publicKey = process.env.EPAYCO_PUBLIC_KEY;

  if (!custId || !key || !publicKey) return null;

  return {
    custId,
    key,
    publicKey,
    // Anything other than an explicit "false" stays in test mode. Defaulting to
    // live would be the wrong way round for a misconfiguration.
    test: process.env.EPAYCO_TEST !== "false",
    checkoutUrl: process.env.EPAYCO_CHECKOUT_URL ?? "https://secure.epayco.co/checkout.php",
  };
}

/**
 * Request signature: MD5 over cust id, key, invoice, amount and currency,
 * separated by carets. This is what stops the browser from posting its own
 * amount.
 */
export function requestSignature(
  custId: string,
  key: string,
  invoice: string,
  amount: number,
  currency: string,
): string {
  return createHash("md5")
    .update(`${custId}^${key}^${invoice}^${amount}^${currency}`)
    .digest("hex");
}

export interface CheckoutForm {
  /** Where the browser must POST. */
  action: string;
  /** Hidden fields, already signed. */
  fields: Record<string, string>;
  invoice: string;
}

/**
 * Builds the signed form for ePayco's checkout.
 *
 * ePayco takes a form POST rather than a signed query string, so the browser
 * submits these fields; no card data ever touches this app, which is what keeps
 * it out of PCI-DSS scope.
 *
 * `p_amount` is the total, `p_base_tax` the net and `p_tax` the VAT — ePayco
 * itemises them on its own page and on the invoice, so they must add up.
 */
export function buildCheckoutForm({
  config,
  invoice,
  description,
  totalCop,
  subtotalCop,
  ivaCop,
  email,
  responseUrl,
  confirmationUrl,
  currency = "COP",
}: {
  config: EpaycoConfig;
  invoice: string;
  description: string;
  totalCop: number;
  subtotalCop: number;
  ivaCop: number;
  email: string;
  responseUrl: string;
  confirmationUrl: string;
  currency?: string;
}): CheckoutForm {
  return {
    action: config.checkoutUrl,
    invoice,
    fields: {
      p_cust_id_cliente: config.custId,
      p_key: config.publicKey,
      p_id_invoice: invoice,
      p_description: description,
      p_amount: String(totalCop),
      p_tax: String(ivaCop),
      p_base_tax: String(subtotalCop),
      p_currency_code: currency,
      p_signature: requestSignature(config.custId, config.key, invoice, totalCop, currency),
      p_billing_email: email,
      p_test_request: config.test ? "TRUE" : "FALSE",
      p_url_response: responseUrl,
      p_url_confirmation: confirmationUrl,
    },
  };
}

/* ------------------------------------------------------------ confirmation */

/** The subset of ePayco's confirmation payload this app acts on. */
export interface EpaycoConfirmation {
  x_ref_payco?: string;
  x_transaction_id?: string;
  x_amount?: string;
  x_currency_code?: string;
  x_signature?: string;
  x_id_invoice?: string;
  /** "Aceptada" | "Rechazada" | "Pendiente" | "Fallida". */
  x_response?: string;
  x_customer_email?: string;
  x_test_request?: string;
}

/**
 * Verifies a confirmation actually came from ePayco.
 *
 * SHA-256 — **not** the MD5 used on the way out — over cust id, key, ref,
 * transaction id, amount and currency, caret-separated. Skipping this check
 * would let anyone who knows the URL mark an order paid.
 */
export function verifyConfirmation(
  body: EpaycoConfirmation,
  config: EpaycoConfig,
): boolean {
  if (!body.x_signature) return false;

  const expected = createHash("sha256")
    .update(
      [
        config.custId,
        config.key,
        body.x_ref_payco ?? "",
        body.x_transaction_id ?? "",
        body.x_amount ?? "",
        body.x_currency_code ?? "",
      ].join("^"),
    )
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(body.x_signature.toLowerCase());
  return a.length === b.length && timingSafeEqual(a, b);
}

/** ePayco reports the outcome in Spanish; this is the app's own vocabulary. */
export type PaymentStatus = "approved" | "declined" | "pending" | "failed" | "unknown";

export function readStatus(response: string | undefined): PaymentStatus {
  switch ((response ?? "").trim().toLowerCase()) {
    case "aceptada":
      return "approved";
    case "rechazada":
      return "declined";
    case "pendiente":
      return "pending";
    case "fallida":
      return "failed";
    default:
      return "unknown";
  }
}

/**
 * Invoice reference the buyer can quote in an email.
 *
 * ePayco keys the order on `p_id_invoice`, so it has to be unique per attempt —
 * reusing one would collide with the previous transaction.
 */
export const buildInvoice = (planSlug: string): string =>
  `OT-${planSlug.slice(0, 3).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
