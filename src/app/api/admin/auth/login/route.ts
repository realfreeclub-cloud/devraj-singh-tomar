import { NextRequest, NextResponse } from "next/server";
import { getCmsStore } from "@/lib/cms/store";
import {
  verifyPassword,
  hashPassword,
  createSessionToken,
  SESSION_COOKIE_NAME,
} from "@/lib/cms/auth";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const store = getCmsStore();

    // 1. Rate Limiting Check
    const rateCheck = await store.checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. IP temporarily locked for security. Try again in ${rateCheck.retryAfterSeconds} seconds.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSeconds || 900),
          },
        }
      );
    }

    const { usernameOrEmail, password } = await req.json();

    if (!usernameOrEmail || !password) {
      return NextResponse.json({ error: "Username/Email and password are required." }, { status: 400 });
    }

    const users = await store.getUsers();
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === usernameOrEmail.toLowerCase().trim() ||
        u.username.toLowerCase() === usernameOrEmail.toLowerCase().trim()
    );

    if (!user) {
      const fail = await store.recordFailedLogin(ip);
      const msg = fail.locked
        ? `Account access locked due to 5 consecutive failed attempts. Try again in ${fail.lockTimeRemainingMinutes} minutes.`
        : `Invalid credentials. (${fail.remainingAttempts} attempts remaining before temporary lockout)`;
      return NextResponse.json({ error: msg }, { status: 401 });
    }

    const isValid = verifyPassword(password, user.passwordHash, user.salt);
    if (!isValid) {
      const fail = await store.recordFailedLogin(ip);
      const msg = fail.locked
        ? `Account access locked due to 5 consecutive failed attempts. Try again in ${fail.lockTimeRemainingMinutes} minutes.`
        : `Invalid credentials. (${fail.remainingAttempts} attempts remaining before temporary lockout)`;
      return NextResponse.json({ error: msg }, { status: 401 });
    }

    // Reset rate limiter on successful authentication
    await store.resetFailedLogins(ip);

    // Modernize password hash to 210,000 iterations if needed
    const { hash: newHash, salt: newSalt } = hashPassword(password);
    await store.updateUser(user.id, {
      passwordHash: newHash,
      salt: newSalt,
      lastLoginAt: new Date().toISOString(),
    });

    // Create session with server-side revocation tracking
    const { token, tokenHash, expiresAt } = createSessionToken(user);
    await store.saveSession({
      tokenHash,
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      ip,
      userAgent: req.headers.get("user-agent") || "unknown",
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
      isRevoked: false,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
