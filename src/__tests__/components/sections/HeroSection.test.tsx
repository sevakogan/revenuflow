import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeroSection from "@/components/sections/HeroSection";

// Mock sub-components
vi.mock("@/components/ui/Badge", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="badge">{children}</div>,
}));

vi.mock("@/components/ui/AnimatedCounter", () => ({
  default: ({ target, prefix, suffix }: { target: number; prefix?: string; suffix: string }) => (
    <span>{prefix}{target}{suffix}</span>
  ),
}));

vi.mock("@/components/ui/MockupImage", () => ({
  default: () => <div data-testid="mockup-image" />,
}));

vi.mock("@/components/ui/GridPattern", () => ({
  default: () => null,
}));

vi.mock("@/components/ui/GlowEffect", () => ({
  default: () => null,
}));

describe("HeroSection", () => {
  it('renders the main heading containing "Stop Undercharging"', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Stop Undercharging/)).toBeInTheDocument();
  });

  it('renders the gradient text "Your Best Nights"', () => {
    render(<HeroSection />);
    expect(screen.getByText("Your Best Nights")).toBeInTheDocument();
  });

  it('renders the "Get a Free Analysis" button', () => {
    render(<HeroSection />);
    expect(screen.getByRole("button", { name: "Get a Free Analysis" })).toBeInTheDocument();
  });

  it('renders the "Watch Demo" button', () => {
    render(<HeroSection />);
    expect(screen.getByRole("button", { name: "Watch Demo" })).toBeInTheDocument();
  });

  it('"Get a Free Analysis" button calls scrollIntoView on #cta element', async () => {
    const user = userEvent.setup();
    const mockElement = { scrollIntoView: vi.fn() };
    vi.spyOn(document, "getElementById").mockReturnValue(mockElement as unknown as HTMLElement);

    render(<HeroSection />);
    await user.click(screen.getByRole("button", { name: "Get a Free Analysis" }));

    expect(document.getElementById).toHaveBeenCalledWith("cta");
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it('"Watch Demo" button calls scrollIntoView on #video element', async () => {
    const user = userEvent.setup();
    const mockElement = { scrollIntoView: vi.fn() };
    vi.spyOn(document, "getElementById").mockReturnValue(mockElement as unknown as HTMLElement);

    render(<HeroSection />);
    await user.click(screen.getByRole("button", { name: "Watch Demo" }));

    expect(document.getElementById).toHaveBeenCalledWith("video");
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("renders all 3 stats", () => {
    render(<HeroSection />);
    // Stats: $20M+, 30+, 96%
    expect(screen.getByText("Revenue Managed")).toBeInTheDocument();
    expect(screen.getByText("Properties")).toBeInTheDocument();
    expect(screen.getByText("Client Retention")).toBeInTheDocument();
  });

  it("renders the badge text", () => {
    render(<HeroSection />);
    expect(screen.getByText(/\$20M\+ managed/)).toBeInTheDocument();
  });

  it("renders the subtitle mentioning platforms", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Airbnb/)).toBeInTheDocument();
    expect(screen.getByText(/VRBO/)).toBeInTheDocument();
  });
});
