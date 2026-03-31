import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about Devraj Singh Tomar's professional journey as an IT Project Manager and Entrepreneur since 2018.",
  keywords: ["About Devraj Singh Tomar", "IT Career", "Tech Entrepreneur", "Project Management Experience"]
};

export default function Page() {
  return <AboutClient />;
}
