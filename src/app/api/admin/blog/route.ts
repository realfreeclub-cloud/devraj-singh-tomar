import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/cms/auth";
import { getCmsStore } from "@/lib/cms/store";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const store = getCmsStore();
  const articles = await store.getArticles();
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  try {
    const body = await req.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: "Article title and slug are required." }, { status: 400 });
    }

    const store = getCmsStore();
    const saved = await store.saveArticle(body);
    return NextResponse.json(saved);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save article";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
