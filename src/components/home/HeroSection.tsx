"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Sparkles, ShieldCheck, ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 lg:pt-28 pb-16 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Portrait Photography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex flex-col items-center lg:items-start"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:max-w-[420px] lg:h-[540px] rounded-3xl overflow-hidden shadow-2xl border-2 border-layer-border bg-layer group">
            {/* Desktop Image */}
            <Image
              src="/devraj-singh-tomar.jpg"
              alt="Devraj Singh Tomar - Technology Strategist & Entrepreneur"
              title="Devraj Singh Tomar"
              fill
              sizes="(max-width: 1024px) 320px, 420px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

            {/* Floating Credibility Pill */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-background/90 backdrop-blur-md border border-layer-border shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-wider text-title">
                  Available for Strategic Advisory &amp; Ventures
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Strategic Positioning & Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
        >
          {/* Identity Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary w-max mx-auto lg:mx-0 mb-6">
            <Sparkles size={16} />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase">
              Technology Strategist &amp; Entrepreneur
            </span>
          </div>

          {/* Name Header */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-title tracking-tight uppercase leading-[1.1] mb-6">
            Devraj Singh <br className="hidden sm:inline" />
            <span className="text-primary">Tomar</span>
          </h1>

          {/* Primary Brand Statement */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-title/90 leading-snug mb-6 max-w-2xl">
            &ldquo;I turn business ideas into practical technology solutions and scalable digital products.&rdquo;
          </p>

          {/* Secondary Strategic Context */}
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
            Bridging the divide between high-level business vision and relentless engineering execution. 
            Delivering mission-critical enterprise portals, full-stack Next.js platforms, and scalable digital ecosystems since 2018.
          </p>

          {/* Action Triggers */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10">
            <Link
              href="#featured-projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-background font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-full hover:bg-white transition-all shadow-lg hover:shadow-primary/20"
            >
              Explore Portfolio <ArrowDown size={18} />
            </Link>

            <Link
              href="#collaboration-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-secondary/80 text-title border border-layer-border hover:border-primary font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-full hover:text-primary transition-all"
            >
              Schedule Consultation <ArrowRight size={18} />
            </Link>
          </div>

          {/* Verified Direct Channels */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-foreground/70 pt-6 border-t border-layer-border">
            <a
              href="mailto:hello@devrajsinghtomar.com"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail size={16} className="text-primary" />
              <span>hello@devrajsinghtomar.com</span>
            </a>
            <span className="hidden sm:inline opacity-30">•</span>
            <a
              href="tel:+919140946121"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone size={16} className="text-primary" />
              <span>+91 9140946121</span>
            </a>
            <span className="hidden sm:inline opacity-30">•</span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span>Noida, Uttar Pradesh, India</span>
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
