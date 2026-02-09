"use client";

import { useState, useRef, FormEvent } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Upload } from "@/components/ui/IconSet";

export default function ProfilePage() {
  const { profile, updateProfile, uploadAvatar, isLoading } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when profile loads
  if (profile && fullName === "" && profile.full_name) {
    setFullName(profile.full_name);
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    const { error } = await updateProfile({ full_name: fullName });

    if (error) {
      setMessage(`Error: ${error}`);
    } else {
      setMessage("Profile updated successfully!");
    }
    setIsSaving(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage("");

    const { error } = await uploadAvatar(file);

    if (error) {
      setMessage(`Upload error: ${error}`);
    } else {
      setMessage("Avatar updated!");
    }
    setIsUploading(false);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-white/[0.05] rounded w-48" />
        <div className="h-64 bg-white/[0.05] rounded-2xl" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
      <p className="text-slate-400 mb-8">Manage your account details</p>

      <div className="max-w-xl">
        {/* Avatar */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 mb-6">
          <p className="text-sm font-medium text-white mb-4">Profile Photo</p>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-brand-blue/20 flex items-center justify-center overflow-hidden border-2 border-white/[0.08]">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-brand-blue">
                  {profile?.full_name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              )}
            </div>
            <div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Upload size={16} className="mr-2" />
                {isUploading ? "Uploading..." : "Upload Photo"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <p className="text-xs text-slate-500 mt-2">JPG, PNG. Max 2MB.</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <form onSubmit={handleSave} className="space-y-5">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Input
              label="Email"
              value={profile?.email || ""}
              onChange={() => {}}
              disabled
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Role</label>
                <p className="text-white capitalize bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm">
                  {profile?.role}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Status</label>
                <p className="text-brand-emerald capitalize bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm">
                  {profile?.status}
                </p>
              </div>
            </div>

            {message && (
              <p className={`text-sm ${message.startsWith("Error") || message.startsWith("Upload error") ? "text-red-400" : "text-brand-emerald"}`}>
                {message}
              </p>
            )}

            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
