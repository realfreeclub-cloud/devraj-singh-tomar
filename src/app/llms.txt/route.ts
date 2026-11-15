import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "llms.txt");
  let content = "";
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch {
    content = "# Devraj Singh Tomar\n\nIT Project Manager & Next.js Developer India.\nWebsite: https://devrajsinghtomar.com";
  }

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Vary": "Accept",
      "Link": '</llms.txt>; rel="canonical"',
    },
  });
}
