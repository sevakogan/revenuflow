import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/(marketing)/contact/page";

// Mock ContactForm since it's a client component
vi.mock("@/app/(marketing)/contact/contact-form", () => ({
  default: () => <div data-testid="contact-form">ContactForm</div>,
}));

describe("ContactPage", () => {
  it('renders "Get In Touch" heading', () => {
    render(<ContactPage />);
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
  });

  it("renders ContactForm component", () => {
    render(<ContactPage />);
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });

  it("renders subtitle text", () => {
    render(<ContactPage />);
    expect(screen.getByText(/Tell us about your rental portfolio/)).toBeInTheDocument();
  });
});
