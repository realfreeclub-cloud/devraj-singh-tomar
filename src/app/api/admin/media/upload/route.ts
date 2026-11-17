import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/cms/auth";
import { getCmsStore } from "@/lib/cms/store";
import { uploadMediaFile } from "@/lib/cms/mediaStorage";

export async function POST(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const altText = (formData.get("altText") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Secure persistent upload (Cloudinary / MongoDB / Local FS)
    const result = await uploadMediaFile(buffer, file.name, file.type);

    const store = getCmsStore();
    const mediaItem = await store.saveMediaItem({
      name: file.name,
      url: result.url,
      type: result.mimeType,
      size: result.size,
      altText: altText || file.name,
    });

    return NextResponse.json({
      success: true,
      media: mediaItem,
      storageProvider: result.storageProvider,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
