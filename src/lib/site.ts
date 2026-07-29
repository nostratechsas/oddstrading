/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "OddsTrading",
  description:
    "Cuotas en vivo, pre-match, props y líneas de cierre de 190+ casas de apuestas de Latinoamérica y Europa vía una sola API REST y un stream WebSocket. Latencia inferior a 120 ms.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph.png",
  twitterHandle: "@oddstrading",
  author: "OddsTrading",
  /** Browser theme-color — the OLED canvas the brand palette is tuned against. */
  themeColor: "#050505",
} as const;
