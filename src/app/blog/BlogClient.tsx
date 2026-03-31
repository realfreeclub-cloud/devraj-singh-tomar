"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      title: "How to Build a Startup in India",
      desc: "Navigating the ecosystem from ideation to funding. Key strategies to survive and thrive in the Indian tech landscape.",
      date: "Oct 12, 2026",
      readTime: "8 min read",
    },
    {
      title: "The Ultimate IT Project Management Guide",
      desc: "Methodologies, metrics, and team structures needed to cross the finish line on robust enterprise deployments.",
      date: "Nov 04, 2026",
      readTime: "6 min read",
    },
    {
      title: "Critical UI/UX Mistakes Sabotaging Your Conversions",
      desc: "Why aesthetics alone aren't enough. Unpack common design flaws and learn how to optimize for user journeys.",
      date: "Nov 28, 2026",
      readTime: "5 min read",
    },
    {
      title: "Scaling Digital Products for Maximum Impact",
      desc: "Architectural choices, cloud-native deployments, and growth-hacking strategies to scale seamlessly without bottlenecks.",
      date: "Dec 15, 2026",
      readTime: "10 min read",
    },
  ];

  return (
    <div className="pt-32 pb-16 min-h-screen container-custom mx-auto max-w-6xl px-6 lg:px-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-title">
          Latest <span className="text-primary">Thoughts</span>
        </h1>
        <p className="text-foreground text-lg mb-16 max-w-2xl opacity-80">
          Insights on product development, team management, and leading dynamic tech ventures.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col h-full bg-layer border border-layer-border rounded-3xl p-8 hover:bg-layer/80 transition-all group"
            >
              <div className="flex items-center gap-4 text-xs font-medium text-foreground opacity-60 mb-6">
                <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors text-title">{post.title}</h2>
              <p className="text-foreground leading-relaxed flex-grow opacity-80 mb-8">{post.desc}</p>
              
              <button className="flex items-center gap-2 w-max px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors cursor-none">
                Read More <ArrowRight size={16} />
              </button>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
