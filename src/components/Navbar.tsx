"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, ArrowRight, MessageSquare } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: isHome ? "#about-snapshot" : "/about" },
    { label: "Work", href: isHome ? "#featured-work" : "/case-studies" },
    { label: "Expertise", href: isHome ? "#what-i-do" : "/expertise" },
    { label: "Ventures", href: isHome ? "#ventures" : "/ventures" },
    { label: "Insights", href: isHome ? "#insights" : "/blog" },
    { label: "Contact", href: isHome ? "#contact" : "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-layer-border shadow-sm py-3.5"
          : "bg-background/60 backdrop-blur-sm border-b border-layer-border/50 py-4 lg:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-opacity hover:opacity-90"
          aria-label="Devraj Singh Tomar - Home"
        >
          <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
            <span className="font-extrabold text-primary text-sm tracking-tighter">DT</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-title text-base sm:text-lg tracking-tight leading-tight group-hover:text-primary transition-colors">
              Devraj Singh <span className="text-primary">Tomar</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/60 hidden sm:block">
              Technology Strategist
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || (isHome && link.href.startsWith("#"));

            return (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-foreground hover:text-primary hover:bg-secondary/60 transition-all"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Primary CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-primary/20 text-foreground hover:text-primary transition-all border border-layer-border"
            aria-label="Toggle Theme"
          >
            {!isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Primary CTA */}
          <Link
            href={isHome ? "#contact" : "/contact"}
            className="inline-flex items-center gap-2 bg-primary text-background font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-white transition-all shadow-sm hover:shadow-primary/20"
          >
            <span>Let&apos;s Discuss a Project</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary text-foreground border border-layer-border"
            aria-label="Toggle Theme"
          >
            {!isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary text-title border border-layer-border"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-layer-border bg-background/95 backdrop-blur-xl px-6 py-6 transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-title hover:bg-secondary/70 hover:text-primary transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-foreground/30 text-xs">→</span>
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-layer-border">
              <Link
                href={isHome ? "#contact" : "/contact"}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-background font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl hover:bg-white transition-all"
              >
                <span>Let&apos;s Discuss a Project</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
