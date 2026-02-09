"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { Quote, Star } from "@/components/ui/IconSet";
import StaggerChildren, { staggerItem } from "@/components/animations/StaggerChildren";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Testimonials"
          title="What Our Clients Say"
          subtitle="Property managers trust RevenuFlow to drive real, measurable revenue growth."
        />

        <StaggerChildren className="grid md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div key={i} variants={staggerItem}>
              <Card hover className="h-full flex flex-col">
                {/* Quote icon */}
                <Quote className="text-brand-blue/30 mb-4" size={32} />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="text-amber-400" size={16} />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-slate-300 leading-relaxed mb-6 flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Result metric */}
                <div className="text-brand-emerald font-semibold text-sm mb-4 px-3 py-1.5 bg-brand-emerald/10 rounded-lg inline-block w-fit">
                  {testimonial.metric}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white text-sm font-semibold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">
                      {testimonial.author}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {testimonial.title}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
