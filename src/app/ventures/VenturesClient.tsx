"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Target, Code, Users, Cpu, Palette, GraduationCap, Brain, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ventures } from "./data";

export default function Ventures() {
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const roles = [
    { title: "IT Project Management", icon: Code },
    { title: "Web & App Development", icon: Brain },
    { title: "UI/UX Optimization", icon: Palette },
    { title: "Technical Training", icon: GraduationCap },
    { title: "Digital Product Development", icon: Target },
    { title: "Startup Strategy & Execution", icon: Cpu },
    { title: "Strategic Planning", icon: Users },
  ];

  const categoryColors: Record<string, string> = {
    Education: "bg-emerald-500/10 text-emerald-400",
    Media: "bg-blue-500/10 text-blue-400",
    Technology: "bg-violet-500/10 text-violet-400",
    Design: "bg-pink-500/10 text-pink-400",
    Services: "bg-orange-500/10 text-orange-400",
  };

  return (
    <div className="pt-32 pb-16 min-h-screen px-6 lg:px-16 container-custom mx-auto max-w-6xl">
      <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } } as Variants}>

        {/* ── Requirement 3: Hidden SEO content (sr-only) ── */}
        <div className="sr-only" aria-hidden="true">
          <p>
            Professional ventures and project portfolio of Devraj Singh Tomar, also known as Devraj Tomar or Devraj Singh. 
            Devraj is an IT Project Head and Partner at M/S Career Avsar. 
            He has been leading digital platforms and scaling tech ventures since 2018.
          </p>
        </div>

        {/* Roles Section */}
        <motion.div variants={itemVars} className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center md:text-left text-title">
            My <span className="text-primary">Expertise</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((role, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center p-6 bg-layer/50 border border-layer-border rounded-2xl hover:bg-layer transition-colors group">
                <role.icon className="w-8 h-8 text-primary mb-3 opacity-80 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-foreground text-sm">{role.title}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tecxon Technology Section - Corrected Name */}
        <motion.div variants={itemVars} className="mb-16">
          <div className="bg-linear-to-br from-primary/15 to-secondary/5 border border-primary/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[80px]"></div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-title relative z-10">
              Founder of <span className="text-primary">Tecxon Technology</span>
            </h2>
            <p className="text-foreground text-lg leading-relaxed max-w-3xl relative z-10 mb-4">
              As the Founder of Tecxon Technology, Devraj Singh Tomar has taken a step beyond individual success to create opportunities for others. The organization focuses on developing innovative digital products, providing internship opportunities, training students in real-world technologies, and helping startups and businesses grow.
            </p>
            <Link href="/ventures/sprene" className="inline-flex items-center gap-2 text-primary font-bold relative z-10 group mt-2">
              Learn more about our tech 
              <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-title">
            My <span className="text-primary">Ventures</span>
          </h1>
          <p className="text-foreground text-lg mb-12 max-w-2xl opacity-80">
            A showcase of professional ventures across education, media, technologies, and services — each reflecting dedication to scalability and technical excellence.
          </p>

          <motion.div variants={containerVars} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ventures.map((venture, i) => (
              <motion.div
                key={i}
                variants={itemVars}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-layer border border-layer-border p-8 hover:border-primary/50 transition-colors"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-colors"></div>

                <div className="relative z-10 mb-8 grow">
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${categoryColors[venture.category] || "bg-primary/10 text-primary"}`}>
                    {venture.category}
                  </span>
                  <h2 className="text-2xl font-bold mb-4 text-title group-hover:text-primary transition-colors">{venture.title}</h2>
                  <p className="text-foreground leading-relaxed opacity-80 text-sm">{venture.shortDesc}</p>
                </div>

                <div className="relative z-10 pt-4">
                  <Link
                    href={`/ventures/${venture.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-layer-border text-title text-sm font-semibold hover:bg-primary hover:text-white transition-all w-max border border-transparent group/btn"
                  >
                    View More <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
