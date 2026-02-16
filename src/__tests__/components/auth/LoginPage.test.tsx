import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockSignIn = vi.fn().mockResolvedValue({ error: null });
const mockSignInWithMagicLink = vi.fn().mockResolvedValue({ error: null });
const mockPush = vi.fn();

// Mock auth
vi.mock("@/components/auth/AuthProvider", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    signInWithMagicLink: mockSignInWithMagicLink,
  }),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/login",
}));

// Mock IconSet
vi.mock("@/components/ui/IconSet", () => ({
  Mail: ({ size, ...props }: { size?: number }) => <span {...props}>mail</span>,
}));

import LoginPage from "@/app/(auth)/login/page";

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders "Welcome Back" heading', () => {
    render(<LoginPage />);
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
  });

  it('renders "Magic Link" and "Password" mode toggle', () => {
    render(<LoginPage />);
    expect(screen.getByText("Magic Link")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  it("defaults to magic link mode", () => {
    render(<LoginPage />);
    expect(screen.getByRole("button", { name: "Send Magic Link" })).toBeInTheDocument();
    expect(screen.queryByText("Sign In")).not.toBeInTheDocument();
  });

  it("shows only email field in magic link mode", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Enter your password")).not.toBeInTheDocument();
  });

  it("shows email and password fields in password mode", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    await user.click(screen.getByText("Password"));
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
  });

  it("switches mode when toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    // Start in magic mode
    expect(screen.getByRole("button", { name: "Send Magic Link" })).toBeInTheDocument();
    // Switch to password mode
    await user.click(screen.getByText("Password"));
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
    // Switch back to magic mode
    await user.click(screen.getByText("Magic Link"));
    expect(screen.getByRole("button", { name: "Send Magic Link" })).toBeInTheDocument();
  });

  describe("magic link mode", () => {
    it("calls signInWithMagicLink with email on submit", async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      await user.type(screen.getByPlaceholderText("you@example.com"), "test@test.com");
      await user.click(screen.getByRole("button", { name: "Send Magic Link" }));

      expect(mockSignInWithMagicLink).toHaveBeenCalledWith("test@test.com");
    });

    it('shows "Check Your Email" confirmation after successful send', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      await user.type(screen.getByPlaceholderText("you@example.com"), "test@test.com");
      await user.click(screen.getByRole("button", { name: "Send Magic Link" }));

      await waitFor(() => {
        expect(screen.getByText("Check Your Email")).toBeInTheDocument();
      });
    });

    it("shows email address in confirmation message", async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      await user.type(screen.getByPlaceholderText("you@example.com"), "test@test.com");
      await user.click(screen.getByRole("button", { name: "Send Magic Link" }));

      await waitFor(() => {
        expect(screen.getByText("test@test.com")).toBeInTheDocument();
      });
    });

    it('shows "Use a different email" link', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      await user.type(screen.getByPlaceholderText("you@example.com"), "test@test.com");
      await user.click(screen.getByRole("button", { name: "Send Magic Link" }));

      await waitFor(() => {
        expect(screen.getByText("Use a different email")).toBeInTheDocument();
      });
    });

    it("shows error message when signInWithMagicLink fails", async () => {
      mockSignInWithMagicLink.mockResolvedValueOnce({ error: "Rate limit exceeded" });
      const user = userEvent.setup();
      render(<LoginPage />);
      await user.type(screen.getByPlaceholderText("you@example.com"), "test@test.com");
      await user.click(screen.getByRole("button", { name: "Send Magic Link" }));

      await waitFor(() => {
        expect(screen.getByText("Rate limit exceeded")).toBeInTheDocument();
      });
    });

    it('shows "Sending link..." while loading', async () => {
      let resolveAuth: (value: unknown) => void;
      mockSignInWithMagicLink.mockReturnValueOnce(new Promise(resolve => { resolveAuth = resolve; }));

      const user = userEvent.setup();
      render(<LoginPage />);
      await user.type(screen.getByPlaceholderText("you@example.com"), "test@test.com");
      await user.click(screen.getByRole("button", { name: "Send Magic Link" }));

      expect(screen.getByText("Sending link...")).toBeInTheDocument();

      resolveAuth!({ error: null });
    });
  });

  describe("password mode", () => {
    it("calls signIn with email and password on submit", async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      await user.click(screen.getByText("Password"));
      await user.type(screen.getByPlaceholderText("you@example.com"), "test@test.com");
      await user.type(screen.getByPlaceholderText("Enter your password"), "mypassword");
      await user.click(screen.getByRole("button", { name: "Sign In" }));

      expect(mockSignIn).toHaveBeenCalledWith("test@test.com", "mypassword");
    });

    it("redirects to /dashboard on successful sign-in", async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      await user.click(screen.getByText("Password"));
      await user.type(screen.getByPlaceholderText("you@example.com"), "test@test.com");
      await user.type(screen.getByPlaceholderText("Enter your password"), "mypassword");
      await user.click(screen.getByRole("button", { name: "Sign In" }));

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/dashboard");
      });
    });

    it("shows error message when signIn fails", async () => {
      mockSignIn.mockResolvedValueOnce({ error: "Invalid credentials" });
      const user = userEvent.setup();
      render(<LoginPage />);
      await user.click(screen.getByText("Password"));
      await user.type(screen.getByPlaceholderText("you@example.com"), "test@test.com");
      await user.type(screen.getByPlaceholderText("Enter your password"), "wrong");
      await user.click(screen.getByRole("button", { name: "Sign In" }));

      await waitFor(() => {
        expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
      });
    });

    it('shows "Signing in..." while loading', async () => {
      let resolveAuth: (value: unknown) => void;
      mockSignIn.mockReturnValueOnce(new Promise(resolve => { resolveAuth = resolve; }));

      const user = userEvent.setup();
      render(<LoginPage />);
      await user.click(screen.getByText("Password"));
      await user.type(screen.getByPlaceholderText("you@example.com"), "test@test.com");
      await user.type(screen.getByPlaceholderText("Enter your password"), "mypassword");
      await user.click(screen.getByRole("button", { name: "Sign In" }));

      expect(screen.getByText("Signing in...")).toBeInTheDocument();

      resolveAuth!({ error: null });
    });
  });

  it("renders link to /signup", () => {
    render(<LoginPage />);
    const signupLink = screen.getByText("Sign up");
    expect(signupLink.closest("a")).toHaveAttribute("href", "/signup");
  });
});
