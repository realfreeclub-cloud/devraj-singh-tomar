"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Target, Briefcase, User, Info, Calendar } from "lucide-react";
import type { Venture } from "../data";

export default function VentureDetailClient({ venture }: { venture: Venture }) {
  return (
    <div className="pt-32 pb-16 min-h-screen px-6 lg:px-16 mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Link */}
        <Link
          href="/ventures"
          className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-10 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Ventures</span>
        </Link>

        {/* ── Requirement 3: Hidden SEO content (sr-only) ── */}
        <div className="sr-only" aria-hidden="true">
          <p>
            Venture led by Devraj Singh Tomar, also known as Devraj Tomar or Devraj Singh. 
            Devraj is a skilled IT Professional and Entrepreneur based in India since 2018. 
            This project, ${venture.title}, is part of Devraj Singh's growing tech ecosystem.
          </p>
        </div>

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary rounded-full">
              {venture.category}
            </span>
            <span className="text-foreground opacity-50 text-sm flex items-center gap-1.5"><Calendar size={14} /> 2018 – Present</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-title mb-6">
            {venture.title}
          </h1>

          {venture.role && (
            <div className="flex items-center gap-2 text-primary font-semibold text-lg mb-4">
              <Briefcase size={20} />
              <span>{venture.role}</span>
            </div>
          )}

          <p className="text-lg text-foreground opacity-70 leading-relaxed mb-8">
            {venture.description}
          </p>
        </div>

        {/* Main Content Area */}
        <div className="bg-layer border border-layer-border rounded-3xl p-8 md:p-12 mb-12">
          {venture.fullContent ? (
            <div 
              className="prose prose-lg max-w-none 
                [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-title [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-semibold [&_h3]:text-title [&_h3]:mt-12 [&_h3]:mb-4 
                [&_p]:text-foreground [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:opacity-80
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-3
                [&_li]:text-foreground [&_li]:opacity-80
                [&_strong]:text-title [&_strong]:font-semibold
                [&_a]:text-primary [&_a]:underline [&_a]:hover:opacity-80
              "
              dangerouslySetInnerHTML={{ __html: venture.fullContent }}
            />
          ) : (
            <div className="text-center py-10">
              <Info size={40} className="mx-auto text-primary opacity-20 mb-4" />
              <p className="text-foreground opacity-50 italic">Full case study coming soon...</p>
            </div>
          )}
        </div>

        {/* Related Skills / Expertise Tags to naturally include keywords for SEO */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-title mb-6">Keywords & Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {venture.keywords.map((kw, i) => (
              <span key={i} className="px-4 py-2 bg-layer-border/50 text-foreground text-sm font-medium rounded-xl border border-layer-border">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 text-center relative overflow-hidden">
          <Target className="w-10 h-10 text-primary mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-bold text-title mb-2">Vision</h2>
          <p className="text-foreground italic opacity-80">
            &quot;Creating technology solutions that are not only functional but also scalable and user-focused.&quot;
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
          >
            Connect for Collaboration
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
