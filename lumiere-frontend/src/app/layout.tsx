import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nums-Nums Catering & Event | Premium Catering in Sabah",
  description: "Nums-Nums Catering & Event — Where every bite tells a story. Premium catering, luxury event design, and cinematic bridal artistry in Kota Kinabalu, Sabah. Owned by Food & Beverage Technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jost.variable} ${cormorant.variable} antialiased`}>
        <div className="grain" />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
