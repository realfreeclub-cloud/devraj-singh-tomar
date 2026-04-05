"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Search, Zap, Briefcase, CheckCircle, ShieldCheck, Target, Layers } from "lucide-react";

export default function ServicesClient() {
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

  const services = [
    {
      id: "web-development",
      title: "High-Performance Website Development",
      subtitle: "(Next.js & React)",
      icon: Code2,
      desc: "Modern web development is no longer about throwing together an off-the-shelf template. It is about deeply engineering a flawless, secure, and infinitely scalable application. Utilizing React Server Components and Static Site Generation (SSG), I engineer interactive digital ecosystems that feel as swift as a native app while retaining absolute crawling dominance.",
      benefits: [
        "Insane Scalability (100 to 100k visitors effortlessly)",
        "Ironclad Security via Headless Architecture",
        "Total Codebase Ownership (No CMS vendor lock-in)",
        "Flawless Cross-Platform UI Rendering"
      ],
      useCases: "Enterprise E-Commerce, B2B SaaS Landing Pages, High-Traffic Media Portals"
    },
    {
      id: "seo-services",
      title: "Advanced Technical SEO Services",
      subtitle: "For High-Ranking Websites",
      icon: Search,
      desc: "A visually stunning application is financially useless if your target audience cannot find it on page one of Google. My SEO Services for Websites move far beyond archaic keyword stuffing into structural manipulation. From engineering deep JSON-LD schemas targeted at Voice Search (VSO) and AI-driven Answer Engines, your site will biologically signal algorithmic authority.",
      benefits: [
        "Algorithmic Superiority via semantic HTML & Metadata APIs",
        "Zero-Click Dominance (Featured Snippet Targeting)",
        "Sustainable Organic ROI (Lowering CAC fundamentally)",
        "Cannibalization Prevention via Route Siloing"
      ],
      useCases: "Service-Based Businesses, Ed-Tech Publishers, Brands facing historical algorithmic penalties"
    },
    {
      id: "performance-optimization",
      title: "Radical Performance Optimization",
      subtitle: "Speed & Core Web Vitals",
      icon: Zap,
      desc: "Speed is the ultimate digital currency. Every single second of latency destroys your conversion rate. I conduct deep micro-audits targeting Google's Core Web Vitals—focusing entirely on obliterating Largest Contentful Paint (LCP) delays, erratic Cumulative Layout Shifts (CLS), and aggressive Javascript bundle bloating.",
      benefits: [
        "Guaranteed High Lighthouse Scores (100/100 targeting)",
        "Plunging Bounce Rates preserving user engagement",
        "Native AVIF/WebP image compression pipelines",
        "Direct Google Ranking Favoritism"
      ],
      useCases: "Stagnant Media Portfolios, Legacy SPA Migrations, High-Volume Advertising Funnels"
    },
    {
      id: "project-management",
      title: "Strategic IT Project Management",
      subtitle: "Disciplined Engineering Execution",
      icon: Briefcase,
      desc: "Developing elite software fails without elite execution. Leveraging deep technical expertise alongside rigorous operational discipline, I establish precise developer workflows, manage agile sprint cycles, prioritize crucial backlog features, and enforce relentless Quality Assurance standards across the entire build phase.",
      benefits: [
        "Absolute Transparency in tracking sprint progress",
        "Eradicating Technical Debt early in the lifecycle",
        "Zero-Downtime Deployments via CI/CD pipelines",
        "Aggressive Scope Protection guaranteeing timely launches"
      ],
      useCases: "Non-Technical Startup Founders, Corporate Infrastructure Restructuring, Rapid Scaling Prototypes"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-[100px] lg:pt-[120px] pb-24 px-6 lg:px-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-5xl mx-auto text-center mb-20 lg:mb-28">
        <motion.div variants={containerVars} initial="hidden" animate="show">
          <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-8">
            <Target size={16} />
            <span className="text-sm font-semibold tracking-wider uppercase">Strategic Digital Engineering</span>
          </motion.div>
          
          <motion.h1 variants={itemVars} className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-title uppercase tracking-tight mb-8 leading-tight">
            Transform Your Digital Presence: <br/> 
            <span className="text-primary text-3xl md:text-5xl lg:text-6xl">Premier Web Development Services</span>
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-lg text-foreground leading-relaxed max-w-4xl mx-auto mb-8">
            Your website is the absolute epicenter of your entire digital operation. It is your hardest-working salesperson, your corporate headquarters, and your primary organic lead generation engine. In an algorithmic era dominated by artificial intelligence, a slow, generic website is a critical business liability.
          </motion.p>
          <motion.p variants={itemVars} className="text-lg text-foreground leading-relaxed max-w-4xl mx-auto">
            As a specialized engineering partner based in India, I bridge the massive gap between stunning visual aesthetics and ruthless, data-driven backend performance.
          </motion.p>
        </motion.div>
      </section>

      <div className="w-full max-w-[1440px] mx-auto space-y-24 lg:space-y-32">
        
        {/* 2. SERVICES LISTING */}
        <section className="space-y-16">
          {services.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-start bg-secondary/10 border border-layer-border rounded-[3rem] p-8 lg:p-12`}
            >
              <div className="lg:w-1/2">
                <div className="w-20 h-20 bg-primary/20 flex items-center justify-center rounded-3xl mb-8 relative">
                   <div className="absolute inset-0 bg-primary rounded-3xl blur-xl opacity-30"></div>
                   <service.icon size={40} className="text-primary relative z-10" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-title tracking-tight mb-2 uppercase">{service.title}</h2>
                <h3 className="text-xl text-primary font-bold mb-6 tracking-wider uppercase opacity-80">{service.subtitle}</h3>
                <p className="text-foreground text-lg leading-8 mb-8">{service.desc}</p>
                
                <div className="bg-background/50 border border-layer-border p-6 rounded-2xl">
                  <h4 className="text-xs font-black tracking-widest text-foreground/50 uppercase mb-4 flex items-center gap-2">
                    <Layers size={14}/> Core Advantages & Benefits
                  </h4>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <CheckCircle size={20} className="text-primary shrink-0 mt-1" />
                        <span className="text-foreground font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="lg:w-1/2 w-full bg-secondary/30 rounded-4xl p-8 lg:p-12 border border-layer-border flex flex-col justify-center h-full min-h-[400px] relative overflow-hidden">
                 {/* Abstract BG element */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
                 
                 <ShieldCheck size={32} className="text-primary mb-6" />
                 <h4 className="text-2xl font-bold text-title mb-4 uppercase">Ideal Use Cases</h4>
                 <p className="text-lg text-foreground leading-loose pl-4 border-l-4 border-primary">
                   {service.useCases}
                 </p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* 3. PRICING HINT */}
        <section className="bg-primary/5 border border-primary/20 rounded-[3rem] p-8 lg:p-16 text-center max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-title uppercase tracking-wide mb-6">Transparent Investment Structuring</h2>
            <p className="text-foreground text-lg leading-8 max-w-4xl mx-auto mb-8">
              Building impactful software is widely recognized as one of the highest ROI investments an organization can execute. Because I cater to a vast variety of scaling stages, my pricing remains distinctly flexible and structurally transparent.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
               <div className="bg-background border border-layer-border p-8 rounded-3xl">
                 <h3 className="text-xl font-bold text-primary mb-4 uppercase tracking-wide">Project-Based Engineering</h3>
                 <p className="text-foreground leading-relaxed">Perfect for comprehensive overhauls such as complete website rebuilds, aggressive technical SEO auditing, or ground-up enterprise architecture. Engagements are scoped strictly on defined deliverables guaranteeing zero surprise billing loops.</p>
               </div>
               <div className="bg-background border border-layer-border p-8 rounded-3xl">
                 <h3 className="text-xl font-bold text-primary mb-4 uppercase tracking-wide">Strategic Partnership Retainers</h3>
                 <p className="text-foreground leading-relaxed">Designed for serious scaling. I embed myself as your fractional CTO guaranteeing ongoing iteration, heavy monthly SEO tracking, and constant performance optimization based completely on your live market feedback metrics.</p>
               </div>
            </div>
        </section>

        {/* 4. CTA */}
        <section className="bg-primary rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-[#111111] uppercase tracking-tight mb-6">
              Ready to Radically Upgrade?
            </h2>
            <p className="text-[#222222] font-medium text-lg lg:text-xl max-w-3xl mx-auto mb-10">
              Stop handing digital dominance over to your closest competitors holding superior architecture. Let&apos;s systematically assess your business bottlenecks and architect a digital platform engineered entirely for absolute market superiority.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#111111] text-white hover:bg-white hover:text-[#111111] border-2 border-[#111111] font-bold tracking-widest text-sm rounded-full px-8 py-4 transition-all duration-300"
            >
              BOOK YOUR STRATEGY BREAKDOWN <ArrowRight size={20} />
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
