import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          remove(name: string, options: any) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check user profile status to redirect appropriately
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("status, role")
          .eq("id", user.id)
          .single();

        if (profile?.status === "pending") {
          return NextResponse.redirect(`${origin}/pending`);
        }
        if (profile?.status === "denied") {
          return NextResponse.redirect(`${origin}/denied`);
        }
        if (
          profile?.role === "admin" ||
          profile?.role === "assistant"
        ) {
          return NextResponse.redirect(`${origin}/admin`);
        }
        return NextResponse.redirect(`${origin}/dashboard`);
      }
    }
  }

  // If something went wrong, redirect to login with error
  return NextResponse.redirect(
    `${request.nextUrl.origin}/login?error=auth_callback_error`
  );
}
