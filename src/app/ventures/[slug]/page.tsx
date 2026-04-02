import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ventures, getVentureBySlug } from "../data";
import VentureDetailClient from "./VentureDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate static paths for all ventures at build time
 */
export async function generateStaticParams() {
  return ventures.map((v) => ({
    slug: v.slug,
  }));
}

/**
 * Generate SEO metadata for each venture page
 * Incorporates name variations (Devraj Tomar, etc.) naturally in description.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVentureBySlug(slug);

  if (!venture) {
    return { title: "Venture Not Found" };
  }

  const baseTitle = `${venture.title} | Venture by Devraj Singh Tomar`;
  const nameVariationsText = `Devraj Singh Tomar (also known as Devraj Tomar or Devraj Singh)`;

  return {
    title: baseTitle,
    description: `${venture.description}. Managed and led by ${nameVariationsText}, an experienced IT professional and entrepreneur. Explore how he drives innovation at ${venture.title}.`,
    keywords: [...venture.keywords, "Devraj Singh Tomar", "Devraj Tomar", "Devraj Singh", "Entrepreneurship India"],
    openGraph: {
      type: "article",
      title: baseTitle,
      description: venture.description,
      url: `https://devrajsinghtomar.com/ventures/${venture.slug}`,
      siteName: "Devraj Singh Tomar",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${venture.title} - Partner & IT Project Head Devraj Singh Tomar`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: baseTitle,
      description: venture.description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: `https://devrajsinghtomar.com/ventures/${venture.slug}`,
    },
  };
}

export default async function VentureDetailPage({ params }: Props) {
  const { slug } = await params;
  const venture = getVentureBySlug(slug);

  if (!venture) {
    notFound();
  }

  // Schema.org markup for professional work/projects
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${venture.title} - Professional Venture`,
    description: venture.description,
    datePublished: venture.dateISO,
    author: {
      "@type": "Person",
      name: "Devraj Singh Tomar",
      jobTitle: venture.role || "Entrepreneur",
      url: "https://devrajsinghtomar.com",
    },
    publisher: {
      "@type": "Person",
      name: "Devraj Singh Tomar",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://devrajsinghtomar.com/ventures/${venture.slug}`,
    },
    image: "https://devrajsinghtomar.com/og-image.png",
    keywords: venture.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VentureDetailClient venture={venture} />
    </>
  );
}
