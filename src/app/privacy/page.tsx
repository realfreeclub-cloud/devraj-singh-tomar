import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Devraj Singh Tomar Operations. Learn how we handle project inquiries, communication data, and protect your digital privacy.",
  alternates: {
    canonical: "https://devrajsinghtomar.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen px-6 lg:px-16 container-custom mx-auto max-w-4xl">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-6">
          <ShieldCheck size={16} />
          <span className="text-sm font-semibold tracking-wider uppercase">Transparency & Protection</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-title tracking-tight">
          Privacy <span className="text-primary">Policy</span>
        </h1>
        <p className="text-foreground/70 text-sm">
          Last Updated: November 15, 2026 | Effective Date: November 15, 2026
        </p>
      </div>

      <div className="space-y-10 text-foreground leading-relaxed text-base">
        <section className="bg-layer border border-layer-border rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-title mb-4">1. Introduction & Overview</h2>
          <p className="mb-4">
            Welcome to the official digital portfolio and professional consultancy website of <strong>Devraj Singh Tomar</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), accessible via <Link href="https://devrajsinghtomar.com" className="text-primary underline">https://devrajsinghtomar.com</Link>. 
          </p>
          <p>
            We are deeply committed to respecting your digital privacy and safeguarding any personal details you share when contacting us regarding web development projects, IT project management contracts, tech ventures, or consulting services.
          </p>
        </section>

        <section className="bg-layer border border-layer-border rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-title mb-4">2. Information We Collect</h2>
          <p className="mb-4">
            We only collect information that you knowingly and voluntarily provide to us through direct contact channels, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Contact Inquiries:</strong> Your name, business name, email address, telephone number, and message contents when reaching out via our contact forms or email links.</li>
            <li><strong>Technical Communications:</strong> Project briefs, system architecture requirements, and operational goals shared for evaluation and estimation.</li>
            <li><strong>Diagnostic & Machine Analytics:</strong> Non-personally identifiable server telemetry such as browser user agent, general geographic region, and HTTP request headers to ensure high performance and DDoS prevention.</li>
          </ul>
        </section>

        <section className="bg-layer border border-layer-border rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-title mb-4">3. How Your Information Is Used</h2>
          <p className="mb-4">Your information is solely used for legitimate professional purposes, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Responding directly to your project queries, partnership proposals, and hire requests.</li>
            <li>Providing technical proposals, architectural diagrams, and service timelines.</li>
            <li>Maintaining operational security, verifying uptime, and preventing fraudulent submissions.</li>
            <li>We do <strong>not</strong> sell, rent, or trade your personal information to third-party advertisers or data brokers under any circumstances.</li>
          </ul>
        </section>

        <section className="bg-layer border border-layer-border rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-title mb-4">4. AI Agents & Machine Data Processing</h2>
          <p className="mb-4">
            In compliance with contemporary AI accessibility standards, our website declares its machine-readable content usage policies via <Link href="/robots.txt" className="text-primary underline">robots.txt</Link> (with explicit <code>Content-Signal</code> headers) and our <Link href="/llms.txt" className="text-primary underline">/llms.txt</Link> directory.
          </p>
          <p>
            AI agents and automated crawlers accessing our public portfolio, project case studies, and documentation are granted permission to index and reference our work while respecting rate limits and intellectual property attribution.
          </p>
        </section>

        <section className="bg-layer border border-layer-border rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-title mb-4">5. Contact Information & Data Rights</h2>
          <p className="mb-4">
            You hold the right to inquire about any data provided, request updates, or request complete removal of your inquiry communications from our records at any time.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="text-primary" size={18} />
              <span>Email: <a href="mailto:hello@devrajsinghtomar.com" className="text-primary hover:underline">hello@devrajsinghtomar.com</a></span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-primary" size={18} />
              <span>Phone: <a href="tel:+919140946121" className="text-primary hover:underline">+91 9140946121</a></span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={18} />
              <span>Address: chokhani square, 309, Sector 18, Noida, Uttar Pradesh 201301, India</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
