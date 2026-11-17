import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/cms/auth";
import { getCmsStore } from "@/lib/cms/store";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const store = getCmsStore();
  const projects = await store.getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  try {
    const body = await req.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ error: "Project name and slug are required." }, { status: 400 });
    }

    const store = getCmsStore();
    const saved = await store.saveProject(body);
    return NextResponse.json(saved);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to save project";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
