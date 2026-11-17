"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, ExternalLink } from "lucide-react";

export default function VenturesProductsSection() {
  const ventures = [
    {
      name: "Tecxontechnology",
      category: "Enterprise IT & Engineering",
      url: "https://tecxontech.com/",
      domain: "tecxontech.com",
      desc: "Delivering technology solutions, enterprise web development, and digital consulting services for growing businesses.",
    },
    {
      name: "M/S Career Avsar",
      category: "EdTech & Talent Infrastructure",
      url: "https://careeravsar.com/",
      domain: "careeravsar.com",
      desc: "Providing technology solutions, educator recruitment platforms, and institutional digital services.",
    },
    {
      name: "Lotus Loop Media Solution",
      category: "Performance Media & Digital Scaling",
      url: "https://lotusloop.in/",
      domain: "lotusloop.in",
      desc: "Delivering media and digital scaling services, growth funnels, and brand visibility architectures in Noida.",
    },
  ];

  return (
    <section id="ventures" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 inline-block">
            Commercial Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight">
            Ventures &amp; <span className="text-primary">Products</span>
          </h2>
        </div>
        <p className="text-sm sm:text-base text-foreground/80 max-w-md">
          Commercial partnerships and technology-driven companies operating across diverse digital sectors.
        </p>
      </div>

      {/* Ventures Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ventures.map((venture, i) => (
          <motion.div
            key={venture.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-layer/40 border border-layer-border rounded-3xl p-8 hover:border-primary/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300 relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  {venture.category}
                </span>
                <span className="font-mono text-xs text-foreground/50">
                  {venture.domain}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-title mb-3 group-hover:text-primary transition-colors">
                {venture.name}
              </h3>

              <p className="text-sm text-foreground/80 leading-relaxed mb-8">
                {venture.desc}
              </p>
            </div>

            <div className="pt-6 border-t border-layer-border">
              <a
                href={venture.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-title text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all border border-layer-border"
              >
                Visit Website <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
