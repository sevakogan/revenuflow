"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import FadeInView from "@/components/animations/FadeInView";
import { FAQS } from "@/lib/constants";

export default function FAQSection() {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about RevenuFlow. Can't find what you're looking for? Contact our team."
        />

        <FadeInView>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <Accordion key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
