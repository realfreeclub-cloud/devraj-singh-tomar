import { NextRequest, NextResponse } from "next/server";
import { getDb, isMongoConfigured } from "@/lib/db/mongodb";
import path from "node:path";
import fs from "node:fs";

interface Params {
  params: Promise<{ filename: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  const { filename } = await params;

  if (!filename || filename.includes("..") || filename.includes("/")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  // 1. Try fetching from MongoDB Atlas if configured
  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      if (db) {
        const doc = await db.collection("cms_media_files").findOne({ filename });
        if (doc && doc.data) {
          const buffer = Buffer.from(doc.data, "base64");
          return new NextResponse(buffer, {
            status: 200,
            headers: {
              "Content-Type": doc.mimeType || "image/png",
              "Content-Length": String(buffer.length),
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        }
      }
    } catch (err) {
      console.warn("[Media Stream] Failed to retrieve from MongoDB:", err);
    }
  }

  // 2. Try fetching from local public/uploads/
  const localPath = path.join(process.cwd(), "public", "uploads", filename);
  if (fs.existsSync(localPath)) {
    const ext = path.extname(filename).toLowerCase();
    const mimeMap: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".svg": "image/svg+xml",
      ".gif": "image/gif",
    };
    const mimeType = mimeMap[ext] || "application/octet-stream";
    const fileBuffer = fs.readFileSync(localPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Length": String(fileBuffer.length),
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  return NextResponse.json({ error: "Media file not found." }, { status: 404 });
}
