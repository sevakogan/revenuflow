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
  { value: 2.4, prefix: "$", suffix: "B+", label: "Revenue Optimized" },
  { value: 12000, suffix: "+", label: "Properties Managed" },
  { value: 35, suffix: "%", label: "Avg. Revenue Increase" },
];

export const SOCIAL_PROOF_LOGOS: string[] = [
  "Airbnb",
  "VRBO",
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
      "Monitor competitor pricing, availability, and positioning across all major platforms. Stay ahead with real-time intelligence on your market.",
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
      "Sync pricing across Airbnb, VRBO, Guesty, Hospitable, and other PMS platforms automatically. One dashboard to manage every channel effortlessly.",
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
      "Give us access to your Airbnb, VRBO, Guesty, Hospitable, or other PMS. It takes minutes — and we handle everything from there.",
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
      "RevenuFlow transformed our pricing strategy completely. We went from manually adjusting rates every week to a fully automated system that outperforms our best guesses every time.",
    author: "Sarah Chen",
    title: "Director of Revenue",
    company: "Pacific Coast Rentals",
    metric: "+42% revenue in 3 months",
    initials: "SC",
  },
  {
    quote:
      "The demand forecasting alone is worth the investment. We now prepare for events and seasonal shifts weeks in advance, capturing revenue we used to miss entirely.",
    author: "Marcus Rodriguez",
    title: "Property Manager",
    company: "Mountain View Stays",
    metric: "+38% occupancy rate",
    initials: "MR",
  },
  {
    quote:
      "Managing 200+ properties used to mean a team of 3 dedicated to pricing. RevenuFlow handles it all and generates better results than we ever achieved manually.",
    author: "Emily Watson",
    title: "CEO",
    company: "Urban Nest Properties",
    metric: "$1.2M additional revenue",
    initials: "EW",
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "$29",
    period: "/property/mo",
    description: "Perfect for individual hosts getting started with smart pricing.",
    features: [
      "Up to 5 properties",
      "Dynamic pricing engine",
      "Basic market analytics",
      "Email support",
      "Airbnb & VRBO integration",
    ],
    highlighted: false,
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    price: "$49",
    period: "/property/mo",
    description: "For growing property managers who need a competitive edge.",
    features: [
      "Up to 50 properties",
      "Everything in Starter",
      "Competitor tracking",
      "Demand forecasting",
      "Multi-platform sync",
      "Priority support",
      "Revenue reports",
    ],
    highlighted: true,
    cta: "Get Free Analysis",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large portfolios requiring dedicated support and customization.",
    features: [
      "Unlimited properties",
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integrations",
      "API access",
      "SLA guarantee",
      "White-label options",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

export const FAQS: FAQ[] = [
  {
    question: "How does dynamic pricing work?",
    answer:
      "Our AI engine analyzes dozens of data points including local events, competitor pricing, historical booking data, seasonality, and real-time demand signals. It automatically adjusts your prices multiple times per day to capture the optimal rate for every night.",
  },
  {
    question: "Which platforms do you integrate with?",
    answer:
      "RevenuFlow works with all major platforms including Airbnb, VRBO, and direct booking websites. We also integrate with popular PMS systems like Guesty, Hospitable, Hostaway, and Lodgify.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Most clients see measurable revenue improvement within the first 30 days. Our AI needs about 2 weeks of data to fully calibrate to your specific market, after which pricing optimization is fully automated and continuously improving.",
  },
  {
    question: "Is there a minimum number of properties?",
    answer:
      "No minimum required. Our Starter plan works great for individual hosts with even a single property. The platform scales seamlessly as your portfolio grows from 1 to 1,000+ properties.",
  },
  {
    question: "Can I override the suggested prices?",
    answer:
      "Absolutely. You have full control at all times. Set minimum and maximum price boundaries, block specific dates, or manually override any price. The AI learns from your adjustments to better match your preferences over time.",
  },
  {
    question: "How is the subscription pricing calculated?",
    answer:
      "Pricing is per property per month. You only pay for active properties. Annual plans save 20% compared to monthly billing. Volume discounts are available for portfolios of 50+ properties on our Enterprise plan.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a 14-day free trial on all plans with no credit card required. You can also request a free revenue analysis to see exactly how much more your properties could earn before committing.",
  },
  {
    question: "What support do you provide?",
    answer:
      "Starter plans include email support with 24-hour response times. Professional plans get priority support with live chat. Enterprise clients receive a dedicated account manager, phone support, and custom onboarding.",
  },
];

export const PROPERTY_TYPE_OPTIONS = [
  { value: "vacation-rental", label: "Vacation Rental" },
  { value: "airbnb", label: "Airbnb" },
  { value: "boutique-hotel", label: "Boutique Hotel" },
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
