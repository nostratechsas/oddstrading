import type { Metadata } from "next";

import { en } from "@/data/content/en";
import { CheckoutResultView } from "@/views/checkout/result";

export const metadata: Metadata = {
  title: "Resultado del pago — OddsTrading",
  robots: { index: false, follow: false },
};

export default async function CheckoutResult({
  searchParams,
}: {
  searchParams: Promise<{ ref_payco?: string; ref?: string }>;
}) {
  // ePayco returns the buyer with `ref_payco`; `ref` is kept so a link built by
  // hand, or by an earlier version, still resolves.
  const params = await searchParams;
  return <CheckoutResultView content={en} reference={params.ref_payco ?? params.ref} />;
}
