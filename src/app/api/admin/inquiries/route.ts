import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/cms/auth";
import { getCmsStore } from "@/lib/cms/store";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const store = getCmsStore();
  const inquiries = await store.getInquiries();
  return NextResponse.json(inquiries);
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  try {
    const { id, status, internalNotes } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    const store = getCmsStore();
    const updated = await store.updateInquiryStatus(id, status, internalNotes);

    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update inquiry";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
