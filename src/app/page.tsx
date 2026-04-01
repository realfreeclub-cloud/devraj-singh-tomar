import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Devraj Singh Tomar | IT Professional & Entrepreneur",
  description:
    "Devraj Singh Tomar, also known as Devraj Tomar, is an experienced IT professional and entrepreneur building scalable digital solutions and growing tech ventures since 2018.",
  keywords: [
    "Devraj Singh Tomar",
    "Devraj Tomar",
    "Devraj Singh",
    "Devraj",
    "Devraj S Tomar",
    "IT Professional India",
    "Tech Entrepreneur",
    "Digital Solutions",
    "IT Project Manager",
    "Software Development India",
  ],
  alternates: {
    canonical: "https://devrajsinghtomar.com",
  },
};

export default function Page() {
  return <HomeClient />;
}
