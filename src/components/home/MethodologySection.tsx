"use client";

import { motion } from "framer-motion";
import { SearchCheck, Network, Cpu, Rocket } from "lucide-react";

export default function MethodologySection() {
  const steps = [
    {
      step: "01",
      title: "Strategic Discovery & Audit",
      subtitle: "Uncovering Core Bottlenecks",
      icon: SearchCheck,
      desc: "Every successful project begins with ruthless diagnostic clarity. We audit legacy codebases, identify database bottlenecks, benchmark Core Web Vitals, and evaluate algorithmic visibility.",
      deliverable: "Technical Debt & Opportunity Audit",
    },
    {
      step: "02",
      title: "Architecture & Schema Design",
      subtitle: "Blueprint for Scale",
      icon: Network,
      desc: "Designing the full technical framework before writing code. Defining Server Component hierarchies, data flow pipelines, strict CSP security, and complete Schema.org JSON-LD models.",
      deliverable: "System Architecture Specification",
    },
    {
      step: "03",
      title: "High-Velocity Engineering",
      subtitle: "Precision Next.js Execution",
      icon: Cpu,
      desc: "Implementing modular, type-safe Next.js and React architectures with continuous automated linting and incremental builds. Prioritizing instant mobile load times and clean codebases.",
      deliverable: "Production-Grade Codebase",
    },
    {
      step: "04",
      title: "Deployment & Growth Scaling",
      subtitle: "Zero-Downtime Launch & AEO",
      icon: Rocket,
      desc: "Deploying standalone Node.js environments with automated CI/CD. Activating Google Knowledge Panel signals, sitemap syndication, and continuous uptime monitoring.",
      deliverable: "Live High-Availability Platform",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 inline-block">
          Execution Blueprint
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight mb-4">
          Working <span className="text-primary">Methodology</span>
        </h2>
        <p className="text-foreground/80 text-base leading-relaxed">
          A disciplined, four-stage engineering framework that eliminates project risk and guarantees predictable execution.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-layer/40 border border-layer-border rounded-3xl p-8 hover:border-primary/50 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-black text-primary/40 group-hover:text-primary transition-colors">
                    {s.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-title mb-1.5">{s.title}</h3>
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
                  {s.subtitle}
                </h4>

                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-6">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-layer-border">
                <span className="text-[11px] font-semibold text-foreground/60 uppercase tracking-wider block">
                  Output: <strong className="text-title">{s.deliverable}</strong>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
