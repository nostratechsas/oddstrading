/**
 * Checkout copy and option lists.
 *
 * `PAYMENT_METHODS` describes what the buyer *selects*; the card itself is
 * never captured by this form. Every method hands off to the provider's own
 * hosted page, which is what keeps the site out of PCI-DSS scope.
 */

export interface PaymentMethod {
  id: string;
  label: string;
  detail: string;
  /** Shown when the buyer picks it — sets the expectation for the next screen. */
  handoff: string;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    label: "Tarjeta de crédito o débito",
    detail: "Visa, Mastercard y American Express. Cobro recurrente cada mes.",
    handoff: "Te llevamos a la pasarela segura para introducir la tarjeta. No guardamos sus datos.",
  },
  {
    id: "transfer",
    label: "Transferencia bancaria",
    detail: "SEPA, ACH o transferencia local. Recomendado para facturación anual.",
    handoff: "Te enviamos la factura proforma con los datos bancarios en menos de 24 horas.",
  },
  {
    id: "local",
    label: "Medio de pago local (LatAm)",
    detail: "PSE, Mercado Pago, Pix, SPEI y tarjetas emitidas en la región.",
    handoff: "Te llevamos al proveedor local para completar el pago en tu moneda.",
  },
];

export interface CountryOption {
  code: string;
  label: string;
  /** Label of the tax identifier used in that country. */
  taxId: string;
}

export const countries: CountryOption[] = [
  { code: "CO", label: "Colombia", taxId: "NIT" },
  { code: "MX", label: "México", taxId: "RFC" },
  { code: "PE", label: "Perú", taxId: "RUC" },
  { code: "AR", label: "Argentina", taxId: "CUIT" },
  { code: "CL", label: "Chile", taxId: "RUT" },
  { code: "BR", label: "Brasil", taxId: "CNPJ" },
  { code: "ES", label: "España", taxId: "CIF / NIF" },
  { code: "GB", label: "Reino Unido", taxId: "VAT number" },
  { code: "DE", label: "Alemania", taxId: "USt-IdNr." },
  { code: "IT", label: "Italia", taxId: "Partita IVA" },
  { code: "MT", label: "Malta", taxId: "VAT number" },
  { code: "OTHER", label: "Otro país", taxId: "Identificación fiscal" },
];

export const checkoutContent = {
  eyebrow: "Contratación",
  headline: "Activa tu licencia",
  headlineMuted: "en tres pasos.",
  lede: "Elige el plan, completa los datos de facturación y confirma. Nuestro equipo valida la cuenta y te entrega la API key en menos de 24 horas hábiles.",
  steps: [
    { index: "01", title: "Plan", body: "Elige la licencia que se ajusta a tu integración." },
    { index: "02", title: "Facturación", body: "Los datos fiscales que irán en cada factura." },
    { index: "03", title: "Pago", body: "Elige el medio y confirma la contratación." },
  ],
  guarantees: [
    "Contrato mensual, sin permanencia",
    "Factura fiscal en tu país",
    "Onboarding con ingeniero asignado",
    "Cancelas cuando quieras",
  ],
} as const;
