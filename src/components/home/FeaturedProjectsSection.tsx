"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Code2, Globe, Layers } from "lucide-react";

export default function FeaturedProjectsSection() {
  const projects = [
    {
      name: "NGIT Edu",
      url: "ngitedu.com",
      cat: "EdTech & Examination Engine",
      tech: ["Next.js", "Real-Time Typing", "Edge Cache"],
      desc: "High-concurrency government examination portal and online typing test suite for SSC, Supreme Court & UP Police aspirants.",
      impact: "0ms Keystroke Lag | 99.98% Exam Uptime",
    },
    {
      name: "Divya Jap",
      url: "divyajap.com",
      cat: "Spiritual Tech Platform",
      tech: ["Next.js", "Local-First PWA", "Web Audio API"],
      desc: "Global Vedic sadhana companion with real-time haptic Jap Mala counters, private family chanting circles, and temple sanghas.",
      impact: "100% Offline-Resilient | Scalable Sangha Aggregation",
    },
    {
      name: "T&S Lex Ink Legal",
      url: "lexinklegal.in",
      cat: "Corporate Law Advisory",
      tech: ["Next.js", "Strict CSP", "Legal Schema JSON-LD"],
      desc: "Full-service New Delhi law firm portal engineered with zero-trust confidentiality, high-speed Core Web Vitals, and B2B lead pipelines.",
      impact: "100/100 Core Web Vitals | Zero Vulnerabilities",
    },
    {
      name: "MAZ Dialysis Center",
      url: "mazdialysiscenter.com",
      cat: "Healthcare Infrastructure",
      tech: ["Healthcare Next.js", "Medical Schema", "Local SEO"],
      desc: "Digital presence and patient consultation portal for India's 3rd largest specialized dialysis center located in Uttar Pradesh.",
      impact: "5-Star Local Maps Scaling | Instant Patient Bookings",
    },
    {
      name: "IDPS Pratapgarh",
      url: "idpspratapgarh.com",
      cat: "Institutional School Portal",
      tech: ["Next.js", "School CMS", "Dynamic Admissions"],
      desc: "Official digital school ecosystem for International Delhi Public School (IDPS) driving parent engagement and online admissions.",
      impact: "+300% Admission Inquiries | Seamless Mobile Portal",
    },
    {
      name: "The Home Shifting",
      url: "thehomeshifting.com",
      cat: "Logistics & Moving Portal",
      tech: ["Next.js", "Google Maps API", "Conversion UI"],
      desc: "Nationwide relocation logistics platform eliminating mobile load bounce rates and maximizing localized quote conversion rates.",
      impact: "Sub 1-sec Loads | 3x Inbound Quote Conversion",
    },
  ];

  return (
    <section id="featured-projects" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Layers size={14} /> Proven Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight">
            Featured <span className="text-primary">Projects</span>
          </h2>
        </div>
        <p className="text-sm sm:text-base text-foreground/80 max-w-md">
          A curated selection of mission-critical platforms, high-traffic portals, and bespoke digital architectures.
        </p>
      </div>

      {/* Projects Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.url}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-layer/50 border border-layer-border rounded-3xl p-8 hover:border-primary/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  {proj.cat}
                </span>
                <span className="font-mono text-xs text-foreground/50 group-hover:text-primary transition-colors">
                  {proj.url}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-title mb-3 group-hover:text-primary transition-colors">
                {proj.name}
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                {proj.desc}
              </p>

              {/* Tech Tags */}
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

            {/* Impact Metric & Link */}
            <div className="pt-6 border-t border-layer-border">
              <p className="text-xs font-bold text-primary mb-4 tracking-tight">
                {proj.impact}
              </p>
              <a
                href={`https://${proj.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-title group-hover:text-primary transition-colors"
              >
                Visit Live Platform <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View Full Portfolio Link */}
      <div className="mt-14 text-center">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-title hover:text-primary transition-colors px-6 py-3 rounded-full border border-layer-border hover:border-primary"
        >
          View All 60+ Projects in Portfolio <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
