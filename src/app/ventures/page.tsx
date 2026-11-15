import { Metadata } from "next";
import VenturesClient from "./VenturesClient";

export const metadata: Metadata = {
  title: "My Ventures",
  description:
    "Explore the technology-driven ventures founded and scaled by Devraj Singh Tomar, including Tecxontechnology, Career Avsar, and Lotus Loop Media Solution.",
  keywords: [
    "Devraj Singh Tomar Ventures",
    "Devraj Tomar",
    "Tecxontechnology",
    "Career Avsar",
    "Lotus Loop Media Solution",
    "Tech Ventures India",
  ],
  alternates: {
    canonical: "https://devrajsinghtomar.com/ventures",
  },
};

export default function Page() {
  return <VenturesClient />;
}
