import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/cms/auth";
import { getCmsStore } from "@/lib/cms/store";

/**
 * Sanitize cell content against CSV Formula Injection (CWE-1236).
 * Prepend a single quote if the field starts with =, +, -, @, tab, or carriage return.
 */
function sanitizeCsvCell(value: string | undefined | null): string {
  if (!value) return '""';
  let clean = String(value).trim();
  if (/^[=+\-@\t\r]/.test(clean)) {
    clean = `'${clean}`;
  }
  // Escape double quotes
  return `"${clean.replace(/"/g, '""')}"`;
}

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authorized) return auth.response!;

  const store = getCmsStore();
  const inquiries = await store.getInquiries();

  // Generate CSV rows
  const headers = [
    "Reference ID",
    "Date",
    "Name",
    "Email",
    "Phone",
    "Organization",
    "Subject",
    "Status",
    "Message",
    "Internal Notes",
  ];

  const rows = inquiries.map((inq) => [
    sanitizeCsvCell(inq.referenceId),
    sanitizeCsvCell(inq.createdAt),
    sanitizeCsvCell(inq.name),
    sanitizeCsvCell(inq.email),
    sanitizeCsvCell(inq.phone),
    sanitizeCsvCell(inq.organization),
    sanitizeCsvCell(inq.subject),
    sanitizeCsvCell(inq.status),
    sanitizeCsvCell(inq.message),
    sanitizeCsvCell(inq.internalNotes),
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inquiries-export-${new Date().toISOString().split("T")[0]}.csv"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
