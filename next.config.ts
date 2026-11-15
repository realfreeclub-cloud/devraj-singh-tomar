import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 1080, 1200, 1920],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value: '</llms.txt>; rel="alternate"; type="text/markdown"',
          },
          {
            key: "Vary",
            value: "Accept",
          },
          {
            key: "Content-Signal",
            value: "search=yes, ai-train=yes",
          },
        ],
      },
    ];
  },

  // ── Requirement 4: 301 redirects for name variation URLs ──
  // These pass SEO signals to the canonical homepage
  async redirects() {
    return [
      {
        source: "/devraj",
        destination: "/",
        permanent: true, // 301
      },
      {
        source: "/devraj-tomar",
        destination: "/",
        permanent: true,
      },
      {
        source: "/devraj-singh",
        destination: "/",
        permanent: true,
      },
      {
        source: "/devraj-s-tomar",
        destination: "/",
        permanent: true,
      },
      {
        source: "/devraj-singh-tomar",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
