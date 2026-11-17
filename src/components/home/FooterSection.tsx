"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/case-studies" },
    { label: "Services", href: "/services" },
    { label: "Ventures", href: "/ventures" },
    { label: "Blog", href: "/blog" },
    { label: "Hire Me", href: "/hire" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/devraj-singh-tomar-it/" },
    { name: "GitHub", href: "https://github.com/devrajsingh-tomar" },
    { name: "Dev.to", href: "https://dev.to/devraj_singh_tomar" },
    { name: "Medium", href: "https://medium.com/@devrajsinghtomar" },
    { name: "Facebook", href: "https://www.facebook.com/DevrajSinghTomarIT" },
    { name: "Instagram", href: "https://www.instagram.com/devraj_singh_tomar__/" },
  ];

  return (
    <footer className="border-t border-layer-border bg-secondary/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-layer-border">
          
          {/* Col 1: Identity & Statement (5 cols) */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-4">
              <span className="font-extrabold text-title text-xl tracking-tight uppercase">
                Devraj Singh <span className="text-primary">Tomar</span>
              </span>
            </Link>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
              Technology Strategist &amp; Entrepreneur
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed mb-6 max-w-sm">
              &ldquo;I turn business ideas into practical technology solutions and scalable digital products.&rdquo;
            </p>
            <p className="text-xs text-foreground/60 leading-relaxed">
              chokhani square, 309, Sector 18, Noida, Uttar Pradesh 201301, India
            </p>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-title mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Verified Social Links & Machine Endpoints (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-title mb-4">
              Connect &amp; Social
            </h4>
            <div className="grid grid-cols-2 gap-2.5 text-xs font-medium mb-6">
              {socialLinks.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  <span>{soc.name}</span>
                  <ArrowUpRight size={12} className="opacity-60" />
                </a>
              ))}
            </div>

            <h4 className="text-xs font-bold uppercase tracking-widest text-title mb-3">
              Machine Endpoints
            </h4>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-foreground/70">
              <Link href="/llms.txt" className="hover:text-primary underline">
                /llms.txt
              </Link>
              <span>•</span>
              <Link href="/sitemap.xml" className="hover:text-primary underline">
                /sitemap.xml
              </Link>
              <span>•</span>
              <Link href="/api/mcp" className="hover:text-primary underline">
                /api/mcp
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Contact */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/60">
          <p>
            &copy; {currentYear} Devraj Singh Tomar. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:hello@devrajsinghtomar.com" className="hover:text-primary transition-colors">
              hello@devrajsinghtomar.com
            </a>
            <span>•</span>
            <a href="tel:+919140946121" className="hover:text-primary transition-colors">
              +91 9140946121
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
