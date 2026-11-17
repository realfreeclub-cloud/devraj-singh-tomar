import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/cms/auth";
import { getCmsStore } from "@/lib/cms/store";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  const store = getCmsStore();
  const project = store.getProjectById(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const { id } = await params;
  const store = getCmsStore();
  const success = store.deleteProject(id);

  if (!success) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Project deleted successfully" });
}
