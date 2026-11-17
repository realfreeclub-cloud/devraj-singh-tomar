import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth, hashPassword, verifyPassword } from "@/lib/cms/auth";
import { getCmsStore } from "@/lib/cms/store";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const store = getCmsStore();
  return NextResponse.json(store.getWebsiteSettings());
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  try {
    const body = await req.json();
    const store = getCmsStore();

    // Check if updating password
    if (body.currentPassword && body.newPassword) {
      const user = auth.user!;
      const isValid = verifyPassword(body.currentPassword, user.passwordHash, user.salt);
      if (!isValid) {
        return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
      }

      if (body.newPassword.length < 8) {
        return NextResponse.json({ error: "New password must be at least 8 characters long." }, { status: 400 });
      }

      const { hash, salt } = hashPassword(body.newPassword);
      store.updateUser(user.id, { passwordHash: hash, salt });
    }

    const { currentPassword, newPassword, ...settingsData } = body;
    const updated = store.saveWebsiteSettings(settingsData);

    return NextResponse.json({
      success: true,
      settings: updated,
      message: "Settings updated successfully.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update settings";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
