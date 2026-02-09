"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerChildren, { staggerItem } from "@/components/animations/StaggerChildren";
import { STEPS } from "@/lib/constants";
import { LinkIcon, Search, Rocket } from "@/components/ui/IconSet";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  LinkIcon,
  Search,
  Rocket,
};

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="How It Works"
          title="Three Steps to Higher Revenue"
          subtitle="Getting started takes less than 5 minutes. Our platform handles the rest."
        />

        <StaggerChildren className="relative grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan" />

          {STEPS.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                className="relative text-center"
              >
                {/* Step number */}
                <div className="text-6xl md:text-7xl font-bold text-gradient opacity-20 mb-4">
                  {step.number}
                </div>

                {/* Icon circle */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-white/[0.1] flex items-center justify-center mx-auto mb-6 relative z-10 bg-brand-dark">
                  {Icon && <Icon className="text-brand-blue" size={28} />}
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
