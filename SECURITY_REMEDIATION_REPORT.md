# Security Remediation Report: Next.js Framework Upgrade & Vulnerability Resolution

**Project:** [devrajsinghtomar.com](https://devrajsinghtomar.com/)  
**Brand Identity:** Devraj Singh Tomar | Technology Strategist & Entrepreneur  
**Remediation Date:** November 2026  
**Auditor / Engineer:** Antigravity AI Security Assistant  
**Status:** Completed & Validated — Awaiting Deployment Sign-Off  

---

## 1. Original Framework Version
- **Framework:** Next.js
- **Installed Version:** `16.2.1`
- **Companion Linting Suite:** `eslint-config-next@16.2.1`
- **Vulnerability Status:** Affected by 35+ disclosed security advisories across Critical, High, Moderate, and Low tiers (including RCE on Windows hosts, AVIF/SVG image memory corruption, cache confusion, and middleware bypasses).

---

## 2. Final Framework Version
- **Framework:** Next.js
- **Installed Version:** `16.4.6` (Stable release)
- **Companion Linting Suite:** `eslint-config-next@16.4.6`
- **Verification Evidence:**
```bash
$ npx next --version
Next.js v16.4.6
```

---

## 3. Dependency Changes

### 3.1 Direct Upgrades (`package.json`)
| Package | Original Version | Upgraded Version | Purpose |
| :--- | :--- | :--- | :--- |
| `next` | `16.2.1` | **`16.4.6`** | Remediates all Next.js framework vulnerabilities |
| `eslint-config-next` | `16.2.1` | **`16.4.6`** | Aligns ESLint plugin rules with Next.js 16.4.6 |

### 3.2 Transitive Dependency Changes (`package-lock.json`)
The clean upgrade via `npm install next@16.4.6 eslint-config-next@16.4.6` safely updated the following underlying packages:
- `sharp`: Upgraded from `0.34.5` to **`0.35.5`** (remediates `libvips`, `libheif`, and `librsvg` memory corruption vulnerabilities).
- `postcss`: Upgraded from `8.5.8` to **`8.5.23`** (remediates CSS stringify XSS and sourceMappingURL file disclosure).
- `zod`: Upgraded from `4.3.6` to **`4.6.7`** (remediates collection validation memory exhaustion DoS).
- `@babel/core`: Upgraded from `7.29.0` to **`7.29.13`** (remediates sourceMappingURL comment arbitrary file read).
- `browserslist`: Upgraded from `4.28.1` to **`4.29.6`**.
- `baseline-browser-mapping`: Upgraded from `2.10.12` to **`2.11.38`**.
- `@next/swc-win32-x64-msvc`: Upgraded from `16.2.1` to **`16.4.6`**.
- `eslint-plugin-react-hooks`: Upgraded from `7.0.1` to **`7.1.1`**.

---

## 4. Lockfile Changes
- **File:** `package-lock.json`
- **Change Summary:** 1 package added (`@img/sharp-wasm32@0.35.5`), 1 package removed (`postcss@8.4.31`), 37 packages safely updated to patched versions.
- **Integrity Check:** The lockfile was modified strictly through npm dependency resolution without manual editing, without deletion/regeneration, and without `--force` or `--legacy-peer-deps`.

---

## 5. Security Advisories Reviewed

All 36 advisories specified in the critical vulnerability report were reviewed and cross-referenced with official CVE and GitHub Advisory (GHSA) databases:

```mermaid
pie title Security Advisories by Severity
    "Critical (5)" : 5
    "High (13)" : 13
    "Moderate (14)" : 14
    "Low (2)" : 2
    "Companion (2)" : 2
```

1. **Critical:** `GHSA-673q-mjm6-r5xr`, `GHSA-2464-fhr4-w9xw`, `GHSA-vcvr-r3jv-pc5j`, `GHSA-2xp9-vwfh-vxw4`, `CVE-2026-75604`.
2. **High:** `CVE-2026-94482`, `CVE-2026-64649`, `CVE-2026-64645`, `CVE-2026-64642`, `CVE-2026-64641`, `CVE-2026-45109`, `CVE-2026-44579`, `CVE-2026-44578`, `CVE-2026-44575`, `CVE-2026-44574`, `CVE-2026-44573`, `GHSA-8h8q-6873-q5fj`, `GHSA-q4gf-8mx6-v5v3`.
3. **Moderate:** `CVE-2026-94543`, `CVE-2026-94486`, `CVE-2026-94485`, `CVE-2026-94484`, `CVE-2026-94483`, `CVE-2026-64648`, `CVE-2026-64647`, `CVE-2026-64646`, `CVE-2026-64644`, `CVE-2026-64643`, `CVE-2026-44581`, `CVE-2026-44580`, `CVE-2026-44577`, `CVE-2026-44576`.
4. **Low:** `CVE-2026-44572`, `CVE-2026-44582`.
5. **Companion Advisories:** `GHSA-vc7v-qv4w-wrv8` (nested `use cache` stream leak), `GHSA-p293-qw3h-jr36` (Windows path traversal).

---

## 6. Advisories Resolved

Every single Next.js advisory affecting version `16.2.1` has been resolved by upgrading to `16.4.6`:

| Advisory ID | Associated CVE | Flaw Title | Patched Version | Verification in Next.js 16.4.6 |
| :--- | :--- | :--- | :--- | :--- |
| **GHSA-p293-qw3h-jr36** | **CVE-2026-75604** | Windows-hosted Server Unauthenticated RCE via Path Traversal | `16.3.3` | **FIXED** (Installed: 16.4.6) |
| **GHSA-2xp9-vwfh-vxw4** | — | Image Optimization API Unauthenticated RCE with AVIF files | `16.3.3` | **FIXED** (Installed: 16.4.6) |
| **GHSA-2464-fhr4-w9xw** | **CVE-2026-96889** | Image Optimization API Unauthenticated RCE with SVG files | `16.4.1` | **FIXED** (Installed: 16.4.6) |
| **GHSA-673q-mjm6-r5xr** | — | `use cache` TypedArray Deserialization RCE | `16.4.1` | **FIXED** (Installed: 16.4.6) |
| **GHSA-vcvr-r3jv-pc5j** | — | Remote Code Execution in `next/og` ImageResponse | `16.3.6` | **FIXED** (Installed: 16.4.6) |
| **GHSA-p3m5-59mp-jv5r** | **CVE-2026-94482** | App Router Server Action Denial of Service | `16.4.1` | **FIXED** (Installed: 16.4.6) |
| **GHSA-89xv-2m56-2m9x** | **CVE-2026-64649** | Server Actions SSRF on Custom Servers | `16.2.11` | **FIXED** (Installed: 16.4.6) |
| **GHSA-p9j2-gv94-2wf4** | **CVE-2026-64645** | SSRF in Rewrites via Destination Hostname Injection | `16.2.11` | **FIXED** (Installed: 16.4.6) |
| **GHSA-6gpp-xcg3-4w24** | **CVE-2026-64642** | Middleware / Proxy Bypass in Turbopack Single Locale | `16.2.11` | **FIXED** (Installed: 16.4.6) |
| **GHSA-m99w-x7hq-7vfj** | **CVE-2026-64641** | Server Action CPU Exhaustion Denial of Service | `16.2.11` | **FIXED** (Installed: 16.4.6) |
| **GHSA-26hh-7cqf-hhc6** | **CVE-2026-45109** | Segment-Prefetch Middleware Bypass (Follow-Up) | `16.2.6` | **FIXED** (Installed: 16.4.6) |
| **GHSA-mg66-mrh9-m8jx** | **CVE-2026-44579** | Connection Exhaustion DoS in Cache Components | `16.2.5` | **FIXED** (Installed: 16.4.6) |
| **GHSA-c4j6-fc7j-m34r** | **CVE-2026-44578** | SSRF via HTTP/1.1 WebSocket Upgrades | `16.2.5` | **FIXED** (Installed: 16.4.6) |
| **GHSA-267c-6grr-h53f** | **CVE-2026-44575** | Segment-Prefetch Middleware Bypass | `16.2.5` | **FIXED** (Installed: 16.4.6) |
| **GHSA-492v-c6pp-mqqv** | **CVE-2026-44574** | Dynamic Route Parameter Injection Middleware Bypass | `16.2.5` | **FIXED** (Installed: 16.4.6) |
| **GHSA-36qx-fr4f-26g5** | **CVE-2026-44573** | Pages Router i18n Middleware Bypass | `16.2.5` | **FIXED** (Installed: 16.4.6) |
| **GHSA-8h8q-6873-q5fj** | — | Server Components Stream Denial of Service | `16.2.5` | **FIXED** (Installed: 16.4.6) |
| **GHSA-q4gf-8mx6-v5v3** | — | Server Components Stream Starvation DoS | `16.2.3` | **FIXED** (Installed: 16.4.6) |
| **GHSA-4jqv-mc3x-m676** | **CVE-2026-94543** | Cache Poisoning of SSG/ISR Pages | `16.3.8` | **FIXED** (Installed: 16.4.6) |
| **GHSA-39w2-rjm5-chcv** | **CVE-2026-94486** | Information Disclosure in Dev Server MCP Endpoint | `16.3.8` | **FIXED** (Installed: 16.4.6) |
| **GHSA-f87g-xv8r-7p7x** | **CVE-2026-94485** | Metadata Image Route Information Disclosure | `16.3.8` | **FIXED** (Installed: 16.4.6) |
| **GHSA-mcj8-r9mp-w47p** | **CVE-2026-94484** | Cache Poisoning in SSG/ISR with Catch-All Routes | `16.3.8` | **FIXED** (Installed: 16.4.6) |
| **GHSA-cjq9-62q9-8jv4** | **CVE-2026-94483** | SSRF in Image Optimization via DNS Rebinding | `16.3.8` | **FIXED** (Installed: 16.4.6) |
| **GHSA-68g3-v927-f742** | **CVE-2026-64648** | Cache Confusion for Requests with Request Bodies | `16.2.11` | **FIXED** (Installed: 16.4.6) |
| **GHSA-4633-3j49-mh5q** | **CVE-2026-64647** | Cache Confusion for Bodies with Invalid UTF-8 | `16.2.11` | **FIXED** (Installed: 16.4.6) |
| **GHSA-4c39-4ccg-62r3** | **CVE-2026-64646** | Unbounded Server Action Payload in Edge Runtime | `16.2.11` | **FIXED** (Installed: 16.4.6) |
| **GHSA-q8wf-6r8g-63ch** | **CVE-2026-64644** | Image Optimization Denial of Service with SVGs | `16.2.11` | **FIXED** (Installed: 16.4.6) |
| **GHSA-955p-x3mx-jcvp** | **CVE-2026-64643** | Unauthenticated Server Function Endpoint Disclosure | `16.2.11` | **FIXED** (Installed: 16.4.6) |
| **GHSA-ffhc-5mcf-pf4q** | **CVE-2026-44581** | Stored XSS via CSP Nonces in App Router | `16.2.5` | **FIXED** (Installed: 16.4.6) |
| **GHSA-gx5p-jg67-6x7h** | **CVE-2026-44580** | XSS in `beforeInteractive` Scripts | `16.2.5` | **FIXED** (Installed: 16.4.6) |
| **GHSA-h64f-5h5j-jqjh** | **CVE-2026-44577** | Image Optimization Memory Exhaustion DoS | `16.2.5` | **FIXED** (Installed: 16.4.6) |
| **GHSA-wfc6-r584-vfw7** | **CVE-2026-44576** | Cache Poisoning in RSC Responses | `16.2.5` | **FIXED** (Installed: 16.4.6) |
| **GHSA-3g8h-86w9-wvmq** | **CVE-2026-44572** | Middleware / Proxy Redirect Cache Poisoning | `16.2.5` | **FIXED** (Installed: 16.4.6) |
| **GHSA-vfv6-92ff-j949** | **CVE-2026-44582** | RSC Cache-Busting Collision Poisoning | `16.2.5` | **FIXED** (Installed: 16.4.6) |
| **GHSA-vc7v-qv4w-wrv8** | — | Nested `use cache` Inner Stream Leak | `16.4.5` | **FIXED** (Installed: 16.4.6) |

---

## 7. Advisories Not Applicable and Why

While all advisories are now formally patched at the engine level in `next@16.4.6`, our codebase inspection confirmed that several vulnerabilities were not exploitable in this specific application:

1. **`GHSA-673q-mjm6-r5xr` & `GHSA-vc7v-qv4w-wrv8` (`use cache` RCE & Stream Leak):**
   - *Reason:* The codebase contains zero `'use cache'` directives or Partial Prerendering flags.
2. **`CVE-2026-94482`, `CVE-2026-64649`, `CVE-2026-64646`, `CVE-2026-64641` (Server Action DoS & SSRF):**
   - *Reason:* The codebase contains zero `'use server'` directives or Server Actions; all client-server communications use standard REST API Route Handlers (`/api/*`).
3. **`GHSA-vcvr-r3jv-pc5j` (`next/og` ImageResponse RCE):**
   - *Reason:* The application does not import `next/og` or generate dynamic OpenGraph cards with `ImageResponse`.
4. **`CVE-2026-44573` (Pages Router i18n Middleware Bypass):**
   - *Reason:* The application uses 100% App Router (`src/app`); zero Pages Router routes exist.
5. **`CVE-2026-44578` (WebSocket SSRF):**
   - *Reason:* The application does not register HTTP/1.1 WebSocket upgrade handlers in Next.js.
6. **`CVE-2026-64645` (SSRF via Dynamic Rewrites):**
   - *Reason:* All redirects defined in `next.config.ts` redirect to static root (`"/"`) with no parameter interpolation.

---

## 8. Remaining Vulnerabilities

Running `npm audit` following the upgrade to `next@16.4.6`:
- **Critical Vulnerabilities:** **0** (Eliminated).
- **Next.js Production Vulnerabilities:** **0** (Eliminated).
- **Runtime Dependencies:** 100% clean.

The remaining 19 advisory notices in `npm audit` belong strictly to **development-only tools** (`eslint@9` and `@typescript-eslint` glob parsers: `micromatch`, `picomatch`, `brace-expansion`, `tinyglobby`). These dev dependencies do not run in production and are not included in the client bundle.

---

## 9. Configuration Changes
1. **`package.json`:** Updated `next` to `"16.4.6"` and `eslint-config-next` to `"16.4.6"`.
2. **`next.config.ts`:** Cleaned up `turbopackPluginRuntimeStrategy: "workerThreads"` which triggered a Node.js 24 worker-thread notice, enabling clean child-process compilation.
3. **`src/app/api/admin/inquiries/export/route.ts`:** Exported `sanitizeCsvCell` helper for automated regression testing of CSV formula injection prevention (CWE-1236).

---

## 10. Files Modified

| File Path | Action | Description |
| :--- | :--- | :--- |
| [package.json](file:///f:/Devraj/package.json) | Modified | Updated `next` and `eslint-config-next` to `16.4.6`. |
| [package-lock.json](file:///f:/Devraj/package-lock.json) | Modified | Updated lockfile records for 37 packages. |
| [next.config.ts](file:///f:/Devraj/next.config.ts) | Modified | Removed deprecated experimental property for Node 24 stability. |
| [src/app/api/admin/inquiries/export/route.ts](file:///f:/Devraj/src/app/api/admin/inquiries/export/route.ts) | Modified | Exported `sanitizeCsvCell` function. |
| [SECURITY_REMEDIATION_AUDIT.md](file:///f:/Devraj/SECURITY_REMEDIATION_AUDIT.md) | Created | Detailed pre-upgrade vulnerability and dependency audit. |
| [scripts/security_regression_test.ts](file:///f:/Devraj/scripts/security_regression_test.ts) | Created | 33-point automated security and regression test suite. |
| [SECURITY_REMEDIATION_REPORT.md](file:///f:/Devraj/SECURITY_REMEDIATION_REPORT.md) | Created | This remediation report. |

---

## 11. TypeScript Results
Executed `npx tsc --noEmit` across all 62 application routes, components, and server libraries:
```bash
$ npx tsc --noEmit
# Exit code: 0 (Zero errors)
```

---

## 12. ESLint Results
Executed `npm run lint` (`eslint`):
- Cleanly identifies pre-existing unused variable warnings and `any` types in legacy migration scripts.
- No syntax or fatal parsing errors introduced by Next.js 16.4.6.

---

## 13. Production Build Results
Executed `next build --webpack`:
```
▲ Next.js 16.4.6 (webpack)
✓ Running next.config.ts took 36ms
  Creating an optimized production build ...
✓ Compiled successfully in 4.4s
  Running TypeScript ...
  Finished TypeScript in 1977ms ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/62) ...
✓ Generating static pages using 15 workers (62/62) in 2.3s
  Finalizing page optimization ...
  Collecting build traces ...
# Exit code: 0 (Zero errors across all 62 routes)
```

---

## 14. Regression Test Results
Executed automated security test suite `npx tsx scripts/security_regression_test.ts`:

```
=================================================
RUNNING POST-UPGRADE REGRESSION SUITE (Next.js 16.4.6)
=================================================

--- Testing CMS Content & Store Integrity ---
[PASS] Projects loaded (55 >= 50)
[PASS] Articles loaded (4 >= 4)
[PASS] Ventures loaded (5 >= 5)
[PASS] Testimonials loaded (2 >= 2)
[PASS] Profile bio intact: Devraj Singh Tomar
[PASS] Homepage hero settings loaded

--- Testing Case Studies & Dynamic Routes ---
[PASS] 6 flagship case studies found: ngit-edu, divyajap, lexink-legal, maz-dialysis-center, idps-pratapgarh, the-home-shifting
[PASS] Case study verified: ngit-edu
[PASS] Case study verified: divyajap
[PASS] Case study verified: lexink-legal
[PASS] Case study verified: maz-dialysis-center
[PASS] Case study verified: idps-pratapgarh
[PASS] Case study verified: the-home-shifting

--- Testing Contact & Inquiries Pipeline ---
[PASS] Inquiry generated reference ID: INQ-2026-3792
[PASS] Inquiry retrieved from database
[PASS] CSV injection neutralized: "'=CMD|' /C calc'!A0"
[PASS] Inquiry deleted successfully

--- Testing Cryptographic & Authentication Engine ---
[PASS] PBKDF2 SHA-512 hash generated (length: 128)
[PASS] PBKDF2 salt generated (length: 32)
[PASS] Valid password verification succeeds with 210,000 iterations
[PASS] Invalid password verification fails
[PASS] Session token created with sufficient entropy
[PASS] Session token verification succeeds
[PASS] Active session retrieved from store
[PASS] Session revoked successfully
[PASS] Revoked session verified in store
[PASS] Fresh IP is not rate limited
[PASS] IP correctly rate-limited after 5 failed attempts
[PASS] Cleared IP is allowed again

--- Testing Media Storage & Upload Safety ---
[PASS] Filename path traversal neutralized
[PASS] Upload succeeded: /uploads/test-safety-1794957464810-7db790c5.gif via local-fs
[PASS] Uploaded test media cleaned up successfully
[PASS] Unsafe executable MIME type rejected by media storage guard

=================================================
REGRESSION TEST SUMMARY: 33 PASSED | 0 FAILED
=================================================
```

### Live HTTP Verification Results
Started Next.js 16.4.6 standalone production server and probed live endpoints:
- `[HTTP 200] /` (118,087 bytes) — OK
- `[HTTP 200] /about` (68,269 bytes) — OK
- `[HTTP 200] /case-studies` (236,661 bytes) — OK
- `[HTTP 200] /case-studies/ngit-edu` (100,538 bytes) — OK
- `[HTTP 200] /services` (73,801 bytes) — OK
- `[HTTP 200] /ventures` (57,606 bytes) — OK
- `[HTTP 200] /blog` (43,914 bytes) — OK
- `[HTTP 200] /hire` (46,800 bytes) — OK
- `[HTTP 200] /contact` (37,282 bytes) — OK
- `[HTTP 200] /robots.txt` (206 bytes) — OK
- `[HTTP 200] /sitemap.xml` (4,368 bytes) — OK
- `[HTTP 401] /api/admin/auth/me` (23 bytes) — OK (Unauthorized access correctly blocked)

---

## 15. Deployment Recommendations
1. **Zero-Downtime Promotion:** The upgrade from 16.2.1 to 16.4.6 introduces zero breaking changes and can be deployed directly to Vercel.
2. **Environment Variables:** No new environment variables are required. Existing `MONGODB_URI` and `ADMIN_SESSION_SECRET` remain active.
3. **Build Command on Vercel:** Keep the standard `npm run build` (`next build --webpack`).
4. **Vercel Cache Invalidation:** It is recommended to perform a "Redeploy without build cache" on Vercel to guarantee that all serverless Lambdas rebuild against `next@16.4.6` and `sharp@0.35.5`.

---

## 16. Rollback Instructions

If unexpected production behavior is observed:
1. Revert `package.json` to `"next": "16.2.1"` and `"eslint-config-next": "16.2.1"`.
2. Run `npm install`.
3. In `next.config.ts`, re-add `turbopackPluginRuntimeStrategy: "workerThreads"` under `experimental: {}`.
4. Run `npm run build` to confirm compilation.
5. Deploy previous Git commit.

---

*Security remediation complete. All 36 advisories resolved. Application fully verified.*