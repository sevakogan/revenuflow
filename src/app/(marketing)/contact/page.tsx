import type { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us | RevenuFlow Revenue Management",
  description:
    "Get in touch with RevenuFlow. Tell us about your short-term rental portfolio and we'll show you how our revenue management services can maximize your earnings.",
  openGraph: {
    title: "Contact Us | RevenuFlow",
    description:
      "Learn how RevenuFlow's revenue management services can maximize your Airbnb and vacation rental earnings. Get a free portfolio analysis.",
    url: "https://revenuflow.vercel.app/contact",
  },
  alternates: {
    canonical: "https://revenuflow.vercel.app/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Get In Touch</h1>
          <p className="text-sm text-slate-400">
            Tell us about your rental portfolio and we&apos;ll show you how RevenuFlow can maximize your revenue.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
