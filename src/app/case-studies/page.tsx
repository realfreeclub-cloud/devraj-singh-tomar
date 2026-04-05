import { Metadata } from 'next';
import CaseStudiesClient from '@/components/CaseStudiesClient';

export const metadata: Metadata = {
  title: '50+ Real Web Projects | Freelance Web Developer India',
  description:
    'Explore a massive portfolio of 50+ real client web development projects across India. Featuring top-tier Next.js architecture, education portals, and SEO case studies.',
  keywords: [
    'Freelance Web Developer India',
    'Next.js Developer India',
    'Website Developer for Schools India',
    'SEO Expert India',
    'IT Project Head',
    'Next.js Portfolio India',
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
      "name": "Do you primarily work exclusively as a Website Developer for Schools India based, or take global cases?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While I dominate the Indian institutional, business, and educational digital landscape, my exact Next.js React codebase architecture is deployed globally. Code scales borders without friction."
      }
    },
    {
      "@type": "Question",
      "name": "Why is hiring a Freelance Web Developer in India better than hiring an agency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Agencies pass your project down to junior developers while charging massive administrative overhead fees. By hiring an independent IT Project Head, you get senior-tier technical architecture entirely focused on results."
      }
    },
    {
      "@type": "Question",
      "name": "What is the fastest way to get my website ranking using an SEO Expert India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The fastest path to organic traffic is eliminating technical debt. By fixing massive Javascript payloads, repairing broken dynamic routes, and injecting perfect JSON-LD structured data into your Next.js application, Google algorithms immediately reward your site."
      }
    },
    {
      "@type": "Question",
      "name": "Do you manage the websites after deployment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Through strategic partnerships and retainers, I continuously monitor Core Web Vitals, implement security hot-fixes, and aggressively iterate design structures based on active user heat-mapping."
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
      "name": "Portfolio & Case Studies",
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
