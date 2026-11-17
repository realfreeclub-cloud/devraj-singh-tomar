"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  Check,
  BookOpen,
  ArrowRight,
  ChevronRight,
  List,
  Sparkles
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import type { BlogPost } from "../data";
import { blogPosts } from "../data";

interface HeadingItem {
  id: string;
  text: string;
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Extract H2 headings from post.content for the Table of Contents
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Parse H2 elements from content
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, "text/html");
    const h2Elements = doc.querySelectorAll("h2");

    const items: HeadingItem[] = [];
    h2Elements.forEach((h2, idx) => {
      const text = h2.textContent || `Section ${idx + 1}`;
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      items.push({ id, text });
    });

    setHeadings(items);

    // Also inject IDs into actual DOM rendered headings
    const timer = setTimeout(() => {
      const articleEl = document.querySelector("article.post-body");
      if (articleEl) {
        const domH2s = articleEl.querySelectorAll("h2");
        domH2s.forEach((h2, idx) => {
          if (items[idx]) {
            h2.id = items[idx].id;
          }
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [post.content]);

  // Contextual related articles (excluding current post)
  const relatedPosts = useMemo(() => {
    return blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  }, [post.slug]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`"${post.title}" by Devraj Singh Tomar`);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    }
  };

  return (
    <>
      {/* 1. SCROLL PROGRESS BAR (Sticky at Top) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="pt-32 pb-24 min-h-screen px-6 lg:px-20 mx-auto max-w-4xl overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top Breadcrumb & Back Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-layer-border text-xs text-foreground/70 mb-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight size={13} />
              <Link href="/blog" className="hover:text-primary transition-colors">
                Insights
              </Link>
              <ChevronRight size={13} />
              <span className="text-foreground truncate max-w-[200px] sm:max-w-xs font-semibold">
                {post.title}
              </span>
            </nav>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-title hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} /> Back to Insights
            </Link>
          </div>

          {/* Post Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-foreground/70 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold uppercase text-[10px]">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readTime}
              </span>
              <span>•</span>
              <span className="text-foreground/50">By Devraj Singh Tomar</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title leading-tight mb-6 uppercase tracking-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-foreground/85 leading-relaxed mb-8">
              {post.description}
            </p>

            {/* Social Share & Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-secondary/15 border border-layer-border text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase tracking-wider text-foreground/60 mr-1">
                  Share:
                </span>
                <button
                  onClick={handleShareTwitter}
                  className="px-3 py-1 rounded-full bg-background border border-layer-border hover:border-primary text-title transition-colors"
                >
                  X / Twitter
                </button>
                <button
                  onClick={handleShareLinkedIn}
                  className="px-3 py-1 rounded-full bg-background border border-layer-border hover:border-primary text-title transition-colors"
                >
                  LinkedIn
                </button>
              </div>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold hover:bg-primary hover:text-background transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={13} /> Link Copied!
                  </>
                ) : (
                  <>
                    <Share2 size={13} /> Copy Link
                  </>
                )}
              </button>
            </div>
          </header>

          {/* TABLE OF CONTENTS (When headings exist) */}
          {headings.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-secondary/10 border border-layer-border mb-12">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                <List size={15} /> Table of Contents
              </div>
              <ul className="space-y-2 text-xs sm:text-sm">
                {headings.map((h, i) => (
                  <li key={i}>
                    <a
                      href={`#${h.id}`}
                      className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <span className="text-primary font-mono text-xs">{`0${i + 1}.`}</span>
                      <span>{h.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article HTML Content */}
          <article
            className="post-body prose prose-lg max-w-none mb-16
              [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-extrabold [&_h2]:text-title [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:tracking-tight [&_h2]:scroll-mt-28
              [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-bold [&_h3]:text-title [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-28
              [&_p]:text-foreground/90 [&_p]:leading-relaxed [&_p]:text-sm [&_p]:sm:text-base [&_p]:mb-6
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
              [&_li]:text-foreground/90 [&_li]:leading-relaxed [&_li]:text-xs [&_li]:sm:text-sm
              [&_strong]:text-title [&_strong]:font-bold
              [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:py-3 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-foreground [&_blockquote]:bg-secondary/20 [&_blockquote]:rounded-r-2xl [&_blockquote]:pr-6
              [&_a]:text-primary [&_a]:underline [&_a]:hover:opacity-80 [&_a]:transition-opacity
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Bio Card */}
          <div className="p-8 rounded-3xl bg-secondary/20 border border-layer-border flex flex-col sm:flex-row items-center gap-6 mb-16">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-2xl shrink-0 border border-primary/30">
              D
            </div>
            <div className="text-center sm:text-left flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">
                About the Author
              </span>
              <h3 className="text-xl font-bold text-title mb-1.5">
                Devraj Singh Tomar
              </h3>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-4">
                Technology Strategist &amp; Entrepreneur. Turning ambiguous business ideas into resilient, scalable digital platforms and high-performance software since 2018.
              </p>
              <Link
                href="/about"
                className="text-xs font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>Read Full Biography</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div className="pt-10 border-t border-layer-border">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">
                    Continue Reading
                  </span>
                  <h3 className="text-2xl font-bold text-title uppercase tracking-tight">
                    Related Articles
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="text-xs font-bold uppercase tracking-wider text-title hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  <span>All Insights</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.slug}
                    href={`/blog/${rPost.slug}`}
                    className="p-6 rounded-3xl bg-layer/40 border border-layer-border hover:border-primary/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded bg-primary/10 border border-primary/20 inline-block mb-3">
                        {rPost.category}
                      </span>
                      <h4 className="text-lg font-bold text-title mb-2 group-hover:text-primary transition-colors">
                        {rPost.title}
                      </h4>
                      <p className="text-xs text-foreground/70 line-clamp-2 mb-6">
                        {rPost.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-layer-border flex items-center justify-between text-xs font-bold uppercase tracking-wider text-title group-hover:text-primary transition-colors">
                      <span>Read Article</span>
                      <ArrowRight size={13} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
