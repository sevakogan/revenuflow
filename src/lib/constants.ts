import type {
  NavLink,
  Feature,
  Step,
  Testimonial,
  PricingTier,
  FAQ,
  Stat,
  ProblemCard,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Results", href: "#results" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const STATS: Stat[] = [
  { value: 20, prefix: "$", suffix: "M+", label: "Revenue Managed" },
  { value: 30, suffix: "+", label: "Properties" },
  { value: 96, suffix: "%", label: "Client Retention" },
];

export const SOCIAL_PROOF_LOGOS: string[] = [
  "Airbnb",
  "VRBO",
  "Booking.com",
  "Expedia",
  "Guesty",
  "Hospitable",
  "PriceLabs",
  "Hostaway",
  "Lodgify",
  "Wheelhouse",
];

export const PROBLEM_CARDS: ProblemCard[] = [
  {
    icon: "ChartDown",
    title: "Manual Pricing Guesswork",
    description:
      "Setting prices based on gut feeling means you're constantly under-pricing peak demand periods and over-pricing low seasons, leaving thousands on the table every month.",
  },
  {
    icon: "Clock",
    title: "Missed Market Opportunities",
    description:
      "By the time you spot a local event, competitor price change, or demand spike, the booking window has already passed. Manual monitoring simply can't keep up.",
  },
  {
    icon: "DollarSign",
    title: "Inconsistent Occupancy",
    description:
      "Empty nights eat into your margins while underpriced bookings leave revenue behind. Without data-driven optimization, it's a constant balancing act you can't win.",
  },
];

export const FEATURES: Feature[] = [
  {
    icon: "Zap",
    title: "Dynamic Pricing Engine",
    description:
      "AI adjusts prices in real-time based on demand, seasonality, local events, and competitor rates. Set it and watch your revenue grow automatically.",
  },
  {
    icon: "BarChart",
    title: "Market Analytics",
    description:
      "Deep insights into your market with occupancy trends, ADR benchmarks, and RevPAR tracking. Understand exactly where you stand against the competition.",
  },
  {
    icon: "Search",
    title: "Competitor Tracking",
    description:
      "Monitor competitor pricing, availability, and positioning across Airbnb, VRBO, Booking.com, Expedia, and all major OTAs. Stay ahead with real-time market intelligence.",
  },
  {
    icon: "TrendingUp",
    title: "Demand Forecasting",
    description:
      "Predict future demand using ML models trained on historical data, events, and market signals. Prepare your pricing strategy weeks in advance.",
  },
  {
    icon: "Globe",
    title: "Multi-Platform Sync",
    description:
      "Sync pricing across Airbnb, VRBO, Booking.com, Expedia, and all OTA channels automatically. Integrates with Guesty, Hospitable, and other PMS platforms.",
  },
  {
    icon: "Shield",
    title: "Revenue Reports",
    description:
      "Detailed performance dashboards with revenue attribution, channel analysis, and growth metrics. Know exactly what's driving your bottom line.",
  },
];

export const STEPS: Step[] = [
  {
    number: "01",
    title: "Grant Access",
    description:
      "Give us access to your Airbnb, VRBO, Booking.com, or PMS like Guesty and Hospitable. It takes minutes — and we handle everything from there.",
    icon: "LinkIcon",
  },
  {
    number: "02",
    title: "We Take Over",
    description:
      "Our team analyzes your market, selects the right pricing tools for your location, and builds a custom strategy for each property.",
    icon: "Search",
  },
  {
    number: "03",
    title: "You Earn More",
    description:
      "Automated pricing backed by human oversight runs 24/7. Watch your occupancy and revenue climb while you focus on hospitality.",
    icon: "Rocket",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I was spending hours every week adjusting rates and still missing the mark. They took over and within a month my revenue was noticeably higher — and I didn't have to touch a thing.",
    author: "Luxury Villa Owner",
    title: "Scottsdale, AZ",
    company: "8 Properties",
    metric: "Hands-free pricing",
    initials: "AZ",
  },
  {
    quote:
      "What sold me was the personal attention. This isn't some algorithm you never hear from. They actually review my listings, call me with ideas, and treat my portfolio like it's their own.",
    author: "Vacation Rental Host",
    title: "Miami, FL",
    company: "3 Properties",
    metric: "White-glove service",
    initials: "FL",
  },
  {
    quote:
      "I've tried PriceLabs on my own — it's a great tool but I didn't have time to manage it properly. These guys set it up, monitor it, and adjust when the algorithm misses something. Best of both worlds.",
    author: "Property Manager",
    title: "Nashville, TN",
    company: "12 Properties",
    metric: "Expert + automation",
    initials: "TN",
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Essentials",
    price: "$375",
    period: "/property/mo",
    description: "For hosts who want hands-off pricing done right.",
    features: [
      "Dynamic pricing setup & management",
      "Monthly performance review",
      "Slack support",
      "12-hour response time",
      "Airbnb, VRBO & Booking.com optimization",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "$450",
    period: "/property/mo",
    description: "For serious operators who want a true revenue partner.",
    features: [
      "Everything in Essentials",
      "Weekly strategy calls",
      "Competitor monitoring",
      "Multi-platform sync",
      "Slack support",
      "6-hour response time",
      "Custom pricing rules",
    ],
    highlighted: true,
    cta: "Get Free Analysis",
  },
  {
    name: "Portfolio",
    price: "Contact",
    period: "",
    description: "White-glove service for larger portfolios that demand personal attention.",
    features: [
      "Everything in Growth",
      "Dedicated revenue manager",
      "Market expansion strategy",
      "Listing optimization",
      "Priority response time",
      "Quarterly business reviews",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

export const PRICING_ADDON = {
  name: "Social Media Management",
  price: "$250",
  period: "/mo",
  description: "3–4 posts per week across your channels. Available as an add-on to any plan.",
};

export const FAQS: FAQ[] = [
  {
    question: "How does the pricing optimization work?",
    answer:
      "We use tools like PriceLabs and other leading pricing software — selected based on your market and property type. But we don't just plug it in and walk away. Our team reviews pricing decisions, monitors market shifts, and makes manual adjustments when the algorithms miss something.",
  },
  {
    question: "Which platforms do you work with?",
    answer:
      "We work with Airbnb, VRBO, Booking.com, Expedia, Google Vacation Rentals, and direct booking websites. We also integrate with PMS systems like Guesty, Hospitable, Hostaway, and Lodgify. We support vacation rentals, boutique hotels, resorts, and serviced apartments. If you use a different platform, reach out — we likely support it.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Most clients see noticeable improvement within the first 30 days. We need about 2 weeks to analyze your market and calibrate pricing. After that, optimization runs continuously with our team keeping a close eye on performance.",
  },
  {
    question: "Is there a minimum number of properties?",
    answer:
      "No. We work with hosts who have a single property all the way up to portfolios with 15+. Every client gets personal attention regardless of size.",
  },
  {
    question: "Do I lose control over my pricing?",
    answer:
      "Never. You always have the final say. We set min/max boundaries together, respect your preferences, and you can override any price at any time. We're here to advise and optimize — not to take over.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "It's per property per month, and you only pay for active properties. We offer volume discounts for larger portfolios, and annual plans save 20%. Request a free analysis and we'll give you an exact quote.",
  },
  {
    question: "Can I try before I commit?",
    answer:
      "Yes. We offer a free revenue analysis where we look at your properties and show you exactly where you're leaving money on the table — with no obligation. If you like what you see, we'll get started right away.",
  },
  {
    question: "What kind of support do I get?",
    answer:
      "This isn't a helpdesk. You get direct access to the person managing your revenue — by phone, text, or email. Growth and Portfolio clients get regular strategy calls and proactive recommendations.",
  },
];

export const PROPERTY_TYPE_OPTIONS = [
  { value: "vacation-rental", label: "Vacation Rental" },
  { value: "airbnb", label: "Airbnb" },
  { value: "hotel", label: "Hotel" },
  { value: "boutique-hotel", label: "Boutique Hotel" },
  { value: "resort", label: "Resort" },
  { value: "serviced-apartment", label: "Serviced Apartment" },
  { value: "corporate-housing", label: "Corporate Housing" },
  { value: "property-management", label: "Property Management Company" },
  { value: "other", label: "Other" },
];

export const PROPERTY_COUNT_OPTIONS = [
  { value: "1-5", label: "1-5 properties" },
  { value: "6-20", label: "6-20 properties" },
  { value: "21-50", label: "21-50 properties" },
  { value: "51-100", label: "51-100 properties" },
  { value: "100+", label: "100+ properties" },
];

export const REVENUE_OPTIONS = [
  { value: "under-5k", label: "Under $5,000/mo" },
  { value: "5k-15k", label: "$5,000 - $15,000/mo" },
  { value: "15k-50k", label: "$15,000 - $50,000/mo" },
  { value: "50k-100k", label: "$50,000 - $100,000/mo" },
  { value: "100k+", label: "$100,000+/mo" },
];
