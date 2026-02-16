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
    "Hands-on revenue management for Airbnb, VRBO, Booking.com, and short-term rental properties. Dynamic pricing, market analytics, and demand forecasting to maximize your property revenue across all OTA channels.",
  keywords: [
    // Airbnb
    "Airbnb revenue management",
    "Airbnb pricing strategy",
    "Airbnb dynamic pricing",
    "Airbnb host tools",
    "Airbnb income optimization",
    "Airbnb portfolio management",
    // VRBO
    "VRBO pricing optimization",
    "VRBO revenue management",
    "VRBO host pricing tools",
    // Booking.com & Expedia
    "Booking.com revenue management",
    "Booking.com pricing optimization",
    "Expedia vacation rental pricing",
    "Expedia revenue optimization",
    // Hotels & hospitality
    "hotel revenue management",
    "boutique hotel pricing",
    "hospitality revenue management",
    "hotel dynamic pricing",
    "resort revenue optimization",
    "serviced apartment pricing",
    // General STR / vacation rental
    "short-term rental pricing",
    "vacation rental revenue management",
    "STR revenue optimization",
    "vacation rental pricing strategy",
    "short-term rental analytics",
    "rental revenue optimization",
    "vacation rental occupancy",
    "short-term rental demand forecasting",
    "rental income maximization",
    "short-term rental market intelligence",
    // Industry terms
    "dynamic pricing software",
    "ADR optimization",
    "RevPAR maximization",
    "OTA channel management",
    "multi-channel pricing",
    "channel manager pricing",
    "property management pricing",
    // Tools & integrations
    "PriceLabs management",
    "Guesty pricing integration",
    "Hospitable revenue management",
    // Brand
    "RevenuFlow",
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
    title: "RevenuFlow | Revenue Management for Airbnb, VRBO, Booking.com & Hotels",
    description:
      "Stop leaving money on the table. RevenuFlow uses dynamic pricing and hands-on expertise to maximize revenue across Airbnb, VRBO, Booking.com, Expedia, and direct booking channels.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "RevenuFlow — Maximize Every Night's Revenue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RevenuFlow | Maximize Every Night's Revenue",
    description:
      "Hands-on revenue management for Airbnb, VRBO, Booking.com, hotels, and vacation rentals. Dynamic pricing backed by real expertise across all OTA channels.",
    images: ["/opengraph-image"],
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
        "RevenuFlow provides hands-on revenue management for Airbnb, VRBO, Booking.com, Expedia, hotels, and short-term rental properties, including dynamic pricing, market analytics, demand forecasting, OTA channel optimization, and portfolio management.",
      foundingDate: "2025",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-866-996-6382",
        contactType: "sales",
        availableLanguage: "English",
      },
      knowsAbout: [
        "Airbnb Revenue Management",
        "VRBO Revenue Optimization",
        "Booking.com Pricing Strategy",
        "Expedia Vacation Rental Management",
        "Hotel Revenue Management",
        "Boutique Hotel Dynamic Pricing",
        "Resort Revenue Optimization",
        "Short-Term Rental Pricing",
        "Dynamic Pricing Optimization",
        "Vacation Rental Market Analytics",
        "Demand Forecasting",
        "STR Portfolio Management",
        "PriceLabs Configuration",
        "OTA Channel Management",
        "Multi-Channel Distribution",
        "ADR and RevPAR Optimization",
        "Occupancy Rate Optimization",
        "Revenue Per Available Night",
        "Hospitality Revenue Strategy",
        "Serviced Apartment Pricing",
        "Google Vacation Rentals",
        "Channel Manager Integration",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://revenuflow.vercel.app/#website",
      url: "https://revenuflow.vercel.app",
      name: "RevenuFlow",
      description:
        "Revenue management platform for Airbnb hosts, VRBO operators, Booking.com partners, hotel owners, and short-term rental property managers",
      publisher: { "@id": "https://revenuflow.vercel.app/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://revenuflow.vercel.app/#webpage",
      url: "https://revenuflow.vercel.app",
      name: "RevenuFlow | Maximize Every Night's Revenue",
      description:
        "Hands-on revenue management for Airbnb, VRBO, Booking.com, Expedia, hotels, and vacation rental properties. Dynamic pricing, market analytics, and demand forecasting across all OTA channels.",
      isPartOf: { "@id": "https://revenuflow.vercel.app/#website" },
      about: { "@id": "https://revenuflow.vercel.app/#organization" },
    },
    {
      "@type": "Service",
      "@id": "https://revenuflow.vercel.app/#service",
      name: "Vacation Rental & Hotel Revenue Management",
      description:
        "Comprehensive revenue management services for Airbnb, VRBO, Booking.com, Expedia, hotels, and vacation rental properties. We handle dynamic pricing, OTA channel optimization, market analytics, competitor tracking, demand forecasting, and ongoing optimization to maximize your rental income across all platforms.",
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
                "AI-powered pricing calibrated by experts to maximize ADR and RevPAR across Airbnb, VRBO, Booking.com, Expedia, and direct booking channels.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "OTA Channel Management & Multi-Platform Sync",
              description:
                "Unified pricing strategy across all online travel agencies including Airbnb, VRBO, Booking.com, Expedia, Google Vacation Rentals, and direct booking websites.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Market Analytics & Demand Forecasting",
              description:
                "Real-time market intelligence, competitor tracking across all OTA platforms, and demand forecasting to stay ahead of seasonal trends, local events, and market shifts.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Portfolio Revenue Strategy",
              description:
                "White-glove revenue management for vacation rental and hotel portfolios including dedicated strategy calls, proactive OTA optimization, and custom reporting.",
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
            text: "We use tools like PriceLabs and other leading pricing software selected based on your market and property type. Our team reviews pricing decisions, monitors market shifts across Airbnb, VRBO, Booking.com, and other OTAs, and makes manual adjustments when the algorithms miss something.",
          },
        },
        {
          "@type": "Question",
          name: "Which platforms does RevenuFlow work with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We work with Airbnb, VRBO, Booking.com, Expedia, Google Vacation Rentals, and direct booking websites. We also integrate with PMS systems like Guesty, Hospitable, Hostaway, and Lodgify. We support hotels, boutique hotels, resorts, serviced apartments, and all types of vacation rental properties.",
          },
        },
        {
          "@type": "Question",
          name: "How long until I see results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most clients see noticeable improvement within the first 30 days. We need about 2 weeks to analyze your market and calibrate pricing across all your OTA channels. After that, optimization runs continuously with our team keeping a close eye on performance.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a minimum number of properties?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. We work with hosts who have a single property all the way up to hotel and vacation rental portfolios with 15+ units. Every client gets personal attention regardless of size.",
          },
        },
        {
          "@type": "Question",
          name: "Do I lose control over my pricing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Never. You always have the final say on pricing across Airbnb, VRBO, Booking.com, and all platforms. We set min/max boundaries together, respect your preferences, and you can override any price at any time.",
          },
        },
        {
          "@type": "Question",
          name: "How is pricing structured?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It's per property per month, and you only pay for active properties. We offer volume discounts for larger hotel and vacation rental portfolios, and annual plans save 20%. Request a free analysis and we'll give you an exact quote.",
          },
        },
        {
          "@type": "Question",
          name: "Can I try before I commit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We offer a free revenue analysis where we look at your Airbnb, VRBO, Booking.com, or hotel properties and show you exactly where you're leaving money on the table — with no obligation.",
          },
        },
        {
          "@type": "Question",
          name: "What kind of support do I get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This isn't a helpdesk. You get direct access to the person managing your revenue — by phone, text, or email. Growth and Portfolio clients get regular strategy calls and proactive recommendations for optimizing across all OTA channels.",
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
