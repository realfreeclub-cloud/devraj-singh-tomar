"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Layers, TrendingUp, Search, Monitor, Terminal, Database } from "lucide-react";
import { useState } from "react";

export default function CaseStudiesClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const faqs = [
    {
      q: "Are these web development case studies India-focused or global?",
      a: "While my technical operations are proudly rooted in India, the strategic case studies highlighted above apply to scaling digital infrastructure universally. I collaborate extensively with startups spanning North America, Europe, and Asia, proving that perfectly optimized code has zero geographic boundaries."
    },
    {
      q: "Why are all your featured case studies heavily built upon Next.js?",
      a: "Next.js solves nearly all the agonizing bottlenecks associated with standard React Single Page Applications (SPAs). It naturally patches massive SEO vulnerabilities, completely obliterates load-time latency via Static Generation, and heavily optimizes images natively out of the box."
    },
    {
      q: "Can I expect similar SEO and performance metrics for my own project?",
      a: "Absolutely. By following the strictest structural methodologies, aggressively policing bundle size, enforcing intelligent caching strategies, and utilizing the newest App Router APIs, your application will drastically out-perform competitors running bloated legacy software."
    },
    {
      q: "How do you accurately measure these specific performance improvements?",
      a: "All metrics provided are violently stress-tested utilizing enterprise-tier diagnostic tooling including Google Chrome User Experience Report (CrUX), deep Lighthouse inspections, Vercel Analytics tracking, and structured data validation via the Google Rich Results Test."
    }
  ];

  const caseStudies = [
    {
      title: "Enterprise E-Commerce Platform Overhaul",
      icon: Search,
      problem: "A growing retailer faced catastrophic bounce rates on mobile due to a bloated legacy PHP framework. TTI (Time to Interactive) averaged 6.8 seconds, and massive Javascript payloads choked organic visibility, leaving search engine rankings at near-zero.",
      solution: "Decoupled the rigid legacy system using a true Headless Commerce approach via Next.js. Engineered massive Static Site Generation (SSG) combined with Incremental Static Regeneration (ISR). Webhooks instantly updated static catalogs without database ping loops.",
      tech: ["Next.js (App Router)", "React Server Components", "GraphQL Headless CMS", "Tailwind CSS"],
      results: [
        { label: "LCP Reduced", value: "1.2s", before: "from 6.8s" },
        { label: "Indexed Pages", value: "+315%", before: "in 45 days" },
        { label: "Mobile Conversions", value: "+42%", before: "Q1 impact" }
      ]
    },
    {
      title: "SaaS Dashboard Architecture & Speed Optimization",
      icon: Monitor,
      problem: "A B2B FinTech dashboard was crippling under Client-Side Rendering (CSR). Users stared at spinners for 5 seconds while a massive, un-split Javascript monolith parsed. Deep memory leaks in heavy chart re-renders were crashing chrome tabs.",
      solution: "Transitioned to a deep hybrid SSR/CSR Next.js architecture. Audited dependency trees and executed aggressive code-splitting. Recharts and heavy UI vectors only loaded asynchronously. Swapped Redux for Zustand to prevent multi-level re-render thrashing.",
      tech: ["Next.js (Hybrid Architecture)", "TypeScript Strict", "Zustand State", "SWR Data Fetching"],
      results: [
        { label: "JS Payload", value: "-73%", before: "3.2MB to 850KB" },
        { label: "INP Latency", value: "85ms", before: "failing 450ms" },
        { label: "Session TR", value: "+30%", before: "duration hold" }
      ]
    },
    {
      title: "Traffic Generation via Technical SEO (Ed-Tech)",
      icon: TrendingUp,
      problem: "An educational portal prototype built by an offshore agency on a generic template suffered devastating SEO cannibalization. Nested broken architecture and severely stripped semantic elements blinded it from Voice Search and Answer Engines.",
      solution: "Mapped out a tightly siloed URL structure. Built an automated Next.js API layer that instantly generated precise `<title>`, JSON-LD schemas (FAQPage, Article), and OpenGraph data per publication, along with fully dynamic `sitemap.xml` ping mechanisms.",
      tech: ["Next.js APIs", "JSON-LD Automation", "Vercel Edge Functions", "MDX Parsers"],
      results: [
        { label: "Featured Snippets", value: "45+", before: "in 3 months" },
        { label: "Unique Traffic", value: "65,000", before: "organic monthly" },
        { label: "Global TTFB", value: "<120ms", before: "Edge cached" }
      ]
    },
    {
      title: "Corporate Landing Page Conversion Fix",
      icon: Layers,
      problem: "A massively funded startup demanded a visually breathtaking, immensely interactive 3D landing page but was terrified of destroying their First Contentful Paint (FCP) and losing highly aggressive Google PageSpeed metrics.",
      solution: "Threaded the needle between immersive flair and brutal code efficiency. Leveraged Framer Motion purely over 'use client' hydrating shells while preserving SSG speed entirely at the Layout level. Used `next/image` with blurDataURL to simulate immediate visual geometry.",
      tech: ["Next.js SSG", "Framer Motion", "Tailwind CSS Arbitrary Logic", "next/font"],
      results: [
        { label: "FCP Speed", value: "0.9s", before: "locked & preserved" },
        { label: "Demo Bookings", value: "+110%", before: "conversion lift" },
        { label: "Google Audit", value: "100/100", before: "perfectly green" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-[100px] lg:pt-[120px] pb-24 px-6 lg:px-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-5xl mx-auto text-center mb-20 lg:mb-28">
        <motion.div variants={containerVars} initial="hidden" animate="show">
          <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-8">
            <Database size={16} />
            <span className="text-sm font-semibold tracking-wider uppercase">Deep Architectural Strategy</span>
          </motion.div>
          
          <motion.h1 variants={itemVars} className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-title uppercase tracking-tight mb-8">
            <span className="text-primary">Next.js Projects Portfolio:</span> Engineering High-Performance Web Development Case Studies
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-lg text-foreground leading-relaxed max-w-4xl mx-auto mb-10">
            There is a profound difference between simply &quot;building a website&quot; and deeply engineering a highly scalable, conversion-focused digital asset. As an IT Project Manager and technical architect based in India, I don&apos;t just write lines of React—I systematically solve complex business bottlenecks through aggressive performance optimization and advanced technical SEO.
          </motion.p>
          <motion.p variants={itemVars} className="text-lg text-foreground leading-relaxed max-w-4xl mx-auto mb-12">
            In an oversaturated digital ecosystem, your users&apos; attention spans are ruthless. Look at the exact data below. See how legacy codebases and non-existent organic traffic models were wholly transformed into unyielding digital dominance.
          </motion.p>
        </motion.div>
      </section>

      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 gap-24 lg:gap-32">
        
        {/* 2. CASE STUDIES (REPEATABLE FORMAT) */}
        <section className="space-y-16 lg:space-y-24">
          {caseStudies.map((study, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-secondary/20 border border-layer-border rounded-[2.5rem] p-8 lg:p-12"
            >
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
                {/* Visual Left Side */}
                <div className="lg:w-1/3 flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                      <study.icon size={32} className="text-black" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-title mb-8 tracking-tight">{study.title}</h2>
                  </div>
                  
                  {/* Metric Chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    {study.results.map((res, i) => (
                      <div key={i} className="bg-background border border-primary/20 p-4 rounded-xl flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl transform translate-x-4 -translate-y-4"></div>
                        <span className="text-sm font-semibold text-primary uppercase mb-1">{res.label}</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-title">{res.value}</span>
                          <span className="text-xs text-foreground/70 tracking-wide uppercase">{res.before}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Right Side */}
                <div className="lg:w-2/3 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-title mb-4 flex items-center gap-2">
                       <span className="w-6 h-6 rounded bg-red-500/20 text-red-500 flex items-center justify-center text-xs">01</span> 
                       The Problem
                    </h3>
                    <p className="text-foreground leading-8 text-lg">{study.problem}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-title mb-4 flex items-center gap-2">
                       <span className="w-6 h-6 rounded bg-green-500/20 text-green-500 flex items-center justify-center text-xs">02</span> 
                       The Solution
                    </h3>
                    <p className="text-foreground leading-8 text-lg">{study.solution}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-title mb-4 flex items-center gap-2">
                       <span className="w-6 h-6 rounded bg-primary/20 text-primary flex items-center justify-center text-xs">03</span> 
                       Technologies Deployed
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {study.tech.map((t, i) => (
                        <span key={i} className="bg-layer-bg border border-layer-border text-foreground px-4 py-2 rounded-full text-sm font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* 3. TECHNICAL PHILOSOPHY */}
         <section className="bg-primary/5 border border-primary/20 rounded-[3rem] p-8 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-title uppercase tracking-wide mb-8">Why Engineering Trumps &quot;Building&quot;</h2>
            <p className="text-foreground text-lg leading-8 max-w-4xl mx-auto mb-8">
              Simply spinning up a generic React template does not fix your Largest Contentful Paint. Plugging in an off-the-shelf SEO plugin does not dynamically calculate optimal route chunking or natively deduce `<span className="font-mono text-primary bg-background px-2 py-1 rounded">avif</span>` breakpoints for mobile users.
            </p>
            <p className="text-foreground text-lg leading-8 max-w-4xl mx-auto">
              When conducting these environments, my underlying philosophy is architectural minimalism paired with structural perfection. When you prioritize server-side execution, you inherently offload the heavy computational taxes previously placed on your user&apos;s smartphone. You move faster. Algorithms understand you better. It is exactly that simple.
            </p>
        </section>

        {/* 4. FAQ (AEO OPTIMIZED) */}
        <section className="max-w-4xl mx-auto w-full">
           <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-title uppercase tracking-wide mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-foreground max-w-2xl mx-auto">Answers strictly optimized for VSO (Voice Search) and AEO (Answer Engine Optimization).</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-layer-border rounded-2xl overflow-hidden bg-secondary/20">
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-secondary/40 transition-colors"
                >
                  <span className="font-bold text-title pr-8">{faq.q}</span>
                  <ChevronDown 
                    className={`text-primary shrink-0 transition-transform duration-300 ${activeFaq === index ? "rotate-180" : ""}`} 
                    size={24} 
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
                      <div className="p-6 pt-0 text-foreground leading-relaxed border-t border-layer-border mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CTA */}
        <section className="bg-primary rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/30 bg-black/10 text-[#111111] mb-8">
              <Terminal size={16} />
              <span className="text-sm font-bold tracking-wider uppercase">Become The Next Case Study</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-[#111111] uppercase tracking-tight mb-6">
              Ready to Engineer Your Success?
            </h2>
            <p className="text-[#222222] font-medium text-lg lg:text-xl max-w-3xl mx-auto mb-10">
              Stop losing active users to fractions-of-a-second loading delays. Let me surgically assess your web architecture and rapidly deploy the hyper-optimized infrastructure it rightfully deserves.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#111111] text-white hover:bg-white hover:text-[#111111] border-2 border-[#111111] font-bold tracking-widest text-sm rounded-full px-8 py-4 transition-all duration-300"
            >
              SCHEDULE A TECHNICAL STRATEGY CALL <ArrowRight size={20} />
            </Link>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/20 rounded-full blur-3xl mix-blend-overlay"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#111] rounded-full blur-3xl opacity-20 mix-blend-overlay"></div>
        </section>

      </div>
    </div>
  );
}
