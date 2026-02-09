export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  metric: string;
  initials: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Stat {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
}

export interface ProblemCard {
  icon: string;
  title: string;
  description: string;
}

// Auth & User types
export type UserRole = "wholesale" | "retail" | "admin" | "assistant";
export type UserStatus = "pending" | "approved" | "denied";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  property_type: string;
  property_count: string;
  revenue: string | null;
  location: string | null;
  created_at: string;
}
