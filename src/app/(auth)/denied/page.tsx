"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import Button from "@/components/ui/Button";
import { X } from "@/components/ui/IconSet";

export default function DeniedPage() {
  const { signOut } = useAuth();

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
        <X className="text-red-400" size={32} />
      </div>
      <h1 className="text-2xl font-bold text-white mb-3">Access Denied</h1>
      <p className="text-slate-400 mb-8 max-w-sm mx-auto">
        Your account request has been denied. If you believe this is an error, please contact support.
      </p>
      <Button variant="secondary" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
