import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Devraj Singh Tomar, also known as Devraj Tomar. Discover his professional journey as an IT Project Manager and Entrepreneur since 2018.",
  keywords: [
    "About Devraj Singh Tomar",
    "Devraj Tomar",
    "Devraj Singh",
    "IT Career",
    "Tech Entrepreneur",
    "Project Management Experience",
  ],
  alternates: {
    canonical: "https://devrajsinghtomar.com/about",
  },
};

export default function Page() {
  return <AboutClient />;
}
