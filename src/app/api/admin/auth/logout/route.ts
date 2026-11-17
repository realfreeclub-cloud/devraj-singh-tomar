import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, hashSessionToken } from "@/lib/cms/auth";
import { getCmsStore } from "@/lib/cms/store";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (token) {
      const tokenHash = hashSessionToken(token);
      const store = getCmsStore();
      await store.revokeSession(tokenHash);
    }
  } catch (err) {
    console.warn("[Auth] Error revoking session during logout:", err);
  }

  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return response;
}
