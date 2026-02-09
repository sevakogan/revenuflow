"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { Play } from "@/components/ui/IconSet";
import GlowEffect from "@/components/ui/GlowEffect";
import FadeInView from "@/components/animations/FadeInView";
import Logo from "@/components/ui/Logo";

export default function VideoSection() {
  return (
    <section id="video" className="relative py-24 md:py-32 bg-white/[0.01]">
      <GlowEffect color="purple" size="md" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          overline="See It in Action"
          title="Watch How RevenuFlow Works"
          subtitle="A quick walkthrough of how our platform optimizes pricing and boosts revenue for short-term rental operators."
        />

        <FadeInView>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl group cursor-pointer">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-dark to-brand-navy" />

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04]">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="video-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#video-grid)" />
              </svg>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <Logo size="lg" />
              <p className="text-slate-400 text-sm">Product Demo</p>

              {/* Play button */}
              <div className="w-20 h-20 rounded-full bg-brand-blue/20 border-2 border-brand-blue/50 flex items-center justify-center group-hover:bg-brand-blue/30 group-hover:scale-110 transition-all duration-300 shadow-glow">
                <Play className="text-white ml-1" size={28} />
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
