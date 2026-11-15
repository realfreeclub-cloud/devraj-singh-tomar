import { NextRequest, NextResponse } from "next/server";

const KNOWN_ROUTES = new Set([
  "/",
  "/about",
  "/case-studies",
  "/ventures",
  "/services",
  "/hire",
  "/contact",
  "/privacy",
  "/blog",
  "/blog/how-to-scale-nextjs-performance-2026",
  "/blog/local-seo-ranking-google-business-profiles",
  "/blog/full-stack-web-architecture-for-enterprises",
  "/blog/bridging-digital-divide-rural-institutions",
  "/blog/building-frictionless-lead-funnels",
]);

const HOMEPAGE_MARKDOWN = `# Devraj Singh Tomar — IT Professional, Project Manager & Next.js Developer India

> Devraj Singh Tomar is an experienced IT professional, project manager, and entrepreneur with a proven track record of building and managing digital platforms since 2018.

## Profile Summary
- **Name:** Devraj Singh Tomar (also known as Devraj Tomar, Devraj Singh)
- **Role:** IT Project Manager & Next.js Web Developer
- **Location:** chokhani square, 309, Sector 18, Noida, Uttar Pradesh 201301, India
- **Email:** [hello@devrajsinghtomar.com](mailto:hello@devrajsinghtomar.com)
- **Phone:** [+91 9140946121](tel:+919140946121)
- **Website:** https://devrajsinghtomar.com
- **LLMs Guide:** https://devrajsinghtomar.com/llms.txt

## Key Specializations
- Full-Stack Web Development (Next.js 16, React 19, TypeScript, Tailwind CSS, SSR, ISR, Edge Performance)
- IT Project Management & Agile Architecture
- Advanced Technical SEO, Google Knowledge Panel & Google Maps 3-Pack Authority
- Enterprise Digital Platforms (Delivered portals for 7 Government Medical Colleges & 60+ client projects)

## Core Ventures
1. **Tecxontechnology** ([https://tecxontech.com/](https://tecxontech.com/)): Technology solutions and IT services.
2. **M/S Career Avsar** ([https://careeravsar.com/](https://careeravsar.com/)): Technology solutions, teacher placement platform, and digital services.
3. **Lotus Loop Media Solution** ([https://lotusloop.in/](https://lotusloop.in/)): Media and digital scaling agency in Noida.

## Navigation Links
- [About Devraj](https://devrajsinghtomar.com/about)
- [Case Studies & 60+ Live Projects](https://devrajsinghtomar.com/case-studies)
- [Services](https://devrajsinghtomar.com/services)
- [Ventures](https://devrajsinghtomar.com/ventures)
- [Hire Me](https://devrajsinghtomar.com/hire)
- [Contact Form](https://devrajsinghtomar.com/contact)
- [Privacy Policy](https://devrajsinghtomar.com/privacy)
`;

const NOT_FOUND_MARKDOWN = `# 404 Not Found

The requested resource was not found on Devraj Singh Tomar's portfolio website.

Here are the key pages and machine-readable resources to navigate:
- [Homepage](https://devrajsinghtomar.com/)
- [LLMs Overview (llms.txt)](https://devrajsinghtomar.com/llms.txt)
- [XML Sitemap](https://devrajsinghtomar.com/sitemap.xml)
- [About Devraj](https://devrajsinghtomar.com/about)
- [Case Studies & Live Projects](https://devrajsinghtomar.com/case-studies)
- [Contact Details](https://devrajsinghtomar.com/contact)
`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptHeader = request.headers.get("accept") || "";
  const wantsMarkdown = acceptHeader.includes("text/markdown");

  // Handle Markdown content negotiation
  if (wantsMarkdown) {
    // If requesting static assets, next internal, or api, let next.js handle
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.includes(".") // e.g. logo.png, robots.txt, sitemap.xml
    ) {
      return NextResponse.next();
    }

    // Check if the requested route is known or a 404 probe
    const isKnown =
      KNOWN_ROUTES.has(pathname) ||
      pathname.startsWith("/blog/");

    if (!isKnown) {
      return new Response(NOT_FOUND_MARKDOWN, {
        status: 404,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Vary": "Accept",
          "Link": '</llms.txt>; rel="alternate"; type="text/markdown"',
          "Content-Signal": "search=yes, ai-train=yes",
        },
      });
    }

    // If requesting homepage or any other page in markdown
    const body = pathname === "/" ? HOMEPAGE_MARKDOWN : `# Devraj Singh Tomar — ${pathname.slice(1).replace(/-/g, " ").toUpperCase()}\n\nPlease refer to [llms.txt](https://devrajsinghtomar.com/llms.txt) for structured machine-readable guidance.\n\nCanonical URL: https://devrajsinghtomar.com${pathname}\nEmail: hello@devrajsinghtomar.com\nPhone: +91 9140946121\n\n${HOMEPAGE_MARKDOWN}`;

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "Accept",
        "Link": '</llms.txt>; rel="alternate"; type="text/markdown"',
        "Content-Signal": "search=yes, ai-train=yes",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }

  // Standard HTML request: pass through with required headers
  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  response.headers.set("Link", '</llms.txt>; rel="alternate"; type="text/markdown"');
  response.headers.set("Content-Signal", "search=yes, ai-train=yes");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
