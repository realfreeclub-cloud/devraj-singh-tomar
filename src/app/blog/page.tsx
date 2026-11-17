import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Insights & Strategic Field Notes | Devraj Singh Tomar",
  description:
    "Explore strategic essays and field notes by Devraj Singh Tomar on technology architecture, digital product development, software scaling, and IT project management.",
  keywords: [
    "Devraj Singh Tomar Blog",
    "Technology Strategy Insights",
    "Software Architecture Blog",
    "Digital Product Development",
    "IT Project Management",
    "Scaling Startups India",
    "UI UX Conversion Optimization"
  ],
  alternates: {
    canonical: "https://devrajsinghtomar.com/blog",
  },
  openGraph: {
    title: "Insights & Strategic Field Notes | Devraj Singh Tomar",
    description:
      "Explore strategic essays and field notes by Devraj Singh Tomar on technology architecture, digital product development, and IT project management.",
    url: "https://devrajsinghtomar.com/blog",
    siteName: "Devraj Singh Tomar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Devraj Singh Tomar – Strategic Insights & Articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Strategic Field Notes | Devraj Singh Tomar",
    description:
      "Explore strategic essays and field notes by Devraj Singh Tomar on technology architecture and digital product development.",
    images: ["/og-image.png"],
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
      "name": "Strategic Insights",
      "item": "https://devrajsinghtomar.com/blog"
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogClient />
    </>
  );
}
