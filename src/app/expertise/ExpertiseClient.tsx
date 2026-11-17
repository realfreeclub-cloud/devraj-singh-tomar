"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Compass,
  Cpu,
  Layers,
  Zap,
  Briefcase,
  Search,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Code2,
  Sparkles,
  ChevronRight,
  Server,
  Globe,
  Database,
  Terminal,
  Activity,
  Target
} from "lucide-react";

export default function ExpertiseClient() {
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

  const expertisePillars = [
    {
      id: "technology-strategy",
      num: "01",
      title: "Technology Strategy & Architecture",
      icon: Compass,
      tagline: "Aligning technical foundations with commercial growth and scalability.",
      summary:
        "Selecting the wrong technology stack or architecture creates compounding technical debt and crippling rewrites. I guide founders, leadership teams, and institutions through technology planning, architecture decisions, and vendor evaluations.",
      capabilities: [
        "Technology Planning & Feasibility Audits",
        "Architecture Blueprinting & Stack Selection",
        "Digital Product Strategy & Roadmap Definition",
        "Technical Consulting & Codebase Audits",
      ],
      problemsSolved: [
        "Eliminating legacy software bottlenecks and slow page hydration.",
        "Preventing costly architectural rewrites by picking the right tools early.",
        "Aligning executive business objectives with engineering deliverables.",
      ],
      myRoleDistinction:
        "Strategic consulting, architectural blueprinting, and technical specification (hands-off advisory or lead architectural governance).",
      projects: [
        { name: "NGIT Edu", slug: "ngit-edu", note: "Sub-millisecond exam evaluation state machine architecture" },
        { name: "T&S Lex Ink Legal", slug: "lexink-legal", note: "Zero-trust corporate law security architecture" },
      ],
    },
    {
      id: "digital-product-development",
      num: "02",
      title: "Digital Product Development",
      icon: Cpu,
      tagline: "Engineering high-performance, responsive web applications and platforms.",
      summary:
        "Modern digital products require ruthless speed, intuitive ergonomics, and reliable offline resilience. I architect and build React and Next.js applications engineered for sub-second Core Web Vitals and frictionless user experiences.",
      capabilities: [
        "Next.js App Router Web Applications",
        "Business Platforms & Customer Portals",
        "Local-First Progressive Web Apps (PWAs)",
        "Application Performance Engineering",
      ],
      problemsSolved: [
        "High mobile bounce rates caused by slow initial page loads (>3s).",
        "App fragility during intermittent mobile connectivity or offline scenarios.",
        "Unmaintainable monolithic codebases that resist feature expansion.",
      ],
      myRoleDistinction:
        "Hands-on full-stack engineering, reactive UI development, state management, and edge deployment.",
      projects: [
        { name: "Divya Jap", slug: "divyajap", note: "Local-first PWA with Web Haptics and Audio synthesis" },
        { name: "The Home Shifting", slug: "the-home-shifting", note: "Sub-1s logistics quote conversion engine" },
      ],
    },
    {
      id: "project-leadership",
      num: "03",
      title: "Project & Product Leadership",
      icon: Briefcase,
      tagline: "Translating ambiguous requirements into disciplined, on-time releases.",
      summary:
        "Great engineering fails without disciplined project execution. Bridging business stakeholders and technical developers, I lead requirements discovery, sprint planning, quality assurance, and deployment pipelines.",
      capabilities: [
        "Requirements Analysis & Technical Scope Definition",
        "Agile Sprint Planning & Milestone Tracking",
        "Cross-Functional Team Coordination",
        "Quality Assurance & Release Management",
      ],
      problemsSolved: [
        "Scope creep causing delayed launch dates and blown budgets.",
        "Communication breakdowns between non-technical stakeholders and developers.",
        "Lack of structured testing leading to critical bugs in production.",
      ],
      myRoleDistinction:
        "IT Project Head, sprint orchestration, technical requirements authoring, and delivery accountability.",
      projects: [
        { name: "7 Government Medical Colleges", slug: "idps-pratapgarh", note: "Multi-campus public healthcare and academic routing" },
        { name: "IDPS Pratapgarh", slug: "idps-pratapgarh", note: "Campus digital ecosystem and administrative workflows" },
      ],
    },
    {
      id: "business-automation",
      num: "04",
      title: "Business Automation & Systems",
      icon: Zap,
      tagline: "Digitizing repetitive manual tasks and eliminating administrative friction.",
      summary:
        "Manual data entry, paper-based inquiry capture, and slow quotation processes bleed revenue. I design automated lead pipelines, instant quote estimators, and multi-channel notification systems.",
      capabilities: [
        "Interactive Digital Inquiry Wizards",
        "Automated WhatsApp & Email Lead Dispatch",
        "Internal Administrative Workflows",
        "Third-Party API & Payment Integrations",
      ],
      problemsSolved: [
        "Lost customer leads due to slow multi-day quotation turnaround.",
        "Overloaded front desks fielding repetitive queries by phone.",
        "Fragmented customer data spread across spreadsheets and paper notes.",
      ],
      myRoleDistinction:
        "Workflow architecture, API integration, webhook automation, and conversion rate optimization (CRO).",
      projects: [
        { name: "The Home Shifting", slug: "the-home-shifting", note: "2-step instant route estimate and automated dispatch" },
        { name: "IDPS Pratapgarh", slug: "idps-pratapgarh", note: "3-step digital admission funnel eliminating paper forms" },
      ],
    },
    {
      id: "digital-transformation",
      num: "05",
      title: "Industry Digital Transformation",
      icon: Layers,
      tagline: "Modernizing healthcare, education, legal, and commercial institutions.",
      summary:
        "Different industries carry unique regulatory, accessibility, and credibility requirements. I engineer sector-specific solutions—from hospital emergency triage to Bar Council-compliant law firm portals.",
      capabilities: [
        "Healthcare Portals & Emergency Triage Systems",
        "Education & University Academic Portals",
        "Zero-Trust Legal & Litigation Websites",
        "Commercial Catalog & B2B Manufacturer Hubs",
      ],
      problemsSolved: [
        "Outdated institutional websites failing modern mobile compliance.",
        "Inability of patients to quickly confirm emergency bed/dialysis availability.",
        "Non-compliance with sector regulations (Bar Council, Medical Councils, Board affiliations).",
      ],
      myRoleDistinction:
        "Domain-specific compliance architecture, structured schema engineering, and stakeholder coordination.",
      projects: [
        { name: "MAZ Dialysis Center", slug: "maz-dialysis-center", note: "3rd largest dialysis facility patient triage portal" },
        { name: "T&S Lex Ink Legal", slug: "lexink-legal", note: "Bar Council-compliant zero-trust corporate legal portal" },
      ],
    },
    {
      id: "digital-growth",
      num: "06",
      title: "Digital Growth & Search Strategy",
      icon: Search,
      tagline: "Dominating organic search, Google Maps, and interconnected lead funnels.",
      summary:
        "A website is a liability if your target market cannot discover it. I engineer semantic technical SEO, Schema.org microdata, and Google Maps Local 3-Pack authority that turn digital platforms into organic client acquisition engines.",
      capabilities: [
        "Semantic Technical SEO & Schema.org JSON-LD",
        "Google Maps Local 3-Pack Optimization",
        "Omnichannel Social Media Lead Funnel Architecture",
        "Speed & Core Web Vitals Algorithmic Tuning",
      ],
      problemsSolved: [
        "Zero organic search visibility for high-intent regional commercial queries.",
        "Poor local search rankings causing customers to call competitors.",
        "Disjointed social media campaigns that fail to drive website conversions.",
      ],
      myRoleDistinction:
        "Organic search architecture, structured data authoring, and brand visibility strategy (distinct from paid media ad buying).",
      projects: [
        { name: "45+ Social Media Clients", slug: "ngit-edu", note: "80M+ organic impressions and regional market dominance" },
        { name: "MAZ Dialysis Center", slug: "maz-dialysis-center", note: "Dominant 3-Pack Maps ranking across Eastern UP" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-[100px] lg:pt-[120px] pb-24 px-6 lg:px-20 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-5xl mx-auto text-center mb-20 lg:mb-28">
        <motion.div variants={containerVars} initial="hidden" animate="show">
          {/* Breadcrumb */}
          <motion.div variants={itemVars} className="flex justify-center items-center gap-2 text-xs font-semibold text-foreground/60 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={13} />
            <span className="text-foreground">Strategic Capabilities &amp; Expertise</span>
          </motion.div>

          <motion.div
            variants={itemVars}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-6"
          >
            <Activity size={15} />
            <span className="text-xs font-bold tracking-widest uppercase">
              Core Capabilities &amp; Focus Areas
            </span>
          </motion.div>

          <motion.h1
            variants={itemVars}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-title uppercase tracking-tight mb-8 leading-tight"
          >
            Strategic Architecture &amp; <span className="text-primary">Digital Engineering</span>
          </motion.h1>

          <motion.p
            variants={itemVars}
            className="text-lg md:text-xl text-foreground leading-relaxed max-w-3xl mx-auto mb-10"
          >
            I turn business challenges into practical, resilient technology solutions. Explore the 6 foundational pillars across strategy, engineering, product leadership, and digital growth.
          </motion.p>

          {/* Role Distinction Callout Banner */}
          <motion.div
            variants={itemVars}
            className="p-6 rounded-3xl bg-secondary/20 border border-layer-border text-left max-w-4xl mx-auto flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-title mb-1.5">
                Role &amp; Capability Distinction
              </h2>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                As a Technology Strategist &amp; Systems Architect, I clearly distinguish between strategic architecture, project leadership, and hands-on coding. Inclusion of tools or frameworks indicates architectural competence and systems integration, not generic syntax recall.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. 6 CORE EXPERTISE PILLARS */}
      <div className="w-full max-w-5xl mx-auto space-y-16 lg:space-y-24">
        {expertisePillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <section
              key={pillar.id}
              id={pillar.id}
              className="scroll-mt-32 p-8 lg:p-12 rounded-4xl bg-secondary/15 border border-layer-border hover:border-primary/40 transition-colors duration-300"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon size={24} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-widest block">
                      Pillar {pillar.num}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-title">
                      {pillar.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Tagline & Summary */}
              <p className="text-base sm:text-lg font-semibold text-primary/90 mb-3">
                {pillar.tagline}
              </p>
              <p className="text-sm sm:text-base text-foreground/85 leading-relaxed mb-8">
                {pillar.summary}
              </p>

              {/* 2-Column Grid: Capabilities & Problems Solved */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pt-6 border-t border-layer-border">
                {/* Capabilities */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-title mb-4 flex items-center gap-2">
                    <Code2 size={15} className="text-primary" /> Key Capabilities
                  </h4>
                  <ul className="space-y-2.5">
                    {pillar.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85 leading-relaxed">
                        <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Problems Addressed */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-title mb-4 flex items-center gap-2">
                    <Target size={15} className="text-primary" /> Business Problems Solved
                  </h4>
                  <ul className="space-y-2.5">
                    {pillar.problemsSolved.map((prob, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Role Distinction Box */}
              <div className="p-4 rounded-2xl bg-layer/40 border border-layer-border mb-8 text-xs text-foreground/80">
                <span className="font-bold uppercase tracking-wider text-primary mr-1.5">
                  My Ownership:
                </span>
                <span>{pillar.myRoleDistinction}</span>
              </div>

              {/* Related Case Studies Cross-Links */}
              <div className="pt-6 border-t border-layer-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-title">
                  Demonstrated in Case Studies:
                </span>
                <div className="flex flex-wrap gap-3">
                  {pillar.projects.map((proj, idx) => (
                    <Link
                      key={idx}
                      href={`/case-studies/${proj.slug}`}
                      className="px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary hover:bg-primary hover:text-background transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{proj.name}</span>
                      <ArrowRight size={12} />
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* 3. CLOSING CTA BANNER */}
        <section className="bg-primary rounded-[3rem] p-10 lg:p-16 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#222222] block mb-3">
              Strategic Consultation
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] uppercase tracking-tight mb-4">
              Need Architecture or Strategic Direction?
            </h2>
            <p className="text-[#222222] font-medium text-sm sm:text-base mb-8">
              Let&apos;s evaluate your current digital architecture, identify scaling bottlenecks, and engineer practical solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#111111] text-white hover:bg-white hover:text-[#111111] font-bold text-xs uppercase tracking-widest transition-all"
              >
                Discuss a Project
              </Link>
              <Link
                href="/case-studies"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs uppercase tracking-widest transition-all"
              >
                Explore Case Studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
