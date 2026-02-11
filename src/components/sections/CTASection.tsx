"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import GlowEffect from "@/components/ui/GlowEffect";
import { Check, Shield } from "@/components/ui/IconSet";
import {
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_COUNT_OPTIONS,
  REVENUE_OPTIONS,
} from "@/lib/constants";

interface FormData {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  propertyCount: string;
  revenue: string;
  location: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CTASection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    propertyCount: "",
    revenue: "",
    location: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [smsConsent, setSmsConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.propertyType) newErrors.propertyType = "Please select a property type";
    if (!formData.propertyCount) newErrors.propertyCount = "Please select property count";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          property_type: formData.propertyType,
          property_count: formData.propertyCount,
          revenue: formData.revenue || null,
          location: formData.location || null,
          smsConsent,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Failed to submit lead:", err);
      setErrors({ email: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section id="cta" className="relative py-24 md:py-32 overflow-hidden">
      <GlowEffect color="blue" size="lg" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <GlowEffect color="purple" size="md" className="top-0 right-0" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          overline="Get Started"
          title="Get Your Free Revenue Analysis"
          subtitle="Submit your property details and our team will prepare a custom revenue analysis showing exactly how much more your properties could earn."
        />

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 rounded-full bg-brand-emerald/20 flex items-center justify-center mx-auto mb-6">
                <Check className="text-brand-emerald" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Thank You!
              </h3>
              <p className="text-slate-400 max-w-md mx-auto">
                We&apos;ve received your information and will prepare your custom
                revenue analysis. Expect to hear from us within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 md:p-10"
            >
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <Input
                  label="Full Name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  error={errors.name}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={errors.email}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <Select
                  label="Property Type"
                  options={PROPERTY_TYPE_OPTIONS}
                  placeholder="Select property type"
                  value={formData.propertyType}
                  onChange={(e) => handleChange("propertyType", e.target.value)}
                  error={errors.propertyType}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <Select
                  label="Number of Properties"
                  options={PROPERTY_COUNT_OPTIONS}
                  placeholder="Select range"
                  value={formData.propertyCount}
                  onChange={(e) => handleChange("propertyCount", e.target.value)}
                  error={errors.propertyCount}
                  required
                />
                <Select
                  label="Current Monthly Revenue"
                  options={REVENUE_OPTIONS}
                  placeholder="Select range"
                  value={formData.revenue}
                  onChange={(e) => handleChange("revenue", e.target.value)}
                />
              </div>

              <div className="mb-5">
                <Input
                  label="Market / Location"
                  placeholder="e.g., Miami, FL"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>

              {/* SMS Consent */}
              <div className="flex items-start gap-3 mb-8">
                <input
                  id="cta-sms-consent"
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/[0.05] text-brand-blue focus:ring-brand-blue/50 accent-brand-blue cursor-pointer shrink-0"
                />
                <label htmlFor="cta-sms-consent" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                  I agree to receive SMS messages from TheLevelTeam LLC (DBA RevenuFlow), including
                  appointment confirmations, reminders, and follow-ups. Message frequency varies
                  (approx. 2-5 msgs/month). Message &amp; data rates may apply. Reply STOP to opt out.
                  Consent is not a condition of purchase. View our{" "}
                  <a href="/terms" className="text-brand-blue hover:underline">Terms</a> &amp;{" "}
                  <a href="/privacy" className="text-brand-blue hover:underline">Privacy Policy</a>.
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Get My Free Analysis"
                )}
              </Button>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Shield className="text-slate-600" size={16} />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-slate-600" size={16} />
                  Results in 24 hours
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-slate-600" size={16} />
                  100% free
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
