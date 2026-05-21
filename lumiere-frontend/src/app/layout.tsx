import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";

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
  title: "Nam-Nams",
  description: "Nam-Nams Catering Malaysia Delights Your Guests With Memorial Experience On Your Corporate Event, School Special Function, Private Party.",
  icons: {
    icon: "/images/nam-nams-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jost.variable} ${cormorant.variable} antialiased`}>
        <Cursor />
        <ScrollToTop />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
