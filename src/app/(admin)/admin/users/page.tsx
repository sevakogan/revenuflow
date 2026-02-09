"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import type { Profile, UserRole } from "@/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setUsers(data as Profile[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUser = async (id: string, updates: Partial<Pick<Profile, "status" | "role">>) => {
    await supabase.from("profiles").update(updates).eq("id", id);
    fetchUsers();
  };

  const roleOptions: UserRole[] = ["retail", "wholesale", "admin", "assistant"];

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-8">Users</h1>
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
      <h1 className="text-3xl font-bold text-white mb-2">Users</h1>
      <p className="text-slate-400 mb-8">{users.length} total users</p>

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
                Role
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                Status
              </th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                Joined
              </th>
              <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center text-xs font-semibold text-brand-blue">
                      {user.full_name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <span className="text-sm text-white">{user.full_name || "—"}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{user.email}</td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateUser(user.id, { role: e.target.value as UserRole })
                    }
                    className="bg-white/[0.05] border border-white/[0.1] rounded-lg px-3 py-1.5 text-sm text-white appearance-none cursor-pointer"
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role} className="bg-brand-dark">
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                      user.status === "approved"
                        ? "bg-brand-emerald/20 text-brand-emerald"
                        : user.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {user.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() =>
                            updateUser(user.id, { status: "approved" })
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            updateUser(user.id, { status: "denied" })
                          }
                          className="text-red-400 hover:text-red-300"
                        >
                          Deny
                        </Button>
                      </>
                    )}
                    {user.status === "approved" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          updateUser(user.id, { status: "denied" })
                        }
                        className="text-red-400 hover:text-red-300"
                      >
                        Revoke
                      </Button>
                    )}
                    {user.status === "denied" && (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() =>
                          updateUser(user.id, { status: "approved" })
                        }
                      >
                        Approve
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
