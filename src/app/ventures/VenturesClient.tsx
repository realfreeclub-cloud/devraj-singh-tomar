"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Rocket,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Users,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Globe,
  Briefcase,
  Code2
} from "lucide-react";
import { useState } from "react";

export default function VenturesClient() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const ventures = [
    {
      name: "Lotus Loop Media Solutions",
      category: "Co-Founded Business",
      type: "business",
      industry: "Digital Agency & Marketing Solutions",
      role: "Co-Founder & Technical Head",
      status: "Active & Scaling",
      statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
      website: "https://lotusloop.in",
      domain: "lotusloop.in",
      desc: "Premier digital agency and growth consulting enterprise co-founded in Noida with Tushar Nagpal (September 2025). Specializes in high-end technical architectures, enterprise legal portals, and digital transformation initiatives.",
      contributions: [
        "Directing core technical architecture and web engineering.",
        "Delivered zero-trust legal portal for T&S Lex Ink Legal.",
        "Engineered multi-channel inbound customer acquisition pipelines.",
      ],
      caseStudySlug: "lexink-legal",
      caseStudyName: "T&S Lex Ink Legal Case Study",
    },
    {
      name: "Tecxontechnology",
      category: "Proprietary Consultancy",
      type: "business",
      industry: "Software Engineering & IT Architecture",
      role: "Founder & Principal Architect",
      status: "Active",
      statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
      website: "https://tecxontech.com/",
      domain: "tecxontech.com",
      desc: "Independent technology advisory and bespoke software engineering practice delivering high-performance web systems, infrastructure scaling, and cloud solutions to growth-oriented businesses.",
      contributions: [
        "Providing technology planning, stack evaluation, and architectural blueprints.",
        "Conducting micro-audits to achieve 100/100 Core Web Vitals on client sites.",
        "Architecting serverless, edge-deployed web ecosystems with zero vendor lock-in.",
      ],
      caseStudySlug: "the-home-shifting",
      caseStudyName: "The Home Shifting Case Study",
    },
    {
      name: "M/S Career Avsar",
      category: "Key Operational Partnership",
      type: "partnership",
      industry: "Educational Recruitment & Public Systems",
      role: "IT Project Head & Technology Partner",
      status: "Active Strategic Partner",
      statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      website: "https://careeravsar.com/",
      domain: "careeravsar.com",
      desc: "Regional recruitment, talent placement, and institutional printing enterprise led in long-term partnership with Vipin Singh in Pratapgarh. Connects accredited schools, hospitals, and educators.",
      contributions: [
        "Led digital development and web portal structuring for 7 Government Medical Colleges in UP.",
        "Managed delivery of 40+ diverse institutional, healthcare, and educational client systems.",
        "Engineered online admission inquiry funnels boosting school leads by +300%.",
      ],
      caseStudySlug: "idps-pratapgarh",
      caseStudyName: "IDPS Pratapgarh Case Study",
    },
    {
      name: "National Genius Institute (NGIT)",
      category: "Institutional Technology Partnership",
      type: "partnership",
      industry: "EdTech & Computer Examinations",
      role: "Long-Term Systems Architect & Partner",
      status: "Active Strategic Partner",
      statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      website: "https://ngitedu.com",
      domain: "ngitedu.com",
      desc: "Premier government computer certification, typing examination, and steno shorthand institute in Prayagraj. Mentored by Mr. Javed Siddique, Devraj serves as technical architect for the online exam platform.",
      contributions: [
        "Engineered the sub-millisecond real-time typing evaluation engine with 0ms keystroke lag.",
        "Created bilingual Hindi (Mangal & Kruti Dev) and English exam simulation models.",
        "Guaranteed 99.98% platform uptime during massive government exam recruitment surges.",
      ],
      caseStudySlug: "ngit-edu",
      caseStudyName: "NGIT Edu Case Study",
    },
    {
      name: "Divya Jap",
      category: "Digital Product Venture",
      type: "product",
      industry: "Spiritual Tech & Consumer Web",
      role: "Creator & Full-Stack System Architect",
      status: "Live in Production",
      statusColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      website: "https://divyajap.com",
      domain: "divyajap.com",
      desc: "An original technology product combining ancient Vedic sadhana with modern web ergonomics. Features a tactile haptic Jap Mala, Web Audio synthesized resonant bell harmonics, and 100% offline resilience.",
      contributions: [
        "Conceived, architected, and built the local-first PWA from scratch.",
        "Engineered hardware-level Web Haptics and Web Audio frequency synthesis.",
        "Designed anonymous cryptographic room synchronization for family prayer circles.",
      ],
      caseStudySlug: "divyajap",
      caseStudyName: "Divya Jap Full Case Study",
    },
    {
      name: "Route 2 Shine (Noida)",
      category: "Past Entrepreneurial Milestone",
      type: "milestone",
      industry: "Voice Process Outsourcing & IT Setup",
      role: "Co-Founder & IT Operations Lead",
      status: "Archived Milestone (2022-2023)",
      statusColor: "text-foreground/60 bg-secondary/30 border-layer-border",
      website: "",
      domain: "Noida Facility",
      desc: "Voice Process Outsourcing (VPO) company co-founded in Noida. Devraj took full ownership of the IT and communication infrastructure, establishing high-concurrency VoIP networking, server resilience, and internal software.",
      contributions: [
        "Architected enterprise-grade local network switching and secure VoIP gateways.",
        "Maintained 99.9% uptime for multi-agent daily call operations.",
        "Demonstrated ability to construct complete digital business backends from zero.",
      ],
    },
  ];

  const filterOptions = [
    { label: "All Ventures", value: "All" },
    { label: "Businesses", value: "business" },
    { label: "Partnerships", value: "partnership" },
    { label: "Products", value: "product" },
    { label: "Milestones", value: "milestone" },
  ];

  const filteredVentures = ventures.filter((v) => {
    if (activeFilter === "All") return true;
    return v.type === activeFilter;
  });

  return (
    <div className="min-h-screen bg-background pt-[100px] lg:pt-[120px] pb-24 px-6 lg:px-20 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-5xl mx-auto text-center mb-16 lg:mb-20">
        <motion.div variants={containerVars} initial="hidden" animate="show">
          {/* Breadcrumb */}
          <motion.div variants={itemVars} className="flex justify-center items-center gap-2 text-xs font-semibold text-foreground/60 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={13} />
            <span className="text-foreground">Ventures &amp; Partnerships</span>
          </motion.div>

          <motion.div
            variants={itemVars}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-6"
          >
            <Rocket size={15} />
            <span className="text-xs font-bold tracking-widest uppercase">
              Commercial Footprint &amp; Products
            </span>
          </motion.div>

          <motion.h1
            variants={itemVars}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-title uppercase tracking-tight mb-8 leading-tight"
          >
            Ventures, Partnerships &amp; <span className="text-primary">Products</span>
          </motion.h1>

          <motion.p
            variants={itemVars}
            className="text-lg md:text-xl text-foreground leading-relaxed max-w-3xl mx-auto mb-10"
          >
            A transparent overview of companies I&apos;ve co-founded, strategic long-term technology partnerships, and original digital products.
          </motion.p>

          {/* Accurate Relationship Disclosure Alert */}
          <motion.div
            variants={itemVars}
            className="p-6 rounded-3xl bg-secondary/20 border border-layer-border text-left max-w-4xl mx-auto flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-title mb-1.5">
                Accurate Relationship Disclosure
              </h2>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                Client organizations and partner institutions are clearly differentiated from proprietary businesses. I act as Co-Founder, Technology Partner, or Systems Architect as specifically designated below.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. VENTURES FILTER TABS */}
      <div className="w-full max-w-6xl mx-auto space-y-12">
        <div className="flex justify-center items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 border ${
                activeFilter === opt.value
                  ? "bg-primary text-background border-primary"
                  : "bg-layer/40 text-foreground/70 border-layer-border hover:border-primary/40 hover:text-title"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* 3. VENTURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVentures.map((venture, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-4xl bg-secondary/15 border border-layer-border hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    {venture.category}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${venture.statusColor}`}>
                    {venture.status}
                  </span>
                </div>

                {/* Name & Domain */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-title mb-1 group-hover:text-primary transition-colors">
                  {venture.name}
                </h3>
                <p className="text-xs font-mono text-foreground/50 mb-4">{venture.domain}</p>

                {/* Role & Industry */}
                <div className="p-4 rounded-2xl bg-layer/40 border border-layer-border mb-6 space-y-1 text-xs">
                  <div>
                    <span className="text-foreground/50 font-semibold uppercase tracking-wider">Role / Relationship: </span>
                    <strong className="text-title font-bold">{venture.role}</strong>
                  </div>
                  <div>
                    <span className="text-foreground/50 font-semibold uppercase tracking-wider">Industry: </span>
                    <span className="text-foreground/85 font-medium">{venture.industry}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-foreground/85 leading-relaxed mb-6">
                  {venture.desc}
                </p>

                {/* Contributions */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-title block">
                    Key Technological Ownership:
                  </span>
                  <ul className="space-y-1.5">
                    {venture.contributions.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground/80 leading-relaxed">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-layer-border mt-auto flex flex-wrap items-center justify-between gap-4">
                {venture.caseStudySlug ? (
                  <Link
                    href={`/case-studies/${venture.caseStudySlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                  >
                    <span>{venture.caseStudyName}</span>
                    <ChevronRight size={13} />
                  </Link>
                ) : (
                  <span className="text-xs text-foreground/40 font-mono">Foundational Milestone</span>
                )}

                {venture.website && (
                  <a
                    href={venture.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-layer-border text-title text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-background transition-colors"
                  >
                    <span>Visit Site</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 4. CROSS-LINKING & CTA */}
        <section className="bg-primary rounded-[3rem] p-10 lg:p-16 text-center relative overflow-hidden mt-16">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#222222] block mb-3">
              Explore Implementations
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] uppercase tracking-tight mb-4">
              Inspect the Production Systems
            </h2>
            <p className="text-[#222222] font-medium text-sm sm:text-base mb-8">
              Explore in-depth case studies showing the architectural blueprints, challenges, and verified outcomes behind these ventures.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/case-studies"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#111111] text-white hover:bg-white hover:text-[#111111] font-bold text-xs uppercase tracking-widest transition-all"
              >
                Project Explorer &amp; Case Studies
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs uppercase tracking-widest transition-all"
              >
                Discuss a Partnership
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
