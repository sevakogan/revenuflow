# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

RevenuFlow is a SaaS marketing site and dashboard for a revenue management platform (Airbnb/VRBO/hotel pricing). Built with Next.js 14, React 18, Supabase, and Framer Motion.

## Commands

```bash
npm run dev         # Dev server (localhost:3000)
npm run build       # Production build
npm run lint        # ESLint (next/core-web-vitals + next/typescript)
npm test            # Vitest unit tests (single run)
npm run test:watch  # Vitest watch mode
npm run test:e2e    # Playwright E2E tests
npm run test:all    # Unit + E2E tests
npm run verify      # Full CI check: lint → test → build
```

Run a single test: `npx vitest run src/__tests__/path/to/test.ts`

## Testing

### Unit Tests (Vitest)
- Config: `vitest.config.ts` — jsdom environment, globals enabled
- Setup: `src/__tests__/setup.ts` — mocks Framer Motion, IntersectionObserver, next/navigation, next/link, window.matchMedia
- Tests in `src/__tests__/` mirroring src structure (api/, lib/, components/, pages/)
- Coverage: v8 provider

### E2E Tests (Playwright)
- Config: `playwright.config.ts` — Desktop Chrome + iPhone 13
- Tests in `e2e/` directory
- Base URL: `http://localhost:3000`

### CI/CD (`.github/workflows/test.yml`)
Triggers on push to main/qa, PR to main/qa/production:
lint → unit tests → build (needs Supabase env vars) → Playwright E2E

## Architecture

### Route Groups (App Router)
- `(marketing)/` — public landing page, `/contact`, `/book`, `/privacy`, `/terms`
- `(auth)/` — `/login`, `/signup`, `/pending`, `/denied`
- `(dashboard)/` — `/dashboard`, `/dashboard/profile`
- `(admin)/` — `/admin`, `/admin/leads`, `/admin/users`

### Authentication & Authorization
- Supabase Auth with email/password, magic link OTP
- `src/middleware.ts` enforces route protection:
  - Logged-in users on `/login`/`/signup` → redirect to `/dashboard`
  - Unauthenticated on protected routes → redirect to `/login`
  - User status `pending` → can only see `/pending` page
  - Non-admin/non-assistant → cannot access `/admin/*`
- Roles: `retail`, `wholesale`, `admin`, `assistant`
- Statuses: `pending`, `approved`, `denied`

### Supabase Integration
- `src/lib/supabase.ts` — browser client (`NEXT_PUBLIC_*` vars)
- `src/lib/supabase-server.ts` — server client with Next.js cookies
- `src/lib/db-server.ts` — server-side operations using `SUPABASE_SERVICE_ROLE_KEY`
- Tables: `profiles`, `rf_contact_submissions`, `leads`

### CRM Integration
- `src/lib/ghl.ts` — GoHighLevel API for syncing contacts and leads (non-blocking, parallel with Supabase save)
- API routes `POST /api/contact` and `POST /api/lead` save to Supabase + sync to GHL

### UI Patterns
- `src/lib/animations.ts` — shared Framer Motion variants (`fadeInUp`, `staggerContainer`, `scaleIn`)
- `src/lib/constants.ts` — all marketing content data (stats, features, pricing, testimonials, FAQ)
- `src/hooks/useScrollSpy.ts` — IntersectionObserver-based active section tracking for navbar
- `src/components/auth/AuthProvider.tsx` — context-based auth state wrapper

### Path Alias
`@/*` → `./src/*`

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
GHL_API_KEY, GHL_LOCATION_ID    # Optional — GoHighLevel CRM sync
```
