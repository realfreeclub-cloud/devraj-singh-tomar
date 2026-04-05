// Image Sitemap for Google Image Search indexing
// This serves an XML sitemap specifically for images, helping Google discover
// and index all images on devrajsinghtomar.com

export async function GET() {
  const baseUrl = "https://devrajsinghtomar.com";

  const imageEntries = [
    {
      pageUrl: baseUrl,
      images: [
        {
          loc: `${baseUrl}/devraj-singh-tomar.jpg`,
          title: "Devraj Singh Tomar - IT Professional and Entrepreneur",
          caption:
            "Devraj Singh Tomar, also known as Devraj Tomar, is an experienced IT professional and entrepreneur based in India.",
        },
        {
          loc: `${baseUrl}/devraj-singh-tomar-mobile.jpg`,
          title: "Devraj Singh Tomar Profile Photo",
          caption:
            "Profile photo of Devraj Singh Tomar, IT Project Manager and tech entrepreneur since 2018.",
        },
        {
          loc: `${baseUrl}/og-image.png`,
          title: "Devraj Singh Tomar - Official Portfolio",
          caption:
            "Official branding image for Devraj Singh Tomar's professional portfolio website.",
        },
      ],
    },
    {
      pageUrl: `${baseUrl}/about`,
      images: [
        {
          loc: `${baseUrl}/devraj-singh-tomar.jpg`,
          title: "About Devraj Singh Tomar",
          caption:
            "Devraj Singh Tomar — IT professional, project manager, and entrepreneur building scalable digital solutions since 2018.",
        },
      ],
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.pageUrl}</loc>
${entry.images
  .map(
    (img) => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
      <image:caption>${img.caption}</image:caption>
    </image:image>`
  )
  .join("\n")}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
