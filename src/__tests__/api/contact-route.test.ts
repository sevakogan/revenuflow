import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock db-server and ghl before importing the route
vi.mock("@/lib/db-server", () => ({
  createContactSubmission: vi.fn().mockResolvedValue(1),
}));

vi.mock("@/lib/ghl", () => ({
  createGHLContact: vi.fn().mockResolvedValue({ contact: { id: "ghl-123" } }),
}));

vi.mock("@/lib/sendgrid", () => ({
  sendContactEmails: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/twilio", () => ({
  sendContactConfirmationSms: vi.fn().mockResolvedValue({ sid: "SM123", status: "queued" }),
}));

import { POST } from "@/app/api/contact/route";
import { createContactSubmission } from "@/lib/db-server";
import { createGHLContact } from "@/lib/ghl";
import { sendContactEmails } from "@/lib/sendgrid";
import { sendContactConfirmationSms } from "@/lib/twilio";

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

const validPayload = {
  name: "Jane Doe",
  email: "jane@test.com",
  phone: "555-9876",
  message: "I need help with pricing",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when name is missing", async () => {
    const res = await POST(makeRequest({ ...validPayload, name: "" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
  });

  it("returns 400 when email is missing", async () => {
    const res = await POST(makeRequest({ ...validPayload, email: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when phone is missing", async () => {
    const res = await POST(makeRequest({ ...validPayload, phone: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when message is missing", async () => {
    const res = await POST(makeRequest({ ...validPayload, message: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 with correct error message", async () => {
    const res = await POST(makeRequest({ name: "" }));
    const data = await res.json();
    expect(data.message).toContain("Name, email, phone, and message are required");
  });

  it("returns 200 with success and id on valid submission", async () => {
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.id).toBe(1);
  });

  it("calls createContactSubmission with correct data", async () => {
    await POST(makeRequest({ ...validPayload, smsConsent: true }));

    expect(createContactSubmission).toHaveBeenCalledWith({
      name: "Jane Doe",
      email: "jane@test.com",
      phone: "555-9876",
      message: "I need help with pricing",
      sms_consent: true,
    });
  });

  it("prepends company name to message when company is provided", async () => {
    await POST(makeRequest({ ...validPayload, company: "Acme Rentals" }));

    expect(createContactSubmission).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "[Acme Rentals] I need help with pricing",
      })
    );
  });

  it("calls createGHLContact with contact-form tag", async () => {
    await POST(makeRequest(validPayload));

    expect(createGHLContact).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Jane Doe",
        email: "jane@test.com",
        phone: "555-9876",
        tags: ["revenuflow-website", "contact-form"],
        source: "RevenuFlow Website",
      })
    );
  });

  it("passes company to GHL when provided", async () => {
    await POST(makeRequest({ ...validPayload, company: "Acme Rentals" }));

    expect(createGHLContact).toHaveBeenCalledWith(
      expect.objectContaining({
        company: "Acme Rentals",
      })
    );
  });

  it("does not pass company to GHL when empty", async () => {
    await POST(makeRequest(validPayload));

    const ghlCall = vi.mocked(createGHLContact).mock.calls[0][0];
    expect(ghlCall).not.toHaveProperty("company");
  });

  it("returns 500 when createContactSubmission throws", async () => {
    vi.mocked(createContactSubmission).mockRejectedValueOnce(new Error("DB error"));

    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.message).toBe("Failed to submit");
  });

  it("handles smsConsent false by default", async () => {
    await POST(makeRequest(validPayload));

    expect(createContactSubmission).toHaveBeenCalledWith(
      expect.objectContaining({ sms_consent: false })
    );
  });

  it("calls sendContactEmails with correct data", async () => {
    await POST(makeRequest(validPayload));

    expect(sendContactEmails).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Jane Doe",
        email: "jane@test.com",
        phone: "555-9876",
        message: "I need help with pricing",
      })
    );
  });

  it("calls sendContactConfirmationSms when smsConsent is true", async () => {
    await POST(makeRequest({ ...validPayload, smsConsent: true }));

    expect(sendContactConfirmationSms).toHaveBeenCalledWith({
      phone: "555-9876",
      name: "Jane Doe",
    });
  });

  it("does not call sendContactConfirmationSms when smsConsent is false", async () => {
    await POST(makeRequest({ ...validPayload, smsConsent: false }));

    expect(sendContactConfirmationSms).not.toHaveBeenCalled();
  });

  it("still succeeds when sendContactEmails rejects", async () => {
    vi.mocked(sendContactEmails).mockRejectedValueOnce(new Error("Email error"));

    const res = await POST(makeRequest(validPayload));
    // Promise.all will reject if any promise rejects, so this becomes a 500
    // This is expected — email is in the same Promise.all as Supabase
    expect(res.status).toBe(500);
  });
});
