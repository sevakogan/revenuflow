import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "RevenuFlow | Maximize Every Night's Revenue",
    template: "%s | RevenuFlow",
  },
  description:
    "Hands-on revenue management for Airbnb and short-term rental properties. Dynamic pricing, market analytics, and demand forecasting to maximize your property revenue.",
  keywords: [
    "Airbnb revenue management",
    "short-term rental pricing",
    "vacation rental revenue management",
    "dynamic pricing Airbnb",
    "STR revenue optimization",
    "Airbnb pricing strategy",
    "vacation rental management",
    "short-term rental revenue",
    "Airbnb income optimization",
    "rental property revenue management",
    "VRBO pricing optimization",
    "Airbnb dynamic pricing",
    "vacation rental pricing strategy",
    "short-term rental analytics",
    "Airbnb market analysis",
    "rental revenue optimization",
    "property management pricing",
    "Airbnb host tools",
    "vacation rental occupancy",
    "STR pricing tools",
    "Airbnb revenue tools",
    "short-term rental demand forecasting",
    "RevenuFlow",
    "PriceLabs management",
    "vacation rental ROI",
    "Airbnb portfolio management",
    "rental income maximization",
    "short-term rental market intelligence",
  ],
  authors: [{ name: "RevenuFlow", url: "https://revenuflow.vercel.app" }],
  creator: "RevenuFlow",
  publisher: "RevenuFlow",
  metadataBase: new URL("https://revenuflow.vercel.app"),
  alternates: {
    canonical: "https://revenuflow.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://revenuflow.vercel.app",
    siteName: "RevenuFlow",
    title: "RevenuFlow | AI Revenue Management for Short-Term Rentals",
    description:
      "Stop leaving money on the table. RevenuFlow uses dynamic pricing and hands-on expertise to maximize revenue for Airbnb hosts and vacation rental managers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RevenuFlow | Maximize Every Night's Revenue",
    description:
      "Hands-on revenue management for short-term rentals. Dynamic pricing backed by real expertise for Airbnb and vacation rental properties.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Revenue Management",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0F",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://revenuflow.vercel.app/#organization",
      name: "RevenuFlow",
      url: "https://revenuflow.vercel.app",
      description:
        "RevenuFlow provides hands-on revenue management for Airbnb and short-term rental properties, including dynamic pricing, market analytics, demand forecasting, and portfolio optimization.",
      foundingDate: "2025",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-866-996-6382",
        contactType: "sales",
        availableLanguage: "English",
      },
      knowsAbout: [
        "Airbnb Revenue Management",
        "Short-Term Rental Pricing",
        "Dynamic Pricing Optimization",
        "Vacation Rental Market Analytics",
        "Demand Forecasting",
        "STR Portfolio Management",
        "PriceLabs Configuration",
        "VRBO Revenue Optimization",
        "Occupancy Rate Optimization",
        "Revenue Per Available Night",
        "Rental Property Revenue Maximization",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://revenuflow.vercel.app/#website",
      url: "https://revenuflow.vercel.app",
      name: "RevenuFlow",
      description:
        "Revenue management platform for Airbnb hosts and short-term rental property managers",
      publisher: { "@id": "https://revenuflow.vercel.app/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://revenuflow.vercel.app/#webpage",
      url: "https://revenuflow.vercel.app",
      name: "RevenuFlow | Maximize Every Night's Revenue",
      description:
        "Hands-on revenue management for short-term rentals — dynamic pricing, market analytics, and demand forecasting for Airbnb and vacation rental properties.",
      isPartOf: { "@id": "https://revenuflow.vercel.app/#website" },
      about: { "@id": "https://revenuflow.vercel.app/#organization" },
    },
    {
      "@type": "Service",
      "@id": "https://revenuflow.vercel.app/#service",
      name: "Short-Term Rental Revenue Management",
      description:
        "Comprehensive revenue management services for Airbnb and vacation rental properties. We handle dynamic pricing, market analytics, competitor tracking, demand forecasting, and ongoing optimization to maximize your rental income.",
      provider: { "@id": "https://revenuflow.vercel.app/#organization" },
      serviceType: "Revenue Management",
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Revenue Management Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Dynamic Pricing Optimization",
              description:
                "AI-powered pricing calibrated by experts to maximize revenue per available night across Airbnb, VRBO, and direct booking channels.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Market Analytics & Demand Forecasting",
              description:
                "Real-time market intelligence, competitor tracking, and demand forecasting to stay ahead of seasonal trends and market shifts.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Portfolio Revenue Strategy",
              description:
                "White-glove revenue management for property portfolios including dedicated strategy calls, proactive recommendations, and custom reporting.",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does the pricing optimization work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We use tools like PriceLabs and other leading pricing software selected based on your market and property type. Our team reviews pricing decisions, monitors market shifts, and makes manual adjustments when the algorithms miss something.",
          },
        },
        {
          "@type": "Question",
          name: "Which platforms does RevenuFlow work with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We work with Airbnb, VRBO, and direct booking websites. We also integrate with PMS systems like Guesty, Hospitable, Hostaway, and Lodgify.",
          },
        },
        {
          "@type": "Question",
          name: "How long until I see results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most clients see noticeable improvement within the first 30 days. We need about 2 weeks to analyze your market and calibrate pricing. After that, optimization runs continuously with our team keeping a close eye on performance.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a minimum number of properties?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. We work with hosts who have a single property all the way up to portfolios with 15+. Every client gets personal attention regardless of size.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
