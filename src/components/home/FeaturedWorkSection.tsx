"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Layers, ExternalLink } from "lucide-react";

export default function FeaturedWorkSection() {
  const projects = [
    {
      slug: "ngit-edu",
      name: "NGIT Edu",
      url: "ngitedu.com",
      category: "Education & Examinations",
      role: "Technical Architect & Engine Developer",
      desc: "High-concurrency government examination portal and online typing test evaluation software for SSC, Supreme Court & UP Police aspirants.",
      tech: ["Next.js", "Real-Time Typing", "Tailwind CSS", "Edge Cache"],
      impact: "0ms Keystroke Lag | 99.98% Exam Uptime",
    },
    {
      slug: "divyajap",
      name: "Divya Jap",
      url: "divyajap.com",
      category: "Spiritual Tech Platform",
      role: "Full-Stack System Architect",
      desc: "Global Vedic sadhana companion with real-time haptic Jap Mala counters, private family chanting circles, and synchronized temple sanghas.",
      tech: ["Next.js", "Local-First PWA", "Web Audio API", "Tailwind CSS"],
      impact: "100% Offline-Resilient | Scalable Sangha Aggregation",
    },
    {
      slug: "lexink-legal",
      name: "T&S Lex Ink Legal",
      url: "lexinklegal.in",
      category: "Corporate Law Advisory",
      role: "Digital Architect & Security Consultant",
      desc: "Full-service New Delhi law firm portal engineered with zero-trust confidentiality, sub-second Core Web Vitals, and B2B corporate inquiry workflows.",
      tech: ["Next.js", "Strict CSP", "Legal Schema JSON-LD", "Tailwind CSS"],
      impact: "100/100 Core Web Vitals | Zero Vulnerabilities",
    },
    {
      slug: "maz-dialysis-center",
      name: "MAZ Dialysis Center",
      url: "mazdialysiscenter.com",
      category: "Healthcare Infrastructure",
      role: "Healthcare Digital Partner",
      desc: "Digital presence and patient consultation portal for India's 3rd largest specialized dialysis center located in Pratapgarh, Uttar Pradesh.",
      tech: ["Next.js", "Medical Schema", "Local SEO", "Appointment UI"],
      impact: "5-Star Local Maps Scaling | Instant Patient Bookings",
    },
    {
      slug: "idps-pratapgarh",
      name: "IDPS Pratapgarh",
      url: "idpspratapgarh.com",
      category: "Institutional Education",
      role: "Lead School Systems Architect",
      desc: "Official digital school ecosystem for International Delhi Public School (IDPS) driving parent engagement and streamlined online admissions.",
      tech: ["Next.js", "School CMS", "Dynamic Admissions", "Tailwind CSS"],
      impact: "+300% Admission Inquiries | Seamless Mobile Portal",
    },
    {
      slug: "the-home-shifting",
      name: "The Home Shifting",
      url: "thehomeshifting.com",
      category: "Logistics & Moving Portal",
      role: "Full-Stack Performance Engineer",
      desc: "Nationwide relocation logistics platform eliminating mobile load bounce rates and maximizing localized quote conversion rates.",
      tech: ["Next.js", "Google Maps API", "Conversion UI", "Tailwind CSS"],
      impact: "Sub 1-sec Loads | 3x Inbound Quote Conversion",
    },
  ];

  return (
    <section id="featured-work" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Layers size={14} /> Selected Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight">
            Featured <span className="text-primary">Work</span>
          </h2>
        </div>
        <p className="text-sm sm:text-base text-foreground/80 max-w-md">
          Real platforms engineered for high availability, verified performance, and direct business results.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.url}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-layer/40 border border-layer-border rounded-3xl p-8 hover:border-primary/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
          >
            <div>
              {/* Category & Domain */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  {proj.category}
                </span>
                <span className="font-mono text-xs text-foreground/50 group-hover:text-primary transition-colors">
                  {proj.url}
                </span>
              </div>

              {/* Title & Role */}
              <h3 className="text-2xl font-bold text-title mb-1.5 group-hover:text-primary transition-colors">
                {proj.name}
              </h3>
              <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-4">
                Role: <span className="text-foreground/90 font-bold">{proj.role}</span>
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-6">
                {proj.desc}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-background border border-layer-border text-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom: Verified Impact & Links */}
            <div className="pt-6 border-t border-layer-border">
              <p className="text-xs font-bold text-primary mb-4 tracking-tight">
                {proj.impact}
              </p>
              <div className="flex items-center justify-between">
                <a
                  href={`https://${proj.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-title group-hover:text-primary transition-colors"
                >
                  Visit Live <ArrowUpRight size={14} />
                </a>
                <Link
                  href={`/case-studies/${proj.slug}`}
                  className="text-xs font-bold text-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Case Study →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Projects CTA */}
      <div className="mt-14 text-center">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-title hover:text-primary transition-colors px-6 py-3.5 rounded-full border border-layer-border hover:border-primary bg-secondary/40"
        >
          <span>View All 60+ Projects in Portfolio</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
