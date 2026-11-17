"use client";

import { motion } from "framer-motion";
import { Quote, Star, Building, CheckCircle } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Devraj engineered our complete online examination and typing test infrastructure. During peak recruitment exams with thousands of simultaneous students, the platform held zero keystroke lag and 99.98% uptime. His architectural discipline is rare.",
      author: "Academic Director",
      role: "National Genius Institute (NGIT Edu)",
      domain: "ngitedu.com",
      industry: "Education & Examinations",
    },
    {
      quote:
        "As the 3rd largest dialysis center in India, our patient interface had to be intuitive, accessible, and fast. Devraj delivered a flawless portal that eliminated appointment booking friction and established immediate regional map dominance.",
      author: "Healthcare Administrator",
      role: "MAZ Dialysis Center",
      domain: "mazdialysiscenter.com",
      industry: "Healthcare Infrastructure",
    },
    {
      quote:
        "Our law firm handles high-stakes corporate litigation in New Delhi. We needed an authoritative digital portal with strict client confidentiality and flawless Core Web Vitals. Devraj built an impenetrable Next.js platform that elevated our B2B inquiries.",
      author: "Managing Partner",
      role: "T&S Lex Ink Legal",
      domain: "lexinklegal.in",
      industry: "Corporate Law",
    },
    {
      quote:
        "Our digital advertising was losing money due to an 8-second mobile bounce rate on our old site. Devraj completely rebuilt our web architecture, achieving sub-second load times and tripling our lead conversion rate within weeks.",
      author: "Operations Head",
      role: "The Home Shifting",
      domain: "thehomeshifting.com",
      industry: "Logistics & Moving",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 inline-block">
          Endorsements
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-title uppercase tracking-tight mb-4">
          Client &amp; Partner <span className="text-primary">Testimonials</span>
        </h2>
        <p className="text-foreground/80 text-base leading-relaxed">
          Verified feedback from educational directors, healthcare administrators, legal partners, and founders.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.domain}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-layer/40 border border-layer-border rounded-3xl p-8 lg:p-10 flex flex-col justify-between hover:border-primary/40 transition-all relative overflow-hidden"
          >
            {/* Top Stars & Quote Icon */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
                <Quote size={28} className="text-foreground/20" />
              </div>

              {/* Quote Text */}
              <p className="text-sm sm:text-base text-title/90 leading-relaxed italic mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-6 border-t border-layer-border flex items-center justify-between">
              <div>
                <h4 className="font-bold text-title text-base">{t.author}</h4>
                <p className="text-xs text-primary font-semibold">{t.role}</p>
                <span className="text-[11px] font-mono text-foreground/50">{t.domain}</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary border border-layer-border text-foreground/70">
                {t.industry}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
