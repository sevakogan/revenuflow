import { describe, it, expect } from "vitest";
import { cn, formatNumber } from "@/lib/utils";

describe("cn()", () => {
  it("merges class strings", () => {
    expect(cn("text-white", "bg-black")).toBe("text-white bg-black");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    expect(cn("base", isActive && "active")).toContain("active");
    expect(cn("base", !isActive && "hidden")).not.toContain("hidden");
  });

  it("deduplicates tailwind classes", () => {
    // twMerge keeps the last conflicting class
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });

  it("handles undefined and null inputs", () => {
    expect(cn("base", undefined, null, "extra")).toBe("base extra");
  });

  it("handles empty string input", () => {
    expect(cn("", "text-white")).toBe("text-white");
  });
});

describe("formatNumber()", () => {
  it('returns "1.0B" for 1_000_000_000', () => {
    expect(formatNumber(1_000_000_000)).toBe("1.0B");
  });

  it('returns "2.5B" for 2_500_000_000', () => {
    expect(formatNumber(2_500_000_000)).toBe("2.5B");
  });

  it('returns "1.0M" for 1_000_000', () => {
    expect(formatNumber(1_000_000)).toBe("1.0M");
  });

  it('returns "20.0M" for 20_000_000', () => {
    expect(formatNumber(20_000_000)).toBe("20.0M");
  });

  it('returns "1.0K" for 1_000', () => {
    expect(formatNumber(1_000)).toBe("1.0K");
  });

  it('returns "5.5K" for 5_500', () => {
    expect(formatNumber(5_500)).toBe("5.5K");
  });

  it("returns locale string for numbers under 1000", () => {
    expect(formatNumber(999)).toBe("999");
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(42)).toBe("42");
  });
});
