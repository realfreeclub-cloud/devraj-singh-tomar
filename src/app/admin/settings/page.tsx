"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  Lock,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Globe
} from "lucide-react";
import { CmsWebsiteSettings } from "@/lib/cms/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<CmsWebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState("");
  const [settingsError, setSettingsError] = useState("");

  // Password Update State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const fetchSettings = () => {
    setLoading(true);
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load settings", err);
        setSettingsError("Failed to load website settings.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSavingSettings(true);
    setSettingsSuccess("");
    setSettingsError("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update website settings");
      }

      const result = await res.json();
      if (result.settings) setSettings(result.settings);
      setSettingsSuccess("Website settings successfully saved!");
      setTimeout(() => setSettingsSuccess(""), 4000);
    } catch (err: unknown) {
      setSettingsError(err instanceof Error ? err.message : "Error saving settings");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess("");
    setPasswordError("");

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setUpdatingPassword(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to change password.");
      }

      setPasswordSuccess("Admin password successfully updated!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(""), 5000);
    } catch (err: unknown) {
      setPasswordError(err instanceof Error ? err.message : "Password update failed");
    } finally {
      setUpdatingPassword(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-foreground opacity-60">Loading settings...</div>;
  }

  if (!settings) {
    return (
      <div className="p-12 text-center text-rose-400">
        Error loading settings. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Header */}
      <div className="border-b border-layer-border pb-6">
        <h1 className="text-3xl font-extrabold text-title flex items-center gap-3">
          <Settings className="text-primary" size={28} />
          Website Settings & Security
        </h1>
        <p className="text-foreground text-sm opacity-75 mt-1">
          Configure site-wide metadata defaults, official contact endpoints, and admin security credentials.
        </p>
      </div>

      {/* FORM 1: GENERAL WEBSITE CONFIGURATION */}
      <form onSubmit={handleSaveSettings} className="space-y-8">
        {settingsSuccess && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-sm flex items-center gap-2">
            <CheckCircle2 size={18} />
            {settingsSuccess}
          </div>
        )}

        {settingsError && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl text-sm flex items-center gap-2">
            <AlertCircle size={18} />
            {settingsError}
          </div>
        )}

        <div className="bg-layer border border-layer-border rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-title font-bold text-lg border-b border-layer-border pb-3">
            <Globe className="text-primary" size={20} />
            General Platform Settings
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Site Brand Name
              </label>
              <input
                type="text"
                required
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Default Title Template
              </label>
              <input
                type="text"
                required
                value={settings.titleTemplate}
                onChange={(e) => setSettings({ ...settings, titleTemplate: e.target.value })}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Copyright Text
              </label>
              <input
                type="text"
                value={settings.copyrightText}
                onChange={(e) => setSettings({ ...settings, copyrightText: e.target.value })}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Default OpenGraph Share Image URL
              </label>
              <input
                type="text"
                value={settings.defaultOgImage}
                onChange={(e) => setSettings({ ...settings, defaultOgImage: e.target.value })}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="bg-layer border border-layer-border rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-title font-bold text-lg border-b border-layer-border pb-3">
            <Mail className="text-primary" size={20} />
            Public Contact & Inquiry Endpoints
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Official Contact Email
              </label>
              <input
                type="email"
                required
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Public Telephone Number
              </label>
              <input
                type="text"
                value={settings.publicPhone}
                onChange={(e) => setSettings({ ...settings, publicPhone: e.target.value })}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                WhatsApp Direct Number
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
              Office / Facility Physical Address
            </label>
            <input
              type="text"
              value={settings.officeAddress}
              onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
              className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingSettings}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              <Save size={16} />
              {savingSettings ? "Saving Settings..." : "Save Website Settings"}
            </button>
          </div>
        </div>
      </form>

      {/* FORM 2: SECURITY & PASSWORD CHANGE */}
      <form onSubmit={handleUpdatePassword} className="space-y-6">
        <div className="bg-layer border border-layer-border rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-layer-border pb-3">
            <div className="flex items-center gap-2 text-title font-bold text-lg">
              <ShieldCheck className="text-primary" size={20} />
              Admin Security & Password
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              PBKDF2 SHA-512 Encrypted
            </span>
          </div>

          <p className="text-xs text-foreground opacity-75">
            Passwords are cryptographically salted and hashed on the server using Node crypto PBKDF2 (10,000 iterations). Plaintext credentials are never saved to disk.
          </p>

          {passwordSuccess && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-sm flex items-center gap-2">
              <CheckCircle2 size={18} />
              {passwordSuccess}
            </div>
          )}

          {passwordError && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl text-sm flex items-center gap-2">
              <AlertCircle size={18} />
              {passwordError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                placeholder="••••••••••••"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                New Password (Min 8 chars)
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                placeholder="••••••••••••"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={updatingPassword}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              <Lock size={16} />
              {updatingPassword ? "Updating Password..." : "Update Admin Password"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
