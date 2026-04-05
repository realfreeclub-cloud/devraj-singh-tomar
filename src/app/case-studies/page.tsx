import { Metadata } from 'next';
import CaseStudiesClient from '../../components/CaseStudiesClient';

export const metadata: Metadata = {
  title: 'Next.js Projects Portfolio & Web Dev Case Studies India',
  description:
    'Deep-dive Next.js projects portfolio showcasing dramatic SEO rating increases, pristine Core Web Vitals optimization, and robust web development case studies in India.',
  keywords: [
    'Next.js projects portfolio',
    'web development case studies India',
    'Next.js optimization case study',
    'SEO improvements portfolio',
    'React Server Components portfolio',
  ],
  alternates: {
    canonical: '/case-studies',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are these web development case studies India-focused or global?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While my technical operations are based in India, the strategic case studies highlighted apply globally. I collaborate with startups spanning North America, Europe, and Asia."
      }
    },
    {
      "@type": "Question",
      "name": "Why are all your featured case studies heavily built upon Next.js?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Next.js fixes massive SEO vulnerabilities of standard React SPAs, obliterates load-time latency via Static Generation (SSG), and optimizes Web Vitals out of the box."
      }
    },
    {
      "@type": "Question",
      "name": "Can I expect similar SEO and performance metrics for my own project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. By aggressively policing bundle size, enforcing intelligent caching strategies, and actively utilizing the newest App Router metadata APIs, your metrics will strictly improve."
      }
    },
    {
      "@type": "Question",
      "name": "How do you accurately measure these specific performance improvements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I violently stress-test utilizing enterprise-tier diagnostic tooling including Google Chrome User Experience Report (CrUX), deep Lighthouse inspections, and Vercel Analytics tracking."
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
      "name": "Case Studies",
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
