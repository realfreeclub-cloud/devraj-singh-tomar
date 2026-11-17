import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/cms/auth";
import { runCmsMigrationToMongo } from "@/lib/cms/migrateToMongo";
import { isMongoConfigured, testMongoConnection } from "@/lib/db/mongodb";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const mongoConfigured = isMongoConfigured();
  const connectionTest = await testMongoConnection();

  return NextResponse.json({
    mongoConfigured,
    connected: connectionTest.connected,
    error: connectionTest.error,
    message: connectionTest.connected
      ? "MongoDB Atlas is successfully connected and ready."
      : "MongoDB Atlas is not connected. Local JSON store is active as development fallback.",
  });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const report = await runCmsMigrationToMongo();

  if (!report.success) {
    return NextResponse.json(
      {
        error: report.error || "Migration failed",
        report,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "CMS data successfully migrated to MongoDB Atlas with indexes.",
    report,
  });
}
