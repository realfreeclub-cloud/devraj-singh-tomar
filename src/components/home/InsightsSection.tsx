"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { blogPosts } from "@/app/blog/data";

export default function InsightsSection() {
  return (
    <section className="py-24 bg-secondary/30 border-y border-layer-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 inline-block">
              Thought Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight">
              Latest <span className="text-primary">Insights</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-foreground/80 max-w-md">
            Strategic essays on technology architecture, startup scaling in India, and IT project governance.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background border border-layer-border rounded-3xl p-8 hover:border-primary/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 text-xs text-foreground/60 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> {post.readTime}
                  </span>
                  <span>•</span>
                  <span className="text-primary font-bold uppercase tracking-wider text-[11px]">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-title mb-3 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  {post.description}
                </p>
              </div>

              <div className="pt-6 border-t border-layer-border">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-title group-hover:text-primary transition-colors"
                >
                  Read Strategic Essay <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
