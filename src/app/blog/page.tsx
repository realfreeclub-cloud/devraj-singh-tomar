import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read Devraj Singh Tomar's insights on product development, IT project management, startup growth, and digital solutions.",
  keywords: [
    "Devraj Singh Tomar Blog",
    "Devraj Tomar",
    "IT Blog India",
    "Startup Blog",
    "Digital Solutions",
    "Product Development",
    "Project Management Blog",
  ],
  alternates: {
    canonical: "https://devrajsinghtomar.com/blog",
  },
};

export default function Page() {
  return <BlogClient />;
}
