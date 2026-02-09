"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GlowEffect from "@/components/ui/GlowEffect";
import FadeInView from "@/components/animations/FadeInView";

const beforeStats = [
  { label: "Avg. Monthly Revenue", value: "$3,200", color: "text-slate-400" },
  { label: "Occupancy Rate", value: "62%", color: "text-slate-400" },
  { label: "Hours on Pricing/Week", value: "5+ hrs", color: "text-slate-400" },
  { label: "Revenue Missed", value: "~$1,600/mo", color: "text-red-400" },
];

const afterStats = [
  { label: "Avg. Monthly Revenue", value: "$4,800", color: "text-brand-emerald" },
  { label: "Occupancy Rate", value: "89%", color: "text-brand-emerald" },
  { label: "Hours on Pricing/Week", value: "0 hrs", color: "text-brand-emerald" },
  { label: "Revenue Gained", value: "+$1,600/mo", color: "text-brand-emerald" },
];

const counterStats = [
  { target: 35, suffix: "%", label: "Avg. Revenue Increase" },
  { target: 89, suffix: "%", label: "Avg. Occupancy Rate" },
  { target: 2.4, prefix: "$", suffix: "B+", label: "Revenue Optimized" },
  { target: 12000, suffix: "+", label: "Properties Managed" },
];

export default function ResultsSection() {
  return (
    <section id="results" className="relative py-24 md:py-32 overflow-hidden">
      <GlowEffect color="blue" size="lg" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          overline="Results"
          title="Real Revenue Impact"
          subtitle="See the measurable difference RevenuFlow makes for property managers across the country."
        />

        {/* Before / After */}
        <FadeInView>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-20">
            {/* Before */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">
                Before RevenuFlow
              </div>
              <div className="space-y-4">
                {beforeStats.map((stat, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-slate-400 text-sm">{stat.label}</span>
                    <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="bg-white/[0.03] border border-brand-blue/20 rounded-2xl p-6 md:p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-2xl" />
              <div className="relative">
                <div className="text-sm font-semibold text-brand-blue uppercase tracking-widest mb-6">
                  After RevenuFlow
                </div>
                <div className="space-y-4">
                  {afterStats.map((stat, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-slate-300 text-sm">{stat.label}</span>
                      <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInView>

        {/* Counter stats */}
        <FadeInView>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {counterStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
