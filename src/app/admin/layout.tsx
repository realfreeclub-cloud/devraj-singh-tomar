"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  Rocket,
  MessageSquare,
  Activity,
  Award,
  Image as ImageIcon,
  Home,
  User,
  Search,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  const isLoginPage = pathname === "/admin/login";

  // Check auth session
  useEffect(() => {
    if (isLoginPage) return;

    fetch("/api/admin/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Projects & Cases", href: "/admin/projects", icon: FolderGit2 },
    { label: "Insights & Blog", href: "/admin/blog", icon: BookOpen },
    { label: "Ventures", href: "/admin/ventures", icon: Rocket },
    { label: "Inquiries CRM", href: "/admin/inquiries", icon: MessageSquare },
    { label: "Now Building", href: "/admin/now-building", icon: Activity },
    { label: "Testimonials", href: "/admin/testimonials", icon: Award },
    { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    { label: "Homepage", href: "/admin/homepage", icon: Home },
    { label: "Profile & Bio", href: "/admin/profile", icon: User },
    { label: "SEO Metadata", href: "/admin/seo", icon: Search },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-layer-border bg-layer/90 backdrop-blur-md sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2 font-extrabold text-title uppercase text-sm">
          <ShieldCheck size={18} className="text-primary" />
          <span>Devraj CMS</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-secondary/40 text-foreground hover:text-primary"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-layer/95 border-r border-layer-border p-6 flex flex-col justify-between z-50 backdrop-blur-md transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Logo */}
          <div className="pb-6 mb-6 border-b border-layer-border">
            <Link href="/admin" className="flex items-center gap-2.5 font-extrabold text-title uppercase text-sm tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <div>
                <span className="block leading-none">Devraj Singh</span>
                <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Admin CMS</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-none pr-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-background font-bold shadow-md"
                      : "text-foreground/70 hover:bg-secondary/40 hover:text-title"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-background" : "text-primary/70"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & User info */}
        <div className="pt-4 border-t border-layer-border space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-secondary/30 text-xs font-semibold text-foreground/80 hover:text-primary transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={13} /> View Live Website
            </span>
          </a>

          <div className="flex items-center justify-between px-2 pt-1">
            <div className="text-[11px] truncate max-w-[130px]">
              <span className="font-bold text-title block truncate">{user?.username || "Admin"}</span>
              <span className="text-foreground/50 truncate block">{user?.email || "Signed in"}</span>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg bg-secondary/40 hover:bg-red-500/10 hover:text-red-400 text-foreground/60 transition-colors"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-10 lg:p-12 max-w-7xl mx-auto w-full overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
