import { NextRequest, NextResponse } from "next/server";
import { getCmsStore } from "@/lib/cms/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, organization, subject, message, source } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const store = getCmsStore();
    const inquiry = await store.createInquiry({
      name: String(name).trim().slice(0, 100),
      email: String(email).trim().slice(0, 100),
      phone: phone ? String(phone).trim().slice(0, 30) : undefined,
      organization: organization ? String(organization).trim().slice(0, 100) : undefined,
      subject: subject ? String(subject).trim().slice(0, 200) : undefined,
      message: String(message).trim().slice(0, 5000),
      source: source || "public-contact-form",
    });

    return NextResponse.json({
      success: true,
      referenceId: inquiry.referenceId,
      message: "Thank you for reaching out. Devraj has received your inquiry and will respond within 24 hours.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to process inquiry";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
