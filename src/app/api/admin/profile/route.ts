import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/cms/auth";
import { getCmsStore } from "@/lib/cms/store";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const store = getCmsStore();
  const profile = await store.getProfile();
  return NextResponse.json(profile);
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  try {
    const body = await req.json();
    const store = getCmsStore();
    const updated = await store.saveProfile(body);
    return NextResponse.json(updated);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update profile";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
