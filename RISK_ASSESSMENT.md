# Risk Assessment & Mitigation Matrix: DevrajSinghTomar.com

**Assessment Date:** November 2026  
**Auditor:** Antigravity AI Assistant  
**Scope:** Architecture transformation from developer portfolio to Strategic Personal Brand Platform.

---

## 1. Risk Evaluation Matrix

| Risk ID | Category | Specific Risk Scenario | Severity | Probability | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TR-01** | **Technical** | Next.js 16 breaking changes with React 19 Server/Client boundaries causing hydration mismatches or compilation errors. | High | Medium | Build failure | Retain strict separation of Server Components (for metadata, layout, schema) and Client Components (for Framer Motion, interactivity). Test every build with `npm run build`. |
| **TR-02** | **Technical** | Linux/Docker Turbopack panic during CSS/PostCSS evaluation (`node process exited before we could connect to it with exit status: 0`). | High | High | Deployment failure | Preserve `"build": "next build --webpack"` in `package.json` and keep `experimental: { turbopackPluginRuntimeStrategy: "workerThreads" }` in `next.config.ts`. Verified 100% build reliability. |
| **SEO-01** | **SEO Equity** | Existing indexed URLs (`/case-studies`, `/services`, `/blog`, `/contact`) return 404 or lose Google ranking authority. | Critical | Low | Organic traffic collapse | **Never delete or break existing routes.** Retain all existing URLs as active pages or canonical compatibility views pointing to their strategic counterparts (`/work`, `/expertise`, `/insights`, `/connect`). |
| **SEO-02** | **SEO Equity** | Historical name variations (`Devraj Tomar`, `Devraj Singh`, `Devraj S Tomar`) lose authority signals. | High | Low | Brand confusion | Maintain all 301 redirects in `next.config.ts` and ensure Schema.org `Person.alternateName` array is always present in root layout. |
| **PERF-01**| **Performance**| Adding 12 sections on the homepage and 5 browser tools in Digital Lab inflates the initial JavaScript bundle, slowing down mobile LCP. | Medium | Medium | Reduced mobile Core Web Vitals | Lazy-load heavy browser utilities in `/digital-lab` using `dynamic(() => import(...), { ssr: false })`. Keep homepage visual components lightweight using CSS variables and SVG icons. |
| **PERF-02**| **Performance**| Unoptimized client photos causing layout shifts (CLS) or slow Largest Contentful Paint (LCP). | Medium | Low | Visual jitter | Use `next/image` with explicit dimensions, `sizes`, and WebP/AVIF formats configured in `next.config.ts`. Set `priority` only on the above-the-fold hero photo. |
| **SEC-01** | **Security** | Introduction of `/admin` route exposes sensitive project or lead data to unauthorized visitors. | Critical | Medium | Data breach | Implement robust server-side authentication using secure session tokens, HTTP-only cookies, and hashed passwords. Disallow `/admin/` in `robots.txt`. |
| **SEC-02** | **Security** | Public contact and estimator endpoints become targets for automated spam bots. | Medium | High | Inbox spam / database flooding | Implement honeypot form fields, rate-limiting in API routes, and strict Zod schema validation on all inputs before storage. |
| **DATA-01**| **Data Layer** | Absence of external MongoDB causes build failure or application crashes on platforms without database credentials. | High | Medium | Runtime crashes | Design the data access layer with a **graceful fallback architecture**: if no database URI is configured, the system seamlessly uses local type-safe file storage and seeds from existing static data arrays. |
| **ACC-01** | **Accessibility** | Custom cursor or high-contrast theme elements make the site inaccessible on mobile, touch, or screen-reader devices. | Medium | Low | Usability degradation | Ensure `CustomCursor` automatically disables on touch devices (`(hover: none) and (pointer: coarse)`). Preserve screen-reader-only (`sr-only`) semantic content and contrast compliance. |

---

## 2. Safest Implementation Sequence

To guarantee zero regressions and zero downtime on the live production server, execution must strictly follow this order:

1. **Gate 1: Audit Sign-Off (Current Stop Point)**
   - Do not touch or modify production code until user reviews and approves the Phase 1 audit deliverables.
2. **Gate 2: Non-Destructive Homepage Upgrade (Phase 2)**
   - Expand `HomeClient.tsx` into the modular 12-section layout without changing route paths or removing existing metadata. Verify `npm run build` succeeds cleanly.
3. **Gate 3: Additive Routing (Phases 3 & 4)**
   - Create `/work`, `/expertise`, `/insights`, `/digital-lab`, `/now`, and `/connect`. Keep `/case-studies`, `/services`, `/blog`, and `/contact` intact and linked.
4. **Gate 4: Zero-Dependency Data & Admin Layer (Phase 5)**
   - Introduce type-safe storage and API routes. Test form submissions and lead persistence locally.
5. **Gate 5: Interactive Features & Hardening (Phases 6 & 7)**
   - Deploy Ask Devraj, Estimator, and Digital Lab. Run comprehensive TypeScript type check and build verification.

---

## 3. Mandatory Rollback Plan

If any phase encounters an unexpected breaking error:
1. Every major phase will be isolated in a dedicated Git commit with descriptive semantic commit messages.
2. If a regression occurs, the codebase can be cleanly reverted using `git revert` or `git checkout` without loss of uncommitted work.
3. The build script (`next build --webpack`) and standalone output configuration must remain untouched throughout the process to guarantee deployability.
