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
                
                <a href="tel:+919876543210" className="flex items-start gap-4 text-foreground hover:text-primary transition-colors cursor-none group">
                  <div className="w-12 h-12 bg-layer border border-layer-border rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-title font-medium mb-1">Phone</h4>
                    <p className="opacity-80">+91 98765 43210</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 text-foreground group">
                  <div className="w-12 h-12 bg-layer border border-layer-border rounded-xl flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-title font-medium mb-1">Location</h4>
                    <p className="opacity-80">India</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-title">Socials</h3>
              <div className="flex items-center gap-4">
                <Link href="https://www.linkedin.com/in/devraj-singh-tomar-it/" className="p-4 bg-layer border border-layer-border rounded-xl hover:bg-[#0077b5] hover:text-white transition-colors text-foreground cursor-none" target="_blank" aria-label="LinkedIn">
                  <LinkedinIcon size={24} />
                </Link>
                <Link href="https://www.instagram.com/devraj_singh_tomar__/" className="p-4 bg-layer border border-layer-border rounded-xl hover:bg-[#E1306C] hover:text-white transition-colors text-foreground cursor-none" target="_blank" aria-label="Instagram">
                  <InstagramIcon size={24} />
                </Link>
                <Link href="https://www.facebook.com/DevrajSinghT0mar" className="p-4 bg-layer border border-layer-border rounded-xl hover:bg-[#1877F2] hover:text-white transition-colors text-foreground cursor-none" target="_blank" aria-label="Facebook">
                  <FacebookIcon size={24} />
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
