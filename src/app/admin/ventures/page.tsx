"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  X,
  Rocket,
  Filter,
  Globe,
  Briefcase,
  AlertCircle
} from "lucide-react";
import { CmsVenture } from "@/lib/cms/types";

export default function AdminVenturesPage() {
  const [ventures, setVentures] = useState<CmsVenture[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  // Modal State
  const [editingVenture, setEditingVenture] = useState<Partial<CmsVenture> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchVentures = () => {
    setLoading(true);
    fetch("/api/admin/ventures")
      .then((res) => res.json())
      .then((data) => {
        setVentures(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch ventures", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVentures();
  }, []);

  const filteredVentures = useMemo(() => {
    return ventures.filter((v) => {
      const matchType = typeFilter === "All" || v.type === typeFilter;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.industry.toLowerCase().includes(q) ||
        v.role.toLowerCase().includes(q) ||
        v.desc.toLowerCase().includes(q);
      return matchType && matchSearch;
    });
  }, [ventures, typeFilter, search]);

  const handleOpenCreate = () => {
    setEditingVenture({
      name: "",
      category: "Venture",
      type: "business",
      industry: "",
      role: "Founder / Strategist",
      status: "Active & Scaling",
      statusColor: "emerald",
      website: "https://",
      domain: "",
      desc: "",
      contributions: [],
      displayOrder: ventures.length + 1,
      isPublished: true,
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v: CmsVenture) => {
    setEditingVenture({ ...v });
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete venture "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/ventures/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchVentures();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete venture");
      }
    } catch {
      alert("Failed to delete venture");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVenture) return;
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/ventures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingVenture),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save venture");
      }

      setIsModalOpen(false);
      setEditingVenture(null);
      fetchVentures();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-layer-border pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-title flex items-center gap-3">
            <Rocket className="text-primary" size={28} />
            Ventures & Products
          </h1>
          <p className="text-foreground text-sm opacity-75 mt-1">
            Manage your entrepreneurial ventures, digital platforms, strategic partnerships, and commercial milestones.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/20 w-fit"
        >
          <Plus size={18} />
          Add Venture
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground opacity-40" size={18} />
          <input
            type="text"
            placeholder="Search ventures, roles, industries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-layer border border-layer-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={16} className="text-foreground opacity-40 hidden sm:block" />
          <div className="flex flex-wrap gap-1.5 bg-layer border border-layer-border p-1 rounded-xl text-xs">
            {["All", "business", "product", "partnership", "milestone"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition ${
                  typeFilter === t
                    ? "bg-primary text-white shadow-sm"
                    : "text-foreground opacity-75 hover:opacity-100 hover:bg-secondary/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ventures Grid */}
      {loading ? (
        <div className="p-12 text-center text-foreground opacity-60">Loading ventures...</div>
      ) : filteredVentures.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-layer-border rounded-2xl bg-layer/40">
          <Rocket className="mx-auto text-foreground opacity-30 mb-3" size={36} />
          <p className="text-title font-semibold">No ventures found</p>
          <p className="text-foreground text-sm opacity-60 mt-1">Try tweaking your search or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVentures.map((v) => (
            <div
              key={v.id}
              className="bg-layer border border-layer-border rounded-2xl p-6 flex flex-col justify-between hover:border-primary/40 transition group relative"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-md bg-secondary text-primary font-bold">
                      {v.type}
                    </span>
                    <h3 className="text-lg font-bold text-title mt-2 group-hover:text-primary transition">
                      {v.name}
                    </h3>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                      v.statusColor === "emerald"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : v.statusColor === "amber"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : "bg-primary/10 text-primary border-primary/30"
                    }`}
                  >
                    {v.status}
                  </span>
                </div>

                <p className="text-xs text-foreground opacity-70 font-mono mb-2 flex items-center gap-1.5">
                  <Briefcase size={12} className="text-primary" />
                  {v.role} • {v.industry}
                </p>

                <p className="text-sm text-foreground opacity-80 line-clamp-3 mb-4 leading-relaxed">
                  {v.desc}
                </p>

                {v.contributions && v.contributions.length > 0 && (
                  <div className="space-y-1 mb-4 pt-3 border-t border-layer-border/60">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-title opacity-60">
                      Key Highlights
                    </p>
                    <ul className="text-xs text-foreground opacity-75 space-y-1">
                      {v.contributions.slice(0, 2).map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-primary mt-0.5">•</span>
                          <span className="line-clamp-1">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-layer-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {v.website && v.website !== "https://" && (
                    <a
                      href={v.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-secondary/50 text-foreground hover:text-primary transition"
                      title="Visit Website"
                    >
                      <Globe size={15} />
                    </a>
                  )}
                  {v.caseStudySlug && (
                    <Link
                      href={`/case-studies/${v.caseStudySlug}`}
                      target="_blank"
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      Case Study <ExternalLink size={11} />
                    </Link>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(v)}
                    className="p-2 rounded-lg text-foreground hover:text-primary hover:bg-secondary/40 transition"
                    title="Edit Venture"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(v.id, v.name)}
                    className="p-2 rounded-lg text-foreground hover:text-rose-400 hover:bg-rose-500/10 transition"
                    title="Delete Venture"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && editingVenture && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-layer border border-layer-border rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-layer-border">
              <h2 className="text-xl font-bold text-title flex items-center gap-2">
                <Rocket className="text-primary" size={20} />
                {editingVenture.id ? "Edit Venture" : "Create New Venture"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg hover:bg-secondary/40 text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Venture Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingVenture.name || ""}
                    onChange={(e) => setEditingVenture({ ...editingVenture, name: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                    placeholder="e.g. NGIT Global Services"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Type
                  </label>
                  <select
                    value={editingVenture.type || "business"}
                    onChange={(e) =>
                      setEditingVenture({
                        ...editingVenture,
                        type: e.target.value as CmsVenture["type"],
                      })
                    }
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                  >
                    <option value="business">Commercial Business</option>
                    <option value="product">Digital Product / SaaS</option>
                    <option value="partnership">Strategic Partnership</option>
                    <option value="milestone">Industry Milestone</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Role / Capacity
                  </label>
                  <input
                    type="text"
                    value={editingVenture.role || ""}
                    onChange={(e) => setEditingVenture({ ...editingVenture, role: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                    placeholder="e.g. Co-Founder & Tech Strategist"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Industry / Sector
                  </label>
                  <input
                    type="text"
                    value={editingVenture.industry || ""}
                    onChange={(e) => setEditingVenture({ ...editingVenture, industry: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                    placeholder="e.g. EdTech & Digital Skills"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Current Status Text
                  </label>
                  <input
                    type="text"
                    value={editingVenture.status || ""}
                    onChange={(e) => setEditingVenture({ ...editingVenture, status: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                    placeholder="e.g. Active & Scaling"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Status Color
                  </label>
                  <select
                    value={editingVenture.statusColor || "emerald"}
                    onChange={(e) => setEditingVenture({ ...editingVenture, statusColor: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                  >
                    <option value="emerald">Emerald (Active / Scaling)</option>
                    <option value="indigo">Indigo (Strategic / Advisory)</option>
                    <option value="amber">Amber (Incubating / Beta)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Website URL
                  </label>
                  <input
                    type="text"
                    value={editingVenture.website || ""}
                    onChange={(e) => setEditingVenture({ ...editingVenture, website: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                    placeholder="https://ngitedu.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Domain / Brand
                  </label>
                  <input
                    type="text"
                    value={editingVenture.domain || ""}
                    onChange={(e) => setEditingVenture({ ...editingVenture, domain: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                    placeholder="ngitedu.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                  Strategic Description
                </label>
                <textarea
                  rows={3}
                  value={editingVenture.desc || ""}
                  onChange={(e) => setEditingVenture({ ...editingVenture, desc: e.target.value })}
                  className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                  placeholder="Summarize the core market problem, model and strategic objective..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                  Key Strategic Contributions (One per line)
                </label>
                <textarea
                  rows={3}
                  value={(editingVenture.contributions || []).join("\n")}
                  onChange={(e) =>
                    setEditingVenture({
                      ...editingVenture,
                      contributions: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                    })
                  }
                  className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary font-mono text-xs"
                  placeholder="Architected end-to-end LMS platform&#10;Integrated Razorpay and automated student onboarding"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Related Case Study Slug (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingVenture.caseStudySlug || ""}
                    onChange={(e) =>
                      setEditingVenture({ ...editingVenture, caseStudySlug: e.target.value })
                    }
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                    placeholder="e.g. ngitedu-platform"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingVenture.displayOrder ?? 1}
                    onChange={(e) =>
                      setEditingVenture({
                        ...editingVenture,
                        displayOrder: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedToggle"
                  checked={editingVenture.isPublished ?? true}
                  onChange={(e) =>
                    setEditingVenture({ ...editingVenture, isPublished: e.target.checked })
                  }
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <label htmlFor="publishedToggle" className="text-sm font-medium text-title cursor-pointer">
                  Publish on public website (/ventures and homepage)
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-layer-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-layer-border text-foreground hover:bg-secondary/40 font-medium text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Venture"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
