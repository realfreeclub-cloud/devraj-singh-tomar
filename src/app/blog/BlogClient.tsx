"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Search,
  X,
  Sparkles,
  BookOpen,
  Filter,
  User,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { blogPosts, BlogPost } from "./data";

export default function BlogClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  // Derive unique categories from existing blogPosts
  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogPosts.map((p) => p.category)));
    return ["All", ...cats];
  }, []);

  // Filtered posts based on search and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.keywords.some((k) => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Featured article is the first post (or specific featured post)
  const featuredPost: BlogPost = blogPosts[0];

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="pt-32 pb-24 min-h-screen px-6 lg:px-20 mx-auto max-w-6xl overflow-x-hidden">
      <motion.div variants={containerVars} initial="hidden" animate="show">
        {/* Breadcrumb */}
        <motion.div variants={itemVars} className="flex items-center gap-2 text-xs font-semibold text-foreground/60 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={13} />
          <span className="text-foreground">Insights &amp; Articles</span>
        </motion.div>

        {/* Section Header */}
        <motion.div variants={itemVars} className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-6">
            <BookOpen size={15} />
            <span className="text-xs font-bold tracking-widest uppercase">
              Field Notes &amp; Strategy
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-title tracking-tight uppercase">
            Strategic <span className="text-primary">Insights</span>
          </h1>
          <p className="text-foreground text-lg sm:text-xl max-w-3xl leading-relaxed">
            Practical thinking on technology strategy, software architecture, disciplined project leadership, and digital product growth.
          </p>
        </motion.div>

        {/* FEATURED ARTICLE SPOTLIGHT (Shown when no search query is active) */}
        {!searchQuery && selectedCategory === "All" && featuredPost && (
          <motion.div variants={itemVars} className="mb-16">
            <div className="p-8 sm:p-12 rounded-4xl bg-gradient-to-br from-primary/10 via-secondary/20 to-layer/40 border border-primary/30 hover:border-primary/60 transition-all duration-300 relative overflow-hidden group">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-foreground/70 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary text-background font-bold uppercase tracking-wider text-[10px] inline-flex items-center gap-1">
                  <Sparkles size={11} /> Featured Essay
                </span>
                <span className="px-3 py-1 rounded-full bg-layer/40 border border-layer-border uppercase tracking-wider text-[11px] text-primary font-bold">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1.5"><Calendar size={13} /> {featuredPost.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {featuredPost.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-title mb-4 group-hover:text-primary transition-colors leading-tight">
                <Link href={`/blog/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-sm sm:text-base text-foreground/85 leading-relaxed max-w-3xl mb-8">
                {featuredPost.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-layer-border">
                <div className="flex items-center gap-2.5 text-xs text-foreground/70">
                  <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                    D
                  </div>
                  <span>By <strong>Devraj Singh Tomar</strong></span>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-background font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* SEARCH & CATEGORY FILTER BAR */}
        <motion.div variants={itemVars} className="p-6 sm:p-8 rounded-3xl bg-secondary/15 border border-layer-border space-y-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, topic, or keyword..."
                className="w-full pl-12 pr-10 py-3.5 bg-background border border-layer-border rounded-2xl text-title text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-foreground/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-primary"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Counter & Reset */}
            <div className="flex items-center gap-3 text-xs font-semibold text-foreground/70 shrink-0">
              <span>
                Showing <strong className="text-primary">{filteredPosts.length}</strong> of {blogPosts.length} articles
              </span>
              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-1.5 rounded-full bg-layer/40 border border-layer-border hover:border-primary text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  <X size={12} /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter size={15} className="text-primary shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 border ${
                  selectedCategory === cat
                    ? "bg-primary text-background border-primary"
                    : "bg-background/60 text-foreground/70 border-layer-border hover:border-primary/50 hover:text-title"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ARTICLES GRID */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col h-full bg-secondary/15 border border-layer-border rounded-4xl p-8 hover:border-primary/50 transition-all group duration-300 justify-between"
              >
                <div>
                  {/* Meta Top Bar */}
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-foreground/60 mb-5">
                    <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-bold uppercase text-[10px]">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5"><Calendar size={13} /> {post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-title leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-6">
                    {post.description}
                  </p>
                </div>

                {/* Footer with Author & Link */}
                <div className="pt-6 border-t border-layer-border flex items-center justify-between mt-auto">
                  <span className="text-[11px] font-semibold text-foreground/50">
                    By Devraj Singh Tomar
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-title group-hover:text-primary transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="p-16 rounded-3xl bg-secondary/10 border border-layer-border text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
              <Search size={28} />
            </div>
            <h3 className="text-xl font-bold text-title mb-2">No Articles Found</h3>
            <p className="text-sm text-foreground/70 mb-6">
              No published articles match &ldquo;{searchQuery}&rdquo;. Try another keyword or reset the filter.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 rounded-full bg-primary text-background font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
