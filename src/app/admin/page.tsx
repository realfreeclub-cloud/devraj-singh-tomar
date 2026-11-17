"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderGit2,
  BookOpen,
  Rocket,
  MessageSquare,
  Award,
  ArrowRight,
  Plus,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalVentures: number;
  totalTestimonials: number;
  totalInquiries: number;
  unreadInquiries: number;
  recentInquiries: Array<{
    id: string;
    referenceId: string;
    name: string;
    email: string;
    subject: string;
    status: string;
    createdAt: string;
  }>;
  recentProjects: Array<{
    id: string;
    slug: string;
    name: string;
    category: string;
    status: string;
    updatedAt: string;
  }>;
  recentArticles: Array<{
    id: string;
    slug: string;
    title: string;
    category: string;
    status: string;
    updatedAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    setLoading(true);
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load dashboard stats", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-10">
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-layer-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-title uppercase tracking-tight">
            Dashboard <span className="text-primary">Overview</span>
          </h1>
          <p className="text-xs sm:text-sm text-foreground/70 mt-1">
            Real-time portfolio statistics, recent inquiries, and quick management controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            className="p-2.5 rounded-xl bg-secondary/30 hover:bg-secondary/60 text-foreground/80 hover:text-primary transition-colors inline-flex items-center gap-1.5 text-xs font-bold"
            title="Refresh Data"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/projects"
            className="px-4 py-2.5 rounded-xl bg-primary text-background font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors inline-flex items-center gap-1.5"
          >
            <Plus size={14} /> New Project
          </Link>
        </div>
      </div>

      {/* 2. REAL STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {/* Projects */}
        <div className="p-6 rounded-3xl bg-layer/40 border border-layer-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-primary mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground/60">Projects</span>
            <FolderGit2 size={18} />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-title mb-1">
              {stats?.totalProjects ?? 0}
            </div>
            <p className="text-[11px] text-foreground/60">
              <strong className="text-green-400">{stats?.publishedProjects ?? 0}</strong> published • {stats?.draftProjects ?? 0} drafts
            </p>
          </div>
        </div>

        {/* Articles */}
        <div className="p-6 rounded-3xl bg-layer/40 border border-layer-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-primary mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground/60">Insights / Articles</span>
            <BookOpen size={18} />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-title mb-1">
              {stats?.totalArticles ?? 0}
            </div>
            <p className="text-[11px] text-foreground/60">
              <strong className="text-green-400">{stats?.publishedArticles ?? 0}</strong> published • {stats?.draftArticles ?? 0} drafts
            </p>
          </div>
        </div>

        {/* Inquiries */}
        <div className="p-6 rounded-3xl bg-layer/40 border border-layer-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-primary mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground/60">Inquiries CRM</span>
            <MessageSquare size={18} />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-title mb-1">
              {stats?.totalInquiries ?? 0}
            </div>
            <p className="text-[11px] text-foreground/60">
              <strong className="text-primary">{stats?.unreadInquiries ?? 0} new</strong> awaiting response
            </p>
          </div>
        </div>

        {/* Ventures */}
        <div className="p-6 rounded-3xl bg-layer/40 border border-layer-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-primary mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground/60">Ventures &amp; Products</span>
            <Rocket size={18} />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-title mb-1">
              {stats?.totalVentures ?? 0}
            </div>
            <p className="text-[11px] text-foreground/60">
              {stats?.totalTestimonials ?? 0} client testimonials
            </p>
          </div>
        </div>
      </div>

      {/* 3. QUICK ACTIONS GRID */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
          Quick Management Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/projects"
            className="p-4 rounded-2xl bg-secondary/20 border border-layer-border hover:border-primary/50 transition-all text-center group"
          >
            <FolderGit2 size={20} className="text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-title block">Add Project</span>
          </Link>

          <Link
            href="/admin/blog"
            className="p-4 rounded-2xl bg-secondary/20 border border-layer-border hover:border-primary/50 transition-all text-center group"
          >
            <BookOpen size={20} className="text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-title block">Write Article</span>
          </Link>

          <Link
            href="/admin/ventures"
            className="p-4 rounded-2xl bg-secondary/20 border border-layer-border hover:border-primary/50 transition-all text-center group"
          >
            <Rocket size={20} className="text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-title block">Add Venture</span>
          </Link>

          <Link
            href="/admin/inquiries"
            className="p-4 rounded-2xl bg-secondary/20 border border-layer-border hover:border-primary/50 transition-all text-center group"
          >
            <MessageSquare size={20} className="text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-title block">View Inquiries</span>
          </Link>

          <Link
            href="/admin/homepage"
            className="p-4 rounded-2xl bg-secondary/20 border border-layer-border hover:border-primary/50 transition-all text-center group"
          >
            <FolderGit2 size={20} className="text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-title block">Homepage CMS</span>
          </Link>

          <Link
            href="/admin/media"
            className="p-4 rounded-2xl bg-secondary/20 border border-layer-border hover:border-primary/50 transition-all text-center group"
          >
            <FolderGit2 size={20} className="text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-title block">Media Library</span>
          </Link>
        </div>
      </div>

      {/* 4. RECENT INQUIRIES SECTION */}
      <div className="p-6 sm:p-8 rounded-4xl bg-secondary/15 border border-layer-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-extrabold text-title uppercase tracking-tight">
              Latest Contact Inquiries
            </h2>
            <p className="text-xs text-foreground/60">Real submissions received through website forms.</p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight size={13} />
          </Link>
        </div>

        {stats?.recentInquiries && stats.recentInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-layer-border text-foreground/50 uppercase font-mono text-[10px]">
                <tr>
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Sender</th>
                  <th className="pb-3">Subject</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-layer-border">
                {stats.recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-layer/30 transition-colors">
                    <td className="py-3 font-mono font-bold text-primary">{inq.referenceId}</td>
                    <td className="py-3 font-semibold text-title">{inq.name}</td>
                    <td className="py-3 text-foreground/80 truncate max-w-xs">{inq.subject}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        inq.status === "New"
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-secondary/40 text-foreground/70"
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-foreground/50">{new Date(inq.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center border border-dashed border-layer-border rounded-2xl text-foreground/50 text-xs">
            No inquiries received yet. Submit a message from the public <Link href="/contact" className="text-primary underline">/contact</Link> page to test!
          </div>
        )}
      </div>

      {/* 5. RECENT ACTIVITY DUAL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="p-6 sm:p-8 rounded-4xl bg-secondary/15 border border-layer-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-title uppercase tracking-tight">Recent Projects</h3>
            <Link href="/admin/projects" className="text-xs font-bold text-primary hover:underline">Manage</Link>
          </div>
          <div className="space-y-3">
            {stats?.recentProjects.map((p) => (
              <div key={p.id} className="p-3.5 rounded-2xl bg-layer/30 border border-layer-border flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-title block">{p.name}</span>
                  <span className="text-[11px] text-foreground/50">{p.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-500/10 text-green-400 border border-green-500/20">
                    {p.status}
                  </span>
                  <Link href={`/case-studies/${p.slug}`} target="_blank" className="text-foreground/40 hover:text-primary">
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="p-6 sm:p-8 rounded-4xl bg-secondary/15 border border-layer-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-title uppercase tracking-tight">Recent Articles</h3>
            <Link href="/admin/blog" className="text-xs font-bold text-primary hover:underline">Manage</Link>
          </div>
          <div className="space-y-3">
            {stats?.recentArticles.map((a) => (
              <div key={a.id} className="p-3.5 rounded-2xl bg-layer/30 border border-layer-border flex items-center justify-between text-xs">
                <div className="truncate max-w-[240px]">
                  <span className="font-bold text-title block truncate">{a.title}</span>
                  <span className="text-[11px] text-foreground/50">{a.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-500/10 text-green-400 border border-green-500/20">
                    {a.status}
                  </span>
                  <Link href={`/blog/${a.slug}`} target="_blank" className="text-foreground/40 hover:text-primary">
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
