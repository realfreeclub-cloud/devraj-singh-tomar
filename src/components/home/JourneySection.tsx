"use client";

import { motion } from "framer-motion";
import { Milestone, GraduationCap, Shield, Award, Rocket, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function JourneySection() {
  const milestones = [
    {
      year: "2018",
      title: "Foundations & The Early Spark",
      location: "Kudri, Jhansi, UP",
      icon: GraduationCap,
      desc: "First in entire village to pursue formal computer education. Supported by father's vision, attended 6 AM winter coaching classes. Completed O Level & CCC certifications at NGIT Allahabad and engineered first working website.",
    },
    {
      year: "2019",
      title: "The Unconventional Choice",
      location: "Prayagraj, UP",
      icon: Shield,
      desc: "Successfully cleared the demanding Air Force Y Group defense exam. Chose to reject conventional government security to follow a deep passion for software engineering, web architectures, and tech entrepreneurship.",
    },
    {
      year: "2020 — 2022",
      title: "Public Infrastructure & Noida Transition",
      location: "Noida / Delhi-NCR",
      icon: Award,
      desc: "Transitioned to Noida. Partnered and engineered high-availability digital portals for 7 Government Medical Colleges in Uttar Pradesh. Built technical infrastructure for regional schools and commercial enterprises.",
    },
    {
      year: "2023 — 2024",
      title: "Venture Co-Founding & Scale",
      location: "Noida, UP",
      icon: Rocket,
      desc: "Co-founded Lotus Loop Media Solution in Noida. Established technology leadership at M/S Career Avsar and Tecxontechnology. Handled end-to-end IT infrastructure and algorithmic marketing for 40+ client organizations.",
    },
    {
      year: "2025 — 2026",
      title: "AI-Ready Ecosystems & 60+ Portals",
      location: "Global & India",
      icon: Milestone,
      desc: "Architecting high-concurrency examination engines (ngitedu.com), offline-first spiritual tech (divyajap.com), and zero-trust legal portals (lexinklegal.in). Pioneering WebMCP and LLM machine-readable architectures.",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30 border-y border-layer-border">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 inline-block">
            Proven Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight mb-4">
            Professional <span className="text-primary">Journey</span>
          </h2>
          <p className="text-foreground/80 text-base leading-relaxed">
            From humble beginnings in a small village to architecting mission-critical platforms and tech ventures.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-8 space-y-12">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8 sm:pl-10"
              >
                {/* Node Pill */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary shadow-md">
                  <Icon size={14} />
                </div>

                {/* Card */}
                <div className="bg-background border border-layer-border rounded-3xl p-6 sm:p-8 hover:border-primary/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary text-background font-black text-xs uppercase tracking-wider">
                      {m.year}
                    </span>
                    <span className="text-xs font-mono text-foreground/50">
                      {m.location}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-title mb-3">
                    {m.title}
                  </h3>

                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Read Full Bio Link */}
        <div className="mt-14 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary hover:underline"
          >
            Read the complete biographical story on the About page →
          </Link>
        </div>
      </div>
    </section>
  );
}
