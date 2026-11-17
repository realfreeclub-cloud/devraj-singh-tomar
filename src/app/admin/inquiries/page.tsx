"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Download,
  Filter,
  MessageSquare,
  Clock,
  Mail,
  Phone,
  Building,
  Trash2,
  Eye,
  CheckCircle2,
  X,
  FileText
} from "lucide-react";
import { CmsInquiry } from "@/lib/cms/types";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<CmsInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Detail Modal
  const [activeInquiry, setActiveInquiry] = useState<CmsInquiry | null>(null);
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes] = useState("");

  const fetchInquiries = () => {
    setLoading(true);
    fetch("/api/admin/inquiries")
      .then((res) => res.json())
      .then((data) => {
        setInquiries(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load inquiries", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const statuses = ["All", "New", "Contacted", "In Discussion", "Converted", "Closed", "Spam"];

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchStatus = statusFilter === "All" || inq.status === statusFilter;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        inq.referenceId.toLowerCase().includes(q) ||
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.subject?.toLowerCase().includes(q) ||
        inq.message.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [inquiries, search, statusFilter]);

  const handleOpenDetail = (inq: CmsInquiry) => {
    setActiveInquiry(inq);
    setNotes(inq.internalNotes || "");
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdating(true);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus as CmsInquiry["status"] } : i))
        );
        if (activeInquiry && activeInquiry.id === id) {
          setActiveInquiry({ ...activeInquiry, status: newStatus as CmsInquiry["status"] });
        }
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeInquiry) return;
    setUpdating(true);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: activeInquiry.id, internalNotes: notes }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === activeInquiry.id ? { ...i, internalNotes: notes } : i))
        );
        alert("Internal notes updated.");
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string, ref: string) => {
    if (!confirm(`Are you sure you want to delete inquiry "${ref}"?`)) return;

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries(inquiries.filter((i) => i.id !== id));
        if (activeInquiry?.id === id) setActiveInquiry(null);
      }
    } catch {
      alert("Failed to delete inquiry.");
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-layer-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-title uppercase tracking-tight">
            Inquiries <span className="text-primary">CRM</span>
          </h1>
          <p className="text-xs sm:text-sm text-foreground/70 mt-1">
            Track, triage, and manage commercial inbound project inquiries from contact channels.
          </p>
        </div>

        <a
          href="/api/admin/inquiries/export"
          target="_blank"
          className="px-4 py-2.5 rounded-xl bg-secondary/40 hover:bg-primary hover:text-background text-title font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 self-start sm:self-auto border border-layer-border"
        >
          <Download size={14} /> Export CSV
        </a>
      </div>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <div className="p-4 sm:p-6 rounded-3xl bg-secondary/15 border border-layer-border flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by sender, email, subject, or ref code..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-layer-border rounded-xl text-xs text-title focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          <Filter size={14} className="text-primary shrink-0 mr-1" />
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors shrink-0 ${
                statusFilter === st
                  ? "bg-primary text-background"
                  : "bg-layer/40 text-foreground/70 border border-layer-border hover:border-primary"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 3. INQUIRIES LIST TABLE */}
      <div className="rounded-4xl bg-secondary/15 border border-layer-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-layer/40 border-b border-layer-border text-foreground/50 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-4 px-6">Reference &amp; Date</th>
                <th className="py-4 px-4">Sender &amp; Organization</th>
                <th className="py-4 px-4">Subject</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-layer-border">
              {filteredInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-layer/20 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono font-bold text-primary block text-sm">{inq.referenceId}</span>
                    <span className="text-[11px] text-foreground/50">{new Date(inq.createdAt).toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-title block">{inq.name}</span>
                    <span className="text-[11px] text-foreground/60">{inq.email}</span>
                  </td>
                  <td className="py-4 px-4 text-foreground/85 font-medium truncate max-w-xs">{inq.subject}</td>
                  <td className="py-4 px-4 text-center">
                    <select
                      value={inq.status}
                      onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border bg-background ${
                        inq.status === "New"
                          ? "text-primary border-primary/30"
                          : inq.status === "Converted"
                          ? "text-green-400 border-green-500/30"
                          : "text-foreground/70 border-layer-border"
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                      <option value="Spam">Spam</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenDetail(inq)}
                        className="p-1.5 rounded-lg bg-secondary/40 hover:text-primary transition-colors text-foreground/60"
                        title="View Full Details"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(inq.id, inq.referenceId)}
                        className="p-1.5 rounded-lg bg-secondary/40 hover:text-red-400 transition-colors text-foreground/60"
                        title="Delete Inquiry"
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

        {filteredInquiries.length === 0 && (
          <div className="p-12 text-center text-foreground/50 text-xs">
            No inquiries matching the current criteria.
          </div>
        )}
      </div>

      {/* 4. DETAILS DRAWER / MODAL */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-layer border border-layer-border rounded-4xl w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-layer-border">
              <div>
                <span className="font-mono text-xs font-bold text-primary block">
                  {activeInquiry.referenceId}
                </span>
                <h2 className="text-xl font-bold text-title">{activeInquiry.subject}</h2>
              </div>
              <button onClick={() => setActiveInquiry(null)} className="text-foreground/40 hover:text-primary">
                <X size={20} />
              </button>
            </div>

            {/* Sender Meta Matrix */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-secondary/20 border border-layer-border text-xs">
              <div>
                <span className="text-foreground/50 block font-semibold">Sender Name</span>
                <p className="font-bold text-title">{activeInquiry.name}</p>
              </div>
              <div>
                <span className="text-foreground/50 block font-semibold">Email</span>
                <a href={`mailto:${activeInquiry.email}`} className="font-bold text-primary hover:underline">
                  {activeInquiry.email}
                </a>
              </div>
              {activeInquiry.phone && (
                <div>
                  <span className="text-foreground/50 block font-semibold">Phone</span>
                  <p className="font-bold text-title">{activeInquiry.phone}</p>
                </div>
              )}
              {activeInquiry.organization && (
                <div>
                  <span className="text-foreground/50 block font-semibold">Organization</span>
                  <p className="font-bold text-title">{activeInquiry.organization}</p>
                </div>
              )}
              <div>
                <span className="text-foreground/50 block font-semibold">Received Date</span>
                <p className="text-foreground/80">{new Date(activeInquiry.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-foreground/50 block font-semibold">Submission Source</span>
                <p className="text-foreground/80">{activeInquiry.source}</p>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-foreground/60 block mb-2">
                Message Content:
              </span>
              <div className="p-4 rounded-2xl bg-background border border-layer-border text-xs sm:text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                {activeInquiry.message}
              </div>
            </div>

            {/* Internal Notes */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/60 block mb-2">
                Internal Private Notes (Not visible to sender):
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add private consultation notes, scheduled calls, lead stage..."
                className="w-full p-3 bg-background border border-layer-border rounded-xl text-xs text-title focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={updating}
                className="mt-2 px-4 py-2 rounded-lg bg-secondary/40 hover:bg-primary hover:text-background text-xs font-bold transition-colors"
              >
                {updating ? "Saving..." : "Save Notes"}
              </button>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-layer-border">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-foreground/60">Update Status:</span>
                <select
                  value={activeInquiry.status}
                  onChange={(e) => handleUpdateStatus(activeInquiry.id, e.target.value)}
                  className="p-2 bg-background border border-layer-border rounded-lg text-title font-bold text-xs"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                  <option value="Spam">Spam</option>
                </select>
              </div>

              <button
                onClick={() => setActiveInquiry(null)}
                className="px-5 py-2.5 rounded-xl bg-primary text-background font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
