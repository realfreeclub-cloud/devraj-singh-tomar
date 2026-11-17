import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Devraj Singh Tomar | Technology Strategist & Entrepreneur",
  description:
    "Devraj Singh Tomar is a Technology Strategist & Entrepreneur in India turning business ideas into practical technology solutions and scalable digital products.",
  keywords: [
    "Devraj Singh Tomar",
    "Technology Strategist India",
    "Entrepreneur India",
    "Next.js Architecture",
    "IT Project Manager India",
    "Digital Product Scaling",
  ],
  alternates: {
    canonical: "/",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Devraj Singh Tomar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Devraj Singh Tomar is a Technology Strategist and Entrepreneur based in India with hands-on technical leadership since 2018. He specializes in turning business ideas into practical technology solutions and scalable digital products.",
      },
    },
    {
      "@type": "Question",
      name: "What does Devraj Singh Tomar specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "He specializes in enterprise Next.js full-stack architectures, strategic IT project management, algorithmic technical SEO/AEO, and building scalable digital platforms across education, healthcare, legal, and commercial industries.",
      },
    },
    {
      "@type": "Question",
      name: "What tech ventures is Devraj Singh Tomar associated with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Devraj is the Founder and Technology Lead at Tecxontechnology, Head of Technology at M/S Career Avsar, and Co-Founder at Lotus Loop Media Solution in Noida.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://devrajsinghtomar.com/",
    },
  ],
};

export default function Page() {
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
      <HomeClient />
    </>
  );
}
