import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AdminUser } from "./types";
import { getCmsStore } from "./store";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "devraj-cms-super-secret-key-2026-secure";

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(verifyHash, "hex"));
}

export function createSessionToken(user: AdminUser): string {
  const payload = {
    sub: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): { sub: string; email: string; username: string; role: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [encodedPayload, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(encodedPayload)
      .digest("base64url");

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    if (Date.now() > payload.exp) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Server-side helper to verify admin session from Request cookies
 */
export async function getAdminSessionFromRequest(req: NextRequest): Promise<AdminUser | null> {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const verified = verifySessionToken(token);
  if (!verified) return null;

  const store = getCmsStore();
  const user = store.getUserById(verified.sub);
  return user || null;
}

/**
 * Server Component / Server Action helper to verify session from next/headers
 */
export async function getAdminSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const verified = verifySessionToken(token);
  if (!verified) return null;

  const store = getCmsStore();
  return store.getUserById(verified.sub) || null;
}

/**
 * Authentication guard for Next.js Route Handlers
 */
export async function requireAdminAuth(req: NextRequest): Promise<{ authorized: boolean; user?: AdminUser; response?: NextResponse }> {
  const user = await getAdminSessionFromRequest(req);
  if (!user) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Unauthorized access. Admin authentication required." }, { status: 401 }),
    };
  }
  return { authorized: true, user };
}

export { SESSION_COOKIE_NAME };
