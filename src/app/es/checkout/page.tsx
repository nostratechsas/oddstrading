import type { Metadata } from "next";

import { es } from "@/data/content/es";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { CheckoutView } from "@/views/checkout";

export const metadata: Metadata = buildMetadata({
  title: "Contratar — OddsTrading",
  description:
    "Elige tu plan de OddsTrading, completa los datos de facturación y activa tu licencia de cuotas en tiempo real.",
  url: "/es/checkout",
});

export default async function CheckoutEs({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  return <CheckoutView content={es} plan={plan} />;
}
