"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import type { BlogPost } from "../data";

export default function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <div className="pt-32 pb-16 min-h-screen px-6 lg:px-16 mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-10 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Back to Blog</span>
        </Link>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-foreground opacity-60 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full">
              <Tag size={12} />
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-title leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-foreground opacity-70 leading-relaxed">
            {post.description}
          </p>
        </header>

        {/* Divider */}
        <div className="w-full h-px bg-layer-border mb-12"></div>

        {/* Article Content */}
        <article
          className="prose prose-lg max-w-none
            [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-title [&_h2]:mt-12 [&_h2]:mb-6
            [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-semibold [&_h3]:text-title [&_h3]:mt-10 [&_h3]:mb-4
            [&_p]:text-foreground [&_p]:leading-8 [&_p]:mb-6 [&_p]:opacity-90
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
            [&_li]:text-foreground [&_li]:leading-7 [&_li]:opacity-90
            [&_strong]:text-title [&_strong]:font-semibold
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-foreground [&_blockquote]:opacity-80 [&_blockquote]:bg-layer/50 [&_blockquote]:rounded-r-xl [&_blockquote]:pr-6
            [&_a]:text-primary [&_a]:underline [&_a]:hover:opacity-80 [&_a]:transition-opacity
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Divider */}
        <div className="w-full h-px bg-layer-border my-12"></div>

        {/* Author Card */}
        <div className="bg-layer border border-layer-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-2xl shrink-0">
            D
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-title mb-1">
              Devraj Singh Tomar
            </h3>
            <p className="text-foreground opacity-70 text-sm leading-relaxed">
              IT Professional & Entrepreneur building scalable digital solutions
              and growing tech ventures since 2018.
            </p>
          </div>
        </div>

        {/* Back to Blog CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg"
          >
            <ArrowLeft size={18} />
            More Articles
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
