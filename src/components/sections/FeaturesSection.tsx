"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import GlowEffect from "@/components/ui/GlowEffect";
import StaggerChildren, { staggerItem } from "@/components/animations/StaggerChildren";
import { FEATURES } from "@/lib/constants";
import {
  Zap,
  BarChart,
  Search,
  TrendingUp,
  Globe,
  Shield,
} from "@/components/ui/IconSet";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Zap,
  BarChart,
  Search,
  TrendingUp,
  Globe,
  Shield,
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <GlowEffect color="purple" size="lg" className="top-1/2 right-0 translate-x-1/3 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          overline="Features"
          title="Everything You Need to Maximize Revenue"
          subtitle="A complete revenue management platform built specifically for short-term rental operators. No fluff, just results."
        />

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div key={i} variants={staggerItem}>
                <Card hover glow className="h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 flex items-center justify-center mb-5">
                    {Icon && <Icon className="text-brand-blue" size={24} />}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
