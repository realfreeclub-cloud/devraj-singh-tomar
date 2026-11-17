# Project Audit: DevrajSinghTomar.com

**Audit Date:** November 2026  
**Auditor:** Antigravity AI Assistant  
**Repository:** `https://github.com/realfreeclub-cloud/devraj-singh-tomar.git`  
**Current Branch:** `main`  
**Git Working Tree Status:** Clean (ahead of origin/main by 1 commit containing the latest case study updates)  
**Primary Brand Target:** Devraj Singh Tomar – Technology Strategist & Entrepreneur  
**Target Statement:** *"I turn business ideas into practical technology solutions and scalable digital products."*

---

## 1. Executive Technical Summary

DevrajSinghTomar.com is a production personal brand and professional portfolio website currently running on **Next.js 16.2.1** (App Router architecture) and **React 19.2.4**. The project is bootstrapped as a standalone Node.js web application utilizing **Tailwind CSS v4** for styling and **Framer Motion** for animations.

The website currently serves primarily as a digital portfolio and credibility anchor, showcasing 60+ delivered client projects, enterprise medical college portals, and social media marketing portfolios. It also features machine-readable AI agent endpoints (MCP protocol, WebMCP, `/llms.txt`, and markdown content negotiation via `proxy.ts`).

However, **there is currently no database, authentication system, or administrative CMS in place**. All dynamic content (blog posts, projects, ventures) is hardcoded as static TypeScript data arrays, and form submissions (such as contact inquiries) are client-side simulations.

---

## 2. Repository & Folder Structure

```
F:\Devraj\
├── .gitignore                      # Git ignore patterns (node_modules, .next, .env*, etc.)
├── AGENTS.md                       # Next.js 16 agent guidelines & deprecation rules
├── CLAUDE.md                       # Pointer to AGENTS.md
├── eslint.config.mjs               # ESLint 9 flat config with next/core-web-vitals
├── next-env.d.ts                   # Next.js TypeScript declarations
├── next.config.ts                  # Next.js platform configuration
├── package-lock.json               # Locked dependency tree (npm)
├── package.json                    # Project dependencies and npm scripts
├── postcss.config.mjs              # PostCSS configuration for Tailwind CSS v4
├── README.md                       # Standard Next.js starter documentation
├── tsconfig.json                   # TypeScript compiler configuration
├── tsconfig.tsbuildinfo            # Incremental TypeScript compilation cache
├── public/                         # Static assets served at root
│   ├── .well-known/
│   │   ├── mcp/
│   │   │   └── server-card.json    # MCP Server Card static declaration
│   │   └── mcp.json                # MCP protocol static declaration
│   ├── devraj-singh-tomar.jpg      # Desktop primary profile photo (1200x1600)
│   ├── devraj-singh-tomar-mobile.jpg # Mobile profile photo
│   ├── favicon.ico                 # Browser tab favicon
│   ├── llms-full.txt               # Full machine-readable context file
│   ├── llms.txt                    # Standard machine-readable summary
│   ├── logo-dark.png               # Brand logo for dark mode
│   ├── logo-light.png              # Brand logo for light mode
│   ├── og-image.png                # Social share Open Graph image (1200x630)
│   ├── profile-mobile.jpg          # Secondary mobile profile asset
│   ├── profile.jpg                 # Secondary desktop profile asset
│   └── robots.txt                  # Fallback static robots.txt
└── src/
    ├── proxy.ts                    # Request interceptor: Markdown negotiation & HTTP headers
    ├── app/
    │   ├── globals.css             # Tailwind v4 imports, CSS theme variables, custom scrollbars, cursor styles
    │   ├── icon.png                # App icon
    │   ├── layout.tsx              # Root HTML layout, Schema.org JSON-LD scripts, Nav/Cursor wrappers
    │   ├── page.tsx                # Homepage entry point with FAQ & Breadcrumb schemas
    │   ├── sitemap.ts              # Next.js dynamic XML sitemap generator
    │   ├── .well-known/
    │   │   ├── mcp.json/route.ts   # Route handler serving MCP server JSON
    │   │   └── mcp/server-card.json/route.ts # Route handler serving MCP Server Card
    │   ├── about/
    │   │   ├── AboutClient.tsx     # Client component: Biography, early roots in Kudri, milestones
    │   │   └── page.tsx            # About page metadata & entry
    │   ├── api/
    │   │   └── mcp/
    │   │       └── route.ts        # JSON-RPC MCP server endpoint (tools: get_portfolio_info, contact_devraj)
    │   ├── blog/
    │   │   ├── BlogClient.tsx      # Client component: Grid of blog articles
    │   │   ├── data.ts             # Hardcoded blog posts array (4 articles)
    │   │   ├── page.tsx            # Blog index page metadata & entry
    │   │   └── [slug]/
    │   │       ├── BlogPostClient.tsx # Client component: Single article reader
    │   │       └── page.tsx        # SSG dynamic route: generateStaticParams, metadata, BlogPosting JSON-LD
    │   ├── case-studies/
    │   │   └── page.tsx            # Case studies page metadata, FAQ schema, Breadcrumb schema
    │   ├── contact/
    │   │   ├── ContactClient.tsx   # Client component: Contact form, coordinates, social links
    │   │   └── page.tsx            # Contact page metadata & entry
    │   ├── hire/
    │   │   └── page.tsx            # Hire page metadata, FAQ schema, entry
    │   ├── image-sitemap.xml/
    │   │   └── route.ts            # Dynamic XML image sitemap for Google Image Search
    │   ├── llms.txt/
    │   │   └── route.ts            # Dynamic route serving public/llms.txt with headers
    │   ├── privacy/
    │   │   └── page.tsx            # Privacy policy document
    │   ├── robots.txt/
    │   │   └── route.ts            # Dynamic robots.txt route handler
    │   ├── services/
    │   │   └── page.tsx            # Services page metadata & entry
    │   └── ventures/
    │       ├── page.tsx            # Ventures page metadata & entry
    │       ├── VenturesClient.tsx  # Client component: 3 core venture cards
    │       ├── career-avsar/       # EMPTY directory (no files)
    │       └── [slug]/             # EMPTY directory (no files)
    └── components/
        ├── CaseStudiesClient.tsx   # 60+ live projects, Web/Social tabs, 3 deep architectural studies
        ├── CustomCursor.tsx        # Interactive mouse tracking cursor (dot + outline circle)
        ├── HireClient.tsx          # Direct engagement models, developer proposition, FAQs
        ├── HomeClient.tsx          # 1-screen viewport hero with polygon background & quick contact
        ├── Navbar.tsx              # Desktop vertical dock navigation + mobile bottom icon bar
        ├── ServicesClient.tsx      # 4 core engineering service pillars with conversion hooks
        └── WebMCPInitializer.tsx   # Client component registering WebMCP tools in window.navigator
```

---

## 3. Package Management & Dependencies

### Runtime Dependencies (`dependencies`)
| Package | Version in `package.json` | Actual Resolved Version | Purpose |
| :--- | :--- | :--- | :--- |
| `next` | `16.2.1` | `16.2.1` | Core React framework (App Router) |
| `react` | `19.2.4` | `19.2.4` | Core UI library |
| `react-dom` | `19.2.4` | `19.2.4` | React DOM renderer |
| `framer-motion` | `^12.38.0` | `12.38.0` | Animation engine for transitions and micro-interactions |
| `lucide-react` | `^1.7.0` | `1.7.0` | SVG Icon system across all pages |
| `next-themes` | `^0.4.6` | `0.4.6` | Theme management (dark/light mode) |

### Development Dependencies (`devDependencies`)
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `@tailwindcss/postcss` | `^4` | PostCSS plugin for Tailwind CSS v4 |
| `tailwindcss` | `^4` | Utility-first CSS framework |
| `typescript` | `^5` | TypeScript type checker and compiler |
| `@types/node` | `^20` | TypeScript definitions for Node.js |
| `@types/react` | `^19` | TypeScript definitions for React 19 |
| `@types/react-dom` | `^19` | TypeScript definitions for React DOM 19 |
| `eslint` | `^9` | JavaScript and TypeScript linter |
| `eslint-config-next` | `16.2.1` | Next.js core web vitals and TypeScript ESLint rules |
| `babel-plugin-react-compiler` | `1.0.0` | Experimental React Compiler Babel plugin |

### Critical Missing Dependencies (Identified)
- **Database Client:** No MongoDB client (`mongodb`, `mongoose`), Prisma, Drizzle, or SQLite package installed.
- **Form & Schema Validation:** No `zod`, `yup`, or form validation libraries installed.
- **Authentication:** No `next-auth`, `authjs`, `jose`, `bcrypt`, or session management library installed.
- **Email / Notifications:** No `nodemailer`, `resend`, or `@sendgrid/mail` installed for handling actual contact inquiries.

---

## 4. TypeScript & Bundler Configuration

### `tsconfig.json`
- **Target:** `ES2017`
- **Module Resolution:** `bundler` (ideal for Next.js App Router)
- **Strict Mode:** `true` (enforces rigorous type checking)
- **Path Aliases:** `"@/*": ["./src/*"]`
- **JSX:** `react-jsx`

### `next.config.ts`
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    turbopackPluginRuntimeStrategy: "workerThreads",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 1080, 1200, 1920],
  },
  async headers() { ... },
  async redirects() { ... }
};
```
- **Output:** `"standalone"` is enabled, which prepares a self-contained bundle with minimal node_modules footprint for Docker or VPS deployment.
- **Build Mode:** Script in `package.json` is configured as `"build": "next build --webpack"`. This bypasses Turbopack's detached child-process PostCSS runner on Linux hosting platforms, ensuring rock-solid builds without panics.
- **Redirects:** 301 redirects are configured for historical name variants:
  - `/devraj` -> `/`
  - `/devraj-tomar` -> `/`
  - `/devraj-singh` -> `/`
  - `/devraj-s-tomar` -> `/`
  - `/devraj-singh-tomar` -> `/`
- **Headers:** Injects `Content-Signal: search=yes, ai-train=yes`, `Vary: Accept`, and `Link: </llms.txt>; rel="alternate"` across all requests.

---

## 5. Environment Variables & Security

- **Current Environment Files:** There are **zero `.env` or `.env.local` files** in the repository.
- **Current Secrets Status:** No secrets or private keys are committed in Git.
- **Hardcoded Public Data:**
  - Phone: `+91 9140946121`
  - Email: `hello@devrajsinghtomar.com`
  - Address: `chokhani square, 309, Sector 18, Noida, Uttar Pradesh 201301, India`
  - Site URL: `https://devrajsinghtomar.com`
  - Webmaster verification tokens (Google: `2TejsEGEIMCMujPsmIig8u9EJprgmvEj4HnyOWxrfL8`, Bing: `DBAEEA6F8A09FC7F37DA3E9B725FAF9F`) are embedded in `layout.tsx`.

---

## 6. Deployment Configuration

- **Current Target:** Self-hosted Linux VPS / Hostinger Cloud / Vercel compatible.
- **Standalone Build:** Next.js copies necessary static files and creates `.next/standalone/server.js`.
- **Node Requirement:** Node.js v18.17+ or v20+ recommended (React 19 peer requirement).
- **Process Management:** Executed via standard Node runtime or PM2 (`node server.js` from standalone).
