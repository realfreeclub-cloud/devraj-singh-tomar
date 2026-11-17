import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/cms/auth";
import { getCmsStore } from "@/lib/cms/store";

interface Params {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  const store = getCmsStore();
  const success = await store.deleteInquiry(id);

  if (!success) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Inquiry deleted successfully" });
}
