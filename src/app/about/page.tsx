import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Me | Devraj Singh Tomar | Next.js Developer India",
  description:
    "Read the inspiring journey of Devraj Singh Tomar, an expert Next.js Developer and IT Project Manager in India. Discover his transition from a small village in Jhansi to co-founding leading digital media solutions in Noida.",
  keywords: [
    "Devraj Singh Tomar",
    "Next.js Developer India",
    "IT Project Manager India",
    "Tech Entrepreneur",
    "Website Development India",
    "SEO Optimization Expert",
    "Lotus Loop Media Solution"
  ],
  alternates: {
    canonical: "https://devrajsinghtomar.com/about",
  },
};

export default function Page() {
  return <AboutClient />;
}
