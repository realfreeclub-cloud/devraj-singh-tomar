import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Devraj Singh Tomar | Technology Strategist & Entrepreneur",
  description:
    "Learn about Devraj Singh Tomar's journey from Kudri (Jhansi) to leading enterprise technology architecture, digital product development, and venture leadership across India.",
  keywords: [
    "Devraj Singh Tomar",
    "About Devraj Singh Tomar",
    "Technology Strategist",
    "Tech Entrepreneur India",
    "Next.js Developer India",
    "IT Project Manager India",
    "Lotus Loop Media Solution",
    "Career Avsar",
    "NGIT Edu"
  ],
  alternates: {
    canonical: "https://devrajsinghtomar.com/about",
  },
  openGraph: {
    title: "About Devraj Singh Tomar | Technology Strategist & Entrepreneur",
    description:
      "Learn about Devraj Singh Tomar's journey from Kudri (Jhansi) to leading enterprise technology architecture, digital product development, and venture leadership.",
    url: "https://devrajsinghtomar.com/about",
    siteName: "Devraj Singh Tomar",
    images: [
      {
        url: "/devraj-singh-tomar.jpg",
        width: 1200,
        height: 630,
        alt: "Devraj Singh Tomar – Technology Strategist & Entrepreneur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Devraj Singh Tomar | Technology Strategist & Entrepreneur",
    description:
      "Learn about Devraj Singh Tomar's journey, philosophy, professional experience, and technical leadership.",
    images: ["/devraj-singh-tomar.jpg"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Devraj Singh Tomar",
  "jobTitle": "Technology Strategist & Entrepreneur",
  "url": "https://devrajsinghtomar.com",
  "image": "https://devrajsinghtomar.com/devraj-singh-tomar.jpg",
  "sameAs": [
    "https://github.com/realfreeclub-cloud",
    "https://lotusloop.in",
    "https://careeravsar.com"
  ],
  "knowsAbout": [
    "Technology Strategy",
    "Software Architecture",
    "Next.js",
    "React",
    "Technical SEO",
    "Cloud Deployments",
    "Digital Transformation"
  ],
  "alumniOf": "National Genius Institute",
  "worksFor": {
    "@type": "Organization",
    "name": "Lotus Loop Media Solutions"
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
      "name": "About Devraj Singh Tomar",
      "item": "https://devrajsinghtomar.com/about"
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutClient />
    </>
  );
}
