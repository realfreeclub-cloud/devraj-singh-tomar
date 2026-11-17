"use client";

import { motion } from "framer-motion";
import { Code2, Briefcase, Search, Zap, CheckCircle } from "lucide-react";

export default function ExpertiseSection() {
  const pillars = [
    {
      title: "Enterprise Full-Stack Architecture",
      subtitle: "Next.js 16 & React 19",
      icon: Code2,
      desc: "Architecting high-scale web platforms using Next.js App Router, React Server Components, TypeScript, and edge caching pipelines for sub-second global responses.",
      points: [
        "Server Components (RSC) & Streaming SSR",
        "Type-Safe Modular Architectures",
        "Sub-1s Largest Contentful Paint (LCP)",
        "Zero-Downtime Standalone Deployments",
      ],
    },
    {
      title: "Strategic IT Project Management",
      subtitle: "Disciplined Agile Execution",
      icon: Briefcase,
      desc: "Transforming high-level executive roadmaps into sprint milestones, unblocking engineering bottlenecks, and enforcing rigorous quality assurance.",
      points: [
        "Backlog Prioritization & Sprint Governance",
        "Technical Debt Elimination",
        "Cross-Functional Team Leadership",
        "Risk Mitigation & On-Time Delivery",
      ],
    },
    {
      title: "Algorithmic Technical SEO & AEO",
      subtitle: "Search & Answer Engine Dominance",
      icon: Search,
      desc: "Moving beyond basic keywords into structural data manipulation. Deep Schema.org JSON-LD integration engineered for Google AI Overviews and Voice Search.",
      points: [
        "Full Schema.org Knowledge Graph Injection",
        "Google Maps 3-Pack Local Authority",
        "Semantic HTML & Crawl Budget Optimization",
        "AI Summarizer & LLM Readability (llms.txt)",
      ],
    },
    {
      title: "Digital Product Engineering & Scaling",
      subtitle: "Performance & Conversion Optimization",
      icon: Zap,
      desc: "Building high-concurrency systems, real-time typing engines, offline-first PWA sync, and conversion-optimized sales funnels.",
      points: [
        "Ultra-Low Latency Keystroke & Event Engines",
        "Local-First PWA Offline Data Sync",
        "Conversion Rate Optimization (CRO) Layouts",
        "Zero-Trust Content Security Policies",
      ],
    },
  ];

  return (
    <section className="py-24 bg-secondary/30 border-y border-layer-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 inline-block">
            Strategic Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight mb-4">
            Technology &amp; Business <span className="text-primary">Expertise</span>
          </h2>
          <p className="text-foreground/80 text-base leading-relaxed">
            Where deep engineering execution meets commercial product strategy.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background border border-layer-border rounded-3xl p-8 lg:p-10 hover:border-primary/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-title">{pillar.title}</h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-layer-border space-y-2.5">
                  {pillar.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-2.5 text-xs font-medium text-foreground">
                      <CheckCircle size={15} className="text-primary shrink-0" />
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
