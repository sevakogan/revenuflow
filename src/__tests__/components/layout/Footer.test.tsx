import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

// Mock Logo
vi.mock("@/components/ui/Logo", () => ({
  default: ({ className }: { className?: string }) => <div data-testid="logo" className={className}>RevenuFlow</div>,
}));

describe("Footer", () => {
  it("renders Logo", () => {
    render(<Footer />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("renders phone number link", () => {
    render(<Footer />);
    const phoneLink = screen.getByText("(866) 996-6382");
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink.closest("a")).toHaveAttribute("href", "tel:+18669966382");
  });

  it("renders email link", () => {
    render(<Footer />);
    const emailLink = screen.getByText("support@revenuflow.com");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest("a")).toHaveAttribute("href", "mailto:support@revenuflow.com");
  });

  it("renders Product links", () => {
    render(<Footer />);
    // Product section
    expect(screen.getByText("Product")).toBeInTheDocument();
    const featuresLink = screen.getByRole("link", { name: "Features" });
    expect(featuresLink).toHaveAttribute("href", "/#features");
    const pricingLink = screen.getByRole("link", { name: "Pricing" });
    expect(pricingLink).toHaveAttribute("href", "/#pricing");
  });

  it("renders Company links", () => {
    render(<Footer />);
    expect(screen.getByText("Company")).toBeInTheDocument();
    const contactLink = screen.getByRole("link", { name: "Contact" });
    expect(contactLink).toHaveAttribute("href", "/contact");
    const bookLink = screen.getByRole("link", { name: "Book a Call" });
    expect(bookLink).toHaveAttribute("href", "/book");
  });

  it("renders Legal links", () => {
    render(<Footer />);
    expect(screen.getByText("Legal")).toBeInTheDocument();
    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink).toHaveAttribute("href", "/privacy");
    const termsLink = screen.getByRole("link", { name: "Terms of Service" });
    expect(termsLink).toHaveAttribute("href", "/terms");
  });

  it("renders social media links", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
  });

  it("renders copyright notice with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    expect(screen.getByText(/TheLevelTeam LLC/)).toBeInTheDocument();
  });

  it("renders bottom bar Privacy and Terms links", () => {
    render(<Footer />);
    // Bottom bar has shorter versions
    const bottomLinks = screen.getAllByRole("link");
    const privacyBottomLink = bottomLinks.find(l => l.textContent === "Privacy" && l.getAttribute("href") === "/privacy");
    const termsBottomLink = bottomLinks.find(l => l.textContent === "Terms" && l.getAttribute("href") === "/terms");
    expect(privacyBottomLink).toBeDefined();
    expect(termsBottomLink).toBeDefined();
  });
});
