# Route & Page Inventory: DevrajSinghTomar.com

**Inventory Date:** November 2026  
**Auditor:** Antigravity AI Assistant  
**Framework:** Next.js 16.2.1 App Router

---

## 1. Complete Active Route Catalog

| Route Path | File Location | Render Type | Metadata Defined | Structured Data Schema | Layout & Components |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`/`** | `src/app/page.tsx` | Static (○) | Yes (Title, Description, Canonical) | `FAQPage`, `BreadcrumbList`, (Root: `Person`, `WebSite`, `ImageObject`, `Organization`) | Root Layout -> `HomeClient.tsx` |
| **`/about`** | `src/app/about/page.tsx` | Static (○) | Yes (Title, Description, Canonical) | Inherited from Root Layout | Root Layout -> `AboutClient.tsx` |
| **`/services`** | `src/app/services/page.tsx` | Static (○) | Yes (Title, Description, Canonical) | `BreadcrumbList` | Root Layout -> `ServicesClient.tsx` |
| **`/case-studies`** | `src/app/case-studies/page.tsx` | Static (○) | Yes (Title, Description, Canonical) | `FAQPage`, `BreadcrumbList` | Root Layout -> `CaseStudiesClient.tsx` |
| **`/ventures`** | `src/app/ventures/page.tsx` | Static (○) | Yes (Title, Description, Canonical) | Inherited from Root Layout | Root Layout -> `VenturesClient.tsx` |
| **`/hire`** | `src/app/hire/page.tsx` | Static (○) | Yes (Title, Description, Canonical) | `FAQPage`, `BreadcrumbList` | Root Layout -> `HireClient.tsx` |
| **`/contact`** | `src/app/contact/page.tsx` | Static (○) | Yes (Title, Description, Canonical) | Inherited from Root Layout | Root Layout -> `ContactClient.tsx` |
| **`/privacy`** | `src/app/privacy/page.tsx` | Static (○) | Yes (Title, Description, Canonical) | Inherited from Root Layout | Root Layout -> Static JSX |
| **`/blog`** | `src/app/blog/page.tsx` | Static (○) | Yes (Title, Description, Canonical) | Inherited from Root Layout | Root Layout -> `BlogClient.tsx` |
| **`/blog/[slug]`** | `src/app/blog/[slug]/page.tsx` | SSG (●) via `generateStaticParams` | Yes (Dynamic Title, OpenGraph, Canonical) | `BlogPosting` JSON-LD | Root Layout -> `BlogPostClient.tsx` |
| **`/api/mcp`** | `src/app/api/mcp/route.ts` | Dynamic API (ƒ) | N/A (JSON-RPC) | N/A | Standalone Route Handler (POST, GET) |
| **`/.well-known/mcp.json`** | `src/app/.well-known/mcp.json/route.ts` | Dynamic Route (ƒ) | N/A (JSON) | N/A | Standalone Route Handler (GET) |
| **`/.well-known/mcp/server-card.json`** | `src/app/.well-known/mcp/server-card.json/route.ts` | Dynamic Route (ƒ) | N/A (JSON) | N/A | Standalone Route Handler (GET) |
| **`/sitemap.xml`** | `src/app/sitemap.ts` | Static (○) | N/A (XML) | N/A | MetadataRoute.Sitemap generator |
| **`/image-sitemap.xml`** | `src/app/image-sitemap.xml/route.ts` | Dynamic Route (ƒ) | N/A (XML) | N/A | Standalone Route Handler (GET) |
| **`/robots.txt`** | `src/app/robots.txt/route.ts` | Dynamic Route (ƒ) | N/A (Text) | N/A | Standalone Route Handler (GET) |
| **`/llms.txt`** | `src/app/llms.txt/route.ts` | Dynamic Route (ƒ) | N/A (Markdown) | N/A | Standalone Route Handler (GET) |

---

## 2. Inferred Legacy Redirects (in `next.config.ts`)

| Incoming Path | Target Destination | Redirect Type | Purpose |
| :--- | :--- | :--- | :--- |
| `/devraj` | `/` | 301 Permanent | Historical short brand link consolidation |
| `/devraj-tomar` | `/` | 301 Permanent | Name variation authority signal preservation |
| `/devraj-singh` | `/` | 301 Permanent | Name variation authority signal preservation |
| `/devraj-s-tomar` | `/` | 301 Permanent | Name variation authority signal preservation |
| `/devraj-singh-tomar` | `/` | 301 Permanent | Name variation authority signal preservation |

---

## 3. Analysis of Layouts, Components & Inconsistencies

### 3.1 Layout Discrepancies
1. **Homepage vs. Other Pages:**
   - The **Homepage (`HomeClient.tsx`)** is designed as a single-screen, viewport-height locked hero (`h-screen overflow-hidden`) with a decorative yellow polygon element on desktop.
   - All other pages (`/about`, `/case-studies`, `/services`, `/ventures`, `/hire`, `/contact`, `/blog`) are standard multi-screen, long-scroll documents with `pt-32 pb-16 min-h-screen px-6 lg:px-16 container-custom mx-auto max-w-6xl`.
   - **Required Fix:** Expand the homepage into a rich, full-length 12-section editorial document while preserving the hero's visual punch.

2. **Navigation Docks (`Navbar.tsx`):**
   - On desktop (`lg:flex`), navigation is anchored on the **far right edge** as a vertical floating dock (`w-24 fixed right-0 top-0 h-screen`).
   - On mobile (`lg:hidden`), navigation is anchored on the **bottom** (`fixed bottom-0 left-0 w-full bg-[#222222]`).
   - The main content area in `src/app/layout.tsx` compensates for this by applying `lg:pr-[100px]`, which creates asymmetrical spacing if not carefully accounted for in full-width bento grids.
   - **Current Navigation Items:** Home (`/`), About (`/about`), Ventures (`/ventures`), Services (`/services`), Case Studies (`/case-studies`), Hire Me (`/hire`), Blog (`/blog`), Contact (`/contact`).
   - **Missing Navigation Items:** Does not include `/work`, `/expertise`, `/insights`, `/digital-lab`, `/now`, `/connect`, or `/admin`.

3. **Orphan & Incomplete Directories:**
   - `src/app/ventures/career-avsar/` has no `page.tsx` or files inside.
   - `src/app/ventures/[slug]/` has no `page.tsx` or files inside.
   - Visiting `/ventures/career-avsar` or `/ventures/anything` produces a Next.js `404 Not Found` because the directories exist but contain no route segments.

4. **Duplicate & Overlapping Concepts:**
   - `/case-studies` and `/hire` both present developer skills, trust badges, and project metrics, but with different layouts.
   - `/services` and `/hire` have overlapping value propositions (Next.js engineering, technical SEO, IT project management).
   - `/contact` and `/hire` both funnel into the same simulated contact form.

---

## 4. Planned Route Architecture & Mapping

To fulfill the requirements of the strategic personal brand platform while maintaining 100% backward compatibility:

| New Primary Route | Replaces / Extends | Status | Backward Compatibility Strategy |
| :--- | :--- | :--- | :--- |
| **`/`** | Existing `/` | Enhance | Transform single-screen hero into full 12-section editorial page. |
| **`/about`** | Existing `/about` | Enhance | Integrate strategic timeline, verified achievements, and methodology. |
| **`/work`** | `/case-studies` | New | Implement Project Explorer with search and multi-filtering. |
| **`/work/[slug]`** | Case study details | New | Implement deep case study pages (`ngitedu.com`, `divyajap.com`, `lexinklegal.in`, etc.). |
| **`/case-studies`** | Existing `/case-studies` | Preserved | Keep active with canonical link pointing to `/work` or render compatibility view. |
| **`/expertise`** | `/services` | New | High-level technology strategy, enterprise architecture, and consulting pillars. |
| **`/services`** | Existing `/services` | Preserved | Keep active with canonical link pointing to `/expertise` or render compatibility view. |
| **`/ventures`** | Existing `/ventures` | Enhance | Upgrade 3 core ventures with metrics, equity roles, and tech stacks. |
| **`/insights`** | `/blog` | New | Premium editorial essays, tech strategy, and scaling playbooks. |
| **`/insights/[slug]`** | `/blog/[slug]` | New | Detailed article layout with table of contents and reading progress. |
| **`/blog` & `/blog/[slug]`** | Existing `/blog` | Preserved | Keep active with 301 redirects or canonical links to `/insights`. |
| **`/digital-lab`** | None | New | 5 browser-based interactive tools (QR, Palette, JSON, Meta Tags, Roadmap). |
| **`/now`** | None | New | Public development log, active sprints, and experiments. |
| **`/connect`** | `/contact` | New | Multi-channel communication hub, meeting requests, and direct inquiry forms. |
| **`/contact`** | Existing `/contact` | Preserved | Keep active with canonical link pointing to `/connect` or render compatibility view. |
| **`/hire`** | Existing `/hire` | Preserved | Keep active as dedicated high-ticket engagement page. |
| **`/admin` & sub-routes**| None | New | Authenticated CMS dashboard for Projects, Articles, Leads, Meetings, and Settings. |
