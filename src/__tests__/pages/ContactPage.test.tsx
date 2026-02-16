import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/app/(marketing)/contact/contact-form";

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("rendering", () => {
    it('renders form heading "Tell Us About Your Properties"', () => {
      render(<ContactForm />);
      expect(screen.getByText("Tell Us About Your Properties")).toBeInTheDocument();
    });

    it("renders all form fields", () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/^Name/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Company/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone/)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Email/)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Message/)).toBeInTheDocument();
    });

    it("renders SMS consent checkbox", () => {
      render(<ContactForm />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("renders submit button", () => {
      render(<ContactForm />);
      expect(screen.getByRole("button", { name: "Get My Free Revenue Analysis" })).toBeInTheDocument();
    });

    it("marks name, phone, email, message as required", () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/^Name/)).toBeRequired();
      expect(screen.getByLabelText(/Phone/)).toBeRequired();
      expect(screen.getByLabelText(/^Email/)).toBeRequired();
      expect(screen.getByLabelText(/^Message/)).toBeRequired();
    });

    it("does NOT mark company as required", () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/Company/)).not.toBeRequired();
    });
  });

  describe("submission", () => {
    async function fillForm(user: ReturnType<typeof userEvent.setup>) {
      await user.type(screen.getByLabelText(/^Name/), "Test User");
      await user.type(screen.getByLabelText(/Phone/), "555-1234");
      await user.type(screen.getByLabelText(/^Email/), "test@test.com");
      await user.type(screen.getByLabelText(/^Message/), "Test message");
    }

    it("calls fetch with POST /api/contact and correct payload", async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true, id: 1 }),
      });

      render(<ContactForm />);
      await fillForm(user);
      await user.click(screen.getByRole("button", { name: "Get My Free Revenue Analysis" }));

      expect(mockFetch).toHaveBeenCalledWith("/api/contact", expect.objectContaining({
        method: "POST",
      }));

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.name).toBe("Test User");
      expect(body.email).toBe("test@test.com");
      expect(body.phone).toBe("555-1234");
      expect(body.message).toBe("Test message");
    });

    it('shows "Sending..." while submitting', async () => {
      const user = userEvent.setup();
      let resolveFetch: (value: unknown) => void;
      mockFetch.mockReturnValueOnce(new Promise(resolve => { resolveFetch = resolve; }));

      render(<ContactForm />);
      await fillForm(user);
      await user.click(screen.getByRole("button", { name: "Get My Free Revenue Analysis" }));

      expect(screen.getByText("Sending...")).toBeInTheDocument();

      resolveFetch!({ json: () => Promise.resolve({ success: true, id: 1 }) });
    });

    it("disables button while submitting", async () => {
      const user = userEvent.setup();
      let resolveFetch: (value: unknown) => void;
      mockFetch.mockReturnValueOnce(new Promise(resolve => { resolveFetch = resolve; }));

      render(<ContactForm />);
      await fillForm(user);
      await user.click(screen.getByRole("button", { name: "Get My Free Revenue Analysis" }));

      expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();

      resolveFetch!({ json: () => Promise.resolve({ success: true, id: 1 }) });
    });

    it("shows success banner on successful submission", async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true, id: 1 }),
      });

      render(<ContactForm />);
      await fillForm(user);
      await user.click(screen.getByRole("button", { name: "Get My Free Revenue Analysis" }));

      await waitFor(() => {
        expect(screen.getByText(/We got your message/)).toBeInTheDocument();
      });
    });

    it("shows error banner when API returns failure", async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ success: false, message: "Server error" }),
      });

      render(<ContactForm />);
      await fillForm(user);
      await user.click(screen.getByRole("button", { name: "Get My Free Revenue Analysis" }));

      await waitFor(() => {
        expect(screen.getByText("Server error")).toBeInTheDocument();
      });
    });

    it("shows generic error on network failure", async () => {
      const user = userEvent.setup();
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      render(<ContactForm />);
      await fillForm(user);
      await user.click(screen.getByRole("button", { name: "Get My Free Revenue Analysis" }));

      await waitFor(() => {
        expect(screen.getByText("Failed to send. Please try again.")).toBeInTheDocument();
      });
    });

    it("correctly maps smsConsent checkbox", async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true, id: 1 }),
      });

      render(<ContactForm />);
      await fillForm(user);
      await user.click(screen.getByRole("checkbox"));
      await user.click(screen.getByRole("button", { name: "Get My Free Revenue Analysis" }));

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.smsConsent).toBe(true);
    });
  });
});
