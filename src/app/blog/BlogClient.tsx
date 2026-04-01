"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "./data";

export default function Blog() {
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
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col h-full bg-layer border border-layer-border rounded-3xl p-8 hover:border-primary/50 transition-all group"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-foreground opacity-60 mb-6">
                <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
                <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  <Tag size={10} />{post.category}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors text-title">{post.title}</h2>
              <p className="text-foreground leading-relaxed grow opacity-80 mb-8">{post.description}</p>
              
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-center gap-2 w-max px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Read More <ArrowRight size={16} />
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
