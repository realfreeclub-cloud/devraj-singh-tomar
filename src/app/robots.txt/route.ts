export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Content-Signal: search=yes, ai-train=yes

Sitemap: https://devrajsinghtomar.com/sitemap.xml
Sitemap: https://devrajsinghtomar.com/image-sitemap.xml
`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Signal": "search=yes, ai-train=yes",
    },
  });
}
