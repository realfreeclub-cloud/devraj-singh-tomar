"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Code2, BarChart, Briefcase, ChevronDown, Rocket, Search, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";

export default function HireClient() {
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
      q: "Why should I hire a Freelance Next.js Developer in India instead of an agency?",
      a: "By hiring me directly, you gain unfiltered access to elite engineering talent without massive agency overhead costs. You pay for pure results, enjoy significantly faster turnaround times, and collaborate directly with the architect building your platform."
    },
    {
      q: "How do you handle IT Project Management for early-stage startups?",
      a: "Startups require intense flexibility combined with aggressive execution. I employ lean, agile methodologies encompassing sprint cycles, regular milestone check-ins, and strict backlog prioritization to maintain velocity while preventing technical debt."
    },
    {
      q: "Are your web applications fully optimized for Voice Search and AEO?",
      a: "Yes. Traditional SEO is shifting. I engineer your application with advanced JSON-LD schemas (like FAQPage and BreadcrumbList) directly into the architecture, dramatically increasing your visibility in generative AI summaries and featured snippets."
    },
    {
      q: "Do you offer post-launch support and iterative development?",
      a: "A digital product is a living ecosystem. I offer comprehensive ongoing retainers managing server health, security patches, technical SEO auditing, and consistent feature deployment based on your real-world user feedback."
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-[100px] lg:pt-[120px] pb-24 px-6 lg:px-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-5xl mx-auto text-center mb-24 lg:mb-32">
        <motion.div variants={containerVars} initial="hidden" animate="show">
          <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-8">
            <Rocket size={16} />
            <span className="text-sm font-semibold tracking-wider uppercase">Available for New Projects</span>
          </motion.div>
          
          <motion.h1 variants={itemVars} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-title uppercase tracking-tight mb-8">
            Hire a Top-Tier <span className="text-primary">Next.js Developer</span> & IT Project Manager
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-lg md:text-xl text-foreground leading-relaxed max-w-3xl mx-auto mb-12">
            Turn your startup&apos;s vision into a high-performance, endlessly scalable web application. Partner with a trusted web developer who flawlessly combines enterprise-grade React architecture, technical SEO, and proven IT management.
          </motion.p>
          
          <motion.div variants={itemVars} className="flex justify-center">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-between border border-primary rounded-full pl-8 pr-2 py-2 w-[280px] hover:bg-primary transition-all duration-300 overflow-hidden"
            >
              <span className="text-title font-bold tracking-widest text-sm relative z-10 group-hover:text-black transition-colors duration-300">START A PROJECT</span>
              <span className="bg-primary w-14 h-14 rounded-full flex items-center justify-center relative z-10 shadow-lg group-hover:bg-white transition-colors duration-300">
                <ArrowRight className="text-white group-hover:text-black transition-colors duration-300" size={24} />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 gap-24 lg:gap-32">
        
        {/* 2. ABOUT THE DEVELOPER */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-secondary/30 rounded-[3rem] p-8 lg:p-16 border border-layer-border"
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary uppercase mb-6">Strategic Technical Partner</h2>
            <p className="text-foreground leading-8 mb-6">
              I am Devraj Singh Tomar—a dedicated technical architect and business-minded problem solver. Since 2018, I have helped startups and enterprises transform complex software problems into sleek, profitable digital products.
            </p>
            <p className="text-foreground leading-8">
              A slow, unoptimized website is a massive liability. I specialize in Next.js, React, and full-stack architectures not just to write code, but to engineer solutions built for maximum organic visibility and conversion rate optimization.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              "Enterprise-Grade Next.js Architecture",
              "Answer Engine Optimization (AEO)",
              "Agile IT Project Management",
              "TypeScript & Modern React Patterns"
            ].map((skill, i) => (
              <div key={i} className="flex items-center gap-4 bg-background p-4 rounded-2xl border border-layer-border">
                <CheckCircle className="text-primary shrink-0" size={24} />
                <span className="font-medium text-title">{skill}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 3. SERVICES OFFERED */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-title uppercase tracking-wide mb-4">Engineering Digital Excellence</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary/30 border border-layer-border p-8 rounded-3xl hover:border-primary/50 transition-colors">
              <Code2 className="text-primary mb-6" size={40} />
              <h3 className="text-xl font-bold text-title mb-4">Web Development</h3>
              <p className="text-foreground leading-relaxed">
                Blazing-fast, responsive web apps using Next.js. Leveraging Server-Side Rendering (SSR) and SSG to crush Core Web Vitals and deliver an app-like user experience.
              </p>
            </div>
            <div className="bg-secondary/30 border border-layer-border p-8 rounded-3xl hover:border-primary/50 transition-colors">
              <Search className="text-primary mb-6" size={40} />
              <h3 className="text-xl font-bold text-title mb-4">Technical SEO</h3>
              <p className="text-foreground leading-relaxed">
                SEO built into the blueprint. I integrate dynamic JSON-LD Schema, perfect canonicalization, and flawless semantic HTML to drive qualified organic traffic.
              </p>
            </div>
            <div className="bg-secondary/30 border border-layer-border p-8 rounded-3xl hover:border-primary/50 transition-colors">
              <Briefcase className="text-primary mb-6" size={40} />
              <h3 className="text-xl font-bold text-title mb-4">Project Management</h3>
              <p className="text-foreground leading-relaxed">
                Development chaos ends here. Systematic agile workflows, sprint planning, and rigorous QA ensuring your project hits timelines and stays strictly on budget.
              </p>
            </div>
          </div>
        </section>

        {/* 4. WHY CHOOSE ME */}
        <section className="bg-primary/5 border border-primary/20 rounded-[3rem] p-8 lg:p-16">
           <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-title uppercase tracking-wide mb-4">Your Unfair Technical Advantage</h2>
            <p className="text-foreground max-w-2xl mx-auto">Eliminate the massive overhead of bloated agencies. Get direct access to transparent, high-impact engineering.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <ShieldCheck className="text-primary shrink-0" size={32} />
              <div>
                <h4 className="text-xl font-bold text-title mb-2">Total Transparency</h4>
                <p className="text-foreground">No ignored emails or missed deadlines. You receive clear timelines and honest communication regarding the feasibility of your tech stack.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <BarChart className="text-primary shrink-0" size={32} />
              <div>
                <h4 className="text-xl font-bold text-title mb-2">Business-First Mindset</h4>
                <p className="text-foreground">Every technical decision, from database architecture to frontend frameworks, is routed purely through the lens of your business ROI.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PROCESS */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-title uppercase tracking-wide mb-4">Streamlined 5-Step Process</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              { title: "Deep Discovery & Strategy Architecture", desc: "Outlining user stories, mapping competitors, and defining an aggressive technical blueprint." },
              { title: "UI/UX & Technical Blueprinting", desc: "Defining the Next.js database schema and designing high-converting, user-psychology-driven interfaces." },
              { title: "Agile Engineering & Development", desc: "Writing secure, scalable code in bi-weekly sprints with constant access to a live staging environment." },
              { title: "SEO Injection & Quality Assurance", desc: "Stress-testing Core Web Vitals, injecting AEO schemas, and ensuring absolute mobile responsiveness." },
              { title: "Successful Launch & Scaling", desc: "Zero-downtime deployment, Search Console integration, and providing robust post-launch iteration support." }
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-6 bg-secondary/30 p-6 lg:p-8 rounded-3xl border border-layer-border">
                <div className="w-12 h-12 bg-primary text-background font-bold text-xl flex items-center justify-center rounded-full shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-title mb-2">{step.title}</h3>
                  <p className="text-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FAQ (AEO OPTIMIZED) */}
        <section className="max-w-4xl mx-auto w-full">
           <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-title uppercase tracking-wide mb-4">Frequently Asked Questions</h2>
            <p className="text-foreground max-w-2xl mx-auto">Answers engineered for extreme clarity and Answer Engine Optimization (AEO).</p>
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

        {/* 7. CTA */}
        <section className="bg-primary rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-[#111111] uppercase tracking-tight mb-6">
              Ready to Dominate Your Niche?
            </h2>
            <p className="text-[#222222] font-medium text-lg lg:text-xl max-w-2xl mx-auto mb-10">
              Stop compromising on quality. Every day you operate with a slow, unoptimized platform is a day you hand market share to your competitors.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#111111] text-white hover:bg-white hover:text-[#111111] border-2 border-[#111111] font-bold tracking-widest text-sm rounded-full px-8 py-4 transition-all duration-300"
            >
              SCHEDULE YOUR FREE STRATEGY CALL <Zap size={20} />
            </Link>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#111] rounded-full blur-3xl opacity-20 mix-blend-overlay"></div>
        </section>

      </div>
    </div>
  );
}
