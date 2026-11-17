"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Layers,
  ExternalLink,
  Clock,
  UserCheck,
  BarChart3,
  Sparkles,
  Code2,
  Server,
  Database,
  Lock,
  Terminal,
  Award,
  ChevronRight,
  Globe,
  Check,
  AlertCircle
} from "lucide-react";
import { CaseStudyDetail } from "@/data/projectsData";

interface CaseStudyDetailClientProps {
  caseStudy: CaseStudyDetail;
  relatedCaseStudies: CaseStudyDetail[];
  prevNext: {
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
  };
}

export default function CaseStudyDetailClient({
  caseStudy,
  relatedCaseStudies,
  prevNext
}: CaseStudyDetailClientProps) {
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

  return (
    <article className="min-h-screen bg-background pt-[100px] lg:pt-[120px] pb-24 px-6 lg:px-20 overflow-x-hidden">
      {/* 1. TOP BREADCRUMB & BACK LINK */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-layer-border text-xs sm:text-sm text-foreground/70">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-foreground/40" />
            <Link href="/case-studies" className="hover:text-primary transition-colors">
              Case Studies
            </Link>
            <ChevronRight size={14} className="text-foreground/40" />
            <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs">
              {caseStudy.client}
            </span>
          </nav>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-title hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} /> Back to Project Explorer
          </Link>
        </div>
      </div>

      {/* 2. SECTION A: HERO & PROJECT OVERVIEW */}
      <header className="max-w-6xl mx-auto mb-16 lg:mb-24">
        <motion.div variants={containerVars} initial="hidden" animate="show">
          {/* Category & Badge */}
          <motion.div variants={itemVars} className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              {caseStudy.category}
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/40 text-foreground/80 border border-layer-border">
              {caseStudy.industry}
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20 inline-flex items-center gap-1.5">
              <Sparkles size={13} /> {caseStudy.verifiedImpactBadge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVars}
            className="text-3xl sm:text-4xl lg:text-6xl font-black text-title tracking-tight uppercase mb-6 leading-tight"
          >
            {caseStudy.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVars}
            className="text-lg sm:text-xl text-foreground/90 max-w-4xl leading-relaxed mb-10"
          >
            {caseStudy.subtitle}
          </motion.p>

          {/* Quick Metadata Matrix Grid */}
          <motion.div
            variants={itemVars}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-layer/40 border border-layer-border mb-10"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/50 block mb-1">
                Client / Organization
              </span>
              <p className="text-sm sm:text-base font-bold text-title">{caseStudy.client}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/50 block mb-1">
                Devraj&apos;s Strategic Role
              </span>
              <p className="text-sm sm:text-base font-bold text-primary">{caseStudy.role}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/50 block mb-1">
                Timeline / Phase
              </span>
              <p className="text-sm sm:text-base font-bold text-title">{caseStudy.timeline}</p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/50 block mb-1">
                Live Deployment
              </span>
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-bold text-title hover:text-primary transition-colors inline-flex items-center gap-1.5"
              >
                <span>Visit Platform</span>
                <ArrowUpRight size={14} className="text-primary" />
              </a>
            </div>
          </motion.div>

          {/* Executive Summary */}
          <motion.div
            variants={itemVars}
            className="p-8 rounded-3xl bg-secondary/20 border border-layer-border relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Executive Architectural Summary
            </h2>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              {caseStudy.overview}
            </p>
          </motion.div>
        </motion.div>
      </header>

      {/* 3. MAIN CASE STUDY CONTENT CONTAINER */}
      <div className="max-w-6xl mx-auto space-y-20 lg:space-y-28">

        {/* SECTION B: THE CHALLENGE */}
        <section className="scroll-mt-32">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            <AlertCircle size={16} /> 01. The Problem Statement
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-title uppercase tracking-tight mb-6">
            The Operational Challenge &amp; Technical Bottlenecks
          </h2>
          <p className="text-base sm:text-lg text-foreground leading-relaxed mb-8">
            {caseStudy.challenge.problem}
          </p>

          {/* Bottlenecks Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {caseStudy.challenge.bottlenecks.map((b, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-layer/30 border border-layer-border flex items-start gap-3.5 hover:border-red-500/30 transition-colors"
              >
                <div className="p-1 rounded-full bg-red-500/10 text-red-400 shrink-0 mt-0.5">
                  <AlertCircle size={16} />
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>

          {/* Why Off-the-Shelf Failed */}
          <div className="p-6 rounded-2xl bg-secondary/10 border border-dashed border-layer-border">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground/60 block mb-2">
              Why Off-The-Shelf Alternatives Failed
            </span>
            <p className="text-sm text-foreground/80 leading-relaxed italic">
              &ldquo;{caseStudy.challenge.whyExistingFailed}&rdquo;
            </p>
          </div>
        </section>

        {/* SECTION C: THE SOLUTION & STRATEGIC APPROACH */}
        <section className="scroll-mt-32">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            <Cpu size={16} /> 02. The Engineered Solution
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-title uppercase tracking-tight mb-6">
            Strategic Architectural Decisions &amp; Execution
          </h2>
          <p className="text-base sm:text-lg text-foreground leading-relaxed mb-8">
            {caseStudy.solution.strategy}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Architecture Highlights */}
            <div className="p-8 rounded-3xl bg-layer/40 border border-layer-border">
              <h3 className="text-lg font-bold text-title mb-6 flex items-center gap-2.5">
                <Layers size={18} className="text-primary" /> Key Architectural Innovations
              </h3>
              <ul className="space-y-4">
                {caseStudy.solution.architectureHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategic Technical Decisions */}
            <div className="p-8 rounded-3xl bg-layer/40 border border-layer-border">
              <h3 className="text-lg font-bold text-title mb-6 flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-green-400" /> Strategic Technical Decisions
              </h3>
              <ul className="space-y-4">
                {caseStudy.solution.keyDecisions.map((decision, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION D: MY ROLE & CONTRIBUTION (Verified distinction) */}
        <section className="scroll-mt-32 p-8 lg:p-12 rounded-4xl bg-primary/5 border border-primary/20 relative overflow-hidden">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            <UserCheck size={16} /> 03. Ownership &amp; Accountability
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-title uppercase tracking-tight mb-4">
            Devraj&apos;s Strategic Role &amp; Personal Ownership
          </h2>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
            Official Designation: {caseStudy.role}
          </p>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-8">
            {caseStudy.myContribution.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-primary/20">
            {/* Responsibilities */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-title mb-4">
                What I Directly Engineered &amp; Delivered
              </h3>
              <ul className="space-y-3">
                {caseStudy.myContribution.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 leading-relaxed">
                    <Check size={15} className="text-primary shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scope Distinctions */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-title mb-4">
                Scope &amp; Collaboration Boundaries
              </h3>
              <ul className="space-y-3">
                {caseStudy.myContribution.distinctions.map((dist, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    <ShieldCheck size={15} className="text-foreground/50 shrink-0 mt-0.5" />
                    <span>{dist}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION E: SYSTEM ARCHITECTURE SPECIFICATIONS */}
        <section className="scroll-mt-32">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            <Terminal size={16} /> 04. Technical Specifications
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-title uppercase tracking-tight mb-8">
            System Architecture &amp; Technology Stack
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Frontend */}
            <div className="p-6 rounded-3xl bg-layer/40 border border-layer-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                  <Code2 size={20} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-title mb-2">
                  Frontend &amp; UI
                </h3>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  {caseStudy.systemArchitecture.frontend}
                </p>
              </div>
            </div>

            {/* Backend */}
            <div className="p-6 rounded-3xl bg-layer/40 border border-layer-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                  <Server size={20} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-title mb-2">
                  Backend &amp; Runtimes
                </h3>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  {caseStudy.systemArchitecture.backend}
                </p>
              </div>
            </div>

            {/* Database & Caching */}
            <div className="p-6 rounded-3xl bg-layer/40 border border-layer-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                  <Database size={20} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-title mb-2">
                  Data &amp; Caching Layer
                </h3>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  {caseStudy.systemArchitecture.databaseAndCaching}
                </p>
              </div>
            </div>

            {/* Security */}
            <div className="p-6 rounded-3xl bg-layer/40 border border-layer-border flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                  <Lock size={20} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-title mb-2">
                  Security &amp; Hardening
                </h3>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  {caseStudy.systemArchitecture.securityCompliance}
                </p>
              </div>
            </div>

            {/* Deployment */}
            <div className="p-6 rounded-3xl bg-layer/40 border border-layer-border flex flex-col justify-between sm:col-span-2">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                  <Globe size={20} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-title mb-2">
                  Cloud Infrastructure &amp; Edge Delivery
                </h3>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  {caseStudy.systemArchitecture.deploymentInfra}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION F: KEY FEATURES & CAPABILITIES */}
        <section className="scroll-mt-32">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            <Sparkles size={16} /> 05. Platform Highlights
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-title uppercase tracking-tight mb-8">
            Core Features &amp; Functional Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudy.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-secondary/20 border border-layer-border hover:border-primary/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  {feat.badge && (
                    <span className="inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
                      {feat.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-title mb-3">{feat.title}</h3>
                  <p className="text-sm text-foreground/85 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION G: RESULTS & BUSINESS IMPACT */}
        <section className="scroll-mt-32">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            <BarChart3 size={16} /> 06. Verified Outcomes
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-title uppercase tracking-tight mb-8">
            Quantifiable Metrics &amp; Qualitative Impact
          </h2>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {caseStudy.results.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-layer/40 border border-layer-border text-center flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground/60 block mb-2">
                    {m.label}
                  </span>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary mb-3 tracking-tight">
                    {m.value}
                  </div>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed border-t border-layer-border pt-4">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Qualitative Impact List */}
          <div className="p-8 rounded-3xl bg-secondary/15 border border-layer-border">
            <h3 className="text-sm font-bold uppercase tracking-wider text-title mb-6 flex items-center gap-2">
              <Award size={18} className="text-primary" /> Long-Term Organizational Impact
            </h3>
            <ul className="space-y-4">
              {caseStudy.results.qualitative.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                  <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION H: ARCHITECTURAL DIAGRAM / CALLOUT BANNER */}
        <section className="p-8 lg:p-12 rounded-4xl bg-gradient-to-br from-secondary/30 via-layer/20 to-secondary/10 border border-layer-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
                Live Verification
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-title uppercase tracking-tight mb-3">
                Experience the Production Platform
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                Inspect the responsive ergonomics, sub-second latency, and verified features live in production.
              </p>
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-background font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors duration-300 shadow-md"
              >
                <span>Launch {caseStudy.client}</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="w-full md:w-auto p-6 rounded-2xl bg-background border border-layer-border font-mono text-xs text-foreground/80 space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span>Production Health: Verified</span>
              </div>
              <div>Domain: {caseStudy.liveUrl.replace("https://", "")}</div>
              <div>SSL: TLS 1.3 Certified</div>
              <div>Architecture: Edge Deployed</div>
            </div>
          </div>
        </section>

        {/* SECTION I: RELATED CASE STUDIES */}
        {relatedCaseStudies.length > 0 && (
          <section className="pt-10 border-t border-layer-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">
                  Strategic Continuity
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-title uppercase tracking-tight">
                  Related Case Studies
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="text-xs font-bold uppercase tracking-wider text-title hover:text-primary transition-colors inline-flex items-center gap-1.5"
              >
                <span>View Full Portfolio</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCaseStudies.map((rcs) => (
                <Link
                  key={rcs.slug}
                  href={`/case-studies/${rcs.slug}`}
                  className="p-6 rounded-3xl bg-layer/40 border border-layer-border hover:border-primary/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded bg-primary/10 border border-primary/20 inline-block mb-3">
                      {rcs.category}
                    </span>
                    <h3 className="text-lg font-bold text-title mb-2 group-hover:text-primary transition-colors">
                      {rcs.title.split("–")[0]}
                    </h3>
                    <p className="text-xs text-foreground/70 line-clamp-3 mb-6">
                      {rcs.subtitle}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-layer-border flex items-center justify-between text-xs font-bold uppercase tracking-wider text-title group-hover:text-primary transition-colors">
                    <span>Read Study</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SECTION J: PREV / NEXT NAVIGATION + STRATEGIC CTA */}
        <section className="pt-8 border-t border-layer-border space-y-12">
          {/* Prev / Next Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevNext.prev ? (
              <Link
                href={`/case-studies/${prevNext.prev.slug}`}
                className="p-6 rounded-2xl bg-secondary/20 border border-layer-border hover:border-primary/40 transition-colors group text-left"
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/50 block mb-1">
                  ← Previous Case Study
                </span>
                <p className="text-sm font-bold text-title group-hover:text-primary transition-colors truncate">
                  {prevNext.prev.title}
                </p>
              </Link>
            ) : (
              <div className="p-6 rounded-2xl border border-dashed border-layer-border text-foreground/40 text-xs">
                First Case Study in Showcase
              </div>
            )}

            {prevNext.next ? (
              <Link
                href={`/case-studies/${prevNext.next.slug}`}
                className="p-6 rounded-2xl bg-secondary/20 border border-layer-border hover:border-primary/40 transition-colors group text-right sm:text-right"
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/50 block mb-1">
                  Next Case Study →
                </span>
                <p className="text-sm font-bold text-title group-hover:text-primary transition-colors truncate">
                  {prevNext.next.title}
                </p>
              </Link>
            ) : (
              <div className="p-6 rounded-2xl border border-dashed border-layer-border text-foreground/40 text-xs text-right">
                Final Case Study in Showcase
              </div>
            )}
          </div>

          {/* Strategic CTA Banner */}
          <div className="bg-primary rounded-[3rem] p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#222222] block mb-3">
                Strategic Technology Partnership
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] uppercase tracking-tight mb-4">
                Have a Complex Platform to Build or Scale?
              </h2>
              <p className="text-[#222222] font-medium text-sm sm:text-base mb-8">
                I turn ambiguous business objectives into resilient, high-performance digital products. Let&apos;s evaluate your technical bottlenecks and build solutions that last.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#111111] text-white hover:bg-white hover:text-[#111111] font-bold text-xs uppercase tracking-widest transition-all duration-300"
                >
                  Discuss Your Project
                </Link>
                <Link
                  href="/case-studies"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300"
                >
                  Explore More Projects
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}
