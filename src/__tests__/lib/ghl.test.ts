import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createGHLContact } from "@/lib/ghl";

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("createGHLContact", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GHL_API_KEY = "test-api-key";
    process.env.GHL_LOCATION_ID = "test-location-id";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns null when GHL_API_KEY is not set", async () => {
    delete process.env.GHL_API_KEY;
    const result = await createGHLContact({ name: "Test", email: "test@test.com" });
    expect(result).toBeNull();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("returns null when GHL_LOCATION_ID is not set", async () => {
    delete process.env.GHL_LOCATION_ID;
    const result = await createGHLContact({ name: "Test", email: "test@test.com" });
    expect(result).toBeNull();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("splits name into firstName and lastName", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ contact: { id: "123" } }),
    });

    await createGHLContact({ name: "John Smith", email: "john@test.com" });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.firstName).toBe("John");
    expect(body.lastName).toBe("Smith");
  });

  it("handles single-word names (no lastName)", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ contact: { id: "123" } }),
    });

    await createGHLContact({ name: "Madonna", email: "madonna@test.com" });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.firstName).toBe("Madonna");
    expect(body.lastName).toBeUndefined();
  });

  it("handles multi-word last names", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ contact: { id: "123" } }),
    });

    await createGHLContact({ name: "Jean Claude Van Damme", email: "jcvd@test.com" });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.firstName).toBe("Jean");
    expect(body.lastName).toBe("Claude Van Damme");
  });

  it("sends correct payload to GHL API endpoint", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ contact: { id: "123" } }),
    });

    await createGHLContact({
      name: "John Smith",
      email: "john@test.com",
      phone: "555-1234",
      tags: ["test-tag"],
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://services.leadconnectorhq.com/contacts/",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer test-api-key",
          "Content-Type": "application/json",
        }),
      })
    );

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.email).toBe("john@test.com");
    expect(body.phone).toBe("555-1234");
    expect(body.locationId).toBe("test-location-id");
    expect(body.tags).toEqual(["test-tag"]);
  });

  it("strips undefined/null/empty values from payload", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ contact: { id: "123" } }),
    });

    await createGHLContact({
      name: "Test",
      email: "test@test.com",
      phone: "",   // empty string should be stripped
      company: "",  // empty string should be stripped
    });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.phone).toBeUndefined();
    expect(body.companyName).toBeUndefined();
  });

  it("returns null when API returns non-ok response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 422,
      text: () => Promise.resolve("Unprocessable Entity"),
    });

    const result = await createGHLContact({ name: "Test", email: "test@test.com" });
    expect(result).toBeNull();
  });

  it("returns result with contact on success", async () => {
    const mockResult = { contact: { id: "contact-123" } };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResult),
    });

    const result = await createGHLContact({ name: "Test", email: "test@test.com" });
    expect(result).toEqual(mockResult);
  });

  it("uses default tags when none provided", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ contact: { id: "123" } }),
    });

    await createGHLContact({ name: "Test", email: "test@test.com" });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.tags).toEqual(["revenuflow-website", "contact-form"]);
  });

  it("uses default source when none provided", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ contact: { id: "123" } }),
    });

    await createGHLContact({ name: "Test", email: "test@test.com" });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.source).toBe("RevenuFlow Website");
  });
});
