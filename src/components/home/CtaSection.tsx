"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CtaSection() {
  const [form, setForm] = useState({ name: "", email: "", requirement: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.requirement) return;
    setLoading(true);

    // Simulate structured registration and generate reference ID
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", requirement: "" });
    }, 1200);
  };

  return (
    <section id="collaboration-cta" className="py-24 max-w-7xl mx-auto px-6 lg:px-12 scroll-mt-24">
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/40 border border-primary/20 rounded-[3rem] p-8 lg:p-16 relative overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Proposition */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} /> Start a Collaboration
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight leading-tight mb-6">
              Ready to Turn Vision into <span className="text-primary">Scalable Reality?</span>
            </h2>

            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-8">
              Whether you need strategic technology leadership, high-concurrency web architecture, or digital venture acceleration, let&apos;s build with relentless precision.
            </p>

            <div className="space-y-4 pt-6 border-t border-layer-border text-sm">
              <a
                href="mailto:hello@devrajsinghtomar.com"
                className="flex items-center gap-3 text-title hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-foreground/50 block">Direct Email</span>
                  <span className="font-semibold">hello@devrajsinghtomar.com</span>
                </div>
              </a>

              <a
                href="tel:+919140946121"
                className="flex items-center gap-3 text-title hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-foreground/50 block">Direct Line</span>
                  <span className="font-semibold">+91 9140946121</span>
                </div>
              </a>

              <div className="flex items-center gap-3 text-title">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-foreground/50 block">Location</span>
                  <span className="font-semibold text-xs sm:text-sm">chokhani square, Sector 18, Noida, UP, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Terminal */}
          <div className="lg:col-span-6 bg-background/90 backdrop-blur-md border border-layer-border rounded-3xl p-8 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-title">Inquiry Registered</h3>
                <p className="text-sm text-foreground/80 max-w-sm mx-auto leading-relaxed">
                  Thank you. Your project brief has been logged. Devraj will evaluate your requirements and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 text-xs font-bold uppercase tracking-wider text-primary border border-primary/30 rounded-full hover:bg-primary/10 transition-colors"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-title mb-4">
                  Quick Project Initiation
                </h3>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
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
                    placeholder="rahul@company.com"
                    className="w-full bg-layer border border-layer-border rounded-xl px-4 py-3 text-sm text-title placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5 block">
                    Project Requirement
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.requirement}
                    onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                    placeholder="Describe your platform goals, timeline, or technology challenge..."
                    className="w-full bg-layer border border-layer-border rounded-xl px-4 py-3 text-sm text-title placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-primary text-background font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-white transition-all shadow-md hover:shadow-primary/20 disabled:opacity-50"
                >
                  {loading ? (
                    "Registering Brief..."
                  ) : (
                    <>
                      Send Inquiry <Send size={16} />
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
