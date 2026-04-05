import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Devraj Singh Tomar | Next.js Developer & Entrepreneur",
  description:
    "Devraj Singh Tomar is an IT Project Manager, Next.js Developer, and Entrepreneur in India, providing scalable software and digital solutions since 2018.",
  keywords: [
    "Devraj Singh Tomar",
    "IT Project Manager India",
    "Entrepreneur India",
    "Next.js Developer India",
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
        text: "Devraj Singh Tomar is an experienced IT Project Manager, Next.js Developer, and Entrepreneur based in India, specializing in scalable software and digital solutions since 2018.",
      },
    },
    {
      "@type": "Question",
      name: "What services does Devraj Singh Tomar offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "He specializes in IT project management, Next.js web development, and digital transformation, partnering with multiple tech ventures to build robust digital platforms.",
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
