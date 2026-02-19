import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock twilio module
const mockCreate = vi.fn();
vi.mock("twilio", () => ({
  default: () => ({
    messages: { create: mockCreate },
  }),
}));

import { sendSms, sendContactConfirmationSms, sendLeadConfirmationSms, normalizePhone } from "@/lib/twilio";

describe("normalizePhone", () => {
  it("normalizes 10-digit number to E.164", () => {
    expect(normalizePhone("5551234567")).toBe("+15551234567");
  });

  it("normalizes 11-digit number starting with 1", () => {
    expect(normalizePhone("15551234567")).toBe("+15551234567");
  });

  it("handles already-formatted E.164", () => {
    expect(normalizePhone("+15551234567")).toBe("+15551234567");
  });

  it("strips non-digit characters", () => {
    expect(normalizePhone("(555) 123-4567")).toBe("+15551234567");
  });

  it("returns null for too-short numbers", () => {
    expect(normalizePhone("12345")).toBeNull();
  });
});

describe("sendSms", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.TWILIO_ACCOUNT_SID = "ACtest123";
    process.env.TWILIO_AUTH_TOKEN = "test-auth-token";
    process.env.TWILIO_PHONE_NUMBER = "+19998887777";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns null when TWILIO_ACCOUNT_SID is missing", async () => {
    delete process.env.TWILIO_ACCOUNT_SID;
    const result = await sendSms({ to: "5551234567", body: "test" });
    expect(result).toBeNull();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("returns null when TWILIO_AUTH_TOKEN is missing", async () => {
    delete process.env.TWILIO_AUTH_TOKEN;
    const result = await sendSms({ to: "5551234567", body: "test" });
    expect(result).toBeNull();
  });

  it("returns null when TWILIO_PHONE_NUMBER is missing", async () => {
    delete process.env.TWILIO_PHONE_NUMBER;
    const result = await sendSms({ to: "5551234567", body: "test" });
    expect(result).toBeNull();
  });

  it("returns null for invalid phone number", async () => {
    const result = await sendSms({ to: "123", body: "test" });
    expect(result).toBeNull();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("calls Twilio with correct params", async () => {
    mockCreate.mockResolvedValueOnce({ sid: "SM123", status: "queued" });

    await sendSms({ to: "5551234567", body: "Hello!" });

    expect(mockCreate).toHaveBeenCalledWith({
      to: "+15551234567",
      from: "+19998887777",
      body: "Hello!",
    });
  });

  it("returns sid and status on success", async () => {
    mockCreate.mockResolvedValueOnce({ sid: "SM456", status: "queued" });

    const result = await sendSms({ to: "5551234567", body: "test" });
    expect(result).toEqual({ sid: "SM456", status: "queued" });
  });

  it("returns null on Twilio API error", async () => {
    mockCreate.mockRejectedValueOnce(new Error("Twilio error"));

    const result = await sendSms({ to: "5551234567", body: "test" });
    expect(result).toBeNull();
  });
});

describe("sendContactConfirmationSms", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.TWILIO_ACCOUNT_SID = "ACtest123";
    process.env.TWILIO_AUTH_TOKEN = "test-auth-token";
    process.env.TWILIO_PHONE_NUMBER = "+19998887777";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("uses first name in message", async () => {
    mockCreate.mockResolvedValueOnce({ sid: "SM1", status: "queued" });

    await sendContactConfirmationSms({ phone: "5551234567", name: "Jane Doe" });

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ body: expect.stringContaining("Hi Jane!") })
    );
  });

  it("includes STOP opt-out text", async () => {
    mockCreate.mockResolvedValueOnce({ sid: "SM1", status: "queued" });

    await sendContactConfirmationSms({ phone: "5551234567", name: "Test" });

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ body: expect.stringContaining("Reply STOP to opt out") })
    );
  });
});

describe("sendLeadConfirmationSms", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.TWILIO_ACCOUNT_SID = "ACtest123";
    process.env.TWILIO_AUTH_TOKEN = "test-auth-token";
    process.env.TWILIO_PHONE_NUMBER = "+19998887777";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("uses first name in message", async () => {
    mockCreate.mockResolvedValueOnce({ sid: "SM1", status: "queued" });

    await sendLeadConfirmationSms({ phone: "5551234567", name: "John Smith" });

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ body: expect.stringContaining("Hi John!") })
    );
  });

  it("includes STOP opt-out text", async () => {
    mockCreate.mockResolvedValueOnce({ sid: "SM1", status: "queued" });

    await sendLeadConfirmationSms({ phone: "5551234567", name: "Test" });

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ body: expect.stringContaining("Reply STOP to opt out") })
    );
  });

  it("mentions revenue analysis", async () => {
    mockCreate.mockResolvedValueOnce({ sid: "SM1", status: "queued" });

    await sendLeadConfirmationSms({ phone: "5551234567", name: "Test" });

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ body: expect.stringContaining("revenue analysis") })
    );
  });
});
