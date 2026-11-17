import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/cms/auth";
import { getCmsStore } from "@/lib/cms/store";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const store = getCmsStore();
  const inquiries = store.getInquiries();

  // Generate CSV rows
  const headers = ["Reference ID", "Date", "Name", "Email", "Phone", "Organization", "Subject", "Status", "Message", "Internal Notes"];
  const rows = inquiries.map((inq) => [
    `"${inq.referenceId}"`,
    `"${inq.createdAt}"`,
    `"${(inq.name || "").replace(/"/g, '""')}"`,
    `"${(inq.email || "").replace(/"/g, '""')}"`,
    `"${(inq.phone || "").replace(/"/g, '""')}"`,
    `"${(inq.organization || "").replace(/"/g, '""')}"`,
    `"${(inq.subject || "").replace(/"/g, '""')}"`,
    `"${inq.status}"`,
    `"${(inq.message || "").replace(/"/g, '""')}"`,
    `"${(inq.internalNotes || "").replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inquiries-export-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
