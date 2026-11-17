import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/cms/auth";

export async function GET(req: NextRequest) {
  const user = await getAdminSessionFromRequest(req);
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      lastLoginAt: user.lastLoginAt,
    },
  });
}
