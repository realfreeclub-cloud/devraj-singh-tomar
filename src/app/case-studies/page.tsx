import { Metadata } from 'next';
import CaseStudiesClient from '@/components/CaseStudiesClient';

export const metadata: Metadata = {
  title: 'Case Studies & Project Explorer | Devraj Singh Tomar',
  description:
    'Explore 60+ digital platforms, high-concurrency software architectures, and detailed case studies engineered by Devraj Singh Tomar across education, healthcare, legal tech, and digital ventures.',
  keywords: [
    'Devraj Singh Tomar',
    'Technology Strategist',
    'Software Architect India',
    'Case Studies',
    'Next.js Architect',
    'Project Portfolio',
    'EdTech Architecture',
    'Healthcare Web Portal',
    'Legal Technology',
    'Next.js Performance Engineer'
  ],
  alternates: {
    canonical: '/case-studies',
  },
  openGraph: {
    title: 'Case Studies & Project Explorer | Devraj Singh Tomar',
    description:
      'Explore 60+ digital platforms, high-concurrency software architectures, and detailed case studies engineered by Devraj Singh Tomar.',
    url: 'https://devrajsinghtomar.com/case-studies',
    siteName: 'Devraj Singh Tomar',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Devraj Singh Tomar Portfolio & Case Studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies & Project Explorer | Devraj Singh Tomar',
    description:
      'Explore 60+ digital platforms, high-concurrency software architectures, and detailed case studies engineered by Devraj Singh Tomar.',
    images: ['/og-image.png'],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Devraj Singh Tomar's strategic role across these projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Devraj acts as a Technology Strategist & Architect, designing scalable system architectures, eliminating latency bottlenecks, hardening cybersecurity, and aligning technical platforms with business growth objectives."
      }
    },
    {
      "@type": "Question",
      "name": "Can I inspect the full architectural breakdown of your flagship projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Click 'Read Case Study' on flagship projects like NGIT Edu, Divya Jap, T&S Lex Ink Legal, MAZ Dialysis Center, IDPS Pratapgarh, and The Home Shifting to inspect the exact problems, architectural specifications, technical decisions, and verified outcomes."
      }
    },
    {
      "@type": "Question",
      "name": "Are your Next.js applications fully optimized for SEO and performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Using Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), dynamic JSON-LD injection, and edge caching, all platforms achieve sub-second LCP and strong search engine rankings."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://devrajsinghtomar.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Case Studies & Project Explorer",
      "item": "https://devrajsinghtomar.com/case-studies"
    }
  ]
};

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CaseStudiesClient />
    </>
  );
}
