"use client";

import { motion } from "framer-motion";
import { SearchCheck, PenTool, Cpu, TrendingUp } from "lucide-react";

export default function HowIWorkSection() {
  const steps = [
    {
      step: "01",
      title: "Understand the Problem",
      subtitle: "Diagnosis & Discovery",
      icon: SearchCheck,
      desc: "Deep diving into business objectives, existing technical friction, workflow inefficiencies, and user expectations before committing to an architectural direction.",
      focus: "Requirements, Bottleneck Analysis, User Journeys",
    },
    {
      step: "02",
      title: "Plan the Solution",
      subtitle: "Architecture & Specification",
      icon: PenTool,
      desc: "Selecting the optimal technology stack, modeling database schemas, mapping component hierarchies, and creating structured delivery roadmaps.",
      focus: "Tech Stack, Data Architecture, Sprint Planning",
    },
    {
      step: "03",
      title: "Build & Execute",
      subtitle: "High-Velocity Engineering",
      icon: Cpu,
      desc: "Developing clean, type-safe, and modular Next.js applications with automated testing, responsive layouts, and rigorous quality assurance at every sprint.",
      focus: "Clean Next.js Code, TypeScript, Component Design",
    },
    {
      step: "04",
      title: "Improve & Scale",
      subtitle: "Deployment, AEO & Growth",
      icon: TrendingUp,
      desc: "Deploying to high-availability environments, implementing Core Web Vitals optimizations, setting up Schema.org SEO, and scaling with user feedback.",
      focus: "Zero-Downtime Launch, SEO/AEO, Performance Tuning",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30 border-y border-layer-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 inline-block">
            Process &amp; Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight mb-4">
            How <span className="text-primary">I Work</span>
          </h2>
          <p className="text-foreground/80 text-base leading-relaxed">
            A structured, four-step engineering methodology that brings clarity, discipline, and predictability to every digital initiative.
          </p>
        </div>

        {/* 4 Connected Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-background border border-layer-border rounded-3xl p-8 hover:border-primary/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300 relative"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-primary/40 group-hover:text-primary transition-colors">
                      {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
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
                    Key Deliverable: <strong className="text-title">{s.focus}</strong>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
