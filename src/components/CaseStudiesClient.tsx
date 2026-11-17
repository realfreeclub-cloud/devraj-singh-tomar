"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  CheckCircle,
  Target,
  Activity,
  Briefcase,
  Globe,
  LayoutDashboard,
  Share2,
  ArrowUpRight,
  Code2,
  Search,
  Filter,
  X,
  Sparkles,
  BookOpen,
  Layers
} from "lucide-react";
import { useState, useMemo } from "react";
import {
  webProjects,
  socialProjects,
  getAllCaseStudies,
} from "@/data/projectsData";

export default function CaseStudiesClient() {
  const [activeTab, setActiveTab] = useState<"web" | "social">("web");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  const categories = [
    "All",
    "Education",
    "Business & Services",
    "Healthcare",
    "Legal",
    "Startups",
    "Personal Brands",
    "Media & News",
  ];

  // Filtered Web Projects
  const filteredProjects = useMemo(() => {
    return webProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.desc.toLowerCase().includes(q) ||
        project.url.toLowerCase().includes(q) ||
        project.industry.toLowerCase().includes(q) ||
        project.role.toLowerCase().includes(q) ||
        project.tech.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredCaseList = useMemo(() => {
    return getAllCaseStudies();
  }, []);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  // AEO FAQS
  const faqs = [
    {
      q: "What is Devraj Singh Tomar's strategic role across these projects?",
      a: "Devraj acts as a Technology Strategist & Architect. Rather than simply writing frontend code, he designs scalable system architectures, eliminates performance bottlenecks, hardens cybersecurity and privacy models, and aligns technical platforms with commercial revenue objectives.",
    },
    {
      q: "Can I inspect the full architectural breakdown of your flagship projects?",
      a: "Yes. Click 'Read Case Study' on flagship projects like NGIT Edu, Divya Jap, T&S Lex Ink Legal, MAZ Dialysis Center, IDPS Pratapgarh, and The Home Shifting to inspect the exact problems, architectural specifications, technical decisions, and verified outcomes.",
    },
    {
      q: "Why unify Web Architecture with Social Media & Local SEO Strategy?",
      a: "By interconnecting high-speed Next.js web platforms with localized Schema markup, Google Business Profile 3-Pack optimization, and targeted social media reach, businesses create a frictionless funnel that converts casual traffic into verified clients.",
    },
    {
      q: "Are the performance and uptime metrics independently verifiable?",
      a: "Yes. Live production deployments can be tested using standard web diagnostic tools (Google PageSpeed Insights, Chrome DevTools, WebPageTest) to verify Core Web Vitals, SSL integrity, and low response latency.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-[100px] lg:pt-[120px] pb-24 px-6 lg:px-20 overflow-x-hidden">
      {/* 1. HERO & INTRO SECTION */}
      <section className="w-full max-w-5xl mx-auto text-center mb-16 lg:mb-20">
        <motion.div variants={containerVars} initial="hidden" animate="show">
          <motion.div
            variants={itemVars}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-6"
          >
            <Layers size={16} />
            <span className="text-xs font-bold tracking-widest uppercase">
              Proven Digital Portfolio
            </span>
          </motion.div>

          <motion.h1
            variants={itemVars}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-title uppercase tracking-tight mb-6"
          >
            Selected Work &amp; <span className="text-primary">Digital Experiences</span>
          </motion.h1>

          <motion.p
            variants={itemVars}
            className="text-lg md:text-xl text-foreground leading-relaxed max-w-3xl mx-auto mb-10"
          >
            Explore digital platforms, technology solutions, and products I&apos;ve helped shape across education, healthcare, legal advisory, logistics, and consumer tech.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            variants={itemVars}
            className="flex flex-wrap justify-center items-center gap-8 py-4 px-8 rounded-full bg-layer/40 border border-layer-border max-w-3xl mx-auto text-xs sm:text-sm font-semibold text-foreground/80"
          >
            <div>
              <span className="text-primary font-bold">60+</span> Web Systems
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <div>
              <span className="text-primary font-bold">45+</span> Social Brands
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <div>
              <span className="text-primary font-bold">6+</span> Industry Verticals
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <div>
              <span className="text-primary font-bold">7+</span> Years Architecture
            </div>
          </motion.div>
        </motion.div>
      </section>

      <div className="w-full max-w-[1440px] mx-auto space-y-24 lg:space-y-32">
        {/* 2. TAB CONTROLS (Web Projects vs Social Brands) */}
        <section id="portfolio-tabs" className="scroll-mt-32">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <div className="bg-secondary/40 p-2 rounded-full border border-layer-border flex items-center w-full max-w-md relative">
              <button
                onClick={() => setActiveTab("web")}
                className={`flex-1 py-3 px-6 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 z-10 flex items-center justify-center gap-2 ${
                  activeTab === "web" ? "text-background" : "text-foreground hover:text-primary"
                }`}
              >
                <Code2 size={16} /> Web Systems ({webProjects.length})
              </button>
              <button
                onClick={() => setActiveTab("social")}
                className={`flex-1 py-3 px-6 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 z-10 flex items-center justify-center gap-2 ${
                  activeTab === "social" ? "text-background" : "text-foreground hover:text-primary"
                }`}
              >
                <Share2 size={16} /> Social Media ({socialProjects.length})
              </button>

              {/* Sliding Pill */}
              <div
                className={`absolute top-2 bottom-2 w-[calc(50%-0.5rem)] bg-primary rounded-full transition-transform duration-300 ease-in-out shadow-lg ${
                  activeTab === "web" ? "translate-x-0" : "translate-x-full ml-2"
                }`}
              />
            </div>
          </div>

          <div className="min-h-[600px]">
            <AnimatePresence mode="wait">
              {/* TAB 1: WEB SYSTEMS & PROJECT EXPLORER */}
              {activeTab === "web" && (
                <motion.div
                  key="web"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-16"
                >
                  {/* SEARCH & FILTER CONTROLS */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-secondary/20 border border-layer-border space-y-6">
                    {/* Search Input Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                      <div className="relative flex-1">
                        <Search
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50"
                        />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search by project name, tech stack, industry, or role..."
                          className="w-full pl-12 pr-10 py-3.5 bg-background border border-layer-border rounded-2xl text-title text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/40"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-primary"
                            aria-label="Clear search"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>

                      {/* Active Results Counter & Reset */}
                      <div className="flex items-center gap-3 text-xs font-semibold text-foreground/70 shrink-0">
                        <span>
                          Showing <strong className="text-primary">{filteredProjects.length}</strong> of {webProjects.length}
                        </span>
                        {(searchQuery || selectedCategory !== "All") && (
                          <button
                            onClick={handleResetFilters}
                            className="px-3 py-1.5 rounded-full bg-layer/40 border border-layer-border hover:border-primary text-primary transition-colors inline-flex items-center gap-1.5"
                          >
                            <X size={12} /> Reset Filters
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                      <Filter size={15} className="text-primary shrink-0 mr-1" />
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 border ${
                            selectedCategory === cat
                              ? "bg-primary text-background border-primary"
                              : "bg-background/60 text-foreground/70 border-layer-border hover:border-primary/50 hover:text-title"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ALL FILTERED PROJECTS GRID */}
                  {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {filteredProjects.map((proj) => {
                        const hasDetail = proj.hasCaseStudy;
                        return (
                          <div
                            key={proj.slug}
                            className="bg-secondary/20 border border-layer-border rounded-3xl p-8 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                          >
                            <div>
                              {/* Top Bar: Category & Case Study Badge */}
                              <div className="flex justify-between items-start mb-4">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider rounded-lg border border-primary/20">
                                  {proj.category}
                                </span>
                                {hasDetail && (
                                  <span className="px-2.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                                    <BookOpen size={11} /> Case Study
                                  </span>
                                )}
                              </div>

                              {/* Title & Domain */}
                              <h3 className="text-2xl font-extrabold text-title tracking-tight mb-1 group-hover:text-primary transition-colors">
                                {proj.name}
                              </h3>
                              <p className="font-mono text-xs text-foreground/50 mb-3">{proj.url}</p>

                              {/* Verified Role */}
                              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-4">
                                Role: <span className="text-foreground/90 font-bold">{proj.role}</span>
                              </p>

                              {/* Description */}
                              <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed mb-6">
                                {proj.desc}
                              </p>

                              {/* Tech Stack Pills */}
                              <div className="flex flex-wrap gap-1.5 mb-6">
                                {proj.tech.map((t, i) => (
                                  <span
                                    key={i}
                                    className="text-[11px] font-medium bg-background border border-layer-border px-2.5 py-1 rounded-md text-foreground/80"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Bottom: Impact & Dual Actions */}
                            <div className="pt-6 border-t border-layer-border mt-auto">
                              {proj.impact && (
                                <p className="text-xs font-bold text-primary mb-4 tracking-tight flex items-center gap-1.5">
                                  <Sparkles size={13} className="shrink-0" />
                                  <span>{proj.impact}</span>
                                </p>
                              )}

                              <div className="flex items-center justify-between gap-3">
                                {hasDetail ? (
                                  <Link
                                    href={`/case-studies/${proj.slug}`}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-title group-hover:text-primary transition-colors"
                                  >
                                    <span>Read Case Study</span>
                                    <ArrowRight size={14} />
                                  </Link>
                                ) : (
                                  <span className="text-[11px] text-foreground/40 font-mono">
                                    Enterprise Portal
                                  </span>
                                )}

                                <a
                                  href={`https://${proj.url}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors"
                                >
                                  <span>Live Site</span>
                                  <ArrowUpRight size={14} />
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* EMPTY SEARCH RESULTS STATE */
                    <div className="p-16 rounded-3xl bg-secondary/10 border border-layer-border text-center max-w-xl mx-auto">
                      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
                        <Search size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-title mb-2">No Projects Match Your Filter</h3>
                      <p className="text-sm text-foreground/70 mb-6">
                        No projects found matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;. Try another search term or reset your filters.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="px-6 py-3 rounded-full bg-primary text-background font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 2: SOCIAL MEDIA MANAGEMENT */}
              {activeTab === "social" && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  {/* Social Stats Board */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 text-center">
                      <h4 className="text-4xl font-black text-title mb-2">45+</h4>
                      <span className="text-xs tracking-widest uppercase font-bold text-primary">
                        Brands &amp; Institutions Scaled
                      </span>
                    </div>
                    <div className="bg-secondary/20 border border-layer-border rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-3">
                      <div className="flex gap-4">
                        <FbIcon /> <InstaIcon /> <XIcon /> <GoogleIcon />
                      </div>
                      <span className="text-xs tracking-widest uppercase font-bold text-foreground/70">
                        Omnichannel Lead Funnels
                      </span>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 text-center">
                      <h4 className="text-4xl font-black text-title mb-2">80M+</h4>
                      <span className="text-xs tracking-widest uppercase font-bold text-primary">
                        Verified Impressions Generated
                      </span>
                    </div>
                  </div>

                  {/* Social Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {socialProjects.map((soc, idx) => (
                      <div
                        key={idx}
                        className="bg-background border border-layer-border rounded-4xl p-8 lg:p-10 flex flex-col md:flex-row gap-6 items-center md:items-start group hover:border-primary/50 transition-colors"
                      >
                        <div className="w-20 h-20 bg-secondary/40 rounded-full flex items-center justify-center shrink-0 border border-layer-border relative overflow-hidden group-hover:bg-primary/10 transition-colors">
                          <LayoutDashboard size={28} className="text-primary z-10" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-2 gap-3">
                            <h3 className="text-xl font-extrabold text-title">{soc.name}</h3>
                            <span className="bg-primary text-background font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                              {soc.stats}
                            </span>
                          </div>
                          <span className="text-primary font-bold tracking-wider uppercase text-xs mb-3 block">
                            {soc.industry}
                          </span>
                          <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed mb-6">
                            {soc.type}
                          </p>

                          <div className="flex items-center justify-center md:justify-start gap-2.5">
                            {soc.platforms.map((plat) => (
                              <div
                                key={plat}
                                className="w-9 h-9 bg-secondary/50 rounded-full flex items-center justify-center text-foreground/80"
                              >
                                {plat === "facebook" && <FbIcon size={16} />}
                                {plat === "instagram" && <InstaIcon size={16} />}
                                {plat === "x" && <XIcon size={16} />}
                                {plat === "google" && <GoogleIcon size={16} />}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 3. DEEP ARCHITECTURAL CASE STUDIES SECTION */}
        <section className="bg-primary/5 border border-primary/20 p-8 lg:p-16 rounded-[4rem]">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-3">
              <BookOpen size={14} /> Full Technical Breakdowns
            </div>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-title uppercase tracking-wide mb-4">
              Deep Architectural Case Studies
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Explore in-depth documentation detailing exact business bottlenecks, technical specifications, and verified outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCaseList.map((fCase) => (
              <div
                key={fCase.slug}
                className="bg-background border border-layer-border rounded-3xl p-8 flex flex-col justify-between h-full transform hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <span className="text-[10px] font-black tracking-widest text-primary uppercase px-2.5 py-1 rounded bg-primary/10 border border-primary/20">
                      {fCase.category}
                    </span>
                    <span className="font-mono text-xs text-foreground/50">{fCase.liveUrl.replace("https://", "")}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-title mb-6 group-hover:text-primary transition-colors">
                    {fCase.title}
                  </h3>

                  <div className="space-y-5 mb-8">
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-foreground mb-1.5">
                        <CheckCircle size={14} className="text-red-400" /> Operational Bottleneck
                      </h4>
                      <p className="text-foreground/80 leading-relaxed text-xs line-clamp-3">
                        {fCase.challenge.problem}
                      </p>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-foreground mb-1.5">
                        <CheckCircle size={14} className="text-green-400" /> Engineered Solution
                      </h4>
                      <p className="text-foreground/80 leading-relaxed text-xs line-clamp-3">
                        {fCase.solution.strategy}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-layer-border mt-auto">
                  <p className="text-primary font-bold text-sm tracking-tight mb-6">
                    {fCase.verifiedImpactBadge}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <Link
                      href={`/case-studies/${fCase.slug}`}
                      className="inline-flex items-center gap-2 text-title font-bold uppercase tracking-widest text-xs group-hover:text-primary transition-colors"
                    >
                      <span>Read Full Study</span>
                      <ArrowRight size={14} />
                    </Link>
                    <a
                      href={fCase.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold uppercase text-foreground/50 hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      <span>Live</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. TRUST & AUTHORITY METRICS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-secondary/20 border border-layer-border p-8 rounded-3xl flex flex-col items-center justify-center text-center">
            <Target size={32} className="text-primary mb-4" />
            <h4 className="text-3xl font-black text-title mb-1">60+</h4>
            <span className="text-xs uppercase font-bold tracking-widest text-foreground/60">
              Enterprise Projects
            </span>
          </div>
          <div className="bg-secondary/20 border border-layer-border p-8 rounded-3xl flex flex-col items-center justify-center text-center">
            <Activity size={32} className="text-primary mb-4" />
            <h4 className="text-3xl font-black text-title mb-1">7+ Years</h4>
            <span className="text-xs uppercase font-bold tracking-widest text-foreground/60">
              Technology Architecture
            </span>
          </div>
          <div className="bg-secondary/20 border border-layer-border p-8 rounded-3xl flex flex-col items-center justify-center text-center">
            <Briefcase size={32} className="text-primary mb-4" />
            <h4 className="text-2xl font-black text-title mb-1">Strategist</h4>
            <span className="text-xs uppercase font-bold tracking-widest text-foreground/60">
              Product &amp; Systems Head
            </span>
          </div>
          <div className="bg-secondary/20 border border-layer-border p-8 rounded-3xl flex flex-col items-center justify-center text-center">
            <Globe size={32} className="text-primary mb-4" />
            <h4 className="text-2xl font-black text-title mb-1">6+ Verticals</h4>
            <span className="text-xs uppercase font-bold tracking-widest text-foreground/60">
              Industries Engineered
            </span>
          </div>
        </section>

        {/* 5. AEO / FAQS */}
        <section className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-5xl font-bold text-title uppercase tracking-wide mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-layer-border rounded-2xl overflow-hidden bg-secondary/20"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-secondary/40 transition-colors"
                >
                  <span className="font-bold text-title pr-8 text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`text-primary shrink-0 transition-transform duration-300 ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-foreground/90 leading-relaxed border-t border-layer-border mt-2 text-sm sm:text-base">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CALL TO ACTION SECTION */}
        <section className="bg-primary rounded-[4rem] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#222222] block mb-3">
              Strategic Partnership
            </span>
            <h2 className="text-4xl lg:text-6xl font-extrabold text-[#111111] uppercase tracking-tight mb-6">
              Turn Your Ideas Into Digital Platforms
            </h2>
            <p className="text-[#222222] font-medium text-base lg:text-lg mb-10 leading-relaxed">
              Whether you need to architect an enterprise web application, resolve critical scaling bottlenecks, or orchestrate end-to-end digital growth, let&apos;s build solutions with lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-[#111111] text-white hover:bg-white hover:text-[#111111] border-2 border-[#111111] font-bold tracking-widest text-xs uppercase rounded-full px-9 py-4 transition-all duration-300 w-full sm:w-auto"
              >
                Discuss a Project <ArrowRight size={18} />
              </Link>
              <Link
                href="/hire"
                className="inline-flex items-center justify-center gap-3 bg-transparent text-[#111111] border-2 border-[#111111] hover:bg-[#111111] hover:text-white font-bold tracking-widest text-xs uppercase rounded-full px-9 py-4 transition-all duration-300 w-full sm:w-auto"
              >
                Hire as Technology Strategist
              </Link>
            </div>
          </div>
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl mix-blend-overlay" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#111] rounded-full blur-3xl opacity-20 mix-blend-overlay" />
        </section>
      </div>
    </div>
  );
}

// ----------------------
// HELPER ICONS COMPONENTS
// ----------------------
function FbIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  );
}
