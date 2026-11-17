import fs from "node:fs";
import path from "node:path";
import { getDb, isMongoConfigured } from "@/lib/db/mongodb";
import { ensureMongoIndexes } from "./mongoStore";
import {
  AdminUser,
  CmsProject,
  CmsArticle,
  CmsVenture,
  CmsInquiry,
  CmsTestimonial,
  CmsNowBuilding,
  CmsMediaItem,
  CmsHomepageSettings,
  CmsProfile,
  CmsWebsiteSettings,
  CmsSeoSettings,
} from "./types";

const CMS_DATA_DIR = path.join(process.cwd(), "data", "cms");

function readJsonFile<T>(filename: string, fallback: T): T {
  try {
    const filePath = path.join(CMS_DATA_DIR, filename);
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${filename} for migration:`, err);
    return fallback;
  }
}

export interface MigrationReport {
  success: boolean;
  isMongoConnected: boolean;
  recordsMigrated: {
    users: number;
    projects: number;
    caseStudies: number;
    articles: number;
    ventures: number;
    inquiries: number;
    testimonials: number;
    nowBuilding: number;
    media: number;
    homepage: boolean;
    profile: boolean;
    settings: boolean;
    seo: boolean;
  };
  collectionCountsInMongo: Record<string, number>;
  notes: string[];
  error?: string;
}

export async function runCmsMigrationToMongo(): Promise<MigrationReport> {
  const report: MigrationReport = {
    success: false,
    isMongoConnected: false,
    recordsMigrated: {
      users: 0,
      projects: 0,
      caseStudies: 0,
      articles: 0,
      ventures: 0,
      inquiries: 0,
      testimonials: 0,
      nowBuilding: 0,
      media: 0,
      homepage: false,
      profile: false,
      settings: false,
      seo: false,
    },
    collectionCountsInMongo: {},
    notes: [],
  };

  if (!isMongoConfigured()) {
    report.error = "MongoDB is not configured (MONGODB_URI is not set). Migration aborted.";
    return report;
  }

  const db = await getDb();
  if (!db) {
    report.error = "Failed to connect to MongoDB Atlas database.";
    return report;
  }

  report.isMongoConnected = true;
  await ensureMongoIndexes(db);

  try {
    // 1. Users
    const users = readJsonFile<AdminUser[]>("users.json", []);
    for (const u of users) {
      await db.collection("cms_users").updateOne({ id: u.id }, { $set: u }, { upsert: true });
    }
    report.recordsMigrated.users = users.length;
    report.collectionCountsInMongo.users = await db.collection("cms_users").countDocuments();

    // 2. Projects & Case Studies
    const projects = readJsonFile<CmsProject[]>("projects.json", []);
    let caseStudiesCount = 0;
    for (const p of projects) {
      if (p.hasCaseStudy || p.caseStudy) caseStudiesCount++;
      await db.collection("cms_projects").updateOne({ id: p.id }, { $set: p }, { upsert: true });
    }
    report.recordsMigrated.projects = projects.length;
    report.recordsMigrated.caseStudies = caseStudiesCount;
    report.collectionCountsInMongo.projects = await db.collection("cms_projects").countDocuments();

    // 3. Articles
    const articles = readJsonFile<CmsArticle[]>("articles.json", []);
    for (const a of articles) {
      await db.collection("cms_articles").updateOne({ id: a.id }, { $set: a }, { upsert: true });
    }
    report.recordsMigrated.articles = articles.length;
    report.collectionCountsInMongo.articles = await db.collection("cms_articles").countDocuments();

    // 4. Ventures
    const ventures = readJsonFile<CmsVenture[]>("ventures.json", []);
    for (const v of ventures) {
      await db.collection("cms_ventures").updateOne({ id: v.id }, { $set: v }, { upsert: true });
    }
    report.recordsMigrated.ventures = ventures.length;
    report.collectionCountsInMongo.ventures = await db.collection("cms_ventures").countDocuments();

    // 5. Inquiries
    const inquiries = readJsonFile<CmsInquiry[]>("inquiries.json", []);
    for (const inq of inquiries) {
      await db.collection("cms_inquiries").updateOne({ id: inq.id }, { $set: inq }, { upsert: true });
    }
    report.recordsMigrated.inquiries = inquiries.length;
    report.collectionCountsInMongo.inquiries = await db.collection("cms_inquiries").countDocuments();

    // 6. Testimonials
    const testimonials = readJsonFile<CmsTestimonial[]>("testimonials.json", []);
    for (const t of testimonials) {
      await db.collection("cms_testimonials").updateOne({ id: t.id }, { $set: t }, { upsert: true });
    }
    report.recordsMigrated.testimonials = testimonials.length;
    report.collectionCountsInMongo.testimonials = await db.collection("cms_testimonials").countDocuments();

    // 7. Now Building
    const nowBuilding = readJsonFile<CmsNowBuilding[]>("now_building.json", []);
    for (const nb of nowBuilding) {
      await db.collection("cms_now_building").updateOne({ id: nb.id }, { $set: nb }, { upsert: true });
    }
    report.recordsMigrated.nowBuilding = nowBuilding.length;
    report.collectionCountsInMongo.nowBuilding = await db.collection("cms_now_building").countDocuments();

    // 8. Media
    const media = readJsonFile<CmsMediaItem[]>("media.json", []);
    for (const m of media) {
      await db.collection("cms_media").updateOne({ id: m.id }, { $set: m }, { upsert: true });
    }
    report.recordsMigrated.media = media.length;
    report.collectionCountsInMongo.media = await db.collection("cms_media").countDocuments();

    // 9. Homepage Settings
    const homepage = readJsonFile<CmsHomepageSettings | null>("homepage.json", null);
    if (homepage) {
      await db.collection("cms_homepage").updateOne({ _id: "homepage" as any }, { $set: homepage }, { upsert: true });
      report.recordsMigrated.homepage = true;
    }

    // 10. Profile
    const profile = readJsonFile<CmsProfile | null>("profile.json", null);
    if (profile) {
      await db.collection("cms_profile").updateOne({ _id: "profile" as any }, { $set: profile }, { upsert: true });
      report.recordsMigrated.profile = true;
    }

    // 11. Website Settings
    const settings = readJsonFile<CmsWebsiteSettings | null>("settings.json", null);
    if (settings) {
      await db.collection("cms_settings").updateOne({ _id: "settings" as any }, { $set: settings }, { upsert: true });
      report.recordsMigrated.settings = true;
    }

    // 12. SEO Settings
    const seo = readJsonFile<CmsSeoSettings | null>("seo.json", null);
    if (seo) {
      await db.collection("cms_seo").updateOne({ _id: "seo" as any }, { $set: seo }, { upsert: true });
      report.recordsMigrated.seo = true;
    }

    report.success = true;
    report.notes.push("All persistent records successfully upserted into MongoDB Atlas.");
    report.notes.push("Original JSON records in data/cms/ remain untouched and preserved.");
  } catch (err: unknown) {
    report.error = err instanceof Error ? err.message : "Migration failed with unexpected error";
    report.success = false;
  }

  return report;
}
