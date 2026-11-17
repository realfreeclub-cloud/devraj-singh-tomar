"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { blogPosts } from "@/app/blog/data";

export default function InsightsSection() {
  return (
    <section id="insights" className="py-24 bg-secondary/30 border-y border-layer-border scroll-mt-24">
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
            Published essays on technology strategy, product management, and scaling digital platforms in India.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-background border border-layer-border rounded-3xl p-8 hover:border-primary/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="flex items-center gap-3 text-xs text-foreground/60 mb-4">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar size={13} className="text-primary" /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock size={13} className="text-primary" /> {post.readTime}
                  </span>
                  <span>•</span>
                  <span className="text-primary font-bold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-title mb-3 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-6">
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

        {/* View All Articles Link */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
          >
            Explore all published essays on the Blog →
          </Link>
        </div>
      </div>
    </section>
  );
}
