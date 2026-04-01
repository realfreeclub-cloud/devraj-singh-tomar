import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Devraj Singh Tomar for IT partnerships, project collaborations, or any digital solution inquiries. Reach out to Devraj Tomar today.",
  keywords: [
    "Contact Devraj Singh Tomar",
    "Devraj Tomar",
    "Devraj Singh",
    "Hire IT Professional India",
    "Tech Partnership",
    "Digital Collaboration",
  ],
  alternates: {
    canonical: "https://devrajsinghtomar.com/contact",
  },
};

export default function Page() {
  return <ContactClient />;
}
