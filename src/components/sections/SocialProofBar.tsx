"use client";

import FadeInView from "@/components/animations/FadeInView";
import { SOCIAL_PROOF_LOGOS } from "@/lib/constants";

export default function SocialProofBar() {
  return (
    <section className="relative py-16 border-y border-white/[0.04]">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInView>
          <p className="text-center text-sm text-slate-500 uppercase tracking-widest mb-8">
            Trusted by leading property management companies
          </p>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {SOCIAL_PROOF_LOGOS.map((name) => (
              <div
                key={name}
                className="text-slate-600 hover:text-slate-400 text-lg font-semibold tracking-wide transition-colors"
              >
                {name}
              </div>
            ))}
          </div>
        </FadeInView>

        <FadeInView delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-10">
            {[
              { value: "12,000+", label: "Properties Managed" },
              { value: "$2.4B", label: "Revenue Optimized" },
              { value: "98%", label: "Client Retention" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06]"
              >
                <span className="text-white font-bold text-sm">{item.value}</span>
                <span className="text-slate-500 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
