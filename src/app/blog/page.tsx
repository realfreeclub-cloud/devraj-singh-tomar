import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read Devraj Singh Tomar's insights on product development, IT project management, startup growth, and digital solutions.",
  keywords: [
    "IT Blog India",
    "Startup Blog",
    "Digital Solutions",
    "Product Development",
    "Project Management Blog",
  ],
};

export default function Page() {
  return <BlogClient />;
}
