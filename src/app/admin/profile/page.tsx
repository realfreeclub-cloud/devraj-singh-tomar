"use client";

import { useState, useEffect } from "react";
import {
  User,
  Save,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
  Award,
  Globe,
  Compass
} from "lucide-react";
import { CmsProfile } from "@/lib/cms/types";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<CmsProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchProfile = () => {
    setLoading(true);
    fetch("/api/admin/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load profile", err);
        setErrorMsg("Failed to load profile data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update profile");
      }

      const updated = await res.json();
      setProfile(updated);
      setSuccessMsg("Professional profile & biography successfully saved!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  // Milestone handlers
  const handleAddMilestone = () => {
    if (!profile) return;
    setProfile({
      ...profile,
      milestones: [
        ...profile.milestones,
        {
          period: "2026 - Present",
          title: "New Role or Milestone",
          location: "Noida / Remote",
          desc: "Key strategic responsibilities and accomplishments...",
          badge: "Strategic Advisory",
        },
      ],
    });
  };

  const handleRemoveMilestone = (index: number) => {
    if (!profile) return;
    setProfile({
      ...profile,
      milestones: profile.milestones.filter((_, i) => i !== index),
    });
  };

  const handleMilestoneChange = (index: number, field: string, value: string) => {
    if (!profile) return;
    const updated = [...profile.milestones];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, milestones: updated });
  };

  // Philosophy handlers
  const handleAddPhilosophy = () => {
    if (!profile) return;
    const nextNum = String(profile.philosophy.length + 1).padStart(2, "0");
    setProfile({
      ...profile,
      philosophy: [
        ...profile.philosophy,
        {
          num: nextNum,
          title: "New Strategic Principle",
          desc: "Description of your core guiding operational thesis...",
        },
      ],
    });
  };

  const handleRemovePhilosophy = (index: number) => {
    if (!profile) return;
    setProfile({
      ...profile,
      philosophy: profile.philosophy.filter((_, i) => i !== index),
    });
  };

  const handlePhilosophyChange = (index: number, field: string, value: string) => {
    if (!profile) return;
    const updated = [...profile.philosophy];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, philosophy: updated });
  };

  // Social handlers
  const handleAddSocial = () => {
    if (!profile) return;
    setProfile({
      ...profile,
      socialLinks: [...profile.socialLinks, { name: "Platform", href: "https://" }],
    });
  };

  const handleRemoveSocial = (index: number) => {
    if (!profile) return;
    setProfile({
      ...profile,
      socialLinks: profile.socialLinks.filter((_, i) => i !== index),
    });
  };

  const handleSocialChange = (index: number, field: "name" | "href", value: string) => {
    if (!profile) return;
    const updated = [...profile.socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, socialLinks: updated });
  };

  if (loading) {
    return <div className="p-12 text-center text-foreground opacity-60">Loading profile data...</div>;
  }

  if (!profile) {
    return (
      <div className="p-12 text-center text-rose-400">
        Error loading profile. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="border-b border-layer-border pb-6">
        <h1 className="text-3xl font-extrabold text-title flex items-center gap-3">
          <User className="text-primary" size={28} />
          Profile, Bio & Executive Timeline
        </h1>
        <p className="text-foreground text-sm opacity-75 mt-1">
          Manage your verified professional biography, core philosophy, career milestone timeline, and official social handles.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-sm flex items-center gap-2">
          <CheckCircle2 size={18} />
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl text-sm flex items-center gap-2">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* BASIC IDENTITY */}
        <div className="bg-layer border border-layer-border rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-title font-bold text-lg border-b border-layer-border pb-3">
            <Sparkles className="text-primary" size={20} />
            Executive Identity & Bio
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Professional Title & Positioning
              </label>
              <input
                type="text"
                required
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Experience Metric (Years)
              </label>
              <input
                type="text"
                value={profile.experienceYears}
                onChange={(e) => setProfile({ ...profile, experienceYears: e.target.value })}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Profile Image URL
              </label>
              <input
                type="text"
                value={profile.profileImage}
                onChange={(e) => setProfile({ ...profile, profileImage: e.target.value })}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
              Short Summary Bio (Homepage snapshot)
            </label>
            <textarea
              rows={2}
              value={profile.shortBio}
              onChange={(e) => setProfile({ ...profile, shortBio: e.target.value })}
              className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
              Detailed Professional Bio (/about page)
            </label>
            <textarea
              rows={5}
              value={profile.detailedBio}
              onChange={(e) => setProfile({ ...profile, detailedBio: e.target.value })}
              className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary leading-relaxed"
            />
          </div>
        </div>

        {/* CAREER MILESTONES */}
        <div className="bg-layer border border-layer-border rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-layer-border pb-3">
            <div className="flex items-center gap-2 text-title font-bold text-lg">
              <Award className="text-primary" size={20} />
              Career Milestones Timeline
            </div>
            <button
              type="button"
              onClick={handleAddMilestone}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition"
            >
              <Plus size={14} /> Add Milestone
            </button>
          </div>

          <div className="space-y-4">
            {profile.milestones.map((m, idx) => (
              <div
                key={idx}
                className="bg-background border border-layer-border rounded-xl p-4 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary">Milestone #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMilestone(idx)}
                    className="p-1.5 rounded-lg text-foreground hover:text-rose-400 hover:bg-rose-500/10 transition"
                    title="Remove Milestone"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-foreground opacity-60 mb-1">
                      Period (Years)
                    </label>
                    <input
                      type="text"
                      value={m.period}
                      onChange={(e) => handleMilestoneChange(idx, "period", e.target.value)}
                      className="w-full bg-layer border border-layer-border rounded-lg px-3 py-1.5 text-xs text-title focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-foreground opacity-60 mb-1">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={m.title}
                      onChange={(e) => handleMilestoneChange(idx, "title", e.target.value)}
                      className="w-full bg-layer border border-layer-border rounded-lg px-3 py-1.5 text-xs text-title focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-foreground opacity-60 mb-1">
                      Location / Organization
                    </label>
                    <input
                      type="text"
                      value={m.location}
                      onChange={(e) => handleMilestoneChange(idx, "location", e.target.value)}
                      className="w-full bg-layer border border-layer-border rounded-lg px-3 py-1.5 text-xs text-title focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-3">
                    <label className="block text-[10px] font-mono uppercase text-foreground opacity-60 mb-1">
                      Strategic Scope & Achievements
                    </label>
                    <textarea
                      rows={2}
                      value={m.desc}
                      onChange={(e) => handleMilestoneChange(idx, "desc", e.target.value)}
                      className="w-full bg-layer border border-layer-border rounded-lg px-3 py-1.5 text-xs text-title focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-foreground opacity-60 mb-1">
                      Badge Label
                    </label>
                    <input
                      type="text"
                      value={m.badge}
                      onChange={(e) => handleMilestoneChange(idx, "badge", e.target.value)}
                      className="w-full bg-layer border border-layer-border rounded-lg px-3 py-1.5 text-xs text-title focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CORE PHILOSOPHY PRINCIPLES */}
        <div className="bg-layer border border-layer-border rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-layer-border pb-3">
            <div className="flex items-center gap-2 text-title font-bold text-lg">
              <Compass className="text-primary" size={20} />
              Strategic Guiding Principles
            </div>
            <button
              type="button"
              onClick={handleAddPhilosophy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition"
            >
              <Plus size={14} /> Add Principle
            </button>
          </div>

          <div className="space-y-4">
            {profile.philosophy.map((p, idx) => (
              <div
                key={idx}
                className="bg-background border border-layer-border rounded-xl p-4 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary">Principle {p.num}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePhilosophy(idx)}
                    className="p-1.5 rounded-lg text-foreground hover:text-rose-400 hover:bg-rose-500/10 transition"
                    title="Remove Principle"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-foreground opacity-60 mb-1">
                      Number
                    </label>
                    <input
                      type="text"
                      value={p.num}
                      onChange={(e) => handlePhilosophyChange(idx, "num", e.target.value)}
                      className="w-full bg-layer border border-layer-border rounded-lg px-3 py-1.5 text-xs text-title focus:outline-none focus:border-primary font-mono"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[10px] font-mono uppercase text-foreground opacity-60 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={p.title}
                      onChange={(e) => handlePhilosophyChange(idx, "title", e.target.value)}
                      className="w-full bg-layer border border-layer-border rounded-lg px-3 py-1.5 text-xs text-title focus:outline-none focus:border-primary font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-foreground opacity-60 mb-1">
                    Operational Thesis & Description
                  </label>
                  <textarea
                    rows={2}
                    value={p.desc}
                    onChange={(e) => handlePhilosophyChange(idx, "desc", e.target.value)}
                    className="w-full bg-layer border border-layer-border rounded-lg px-3 py-1.5 text-xs text-title focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div className="bg-layer border border-layer-border rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-layer-border pb-3">
            <div className="flex items-center gap-2 text-title font-bold text-lg">
              <Globe className="text-primary" size={20} />
              Verified Social Profiles
            </div>
            <button
              type="button"
              onClick={handleAddSocial}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition"
            >
              <Plus size={14} /> Add Social Link
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.socialLinks.map((s, idx) => (
              <div
                key={idx}
                className="bg-background border border-layer-border rounded-xl p-3 flex items-center gap-3"
              >
                <input
                  type="text"
                  value={s.name}
                  onChange={(e) => handleSocialChange(idx, "name", e.target.value)}
                  placeholder="Platform Name"
                  className="w-32 bg-layer border border-layer-border rounded-lg px-3 py-1.5 text-xs text-title focus:outline-none focus:border-primary font-medium"
                />

                <input
                  type="text"
                  value={s.href}
                  onChange={(e) => handleSocialChange(idx, "href", e.target.value)}
                  placeholder="https://..."
                  className="flex-1 bg-layer border border-layer-border rounded-lg px-3 py-1.5 text-xs text-title focus:outline-none focus:border-primary font-mono"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveSocial(idx)}
                  className="p-1.5 rounded-lg text-foreground hover:text-rose-400 hover:bg-rose-500/10 transition"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 bg-layer/95 backdrop-blur-md border border-layer-border rounded-2xl p-4 flex items-center justify-between shadow-2xl">
          <span className="text-xs text-foreground opacity-70 hidden sm:inline">
            Changes to your profile apply to public bios, about page, and footer metadata.
          </span>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/20 disabled:opacity-50 ml-auto"
          >
            <Save size={16} />
            {saving ? "Saving Changes..." : "Save Profile & Timeline"}
          </button>
        </div>
      </form>
    </div>
  );
}
