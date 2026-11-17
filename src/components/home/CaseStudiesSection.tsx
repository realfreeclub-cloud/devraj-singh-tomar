"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function CaseStudiesSection() {
  const deepStudies = [
    {
      title: "NGIT Edu – High-Concurrency Examination Engine",
      url: "ngitedu.com",
      tag: "EdTech & Real-Time Exam Architecture",
      problem: "During peak recruitment cycles for government exams (SSC, High Court, UP Police), hundreds of concurrent candidates faced server slowdowns, exam test interruptions, and erratic keystroke latency in legacy typing software.",
      solution: "Engineered a sub-millisecond typing test evaluation engine with client-side WPM/accuracy tracking and Next.js App Router for server-rendered curriculum modules. Implemented edge-cached question banks, real-time result generation, and instant certificate verification pipelines.",
      tools: ["Next.js", "TypeScript", "Real-Time Engine", "Tailwind CSS", "Edge Caching"],
      results: "0ms Keystroke Lag | 99.98% Exam Uptime | +240% Candidate Intake",
    },
    {
      title: "Divya Jap – Global Vedic Sadhana Platform",
      url: "divyajap.com",
      tag: "Spiritual Tech & Real-Time Sync Ecosystem",
      problem: "Devotees and temple sanghas lacked a synchronized digital platform for collective mantra japa. Existing counter apps drained mobile batteries, failed offline during travel, and compromised devotee privacy in group chanting circles.",
      solution: "Architected a lightweight, haptic-enabled digital Jap Mala and meditation companion with local-first offline persistence. Built privacy-first collective synchronization protocols for family circles and global temple sanghas with zero data exposure of individual identities.",
      tools: ["Next.js", "PWA / Local-First", "Web Audio & Haptics", "Tailwind CSS", "Edge Sync"],
      results: "Zero-Lag Haptic Taps | 100% Offline Resilient | Scalable Sangha Aggregation",
    },
    {
      title: "T&S Lex Ink Legal – Enterprise Legal Portal",
      url: "lexinklegal.in",
      tag: "Corporate Law Firm & Zero-Trust Portal",
      problem: "A premier corporate litigation and advisory firm needed an authoritative digital footprint, requiring uncompromising client confidentiality, zero vulnerability tolerance, and strict compliance with legal service standards.",
      solution: "Engineered an impenetrable, ultra-fast Next.js architecture featuring strict Content Security Policies (CSP), sub-second Core Web Vitals, encrypted inquiry workflows, and comprehensive LegalService structured data (JSON-LD) for corporate legal authority.",
      tools: ["Next.js", "Strict CSP Security", "Legal Schema JSON-LD", "Tailwind CSS", "Vercel Edge"],
      results: "100/100 Core Web Vitals | Zero Vulnerabilities | 4x B2B Inbound Inquiries",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 inline-block">
          Deep Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight mb-4">
          Selected <span className="text-primary">Case Studies</span>
        </h2>
        <p className="text-foreground/80 text-base leading-relaxed">
          Forensic breakdown of real architectural bottlenecks and engineered technical solutions.
        </p>
      </div>

      {/* Case Studies Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {deepStudies.map((study, i) => (
          <motion.div
            key={study.url}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-layer/50 border border-layer-border rounded-3xl p-8 flex flex-col justify-between hover:border-primary/50 transition-all hover:-translate-y-1 duration-300"
          >
            <div>
              {/* Category & Domain */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="text-xs font-black tracking-widest text-primary uppercase">
                  {study.tag}
                </span>
                <span className="font-mono text-xs text-foreground/50 shrink-0">
                  {study.url}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-title mb-6 leading-tight">
                {study.title}
              </h3>

              {/* Problem Block */}
              <div className="mb-6 p-4 rounded-2xl bg-background/80 border border-layer-border">
                <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-500 mb-2">
                  <AlertTriangle size={15} /> Critical Bottleneck
                </h4>
                <p className="text-foreground/80 leading-relaxed text-xs sm:text-sm">
                  {study.problem}
                </p>
              </div>

              {/* Solution Block */}
              <div className="mb-6 p-4 rounded-2xl bg-background/80 border border-layer-border">
                <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-500 mb-2">
                  <CheckCircle size={15} /> Engineered Solution
                </h4>
                <p className="text-foreground/80 leading-relaxed text-xs sm:text-sm">
                  {study.solution}
                </p>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-6 border-t border-layer-border">
              <p className="text-xs font-bold text-primary mb-4 tracking-tight">
                {study.results}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {study.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] font-bold tracking-widest uppercase bg-secondary/60 px-2 py-1 rounded text-foreground/70"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <a
                href={`https://${study.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-title font-bold uppercase tracking-widest text-xs hover:text-primary transition-colors"
              >
                Visit Live Portal <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
