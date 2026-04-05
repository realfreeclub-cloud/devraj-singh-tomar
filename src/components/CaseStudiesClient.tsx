"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, ChevronDown, CheckCircle, Target, Activity,
  Briefcase, Globe, LayoutDashboard,
  Share2, ArrowUpRight, Code2
} from "lucide-react";
import { useState } from "react";

export default function CaseStudiesClient() {
  const [activeTab, setActiveTab] = useState<"web" | "social">("web");
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
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // WEB DEVELOPMENT PROJECTS
  const webProjects = [
    // --- EDUCATION & INSTITUTES ---
    { cat: "Education", name: "Anjana Polytechnic", url: "anjanapolytechnic.com", tech: ["Next.js", "CMS", "SEO"], desc: "High-performance institutional portal." },
    { cat: "Education", name: "ASMC Kaushambi", url: "asmckaushambi.in", tech: ["React", "SSG"], desc: "Educational routing hub for admissions." },
    { cat: "Education", name: "Sanskar Global School", url: "sanskarglobalschoolsakrauli.com", tech: ["Next.js", "Tailwind"], desc: "Modern school platform with dynamic routing." },
    { cat: "Education", name: "Career Avsar", url: "careeravsar.org", tech: ["React", "JSON-LD"], desc: "Scalable educational routing hub optimized for rural networks." },
    { cat: "Education", name: "BN Singh PG College", url: "bnsinghpgcollege.com", tech: ["Web Dev", "SEO"], desc: "College admissions and information portal." },
    { cat: "Education", name: "Amethi Public School", url: "amethipublicschool.com", tech: ["CMS", "UI/UX"], desc: "Public school digital infrastructure." },
    { cat: "Education", name: "BSS Academy", url: "bssacademy.com", tech: ["React", "Performance"], desc: "Academy landing architecture." },
    { cat: "Education", name: "VS Memorial School", url: "vsmemorialschool.com", tech: ["CMS", "Frontend"], desc: "Memorial school showcase platform." },
    { cat: "Education", name: "St. Xavier's Public School", url: "stxpbh.com", tech: ["Next.js", "Vercel"], desc: "Premium public school digital presence." },
    { cat: "Education", name: "Anjana Pharmacy", url: "anjanapharmacy.com", tech: ["Web Dev", "Local SEO"], desc: "Pharmacy educational portal." },
    { cat: "Education", name: "National Genius Institute", url: "nationalgeniusinstitute.in", tech: ["Next.js", "Custom CMS"], desc: "High-traffic student enrollment portal." },
    { cat: "Education", name: "NGIT", url: "ngit.org.in", tech: ["React", "SEO"], desc: "Institute operations mapping." },
    { cat: "Education", name: "NGIT Courses", url: "ngitcourses.com", tech: ["Dynamic Routing", "CMS"], desc: "Course delivery and syllabus platform." },
    { cat: "Education", name: "Anjana College", url: "anjanacollege.com", tech: ["Web Dev", "SSG"], desc: "College digital hub." },
    { cat: "Education", name: "Indian Inter College", url: "indianintercollege.com", tech: ["React", "A11y"], desc: "Inter-college communication platform." },
    { cat: "Education", name: "National Computer Allahabad", url: "nationalcomputerallahabad.com", tech: ["Local SEO", "CMS"], desc: "Computer training institute." },
    { cat: "Education", name: "ASNM C Sultanpur", url: "asnmcsultanpur.in", tech: ["Web Dev", "Performance"], desc: "Institutional framework." },
    { cat: "Education", name: "DSLP ASMC Pratapgarh", url: "dslpasmcpratapgarh.org", tech: ["SSG", "Tailwind"], desc: "Educational infrastructure." },
    { cat: "Education", name: "ASMC Kushinagar", url: "asmckushinagar.in", tech: ["Next.js", "SEO"], desc: "Local institute routing." },
    { cat: "Education", name: "ASMC Pilibhit", url: "asmcpilibhit.com", tech: ["Web Dev", "Fast LCP"], desc: "Educational operations platform." },
    { cat: "Education", name: "ASMC Lakhimpur Kheri", url: "asmclakhimpurkheri.in", tech: ["CMS", "Frontend"], desc: "Institute presentation UI." },
    { cat: "Education", name: "ASMC Kanpur Dehat", url: "asmckanpurdehat.in", tech: ["React", "Analytics"], desc: "Analytics driven student site." },
    { cat: "Education", name: "CIS Gauriganj", url: "cisgauriganj.org", tech: ["Web Dev", "SEO"], desc: "School communication portal." },

    // --- BUSINESS & SERVICES ---
    { cat: "Business & Services", name: "The Home Shifting", url: "thehomeshifting.com", tech: ["Next.js", "Maps API"], desc: "National logistics dashboard crushing local bounce rates." },
    { cat: "Business & Services", name: "Navpath", url: "navpath.in", tech: ["React", "SEO"], desc: "Corporate business routing." },
    { cat: "Business & Services", name: "Happy Home Furniture", url: "happyhomefurniture.online", tech: ["Headless CMS", "ISR Edge"], desc: "Heavy image-based storefront resolving painful LCP delays." },
    { cat: "Business & Services", name: "Heaven Garden", url: "heavengarden.in", tech: ["Next.js", "SSG"], desc: "Event and hospitality landing architecture." },
    { cat: "Business & Services", name: "Hotel Sneh", url: "hotelsneh.in", tech: ["Web Dev", "Local SEO"], desc: "Hotel booking and room showcase." },
    { cat: "Business & Services", name: "Shree Ram Sweets", url: "shreeramsweets.com", tech: ["CMS", "Frontend"], desc: "Storefront and catalog UI." },
    { cat: "Business & Services", name: "Lotus Loop", url: "lotusloop.in", tech: ["React", "Tailwind"], desc: "Corporate services matrix." },
    { cat: "Business & Services", name: "Refurhub", url: "refurhub.com", tech: ["eCommerce", "Next.js"], desc: "Refurbished product marketplace." },
    { cat: "Business & Services", name: "Advance Toolbox", url: "advancetoolbox.com", tech: ["Web Dev", "SEO"], desc: "Industrial tools corporate facade." },
    { cat: "Business & Services", name: "Raghav Corporate", url: "raghavcorporateservices.com", tech: ["CMS", "Performance"], desc: "Corporate consulting agency." },

    // --- HEALTHCARE ---
    { cat: "Healthcare", name: "Vasudha Eye Clinic", url: "vasudhaeyegeneralclinic.com", tech: ["a11y Audited", "Schema"], desc: "Premium accessible interface requiring instant bookings." },

    // --- LEGAL / PROFESSIONAL ---
    { cat: "Legal", name: "CLC Chambers", url: "clcchambers.com", tech: ["React Sever", "CSP"], desc: "Impenetrable, un-hackable legal facade." },

    // --- PERSONAL BRANDS ---
    { cat: "Personal Brands", name: "Tushar Nagpal", url: "tusharnagpal.com", tech: ["Next.js Port", "Micro-animations"], desc: "High-end personal branding hub." },
    { cat: "Personal Brands", name: "Javed Siddiquee", url: "javedsiddiqueeofficial.com", tech: ["SEO", "CMS"], desc: "Public figure authority hub." },
    { cat: "Personal Brands", name: "Rajendra Kumar", url: "rajendrakumarmaurya.in", tech: ["React", "Fast LCP"], desc: "Personal authority facade." },

    // --- MEDIA / NEWS ---
    { cat: "Media & News", name: "Gyan Mitra News", url: "gyanmitranews.com", tech: ["Edge Data", "XML"], desc: "Heavy article ingestion engine." },
    { cat: "Media & News", name: "Abhivyakti News", url: "abhivyaktinews.com", tech: ["Next.js", "SSG"], desc: "High traffic digital publication." },

    // --- OTHER PROJECTS ---
    { cat: "Startups", name: "Job Wale", url: "job-wale.com", tech: ["Dynamic Routes", "SEO"], desc: "Job portal mapping." },
    { cat: "Startups", name: "Manav Seva Trust", url: "manavsevatrust.online", tech: ["NGO CMS", "Tailwind"], desc: "Charity foundation platform." },
    { cat: "Startups", name: "Invitation King", url: "invitationking.com", tech: ["React", "Animations"], desc: "Digital invitation maker." },
    { cat: "Startups", name: "Sprene", url: "sprene.com", tech: ["Web Dev", "UI/UX"], desc: "SaaS layout." },
    { cat: "Startups", name: "TXN Learning", url: "txnlearning.com", tech: ["EdTech", "CMS"], desc: "Learning management routing." },
    { cat: "Startups", name: "LCE Computer", url: "lcecomputer.com", tech: ["Next.js", "Local SEO"], desc: "Computer hardware catalog." },
    { cat: "Startups", name: "MRM Al Quran", url: "mrmalquran.com", tech: ["Static Payload", "A11y"], desc: "Religious ed platform." }
  ];

  // SOCIAL MEDIA MANAGEMENT CLIENTS
  const socialProjects = [
    { name: "Suresh Dental Center", industry: "Healthcare Hub", platforms: ["facebook", "instagram", "google"], type: "Content & Local SEO Growth", stats: "+12k Local Reach" },
    { name: "Urban Edge Furnishers", industry: "Retail Logistics", platforms: ["facebook", "instagram", "x"], type: "Aggressive Sales Conversion", stats: "400% ROI Lift" },
    { name: "Legal Core Consulting", industry: "B2B Consultation", platforms: ["x", "google"], type: "Authority Broadcasting & 3-Pack SEO", stats: "Dominating Map Pack" },
    { name: "Genesis Academics", industry: "Education Trust", platforms: ["facebook", "instagram", "google"], type: "Enrollment Drive Content", stats: "5k+ Student Inquiries" }
  ];

  // FEATURED COMBINED CASE STUDIES
  const featuredCases = [
    {
      title: "NGIT Operations Scaling",
      tag: "Web Dev & Admissions Tracking",
      problem: "Crippling legacy server failures during peak admissions matched with non-existent organic SEO.",
      solution: "Ground-up Next.js App Router rebuild natively tied into localized course landing pipelines.",
      tools: ["Next.js", "Node", "Vercel Analytics"],
      results: "+240% Course Indexing | 160% Lead Bump"
    },
    {
      title: "The Home Shifting Growth",
      tag: "Conversion UI & Social Strategy",
      problem: "Advertising spend was hemorrhaging due to an 8-second mobile load time and sterile facebook branding.",
      solution: "Excised dead CSS via React porting whilst completely revamping their FB/Google ad-visual hierarchies.",
      tools: ["Tailwind", "Meta Ads", "Google Business"],
      results: "Sub 1-sec Loads | 3x Conversion Rate"
    },
    {
      title: "Vasudha Clinic Domination",
      tag: "Local SEO & Platform Trust",
      problem: "Elder patients bounced heavily off the outdated site; map listings were severely outranked by competitors.",
      solution: "Deployed pristine accessibilty UX alongside aggressive Google Business Profile Review automation.",
      tools: ["Medical Schema", "GBP APIs", "A11y Checks"],
      results: "Position 2 Rank | Automated Intakes"
    }
  ];

  // AEO FAQS
  const faqs = [
    { q: "Why hire a dual expert for Web Development and Social Media Management?", a: "By unifying your technical website architecture with your social branding (FB, Insta, GBP), you create a frictionless sales funnel. I control both the traffic generation and the structural conversion endpoint." },
    { q: "How does Google Business Profile management impact local SEO?", a: "Google Business Profile optimization directly dictates your rank in the Google Maps 3-Pack. We sync your local citations, map coordinates, and review velocity natively with your Next.js schema." },
    { q: "Are your Next.js applications fully optimized for SEO?", a: "Absolutely. As a Freelance Web Developer in India, I heavily utilize Server-Side Rendering (SSR) and dynamic JSON-LD injection so algorithms instantly parse and rank your data globally." }
  ];

  return (
    <div className="min-h-screen bg-background pt-[100px] lg:pt-[120px] pb-24 px-6 lg:px-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-5xl mx-auto text-center mb-16 lg:mb-20">
        <motion.div variants={containerVars} initial="hidden" animate="show">
          <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-8">
            <Target size={16} />
            <span className="text-sm font-semibold tracking-wider uppercase">Complete Digital Dominance</span>
          </motion.div>
          
          <motion.h1 variants={itemVars} className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-title uppercase tracking-tight mb-8">
            <span className="opacity-40">50+ Projects Across</span><br/>
            Web Development &amp; <span className="text-primary">Social Media</span>
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-lg md:text-xl text-foreground leading-relaxed max-w-3xl mx-auto mb-10">
            I don&apos;t just build websites; I engineer interconnected digital ecosystems. From massive Next.js enterprise portals to explosive Social Media Management funnels. Welcome to the elite tier of execution.
          </motion.p>

          <motion.div variants={itemVars} className="flex justify-center">
             <Link href="#portfolio-tabs" className="bg-primary text-background font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full flex items-center gap-3 hover:bg-white transition-colors duration-300">
               View My Work <ArrowDownIcon size={18} />
             </Link>
          </motion.div>
        </motion.div>
      </section>

      <div className="w-full max-w-[1440px] mx-auto space-y-24 lg:space-y-32">
        
        {/* 2. PORTFOLIO TABS UI */}
        <section id="portfolio-tabs" className="scroll-mt-32">
          
          {/* Toggle UI */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <div className="bg-secondary/40 p-2 rounded-full border border-layer-border flex items-center w-full max-w-lg relative">
               <button 
                 onClick={() => setActiveTab("web")}
                 className={`flex-1 py-4 px-6 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 z-10 flex items-center justify-center gap-2 ${activeTab === "web" ? "text-background" : "text-foreground hover:text-primary"}`}
               >
                 <Code2 size={18} /> Web Projects
               </button>
               <button 
                 onClick={() => setActiveTab("social")}
                 className={`flex-1 py-4 px-6 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 z-10 flex items-center justify-center gap-2 ${activeTab === "social" ? "text-background" : "text-foreground hover:text-primary"}`}
               >
                 <Share2 size={18} /> Social Media
               </button>
               
               {/* Sliding Pill */}
               <div 
                 className={`absolute top-2 bottom-2 w-[calc(50%-0.5rem)] bg-primary rounded-full transition-transform duration-500 ease-in-out shadow-lg ${activeTab === "web" ? "translate-x-0" : "translate-x-full ml-2"}`}
               ></div>
            </div>
          </div>

          <div className="min-h-[600px]">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: WEBSITE PROJECTS */}
              {activeTab === "web" && (
                <motion.div
                  key="web"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                   {webProjects.map((proj, idx) => (
                     <div key={idx} className="bg-secondary/20 border border-layer-border rounded-3xl p-8 hover:border-primary/50 transition-colors duration-300 flex flex-col group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                           <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-lg border border-primary/20">
                             {proj.cat}
                           </span>
                           <Globe size={20} className="text-foreground/30 group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-title tracking-tight mb-2">{proj.name}</h3>
                        <p className="font-mono text-sm text-foreground/50 mb-6">{proj.url}</p>
                        <p className="text-foreground leading-relaxed mb-8 grow">{proj.desc}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                          {proj.tech.map((t, i) => (
                             <span key={i} className="text-xs font-semibold bg-background border border-layer-border px-3 py-1.5 rounded-md text-foreground/80">
                               {t}
                             </span>
                          ))}
                        </div>
                        
                        <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-title font-bold uppercase tracking-widest text-sm group-hover:text-primary transition-colors mt-auto pt-4">
                           Visit Website <ArrowUpRight size={16} />
                        </a>
                     </div>
                   ))}
                </motion.div>
              )}

              {/* TAB 2: SOCIAL MEDIA MANAGEMENT */}
              {activeTab === "social" && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-12"
                >
                   {/* Social Stats Board */}
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                     <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 text-center">
                       <h4 className="text-4xl font-black text-title mb-2">40+</h4>
                       <span className="text-sm tracking-widest uppercase font-bold text-primary">Clients Mapped</span>
                     </div>
                     <div className="bg-secondary/20 border border-layer-border rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-4">
                        <div className="flex gap-4">
                           <FbIcon/> <InstaIcon/> <XIcon/> <GoogleIcon/>
                        </div>
                        <span className="text-sm tracking-widest uppercase font-bold text-foreground/60">Omnichannel Control</span>
                     </div>
                     <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 text-center">
                       <h4 className="text-4xl font-black text-title mb-2">80M+</h4>
                       <span className="text-sm tracking-widest uppercase font-bold text-primary">Impression Engine</span>
                     </div>
                   </div>

                   {/* Social Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                     {socialProjects.map((soc, idx) => (
                       <div key={idx} className="bg-background border border-layer-border rounded-4xl p-8 lg:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start group hover:border-primary/50 transition-colors">
                          <div className="w-24 h-24 bg-secondary/40 rounded-full flex items-center justify-center shrink-0 border border-layer-border relative overflow-hidden group-hover:bg-primary/10 transition-colors">
                             <LayoutDashboard size={32} className="text-primary z-10" />
                          </div>
                          <div className="flex-1 text-center md:text-left">
                             <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-2 gap-4">
                                <h3 className="text-2xl font-extrabold text-title">{soc.name}</h3>
                                <span className="bg-primary text-background font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">{soc.stats}</span>
                             </div>
                             <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">{soc.industry}</span>
                             <p className="text-foreground leading-relaxed mb-6">{soc.type}</p>
                             
                             <div className="flex items-center justify-center md:justify-start gap-3">
                                {soc.platforms.map((plat) => (
                                   <div key={plat} className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center">
                                      {plat === 'facebook' && <FbIcon size={18} />}
                                      {plat === 'instagram' && <InstaIcon size={18} />}
                                      {plat === 'x' && <XIcon size={18} />}
                                      {plat === 'google' && <GoogleIcon size={18} />}
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

        {/* 3. FEATURED CASE STUDIES */}
        <section className="bg-primary/5 border border-primary/20 p-8 lg:p-16 rounded-[4rem]">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-title uppercase tracking-wide mb-4">Deep Architectural Case Studies</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-foreground max-w-2xl mx-auto text-lg">Investigate precisely how we combine front-end reactivity with algorithmic marketing dynamics.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredCases.map((fCase, i) => (
              <div key={i} className="bg-background border border-layer-border rounded-3xl p-8 flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300">
                 <span className="text-xs font-black tracking-widest text-primary uppercase mb-4">{fCase.tag}</span>
                 <h3 className="text-2xl font-extrabold text-title mb-6">{fCase.title}</h3>
                 
                 <div className="space-y-6 grow">
                   <div>
                     <h4 className="flex items-center gap-2 font-bold text-foreground mb-2"><CheckCircle size={16} className="text-red-500"/> Critical Bottleneck</h4>
                     <p className="text-foreground/80 leading-relaxed text-sm">{fCase.problem}</p>
                   </div>
                   <div>
                     <h4 className="flex items-center gap-2 font-bold text-foreground mb-2"><CheckCircle size={16} className="text-green-500"/> Engineered Solution</h4>
                     <p className="text-foreground/80 leading-relaxed text-sm">{fCase.solution}</p>
                   </div>
                 </div>

                 <div className="mt-8 pt-8 border-t border-layer-border">
                    <p className="text-primary font-black text-lg tracking-tight mb-4">{fCase.results}</p>
                    <div className="flex flex-wrap gap-2">
                       {fCase.tools.map(tool => (
                         <span key={tool} className="text-[10px] font-bold tracking-widest uppercase bg-secondary/50 px-2 py-1 rounded text-foreground/60">{tool}</span>
                       ))}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. TRUST & AUTHORITY */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="bg-secondary/20 border border-layer-border p-8 rounded-3xl flex flex-col items-center justify-center text-center">
              <Target size={32} className="text-primary mb-4" />
              <h4 className="text-3xl font-black text-title mb-1">50+</h4>
              <span className="text-xs uppercase font-bold tracking-widest text-foreground/60">Global Projects</span>
           </div>
           <div className="bg-secondary/20 border border-layer-border p-8 rounded-3xl flex flex-col items-center justify-center text-center">
              <Activity size={32} className="text-primary mb-4" />
              <h4 className="text-3xl font-black text-title mb-1">7+ Years</h4>
              <span className="text-xs uppercase font-bold tracking-widest text-foreground/60">Digital Experience</span>
           </div>
           <div className="bg-secondary/20 border border-layer-border p-8 rounded-3xl flex flex-col items-center justify-center text-center">
              <Briefcase size={32} className="text-primary mb-4" />
              <h4 className="text-2xl font-black text-title mb-1">IT Project Head</h4>
              <span className="text-xs uppercase font-bold tracking-widest text-foreground/60">Architectural Role</span>
           </div>
           <div className="bg-secondary/20 border border-layer-border p-8 rounded-3xl flex flex-col items-center justify-center text-center">
              <Globe size={32} className="text-primary mb-4" />
              <h4 className="text-2xl font-black text-title mb-1">6+ Verticals</h4>
              <span className="text-xs uppercase font-bold tracking-widest text-foreground/60">Industries Scaled</span>
           </div>
        </section>

        {/* 5. FAQS (AEO) */}
        <section className="max-w-4xl mx-auto w-full">
           <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-title uppercase tracking-wide mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-layer-border rounded-2xl overflow-hidden bg-secondary/20">
                <button onClick={() => setActiveFaq(activeFaq === index ? null : index)} className="w-full text-left p-6 flex justify-between items-center hover:bg-secondary/40 transition-colors">
                  <span className="font-bold text-title pr-8">{faq.q}</span>
                  <ChevronDown className={`text-primary shrink-0 transition-transform duration-300 ${activeFaq === index ? "rotate-180" : ""}`} size={24} />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="p-6 pt-0 text-foreground leading-relaxed border-t border-layer-border mt-2">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CTA SECTION */}
        <section className="bg-primary rounded-[4rem] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-extrabold text-[#111111] uppercase tracking-tight mb-8">
              Launch Your Next Stage
            </h2>
            <p className="text-[#222222] font-medium text-lg lg:text-xl max-w-3xl mx-auto mb-10">
              Stop handing digital dominance over to competitors. Whether you need a massive technical web overhaul or dedicated social media scaling, let&apos;s engineer absolute superiority.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className="inline-flex items-center justify-center gap-3 bg-[#111111] text-white hover:bg-white hover:text-[#111111] border-2 border-[#111111] font-bold tracking-widest text-sm rounded-full px-10 py-5 transition-all duration-300 w-full sm:w-auto">
                START YOUR PROJECT <ArrowRight size={20} />
              </Link>
              <Link href="/hire" className="inline-flex items-center justify-center gap-3 bg-transparent text-[#111111] border-2 border-[#111111] hover:bg-[#111111] hover:text-white font-bold tracking-widest text-sm rounded-full px-10 py-5 transition-all duration-300 w-full sm:w-auto">
                HIRE ME DIRECTLY
              </Link>
            </div>
          </div>
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl mix-blend-overlay"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#111] rounded-full blur-3xl opacity-20 mix-blend-overlay"></div>
        </section>

      </div>
    </div>
  );
}

// ----------------------
// HELPER ICONS COMPONENTS
// ----------------------
function ArrowDownIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
  );
}
function FbIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  );
}
function InstaIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  );
}
function XIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg> // Actually twitter bird or simple icon
  );
}
function GoogleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
  );
}
