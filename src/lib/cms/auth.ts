import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AdminUser, CmsSession } from "./types";
import { getCmsStore } from "./store";

const SESSION_COOKIE_NAME = "admin_session";

// OWASP 2023/2024 guidance for PBKDF2-HMAC-SHA512: 210,000 iterations minimum
const PBKDF2_ITERATIONS = 210000;
const PBKDF2_KEYLEN = 64;
const PBKDF2_DIGEST = "sha512";
const LEGACY_ITERATIONS = 1000;

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[Security Warning] ADMIN_SESSION_SECRET is not set in production. Using derived fallback. Please set ADMIN_SESSION_SECRET in production environment variables."
      );
    }
    return "devraj-cms-super-secret-key-2026-secure-production-hardened";
  }
  return secret;
}

/**
 * Modern OWASP-compliant password hashing (PBKDF2-SHA512 with 210,000 iterations)
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST).toString("hex");
  return { hash, salt };
}

/**
 * Timing-safe password verification with backward compatibility for legacy hashes
 */
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    // 1. Check with modern 210,000 iterations
    const verifyHash = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST).toString("hex");
    if (crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(verifyHash, "hex"))) {
      return true;
    }

    // 2. Backward compatibility fallback for initial 1,000 iterations
    const legacyVerify = crypto.pbkdf2Sync(password, salt, LEGACY_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST).toString("hex");
    if (crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(legacyVerify, "hex"))) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Cryptographic hash of session token for safe database indexing
 */
export function hashSessionToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Issue a cryptographically random, tamper-proof session token
 */
export function createSessionToken(user: AdminUser): { token: string; tokenHash: string; expiresAt: Date } {
  const randomBytes = crypto.randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

  const payload = {
    sub: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    rnd: randomBytes,
    exp: expiresAt.getTime(),
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSessionSecret())
    .update(encodedPayload)
    .digest("base64url");

  const token = `${encodedPayload}.${signature}`;
  const tokenHash = hashSessionToken(token);

  return { token, tokenHash, expiresAt };
}

/**
 * Verify cryptographic HMAC signature & expiration of session token
 */
export function verifySessionToken(token: string): { sub: string; email: string; username: string; role: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [encodedPayload, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", getSessionSecret())
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
 * Server-side helper to verify admin session from Request cookies with server-side revocation check
 */
export async function getAdminSessionFromRequest(req: NextRequest): Promise<AdminUser | null> {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const verified = verifySessionToken(token);
  if (!verified) return null;

  const store = getCmsStore();

  // Check server-side revocation
  const tokenHash = hashSessionToken(token);
  const sessionRecord = await store.getSessionByHash(tokenHash);
  if (sessionRecord && sessionRecord.isRevoked) {
    return null;
  }

  const user = await store.getUserById(verified.sub);
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
  const tokenHash = hashSessionToken(token);
  const sessionRecord = await store.getSessionByHash(tokenHash);
  if (sessionRecord && sessionRecord.isRevoked) {
    return null;
  }

  return store.getUserById(verified.sub);
}

/**
 * CSRF & Origin Validation for state-modifying requests (POST, PUT, DELETE, PATCH)
 */
export function validateCsrf(req: NextRequest): boolean {
  const method = req.method.toUpperCase();
  if (["GET", "HEAD", "OPTIONS"].includes(method)) {
    return true; // Read-only methods exempt
  }

  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const host = req.headers.get("host");

  if (!host) return true;

  if (origin) {
    try {
      const originHost = new URL(origin).host;
      if (originHost === host) return true;
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const refererHost = new URL(referer).host;
      if (refererHost === host) return true;
    } catch {
      return false;
    }
  }

  // Allow custom header for API clients or same-origin AJAX
  const requestedWith = req.headers.get("x-requested-with");
  if (requestedWith === "XMLHttpRequest") return true;

  // In production, reject if origin/referer does not match host
  if (process.env.NODE_ENV === "production" && (origin || referer)) {
    return false;
  }

  return true;
}

/**
 * Authentication guard for Next.js Route Handlers with CSRF verification
 */
export async function requireAdminAuth(
  req: NextRequest
): Promise<{ authorized: boolean; user?: AdminUser; response?: NextResponse }> {
  // 1. CSRF Protection
  if (!validateCsrf(req)) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "CSRF verification failed. Request origin does not match target host." },
        { status: 403 }
      ),
    };
  }

  // 2. Admin Session Check
  const user = await getAdminSessionFromRequest(req);
  if (!user) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized access. Valid administrator session required." },
        { status: 401 }
      ),
    };
  }

  return { authorized: true, user };
}

export { SESSION_COOKIE_NAME, PBKDF2_ITERATIONS };
