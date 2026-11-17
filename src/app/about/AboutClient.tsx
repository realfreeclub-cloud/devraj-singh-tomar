"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  GraduationCap,
  Briefcase,
  Award,
  Rocket,
  CheckCircle2,
  Server,
  Target,
  ArrowRight,
  Code2,
  Compass,
  Lightbulb,
  Cpu,
  Layers,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  MapPin,
  Calendar,
  ExternalLink
} from "lucide-react";

export default function AboutClient() {
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

  const journeyMilestones = [
    {
      period: "Early Roots",
      title: "Roots, Family Support & Early Curiosity",
      location: "Kudri, Jhansi (UP)",
      desc: "Growing up in Kudri, a small agricultural village in Jhansi, the digital landscape seemed continents away. Recognizing his son's curiosity, Devraj's father drove him 7 kilometers on a bike in chilling morning winds at 6 AM every day so he could attend a computer center. Devraj became the first person in his village to formally study computers, learning speed typing and Tally fundamentals—sparking a lifelong obsession with technology.",
      badge: "Foundations",
    },
    {
      period: "2014 – 2016",
      title: "Academic Milestones & The Unconventional Choice",
      location: "Orai & Prayagraj (UP)",
      desc: "Completed High School (2014) and Intermediate with Mathematics from Orai (2016). Moving to Prayagraj to prepare for competitive defense examinations, Devraj cleared the demanding Air Force Y Group exam. Standing at a crossroads, he made the deliberate, independent decision to turn down government service to dedicate his career entirely to software engineering, digital systems, and entrepreneurship.",
      badge: "Pivotal Decision",
    },
    {
      period: "2016 – 2018",
      title: "Technical Certifications & First Digital Deployments",
      location: "NGIT, Prayagraj",
      desc: "Fortified his technical foundation with O Level and CCC Certifications from National Genius Institute (NGIT). Mentored by Mr. Javed Siddique, Devraj transitioned from theory to production by building and launching his first functional web portal, laying the groundwork for real-time exam engines.",
      badge: "Applied Learning",
    },
    {
      period: "2018 – 2022",
      title: "Early Professional Work & EdTech Systems",
      location: "Uttar Pradesh",
      desc: "Initiated professional technology consulting and web architecture around 2018. Designed examination portals, typing evaluation software for high-stakes government recruitment candidates, and digital communication tools for regional schools and institutes across Uttar Pradesh.",
      badge: "Industry Entry",
    },
    {
      period: "2022",
      title: "Corporate Operations & High-Velocity Team Leadership",
      location: "Delhi-NCR / Noida",
      desc: "Relocated to the Delhi/Noida technology corridor to achieve complete financial independence. Joined AJIO (Reliance Retail) as an Executive. Demonstrating systematic problem-solving and operational rigor, he earned promotion to Team Leader within 6 months, successfully managing workflows, KPI tracking, and operations for 9 months.",
      badge: "Corporate Leadership",
    },
    {
      period: "2022 – Present",
      title: "Venture Co-Founding & Enterprise Technology Leadership",
      location: "Noida & Pratapgarh",
      desc: "Stepped fully into technology entrepreneurship: co-founded voice infrastructure company Route 2 Shine in Noida; led IT architecture at M/S Career Avsar delivering portals for 7 Government Medical Colleges and 40+ client organizations; and co-founded Lotus Loop Media Solutions in Noida (Sep 2025). Concurrently architected original technology ventures like Divya Jap and NGIT Edu.",
      badge: "Entrepreneurship",
    },
  ];

  const philosophyPrinciples = [
    {
      num: "01",
      title: "Understand the Problem Before Selecting Technology",
      desc: "Frameworks, databases, and libraries are tools—never the objective. I invest significant initial effort into diagnosing root business bottlenecks, user friction points, and operational requirements before writing architectural blueprints.",
    },
    {
      num: "02",
      title: "Prioritize Useful Solutions Over Unnecessary Complexity",
      desc: "Over-engineered architectures cost businesses momentum and money. I believe in writing clean, modular, and maintainable software that solves real user pain points without bloated microservice sprawl or fragile dependencies.",
    },
    {
      num: "03",
      title: "Combine Technical Direction With Business Understanding",
      desc: "A technically elegant platform is useless if it fails to generate revenue, retain clients, or reduce overhead. Every line of code and architectural decision must serve measurable commercial objectives.",
    },
    {
      num: "04",
      title: "Build for Reliability, Usability and Future Growth",
      desc: "Whether building an emergency dialysis triage portal or an examination engine handling concurrent candidate surges, uptime, low latency, and intuitive mobile ergonomics are non-negotiable.",
    },
    {
      num: "05",
      title: "Treat Execution and Continuous Improvement as Equally Important",
      desc: "Launching is only milestone zero. Long-term digital dominance requires rigorous post-launch telemetry, proactive performance audits, and iterative improvements driven by real-world usage data.",
    },
  ];

  const experienceEntries = [
    {
      organization: "Lotus Loop Media Solutions",
      role: "Co-Founder & Technical Head",
      period: "Sep 2025 – Present",
      location: "Noida, UP",
      desc: "Digital media and technology strategy firm delivering high-end technical architectures, enterprise legal portals, and digital transformation initiatives.",
      contributions: [
        "Co-founded alongside Tushar Nagpal, overseeing core technology strategy and digital execution.",
        "Architected zero-trust legal portal for T&S Lex Ink Legal with 100/100 Core Web Vitals.",
        "Engineered automated inbound client funnels and technical SEO frameworks.",
      ],
      link: "https://lotusloop.in",
    },
    {
      organization: "M/S Career Avsar",
      role: "IT Project Head & Systems Architect",
      period: "2023 – Present",
      location: "Pratapgarh, UP",
      desc: "Educational talent, institutional printing, and public digital systems organization operating across Northern India.",
      contributions: [
        "Spearheaded technical development and digital architecture for 7 Government Medical Colleges in UP.",
        "Managed delivery of over 40+ educational, healthcare, and commercial client web ecosystems.",
        "Designed admissions lead funnels resulting in over +300% inquiry surges for partner schools.",
      ],
      link: "https://careeravsar.com",
    },
    {
      organization: "Route 2 Shine",
      role: "Co-Founder & IT Infrastructure Lead",
      period: "2022 – 2023",
      location: "Noida, UP",
      desc: "Voice Process Outsourcing (VPO) and enterprise communication operations firm.",
      contributions: [
        "Engineered complete networking infrastructure, VoIP systems, and hardware diagnostics.",
        "Ensured 99.9% uptime across daily multi-channel communication pipelines.",
        "Established operational security and internal software workflows.",
      ],
    },
    {
      organization: "AJIO (Reliance Retail)",
      role: "Operations Executive → Promoted to Team Leader",
      period: "2022 (15 Months Total)",
      location: "Noida / Delhi-NCR",
      desc: "Major Indian fashion e-commerce enterprise operational facility.",
      contributions: [
        "Earned rapid promotion to Team Leader in 6 months based on analytical troubleshooting and leadership.",
        "Managed workflow optimization and operational metrics for 9 consecutive months.",
        "Acquired deep mastery in team scalability, KPI reporting, and operational efficiency.",
      ],
    },
    {
      organization: "NGIT / EdTech Engineering",
      role: "Technology Consultant & Engine Architect",
      period: "2018 – 2022",
      location: "Prayagraj, UP",
      desc: "Computer certification, typing examination software, and institutional digital presence.",
      contributions: [
        "Architected the NGIT Edu examination evaluation engine with 0ms perceived keystroke lag.",
        "Engineered bilingual Hindi (Mangal/Kruti Dev) and English speed evaluation state machines.",
        "Maintained 99.98% uptime during high-concurrency state recruitment exam surges.",
      ],
      link: "https://ngitedu.com",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-[100px] lg:pt-[120px] pb-24 px-6 lg:px-20 overflow-x-hidden">
      {/* 1. SECTION A: INTRODUCTION */}
      <section className="w-full max-w-5xl mx-auto mb-20 lg:mb-28">
        <motion.div variants={containerVars} initial="hidden" animate="show">
          {/* Breadcrumb */}
          <motion.div variants={itemVars} className="flex items-center gap-2 text-xs font-semibold text-foreground/60 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={13} />
            <span className="text-foreground">About Devraj Singh Tomar</span>
          </motion.div>

          <motion.div
            variants={itemVars}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-8"
          >
            <Compass size={15} />
            <span className="text-xs font-bold tracking-widest uppercase">
              Professional Profile &amp; Journey
            </span>
          </motion.div>

          <motion.h1
            variants={itemVars}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-title uppercase tracking-tight mb-8 leading-tight"
          >
            Technology, Strategy &amp; Ideas That Create <span className="text-primary">Real-World Impact.</span>
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Bio Column */}
            <motion.div variants={itemVars} className="lg:col-span-8 space-y-6 text-base sm:text-lg text-foreground/90 leading-relaxed">
              <p>
                I&apos;m <strong>Devraj Singh Tomar</strong>, a Technology Strategist &amp; Entrepreneur working at the intersection of technology, business and digital innovation. My focus is understanding complex problems, shaping practical solutions and leading digital initiatives from concept to execution.
              </p>
              <p>
                Over the past 7+ years, I have directed and engineered scalable web ecosystems, high-concurrency examination software, and digital transformation platforms for over <strong>60+ enterprise and institutional clients</strong>—ranging from 7 Government Medical Colleges to healthcare clinics, law firms, and high-growth consumer startups.
              </p>
              <p>
                My philosophy is simple: technology should serve business goals, not vanity metrics. Whether optimizing sub-second Core Web Vitals or designing zero-trust inquiry pipelines, I combine technical architecture with commercial pragmatism.
              </p>

              {/* Verified Snapshot Badges */}
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-3.5 py-1.5 rounded-full bg-layer/40 border border-layer-border text-xs font-semibold text-title inline-flex items-center gap-1.5">
                  <MapPin size={13} className="text-primary" /> Jhansi / Noida / UP
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-layer/40 border border-layer-border text-xs font-semibold text-title inline-flex items-center gap-1.5">
                  <Calendar size={13} className="text-primary" /> Active Since 2018
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-layer/40 border border-layer-border text-xs font-semibold text-title inline-flex items-center gap-1.5">
                  <Server size={13} className="text-primary" /> 60+ Web Systems Delivered
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-layer/40 border border-layer-border text-xs font-semibold text-title inline-flex items-center gap-1.5">
                  <Award size={13} className="text-primary" /> 7 Medical Colleges Scaled
                </span>
              </div>
            </motion.div>

            {/* Portrait Column */}
            <motion.div variants={itemVars} className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl bg-layer group">
                <Image
                  src="/devraj-singh-tomar.jpg"
                  alt="Devraj Singh Tomar – Technology Strategist & Entrepreneur"
                  fill
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-background/90 backdrop-blur-md border border-layer-border text-center">
                  <p className="text-xs font-bold text-title">Devraj Singh Tomar</p>
                  <p className="text-[10px] uppercase font-bold text-primary tracking-wider">Technology Strategist</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <div className="w-full max-w-5xl mx-auto space-y-24 lg:space-y-32">
        {/* 2. SECTION B: MY JOURNEY (Verified Milestones Timeline) */}
        <section className="scroll-mt-32">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">
            <Rocket size={15} /> Verified Timeline
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-title uppercase tracking-tight mb-4">
            My Journey &amp; Milestones
          </h2>
          <p className="text-sm sm:text-base text-foreground/80 max-w-2xl mb-12">
            A chronological timeline of verified milestones, from early computer curiosity in rural Bundelkhand to leading enterprise technology architecture.
          </p>

          <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-8 space-y-12">
            {journeyMilestones.map((m, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-10">
                {/* Node indicator */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                <div className="p-6 sm:p-8 rounded-3xl bg-secondary/15 border border-layer-border hover:border-primary/40 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      {m.period}
                    </span>
                    <span className="text-xs font-semibold text-foreground/50 flex items-center gap-1">
                      <MapPin size={12} /> {m.location}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-title mb-3">{m.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SECTION C: MY PHILOSOPHY */}
        <section className="scroll-mt-32 p-8 lg:p-14 rounded-4xl bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">
            <Lightbulb size={15} /> Core Philosophy
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-title uppercase tracking-tight mb-4">
            My Approach to Technology &amp; Engineering
          </h2>
          <p className="text-sm sm:text-base text-foreground/80 max-w-2xl mb-10">
            Guiding principles that dictate how I evaluate business problems, architect systems, and lead product executions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {philosophyPrinciples.map((p, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-background border border-layer-border flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-primary/40 font-mono block mb-2">{p.num}</span>
                  <h3 className="text-lg font-bold text-title mb-3">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SECTION D: PROFESSIONAL EXPERIENCE */}
        <section className="scroll-mt-32">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">
            <Briefcase size={15} /> Track Record
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-title uppercase tracking-tight mb-4">
            Verified Professional Experience
          </h2>
          <p className="text-sm sm:text-base text-foreground/80 max-w-2xl mb-12">
            Documented roles and key contributions across digital agencies, corporate operations, and educational technology partnerships.
          </p>

          <div className="space-y-6">
            {experienceEntries.map((exp, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-secondary/15 border border-layer-border hover:border-primary/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-title">{exp.organization}</h3>
                    <p className="text-sm font-bold text-primary">{exp.role}</p>
                  </div>
                  <div className="text-xs font-semibold text-foreground/60 text-left sm:text-right">
                    <div>{exp.period}</div>
                    <div>{exp.location}</div>
                  </div>
                </div>

                <p className="text-sm text-foreground/85 leading-relaxed mb-6">{exp.desc}</p>

                <div className="space-y-2 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-title block">
                    Key Contributions:
                  </span>
                  <ul className="space-y-2">
                    {exp.contributions.map((c, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85">
                        <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {exp.link && (
                  <div className="pt-4 border-t border-layer-border flex justify-end">
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-title hover:text-primary transition-colors"
                    >
                      <span>Visit Organization</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. SECTION E: PERSONAL APPROACH NARRATIVE */}
        <section className="scroll-mt-32 p-8 lg:p-12 rounded-4xl bg-secondary/20 border border-layer-border">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">
            <Heart size={15} /> Personal Values
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-title uppercase tracking-tight mb-6">
            How I Approach People, Teams &amp; Leadership
          </h2>

          <div className="space-y-6 text-sm sm:text-base text-foreground/90 leading-relaxed">
            <p>
              My journey has reinforced that technical capability is only half the equation of leadership. True progress is anchored in personal integrity, patience, and transparent accountability. Having built businesses from the ground up while shifting across cities, I know that resilience under pressure matters far more than theoretical credentials.
            </p>
            <p>
              When working with teams and clients, I prioritize empathy, absolute clarity, and mutual respect. I do not hide behind jargon or make promises that technology cannot deliver. Whether mentoring junior developers, coordinating with medical college administrators, or consulting with corporate attorneys, I treat every stakeholder relationship as a long-term partnership founded on trust.
            </p>
          </div>
        </section>

        {/* 6. SECTION F: CROSS-LINKING & STRATEGIC CTA */}
        <section className="bg-primary rounded-[3rem] p-10 lg:p-16 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#222222] block mb-3">
              Next Steps
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] uppercase tracking-tight mb-4">
              Explore More of My Work
            </h2>
            <p className="text-[#222222] font-medium text-sm sm:text-base mb-8">
              Inspect the practical systems, technical capabilities, and business ventures I&apos;ve helped build.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/expertise"
                className="px-7 py-3.5 rounded-full bg-[#111111] text-white hover:bg-white hover:text-[#111111] font-bold text-xs uppercase tracking-widest transition-all"
              >
                View Expertise
              </Link>
              <Link
                href="/case-studies"
                className="px-7 py-3.5 rounded-full bg-transparent border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs uppercase tracking-widest transition-all"
              >
                Case Studies
              </Link>
              <Link
                href="/ventures"
                className="px-7 py-3.5 rounded-full bg-transparent border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs uppercase tracking-widest transition-all"
              >
                My Ventures
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
