import { describe, it, expect } from "vitest";
import {
  contactConfirmationEmail,
  leadConfirmationEmail,
  contactNotificationEmail,
  leadNotificationEmail,
} from "@/lib/email-templates";

describe("contactConfirmationEmail", () => {
  const data = { name: "Jane Doe", email: "jane@test.com", phone: "555-1234", message: "Hello" };

  it("returns valid HTML with DOCTYPE", () => {
    const html = contactConfirmationEmail(data);
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("</html>");
  });

  it("includes first name in greeting", () => {
    const html = contactConfirmationEmail(data);
    expect(html).toContain("Jane!");
  });

  it("extracts first name from multi-word name", () => {
    const html = contactConfirmationEmail({ ...data, name: "Jean Claude Van Damme" });
    expect(html).toContain("Jean!");
  });

  it("includes RevenuFlow branding", () => {
    const html = contactConfirmationEmail(data);
    expect(html).toContain("RevenuFlow");
  });
});

describe("leadConfirmationEmail", () => {
  const data = { name: "John Smith", email: "john@test.com", propertyType: "Vacation Rental", propertyCount: "5-10" };

  it("returns valid HTML with DOCTYPE", () => {
    const html = leadConfirmationEmail(data);
    expect(html).toContain("<!DOCTYPE html>");
  });

  it("includes first name in greeting", () => {
    const html = leadConfirmationEmail(data);
    expect(html).toContain("John!");
  });

  it("includes property details", () => {
    const html = leadConfirmationEmail(data);
    expect(html).toContain("Vacation Rental");
    expect(html).toContain("5-10");
  });

  it("includes revenue when provided", () => {
    const html = leadConfirmationEmail({ ...data, revenue: "$5k-$15k" });
    expect(html).toContain("$5k-$15k");
  });

  it("includes location when provided", () => {
    const html = leadConfirmationEmail({ ...data, location: "Miami, FL" });
    expect(html).toContain("Miami, FL");
  });

  it("omits revenue when null", () => {
    const html = leadConfirmationEmail({ ...data, revenue: null });
    expect(html).not.toContain("Monthly Revenue:");
  });

  it("omits location when null", () => {
    const html = leadConfirmationEmail({ ...data, location: null });
    expect(html).not.toContain("Location:");
  });
});

describe("contactNotificationEmail", () => {
  const data = { name: "Jane Doe", email: "jane@test.com", phone: "555-1234", message: "Need help" };

  it("includes all form fields", () => {
    const html = contactNotificationEmail(data);
    expect(html).toContain("Jane Doe");
    expect(html).toContain("jane@test.com");
    expect(html).toContain("555-1234");
    expect(html).toContain("Need help");
  });

  it("includes company when provided", () => {
    const html = contactNotificationEmail({ ...data, company: "Acme Corp" });
    expect(html).toContain("Acme Corp");
  });

  it("omits company row when not provided", () => {
    const html = contactNotificationEmail(data);
    expect(html).not.toContain("Company");
  });
});

describe("leadNotificationEmail", () => {
  const data = { name: "John", email: "john@test.com", propertyType: "Hotel", propertyCount: "1" };

  it("includes all required fields", () => {
    const html = leadNotificationEmail(data);
    expect(html).toContain("John");
    expect(html).toContain("john@test.com");
    expect(html).toContain("Hotel");
    expect(html).toContain("1");
  });

  it("includes phone when provided", () => {
    const html = leadNotificationEmail({ ...data, phone: "555-9999" });
    expect(html).toContain("555-9999");
  });

  it("omits phone row when not provided", () => {
    const html = leadNotificationEmail(data);
    // Should not have a Phone table row
    const phoneRowCount = (html.match(/Phone/g) || []).length;
    expect(phoneRowCount).toBe(0);
  });

  it("includes revenue and location when provided", () => {
    const html = leadNotificationEmail({ ...data, revenue: "$10k", location: "NYC" });
    expect(html).toContain("$10k");
    expect(html).toContain("NYC");
  });
});
