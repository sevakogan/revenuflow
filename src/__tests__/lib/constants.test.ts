import { describe, it, expect } from "vitest";
import {
  NAV_LINKS,
  STATS,
  FEATURES,
  STEPS,
  TESTIMONIALS,
  PRICING_TIERS,
  FAQS,
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_COUNT_OPTIONS,
  REVENUE_OPTIONS,
  SOCIAL_PROOF_LOGOS,
  PROBLEM_CARDS,
} from "@/lib/constants";

describe("NAV_LINKS", () => {
  it("has 5 entries", () => {
    expect(NAV_LINKS).toHaveLength(5);
  });

  it("has correct labels", () => {
    const labels = NAV_LINKS.map((l) => l.label);
    expect(labels).toEqual(["Features", "How It Works", "Results", "Pricing", "FAQ"]);
  });

  it("all hrefs start with #", () => {
    NAV_LINKS.forEach((link) => {
      expect(link.href).toMatch(/^#/);
    });
  });
});

describe("STATS", () => {
  it("has 3 entries", () => {
    expect(STATS).toHaveLength(3);
  });

  it("all values are positive numbers", () => {
    STATS.forEach((stat) => {
      expect(stat.value).toBeGreaterThan(0);
    });
  });

  it("each stat has a label and suffix", () => {
    STATS.forEach((stat) => {
      expect(stat.label).toBeTruthy();
      expect(stat.suffix).toBeTruthy();
    });
  });
});

describe("FEATURES", () => {
  it("has 6 entries", () => {
    expect(FEATURES).toHaveLength(6);
  });

  it("each feature has icon, title, and description", () => {
    FEATURES.forEach((feature) => {
      expect(feature.icon).toBeTruthy();
      expect(feature.title).toBeTruthy();
      expect(feature.description).toBeTruthy();
    });
  });
});

describe("STEPS", () => {
  it("has 3 entries numbered 01, 02, 03", () => {
    expect(STEPS).toHaveLength(3);
    expect(STEPS.map((s) => s.number)).toEqual(["01", "02", "03"]);
  });

  it("each step has title, description, icon", () => {
    STEPS.forEach((step) => {
      expect(step.title).toBeTruthy();
      expect(step.description).toBeTruthy();
      expect(step.icon).toBeTruthy();
    });
  });
});

describe("TESTIMONIALS", () => {
  it("has 3 entries", () => {
    expect(TESTIMONIALS).toHaveLength(3);
  });

  it("each testimonial has required fields", () => {
    TESTIMONIALS.forEach((t) => {
      expect(t.quote).toBeTruthy();
      expect(t.author).toBeTruthy();
      expect(t.title).toBeTruthy();
      expect(t.company).toBeTruthy();
      expect(t.metric).toBeTruthy();
      expect(t.initials).toBeTruthy();
    });
  });
});

describe("PRICING_TIERS", () => {
  it("has 3 tiers", () => {
    expect(PRICING_TIERS).toHaveLength(3);
  });

  it("middle tier (Growth) is highlighted", () => {
    expect(PRICING_TIERS[1].highlighted).toBe(true);
    expect(PRICING_TIERS[0].highlighted).toBe(false);
    expect(PRICING_TIERS[2].highlighted).toBe(false);
  });

  it("each tier has name, price, features, cta", () => {
    PRICING_TIERS.forEach((tier) => {
      expect(tier.name).toBeTruthy();
      expect(tier.price).toBeTruthy();
      expect(tier.features.length).toBeGreaterThan(0);
      expect(tier.cta).toBeTruthy();
    });
  });
});

describe("FAQS", () => {
  it("has 8 entries", () => {
    expect(FAQS).toHaveLength(8);
  });

  it("each FAQ has question and answer", () => {
    FAQS.forEach((faq) => {
      expect(faq.question).toBeTruthy();
      expect(faq.answer).toBeTruthy();
    });
  });
});

describe("PROPERTY_TYPE_OPTIONS", () => {
  it("has 9 entries", () => {
    expect(PROPERTY_TYPE_OPTIONS).toHaveLength(9);
  });

  it("each option has value and label", () => {
    PROPERTY_TYPE_OPTIONS.forEach((opt) => {
      expect(opt.value).toBeTruthy();
      expect(opt.label).toBeTruthy();
    });
  });
});

describe("PROPERTY_COUNT_OPTIONS", () => {
  it("has 5 entries", () => {
    expect(PROPERTY_COUNT_OPTIONS).toHaveLength(5);
  });
});

describe("REVENUE_OPTIONS", () => {
  it("has 5 entries", () => {
    expect(REVENUE_OPTIONS).toHaveLength(5);
  });
});

describe("SOCIAL_PROOF_LOGOS", () => {
  it("includes Airbnb and VRBO", () => {
    expect(SOCIAL_PROOF_LOGOS).toContain("Airbnb");
    expect(SOCIAL_PROOF_LOGOS).toContain("VRBO");
  });
});

describe("PROBLEM_CARDS", () => {
  it("has 3 cards", () => {
    expect(PROBLEM_CARDS).toHaveLength(3);
  });

  it("each card has icon, title, description", () => {
    PROBLEM_CARDS.forEach((card) => {
      expect(card.icon).toBeTruthy();
      expect(card.title).toBeTruthy();
      expect(card.description).toBeTruthy();
    });
  });
});
