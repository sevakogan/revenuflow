import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock @sendgrid/mail
vi.mock("@sendgrid/mail", () => ({
  default: {
    setApiKey: vi.fn(),
    send: vi.fn(),
  },
}));

// Mock email templates
vi.mock("@/lib/email-templates", () => ({
  contactConfirmationEmail: vi.fn().mockReturnValue("<html>contact-confirm</html>"),
  contactNotificationEmail: vi.fn().mockReturnValue("<html>contact-notify</html>"),
  leadConfirmationEmail: vi.fn().mockReturnValue("<html>lead-confirm</html>"),
  leadNotificationEmail: vi.fn().mockReturnValue("<html>lead-notify</html>"),
}));

import sgMail from "@sendgrid/mail";
import { sendEmail, sendContactEmails, sendLeadEmails } from "@/lib/sendgrid";

const mockSend = vi.mocked(sgMail.send);

describe("sendEmail", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SENDGRID_API_KEY = "SG.test-key";
    process.env.SENDGRID_FROM_EMAIL = "hello@revenuflow.com";
    process.env.SENDGRID_FROM_NAME = "RevenuFlow";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns null when SENDGRID_API_KEY is missing", async () => {
    delete process.env.SENDGRID_API_KEY;
    const result = await sendEmail({ to: "test@test.com", subject: "Hi", html: "<p>Hi</p>" });
    expect(result).toBeNull();
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns null when SENDGRID_FROM_EMAIL is missing", async () => {
    delete process.env.SENDGRID_FROM_EMAIL;
    const result = await sendEmail({ to: "test@test.com", subject: "Hi", html: "<p>Hi</p>" });
    expect(result).toBeNull();
  });

  it("calls sgMail.send with correct params", async () => {
    mockSend.mockResolvedValueOnce([{ statusCode: 202 }]);

    await sendEmail({ to: "user@test.com", subject: "Test", html: "<p>Hello</p>" });

    expect(mockSend).toHaveBeenCalledWith({
      to: "user@test.com",
      from: { email: "hello@revenuflow.com", name: "RevenuFlow" },
      subject: "Test",
      html: "<p>Hello</p>",
    });
  });

  it("returns statusCode on success", async () => {
    mockSend.mockResolvedValueOnce([{ statusCode: 202 }]);

    const result = await sendEmail({ to: "test@test.com", subject: "Hi", html: "<p>Hi</p>" });
    expect(result).toEqual({ statusCode: 202 });
  });

  it("returns null on SendGrid API error", async () => {
    mockSend.mockRejectedValueOnce(new Error("SendGrid error"));

    const result = await sendEmail({ to: "test@test.com", subject: "Hi", html: "<p>Hi</p>" });
    expect(result).toBeNull();
  });

  it("uses default fromName when SENDGRID_FROM_NAME is missing", async () => {
    delete process.env.SENDGRID_FROM_NAME;
    mockSend.mockResolvedValueOnce([{ statusCode: 202 }]);

    await sendEmail({ to: "test@test.com", subject: "Hi", html: "<p>Hi</p>" });

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.objectContaining({ name: "RevenuFlow" }),
      })
    );
  });
});

describe("sendContactEmails", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SENDGRID_API_KEY = "SG.test-key";
    process.env.SENDGRID_FROM_EMAIL = "hello@revenuflow.com";
    process.env.TEAM_NOTIFICATION_EMAIL = "team@revenuflow.com";
    mockSend.mockResolvedValue([{ statusCode: 202 }]);
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  const contactData = {
    name: "Jane Doe",
    email: "jane@test.com",
    phone: "555-1234",
    message: "Need help",
  };

  it("sends user confirmation email", async () => {
    await sendContactEmails(contactData);

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "jane@test.com",
        subject: expect.stringContaining("received your message"),
      })
    );
  });

  it("sends team notification when TEAM_NOTIFICATION_EMAIL is set", async () => {
    // Verify env is set before calling
    expect(process.env.TEAM_NOTIFICATION_EMAIL).toBe("team@revenuflow.com");
    expect(process.env.SENDGRID_API_KEY).toBe("SG.test-key");

    await sendContactEmails(contactData);

    // Check all calls made to mockSend
    const callCount = mockSend.mock.calls.length;
    expect(callCount).toBe(2);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ to: "team@revenuflow.com" })
    );
  });

  it("skips team notification when TEAM_NOTIFICATION_EMAIL is missing", async () => {
    delete process.env.TEAM_NOTIFICATION_EMAIL;

    await sendContactEmails(contactData);

    // Should only be called once: user
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ to: "jane@test.com" })
    );
  });

  it("HTML-escapes user input", async () => {
    const { contactConfirmationEmail } = await import("@/lib/email-templates");

    await sendContactEmails({
      ...contactData,
      name: '<script>alert("xss")</script>',
    });

    expect(contactConfirmationEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        name: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
      })
    );
  });
});

describe("sendLeadEmails", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SENDGRID_API_KEY = "SG.test-key";
    process.env.SENDGRID_FROM_EMAIL = "hello@revenuflow.com";
    process.env.TEAM_NOTIFICATION_EMAIL = "team@revenuflow.com";
    mockSend.mockResolvedValue([{ statusCode: 202 }]);
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  const leadData = {
    name: "John Smith",
    email: "john@test.com",
    propertyType: "Vacation Rental",
    propertyCount: "5-10",
  };

  it("sends user confirmation email", async () => {
    await sendLeadEmails(leadData);

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "john@test.com",
        subject: expect.stringContaining("Revenue Analysis"),
      })
    );
  });

  it("sends team notification when TEAM_NOTIFICATION_EMAIL is set", async () => {
    await sendLeadEmails(leadData);

    expect(mockSend).toHaveBeenCalledTimes(2);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ to: "team@revenuflow.com" })
    );
  });

  it("skips team notification when TEAM_NOTIFICATION_EMAIL is missing", async () => {
    delete process.env.TEAM_NOTIFICATION_EMAIL;

    await sendLeadEmails(leadData);

    expect(mockSend).toHaveBeenCalledTimes(1);
  });
});
