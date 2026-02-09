"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
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

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-white mb-2 text-center">Welcome Back</h1>
      <p className="text-slate-400 text-sm text-center mb-8">Sign in to your RevenuFlow account</p>

      <form onSubmit={handleSubmit} className="space-y-5">
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

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="text-slate-500 text-sm text-center mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-brand-blue hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
