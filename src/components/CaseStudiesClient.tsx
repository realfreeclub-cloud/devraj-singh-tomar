"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, ChevronDown, CheckCircle, Target, ShieldCheck, 
  GraduationCap, Building2, Stethoscope, Scale, Radio, 
  Star, Briefcase, Globe, LayoutDashboard 
} from "lucide-react";
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

  const categories = [
    {
      title: "Educational Institutes & Universities",
      icon: GraduationCap,
      desc: "As a dedicated Website Developer for Schools India, I've systematized infrastructure for over two dozen institutions. These portals handle real-time CMS scaling, instant rural load speeds, and deep local SEO queries.",
      projects: [
        "anjanapolytechnic.com", "asnmcsultanpur.in", "careeravsar.org",
        "anjanapharmacy.com", "asmckushinagar.in", "bnsinghpgcollege.com",
        "anjanacollege.com", "asmcpilibhit.com", "amethipublicschool.com",
        "asmckaushambi.in", "asmclakhimpurkheri.in", "bssacademy.com",
        "sanskarglobalschoolsakrauli.com", "asmckanpurdehat.in", "vsmemorialschool.com",
        "stxpbh.com", "cisgauriganj.org", "nationalgeniusinstitute.in",
        "ngit.org.in", "ngitcourses.com", "indianintercollege.com",
        "nationalcomputerallahabad.com", "dslpasmcpratapgarh.org"
      ]
    },
    {
      title: "Enterprise Business & Services",
      icon: Building2,
      desc: "For B2B and highly saturated consumer services, loading fastest absorbs the market share. I eliminate cart abandonment via high-fidelity Next.js SEO optimization patterns.",
      projects: [
        "thehomeshifting.com", "hotelsneh.in", "advancetoolbox.com",
        "navpath.in", "shreeramsweets.com", "raghavcorporateservices.com",
        "happyhomefurniture.online", "lotusloop.in", "heavengarden.in", "refurhub"
      ]
    },
    {
      title: "Specialized Healthcare Infrastructure",
      icon: Stethoscope,
      desc: "Healthcare requires digital environments built entirely on authority and clarity. Integrating rigorous accessibility protocols and targeted near-me medical schemas.",
      projects: ["vasudhaeyegeneralclinic.com"]
    },
    {
      title: "Legal & Professional Services",
      icon: Scale,
      desc: "In the legal sphere, aesthetics project competence. Engineering high-ticket professional consultants with ultra-premium UI/UX atop brutalist performance metrics.",
      projects: ["clcchambers.com"]
    },
    {
      title: "Digital Media & News Networks",
      icon: Radio,
      desc: "Publishing networks die if routing lag occurs. Deployed scalable CMS stacks serving thousands of breaking news articles with absolutely zero latency.",
      projects: ["gyanmitra news", "abhivyakti news"]
    },
    {
      title: "High-Profile Personal Branding",
      icon: Star,
      desc: "The global digital resume. I engineer absolutely pristine, hyper-performant personal branding hubs that dominate personal-name SEO search parameters.",
      projects: ["tusharnagpal.com", "javedsiddiqueeofficial.com", "rajendrakumarmaurya.in"]
    },
    {
      title: "Ancillary Platforms & Startups",
      icon: LayoutDashboard,
      desc: "A wide spectrum of robust deployment mapping encompassing local charities, learning platforms, and SaaS applications.",
      projects: ["job-wale.com", "manavsevatrust.online", "invitation king", "sprene", "txnlearning", "lce computer", "mrm al quran"]
    }
  ];

  const caseStudies = [
    {
      title: "National Genius Institute (NGIT)",
      client: "nationalgeniusinstitute.in / ngit.org.in",
      problem: "The institute's legacy platform was deeply outdated, relying on a sluggish database infrastructure failing during peak admission seasons. Organic visibility was completely crippled by heavy Javascript blocking.",
      solution: "Ground-up architectural rebuild utilizing Next.js Server Components. Engineered an active CMS integration enabling non-technical administration to instantly push dynamic course routing capturing local queries.",
      tech: ["Next.js App Router", "Node.js", "Custom CMS", "VSO JSON-LD Schema"],
      results: [
        { label: "Course Indexing", val: "+240%" },
        { label: "Brochure Leads", val: "+160%" },
        { label: "Google Snippets", val: "4 Major Queries" }
      ]
    },
    {
      title: "The Home Shifting",
      client: "thehomeshifting.com",
      problem: "92% mobile traffic pool was encountering a devastating 8-second Time-to-Interactive (TTI) rate, leading to an 85% bounce rate on their severe local-ad spend budget.",
      solution: "Ruthless frontend optimization. Rebuilt utilizing React frameworks stripping away 70% dead CSS. Integrated modern AVIF pipelines. Applied precise hyper-local Search Engine configurations.",
      tech: ["Next.js Hybrid", "Tailwind CSS", "Local Ads Mapping"],
      results: [
        { label: "Conversion Rate", val: "3x Triple" },
        { label: "Bounce Rate", val: "-60%" },
        { label: "Google 3-Pack", val: "Secured" }
      ]
    },
    {
      title: "Happy Home Furniture",
      client: "happyhomefurniture.online",
      problem: "Traditional SQL databases querying massive, un-optimized high-res furnishing images destroyed their Core Web Vitals, actively penalizing their Google search placements.",
      solution: "Flawless headless commerce execution via Incremental Static Regeneration (ISR). The site serves virtually instantly as a static page while webhooks instantly refresh granular inventory counts.",
      tech: ["React Base", "Webhooks", "Edge Caching", "GraphQL"],
      results: [
        { label: "LCP Speed", val: "1.1s (from 5.5s)" },
        { label: "Layout Shift", val: "Zero (0)" },
        { label: "Add-To-Cart", val: "+85%" }
      ]
    },
    {
      title: "Vasudha Eye General Clinic",
      client: "vasudhaeyegeneralclinic.com",
      problem: "Elder demographics struggled drastically with the older UI, and clinical search visibility was completely blinded due to lacking H-tag hierarchies and metadata structuring.",
      solution: "Extreme UX simplification rooted in high-contrast a11y protocols. Mapped a strict MedicalClinic JSON-LD schema explicitly feeding operating hours directly into Google SERPs.",
      tech: ["Vercel Edge", "Tailwind a11y", "Strict Semantic HTML"],
      results: [
        { label: "Organic Rank", val: "Position 2 rank" },
        { label: "UX Flow Drop", val: "Resolved" },
        { label: "Out-Of-Hours", val: "Automated Booking" }
      ]
    },
    {
      title: "CLC Chambers",
      client: "clcchambers.com",
      problem: "An insecure, highly bloated WordPress setup constantly suffering from script injection vulnerabilities, dragging down an elite legal branding facade.",
      solution: "Excised the vulnerable PHP monolith entirely. Bootstrapped a statically generated Next.js layout lacking any database hooks accessible via the frontend—making it functionally un-hackable.",
      tech: ["Static Export", "Framer Motion", "CSP Headers Security"],
      results: [
        { label: "Lighthouse Score", val: "100/100/100/100" },
        { label: "Downtime", val: "Absolutely 0%" },
        { label: "Premium Authority", val: "Secured" }
      ]
    }
  ];

  const faqs = [
    {
      q: "Do you primarily work exclusively as a Website Developer for Schools India based, or take global cases?",
      a: "While I dominate the Indian institutional, business, and educational digital landscape, my exact Next.js React codebase architecture is deployed globally. Elite code scales across physical borders without any friction whatsoever."
    },
    {
      q: "Why is hiring a Freelance Web Developer in India better than hiring an agency?",
      a: "Agencies notoriously pass your project down to junior developers while charging massive administrative overhead fees. By hiring an independent IT Project Head, you get senior-tier technical architecture entirely focused strictly on your final results."
    },
    {
      q: "What is the fastest way to get my website ranking using an SEO Expert India?",
      a: "The absolute fastest path to massive organic traffic is eradicating technical debt. By fixing heavy Javascript payloads, repairing broken dynamic routes, and injecting perfect JSON-LD structured data into your Next.js application, Google algorithms immediately reward your platform."
    },
    {
      q: "Do you actively manage the websites after initial deployment?",
      a: "Absolutely. Digital architecture is a living organism. Through strategic partnerships and retainers, I continuously monitor your Core Web Vitals, implement security hot-fixes natively, and aggressively iterate layout structures based entirely on active user heat-mapping."
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-[100px] lg:pt-[120px] pb-24 px-6 lg:px-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-5xl mx-auto text-center mb-24 lg:mb-32">
        <motion.div variants={containerVars} initial="hidden" animate="show">
          <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-8">
            <Globe size={16} />
            <span className="text-sm font-semibold tracking-wider uppercase">50+ Real Client Platforms Engineered</span>
          </motion.div>
          
          <motion.h1 variants={itemVars} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-title uppercase tracking-tight mb-8">
            Engineering <span className="text-primary">Exponential</span> Digital Growth
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-lg text-foreground leading-relaxed max-w-4xl mx-auto mb-8">
            Welcome to the definitive digital portfolio. In an industry flooded with &quot;website builders&quot; relying on drag-and-drop templates, the difference between simply having a website and deeply engineering a high-performance digital machine is the absolute difference between market stagnation and exponential scale. 
          </motion.p>
          <motion.p variants={itemVars} className="text-lg text-foreground leading-relaxed max-w-4xl mx-auto">
            Over the course of my career as an elite technical architect and **IT Project Head**, I have successfully delivered, managed, and scaled over 50 real-world client platforms spanning the most competitive industries in the modern market. If you are seeking an authoritative **SEO Expert India** or high-end **Freelance Web Developer**, examine the profound metrics below.
          </motion.p>
        </motion.div>
      </section>

      <div className="w-full max-w-[1440px] mx-auto space-y-32">
        
        {/* 2. CATEGORIZED PORTFOLIO DEEP DIVE */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-title uppercase tracking-wide mb-4">Transforming Industries Through Code</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-foreground max-w-3xl mx-auto text-lg">Every vertical demands a completely unique digital architecture. A medical clinic requires drastically different conversion funnels compared to an e-commerce storefront. Below is my explicit sector deployment record.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {categories.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-secondary/10 border border-layer-border p-8 rounded-4xl flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary/20 flex items-center justify-center rounded-2xl">
                    <cat.icon size={28} className="text-primary"/>
                  </div>
                  <h3 className="text-2xl font-bold text-title tracking-tight">{cat.title}</h3>
                </div>
                <p className="text-foreground text-lg mb-8 opacity-90">{cat.desc}</p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {cat.projects.map((proj, pIdx) => (
                      <span key={pIdx} className="bg-background border border-layer-border text-foreground/80 text-sm px-3 py-1.5 rounded-lg font-medium tracking-wide">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. FEATURED CASE STUDIES */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-title uppercase tracking-wide mb-4">Deep Technical Case Studies</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-foreground max-w-3xl mx-auto text-lg">Examine the precise mathematical improvements mapped across five highly specific enterprise deployments proving exactly why I remain an elite **Next.js Developer India**.</p>
          </div>

          <div className="space-y-16">
             {caseStudies.map((study, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 className="bg-secondary/20 border border-layer-border rounded-[3rem] p-8 lg:p-12"
               >
                 <div className="flex flex-col lg:flex-row gap-12">
                   {/* Left Side: Stats & Details */}
                   <div className="lg:w-1/3">
                      <div className="mb-8">
                        <h3 className="text-3xl font-extrabold text-title tracking-tight mb-2">{study.title}</h3>
                        <span className="text-primary font-bold tracking-widest text-sm uppercase">{study.client}</span>
                      </div>
                      <div className="space-y-4 mb-8">
                        {study.results.map((res, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-background border border-primary/20 rounded-2xl relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-12 h-12 bg-primary/10 rounded-full blur-xl"></div>
                             <span className="font-semibold text-foreground/70 uppercase text-xs tracking-widest">{res.label}</span>
                             <span className="font-black text-xl text-title">{res.val}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <h4 className="text-xs font-black tracking-widest text-foreground/50 uppercase mb-3">Tech Infrastructure</h4>
                        <div className="flex flex-wrap gap-2">
                          {study.tech.map((t, i) => (
                             <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg border border-primary/20">
                               {t}
                             </span>
                          ))}
                        </div>
                      </div>
                   </div>

                   {/* Right Side: Narrative */}
                   <div className="lg:w-2/3 flex flex-col justify-center space-y-8">
                      <div>
                        <h4 className="text-xl font-bold flex items-center gap-3 mb-3 text-title">
                          <span className="w-8 h-8 rounded bg-red-500/20 text-red-500 flex items-center justify-center">01</span>
                          The Problem Encountered
                        </h4>
                        <p className="text-lg text-foreground leading-relaxed pl-11">{study.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold flex items-center gap-3 mb-3 text-title">
                          <span className="w-8 h-8 rounded bg-green-500/20 text-green-500 flex items-center justify-center">02</span>
                          The Technical Solution
                        </h4>
                        <p className="text-lg text-foreground leading-relaxed pl-11">{study.solution}</p>
                      </div>
                   </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </section>

        {/* 4. AUTHORITY SECTION */}
        <section className="bg-primary/5 border border-primary/20 rounded-[4rem] p-10 lg:p-20 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-title uppercase tracking-wide mb-8">Absolute Corporate Authority</h2>
            <p className="text-foreground text-lg leading-relaxed max-w-4xl mx-auto mb-12">
              When handling budgets scaling from disruptive startups to massive institutional infrastructures, there is absolutely zero room for amateur execution. Technical architecture failures, server downtime, and SEO cannibalization cost real companies thousands of dollars per hour.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-background border border-layer-border p-6 rounded-3xl flex flex-col items-center">
                <Target size={32} className="text-primary mb-4" />
                <h4 className="font-bold text-lg mb-1">50+</h4>
                <span className="text-sm text-foreground/70 uppercase tracking-widest font-semibold">Web Platforms</span>
              </div>
              <div className="bg-background border border-layer-border p-6 rounded-3xl flex flex-col items-center">
                <MapPinIcon size={32} className="text-primary mb-4" />
                <h4 className="font-bold text-lg mb-1">Pan-India</h4>
                <span className="text-sm text-foreground/70 uppercase tracking-widest font-semibold">Global Reach</span>
              </div>
               <div className="bg-background border border-layer-border p-6 rounded-3xl flex flex-col items-center">
                <Briefcase size={32} className="text-primary mb-4" />
                <h4 className="font-bold text-lg mb-1">IT Project Head</h4>
                <span className="text-sm text-foreground/70 uppercase tracking-widest font-semibold">Execution Role</span>
              </div>
               <div className="bg-background border border-layer-border p-6 rounded-3xl flex flex-col items-center">
                <ShieldCheck size={32} className="text-primary mb-4" />
                <h4 className="font-bold text-lg mb-1">7+ Years</h4>
                <span className="text-sm text-foreground/70 uppercase tracking-widest font-semibold">Elite Experience</span>
              </div>
            </div>
            <p className="text-foreground text-lg leading-relaxed max-w-4xl mx-auto mt-12 bg-secondary/30 p-6 rounded-2xl border border-layer-border">
              By hiring me directly, you are explicitly bypassing massive bloated agency fees to gain direct, unfiltered access to an elite technical operator whose only metric of success is your business scaling exponentially.
            </p>
        </section>

        {/* 5. SERVICES PIPELINE */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-secondary/10 p-8 lg:p-16 rounded-[4rem] border border-layer-border">
             <div>
               <h2 className="text-3xl lg:text-5xl font-bold text-title tracking-tight mb-6">The Operations Ecosystem</h2>
               <p className="text-lg text-foreground leading-relaxed mb-6">Every single success story detailed across these 50+ domain URLs traces back entirely to a highly rigid, unyielding four-pillar service operation.</p>
             </div>
             <div className="space-y-4">
               {[
                 { t: "Website Development (Next.js)", d: "Violently fast Server-Side Rendered (SSR) machines." },
                 { t: "SEO Optimization", d: "Dynamic canonicals and flawless JSON-LD AEO injection." },
                 { t: "Radical Performance Scaling", d: "Slashing LCP delays completely saving you lost revenue." },
                 { t: "Strategic IT Project Management", d: "Strict agile sprint pacing and absolute project visibility." }
               ].map((srv, i) => (
                 <div key={i} className="flex items-start gap-4 p-4 bg-background border border-layer-border rounded-2xl">
                   <div className="mt-1"><CheckCircle className="text-primary" size={20}/></div>
                   <div>
                     <h5 className="font-bold text-title">{srv.t}</h5>
                     <span className="text-foreground/80 text-sm">{srv.d}</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* 6. FAQ (AEO OPTIMIZED) */}
        <section className="max-w-4xl mx-auto w-full">
           <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-title uppercase tracking-wide mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-foreground max-w-2xl mx-auto">Answers formulated purely for Answer Engine Optimization (AEO).</p>
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
        <section className="bg-primary rounded-[4rem] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-extrabold text-[#111111] uppercase tracking-tight mb-8">
              Engineer Absolute Superiority
            </h2>
            <p className="text-[#222222] font-medium text-lg lg:text-xl max-w-4xl mx-auto mb-10">
              In an era where attention spans are measured in absolute milliseconds, every single day you operate with substandard, unoptimized, and sluggish web architecture is a day you actively hand your market share directly to your competitors.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-[#111111] text-white hover:bg-white hover:text-[#111111] border-2 border-[#111111] font-bold tracking-widest text-sm rounded-full px-10 py-5 transition-all duration-300 w-full sm:w-auto"
              >
                START YOUR PROJECT <ArrowRight size={20} />
              </Link>
              <Link
                href="/hire"
                className="inline-flex items-center justify-center gap-3 bg-transparent text-[#111111] border-2 border-[#111111] hover:bg-[#111111] hover:text-white font-bold tracking-widest text-sm rounded-full px-10 py-5 transition-all duration-300 w-full sm:w-auto"
              >
                HIRE ME DIRECTLY
              </Link>
            </div>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl mix-blend-overlay"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#111] rounded-full blur-3xl opacity-20 mix-blend-overlay"></div>
        </section>

      </div>
    </div>
  );
}

// Temporary Icon for Layout
function MapPinIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  )
}
