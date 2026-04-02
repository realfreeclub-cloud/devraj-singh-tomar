"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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

  const ventures = [
    {
      title: "Tecxontechnology",
      desc: "Providing technology solutions and IT services.",
    },
    {
      title: "M/S Career Avsar",
      desc: "Providing technology solutions and Printing services.",
    },
    {
      title: "Lotus Loop Media Solution",
      desc: "Delivering media and digital services.",
    },
    {
      title: "TXN Learning",
      desc: "Bridging the skill gap between students and industry.",
    },
    {
      title: "Divyajap",
      desc: "A digital platform focused on spiritual and mantra-based solutions.",
    },
  ];

  return (
    <div className="pt-32 pb-16 min-h-screen px-6 lg:px-16 container-custom mx-auto max-w-6xl">
      <motion.div initial="hidden" animate="show" variants={containerVars}>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-title">
            My <span className="text-primary">Ventures</span>
          </h1>
          <p className="text-foreground text-lg mb-12 max-w-2xl opacity-80">
            A showcase of my partnerships and tech ventures across diverse industries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ventures.map((venture, i) => (
              <motion.div
                key={i}
                variants={itemVars}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-layer border border-layer-border p-8 hover:border-primary/50 transition-colors"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-colors"></div>

                <div className="relative z-10 mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-title">{venture.title}</h2>
                  <p className="text-foreground leading-relaxed opacity-80">{venture.desc}</p>
                </div>

                <div className="relative z-10">
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-layer-border text-title text-sm font-semibold hover:bg-primary hover:text-white transition-all w-max border border-transparent"
                    onClick={(e) => e.preventDefault()}
                  >
                    View Details <ArrowUpRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
