import { Metadata } from 'next';
import ServicesClient from '@/components/ServicesClient';

export const metadata: Metadata = {
  title: 'Web Development & SEO Services India | Next.js Expert',
  description:
    'Premier web development services in India. Expert Next.js developer offering highly scalable website architecture, elite technical SEO, and radical performance optimization.',
  keywords: [
    'Web Development Services India',
    'Next.js Developer Services',
    'SEO Services for Websites',
    'Performance Optimization Consultant',
    'Freelance IT Project Manager',
  ],
  alternates: {
    canonical: '/services',
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
      "name": "Services",
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
      <ServicesClient />
    </>
  );
}
