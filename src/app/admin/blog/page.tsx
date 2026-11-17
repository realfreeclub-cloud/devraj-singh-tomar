"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  AlertCircle
} from "lucide-react";
import { CmsArticle } from "@/lib/cms/types";

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<CmsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Editor Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<CmsArticle> | null>(null);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchArticles = () => {
    setLoading(true);
    fetch("/api/admin/blog")
      .then((res) => res.json())
      .then((data) => {
        setArticles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch articles", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const q = search.toLowerCase().trim();
      return (
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    });
  }, [articles, search]);

  const handleOpenCreate = () => {
    setEditingArticle({
      title: "",
      slug: "",
      description: "",
      category: "Technology",
      readTime: "6 min read",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      dateISO: new Date().toISOString().split("T")[0],
      keywords: ["Technology", "Architecture"],
      content: "<h2>Introduction</h2>\n<p>Start writing your strategic article here...</p>",
      status: "published",
      featured: false,
    });
    setError("");
    setActiveTab("write");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (art: CmsArticle) => {
    setEditingArticle({ ...art });
    setError("");
    setActiveTab("write");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setArticles(articles.filter((a) => a.id !== id));
      } else {
        alert("Failed to delete article");
      }
    } catch {
      alert("Error deleting article");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle?.title || !editingArticle?.slug) {
      setError("Title and Slug are required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingArticle),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save article");
      }

      setIsModalOpen(false);
      fetchArticles();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save article");
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
            Insights &amp; Blog <span className="text-primary">Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-foreground/70 mt-1">
            Author, edit, format, and publish strategic essays and technical field notes.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-primary text-background font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus size={15} /> Write New Article
        </button>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="p-4 sm:p-6 rounded-3xl bg-secondary/15 border border-layer-border flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, slug, or category..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-layer-border rounded-xl text-xs text-title focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* 3. ARTICLES LIST TABLE */}
      <div className="rounded-4xl bg-secondary/15 border border-layer-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-layer/40 border-b border-layer-border text-foreground/50 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-4 px-6">Article Title &amp; Slug</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Publication Date</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4 text-center">Featured</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-layer-border">
              {filteredArticles.map((art) => (
                <tr key={art.id} className="hover:bg-layer/20 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-title block text-sm">{art.title}</span>
                    <span className="font-mono text-[11px] text-foreground/50">/blog/{art.slug}</span>
                  </td>
                  <td className="py-4 px-4 text-foreground/80 font-medium">{art.category}</td>
                  <td className="py-4 px-4 text-foreground/80 font-medium">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {art.date}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      art.status === "published"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-secondary/40 text-foreground/50"
                    }`}>
                      {art.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {art.featured ? (
                      <span className="text-primary font-bold">★ Spotlight</span>
                    ) : (
                      <span className="text-foreground/30">—</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${art.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-secondary/40 hover:text-primary transition-colors text-foreground/60"
                        title="View Live Article"
                      >
                        <ExternalLink size={13} />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(art)}
                        className="p-1.5 rounded-lg bg-secondary/40 hover:text-primary transition-colors text-foreground/60"
                        title="Edit Article"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(art.id, art.title)}
                        className="p-1.5 rounded-lg bg-secondary/40 hover:text-red-400 transition-colors text-foreground/60"
                        title="Delete Article"
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
      </div>

      {/* 4. ARTICLE EDITOR MODAL */}
      {isModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-layer border border-layer-border rounded-4xl w-full max-w-4xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-layer-border">
              <h2 className="text-xl font-bold text-title uppercase">
                {editingArticle.id ? "Edit Article" : "Write New Strategic Essay"}
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
                  <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">Article Title *</label>
                  <input
                    type="text"
                    value={editingArticle.title || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    required
                    className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">URL Slug *</label>
                  <input
                    type="text"
                    value={editingArticle.slug || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    required
                    className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">Description / Meta Excerpt</label>
                <textarea
                  value={editingArticle.description || ""}
                  onChange={(e) => setEditingArticle({ ...editingArticle, description: e.target.value })}
                  rows={2}
                  className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">Category</label>
                  <select
                    value={editingArticle.category || "Technology"}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none"
                  >
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Strategy">Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">Read Time</label>
                  <input
                    type="text"
                    value={editingArticle.readTime || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                    placeholder="8 min read"
                    className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-foreground/70 block mb-1.5">Display Date</label>
                  <input
                    type="text"
                    value={editingArticle.date || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                    placeholder="Nov 18, 2026"
                    className="w-full p-3 bg-background border border-layer-border rounded-xl text-title focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* EDITOR TAB TOGGLES */}
              <div className="pt-2">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-layer-border">
                  <span className="font-bold uppercase tracking-wider text-foreground/70">Article Body Content</span>
                  <div className="flex rounded-lg bg-secondary/40 p-1 border border-layer-border">
                    <button
                      type="button"
                      onClick={() => setActiveTab("write")}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-colors ${
                        activeTab === "write" ? "bg-primary text-background" : "text-foreground/70"
                      }`}
                    >
                      Code / HTML Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("preview")}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase transition-colors ${
                        activeTab === "preview" ? "bg-primary text-background" : "text-foreground/70"
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>
                </div>

                {activeTab === "write" ? (
                  <textarea
                    value={editingArticle.content || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                    rows={12}
                    className="w-full p-4 bg-background border border-layer-border rounded-2xl text-title focus:border-primary focus:outline-none font-mono text-xs leading-relaxed"
                  />
                ) : (
                  <div
                    className="p-6 rounded-2xl bg-background border border-layer-border prose prose-sm max-w-none max-h-96 overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: editingArticle.content || "<p>Empty</p>" }}
                  />
                )}
              </div>

              {/* Status & Featured */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-secondary/20 border border-layer-border">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingArticle.featured || false}
                      onChange={(e) => setEditingArticle({ ...editingArticle, featured: e.target.checked })}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="font-bold text-title">Spotlight on Insights Page</span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground/60">Status:</span>
                  <select
                    value={editingArticle.status || "published"}
                    onChange={(e) => setEditingArticle({ ...editingArticle, status: e.target.value as "published" | "draft" })}
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
                  {saving ? "Saving..." : "Save & Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
