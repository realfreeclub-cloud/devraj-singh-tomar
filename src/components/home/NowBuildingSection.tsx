"use client";

import { motion } from "framer-motion";
import { Activity, Terminal } from "lucide-react";

// Structured data source for active sprints
// Note: This data will connect to the Admin CMS in Phase 5
const currentSprints = [
  {
    title: "High-Concurrency Typing Module",
    target: "ngitedu.com",
    status: "Active Sprint",
    progress: "85%",
    desc: "Optimizing browser-level keystroke buffering and instantaneous WPM calculation algorithms under 2,000+ simultaneous student loads.",
  },
  {
    title: "Offline-First Haptic Sync Engine",
    target: "divyajap.com",
    status: "Active Testing",
    progress: "75%",
    desc: "Engineering IndexedDB local caching with Web Audio & device vibration APIs for zero-battery drain mantra chanting in remote areas.",
  },
  {
    title: "Zero-Trust Legal CSP Hardening",
    target: "lexinklegal.in",
    status: "Production Ready",
    progress: "95%",
    desc: "Enforcing strict Content Security Policies, cryptographic nonces, and structured legal service JSON-LD metadata for supreme SERP authority.",
  },
  {
    title: "WebMCP & Autonomous Agent Protocols",
    target: "devrajsinghtomar.com",
    status: "Active Deployment",
    progress: "90%",
    desc: "Enhancing client-side navigator.modelContext tool registration and automated markdown content negotiation for AI agents.",
  },
];

export default function NowBuildingSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4">
            <Activity size={14} className="animate-pulse" /> Live Development Log
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight">
            Now <span className="text-primary">Building</span>
          </h2>
        </div>
        <p className="text-sm sm:text-base text-foreground/80 max-w-md">
          A public window into active development sprints, architectural experiments, and platform enhancements.
        </p>
      </div>

      {/* Sprints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentSprints.map((sprint, i) => (
          <motion.div
            key={sprint.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-layer/40 border border-layer-border rounded-3xl p-8 hover:border-primary/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-primary font-bold">
                  {sprint.target}
                </span>
                <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-secondary border border-layer-border text-foreground/70">
                  {sprint.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-title mb-3">
                {sprint.title}
              </h3>

              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-6">
                {sprint.desc}
              </p>
            </div>

            <div>
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs font-bold mb-2 text-foreground/70">
                <span>Sprint Completion</span>
                <span className="text-primary">{sprint.progress}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: sprint.progress }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Structured Source Footnote */}
      <div className="mt-8 text-center text-xs text-foreground/50 flex items-center justify-center gap-2">
        <Terminal size={14} className="text-primary" />
        <span>Structured active sprint feed • CMS administration planned in Phase 5</span>
      </div>
    </section>
  );
}
