"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import MockupImage from "@/components/ui/MockupImage";
import GlowEffect from "@/components/ui/GlowEffect";
import { Check } from "@/components/ui/IconSet";
import FadeInView from "@/components/animations/FadeInView";
import StaggerChildren, { staggerItem } from "@/components/animations/StaggerChildren";

const solutionPoints = [
  "AI-powered dynamic pricing that adjusts in real-time across all OTA channels",
  "Competitor monitoring across Airbnb, VRBO, Booking.com, Expedia, and more",
  "Demand forecasting weeks in advance using ML models",
  "Automated multi-channel pricing sync for vacation rentals and hotels",
  "ADR and RevPAR tracking with actionable revenue insights",
];

export default function SolutionSection() {
  return (
    <section id="solution" className="relative py-24 md:py-32 overflow-hidden">
      <GlowEffect color="blue" size="lg" className="top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Mockup */}
          <FadeInView direction="left" className="hidden lg:block">
            <MockupImage />
          </FadeInView>

          {/* Right - Content */}
          <div>
            <SectionHeading
              overline="The Solution"
              title="Intelligent Revenue Management, Automated"
              subtitle="RevenuFlow combines machine learning with real-time market data to optimize every pricing decision for every property, every night."
              align="left"
            />

            <StaggerChildren className="space-y-4">
              {solutionPoints.map((point, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-brand-blue" size={14} />
                  </div>
                  <p className="text-slate-300">{point}</p>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </section>
  );
}
