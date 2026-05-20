import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crestbourne — Property Investment & Asset Management",
  description:
    "A privately-held London investor in UK property since 1997. We acquire below replacement cost, manage every asset in-house, and hold for the long horizon.",
  openGraph: {
    title: "Crestbourne — Property Investment & Asset Management",
    description:
      "Twenty-eight years of compounding patiently across the UK's built environment.",
    url: "https://www.crestbourne.co.uk",
    siteName: "Crestbourne",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
        style={{ fontFamily: "var(--font-sans), -apple-system, system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
