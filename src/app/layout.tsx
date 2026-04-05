import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devrajsinghtomar.com"),
  title: {
    default: "Devraj Singh Tomar | IT Professional & Entrepreneur",
    template: "%s | Devraj Singh Tomar"
  },
  description:
    "Devraj Singh Tomar, also known as Devraj Tomar, is an experienced IT professional and entrepreneur. Devraj Singh has built a strong presence in the technology and digital solutions ecosystem since 2018.",
  keywords: [
    "Devraj Singh Tomar",
    "Devraj Tomar",
    "Devraj Singh",
    "Devraj",
    "Devraj S Tomar",
    "IT Project Manager",
    "Entrepreneur India",
    "Digital Solutions",
    "Software Development",
    "Tech Ventures",
  ],
  authors: [{ name: "Devraj Singh Tomar" }],
  creator: "Devraj Singh Tomar",
  alternates: {
    canonical: "https://devrajsinghtomar.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devrajsinghtomar.com",
    siteName: "Devraj Singh Tomar Portfolio",
    title: "Devraj Singh Tomar | IT Professional & Entrepreneur",
    description: "Devraj Singh Tomar — IT professional, project manager, and entrepreneur building scalable digital solutions since 2018.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Devraj Singh Tomar — IT Professional & Entrepreneur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devraj Singh Tomar | IT Professional & Entrepreneur",
    description: "Devraj Singh Tomar — IT professional, project manager, and entrepreneur building scalable digital solutions since 2018.",
    creator: "@devrajsinghtomar",
    images: ["/og-image.png"],
  },
  verification: {
    google: "2TejsEGEIMCMujPsmIig8u9EJprgmvEj4HnyOWxrfL8",
  },
};

// ── Requirement 1: Enhanced Person JSON-LD with alternateName ──
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Devraj Singh Tomar",
  alternateName: [
    "Devraj Tomar",
    "Devraj Singh",
    "Devraj",
    "Devraj S Tomar",
  ],
  url: "https://devrajsinghtomar.com",
  jobTitle: "IT Professional & Entrepreneur",
  description:
    "Devraj Singh Tomar, also referred to as Devraj Tomar and Devraj Singh, is an experienced IT project manager and entrepreneur specializing in scalable digital solutions since 2018.",
  image: "https://devrajsinghtomar.com/devraj-singh-tomar.jpg",
  address: {
    "@type": "PostalAddress",
    "streetAddress": "chokhani square, 309, Sector 18",
    "addressLocality": "Noida",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "201301",
    "addressCountry": "IN"
  },
  sameAs: [
    "https://www.linkedin.com/in/devraj-singh-tomar-it/",
    "https://www.instagram.com/devraj_singh_tomar__/",
    "https://www.facebook.com/DevrajSinghT0mar",
  ],
  knowsAbout: [
    "IT Project Management",
    "Software Development",
    "Entrepreneurship",
    "Digital Solutions",
    "Web Development",
  ],
};

// ── WebSite schema for sitelinks search box ──
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Devraj Singh Tomar",
  alternateName: ["Devraj Tomar", "Devraj Singh", "Devraj S Tomar"],
  url: "https://devrajsinghtomar.com",
};

// ── ImageObject schema for Google Image Search indexing ──
const imageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  contentUrl: "https://devrajsinghtomar.com/devraj-singh-tomar.jpg",
  url: "https://devrajsinghtomar.com/devraj-singh-tomar.jpg",
  name: "Devraj Singh Tomar - IT Professional and Entrepreneur",
  description:
    "Photo of Devraj Singh Tomar, also known as Devraj Tomar, an experienced IT professional, project manager, and entrepreneur based in India.",
  caption: "Devraj Singh Tomar — IT Professional & Entrepreneur since 2018",
  creator: {
    "@type": "Person",
    name: "Devraj Singh Tomar",
  },
  copyrightHolder: {
    "@type": "Person",
    name: "Devraj Singh Tomar",
  },
  width: 1200,
  height: 1600,
  encodingFormat: "image/jpeg",
  representativeOfPage: true,
  about: {
    "@type": "Person",
    name: "Devraj Singh Tomar",
    url: "https://devrajsinghtomar.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Person structured data with alternate names */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* ImageObject structured data for Google Image Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }}
        />
      </head>
      <body
        className={`${poppins.className} bg-background text-foreground antialiased min-h-screen relative overflow-x-hidden`}
        suppressHydrationWarning
      >
        <CustomCursor />
        <Navbar />
        
        <main className="w-full relative z-10 lg:pl-0 lg:pr-[100px] min-h-screen">
          {children}
        </main>

        {/* ── Requirement 3: Hidden SEO content (sr-only) ── */}
        {/* Screen-reader only, not visible in UI, but crawlable by Google */}
        <div className="sr-only">
          <p>
            Devraj Singh Tomar, also referred to as Devraj Tomar, Devraj Singh, and Devraj, 
            is an established IT professional and entrepreneur based in India. 
            Devraj S Tomar has been building scalable technology solutions and managing 
            digital platforms since 2018. Whether you know him as Devraj Tomar or Devraj Singh Tomar, 
            he brings the same dedication to IT project management, software development, 
            and business partnerships across multiple tech ventures.
          </p>
        </div>
      </body>
    </html>
  );
}
