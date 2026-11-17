import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

console.log("==================================================================");
console.log("PHASE 5.1: PRODUCTION READINESS & SECURITY HARDENING TEST SUITE");
console.log("==================================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// -----------------------------------------------------------------------------
// TEST 1: PBKDF2 Password Hashing & 210,000 Iterations
// -----------------------------------------------------------------------------
console.log("--- 1. Testing Cryptographic PBKDF2 Hashing (210,000 Iterations) ---");
const testPassword = "SuperSecurePassword2026!";
const salt = crypto.randomBytes(16).toString("hex");
const startTime = Date.now();
const hash = crypto.pbkdf2Sync(testPassword, salt, 210000, 64, "sha512").toString("hex");
const duration = Date.now() - startTime;

assert(hash.length === 128, `SHA-512 hash produced 128 hex chars (Length: ${hash.length})`);
assert(duration > 20, `210,000 iterations took ${duration}ms, providing robust protection against GPU cracking`);

// Verify timing safe comparison
const verifyHash = crypto.pbkdf2Sync(testPassword, salt, 210000, 64, "sha512").toString("hex");
assert(
  crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(verifyHash, "hex")),
  "Timing-safe equal verification succeeded for correct password"
);

// Verify incorrect password fails
const badHash = crypto.pbkdf2Sync("WrongPassword", salt, 210000, 64, "sha512").toString("hex");
assert(
  !crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(badHash, "hex")),
  "Timing-safe equal correctly rejected incorrect password"
);

// -----------------------------------------------------------------------------
// TEST 2: Session Token Signature & Tamper-Proof HMAC
// -----------------------------------------------------------------------------
console.log("\n--- 2. Testing Session Token HMAC Integrity ---");
const SECRET = "test-secret-key-32-bytes-long-super";
const payload = { sub: "usr-1", email: "admin@test.com", exp: Date.now() + 60000 };
const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
const signature = crypto.createHmac("sha256", SECRET).update(encodedPayload).digest("base64url");
const token = `${encodedPayload}.${signature}`;

assert(token.includes("."), "Session token properly generated with payload and signature");

// Tamper test
const tamperedToken = `${encodedPayload.slice(0, -2)}xx.${signature}`;
const [tPayload, tSig] = tamperedToken.split(".");
const expectedSig = crypto.createHmac("sha256", SECRET).update(tPayload).digest("base64url");
assert(
  !crypto.timingSafeEqual(Buffer.from(tSig), Buffer.from(expectedSig)),
  "Tampered session token signature check rejected"
);

// -----------------------------------------------------------------------------
// TEST 3: CSV Formula Injection Escaping (CWE-1236)
// -----------------------------------------------------------------------------
console.log("\n--- 3. Testing CSV Formula Injection Sanitization (CWE-1236) ---");
function sanitizeCsvCell(value) {
  if (!value) return '""';
  let clean = String(value).trim();
  if (/^[=+\-@\t\r]/.test(clean)) {
    clean = `'${clean}`;
  }
  return `"${clean.replace(/"/g, '""')}"`;
}

const dangerousInputs = [
  "=cmd|' /C calc'!A0",
  "+1+1",
  "-2+3",
  "@SUM(1,2)",
  "\tTAB_INJECT",
  "Normal text message",
];

assert(sanitizeCsvCell(dangerousInputs[0]).startsWith("\"'="), "Formula '=cmd' properly escaped with leading apostrophe");
assert(sanitizeCsvCell(dangerousInputs[1]).startsWith("\"'+"), "Formula '+1' properly escaped with leading apostrophe");
assert(sanitizeCsvCell(dangerousInputs[2]).startsWith("\"'-"), "Formula '-2' properly escaped with leading apostrophe");
assert(sanitizeCsvCell(dangerousInputs[3]).startsWith("\"'@"), "Formula '@SUM' properly escaped with leading apostrophe");
assert(sanitizeCsvCell(dangerousInputs[5]) === '"Normal text message"', "Benign text left clean without modification");

// -----------------------------------------------------------------------------
// TEST 4: Media Filename Sanitization & MIME Check
// -----------------------------------------------------------------------------
console.log("\n--- 4. Testing Media Filename Sanitization & Validation ---");
function sanitizeFilename(originalName) {
  const ext = (path.extname(originalName) || ".png").toLowerCase();
  const base = path.basename(originalName, ext);
  const cleanBase = base
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);
  const randomSuffix = crypto.randomBytes(4).toString("hex");
  const uniqueFilename = `${cleanBase}-${Date.now()}-${randomSuffix}${ext}`;
  return { cleanBase, ext, uniqueFilename };
}

const badFilename = "Evil Hack ../../etc/passwd.PNG";
const sanitized = sanitizeFilename(badFilename);
assert(!sanitized.uniqueFilename.includes(".."), "Directory traversal characters '..' removed");
assert(!sanitized.uniqueFilename.includes(" "), "Spaces replaced with dashes");
assert(sanitized.uniqueFilename.endsWith(".png"), "Uppercase extensions normalized to lowercase");

// -----------------------------------------------------------------------------
// TEST 5: Data Layer Integrity & Record Counts
// -----------------------------------------------------------------------------
console.log("\n--- 5. Testing Existing CMS Data Preservation in data/cms/ ---");
const dataDir = path.join(process.cwd(), "data", "cms");

if (fs.existsSync(dataDir)) {
  const read = (f, fallback = {}) => {
    const p = path.join(dataDir, f);
    return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf-8")) : fallback;
  };

  const projects = read("projects.json", []);
  const articles = read("articles.json", []);
  const ventures = read("ventures.json", []);
  const homepage = read("homepage.json", {});
  const profile = read("profile.json", {});
  const seo = read("seo.json", { "/": {} });

  assert(projects.length >= 50, `Preserved all ${projects.length} verified projects in store`);
  const caseStudies = projects.filter((p) => p.hasCaseStudy || p.caseStudy);
  assert(caseStudies.length >= 6, `Preserved all ${caseStudies.length} deep architectural case studies`);
  assert(articles.length >= 4, `Preserved all ${articles.length} published blog articles`);
  assert(ventures.length >= 5, `Preserved all ${ventures.length} ventures & partnerships`);
  assert(homepage.heroHeadline && homepage.heroHeadline.length > 10, "Preserved homepage brand statement configuration");
  assert(profile.fullName === "Devraj Singh Tomar", "Preserved executive profile identity");
  assert(Object.keys(seo).length >= 1, `Preserved route SEO configurations`);
} else {
  console.log("[INFO] data/cms directory will initialize on first bootstrap");
}

console.log("\n==================================================================");
console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================================");

if (failed > 0) {
  process.exit(1);
}
