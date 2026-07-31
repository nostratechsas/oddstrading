import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OddsTrading — Dashboard",
  description:
    "Comparador de cuotas, arbitraje y análisis de movimientos en tiempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark">
      <head>
        {/*
          Stamps the saved theme before first paint. Without it the page renders
          dark and then snaps to light on hydration — a visible flash on every
          load for anyone who chose the light theme.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("ot-theme")==="light")document.documentElement.classList.add("light-mode")}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
