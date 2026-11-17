"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2
} from "lucide-react";
import { CmsNowBuilding } from "@/lib/cms/types";

export default function AdminNowBuildingPage() {
  const [items, setItems] = useState<CmsNowBuilding[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [editingItem, setEditingItem] = useState<Partial<CmsNowBuilding> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = () => {
    setLoading(true);
    fetch("/api/admin/now-building")
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch initiatives", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem({
      title: "",
      description: "",
      link: "",
      status: "Active Sprint",
      progress: 60,
      startDate: new Date().toISOString().slice(0, 10),
      lastUpdated: new Date().toISOString().slice(0, 10),
      isVisible: true,
      displayOrder: items.length + 1,
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CmsNowBuilding) => {
    setEditingItem({ ...item });
    setError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete initiative "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/now-building/${id}`, { method: "DELETE" });
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

  const handleToggleVisibility = async (item: CmsNowBuilding) => {
    try {
      const updated = { ...item, isVisible: !item.isVisible };
      const res = await fetch("/api/admin/now-building", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
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
      const res = await fetch("/api/admin/now-building", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save initiative");
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
            <Activity className="text-primary" size={28} />
            Now Building & Active Sprints
          </h1>
          <p className="text-foreground text-sm opacity-75 mt-1">
            Display live development sprints, experimental prototypes, and real-time product roadmaps on the homepage.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/20 w-fit"
        >
          <Plus size={18} />
          New Initiative
        </button>
      </div>

      {/* Grid of Initiatives */}
      {loading ? (
        <div className="p-12 text-center text-foreground opacity-60">Loading active sprints...</div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-layer-border rounded-2xl bg-layer/40">
          <Activity className="mx-auto text-foreground opacity-30 mb-3" size={36} />
          <p className="text-title font-semibold">No active initiatives found</p>
          <p className="text-foreground text-sm opacity-60 mt-1">Add your first active build sprint to display on the homepage.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-layer border rounded-2xl p-6 flex flex-col justify-between transition group relative ${
                item.isVisible ? "border-layer-border hover:border-primary/40" : "border-layer-border/50 opacity-60"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    {item.status}
                  </span>

                  <button
                    onClick={() => handleToggleVisibility(item)}
                    className="p-1.5 rounded-lg text-foreground hover:bg-secondary/50 transition"
                    title={item.isVisible ? "Visible on homepage (click to hide)" : "Hidden (click to show)"}
                  >
                    {item.isVisible ? <Eye size={16} className="text-emerald-400" /> : <EyeOff size={16} />}
                  </button>
                </div>

                <h3 className="text-lg font-bold text-title mb-2 group-hover:text-primary transition">
                  {item.title}
                </h3>

                <p className="text-sm text-foreground opacity-80 leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Progress Bar */}
                {typeof item.progress === "number" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-mono text-title opacity-70 mb-1">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, item.progress))}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] font-mono text-foreground opacity-50 pt-2 border-t border-layer-border/60">
                  <span>Started: {item.startDate}</span>
                  <span>Updated: {item.lastUpdated}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-layer-border flex items-center justify-between">
                <div>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      Project Link <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-xs text-foreground opacity-40">Internal Sprint</span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded-lg text-foreground hover:text-primary hover:bg-secondary/40 transition"
                    title="Edit Initiative"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-2 rounded-lg text-foreground hover:text-rose-400 hover:bg-rose-500/10 transition"
                    title="Delete Initiative"
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
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-layer border border-layer-border rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-layer-border">
              <h2 className="text-xl font-bold text-title flex items-center gap-2">
                <Activity className="text-primary" size={20} />
                {editingItem.id ? "Edit Initiative" : "New Active Sprint"}
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

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                  Initiative Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                  placeholder="e.g. Autonomous AI Code Reviewer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                  Strategic Scope & Description
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                  placeholder="Briefly describe what is being built, why, and current milestone..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Sprint Status Tag
                  </label>
                  <input
                    type="text"
                    value={editingItem.status || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                    placeholder="e.g. Active Sprint / Phase 2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Completion Progress (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingItem.progress ?? 50}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        progress: Math.min(100, Math.max(0, parseInt(e.target.value, 10) || 0)),
                      })
                    }
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                  Live Preview or GitHub Link (Optional)
                </label>
                <input
                  type="text"
                  value={editingItem.link || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                  className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={editingItem.startDate || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-title opacity-70 mb-1.5">
                    Last Updated Date
                  </label>
                  <input
                    type="date"
                    value={editingItem.lastUpdated || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, lastUpdated: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-sm text-title focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="visibleToggle"
                  checked={editingItem.isVisible ?? true}
                  onChange={(e) => setEditingItem({ ...editingItem, isVisible: e.target.checked })}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <label htmlFor="visibleToggle" className="text-sm font-medium text-title cursor-pointer">
                  Display actively on homepage Now Building section
                </label>
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
                  {saving ? "Saving..." : "Save Initiative"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
