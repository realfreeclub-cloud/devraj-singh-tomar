"use client";

import { motion } from "framer-motion";
import { Compass, Cpu, Users, TrendingUp } from "lucide-react";

export default function ProfessionalSnapshotSection() {
  const areas = [
    {
      title: "Technology Strategy",
      desc: "Aligning technical decisions with long-term commercial goals, architectural roadmaps, and scalable technology foundations.",
      icon: Compass,
    },
    {
      title: "Digital Product Development",
      desc: "Engineering full-stack web platforms and interactive applications built for high performance, usability, and speed.",
      icon: Cpu,
    },
    {
      title: "Project Leadership",
      desc: "Guiding multidisciplinary teams through agile sprints, disciplined delivery cycles, and zero-downtime production launches.",
      icon: Users,
    },
    {
      title: "Business Digital Transformation",
      desc: "Modernizing manual workflows, eliminating technical bottlenecks, and accelerating operational digital capability.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="about-snapshot" className="py-20 bg-secondary/30 border-y border-layer-border scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3 inline-block">
            Professional Snapshot
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-title uppercase tracking-tight">
            Strategic Focus &amp; <span className="text-primary">Capabilities</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-background border border-layer-border rounded-2xl p-6 lg:p-8 hover:border-primary/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-105 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-title mb-3 group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
