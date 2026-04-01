import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Tunis uses Poppins
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
    "Devraj Singh Tomar is an experienced IT professional and entrepreneur with a strong presence in the technology and digital solutions ecosystem since 2018.",
  keywords: ["Devraj Singh Tomar", "IT Project Manager", "Entrepreneur India", "Digital Solutions", "Software Development", "Tech Ventures"],
  authors: [{ name: "Devraj Singh Tomar" }],
  creator: "Devraj Singh Tomar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devrajsinghtomar.com",
    siteName: "Devraj Singh Tomar Portfolio",
    title: "Devraj Singh Tomar | IT Professional & Entrepreneur",
    description: "Building scalable digital solutions and growing tech ventures since 2018.",
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
    description: "Building scalable digital solutions and growing tech ventures since 2018.",
    creator: "@devrajsinghtomar",
    images: ["/og-image.png"],
  },
  verification: {
    google: "2TejsEGEIMCMujPsmIig8u9EJprgmvEj4HnyOWxrfL8",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Devraj Singh Tomar",
  url: "https://devrajsinghtomar.com",
  jobTitle: "IT Professional & Entrepreneur",
  description: "IT Project Manager and Strategic Partner in several tech ventures.",
  sameAs: [
    "https://www.linkedin.com/in/devraj-singh-tomar-it/",
    "https://www.instagram.com/devraj_singh_tomar__/",
    "https://www.facebook.com/DevrajSinghT0mar"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
      </body>
    </html>
  );
}
