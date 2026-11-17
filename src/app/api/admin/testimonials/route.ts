import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/cms/auth";
import { getCmsStore } from "@/lib/cms/store";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const store = getCmsStore();
  const items = await store.getTestimonials();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  try {
    const body = await req.json();
    if (!body.name || !body.content) {
      return NextResponse.json({ error: "Name and testimonial content are required." }, { status: 400 });
    }

    const store = getCmsStore();
    const saved = await store.saveTestimonial(body);
    return NextResponse.json(saved);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save testimonial";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
