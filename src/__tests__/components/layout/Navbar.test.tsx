import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock Logo
vi.mock("@/components/ui/Logo", () => ({
  default: () => <div data-testid="logo">RevenuFlow</div>,
}));

// Mock IconSet
vi.mock("@/components/ui/IconSet", () => ({
  Menu: () => <span data-testid="menu-icon">menu</span>,
  X: () => <span data-testid="x-icon">close</span>,
}));

// Mock useScrollSpy
vi.mock("@/hooks/useScrollSpy", () => ({
  default: () => null,
}));

// We'll set up the auth mock differently for each test block
const mockAuthValues = {
  user: null as unknown,
  profile: null as Record<string, unknown> | null,
  isLoading: false,
};

vi.mock("@/components/auth/AuthProvider", () => ({
  useAuth: () => mockAuthValues,
}));

import Navbar from "@/components/layout/Navbar";

describe("Navbar", () => {
  beforeEach(() => {
    mockAuthValues.user = null;
    mockAuthValues.profile = null;
    mockAuthValues.isLoading = false;
  });

  describe("unauthenticated state", () => {
    it("renders the Logo linking to /", () => {
      render(<Navbar />);
      const logoLink = screen.getByTestId("logo").closest("a");
      expect(logoLink).toHaveAttribute("href", "/");
    });

    it("renders all 5 NAV_LINKS", () => {
      render(<Navbar />);
      expect(screen.getByText("Features")).toBeInTheDocument();
      expect(screen.getByText("How It Works")).toBeInTheDocument();
      expect(screen.getByText("Results")).toBeInTheDocument();
      expect(screen.getByText("Pricing")).toBeInTheDocument();
      expect(screen.getByText("FAQ")).toBeInTheDocument();
    });

    it('renders "Log In" button linking to /login', () => {
      render(<Navbar />);
      const loginLinks = screen.getAllByText("Log In");
      // Desktop version
      const desktopLogin = loginLinks[0].closest("a");
      expect(desktopLogin).toHaveAttribute("href", "/login");
    });

    it('renders "Get Free Analysis" button linking to /#cta', () => {
      render(<Navbar />);
      const ctaButtons = screen.getAllByText("Get Free Analysis");
      const desktopCta = ctaButtons[0].closest("a");
      expect(desktopCta).toHaveAttribute("href", "/#cta");
    });

    it("does NOT render Dashboard or Admin Panel button", () => {
      render(<Navbar />);
      expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
      expect(screen.queryByText("Admin Panel")).not.toBeInTheDocument();
    });
  });

  describe("authenticated (regular user)", () => {
    beforeEach(() => {
      mockAuthValues.user = { id: "user-1", email: "user@test.com" };
      mockAuthValues.profile = { role: "wholesale", status: "approved" };
    });

    it('renders "Dashboard" button linking to /dashboard', () => {
      render(<Navbar />);
      const dashButtons = screen.getAllByText("Dashboard");
      const desktopDash = dashButtons[0].closest("a");
      expect(desktopDash).toHaveAttribute("href", "/dashboard");
    });

    it('does NOT render "Log In" or "Get Free Analysis" buttons', () => {
      render(<Navbar />);
      expect(screen.queryByText("Log In")).not.toBeInTheDocument();
      expect(screen.queryByText("Get Free Analysis")).not.toBeInTheDocument();
    });
  });

  describe("authenticated (admin user)", () => {
    beforeEach(() => {
      mockAuthValues.user = { id: "admin-1", email: "admin@test.com" };
      mockAuthValues.profile = { role: "admin", status: "approved" };
    });

    it('renders "Admin Panel" button linking to /admin', () => {
      render(<Navbar />);
      const adminButtons = screen.getAllByText("Admin Panel");
      const desktopAdmin = adminButtons[0].closest("a");
      expect(desktopAdmin).toHaveAttribute("href", "/admin");
    });
  });

  describe("authenticated (assistant user)", () => {
    beforeEach(() => {
      mockAuthValues.user = { id: "asst-1", email: "assistant@test.com" };
      mockAuthValues.profile = { role: "assistant", status: "approved" };
    });

    it('renders "Admin Panel" button for assistant role', () => {
      render(<Navbar />);
      const adminButtons = screen.getAllByText("Admin Panel");
      expect(adminButtons.length).toBeGreaterThan(0);
    });
  });

  describe("mobile menu", () => {
    it("renders hamburger menu button", () => {
      render(<Navbar />);
      expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
    });

    it("opens mobile menu when hamburger is clicked", async () => {
      const user = userEvent.setup();
      render(<Navbar />);
      await user.click(screen.getByLabelText("Toggle menu"));
      // Mobile menu shows the nav links in a second location
      const features = screen.getAllByText("Features");
      expect(features.length).toBeGreaterThan(1);
    });

    it("closes mobile menu when a link is clicked", async () => {
      const user = userEvent.setup();
      render(<Navbar />);
      // Open menu
      await user.click(screen.getByLabelText("Toggle menu"));
      // Click a mobile nav link
      const mobileLinks = screen.getAllByText("Features");
      await user.click(mobileLinks[mobileLinks.length - 1]);
      // Menu should close — only desktop nav links remain
      const featuresAfter = screen.getAllByText("Features");
      expect(featuresAfter).toHaveLength(1);
    });
  });

  describe("loading state", () => {
    it("shows Log In buttons while loading (no user)", () => {
      mockAuthValues.isLoading = true;
      render(<Navbar />);
      // When loading with no user, the else branch renders Log In/Get Free Analysis
      expect(screen.getAllByText("Log In").length).toBeGreaterThan(0);
      expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
    });
  });
});
