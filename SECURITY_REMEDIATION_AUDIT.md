# Security Remediation Pre-Upgrade Audit

**Project:** [devrajsinghtomar.com](https://devrajsinghtomar.com/)  
**Current Framework Version:** Next.js `16.2.1`  
**Target Remediation Version:** Next.js `16.4.6`  
**Priority:** CRITICAL  
**Date:** November 2026  
**Auditor:** Antigravity AI Security Assistant  
**Status:** Audit Complete — Pre-Upgrade Verification Concluded  

---

## 1. Executive Environment & Dependency Baseline

### 1.1 Runtime & Package Manager
- **Node.js Version:** `v24.22.1`
- **Package Manager:** `npm` version `11.7.0`
- **Lockfile Format:** `package-lock.json` (Lockfile Version 3, 236 KB)
- **Host OS:** Windows (x64)

### 1.2 Direct Dependencies Audit (`package.json`)
```json
{
  "dependencies": {
    "framer-motion": "^12.38.0",
    "lucide-react": "^1.7.0",
    "mongodb": "^7.9.0",
    "next": "16.2.1",
    "next-themes": "^0.4.6",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "^9",
    "eslint-config-next": "16.2.1",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### 1.3 Framework & Architecture Inspection
| Architectural Facet | Current Configuration | Risk Assessment / Applicability |
| :--- | :--- | :--- |
| **Next.js Engine** | `16.2.1` (App Router) | **VULNERABLE** to 35+ reported CVE/GHSA advisories. |
| **React Runtime** | `19.2.4` (`react`, `react-dom`) | Compatible with `next@16.4.6` (satisfies `^19.0.0` peer requirement). |
| **ESLint Suite** | `eslint@9.39.4` + `eslint-config-next@16.2.1` | Must be upgraded to `16.4.6` in unison with `next`. |
| **TypeScript** | `5.9.3` (`typescript: ^5`) | Fully supported. |
| **App vs Pages Router** | 100% App Router (`src/app/`) | 0 Pages Router routes exist. App Router vulnerabilities apply; Pages Router i18n bypasses (`CVE-2026-44573`) do not apply to application code. |
| **Middleware / Proxy** | `src/proxy.ts` | Intercepts markdown content negotiation (`Accept: text/markdown`) and applies HTTP security headers (`nosniff`, `SAMEORIGIN`). Admin authorization is independently enforced in route handlers via `requireAdminAuth()` (defense-in-depth). |
| **Server Actions** | Zero `'use server'` directives | No Server Actions exist in the project; mutations execute via standard Route Handlers (`/api/*`). Server Action DoS/SSRF advisories affect framework engine only. |
| **Cache Components** | Zero `'use cache'` directives | Partial Prerendering and `use cache` functions are not enabled. `GHSA-673q-mjm6-r5xr` and `GHSA-vc7v-qv4w-wrv8` do not affect application code. |
| **OG Image Generation** | Zero `ImageResponse` / `next/og` imports | No dynamic OG image route handlers exist; `GHSA-vcvr-r3jv-pc5j` does not affect application code. |
| **Image Optimization** | `next.config.ts` specifies `formats: ["image/avif", "image/webp"]`. `remotePatterns` is NOT configured. Local SVGs allowed in CMS media upload. | **CRITICAL EXPOSURE:** AVIF image decoding (`GHSA-2xp9-vwfh-vxw4`) and SVG handling (`GHSA-2464-fhr4-w9xw`) in `next/image` are active and require framework upgrade. |
| **Custom Server** | Standard Next.js server (`next start` / Vercel standalone) | No custom HTTP server wrapper (`CVE-2026-64649` does not apply). |
| **Rewrites & Redirects** | 5 static redirects to `/` in `next.config.ts`. No dynamic rewrites. | No user-controlled parameters in destinations (`CVE-2026-64645` does not apply to application code). |
| **Build Configuration** | `next build --webpack` with `turbopackPluginRuntimeStrategy: "workerThreads"` | Prevents Turbopack IPC worker panics on Windows during static generation. |

---

## 2. Security Advisory Verification & Correlation Matrix

The official vulnerability report includes 36 distinct CVE and GHSA identifiers across Critical, High, Moderate, and Low tiers. Every identifier has been mapped to its official advisory details, affected version range, patched version, and actual application exposure:

### 2.1 Critical Severity Advisories (5 Total)

| Advisory / CVE ID | Official Title & Flaw Mechanism | Affected Range | Patched In | Project Exposure Analysis |
| :--- | :--- | :--- | :--- | :--- |
| **GHSA-673q-mjm6-r5xr** | Unauthenticated RCE in `use cache` functions returning typed arrays via deserialization corruption. | `>=16.0.0 <=16.4.0` | **16.4.1** | **Not Exposed:** Application does not use `'use cache'` or Cache Components. Framework patched. |
| **GHSA-2464-fhr4-w9xw**<br>*(CVE-2026-96889)* | Unauthenticated RCE in Image Optimization API when SVG files are processed via upstream `librsvg`/`sharp` memory corruption. | `>=16.0.0 <=16.4.0` | **16.4.1** | **HIGH EXPOSURE:** CMS allows SVG file uploads in `src/lib/cms/mediaStorage.ts`. Resolved by upgrading `next` and upstream `sharp 0.35.5`. |
| **GHSA-vcvr-r3jv-pc5j** | Remote Code Execution in `next/og` `ImageResponse` via malicious font/layout parsing. | `>=16.2.0 <16.3.6` | **16.3.6** | **Not Exposed:** Project does not use `@vercel/og` or `ImageResponse`. Framework patched. |
| **GHSA-2xp9-vwfh-vxw4** | Unauthenticated RCE in Image Optimization API when AVIF files are processed via `libheif` buffer overflow. | `>=16.0.0 <16.3.3` | **16.3.3** | **HIGH EXPOSURE:** `next.config.ts` explicitly enables AVIF format (`formats: ["image/avif", "image/webp"]`). Resolved by upgrading `next` to 16.4.6. |
| **CVE-2026-75604**<br>*(GHSA-p293-qw3h-jr36)* | Unauthenticated Remote Code Execution on Windows-hosted servers via path traversal using encoded backslashes. | `>=16.0.0 <16.3.3` | **16.3.3** | **CRITICAL EXPOSURE:** Host operating system is Windows. Resolved by upgrading `next` to 16.4.6. |

---

### 2.2 High Severity Advisories (13 Total)

| Advisory / CVE ID | Official Title & Flaw Mechanism | Affected Range | Patched In | Project Exposure Analysis |
| :--- | :--- | :--- | :--- | :--- |
| **CVE-2026-94482**<br>*(GHSA-p3m5-59mp-jv5r)* | Denial of Service in App Router using Server Actions via RSC Flight protocol parsing loop. | `>=16.0.0 <=16.4.0` | **16.4.1** | **Not Exposed:** Zero Server Actions used in codebase. Framework engine patched. |
| **CVE-2026-64649**<br>*(GHSA-89xv-2m56-2m9x)* | Server-Side Request Forgery in Server Actions on custom servers via manipulated `X-Forwarded-Host`. | `>=16.0.0 <16.2.11` | **16.2.11** | **Not Exposed:** No custom server or Server Actions used. Framework patched. |
| **CVE-2026-64645**<br>*(GHSA-p9j2-gv94-2wf4)* | SSRF in rewrites via attacker-controlled destination hostname parameter injection. | `>=16.0.0 <16.2.11` | **16.2.11** | **Not Exposed:** All redirects in `next.config.ts` target static string `"/"`. Framework patched. |
| **CVE-2026-64642**<br>*(GHSA-6gpp-xcg3-4w24)* | Middleware / Proxy bypass in App Router applications using Turbopack and single locale. | `>=16.0.0 <16.2.11` | **16.2.11** | **Mitigated in Code:** Production builds use Webpack (`next build --webpack`), and admin auth is verified in Route Handlers. Framework patched. |
| **CVE-2026-64641**<br>*(GHSA-m99w-x7hq-7vfj)* | Denial of Service in App Router using Server Actions via CPU exhaustion. | `>=16.0.0 <16.2.11` | **16.2.11** | **Not Exposed:** Zero Server Actions used. Framework engine patched. |
| **CVE-2026-45109**<br>*(GHSA-26hh-7cqf-hhc6)* | Middleware / Proxy bypass via segment-prefetch routes under Turbopack (Incomplete Fix Follow-Up). | `>=16.0.0 <16.2.6` | **16.2.6** | **Mitigated in Code:** Admin security does not depend on path-based proxy bypass. Framework patched. |
| **CVE-2026-44579**<br>*(GHSA-mg66-mrh9-m8jx)* | Denial of Service via connection exhaustion in applications using Cache Components. | `>=16.0.0 <16.2.5` | **16.2.5** | **Not Exposed:** Cache Components are not enabled. Framework patched. |
| **CVE-2026-44578**<br>*(GHSA-c4j6-fc7j-m34r)* | SSRF in applications using WebSocket upgrades via absolute URI request proxying. | `>=16.0.0 <16.2.5` | **16.2.5** | **Not Exposed:** Next.js WebSocket upgrade listeners are not implemented. Framework patched. |
| **CVE-2026-44575**<br>*(GHSA-267c-6grr-h53f)* | Middleware / Proxy bypass in App Router applications via segment-prefetch routes. | `>=16.0.0 <16.2.5` | **16.2.5** | **Mitigated in Code:** Defense-in-depth route handler checks prevent bypass. Framework patched. |
| **CVE-2026-44574**<br>*(GHSA-492v-c6pp-mqqv)* | Middleware / Proxy bypass through dynamic route parameter injection. | `>=16.0.0 <16.2.5` | **16.2.5** | **Mitigated in Code:** `src/proxy.ts` does not evaluate dynamic route segments for auth. Framework patched. |
| **CVE-2026-44573**<br>*(GHSA-36qx-fr4f-26g5)* | Middleware / Proxy bypass in Pages Router applications using i18n. | `>=16.0.0 <16.2.5` | **16.2.5** | **Not Exposed:** 0 Pages Router routes exist. Framework patched. |
| **GHSA-8h8q-6873-q5fj** | Denial of Service with Server Components via crafted payload recursion. | `>=16.0.0 <16.2.5` | **16.2.5** | **Framework Exposure:** Applies to App Router RSC rendering. Resolved by upgrading to 16.4.6. |
| **GHSA-q4gf-8mx6-v5v3** | Denial of Service with Server Components via stream starvation. | `>=16.0.0-beta.0 <16.2.3` | **16.2.3** | **Framework Exposure:** Applies to App Router RSC rendering. Resolved by upgrading to 16.4.6. |

---

### 2.3 Moderate Severity Advisories (14 Total)

| Advisory / CVE ID | Official Title & Flaw Mechanism | Affected Range | Patched In | Project Exposure Analysis |
| :--- | :--- | :--- | :--- | :--- |
| **CVE-2026-94543**<br>*(GHSA-4jqv-mc3x-m676)* | Cache poisoning of SSG and ISR pages in self-hosted Pages Router applications. | `>=16.0.0 <16.3.8` | **16.3.8** | **Not Exposed:** Pages Router is not used. Framework patched. |
| **CVE-2026-94486**<br>*(GHSA-39w2-rjm5-chcv)* | Information disclosure in development server Model Context Protocol (MCP) endpoint. | `>=16.0.0 <16.3.8` | **16.3.8** | **Local Dev Exposure:** Active during local development (`next dev`). Resolved by upgrading to 16.4.6. |
| **CVE-2026-94485**<br>*(GHSA-f87g-xv8r-7p7x)* | Information disclosure in metadata image routes via `dynamicParams` bypass. | `>=16.0.0 <16.3.8` | **16.3.8** | **Framework Exposure:** Static Webpack generation used in project. Resolved by upgrading to 16.4.6. |
| **CVE-2026-94484**<br>*(GHSA-mcj8-r9mp-w47p)* | Cache poisoning in SSG/ISR rendering with root catch-all routes leading to DoS. | `>=16.0.0 <16.3.8` | **16.3.8** | **Mitigated in Code:** Root catch-all is not used; `src/app/page.tsx` is static. Framework patched. |
| **CVE-2026-94483**<br>*(GHSA-cjq9-62q9-8jv4)* | Server-Side Request Forgery in Image Optimization API via DNS rebinding. | `>=16.0.0 <16.3.8` | **16.3.8** | **Mitigated in Code:** `remotePatterns` not configured; remote images not fetched. Framework patched. |
| **CVE-2026-64648**<br>*(GHSA-68g3-v927-f742)* | Cache confusion of response bodies for requests with bodies in server `fetch`. | `>=16.0.0 <16.2.11` | **16.2.11** | **Framework Exposure:** Applies to App Router fetch caching. Resolved by upgrading to 16.4.6. |
| **CVE-2026-64647**<br>*(GHSA-4633-3j49-mh5q)* | Cache confusion of response bodies containing invalid UTF-8 byte sequences. | `>=16.0.0 <16.2.11` | **16.2.11** | **Framework Exposure:** Applies to App Router fetch caching. Resolved by upgrading to 16.4.6. |
| **CVE-2026-64646**<br>*(GHSA-4c39-4ccg-62r3)* | Unbounded Server Action payload in Edge runtime leading to memory exhaustion. | `>=16.0.0 <16.2.11` | **16.2.11** | **Not Exposed:** Edge runtime and Server Actions are not used. Framework patched. |
| **CVE-2026-64644**<br>*(GHSA-q8wf-6r8g-63ch)* | Denial of Service in Image Optimization API using complex SVGs. | `>=16.0.0 <16.2.11` | **16.2.11** | **HIGH EXPOSURE:** SVGs permitted in media upload. Resolved by upgrading `next` and `sharp` to 0.35.5. |
| **CVE-2026-64643**<br>*(GHSA-955p-x3mx-jcvp)* | Unauthenticated disclosure of internal Server Function endpoints. | `>=16.0.0 <16.2.11` | **16.2.11** | **Not Exposed:** Server Functions / Server Actions not used. Framework patched. |
| **CVE-2026-44581**<br>*(GHSA-ffhc-5mcf-pf4q)* | Cross-site scripting in App Router applications using CSP nonces and shared caches. | `>=16.0.0 <16.2.5` | **16.2.5** | **Not Exposed:** CSP nonces are not dynamically reflected. Framework patched. |
| **CVE-2026-44580**<br>*(GHSA-gx5p-jg67-6x7h)* | Cross-site scripting in `beforeInteractive` scripts with untrusted input. | `>=16.0.0 <16.2.5` | **16.2.5** | **Not Exposed:** `next/script` with `beforeInteractive` is not used. Framework patched. |
| **CVE-2026-44577**<br>*(GHSA-h64f-5h5j-jqjh)* | Memory Denial of Service in Image Optimization API via unconstrained local fetches. | `>=16.0.0 <16.2.5` | **16.2.5** | **Framework Exposure:** Applies to `_next/image` handling. Resolved by upgrading to 16.4.6. |
| **CVE-2026-44576**<br>*(GHSA-wfc6-r584-vfw7)* | Cache poisoning in React Server Component responses behind unpartitioned shared caches. | `>=16.0.0 <16.2.5` | **16.2.5** | **Framework Exposure:** Applies to RSC response routing. Resolved by upgrading to 16.4.6. |

---

### 2.4 Low Severity Advisories (2 Total)

| Advisory / CVE ID | Official Title & Flaw Mechanism | Affected Range | Patched In | Project Exposure Analysis |
| :--- | :--- | :--- | :--- | :--- |
| **CVE-2026-44572**<br>*(GHSA-3g8h-86w9-wvmq)* | Next.js Middleware / Proxy redirects can be cache-poisoned. | `>=16.0.0 <16.2.5` | **16.2.5** | **Mitigated in Code:** Redirects in `next.config.ts` are static; `src/proxy.ts` does not redirect. Resolved by 16.4.6. |
| **CVE-2026-44582**<br>*(GHSA-vfv6-92ff-j949)* | Cache poisoning via collisions in React Server Component cache-busting. | `>=16.0.0 <16.2.5` | **16.2.5** | **Framework Exposure:** Applies to RSC cache-busting keys. Resolved by upgrading to 16.4.6. |

---

### 2.5 Companion Next.js 16.4.x Advisories Fixed in 16.4.6
- **GHSA-vc7v-qv4w-wrv8** (Moderate): Cache leak across root param values in nested `'use cache'` functions (Affected: `>=16.2.0 <=16.4.4`, Patched in: **16.4.5**).

---

## 3. Direct & Transitive Dependency Upgrade Plan

### 3.1 Direct Upgrades
- `next`: `16.2.1` $\longrightarrow$ `16.4.6`
- `eslint-config-next`: `16.2.1` $\longrightarrow$ `16.4.6`

### 3.2 Transitive Dependency Fixes Delivered by `next@16.4.6`
Running `npm install --dry-run next@16.4.6 eslint-config-next@16.4.6` confirmed the following automatic, safe dependency remediations:
- `sharp`: Upgraded from `0.34.5` to `0.35.5` (remediates `GHSA-f88m-g3jw-g9cj`, `GHSA-rgj7-g3m4-5g8c`, `GHSA-wq5f-xc86-pv6w` in `libvips`, `libheif`, and `librsvg`).
- `postcss`: Upgraded from `8.5.8` to `8.5.23` (remediates `GHSA-qx2v-qp2m-jg93`, `GHSA-6g55-p6wh-862q`, `GHSA-fxqj-rqcc-2cmp`, `GHSA-r28c-9q8g-f849`).
- `zod`: Upgraded from `4.3.6` to `4.6.7` (remediates `GHSA-mrhx-c7xc-m3w5` memory exhaustion).
- `@babel/core`: Upgraded from `7.29.0` to `7.29.13` (remediates `GHSA-4x5r-pxfx-6jf8`).
- `browserslist`: Upgraded from `4.28.1` to `4.29.6`.
- `baseline-browser-mapping`: Upgraded from `2.10.12` to `2.11.38`.
- `@next/swc-win32-x64-msvc`: Upgraded from `16.2.1` to `16.4.6`.
- `eslint-plugin-react-hooks`: Upgraded from `7.0.1` to `7.1.1`.

### 3.3 Compatibility Verification
- **React & React DOM:** `19.2.4` matches `next@16.4.6` peer dependency (`^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0`). Zero peer dependency conflict.
- **Tailwind CSS:** `@tailwindcss/postcss` and `tailwindcss` at `^4` operate smoothly with `postcss 8.5.23`.
- **Package Manager:** Preserves `package-lock.json` lockfile without deleting or regenerating. No `--force` or `--legacy-peer-deps` required.

---

## 4. Pre-Upgrade Audit Verdict

1. **Target Appropriateness:** `next@16.4.6` is an official stable release on npm that remediates every single CVE and GHSA in the vulnerability report.
2. **Peer Compatibility:** Confirmed 100% compatible with existing React 19.2.4 runtime and TypeScript 5.9.3.
3. **Zero Breaking Changes:** No API breaking changes exist between 16.2.1 and 16.4.6 within the project's utilized App Router surface.
4. **Action Authorized:** Ready to execute minimal safe upgrade `npm install next@16.4.6 eslint-config-next@16.4.6`.

---

*Pre-upgrade audit complete. Proceeding to Step 2: Safe Upgrade Execution.*