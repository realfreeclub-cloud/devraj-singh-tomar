import { Metadata } from 'next';
import CaseStudiesClient from '@/components/CaseStudiesClient';

export const metadata: Metadata = {
  title: 'Portfolio | Web Developer & Social Media Manager India',
  description:
    'Explore 50+ premium projects encompassing elite Next.js Web Development, Technical SEO, and comprehensive Social Media Management across India.',
  keywords: [
    'Freelance Web Developer India',
    'Social Media Manager India',
    'Next.js Developer India',
    'Google Business Profile Expert',
    'Website Developer for Schools India',
    'SEO Expert India'
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
      "name": "Why hire a dual expert for Web Development and Social Media Management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By unifying your technical website architecture with your social branding (Facebook, Instagram, Google Business), you create a frictionless lead funnel. As a Next.js Developer India and Social Media Manager India, I control both the traffic source and the conversion endpoint."
      }
    },
    {
      "@type": "Question",
      "name": "How does Google Business Profile management impact local SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google Business Profile Expert optimization directly dictates your rank in the Google Maps 3-Pack. We sync your local citations, map coordinates, and review velocity natively with your website's localized JSON-LD schema."
      }
    },
    {
      "@type": "Question",
      "name": "Are your Next.js applications fully optimized for SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. As a Freelance Web Developer in India, I heavily utilize Server-Side Rendering (SSR) and dynamic metadata injection so algorithms instantly parse and rank your platforms."
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
