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
  BookOpen,
  Filter,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { CmsProject } from "@/lib/cms/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<CmsProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal State
  const [editingProject, setEditingProject] = useState<Partial<CmsProject> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = () => {
    setLoading(true);
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = categoryFilter === "All" || p.category === categoryFilter;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [projects, search, categoryFilter]);

  const handleOpenCreate = () => {
    setEditingProject({
      name: "",
      slug: "",
      url: "",
      category: "Education",
      industry: "Technology",
      role: "Technical Architect",
      desc: "",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      impact: "",
      featured: false,
      status: "published",
      hasCaseStudy: false,
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: CmsProject) => {
    setEditingProject({ ...proj });
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch {
      alert("Error deleting project");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.name || !editingProject?.slug) {
      setError("Project Name and Slug are required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save project");
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-layer-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-title uppercase tracking-tight">
            Project &amp; Case Study <span className="text-primary">Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-foreground/70 mt-1">
            Create, edit, feature, and publish web platforms and deep architectural case studies.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-primary text-background font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus size={15} /> Add New Project
        </button>
      </div>

      {/* 2. SEARCH & FILTER BAR */}
      <div className="p-4 sm:p-6 rounded-3xl bg-secondary/15 border border-layer-border flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by name, slug, role..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-layer-border rounded-xl text-xs text-title focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
          <Filter size={14} className="text-primary shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors shrink-0 ${
                categoryFilter === cat
                  ? "bg-primary text-background"
                  : "bg-layer/40 text-foreground/70 border border-layer-border hover:border-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PROJECTS TABLE */}
      <div className="rounded-4xl bg-secondary/15 border border-layer-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-layer/40 border-b border-layer-border text-foreground/50 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-4 px-6">Project Name &amp; Domain</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Verified Role</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4 text-center">Case Study</th>
                <th className="py-4 px-4 text-center">Featured</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-layer-border">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-layer/20 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-title block text-sm">{p.name}</span>
                    <span className="font-mono text-[11px] text-foreground/50">{p.url}</span>
                  </td>
                  <td className="py-4 px-4 text-foreground/80 font-medium">{p.category}</td>
                  <td className="py-4 px-4 text-foreground/80 font-medium truncate max-w-xs">{p.role}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      p.status === "published"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-secondary/40 text-foreground/50"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {p.hasCaseStudy ? (
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase">
                        Yes
                      </span>
                    ) : (
                      <span className="text-foreground/30 font-mono">—</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {p.featured ? (
                      <span className="text-primary font-bold">★ Yes</span>
                    ) : (
                      <span className="text-foreground/30">No</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/case-studies/${p.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-secondary/40 hover:text-primary transition-colors text-foreground/60"
                        title="View Public Page"
                      >
                        <ExternalLink size={13} />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-secondary/40 hover:text-primary transition-colors text-foreground/60"
                        title="Edit Project"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg bg-secondary/40 hover:text-red-400 transition-colors text-foreground/60"
                        title="Delete Project"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center text-foreground/50 text-xs">
            No projects found matching your query.
          </div>
        )}
      </div>

      {/* 4. CREATE / EDIT MODAL DRAWER */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-layer border border-layer-border rounded-4xl w-full max-w-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-layer-border">
              <h2 className="text-xl font-bold text-title uppercase">
                {editingProject.id ? "Edit Project" : "Create New Project"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-foreground/40 hover:text-primary">
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">Project Name *</label>
                  <input
                    type="text"
                    value={editingProject.name || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                    required
                    className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">Slug *</label>
                  <input
                    type="text"
                    value={editingProject.slug || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    required
                    className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">Live Domain/URL</label>
                  <input
                    type="text"
                    value={editingProject.url || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, url: e.target.value })}
                    placeholder="example.com"
                    className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">Category</label>
                  <select
                    value={editingProject.category || "Education"}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none"
                  >
                    <option value="Education">Education</option>
                    <option value="Business & Services">Business &amp; Services</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Legal">Legal</option>
                    <option value="Startups">Startups</option>
                    <option value="Personal Brands">Personal Brands</option>
                    <option value="Media & News">Media &amp; News</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">Verified Role</label>
                  <input
                    type="text"
                    value={editingProject.role || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                    placeholder="e.g. Technical Architect"
                    className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">Short Description</label>
                <textarea
                  value={editingProject.desc || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, desc: e.target.value })}
                  rows={3}
                  className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(editingProject.tech) ? editingProject.tech.join(", ") : ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    placeholder="Next.js, TypeScript, Tailwind"
                    className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">Impact Metric Badge</label>
                  <input
                    type="text"
                    value={editingProject.impact || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, impact: e.target.value })}
                    placeholder="0ms Keystroke Lag | 99.98% Uptime"
                    className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-secondary/20 border border-layer-border">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured || false}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span className="font-bold text-title">Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.hasCaseStudy || false}
                    onChange={(e) => setEditingProject({ ...editingProject, hasCaseStudy: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span className="font-bold text-title">Enable Deep Case Study Page</span>
                </label>

                <div className="ml-auto flex items-center gap-2">
                  <span className="font-bold text-foreground/60">Status:</span>
                  <select
                    value={editingProject.status || "published"}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as "published" | "draft" })}
                    className="p-1.5 bg-background border border-layer-border rounded-lg text-title font-bold text-xs"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-layer-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-secondary/40 text-foreground font-bold hover:bg-secondary/60 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-primary text-background font-bold uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
