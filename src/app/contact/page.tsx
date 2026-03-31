import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Devraj Singh Tomar for IT partnerships, project collaborations, or any digital solution inquiries.",
  keywords: [
    "Contact Devraj Singh Tomar",
    "Hire IT Professional India",
    "Tech Partnership",
    "Digital Collaboration",
  ],
};

export default function Page() {
  return <ContactClient />;
}
