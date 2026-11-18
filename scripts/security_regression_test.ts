import { getCmsStore } from "../src/lib/cms/store";
import { caseStudiesData } from "../src/data/projectsData";
import {
  hashPassword,
  verifyPassword,
  createSessionToken,
  verifySessionToken,
  sanitizeCsvCell,
} from "../src/lib/cms/auth";
import { uploadMediaFile, deleteMediaFile, sanitizeFilename } from "../src/lib/cms/mediaStorage";
import { AdminUser } from "../src/lib/cms/types";

async function runRegressionSuite() {
  console.log("=================================================");
  console.log("RUNNING POST-UPGRADE REGRESSION SUITE (Next.js 16.4.6)");
  console.log("=================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  try {
    // 1. CMS Store & Public Content Integrity
    console.log("\n--- Testing CMS Content & Store Integrity ---");
    const store = getCmsStore();

    const projects = await store.getProjects();
    assert(projects.length >= 50, `Projects loaded (${projects.length} >= 50)`);

    const articles = await store.getArticles();
    assert(articles.length >= 4, `Articles loaded (${articles.length} >= 4)`);

    const ventures = await store.getVentures();
    assert(ventures.length >= 5, `Ventures loaded (${ventures.length} >= 5)`);

    const testimonials = await store.getTestimonials();
    assert(testimonials.length >= 2, `Testimonials loaded (${testimonials.length} >= 2)`);

    const profile = await store.getProfile();
    assert(profile.fullName.includes("Devraj"), `Profile bio intact: ${profile.fullName}`);

    const hpSettings = await store.getHomepageSettings();
    assert(hpSettings.heroHeadline.length > 0, "Homepage hero settings loaded");

    // 2. Case Studies & Dynamic Routes
    console.log("\n--- Testing Case Studies & Dynamic Routes ---");
    const caseStudySlugs = Object.keys(caseStudiesData);
    assert(caseStudySlugs.length === 6, `6 flagship case studies found: ${caseStudySlugs.join(", ")}`);
    for (const slug of caseStudySlugs) {
      const cs = caseStudiesData[slug];
      assert(cs && cs.title.length > 0 && cs.role.length > 0, `Case study verified: ${slug}`);
    }

    // 3. Contact Form & Inquiries CRM
    console.log("\n--- Testing Contact & Inquiries Pipeline ---");
    const testInquiry = await store.createInquiry({
      name: "Security Regression Tester",
      email: "security-test@devrajsinghtomar.com",
      phone: "+91 9140946121",
      organization: "Automated Audit",
      subject: "Security Patch Verification",
      message: "Testing inquiry pipeline post Next.js 16.4.6 upgrade.",
      source: "regression_test",
    });
    assert(testInquiry.referenceId.startsWith("INQ-2026-"), `Inquiry generated reference ID: ${testInquiry.referenceId}`);

    const retrievedInquiry = await store.getInquiryById(testInquiry.id);
    assert(retrievedInquiry !== null && retrievedInquiry.id === testInquiry.id, "Inquiry retrieved from database");

    // CSV Formula Injection Escaping Test (CWE-1236)
    const formulaPayload = "=CMD|' /C calc'!A0";
    const escapedFormula = sanitizeCsvCell(formulaPayload);
    assert(escapedFormula.startsWith("\"'="), `CSV injection neutralized: ${escapedFormula}`);

    // Clean up test inquiry
    await store.deleteInquiry(testInquiry.id);
    const postDeleteInquiry = await store.getInquiryById(testInquiry.id);
    assert(postDeleteInquiry === null, "Inquiry deleted successfully");

    // 4. Cryptographic Security & Authentication
    console.log("\n--- Testing Cryptographic & Authentication Engine ---");
    const testPw = "SuperSecretSecurePass123!";
    const { hash, salt } = hashPassword(testPw);
    assert(hash.length === 128, `PBKDF2 SHA-512 hash generated (length: ${hash.length})`);
    assert(salt.length === 32, `PBKDF2 salt generated (length: ${salt.length})`);

    const validPwCheck = verifyPassword(testPw, hash, salt);
    assert(validPwCheck === true, "Valid password verification succeeds with 210,000 iterations");

    const invalidPwCheck = verifyPassword("WrongPassword456!", hash, salt);
    assert(invalidPwCheck === false, "Invalid password verification fails");

    // Session lifecycle
    const mockUser: AdminUser = {
      id: "admin-test-id",
      email: "admin@devrajsinghtomar.com",
      username: "admin",
      role: "admin",
      passwordHash: "dummyhash",
      salt: "dummysalt",
      createdAt: new Date().toISOString(),
    };
    const { token, tokenHash, expiresAt } = createSessionToken(mockUser);
    assert(token.length >= 64, "Session token created with sufficient entropy");

    const sessionVerification = verifySessionToken(token);
    assert(sessionVerification !== null && sessionVerification.email === mockUser.email, "Session token verification succeeds");

    await store.saveSession({
      userId: mockUser.id,
      username: mockUser.username,
      email: mockUser.email,
      role: mockUser.role,
      tokenHash,
      ip: "127.0.0.1",
      userAgent: "RegressionBot/1.0",
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
      isRevoked: false,
    });
    const retrievedSession = await store.getSessionByHash(tokenHash);
    assert(retrievedSession !== null && retrievedSession.isRevoked === false, "Active session retrieved from store");

    const revoked = await store.revokeSession(tokenHash);
    assert(revoked === true, "Session revoked successfully");

    const postRevokeSession = await store.getSessionByHash(tokenHash);
    assert(postRevokeSession !== null && postRevokeSession.isRevoked === true, "Revoked session verified in store");

    // Rate Limiting
    const testIp = `test-ip-${Date.now()}`;
    const initialRateCheck = await store.checkRateLimit(testIp);
    assert(initialRateCheck.allowed === true, "Fresh IP is not rate limited");
    for (let i = 0; i < 5; i++) {
      await store.recordFailedLogin(testIp);
    }
    const lockedRateCheck = await store.checkRateLimit(testIp);
    assert(lockedRateCheck.allowed === false, "IP correctly rate-limited after 5 failed attempts");
    await store.resetFailedLogins(testIp);
    const postClearCheck = await store.checkRateLimit(testIp);
    assert(postClearCheck.allowed === true, "Cleared IP is allowed again");

    // 5. Media Storage & Upload Processing
    console.log("\n--- Testing Media Storage & Upload Safety ---");
    const testBuffer = Buffer.from("GIF89a\x01\x00\x01\x00\x80\x00\x00\xff\xff\xff\x00\x00\x00!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;");
    const sanitized = sanitizeFilename("malicious../../test image!.gif");
    assert(!sanitized.uniqueFilename.includes(".."), "Filename path traversal neutralized");

    const uploadRes = await uploadMediaFile(testBuffer, "test-safety.gif", "image/gif");
    assert(uploadRes.url.length > 0, `Upload succeeded: ${uploadRes.url} via ${uploadRes.storageProvider}`);

    const deleteRes = await deleteMediaFile(uploadRes.url);
    assert(deleteRes === true, "Uploaded test media cleaned up successfully");

    let rejectedUnsafe = false;
    try {
      await uploadMediaFile(Buffer.from("MZ\x90\x00"), "evil.exe", "application/x-msdownload");
    } catch {
      rejectedUnsafe = true;
    }
    assert(rejectedUnsafe, "Unsafe executable MIME type rejected by media storage guard");

  } catch (err) {
    console.error("Unhandled exception in regression test:", err);
    failed++;
  }

  console.log("\n=================================================");
  console.log(`REGRESSION TEST SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runRegressionSuite().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
