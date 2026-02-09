"use client";

import { useAuth } from "@/components/auth/AuthProvider";

export default function DashboardPage() {
  const { profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-white/[0.05] rounded w-64" />
        <div className="h-4 bg-white/[0.05] rounded w-96" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">
        Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}
      </h1>
      <p className="text-slate-400 mb-8">
        Here&apos;s an overview of your RevenuFlow account.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <p className="text-sm text-slate-500 mb-1">Account Status</p>
          <p className="text-lg font-semibold text-brand-emerald capitalize">
            {profile?.status}
          </p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <p className="text-sm text-slate-500 mb-1">Account Type</p>
          <p className="text-lg font-semibold text-white capitalize">
            {profile?.role}
          </p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <p className="text-sm text-slate-500 mb-1">Member Since</p>
          <p className="text-lg font-semibold text-white">
            {profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
