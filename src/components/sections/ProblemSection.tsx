"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import StaggerChildren, { staggerItem } from "@/components/animations/StaggerChildren";
import { PROBLEM_CARDS } from "@/lib/constants";
import { ChartDown, Clock, DollarSign } from "@/components/ui/IconSet";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  ChartDown,
  Clock,
  DollarSign,
};

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="The Problem"
          title="Stop Leaving Revenue on the Table"
          subtitle="Most short-term rental operators lose 20-40% of potential revenue due to manual pricing strategies that can't keep up with market dynamics."
        />

        <StaggerChildren className="grid md:grid-cols-3 gap-6 md:gap-8">
          {PROBLEM_CARDS.map((card, i) => {
            const Icon = iconMap[card.icon];
            return (
              <motion.div key={i} variants={staggerItem}>
                <Card hover className="h-full border-red-500/10 hover:border-red-500/20">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-5">
                    {Icon && <Icon className="text-red-400" size={24} />}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{card.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{card.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
