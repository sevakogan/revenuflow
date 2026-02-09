import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RevenuFlow | Maximize Every Night's Revenue",
  description:
    "AI-powered revenue management for short-term rentals. Dynamic pricing, market analytics, and demand forecasting to maximize your property revenue.",
  openGraph: {
    title: "RevenuFlow | AI Revenue Management for Short-Term Rentals",
    description:
      "Stop leaving money on the table. RevenuFlow uses AI-powered dynamic pricing to maximize revenue for Airbnb hosts and vacation rental managers.",
    url: "https://revenuflow.com",
    siteName: "RevenuFlow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RevenuFlow | Maximize Every Night's Revenue",
    description:
      "Hands-on revenue management for short-term rentals. AI tools backed by real expertise.",
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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
