"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Check } from "@/components/ui/IconSet";
import StaggerChildren, { staggerItem } from "@/components/animations/StaggerChildren";
import { PRICING_TIERS, PRICING_ADDON } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Pricing"
          title="Simple, Transparent Pricing"
          subtitle="Start free, scale as you grow. No hidden fees, cancel anytime."
        />

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={cn("text-sm", !isAnnual ? "text-white" : "text-slate-500")}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={cn(
              "relative w-14 h-7 rounded-full transition-colors",
              isAnnual ? "bg-brand-blue" : "bg-white/[0.1]"
            )}
          >
            <motion.div
              animate={{ x: isAnnual ? 28 : 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-5 h-5 rounded-full bg-white absolute top-1"
            />
          </button>
          <span className={cn("text-sm", isAnnual ? "text-white" : "text-slate-500")}>
            Annual{" "}
            <span className="text-brand-emerald text-xs font-medium">Save 20%</span>
          </span>
        </div>

        <StaggerChildren className="grid md:grid-cols-3 gap-6 md:gap-8 items-start">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div key={i} variants={staggerItem}>
              <div
                className={cn(
                  "rounded-2xl p-6 md:p-8 border transition-all",
                  tier.highlighted
                    ? "bg-white/[0.05] border-brand-blue/30 shadow-glow-sm relative"
                    : "bg-white/[0.02] border-white/[0.08]"
                )}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-brand-blue text-white text-xs font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{tier.name}</h3>
                  <p className="text-slate-400 text-sm">{tier.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    {tier.price.startsWith("$")
                      ? isAnnual
                        ? `$${Math.round(parseInt(tier.price.replace("$", "")) * 0.8)}`
                        : tier.price
                      : tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-slate-500 text-sm">{tier.period}</span>
                  )}
                  {isAnnual && tier.price.startsWith("$") && (
                    <div className="mt-1">
                      <span className="text-brand-emerald text-xs font-medium">
                        Save 20% with annual billing
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  variant={tier.highlighted ? "primary" : "secondary"}
                  className="w-full mb-8"
                  onClick={() =>
                    document
                      .getElementById("cta")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {tier.cta}
                </Button>

                <ul className="space-y-3">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <Check className="text-brand-blue flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* Social Media Add-on */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" as const }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="rounded-2xl p-6 md:p-8 border border-brand-purple/20 bg-white/[0.02] text-center">
            <div className="inline-block px-3 py-1 bg-brand-purple/10 border border-brand-purple/20 rounded-full text-brand-purple text-xs font-semibold uppercase tracking-wider mb-4">
              Add-on
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {PRICING_ADDON.name}
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              {PRICING_ADDON.description}
            </p>
            <div>
              <span className="text-slate-400 text-sm">Starting at </span>
              <span className="text-3xl font-bold text-white">
                {isAnnual
                  ? `$${Math.round(parseInt(PRICING_ADDON.price.replace("$", "")) * 0.8)}`
                  : PRICING_ADDON.price}
              </span>
              <span className="text-slate-500 text-sm">{PRICING_ADDON.period}</span>
              {isAnnual && (
                <div className="mt-1">
                  <span className="text-brand-emerald text-xs font-medium">
                    Save 20% with annual billing
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
