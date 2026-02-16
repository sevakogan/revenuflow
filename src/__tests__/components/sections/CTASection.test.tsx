import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CTASection from "@/components/sections/CTASection";

// Mock SectionHeading and GlowEffect to simplify rendering
vi.mock("@/components/ui/SectionHeading", () => ({
  default: ({ title }: { title: string }) => <div data-testid="section-heading">{title}</div>,
}));

vi.mock("@/components/ui/GlowEffect", () => ({
  default: () => null,
}));

vi.mock("@/components/ui/IconSet", () => ({
  Check: ({ size, ...props }: { size?: number }) => <span {...props}>check</span>,
  Shield: ({ size, ...props }: { size?: number }) => <span {...props}>shield</span>,
}));

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("CTASection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("rendering", () => {
    it("renders the section heading", () => {
      render(<CTASection />);
      expect(screen.getByText("Get Your Free Revenue Analysis")).toBeInTheDocument();
    });

    it("renders all form fields", () => {
      render(<CTASection />);
      expect(screen.getByPlaceholderText("John Smith")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("john@example.com")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("(555) 123-4567")).toBeInTheDocument();
      expect(screen.getByText("Property Type")).toBeInTheDocument();
      expect(screen.getByText("Number of Properties")).toBeInTheDocument();
      expect(screen.getByText("Current Monthly Revenue")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("e.g., Miami, FL")).toBeInTheDocument();
    });

    it("renders the SMS consent checkbox", () => {
      render(<CTASection />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("renders the submit button", () => {
      render(<CTASection />);
      expect(screen.getByRole("button", { name: "Get My Free Analysis" })).toBeInTheDocument();
    });

    it("renders trust signals", () => {
      render(<CTASection />);
      expect(screen.getByText("No credit card required")).toBeInTheDocument();
      expect(screen.getByText("Results in 24 hours")).toBeInTheDocument();
      expect(screen.getByText("100% free")).toBeInTheDocument();
    });
  });

  describe("validation", () => {
    // Use fireEvent.submit to bypass native HTML5 required validation in jsdom
    // so the component's custom validate() function runs

    it('shows "Name is required" error when submitting with empty name', () => {
      render(<CTASection />);
      const form = document.querySelector("form")!;
      fireEvent.submit(form);
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });

    it('shows "Email is required" error when submitting with empty email', async () => {
      const user = userEvent.setup();
      render(<CTASection />);
      // Fill name only
      await user.type(screen.getByPlaceholderText("John Smith"), "Test User");
      const form = document.querySelector("form")!;
      fireEvent.submit(form);
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });

    it("shows invalid email error for bad email format", async () => {
      const user = userEvent.setup();
      render(<CTASection />);
      await user.type(screen.getByPlaceholderText("John Smith"), "Test User");
      await user.type(screen.getByPlaceholderText("john@example.com"), "not-an-email");
      const form = document.querySelector("form")!;
      fireEvent.submit(form);
      expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
    });

    it("shows property type error when not selected", async () => {
      const user = userEvent.setup();
      render(<CTASection />);
      await user.type(screen.getByPlaceholderText("John Smith"), "Test User");
      await user.type(screen.getByPlaceholderText("john@example.com"), "test@test.com");
      const form = document.querySelector("form")!;
      fireEvent.submit(form);
      expect(screen.getByText("Please select a property type")).toBeInTheDocument();
    });

    it("shows property count error when not selected", async () => {
      const user = userEvent.setup();
      render(<CTASection />);
      await user.type(screen.getByPlaceholderText("John Smith"), "Test User");
      await user.type(screen.getByPlaceholderText("john@example.com"), "test@test.com");
      // Select property type
      await user.selectOptions(screen.getAllByRole("combobox")[0], "vacation-rental");
      const form = document.querySelector("form")!;
      fireEvent.submit(form);
      expect(screen.getByText("Please select property count")).toBeInTheDocument();
    });

    it("clears field error when user starts typing", async () => {
      const user = userEvent.setup();
      render(<CTASection />);
      // Trigger name error
      const form = document.querySelector("form")!;
      fireEvent.submit(form);
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      // Start typing in name field
      await user.type(screen.getByPlaceholderText("John Smith"), "J");
      expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
    });
  });

  describe("submission", () => {
    async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
      await user.type(screen.getByPlaceholderText("John Smith"), "Test User");
      await user.type(screen.getByPlaceholderText("john@example.com"), "test@test.com");
      await user.selectOptions(screen.getAllByRole("combobox")[0], "vacation-rental");
      await user.selectOptions(screen.getAllByRole("combobox")[1], "1-5");
    }

    it("calls fetch with POST /api/lead and correct payload on valid submit", async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true, id: 1 }),
      });

      render(<CTASection />);
      await fillValidForm(user);
      await user.click(screen.getByRole("button", { name: "Get My Free Analysis" }));

      expect(mockFetch).toHaveBeenCalledWith("/api/lead", expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }));

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.name).toBe("Test User");
      expect(body.email).toBe("test@test.com");
      expect(body.property_type).toBe("vacation-rental");
      expect(body.property_count).toBe("1-5");
    });

    it('shows "Submitting..." while request is in flight', async () => {
      const user = userEvent.setup();
      // Create a promise that won't resolve immediately
      let resolveFetch: (value: unknown) => void;
      mockFetch.mockReturnValueOnce(new Promise(resolve => { resolveFetch = resolve; }));

      render(<CTASection />);
      await fillValidForm(user);
      await user.click(screen.getByRole("button", { name: "Get My Free Analysis" }));

      expect(screen.getByText("Submitting...")).toBeInTheDocument();

      // Resolve the fetch
      resolveFetch!({ json: () => Promise.resolve({ success: true, id: 1 }) });
    });

    it("disables submit button while submitting", async () => {
      const user = userEvent.setup();
      let resolveFetch: (value: unknown) => void;
      mockFetch.mockReturnValueOnce(new Promise(resolve => { resolveFetch = resolve; }));

      render(<CTASection />);
      await fillValidForm(user);
      await user.click(screen.getByRole("button", { name: "Get My Free Analysis" }));

      // Button should be disabled during submission
      const buttons = screen.getAllByRole("button");
      const submitBtn = buttons.find(b => b.getAttribute("type") === "submit");
      expect(submitBtn).toBeDisabled();

      resolveFetch!({ json: () => Promise.resolve({ success: true, id: 1 }) });
    });

    it('shows "Thank You!" success message on successful submission', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true, id: 1 }),
      });

      render(<CTASection />);
      await fillValidForm(user);
      await user.click(screen.getByRole("button", { name: "Get My Free Analysis" }));

      await waitFor(() => {
        expect(screen.getByText("Thank You!")).toBeInTheDocument();
      });
    });

    it("shows error message when API returns failure", async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ success: false, message: "Server error" }),
      });

      render(<CTASection />);
      await fillValidForm(user);
      await user.click(screen.getByRole("button", { name: "Get My Free Analysis" }));

      await waitFor(() => {
        expect(screen.getByText("Something went wrong. Please try again.")).toBeInTheDocument();
      });
    });

    it("shows error message when fetch throws", async () => {
      const user = userEvent.setup();
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      render(<CTASection />);
      await fillValidForm(user);
      await user.click(screen.getByRole("button", { name: "Get My Free Analysis" }));

      await waitFor(() => {
        expect(screen.getByText("Something went wrong. Please try again.")).toBeInTheDocument();
      });
    });

    it("includes smsConsent in payload", async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true, id: 1 }),
      });

      render(<CTASection />);
      await fillValidForm(user);
      // Check SMS consent
      await user.click(screen.getByRole("checkbox"));
      await user.click(screen.getByRole("button", { name: "Get My Free Analysis" }));

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.smsConsent).toBe(true);
    });
  });
});
