import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "../data";
import BlogPostClient from "./BlogPostClient";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate static paths for all blog posts at build time
 */
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generate SEO metadata for each blog post
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `https://devrajsinghtomar.com/blog/${post.slug}`,
      siteName: "Devraj Singh Tomar",
      publishedTime: post.dateISO,
      authors: ["Devraj Singh Tomar"],
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: `https://devrajsinghtomar.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // BlogPosting JSON-LD structured data for rich search results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: {
      "@type": "Person",
      name: "Devraj Singh Tomar",
      url: "https://devrajsinghtomar.com",
    },
    publisher: {
      "@type": "Person",
      name: "Devraj Singh Tomar",
      url: "https://devrajsinghtomar.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://devrajsinghtomar.com/blog/${post.slug}`,
    },
    image: "https://devrajsinghtomar.com/og-image.png",
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} />
    </>
  );
}
