"use client";

import Script from "next/script";

const CALENDAR_ID = process.env.NEXT_PUBLIC_GHL_CALENDAR_ID || "PLACEHOLDER_CALENDAR_ID";

export default function CalendarEmbed() {
  if (CALENDAR_ID === "PLACEHOLDER_CALENDAR_ID") {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-slate-400 text-sm">
        <div className="text-center">
          <p className="mb-2 font-medium text-white">Calendar Coming Soon</p>
          <p>Booking calendar will be available shortly.</p>
          <p className="mt-4">
            In the meantime, email us at{" "}
            <a href="mailto:support@revenuflow.com" className="text-brand-blue hover:underline">
              support@revenuflow.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/booking/${CALENDAR_ID}`}
        style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "700px" }}
        scrolling="no"
        id={`${CALENDAR_ID}_revenuflow`}
        title="Book a Strategy Call with RevenuFlow"
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
