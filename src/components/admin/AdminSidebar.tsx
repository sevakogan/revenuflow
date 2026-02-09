"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { Home, Users, Mail, LogOut, ArrowRight } from "@/components/ui/IconSet";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Overview", icon: Home },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/leads", label: "Leads", icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { signOut, profile } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-brand-navy border-r border-white/[0.08] flex flex-col z-40">
      <div className="p-6 border-b border-white/[0.08]">
        <Logo />
        <span className="inline-block mt-2 px-2 py-0.5 text-xs font-semibold bg-brand-purple/20 text-brand-purple rounded">
          Admin
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-blue/10 text-brand-blue"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-white/[0.06]">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            <ArrowRight size={18} />
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-white/[0.08]">
        {profile && (
          <div className="flex items-center gap-3 px-4 py-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center text-xs font-semibold text-brand-purple">
              {profile.full_name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{profile.full_name}</p>
              <p className="text-xs text-slate-500 capitalize">{profile.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors w-full"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
