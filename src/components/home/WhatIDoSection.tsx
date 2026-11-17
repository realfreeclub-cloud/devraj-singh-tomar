"use client";

import { motion } from "framer-motion";
import { Compass, Code2, RefreshCw, Briefcase, Bot, TrendingUp, CheckCircle } from "lucide-react";

export default function WhatIDoSection() {
  const capabilities = [
    {
      title: "Technology Consulting & Strategy",
      desc: "Evaluating technical feasibility, selecting appropriate modern stacks, auditing infrastructure vulnerabilities, and defining scalable technical roadmaps that prevent expensive rewrites.",
      icon: Compass,
      points: ["Stack Selection & Evaluation", "Architecture Roadmapping", "Cost & Scale Optimization"],
    },
    {
      title: "Web Applications & Platforms",
      desc: "Engineering full-stack web applications using Next.js App Router, React Server Components, and TypeScript. Delivering sub-second load times and resilient multi-device responsiveness.",
      icon: Code2,
      points: ["Modern Next.js Architecture", "API Integration & Data Flow", "Sub-Second LCP Performance"],
    },
    {
      title: "Digital Transformation",
      desc: "Replacing fragile spreadsheets, paper forms, and fragmented manual processes with unified digital portals, secure role-based portals, and centralized operational dashboards.",
      icon: RefreshCw,
      points: ["Legacy Workflow Migration", "Custom Administrative Portals", "Operational Centralization"],
    },
    {
      title: "Product & Project Management",
      desc: "Governing the complete development lifecycle from initial scope definition to final deployment. Prioritizing backlogs, tracking sprint velocity, and maintaining strict quality standards.",
      icon: Briefcase,
      points: ["Sprint Governance & Backlogs", "Quality Assurance Oversight", "Predictable On-Time Delivery"],
    },
    {
      title: "Business Automation",
      desc: "Connecting disparate systems, automating customer inquiry routing, integrating WhatsApp and email pipelines, and eliminating redundant administrative tasks.",
      icon: Bot,
      points: ["Inquiry Routing Automation", "Workflow & Notification Hooks", "Data Validation & Hygiene"],
    },
    {
      title: "Digital Growth & Online Presence",
      desc: "Architecting structural SEO directly into web platforms via Schema.org JSON-LD and clean metadata hierarchy, establishing algorithmic authority across search engines and AI assistants.",
      icon: TrendingUp,
      points: ["Technical & Local SEO Architecture", "Google Maps 3-Pack Authority", "Answer Engine Optimization (AEO)"],
    },
  ];

  return (
    <section id="what-i-do" className="py-24 bg-secondary/30 border-y border-layer-border scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 inline-block">
            Services &amp; Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight mb-4">
            What <span className="text-primary">I Do</span>
          </h2>
          <p className="text-foreground/80 text-base leading-relaxed">
            Practical technology execution designed to solve operational friction, accelerate products, and drive commercial growth.
          </p>
        </div>

        {/* 6 Capabilities Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-background border border-layer-border rounded-3xl p-8 hover:border-primary/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-105 transition-transform">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-title mb-3 group-hover:text-primary transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-6">
                    {cap.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-layer-border space-y-2">
                  {cap.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                      <CheckCircle size={14} className="text-primary shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
