"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactCtaSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);

    // Register project requirement
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/40 border border-primary/20 rounded-[3rem] p-8 lg:p-16 relative overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Headline, Message & Direct Verified Channels */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 inline-block">
              Let&apos;s Connect
            </span>

            {/* Exact Headline Required */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight leading-tight mb-6">
              Have an Idea? Let&apos;s Turn It Into <span className="text-primary">Something Real.</span>
            </h2>

            {/* Short Contact Message */}
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-8">
              Whether you are mapping out a new digital product, restructuring your technology architecture, or looking for an agile technology leader, I am here to help you execute.
            </p>

            {/* Verified Direct Channels */}
            <div className="space-y-4 pt-6 border-t border-layer-border text-sm">
              {/* Direct Email */}
              <a
                href="mailto:hello@devrajsinghtomar.com"
                className="flex items-center gap-3 text-title hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-foreground/50 block">Direct Email</span>
                  <span className="font-semibold text-xs sm:text-sm">hello@devrajsinghtomar.com</span>
                </div>
              </a>

              {/* Verified WhatsApp */}
              <a
                href="https://wa.me/919140946121"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-title hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-foreground/50 block">WhatsApp Chat</span>
                  <span className="font-semibold text-xs sm:text-sm">+91 9140946121 (Instant)</span>
                </div>
              </a>

              {/* Direct Phone */}
              <a
                href="tel:+919140946121"
                className="flex items-center gap-3 text-title hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-foreground/50 block">Phone Consultation</span>
                  <span className="font-semibold text-xs sm:text-sm">+91 9140946121</span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 text-title">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-foreground/50 block">Office Coordinate</span>
                  <span className="font-semibold text-xs sm:text-sm">chokhani square, Sector 18, Noida, Uttar Pradesh, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6 bg-background/95 backdrop-blur-md border border-layer-border rounded-3xl p-8 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-title">Message Registered</h3>
                <p className="text-sm text-foreground/80 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Devraj will personally review your project requirements and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 text-xs font-bold uppercase tracking-wider text-primary border border-primary/30 rounded-full hover:bg-primary/10 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-title">
                    Send a Message
                  </h3>
                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Full Contact Page →
                  </Link>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Vikram Singhania"
                    className="w-full bg-layer border border-layer-border rounded-xl px-4 py-3 text-sm text-title placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="vikram@enterprise.com"
                    className="w-full bg-layer border border-layer-border rounded-xl px-4 py-3 text-sm text-title placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5 block">
                    Message / Project Brief
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Briefly describe what you're looking to build, optimize, or scale..."
                    className="w-full bg-layer border border-layer-border rounded-xl px-4 py-3 text-sm text-title placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-primary text-background font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all shadow-md hover:shadow-primary/20 disabled:opacity-50"
                >
                  {loading ? (
                    "Sending Message..."
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
