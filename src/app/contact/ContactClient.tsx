"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const MediumIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const DevToIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 448 512" fill="currentColor">
    <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 0 51.7 0 75.9v360.2C0 460.3 19.7 480 43.9 480h360.2c24.2 0 43.9-19.7 43.9-43.9V75.9c0-24.2-19.7-43.9-43.9-43.9zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V192.73c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.56zm103.64 115.29c-13.2 30.87-36.22 11.46-36.22 11.46s-1.74-7.38-3.1-15.04c-1.36-7.66-8.7-22.13-35.34-31.59l8.6-28.92c19.34 3.39 28.65 14.79 32.77 25.34-2.58-15.53-15.76-32.96-30.82-36.9l8.28-29.02c46.33 13.9 45.47 51 45.47 51s1.37 19.26-10.37 53.67M264.96 172h31.57l35.15 97.5h.58l32.97-97.5h31.57v166.4h-28.09v-88.6l-29.56 88.6h-14.5l-28.09-88.6v88.6h-31.6l-.01-166.4z"/>
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate sending
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="pt-32 pb-16 min-h-screen px-6 lg:px-16 container-custom mx-auto max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-title">
          Let&apos;s <span className="text-primary">Connect</span>
        </h1>
        <p className="text-foreground text-lg mb-16 max-w-2xl opacity-80">
          Interested in working together or mapping out your next digital venture? Say hello.
        </p>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left Column - Contact Info */}
          <div className="lg:w-1/3 flex flex-col gap-10">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-title">
                <MessageSquare className="text-primary" size={24} />
                Contact Info
              </h3>

              <div className="flex flex-col gap-6">
                <a href="mailto:hello@devrajsinghtomar.com" className="flex items-start gap-4 text-foreground hover:text-primary transition-colors cursor-none group">
                  <div className="w-12 h-12 bg-layer border border-layer-border rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-title font-medium mb-1">Email</h4>
                    <p className="opacity-80">hello@devrajsinghtomar.com</p>
                  </div>
                </a>

                <a href="tel:+919140946121" className="flex items-start gap-4 text-foreground hover:text-primary transition-colors cursor-none group">
                  <div className="w-12 h-12 bg-layer border border-layer-border rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-title font-medium mb-1">Phone</h4>
                    <p className="opacity-80">+91 9140946121</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 text-foreground group">
                  <div className="w-12 h-12 bg-layer border border-layer-border rounded-xl flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-title font-medium mb-1">Location</h4>
                    <p className="opacity-80">chokhani square, 309, Sector 18, Noida, Uttar Pradesh 201301</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-title">Socials</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="https://www.linkedin.com/in/devraj-singh-tomar-it/" className="p-4 bg-layer border border-layer-border rounded-xl hover:bg-[#0077b5] hover:text-white transition-colors text-foreground cursor-none" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedinIcon size={24} />
                </Link>
                <Link href="https://www.instagram.com/devraj_singh_tomar__/" className="p-4 bg-layer border border-layer-border rounded-xl hover:bg-[#E1306C] hover:text-white transition-colors text-foreground cursor-none" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon size={24} />
                </Link>
                <Link href="https://www.facebook.com/DevrajSinghT0mar" className="p-4 bg-layer border border-layer-border rounded-xl hover:bg-[#1877F2] hover:text-white transition-colors text-foreground cursor-none" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FacebookIcon size={24} />
                </Link>
                <Link href="https://dev.to/devraj_singh_tomar" className="p-4 bg-layer border border-layer-border rounded-xl hover:bg-[#000000] hover:text-white transition-colors text-foreground cursor-none" target="_blank" rel="noopener noreferrer" aria-label="Dev.to">
                  <DevToIcon size={24} />
                </Link>
                <Link href="https://medium.com/@devrajsinghtomar" className="p-4 bg-layer border border-layer-border rounded-xl hover:bg-[#000000] hover:text-white transition-colors text-foreground cursor-none" target="_blank" rel="noopener noreferrer" aria-label="Medium">
                  <MediumIcon size={24} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:w-2/3">
            <div className="bg-layer border border-layer-border rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

              <h2 className="text-2xl font-bold mb-8 text-title">Send a Message</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground opacity-60 mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background border border-layer-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-title"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground opacity-60 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-layer-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-title"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground opacity-60 mb-2">Message</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-background border border-layer-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-title"
                    placeholder="How can we help?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70 mt-4 md:w-max shadow-[0_0_20px_rgba(79,70,229,0.2)] cursor-none"
                >
                  {isSubmitting ? "Sending..." : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
