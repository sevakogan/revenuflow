import type { Metadata } from "next";
import CalendarEmbed from "./calendar-embed";

export const metadata: Metadata = {
  title: "Book a Free Strategy Call | RevenuFlow Revenue Management",
  description:
    "Book a free strategy call with RevenuFlow. We'll analyze your Airbnb, VRBO, Booking.com, hotel, or vacation rental portfolio and build a custom revenue optimization plan across all OTA channels.",
  openGraph: {
    title: "Book a Free Strategy Call | RevenuFlow",
    description:
      "Get a free revenue analysis for your Airbnb, VRBO, Booking.com, or hotel portfolio. We specialize in dynamic pricing and revenue management across all vacation rental platforms.",
    url: "https://revenuflow.vercel.app/book",
  },
  alternates: {
    canonical: "https://revenuflow.vercel.app/book",
  },
};

export default function BookPage() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <main className="max-w-3xl mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full border border-brand-blue/20 bg-brand-blue/5 text-brand-blue text-xs font-semibold tracking-wide uppercase mb-4">
            Free Strategy Session
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Book Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
              Strategy Call
            </span>
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
            In 30 minutes, we&apos;ll analyze your portfolio and map out a custom revenue optimization plan.
            No obligations — just actionable insights.
          </p>
        </div>

        {/* What to expect */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47-2.47M5 14.5l2.47-2.47" />
                </svg>
              ),
              title: "Audit Your Current Pricing",
              desc: "We review your rates, occupancy, and market position",
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                </svg>
              ),
              title: "Custom Revenue Strategy",
              desc: "A plan built around your portfolio's goals",
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              ),
              title: "ROI Projections",
              desc: "See exactly how much more your properties could earn",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue mb-3">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
              <p className="text-slate-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* GHL Calendar Embed */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
          <CalendarEmbed />
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          Or email us directly:{" "}
          <a href="mailto:support@revenuflow.com" className="text-slate-400 hover:text-white transition-colors">
            support@revenuflow.com
          </a>
        </p>
      </main>
    </div>
  );
}
