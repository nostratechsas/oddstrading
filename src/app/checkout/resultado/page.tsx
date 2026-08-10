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
  searchParams: Promise<{ ref?: string; id?: string }>;
}) {
  const { ref, id } = await searchParams;
  return <CheckoutResultView content={en} reference={ref} transactionId={id} />;
}
