import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/lib/db-server";
import { createGHLContact } from "@/lib/ghl";
import { sendLeadEmails } from "@/lib/sendgrid";
import { sendLeadConfirmationSms } from "@/lib/twilio";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim() || undefined;
    const propertyType = (body.property_type || "").trim();
    const propertyCount = (body.property_count || "").trim();
    const revenue = (body.revenue || "").trim() || null;
    const location = (body.location || "").trim() || null;
    const smsConsent = body.smsConsent === true;

    if (!name || !email || !propertyType || !propertyCount) {
      return NextResponse.json(
        { success: false, message: "Name, email, property type, and property count are required" },
        { status: 400 }
      );
    }

    // Save to Supabase + push to all external services in parallel
    const [id] = await Promise.all([
      createLead({
        name,
        email,
        phone,
        property_type: propertyType,
        property_count: propertyCount,
        revenue,
        location,
        sms_consent: smsConsent,
      }),
      createGHLContact({
        name,
        email,
        phone,
        message: `Property: ${propertyType}, Count: ${propertyCount}${revenue ? `, Revenue: ${revenue}` : ""}${location ? `, Location: ${location}` : ""}`,
        tags: ["revenuflow-website", "cta-form"],
        source: "RevenuFlow Website",
      }),
      sendLeadEmails({
        name,
        email,
        phone,
        propertyType,
        propertyCount,
        revenue,
        location,
      }),
      ...(smsConsent && phone
        ? [sendLeadConfirmationSms({ phone, name })]
        : []),
    ]);

    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to submit" },
      { status: 500 }
    );
  }
}
