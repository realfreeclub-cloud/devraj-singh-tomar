import { Metadata } from "next";
import VenturesClient from "./VenturesClient";

export const metadata: Metadata = {
  title: "My Ventures",
  description:
    "Explore the technology-driven ventures founded and scaled by Devraj Singh Tomar including Tecxontechnology, Career Avsar, TXN Learning and more.",
  keywords: [
    "Tecxontechnology",
    "Career Avsar",
    "TXN Learning",
    "Divyajap",
    "Lotus Loop Media",
    "Tech Ventures India",
  ],
};

export default function Page() {
  return <VenturesClient />;
}
