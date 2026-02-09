"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Mail } from "@/components/ui/IconSet";
import { cn } from "@/lib/utils";

type AuthMode = "magic" | "password";

function LoginForm() {
  const { signIn, signInWithMagicLink } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>("magic");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    searchParams.get("error") === "auth_callback_error"
      ? "Something went wrong. Please try again."
      : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error);
      setIsLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  const handleMagicLinkSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { error } = await signInWithMagicLink(email);

    if (error) {
      setError(error);
      setIsLoading(false);
    } else {
      setMagicLinkSent(true);
      setIsLoading(false);
    }
  };

  if (magicLinkSent) {
    return (
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-blue/10 flex items-center justify-center">
          <Mail className="text-brand-blue" size={28} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
        <p className="text-slate-400 text-sm mb-6">
          We sent a magic link to <span className="text-white font-medium">{email}</span>.
          <br />
          Click the link in your email to sign in.
        </p>
        <button
          onClick={() => {
            setMagicLinkSent(false);
            setEmail("");
          }}
          className="text-brand-blue text-sm hover:underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-white mb-2 text-center">Welcome Back</h1>
      <p className="text-slate-400 text-sm text-center mb-6">Sign in to your RevenuFlow account</p>

      {/* Mode toggle */}
      <div className="flex bg-white/[0.04] rounded-xl p-1 mb-6">
        <button
          onClick={() => { setMode("magic"); setError(""); }}
          className={cn(
            "flex-1 text-sm font-medium py-2.5 rounded-lg transition-all duration-200",
            mode === "magic"
              ? "bg-brand-blue text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          )}
        >
          Magic Link
        </button>
        <button
          onClick={() => { setMode("password"); setError(""); }}
          className={cn(
            "flex-1 text-sm font-medium py-2.5 rounded-lg transition-all duration-200",
            mode === "password"
              ? "bg-brand-blue text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          )}
        >
          Password
        </button>
      </div>

      {mode === "magic" ? (
        <form onSubmit={handleMagicLinkSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending link..." : "Send Magic Link"}
          </Button>

          <p className="text-slate-500 text-xs text-center">
            We&apos;ll email you a link to sign in — no password needed.
          </p>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      )}

      <p className="text-slate-500 text-sm text-center mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-brand-blue hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
