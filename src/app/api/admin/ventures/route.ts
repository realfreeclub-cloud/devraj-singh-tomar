import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/cms/auth";
import { getCmsStore } from "@/lib/cms/store";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const store = getCmsStore();
  const ventures = await store.getVentures();
  return NextResponse.json(ventures);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: "Venture name is required." }, { status: 400 });
    }

    const store = getCmsStore();
    const saved = await store.saveVenture(body);
    return NextResponse.json(saved);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save venture";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
