"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import MockupImage from "@/components/ui/MockupImage";
import GridPattern from "@/components/ui/GridPattern";
import GlowEffect from "@/components/ui/GlowEffect";
import { STATS } from "@/lib/constants";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <GridPattern />
      <GlowEffect color="blue" size="lg" className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/4" />
      <GlowEffect color="purple" size="md" className="top-1/3 right-0 translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                AI-powered tools, human expertise — $20M+ managed
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              Stop Undercharging{" "}
              <span className="text-gradient">Your Best Nights</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8 max-w-xl"
            >
              Events, holidays, demand spikes — if you&apos;re not adjusting in
              real-time, you&apos;re giving revenue away. Let AI handle your pricing
              so you can focus on hospitality.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-12">
              <Button
                size="lg"
                onClick={() =>
                  document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Get a Free Analysis
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() =>
                  document.getElementById("video")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-8 md:gap-12"
            >
              {STATS.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter
                      target={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="animate-float">
              <MockupImage />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
