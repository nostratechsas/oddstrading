import type { Metadata } from "next";

import { es } from "@/data/content/es";
import { generateMetadata as buildMetadata } from "@/utils/seo/generate-page-metadata";
import { HomeView } from "@/views/home";

export const metadata: Metadata = buildMetadata({
  title: "OddsTrading — Cuotas en tiempo real de LatAm y Europa",
  description:
    "Cuotas en vivo, pre-match, props y líneas de cierre de 190+ casas de apuestas de Latinoamérica y Europa vía una sola API REST y un stream WebSocket.",
  url: "/es",
});

export default function HomeEs() {
  return <HomeView content={es} />;
}
