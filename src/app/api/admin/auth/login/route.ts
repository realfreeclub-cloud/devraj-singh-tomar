import { NextRequest, NextResponse } from "next/server";
import { getCmsStore } from "@/lib/cms/store";
import { verifyPassword, createSessionToken, SESSION_COOKIE_NAME } from "@/lib/cms/auth";

export async function POST(req: NextRequest) {
  try {
    const { usernameOrEmail, password } = await req.json();

    if (!usernameOrEmail || !password) {
      return NextResponse.json({ error: "Username/Email and password are required." }, { status: 400 });
    }

    const store = getCmsStore();
    const user = store.getUsers().find(
      (u) =>
        u.email.toLowerCase() === usernameOrEmail.toLowerCase() ||
        u.username.toLowerCase() === usernameOrEmail.toLowerCase()
    );

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const isValid = verifyPassword(password, user.passwordHash, user.salt);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // Update last login
    store.updateUser(user.id, { lastLoginAt: new Date().toISOString() });

    // Create session token
    const token = createSessionToken(user);

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
