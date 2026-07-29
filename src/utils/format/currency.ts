/**
 * Currency formatting shared by the pricing cards and the checkout summary, so
 * the same figure never renders two different ways.
 *
 * `es-CO` grouping is used deliberately: the audience is Spanish-speaking, and
 * it renders 3000 as "3.000" rather than "3,000".
 */
const FORMATTER = new Intl.NumberFormat("es-CO", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Formats a whole-dollar amount without the currency symbol. */
export const formatUsd = (amount: number): string => FORMATTER.format(amount);
