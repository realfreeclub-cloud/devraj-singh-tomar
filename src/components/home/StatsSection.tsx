"use client";

import { motion } from "framer-motion";
import { Award, Building2, TrendingUp, Calendar, CheckCircle2 } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      num: "60+",
      label: "Delivered Platforms",
      desc: "High-performance institutional portals, SaaS architectures, and commercial web apps.",
      icon: Award,
    },
    {
      num: "7",
      label: "Govt. Medical Colleges",
      desc: "Mission-critical public health institutional portals engineered for high availability.",
      icon: Building2,
    },
    {
      num: "80M+",
      label: "Impression Engine",
      desc: "Engineered algorithmic reach across search engines and multi-platform growth funnels.",
      icon: TrendingUp,
    },
    {
      num: "7+ Years",
      label: "Technical Leadership",
      desc: "Proven track record managing agile lifecycles and digital transformation since 2018.",
      icon: Calendar,
    },
  ];

  return (
    <section className="py-20 border-y border-layer-border bg-secondary/20">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background border border-layer-border rounded-3xl p-8 hover:border-primary/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-black text-title tracking-tight mb-2">
                    {stat.num}
                  </h3>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                    {stat.label}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed pt-4 border-t border-layer-border">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
