import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { getDb, isMongoConfigured } from "@/lib/db/mongodb";

export const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
]);

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface UploadResult {
  url: string;
  filename: string;
  storageProvider: "cloudinary" | "vercel-blob" | "mongodb" | "local-fs";
  size: number;
  mimeType: string;
}

export function sanitizeFilename(originalName: string): { cleanBase: string; ext: string; uniqueFilename: string } {
  const ext = (path.extname(originalName) || ".png").toLowerCase();
  const base = path.basename(originalName, ext);
  const cleanBase = base
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);
  const randomSuffix = crypto.randomBytes(4).toString("hex");
  const uniqueFilename = `${cleanBase}-${Date.now()}-${randomSuffix}${ext}`;
  return { cleanBase, ext, uniqueFilename };
}

export async function uploadMediaFile(
  buffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<UploadResult> {
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new Error(
      `Unsupported media format (${mimeType}). Allowed formats: JPEG, PNG, WebP, SVG, and GIF.`
    );
  }

  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error("File exceeds maximum permissible size of 10MB.");
  }

  const { uniqueFilename } = sanitizeFilename(originalFilename);

  // 1. CLOUDINARY PROVIDER (if configured)
  const cloudinaryCloud = process.env.CLOUDINARY_CLOUD_NAME;
  const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
  const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

  if (cloudinaryCloud && cloudinaryApiKey && cloudinaryApiSecret) {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const paramsToSign = `folder=devrajsinghtomar&timestamp=${timestamp}${cloudinaryApiSecret}`;
      const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

      const formData = new FormData();
      formData.append("file", `data:${mimeType};base64,${buffer.toString("base64")}`);
      formData.append("api_key", cloudinaryApiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("folder", "devrajsinghtomar");

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloud}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (cloudRes.ok) {
        const cloudData = await cloudRes.json();
        return {
          url: cloudData.secure_url || cloudData.url,
          filename: uniqueFilename,
          storageProvider: "cloudinary",
          size: buffer.length,
          mimeType,
        };
      } else {
        console.warn("[Cloudinary] Upload failed, falling back to database/local storage:", await cloudRes.text());
      }
    } catch (err) {
      console.warn("[Cloudinary] Integration exception, falling back:", err);
    }
  }

  // 2. MONGODB ATLAS BINARY STORAGE PROVIDER (Zero external dependency cloud persistence)
  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      if (db) {
        const fileId = `file-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
        await db.collection("cms_media_files").insertOne({
          id: fileId,
          filename: uniqueFilename,
          mimeType,
          size: buffer.length,
          data: buffer.toString("base64"),
          createdAt: new Date().toISOString(),
        });

        // Serves through the streaming endpoint for maximum CDN caching and persistence
        const streamUrl = `/api/media/file/${uniqueFilename}`;
        return {
          url: streamUrl,
          filename: uniqueFilename,
          storageProvider: "mongodb",
          size: buffer.length,
          mimeType,
        };
      }
    } catch (err) {
      console.warn("[MongoDB Media Storage] Failed to store in MongoDB, falling back to local:", err);
    }
  }

  // 3. LOCAL DEVELOPMENT FALLBACK (Only when no cloud storage is configured)
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction && !isMongoConfigured() && !cloudinaryCloud) {
    console.warn(
      "[Storage Warning] Running in production without persistent cloud storage configured (neither MONGODB_URI nor CLOUDINARY credentials found). Local disk writes will be ephemeral on Vercel."
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, uniqueFilename);
  fs.writeFileSync(filePath, buffer);

  return {
    url: `/uploads/${uniqueFilename}`,
    filename: uniqueFilename,
    storageProvider: "local-fs",
    size: buffer.length,
    mimeType,
  };
}

export async function deleteMediaFile(url: string): Promise<boolean> {
  // If stored in MongoDB
  if (url.startsWith("/api/media/file/")) {
    const filename = url.replace("/api/media/file/", "");
    const db = await getDb();
    if (db) {
      await db.collection("cms_media_files").deleteOne({ filename });
      return true;
    }
  }

  // If local file
  if (url.startsWith("/uploads/")) {
    const localFilePath = path.join(process.cwd(), "public", url);
    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
        return true;
      } catch (err) {
        console.warn("[Media Storage] Could not delete local file:", err);
      }
    }
  }

  return true;
}
