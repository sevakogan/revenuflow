import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock db-server and ghl before importing the route
vi.mock("@/lib/db-server", () => ({
  createLead: vi.fn().mockResolvedValue(1),
}));

vi.mock("@/lib/ghl", () => ({
  createGHLContact: vi.fn().mockResolvedValue({ contact: { id: "ghl-123" } }),
}));

import { POST } from "@/app/api/lead/route";
import { createLead } from "@/lib/db-server";
import { createGHLContact } from "@/lib/ghl";

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost:3000/api/lead", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

const validPayload = {
  name: "John Smith",
  email: "john@test.com",
  property_type: "vacation-rental",
  property_count: "1-5",
};

describe("POST /api/lead", () => {
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

  it("returns 400 when property_type is missing", async () => {
    const res = await POST(makeRequest({ ...validPayload, property_type: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when property_count is missing", async () => {
    const res = await POST(makeRequest({ ...validPayload, property_count: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 with correct error message", async () => {
    const res = await POST(makeRequest({ name: "", email: "" }));
    const data = await res.json();
    expect(data.message).toContain("Name, email, property type, and property count are required");
  });

  it("returns 200 with success and id on valid submission", async () => {
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.id).toBe(1);
  });

  it("calls createLead with correctly mapped data", async () => {
    await POST(makeRequest({
      ...validPayload,
      phone: "555-1234",
      revenue: "5k-15k",
      location: "Miami, FL",
      smsConsent: true,
    }));

    expect(createLead).toHaveBeenCalledWith({
      name: "John Smith",
      email: "john@test.com",
      phone: "555-1234",
      property_type: "vacation-rental",
      property_count: "1-5",
      revenue: "5k-15k",
      location: "Miami, FL",
      sms_consent: true,
    });
  });

  it("calls createGHLContact with correct payload", async () => {
    await POST(makeRequest(validPayload));

    expect(createGHLContact).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "John Smith",
        email: "john@test.com",
        tags: ["revenuflow-website", "cta-form"],
        source: "RevenuFlow Website",
      })
    );
  });

  it("handles phone being empty string -> undefined", async () => {
    await POST(makeRequest({ ...validPayload, phone: "" }));

    expect(createLead).toHaveBeenCalledWith(
      expect.objectContaining({ phone: undefined })
    );
  });

  it("handles revenue being empty string -> null", async () => {
    await POST(makeRequest({ ...validPayload, revenue: "" }));

    expect(createLead).toHaveBeenCalledWith(
      expect.objectContaining({ revenue: null })
    );
  });

  it("handles location being empty string -> null", async () => {
    await POST(makeRequest({ ...validPayload, location: "" }));

    expect(createLead).toHaveBeenCalledWith(
      expect.objectContaining({ location: null })
    );
  });

  it("handles smsConsent: true", async () => {
    await POST(makeRequest({ ...validPayload, smsConsent: true }));

    expect(createLead).toHaveBeenCalledWith(
      expect.objectContaining({ sms_consent: true })
    );
  });

  it("handles smsConsent: false (default)", async () => {
    await POST(makeRequest(validPayload));

    expect(createLead).toHaveBeenCalledWith(
      expect.objectContaining({ sms_consent: false })
    );
  });

  it("returns 500 when createLead throws", async () => {
    vi.mocked(createLead).mockRejectedValueOnce(new Error("DB error"));

    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.message).toBe("Failed to submit");
  });

  it("trims whitespace from input fields", async () => {
    await POST(makeRequest({
      name: "  John Smith  ",
      email: "  john@test.com  ",
      property_type: "  vacation-rental  ",
      property_count: "  1-5  ",
    }));

    expect(createLead).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "John Smith",
        email: "john@test.com",
        property_type: "vacation-rental",
        property_count: "1-5",
      })
    );
  });
});
