import { vi } from "vitest";
import type { Profile } from "@/types";

const defaultProfile: Profile = {
  id: "test-user-id",
  email: "test@example.com",
  full_name: "Test User",
  avatar_url: null,
  role: "wholesale",
  status: "approved",
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z",
};

export interface MockAuthValues {
  user?: unknown;
  profile?: Partial<Profile> | null;
  isLoading?: boolean;
}

export function createMockAuth(overrides: MockAuthValues = {}) {
  return {
    user: overrides.user ?? null,
    profile: overrides.profile ? { ...defaultProfile, ...overrides.profile } : null,
    session: overrides.user ? { user: overrides.user } : null,
    isLoading: overrides.isLoading ?? false,
    signUp: vi.fn().mockResolvedValue({ error: null }),
    signIn: vi.fn().mockResolvedValue({ error: null }),
    signInWithMagicLink: vi.fn().mockResolvedValue({ error: null }),
    signOut: vi.fn(),
    updateProfile: vi.fn().mockResolvedValue({ error: null }),
    uploadAvatar: vi.fn().mockResolvedValue({ url: null, error: null }),
    refreshProfile: vi.fn(),
  };
}

export function mockAuthModule(overrides: MockAuthValues = {}) {
  const mockAuth = createMockAuth(overrides);
  vi.mock("@/components/auth/AuthProvider", () => ({
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
    useAuth: () => mockAuth,
  }));
  return mockAuth;
}
