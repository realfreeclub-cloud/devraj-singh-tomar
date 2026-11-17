"use client";

import { useState, useEffect } from "react";
import {
  Home,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { CmsHomepageSettings, CmsProject } from "@/lib/cms/types";

export default function AdminHomepagePage() {
  const [settings, setSettings] = useState<CmsHomepageSettings | null>(null);
  const [projects, setProjects] = useState<CmsProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/homepage").then((r) => r.json()),
      fetch("/api/admin/projects").then((r) => r.json()),
    ])
      .then(([homeData, projData]) => {
        setSettings(homeData);
        setProjects(Array.isArray(projData) ? projData : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load homepage settings", err);
        setErrorMsg("Failed to load homepage settings.");
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update homepage settings");
      }

      const updated = await res.json();
      setSettings(updated);
      setSuccessMsg("Homepage settings successfully saved and applied to live site!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error saving homepage settings");
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (sectionKey: keyof CmsHomepageSettings["sectionVisibility"]) => {
    if (!settings) return;
    setSettings({
      ...settings,
      sectionVisibility: {
        ...settings.sectionVisibility,
        [sectionKey]: !settings.sectionVisibility[sectionKey],
      },
    });
  };

  const handleToggleFeaturedSlug = (slug: string) => {
    if (!settings) return;
    const current = settings.featuredProjectSlugs || [];
    const exists = current.includes(slug);
    const updated = exists ? current.filter((s) => s !== slug) : [...current, slug];
    setSettings({
      ...settings,
      featuredProjectSlugs: updated,
    });
  };

  if (loading) {
    return <div className="p-12 text-center text-foreground opacity-60">Loading homepage configuration...</div>;
  }

  if (!settings) {
    return (
      <div className="p-12 text-center text-rose-400">
        Error loading configuration. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-layer-border pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-title flex items-center gap-3">
            <Home className="text-primary" size={28} />
            Homepage Management
          </h1>
          <p className="text-foreground text-sm opacity-75 mt-1">
            Configure the primary hero headline, strategic value statement, CTA pathways, and toggle section visibility.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-layer-border text-foreground hover:text-primary hover:bg-secondary/40 text-xs font-semibold transition w-fit"
        >
          View Live Site <ExternalLink size={14} />
        </a>
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
        {/* SECTION 1: HERO CONFIG */}
        <div className="bg-layer border border-layer-border rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-title font-bold text-lg border-b border-layer-border pb-3">
            <Sparkles className="text-primary" size={20} />
            Hero Section & Brand Statement
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-2">
              Hero Headline
            </label>
            <input
              type="text"
              required
              value={settings.heroHeadline}
              onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
              className="w-full bg-background border border-layer-border rounded-xl px-4 py-3 text-sm text-title focus:outline-none focus:border-primary font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-2">
              Hero Subheadline / Value Proposition
            </label>
            <textarea
              rows={3}
              required
              value={settings.heroSubheadline}
              onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
              className="w-full bg-background border border-layer-border rounded-xl px-4 py-3 text-sm text-title focus:outline-none focus:border-primary leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-2">
                Availability Badge Text
              </label>
              <input
                type="text"
                value={settings.availabilityText}
                onChange={(e) => setSettings({ ...settings, availabilityText: e.target.value })}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="isAvailableToggle"
                checked={settings.isAvailable}
                onChange={(e) => setSettings({ ...settings, isAvailable: e.target.checked })}
                className="rounded text-primary focus:ring-primary w-5 h-5"
              />
              <label htmlFor="isAvailableToggle" className="text-sm font-medium text-title cursor-pointer">
                Show live availability beacon (green pulse)
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-layer-border">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Primary Call to Action</span>
              <div>
                <label className="block text-xs text-foreground opacity-70 mb-1">Button Text</label>
                <input
                  type="text"
                  value={settings.primaryCtaText}
                  onChange={(e) => setSettings({ ...settings, primaryCtaText: e.target.value })}
                  className="w-full bg-background border border-layer-border rounded-xl px-4 py-2 text-xs text-title focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-foreground opacity-70 mb-1">Destination URL</label>
                <input
                  type="text"
                  value={settings.primaryCtaLink}
                  onChange={(e) => setSettings({ ...settings, primaryCtaLink: e.target.value })}
                  className="w-full bg-background border border-layer-border rounded-xl px-4 py-2 text-xs text-title focus:outline-none focus:border-primary font-mono"
                />
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground opacity-70">
                Secondary Call to Action
              </span>
              <div>
                <label className="block text-xs text-foreground opacity-70 mb-1">Button Text</label>
                <input
                  type="text"
                  value={settings.secondaryCtaText}
                  onChange={(e) => setSettings({ ...settings, secondaryCtaText: e.target.value })}
                  className="w-full bg-background border border-layer-border rounded-xl px-4 py-2 text-xs text-title focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-foreground opacity-70 mb-1">Destination URL</label>
                <input
                  type="text"
                  value={settings.secondaryCtaLink}
                  onChange={(e) => setSettings({ ...settings, secondaryCtaLink: e.target.value })}
                  className="w-full bg-background border border-layer-border rounded-xl px-4 py-2 text-xs text-title focus:outline-none focus:border-primary font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: SECTION VISIBILITY TOGGLES */}
        <div className="bg-layer border border-layer-border rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-title font-bold text-lg border-b border-layer-border pb-3">
            <Sliders className="text-primary" size={20} />
            Homepage Section Visibility
          </div>
          <p className="text-xs text-foreground opacity-70">
            Control which strategic sections render on the homepage. Disabled sections are cleanly excluded without breaking layout.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {[
              { key: "snapshot", label: "Executive Snapshot & Metrics" },
              { key: "featuredWork", label: "Featured Work & Flagship Projects" },
              { key: "whatIDo", label: "Strategic Capabilities (What I Do)" },
              { key: "ventures", label: "Ventures & Digital Ecosystem" },
              { key: "howIWork", label: "Strategic Execution Process (How I Work)" },
              { key: "nowBuilding", label: "Now Building & Live Sprints" },
              { key: "insights", label: "Insights & Thought Leadership" },
              { key: "contactCta", label: "Executive Contact & Collaboration Banner" },
            ].map(({ key, label }) => {
              const active = settings.sectionVisibility[key as keyof CmsHomepageSettings["sectionVisibility"]];
              return (
                <div
                  key={key}
                  onClick={() => toggleSection(key as keyof CmsHomepageSettings["sectionVisibility"])}
                  className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    active
                      ? "bg-primary/5 border-primary/40 text-title"
                      : "bg-background border-layer-border opacity-60 text-foreground"
                  }`}
                >
                  <span className="text-xs font-semibold">{label}</span>
                  <div
                    className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                      active ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        active ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: FEATURED PROJECTS CHOOSER */}
        <div className="bg-layer border border-layer-border rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-layer-border pb-3">
            <div className="flex items-center gap-2 text-title font-bold text-lg">
              <Eye className="text-primary" size={20} />
              Featured Flagship Projects
            </div>
            <span className="text-xs font-mono text-primary font-semibold">
              {(settings.featuredProjectSlugs || []).length} selected
            </span>
          </div>
          <p className="text-xs text-foreground opacity-70">
            Select the flagship case studies to showcase in the homepage Featured Work carousel.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {projects
              .filter((p) => p.hasCaseStudy || p.featured)
              .map((p) => {
                const isSelected = (settings.featuredProjectSlugs || []).includes(p.slug);
                return (
                  <div
                    key={p.id}
                    onClick={() => handleToggleFeaturedSlug(p.slug)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between gap-2 ${
                      isSelected
                        ? "bg-primary/10 border-primary text-title"
                        : "bg-background border-layer-border text-foreground hover:border-layer-border/80"
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold line-clamp-1">{p.name}</h4>
                      <p className="text-[10px] font-mono text-foreground opacity-60 mt-0.5">{p.category}</p>
                    </div>

                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-primary border-primary text-white" : "border-layer-border"
                      }`}
                    >
                      {isSelected && <CheckCircle2 size={12} />}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 bg-layer/95 backdrop-blur-md border border-layer-border rounded-2xl p-4 flex items-center justify-between shadow-2xl">
          <span className="text-xs text-foreground opacity-70 hidden sm:inline">
            Unsaved changes will not appear on the live site until submitted.
          </span>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/20 disabled:opacity-50 ml-auto"
          >
            <Save size={16} />
            {saving ? "Saving Changes..." : "Save Homepage Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
