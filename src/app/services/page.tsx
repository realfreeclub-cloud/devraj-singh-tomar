import { Metadata } from 'next';
import ExpertiseClient from '@/app/expertise/ExpertiseClient';

export const metadata: Metadata = {
  title: 'Strategic Services & Capabilities | Devraj Singh Tomar',
  description:
    'Explore Devraj Singh Tomar\'s strategic services across Technology Strategy, Digital Product Architecture, IT Project Management, and Enterprise Digital Transformation.',
  keywords: [
    'Technology Strategy Services',
    'Next.js Architecture Consulting',
    'IT Project Management India',
    'Digital Transformation Services',
    'Technical SEO Strategy'
  ],
  alternates: {
    canonical: 'https://devrajsinghtomar.com/expertise',
  },
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
      "name": "Services & Expertise",
      "item": "https://devrajsinghtomar.com/services"
    }
  ]
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ExpertiseClient />
    </>
  );
}
