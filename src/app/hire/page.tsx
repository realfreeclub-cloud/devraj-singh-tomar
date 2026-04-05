import { Metadata } from 'next';
import HireClient from '../../components/HireClient';

export const metadata: Metadata = {
  title: 'Hire Next.js Developer India | IT Project Manager',
  description:
    'Hire a top-tier Next.js Developer and IT Project Manager in India. Expert in React, technical SEO, and building high-performance scalable web applications.',
  keywords: [
    'Next.js Developer India',
    'Freelance Web Developer India',
    'Hire Web Developer India',
    'IT Project Manager India',
  ],
  alternates: {
    canonical: '/hire',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why should I hire a Next.js Developer India instead of a traditional local agency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you hire web developer India talent like myself, you gain direct access to elite engineering without the massive overhead costs, bloated management, or slow bureaucracy of a traditional agency."
      }
    },
    {
      "@type": "Question",
      "name": "How do you handle IT Project Management for early-stage startups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I employ lean, agile methodologies tailored for startups. I manage backlog prioritization, sprint reviews, and deployment velocity without sacrificing code quality."
      }
    },
    {
      "@type": "Question",
      "name": "Are your web applications fully optimized for Voice Search and Answer Engine Optimization (AEO)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. I implement advanced structural data arrays including FAQPage, BreadcrumbList, and Organization JSON-LD schemas ensuring your site content is perfectly parsed by AI summarizers and voice assistants."
      }
    },
    {
      "@type": "Question",
      "name": "What happens after the website is fully launched? Do you offer ongoing post-launch support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I provide comprehensive post-launch retainers covering security patches, server monitoring, SEO tracking, and iterative feature development based on live user feedback."
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
      "name": "Hire Me",
      "item": "https://devrajsinghtomar.com/hire"
    }
  ]
};

export default function HirePage() {
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
      <HireClient />
    </>
  );
}
