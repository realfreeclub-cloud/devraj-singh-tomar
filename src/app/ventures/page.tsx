import { Metadata } from "next";
import VenturesClient from "./VenturesClient";

export const metadata: Metadata = {
  title: "Ventures & Partnerships | Devraj Singh Tomar",
  description:
    "Explore the businesses co-founded, strategic institutional partnerships, and digital products created by Devraj Singh Tomar, including Lotus Loop Media Solutions, Tecxontechnology, and Career Avsar.",
  keywords: [
    "Devraj Singh Tomar Ventures",
    "Lotus Loop Media Solution",
    "Tecxontechnology",
    "Career Avsar",
    "Divya Jap",
    "NGIT Edu",
    "Tech Entrepreneur India",
    "Digital Product Ventures"
  ],
  alternates: {
    canonical: "https://devrajsinghtomar.com/ventures",
  },
  openGraph: {
    title: "Ventures & Partnerships | Devraj Singh Tomar",
    description:
      "Explore the businesses co-founded, strategic institutional partnerships, and digital products created by Devraj Singh Tomar.",
    url: "https://devrajsinghtomar.com/ventures",
    siteName: "Devraj Singh Tomar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Devraj Singh Tomar – Ventures and Partnerships",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ventures & Partnerships | Devraj Singh Tomar",
    description:
      "Explore the businesses co-founded, strategic institutional partnerships, and digital products created by Devraj Singh Tomar.",
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
      "name": "Ventures & Partnerships",
      "item": "https://devrajsinghtomar.com/ventures"
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
      <VenturesClient />
    </>
  );
}
