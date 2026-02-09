"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Mail, Clock } from "@/components/ui/IconSet";

interface Stats {
  totalUsers: number;
  pendingUsers: number;
  totalLeads: number;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, pendingUsers: 0, totalLeads: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [
        { count: totalUsers },
        { count: pendingUsers },
        { count: totalLeads },
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("leads").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        totalUsers: totalUsers ?? 0,
        pendingUsers: pendingUsers ?? 0,
        totalLeads: totalLeads ?? 0,
      });
      setIsLoading(false);
    }
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-brand-blue" },
    { label: "Pending Approval", value: stats.pendingUsers, icon: Clock, color: "text-yellow-400" },
    { label: "Total Leads", value: stats.totalLeads, icon: Mail, color: "text-brand-emerald" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Admin Overview</h1>
      <p className="text-slate-400 mb-8">Manage users and view leads</p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
                  <Icon className={card.color} size={20} />
                </div>
                <p className="text-sm text-slate-500">{card.label}</p>
              </div>
              <p className="text-3xl font-bold text-white">
                {isLoading ? "—" : card.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
