"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 lg:pt-32 pb-16 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Approved Professional Portrait Asset */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col items-center lg:items-start"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:max-w-[420px] lg:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-layer-border bg-layer group">
            <Image
              src="/devraj-singh-tomar.jpg"
              alt="Devraj Singh Tomar - Technology Strategist & Entrepreneur"
              title="Devraj Singh Tomar"
              fill
              sizes="(max-width: 1024px) 320px, 420px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* Gradient Protection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75" />

            {/* Availability Status Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-background/90 backdrop-blur-md border border-layer-border shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-wider text-title">
                  Available for Strategic Advisory &amp; Ventures
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Strategic Positioning Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
        >
          {/* Status Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary w-max mx-auto lg:mx-0 mb-6">
            <Sparkles size={14} />
            <span className="text-xs font-bold tracking-widest uppercase">
              Technology Strategist &amp; Entrepreneur
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-title tracking-tight leading-[1.15] mb-6">
            Turning Ideas Into Digital Solutions That Move Businesses Forward.
          </h1>

          {/* Supporting Content */}
          <p className="text-base sm:text-lg lg:text-xl text-foreground/80 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
            I&apos;m Devraj Singh Tomar, a Technology Strategist &amp; Entrepreneur focused on building digital products, leading technology projects, and helping businesses transform ideas into practical technology solutions.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10">
            <Link
              href="#featured-work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary text-background font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all shadow-md hover:shadow-primary/20"
            >
              <span>Explore My Work</span>
              <ArrowDown size={16} />
            </Link>

            <Link
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-secondary text-title border border-layer-border hover:border-primary font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full hover:text-primary transition-all"
            >
              <span>Let&apos;s Work Together</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Verified Contact Details Bar */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-foreground/70 pt-6 border-t border-layer-border">
            <a
              href="mailto:hello@devrajsinghtomar.com"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail size={15} className="text-primary" />
              <span>hello@devrajsinghtomar.com</span>
            </a>
            <span className="hidden sm:inline opacity-30">•</span>
            <a
              href="tel:+919140946121"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone size={15} className="text-primary" />
              <span>+91 9140946121</span>
            </a>
            <span className="hidden sm:inline opacity-30">•</span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} className="text-primary" />
              <span>Noida, Uttar Pradesh, India</span>
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
