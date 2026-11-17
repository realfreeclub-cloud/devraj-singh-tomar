"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Save,
  CheckCircle2,
  AlertCircle,
  Globe,
  Share2,
  ShieldAlert,
  ExternalLink,
  Plus
} from "lucide-react";
import { CmsSeoSettings } from "@/lib/cms/types";

const STANDARD_ROUTES = [
  { path: "/", label: "Homepage (/)" },
  { path: "/about", label: "About Page (/about)" },
  { path: "/case-studies", label: "Project Explorer (/case-studies)" },
  { path: "/expertise", label: "Expertise & Services (/expertise)" },
  { path: "/ventures", label: "Ventures & Ecosystem (/ventures)" },
  { path: "/blog", label: "Insights & Blog (/blog)" },
  { path: "/contact", label: "Contact & Collaboration (/contact)" },
];

export default function AdminSeoPage() {
  const [seoData, setSeoData] = useState<CmsSeoSettings>({});
  const [selectedRoute, setSelectedRoute] = useState<string>("/");
  const [customRouteInput, setCustomRouteInput] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchSeo = () => {
    setLoading(true);
    fetch("/api/admin/seo")
      .then((res) => res.json())
      .then((data) => {
        setSeoData(data || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load SEO settings", err);
        setErrorMsg("Failed to load SEO metadata.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSeo();
  }, []);

  const currentConfig = seoData[selectedRoute] || {
    title: "",
    description: "",
    canonical: `https://devrajsinghtomar.com${selectedRoute === "/" ? "" : selectedRoute}`,
    ogImage: "/og-image.png",
    noIndex: false,
  };

  const handleFieldChange = (field: string, value: string | boolean) => {
    setSeoData({
      ...seoData,
      [selectedRoute]: {
        ...currentConfig,
        [field]: value,
      },
    });
  };

  const handleAddCustomRoute = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = customRouteInput.trim();
    if (!cleaned) return;
    const formatted = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
    if (!seoData[formatted]) {
      setSeoData({
        ...seoData,
        [formatted]: {
          title: `Devraj Singh Tomar | ${formatted}`,
          description: "",
          canonical: `https://devrajsinghtomar.com${formatted}`,
          ogImage: "/og-image.png",
          noIndex: false,
        },
      });
    }
    setSelectedRoute(formatted);
    setCustomRouteInput("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seoData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update SEO metadata");
      }

      const updated = await res.json();
      setSeoData(updated);
      setSuccessMsg("Search engine optimization & metadata successfully saved!");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error saving SEO settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-foreground opacity-60">Loading SEO metadata...</div>;
  }

  const titleLength = currentConfig.title?.length || 0;
  const descLength = currentConfig.description?.length || 0;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="border-b border-layer-border pb-6">
        <h1 className="text-3xl font-extrabold text-title flex items-center gap-3">
          <Search className="text-primary" size={28} />
          SEO, Meta Tags & Social Previews
        </h1>
        <p className="text-foreground text-sm opacity-75 mt-1">
          Manage search engine indexability, Google snippet titles, meta descriptions, and OpenGraph social share cards per route.
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

      {/* Route Selector Tabs */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70">
          Select Route to Configure
        </label>
        <div className="flex flex-wrap gap-2">
          {STANDARD_ROUTES.map((r) => (
            <button
              key={r.path}
              type="button"
              onClick={() => setSelectedRoute(r.path)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition ${
                selectedRoute === r.path
                  ? "bg-primary text-white shadow-md shadow-primary/20 font-semibold"
                  : "bg-layer border border-layer-border text-foreground hover:bg-secondary/40"
              }`}
            >
              {r.label}
            </button>
          ))}

          {/* Any custom routes in seoData */}
          {Object.keys(seoData)
            .filter((p) => !STANDARD_ROUTES.some((sr) => sr.path === p))
            .map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setSelectedRoute(p)}
                className={`px-4 py-2 rounded-xl text-xs font-medium font-mono transition ${
                  selectedRoute === p
                    ? "bg-primary text-white shadow-md shadow-primary/20 font-semibold"
                    : "bg-layer border border-layer-border text-foreground hover:bg-secondary/40"
                }`}
              >
                {p}
              </button>
            ))}
        </div>

        {/* Add Custom Route Form */}
        <div className="pt-2 flex items-center gap-2 max-w-sm">
          <input
            type="text"
            placeholder="/custom-landing-page"
            value={customRouteInput}
            onChange={(e) => setCustomRouteInput(e.target.value)}
            className="flex-1 bg-background border border-layer-border rounded-xl px-3 py-1.5 text-xs text-title focus:outline-none focus:border-primary font-mono"
          />
          <button
            type="button"
            onClick={handleAddCustomRoute}
            className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs transition flex items-center gap-1"
          >
            <Plus size={14} /> Add Route
          </button>
        </div>
      </div>

      {/* GOOGLE SEARCH SERP PREVIEW */}
      <div className="bg-layer border border-layer-border rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-layer-border pb-3">
          <div className="flex items-center gap-2 text-title font-bold text-sm">
            <Globe className="text-primary" size={18} />
            Google Search SERP Preview
          </div>
          <span className="text-[11px] font-mono text-foreground opacity-50">
            Route: {selectedRoute}
          </span>
        </div>

        {/* Mock SERP Box */}
        <div className="bg-background border border-layer-border/80 rounded-xl p-5 max-w-2xl font-sans">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">
              D
            </div>
            <div className="text-xs text-foreground opacity-70 truncate font-mono">
              https://devrajsinghtomar.com{selectedRoute === "/" ? "" : selectedRoute}
            </div>
          </div>
          <h3 className="text-base text-blue-400 hover:underline cursor-pointer font-medium leading-snug mb-1">
            {currentConfig.title || "Devraj Singh Tomar | Technology Strategist & Entrepreneur"}
          </h3>
          <p className="text-xs text-foreground opacity-80 leading-relaxed line-clamp-2">
            {currentConfig.description ||
              "Official strategic portfolio of Devraj Singh Tomar. Turning business ideas into practical technology solutions and scalable digital products."}
          </p>
        </div>
      </div>

      {/* FORM INPUTS */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-layer border border-layer-border rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-title opacity-70">
                Page Title Tag (&lt;title&gt;) *
              </label>
              <span
                className={`text-[11px] font-mono ${
                  titleLength >= 50 && titleLength <= 60
                    ? "text-emerald-400 font-bold"
                    : titleLength > 65
                    ? "text-rose-400"
                    : "text-foreground opacity-50"
                }`}
              >
                {titleLength} / 60 chars (Optimal: 50-60)
              </span>
            </div>
            <input
              type="text"
              required
              value={currentConfig.title || ""}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary font-medium"
              placeholder="e.g. Case Studies & Technology Architecture | Devraj Singh Tomar"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-title opacity-70">
                Meta Description Tag *
              </label>
              <span
                className={`text-[11px] font-mono ${
                  descLength >= 140 && descLength <= 160
                    ? "text-emerald-400 font-bold"
                    : descLength > 165
                    ? "text-rose-400"
                    : "text-foreground opacity-50"
                }`}
              >
                {descLength} / 160 chars (Optimal: 140-160)
              </span>
            </div>
            <textarea
              rows={3}
              required
              value={currentConfig.description || ""}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary leading-relaxed"
              placeholder="Summarize the core focus of this page with key strategic keywords..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Canonical URL
              </label>
              <input
                type="text"
                value={currentConfig.canonical || ""}
                onChange={(e) => handleFieldChange("canonical", e.target.value)}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary font-mono text-xs"
                placeholder="https://devrajsinghtomar.com/..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                Social Share Image (OG Image URL)
              </label>
              <input
                type="text"
                value={currentConfig.ogImage || ""}
                onChange={(e) => handleFieldChange("ogImage", e.target.value)}
                className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary font-mono text-xs"
                placeholder="/og-image.png or /uploads/..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="noIndexToggle"
              checked={currentConfig.noIndex || false}
              onChange={(e) => handleFieldChange("noIndex", e.target.checked)}
              className="rounded text-rose-500 focus:ring-rose-500 w-4 h-4"
            />
            <label htmlFor="noIndexToggle" className="text-xs font-medium text-title cursor-pointer flex items-center gap-1.5">
              <ShieldAlert size={15} className="text-amber-400" />
              Exclude from search engine indexing (Add <code className="text-amber-400 font-mono text-[11px]">noindex, nofollow</code> meta tag)
            </label>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 bg-layer/95 backdrop-blur-md border border-layer-border rounded-2xl p-4 flex items-center justify-between shadow-2xl">
          <span className="text-xs text-foreground opacity-70 hidden sm:inline">
            Saving updates the live server-rendered metadata tags for all visitors and crawlers.
          </span>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/20 disabled:opacity-50 ml-auto"
          >
            <Save size={16} />
            {saving ? "Saving Changes..." : "Save SEO Metadata"}
          </button>
        </div>
      </form>
    </div>
  );
}
