"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax offsets for each step card
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // Subtle parallax for background glow
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const parallaxValues = [y1, y2, y3];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 md:py-32 bg-white/[0.01] overflow-hidden"
    >
      {/* Parallax background glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          overline="How It Works"
          title="Three Steps to Higher Revenue"
          subtitle="Getting started takes less than 5 minutes. Our platform handles the rest."
        />

        <StaggerChildren className="grid md:grid-cols-3 gap-8 md:gap-12">
          {STEPS.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={i}
                variants={staggerItem}
                style={{ y: parallaxValues[i] }}
                className="relative text-center"
              >
                {/* Step number */}
                <div className="text-6xl md:text-7xl font-bold text-gradient opacity-20 mb-4">
                  {step.number}
                </div>

                {/* Icon circle with connecting line */}
                <div className="relative flex items-center justify-center mb-6">
                  {/* Line going right from icon center */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-brand-blue to-brand-purple" style={{ width: "calc(100% + 3rem)", marginLeft: "2rem" }} />
                  )}
                  {/* Line coming in from the left */}
                  {i > 0 && (
                    <div className="hidden md:block absolute right-1/2 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-brand-purple to-brand-cyan" style={{ width: "calc(100% + 3rem)", marginRight: "2rem" }} />
                  )}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-white/[0.1] flex items-center justify-center relative z-10 bg-brand-dark">
                    {Icon && <Icon className="text-brand-blue" size={28} />}
                  </div>
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
