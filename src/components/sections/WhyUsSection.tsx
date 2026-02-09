"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import GlowEffect from "@/components/ui/GlowEffect";
import StaggerChildren, { staggerItem } from "@/components/animations/StaggerChildren";
import { Users, Zap, Shield } from "@/components/ui/IconSet";

const differentiators = [
  {
    icon: Zap,
    title: "Best-in-Class Pricing Tools",
    description:
      "We use PriceLabs and other leading pricing software — and recommend the right tool based on your property location and market. No one-size-fits-all here.",
  },
  {
    icon: Users,
    title: "Always a Human Eye",
    description:
      "Every pricing decision is backed by experienced revenue managers who review, adjust, and fine-tune. Technology is the tool — expertise is the edge.",
  },
  {
    icon: Shield,
    title: "$20M+ Portfolios Managed",
    description:
      "We've managed portfolios exceeding $20 million across diverse markets. That experience informs every strategy we build for your properties.",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="relative py-24 md:py-32 bg-white/[0.01]">
      <GlowEffect color="cyan" size="md" className="top-0 left-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          overline="Why RevenuFlow"
          title="Smart Tools. Smarter People."
          subtitle="Anyone can plug in a pricing algorithm. We combine the best automated tools with real revenue management experience — because your portfolio deserves both."
        />

        <StaggerChildren className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={i} variants={staggerItem}>
                <Card hover glow className="h-full text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20 flex items-center justify-center mx-auto mb-5">
                    <Icon className="text-brand-cyan" size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </StaggerChildren>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-10 text-center">
            <p className="text-xl md:text-2xl font-semibold text-white mb-4">
              &ldquo;We don&apos;t just set it and forget it.&rdquo;
            </p>
            <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Our team actively monitors your performance, spots opportunities the
              algorithms miss, and adjusts strategy based on years of hands-on
              experience across vacation rentals, urban short-term stays, and
              boutique hospitality.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
