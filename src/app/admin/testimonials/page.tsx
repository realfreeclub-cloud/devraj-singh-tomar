"use client";

import { useState, useEffect } from "react";
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  Quote,
  Building,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { CmsTestimonial } from "@/lib/cms/types";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<CmsTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [editingItem, setEditingItem] = useState<Partial<CmsTestimonial> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/admin/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch testimonials", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem({
      name: "",
      designation: "Founder / Director",
      organization: "",
      content: "",
      photo: "",
      relatedProject: "",
      displayOrder: items.length + 1,
      status: "published",
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CmsTestimonial) => {
    setEditingItem({ ...item });
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete testimonial by "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchItems();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete item");
      }
    } catch {
      alert("Failed to delete item");
    }
  };

  const handleToggleStatus = async (item: CmsTestimonial) => {
    const nextStatus = item.status === "published" ? "draft" : "published";
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, status: nextStatus }),
      });
      if (res.ok) fetchItems();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save testimonial");
      }

      setIsModalOpen(false);
      setEditingItem(null);
      fetchItems();
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
            <Award className="text-primary" size={28} />
            Testimonials & Endorsements
          </h1>
          <p className="text-foreground text-sm opacity-75 mt-1">
            Manage genuine client reviews, stakeholder endorsements, and enterprise partner recommendations.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/20 w-fit"
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      {/* Grid of Testimonials */}
      {loading ? (
        <div className="p-12 text-center text-foreground opacity-60">Loading endorsements...</div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-layer-border rounded-2xl bg-layer/40">
          <Quote className="mx-auto text-foreground opacity-30 mb-3" size={36} />
          <p className="text-title font-semibold">No testimonials recorded yet</p>
          <p className="text-foreground text-sm opacity-60 mt-1">
            Add client endorsements to display credibility proofs across the platform.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-layer border rounded-2xl p-6 flex flex-col justify-between transition group relative ${
                item.status === "published"
                  ? "border-layer-border hover:border-primary/40"
                  : "border-layer-border/50 opacity-60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Quote size={20} />
                  </div>

                  <span
                    onClick={() => handleToggleStatus(item)}
                    className={`cursor-pointer text-[11px] font-semibold px-2.5 py-1 rounded-full border transition ${
                      item.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                        : "bg-secondary text-foreground opacity-60 border-layer-border hover:opacity-100"
                    }`}
                    title="Click to toggle published / draft"
                  >
                    {item.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>

                <p className="text-sm text-foreground opacity-85 italic mb-6 leading-relaxed">
                  &ldquo;{item.content}&rdquo;
                </p>

                <div className="pt-4 border-t border-layer-border/60">
                  <h4 className="font-bold text-title text-sm">{item.name}</h4>
                  <p className="text-xs text-foreground opacity-70 flex items-center gap-1.5 mt-0.5">
                    <Building size={12} className="text-primary" />
                    {item.designation} {item.organization && `• ${item.organization}`}
                  </p>
                  {item.relatedProject && (
                    <p className="text-[11px] font-mono text-primary mt-1">
                      Ref: {item.relatedProject}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-layer-border flex items-center justify-end gap-1">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-lg text-foreground hover:text-primary hover:bg-secondary/40 transition"
                  title="Edit Testimonial"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  className="p-2 rounded-lg text-foreground hover:text-rose-400 hover:bg-rose-500/10 transition"
                  title="Delete Testimonial"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-layer border border-layer-border rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-layer-border">
              <h2 className="text-xl font-bold text-title flex items-center gap-2">
                <Award className="text-primary" size={20} />
                {editingItem.id ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg hover:bg-secondary/40 text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Client / Partner Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                    placeholder="e.g. Rajesh Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Designation / Role
                  </label>
                  <input
                    type="text"
                    value={editingItem.designation || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, designation: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                    placeholder="e.g. Founder & Managing Director"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    value={editingItem.organization || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                    placeholder="e.g. NGIT Global"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Related Project (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingItem.relatedProject || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, relatedProject: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                    placeholder="e.g. ngitedu.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                  Endorsement Content / Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.content || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary leading-relaxed"
                  placeholder="Paste the genuine feedback received from client or partner..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Photo URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingItem.photo || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, photo: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                    placeholder="/uploads/client-avatar.jpg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Status
                  </label>
                  <select
                    value={editingItem.status || "published"}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        status: e.target.value as "published" | "draft",
                      })
                    }
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

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
                  {saving ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
