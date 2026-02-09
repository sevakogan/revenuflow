"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignupPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(email, password, fullName);

    if (error) {
      setError(error);
      setIsLoading(false);
    } else {
      router.push("/pending");
    }
  };

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-white mb-2 text-center">Create Account</h1>
      <p className="text-slate-400 text-sm text-center mb-8">Join RevenuFlow to get started</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          placeholder="John Smith"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
          placeholder="Min 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-slate-500 text-sm text-center mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-blue hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
