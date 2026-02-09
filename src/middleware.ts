import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set(name, value, options);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        remove(name: string, options: any) {
          request.cookies.set({ name, value: "" });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set(name, "", options);
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Auth pages — redirect logged-in users to dashboard
  if (user && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protected routes — require auth
  if (
    !user &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/pending") ||
      pathname.startsWith("/denied"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!user) return response;

  // Fetch profile for status/role checks
  const { data: profile } = await supabase
    .from("profiles")
    .select("status, role")
    .eq("id", user.id)
    .single();

  // Pending users can only see /pending
  if (profile?.status === "pending" && !pathname.startsWith("/pending")) {
    return NextResponse.redirect(new URL("/pending", request.url));
  }

  // Denied users can only see /denied
  if (profile?.status === "denied" && !pathname.startsWith("/denied")) {
    return NextResponse.redirect(new URL("/denied", request.url));
  }

  // Approved users shouldn't see /pending or /denied
  if (profile?.status === "approved" && (pathname.startsWith("/pending") || pathname.startsWith("/denied"))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Admin routes require admin or assistant role
  if (pathname.startsWith("/admin")) {
    if (!["admin", "assistant"].includes(profile?.role ?? "")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
    "/pending",
    "/denied",
  ],
};
