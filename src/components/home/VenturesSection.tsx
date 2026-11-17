"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function VenturesSection() {
  const ventures = [
    {
      title: "Tecxontechnology",
      category: "Enterprise IT & Engineering",
      url: "https://tecxontech.com/",
      domain: "tecxontech.com",
      desc: "Delivering full-stack software development, custom web applications, cloud infrastructure management, and IT consulting services for growing businesses.",
      role: "Founder & Technology Lead",
      focus: "Cloud Systems, Custom Web Apps, Enterprise Engineering",
    },
    {
      title: "M/S Career Avsar",
      category: "EdTech & Talent Infrastructure",
      url: "https://careeravsar.com/",
      domain: "careeravsar.com",
      desc: "Premier educator recruitment platform and digital printing ecosystem connecting verified educational institutions with qualified academic leaders across India.",
      role: "Strategic Partner & Head of Technology",
      focus: "Recruitment Portal, Candidate Matching, Institutional Tech",
    },
    {
      title: "Lotus Loop Media Solution",
      category: "Performance Media & Digital Scaling",
      url: "https://lotusloop.in/",
      domain: "lotusloop.in",
      desc: "Comprehensive digital scaling and media authority agency in Noida, orchestrating high-ROI paid acquisition funnels, brand architecture, and multi-channel campaigns.",
      role: "Co-Founder & Strategic Director",
      focus: "Growth Marketing, Client Acquisition, Brand Scaling",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30 border-y border-layer-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 inline-block">
              Commercial Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight">
              Business <span className="text-primary">Ventures</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-foreground/80 max-w-md">
            Active tech companies and strategic business partnerships founded and scaled across diverse digital sectors.
          </p>
        </div>

        {/* Ventures Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ventures.map((venture, i) => (
            <motion.div
              key={venture.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background border border-layer-border rounded-3xl p-8 hover:border-primary/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300 relative overflow-hidden"
            >
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/15 transition-colors -z-0" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    {venture.category}
                  </span>
                  <span className="font-mono text-xs text-foreground/50">
                    {venture.domain}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-title mb-2 group-hover:text-primary transition-colors">
                  {venture.title}
                </h3>
                
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-4">
                  {venture.role}
                </p>

                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  {venture.desc}
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-layer-border">
                <p className="text-xs font-medium text-foreground/60 mb-4">
                  <strong className="text-title font-semibold">Focus:</strong> {venture.focus}
                </p>
                <a
                  href={venture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-title text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all border border-layer-border"
                >
                  Visit Venture <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
