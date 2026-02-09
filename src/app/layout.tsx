import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RevenueFlow | Maximize Every Night's Revenue",
  description:
    "AI-powered revenue management for short-term rentals. Dynamic pricing, market analytics, and demand forecasting to maximize your property revenue.",
  openGraph: {
    title: "RevenueFlow | AI Revenue Management for Short-Term Rentals",
    description:
      "Stop leaving money on the table. RevenueFlow uses AI-powered dynamic pricing to maximize revenue for Airbnb hosts and vacation rental managers.",
    url: "https://revenueflow.com",
    siteName: "RevenueFlow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RevenueFlow | Maximize Every Night's Revenue",
    description:
      "AI-powered dynamic pricing for short-term rentals. Increase revenue by 35% on average.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
