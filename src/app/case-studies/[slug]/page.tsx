import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  getPrevNextCaseStudies,
} from "@/data/projectsData";
import CaseStudyDetailClient from "./CaseStudyDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all detailed case studies at build time
 */
export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

/**
 * Generate dynamic SEO metadata for each case study
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | Devraj Singh Tomar",
      description: "The requested case study could not be found.",
    };
  }

  const pageTitle = `${caseStudy.title} | Case Study`;
  const pageDesc = caseStudy.subtitle;
  const canonicalUrl = `https://devrajsinghtomar.com/case-studies/${caseStudy.slug}`;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      ...caseStudy.keywords,
      "Devraj Singh Tomar",
      "Technology Strategist",
      "System Architecture",
      "Case Study",
      caseStudy.client,
      caseStudy.category,
    ],
    authors: [{ name: "Devraj Singh Tomar", url: "https://devrajsinghtomar.com" }],
    creator: "Devraj Singh Tomar",
    publisher: "Devraj Singh Tomar",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      siteName: "Devraj Singh Tomar – Technology Strategist & Entrepreneur",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
      images: ["/og-image.png"],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const related = getRelatedCaseStudies(caseStudy.slug, 3);
  const prevNext = getPrevNextCaseStudies(caseStudy.slug);

  // Structured Data: BreadcrumbList + CreativeWork / TechArticle
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: "https://devrajsinghtomar.com/case-studies",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: caseStudy.title,
        item: `https://devrajsinghtomar.com/case-studies/${caseStudy.slug}`,
      },
    ],
  };

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: caseStudy.title,
    description: caseStudy.subtitle,
    url: `https://devrajsinghtomar.com/case-studies/${caseStudy.slug}`,
    image: "https://devrajsinghtomar.com/og-image.png",
    author: {
      "@type": "Person",
      name: "Devraj Singh Tomar",
      jobTitle: "Technology Strategist & Entrepreneur",
      url: "https://devrajsinghtomar.com",
    },
    publisher: {
      "@type": "Person",
      name: "Devraj Singh Tomar",
      url: "https://devrajsinghtomar.com",
    },
    about: {
      "@type": "SoftwareApplication",
      name: caseStudy.client,
      applicationCategory: caseStudy.category,
      operatingSystem: "Web, Cloud",
      url: caseStudy.liveUrl,
    },
    keywords: caseStudy.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <CaseStudyDetailClient
        caseStudy={caseStudy}
        relatedCaseStudies={related}
        prevNext={prevNext}
      />
    </>
  );
}
