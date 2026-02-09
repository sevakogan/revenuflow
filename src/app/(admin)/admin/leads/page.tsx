"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Lead } from "@/types";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      const { data } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setLeads(data as Lead[]);
      setIsLoading(false);
    }
    fetchLeads();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-8">Leads</h1>
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-white/[0.03] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Leads</h1>
      <p className="text-slate-400 mb-8">{leads.length} total submissions</p>

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.08]">
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                Name
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                Email
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                Property Type
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                Properties
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                Revenue
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                Location
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                Submitted
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-6 py-4 text-sm text-white">{lead.name}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{lead.email}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{lead.property_type || "—"}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{lead.property_count || "—"}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{lead.revenue || "—"}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{lead.location || "—"}</td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  No leads yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
