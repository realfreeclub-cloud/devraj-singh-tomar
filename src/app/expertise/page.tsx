import { Metadata } from "next";
import ExpertiseClient from "./ExpertiseClient";

export const metadata: Metadata = {
  title: "Expertise & Strategic Capabilities | Devraj Singh Tomar",
  description:
    "Explore Devraj Singh Tomar's strategic capabilities across Technology Strategy, Digital Product Development, Project Leadership, Business Automation, and Digital Transformation.",
  keywords: [
    "Technology Strategy",
    "Application Architecture",
    "Digital Product Development",
    "IT Project Leadership",
    "Business Automation",
    "Digital Transformation",
    "Technical SEO Strategy",
    "Devraj Singh Tomar Expertise"
  ],
  alternates: {
    canonical: "https://devrajsinghtomar.com/expertise",
  },
  openGraph: {
    title: "Expertise & Strategic Capabilities | Devraj Singh Tomar",
    description:
      "Explore Devraj Singh Tomar's core capabilities in Technology Strategy, Next.js Architecture, IT Project Management, and Enterprise Digital Transformation.",
    url: "https://devrajsinghtomar.com/expertise",
    siteName: "Devraj Singh Tomar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Devraj Singh Tomar – Technology Capabilities & Expertise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expertise & Strategic Capabilities | Devraj Singh Tomar",
    description:
      "Explore Devraj Singh Tomar's core capabilities in Technology Strategy, Product Architecture, and IT Project Leadership.",
    images: ["/og-image.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Technology Strategy & Digital Architecture Services",
  "provider": {
    "@type": "Person",
    "name": "Devraj Singh Tomar",
    "jobTitle": "Technology Strategist & Entrepreneur",
    "url": "https://devrajsinghtomar.com"
  },
  "serviceType": "Technology Strategy, Digital Product Architecture, IT Project Management",
  "areaServed": "India, Global",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Strategic Capabilities",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Technology Strategy & Architecture Decisions"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Product Development (Next.js & React)"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Project & Product Leadership"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Automation & Digital Workflows"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Industry Digital Transformation (Healthcare, Education, Legal)"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Growth & Semantic Search Strategy"
        }
      }
    ]
  }
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
      "name": "Expertise & Capabilities",
      "item": "https://devrajsinghtomar.com/expertise"
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ExpertiseClient />
    </>
  );
}
