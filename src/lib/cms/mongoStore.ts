import { Db } from "mongodb";
import { getDb } from "@/lib/db/mongodb";
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
  CmsSession,
  CmsLoginAttempt,
} from "./types";

let indexesInitialized = false;

export async function ensureMongoIndexes(db: Db): Promise<void> {
  if (indexesInitialized) return;

  try {
    // 1. Projects
    await db.collection("cms_projects").createIndex({ id: 1 }, { unique: true });
    await db.collection("cms_projects").createIndex({ slug: 1 }, { unique: true });
    await db.collection("cms_projects").createIndex({ category: 1 });
    await db.collection("cms_projects").createIndex({ displayOrder: 1 });

    // 2. Articles
    await db.collection("cms_articles").createIndex({ id: 1 }, { unique: true });
    await db.collection("cms_articles").createIndex({ slug: 1 }, { unique: true });
    await db.collection("cms_articles").createIndex({ status: 1 });

    // 3. Ventures
    await db.collection("cms_ventures").createIndex({ id: 1 }, { unique: true });
    await db.collection("cms_ventures").createIndex({ displayOrder: 1 });

    // 4. Inquiries
    await db.collection("cms_inquiries").createIndex({ id: 1 }, { unique: true });
    await db.collection("cms_inquiries").createIndex({ referenceId: 1 }, { unique: true });
    await db.collection("cms_inquiries").createIndex({ status: 1 });
    await db.collection("cms_inquiries").createIndex({ createdAt: -1 });

    // 5. Testimonials
    await db.collection("cms_testimonials").createIndex({ id: 1 }, { unique: true });
    await db.collection("cms_testimonials").createIndex({ displayOrder: 1 });

    // 6. Now Building
    await db.collection("cms_now_building").createIndex({ id: 1 }, { unique: true });
    await db.collection("cms_now_building").createIndex({ displayOrder: 1 });

    // 7. Media
    await db.collection("cms_media").createIndex({ id: 1 }, { unique: true });
    await db.collection("cms_media").createIndex({ createdAt: -1 });

    // 8. Users
    await db.collection("cms_users").createIndex({ id: 1 }, { unique: true });
    await db.collection("cms_users").createIndex({ email: 1 }, { unique: true });
    await db.collection("cms_users").createIndex({ username: 1 }, { unique: true });

    // 9. Sessions (with TTL)
    await db.collection("cms_sessions").createIndex({ tokenHash: 1 }, { unique: true });
    await db.collection("cms_sessions").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

    // 10. Login attempts (with TTL: 24h)
    await db.collection("cms_login_attempts").createIndex({ ip: 1 }, { unique: true });
    await db.collection("cms_login_attempts").createIndex({ lastAttempt: 1 }, { expireAfterSeconds: 86400 });

    indexesInitialized = true;
  } catch (err) {
    console.error("[MongoDB] Index initialization error:", err);
  }
}

function cleanDoc<T>(doc: any): T {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return rest as T;
}

export class MongoCmsStore {
  private async getDbInstance(): Promise<Db> {
    const db = await getDb();
    if (!db) {
      throw new Error("MongoDB database is not available.");
    }
    await ensureMongoIndexes(db);
    return db;
  }

  // --- USERS ---
  async getUsers(): Promise<AdminUser[]> {
    const db = await this.getDbInstance();
    const docs = await db.collection("cms_users").find({}).toArray();
    return docs.map((d) => cleanDoc<AdminUser>(d));
  }

  async getUserById(id: string): Promise<AdminUser | null> {
    const db = await this.getDbInstance();
    const doc = await db.collection("cms_users").findOne({ id });
    return doc ? cleanDoc<AdminUser>(doc) : null;
  }

  async getUserByEmail(email: string): Promise<AdminUser | null> {
    const db = await this.getDbInstance();
    const doc = await db.collection("cms_users").findOne({
      email: { $regex: new RegExp(`^${email.trim()}$`, "i") },
    });
    return doc ? cleanDoc<AdminUser>(doc) : null;
  }

  async saveUser(user: AdminUser): Promise<AdminUser> {
    const db = await this.getDbInstance();
    await db.collection("cms_users").updateOne(
      { id: user.id },
      { $set: user },
      { upsert: true }
    );
    return user;
  }

  async updateUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser | null> {
    const db = await this.getDbInstance();
    const res = await db.collection("cms_users").findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: "after" }
    );
    return res ? cleanDoc<AdminUser>(res) : null;
  }

  // --- SESSIONS & REVOCATION ---
  async saveSession(session: CmsSession): Promise<void> {
    const db = await this.getDbInstance();
    await db.collection("cms_sessions").updateOne(
      { tokenHash: session.tokenHash },
      { $set: session },
      { upsert: true }
    );
  }

  async getSessionByHash(tokenHash: string): Promise<CmsSession | null> {
    const db = await this.getDbInstance();
    const doc = await db.collection("cms_sessions").findOne({ tokenHash });
    if (!doc) return null;
    return cleanDoc<CmsSession>(doc);
  }

  async revokeSession(tokenHash: string): Promise<boolean> {
    const db = await this.getDbInstance();
    const res = await db.collection("cms_sessions").updateOne(
      { tokenHash },
      { $set: { isRevoked: true } }
    );
    return res.modifiedCount > 0;
  }

  async revokeAllUserSessions(userId: string): Promise<void> {
    const db = await this.getDbInstance();
    await db.collection("cms_sessions").updateMany(
      { userId },
      { $set: { isRevoked: true } }
    );
  }

  // --- LOGIN RATE LIMITING ---
  async checkRateLimit(ip: string): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
    const db = await this.getDbInstance();
    const record = await db.collection<CmsLoginAttempt>("cms_login_attempts").findOne({ ip });

    if (!record) return { allowed: true };

    if (record.lockedUntil) {
      const lockExpires = new Date(record.lockedUntil).getTime();
      const now = Date.now();
      if (now < lockExpires) {
        const remainingSeconds = Math.ceil((lockExpires - now) / 1000);
        return { allowed: false, retryAfterSeconds: remainingSeconds };
      }
    }

    return { allowed: true };
  }

  async recordFailedLogin(ip: string): Promise<{ locked: boolean; remainingAttempts: number; lockTimeRemainingMinutes?: number }> {
    const db = await this.getDbInstance();
    const MAX_ATTEMPTS = 5;
    const LOCK_MINUTES = 15;

    const record = await db.collection<CmsLoginAttempt>("cms_login_attempts").findOne({ ip });
    const now = new Date();

    let attempts = (record?.attempts || 0) + 1;
    let lockedUntil: string | undefined = undefined;

    if (attempts >= MAX_ATTEMPTS) {
      const lockDate = new Date(now.getTime() + LOCK_MINUTES * 60 * 1000);
      lockedUntil = lockDate.toISOString();
    }

    await db.collection("cms_login_attempts").updateOne(
      { ip },
      {
        $set: {
          ip,
          attempts,
          lastAttempt: now.toISOString(),
          ...(lockedUntil ? { lockedUntil } : {}),
        },
      },
      { upsert: true }
    );

    return {
      locked: attempts >= MAX_ATTEMPTS,
      remainingAttempts: Math.max(0, MAX_ATTEMPTS - attempts),
      lockTimeRemainingMinutes: attempts >= MAX_ATTEMPTS ? LOCK_MINUTES : undefined,
    };
  }

  async resetFailedLogins(ip: string): Promise<void> {
    const db = await this.getDbInstance();
    await db.collection("cms_login_attempts").deleteOne({ ip });
  }

  // --- PROJECTS ---
  async getProjects(): Promise<CmsProject[]> {
    const db = await this.getDbInstance();
    const docs = await db.collection("cms_projects").find({}).sort({ displayOrder: 1 }).toArray();
    return docs.map((d) => cleanDoc<CmsProject>(d));
  }

  async getProjectById(id: string): Promise<CmsProject | null> {
    const db = await this.getDbInstance();
    const doc = await db.collection("cms_projects").findOne({ id });
    return doc ? cleanDoc<CmsProject>(doc) : null;
  }

  async getProjectBySlug(slug: string): Promise<CmsProject | null> {
    const db = await this.getDbInstance();
    const doc = await db.collection("cms_projects").findOne({ slug });
    return doc ? cleanDoc<CmsProject>(doc) : null;
  }

  async saveProject(project: Partial<CmsProject>): Promise<CmsProject> {
    const db = await this.getDbInstance();
    const id = project.id || `proj-${Date.now()}`;
    const slug = (project.slug || project.name || "project")
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-");

    const completeProject: CmsProject = {
      id,
      slug,
      name: project.name || "Untitled Project",
      url: project.url || "",
      category: project.category || "Technology",
      industry: project.industry || "General",
      role: project.role || "Technology Strategist",
      desc: project.desc || "",
      tech: project.tech || [],
      impact: project.impact,
      featured: project.featured ?? false,
      status: project.status || "published",
      hasCaseStudy: Boolean(project.hasCaseStudy || project.caseStudy),
      caseStudy: project.caseStudy,
      displayOrder: project.displayOrder ?? 999,
      updatedAt: new Date().toISOString(),
      createdAt: project.createdAt || new Date().toISOString(),
    };

    await db.collection("cms_projects").updateOne(
      { id },
      { $set: completeProject },
      { upsert: true }
    );

    return completeProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    const db = await this.getDbInstance();
    const res = await db.collection("cms_projects").deleteOne({ id });
    return res.deletedCount > 0;
  }

  // --- ARTICLES ---
  async getArticles(): Promise<CmsArticle[]> {
    const db = await this.getDbInstance();
    const docs = await db.collection("cms_articles").find({}).sort({ dateISO: -1 }).toArray();
    return docs.map((d) => cleanDoc<CmsArticle>(d));
  }

  async getArticleById(id: string): Promise<CmsArticle | null> {
    const db = await this.getDbInstance();
    const doc = await db.collection("cms_articles").findOne({ id });
    return doc ? cleanDoc<CmsArticle>(doc) : null;
  }

  async getArticleBySlug(slug: string): Promise<CmsArticle | null> {
    const db = await this.getDbInstance();
    const doc = await db.collection("cms_articles").findOne({ slug });
    return doc ? cleanDoc<CmsArticle>(doc) : null;
  }

  async saveArticle(article: Partial<CmsArticle>): Promise<CmsArticle> {
    const db = await this.getDbInstance();
    const id = article.id || `art-${Date.now()}`;
    const slug = (article.slug || article.title || "article")
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-");

    const completeArticle: CmsArticle = {
      id,
      slug,
      title: article.title || "Untitled Article",
      description: article.description || "",
      keywords: article.keywords || [],
      date: article.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      dateISO: article.dateISO || new Date().toISOString().slice(0, 10),
      readTime: article.readTime || "5 min read",
      category: article.category || "Strategy",
      content: article.content || "",
      coverImage: article.coverImage,
      status: article.status || "published",
      featured: article.featured ?? false,
      updatedAt: new Date().toISOString(),
      createdAt: article.createdAt || new Date().toISOString(),
    };

    await db.collection("cms_articles").updateOne(
      { id },
      { $set: completeArticle },
      { upsert: true }
    );

    return completeArticle;
  }

  async deleteArticle(id: string): Promise<boolean> {
    const db = await this.getDbInstance();
    const res = await db.collection("cms_articles").deleteOne({ id });
    return res.deletedCount > 0;
  }

  // --- VENTURES ---
  async getVentures(): Promise<CmsVenture[]> {
    const db = await this.getDbInstance();
    const docs = await db.collection("cms_ventures").find({}).sort({ displayOrder: 1 }).toArray();
    return docs.map((d) => cleanDoc<CmsVenture>(d));
  }

  async getVentureById(id: string): Promise<CmsVenture | null> {
    const db = await this.getDbInstance();
    const doc = await db.collection("cms_ventures").findOne({ id });
    return doc ? cleanDoc<CmsVenture>(doc) : null;
  }

  async saveVenture(venture: Partial<CmsVenture>): Promise<CmsVenture> {
    const db = await this.getDbInstance();
    const id = venture.id || `vent-${Date.now()}`;

    const completeVenture: CmsVenture = {
      id,
      name: venture.name || "Untitled Venture",
      category: venture.category || "Venture",
      type: venture.type || "business",
      industry: venture.industry || "Technology",
      role: venture.role || "Partner",
      status: venture.status || "Active",
      statusColor: venture.statusColor || "emerald",
      website: venture.website || "",
      domain: venture.domain || "",
      desc: venture.desc || "",
      contributions: venture.contributions || [],
      caseStudySlug: venture.caseStudySlug,
      caseStudyName: venture.caseStudyName,
      displayOrder: venture.displayOrder ?? 99,
      isPublished: venture.isPublished ?? true,
    };

    await db.collection("cms_ventures").updateOne(
      { id },
      { $set: completeVenture },
      { upsert: true }
    );

    return completeVenture;
  }

  async deleteVenture(id: string): Promise<boolean> {
    const db = await this.getDbInstance();
    const res = await db.collection("cms_ventures").deleteOne({ id });
    return res.deletedCount > 0;
  }

  // --- INQUIRIES ---
  async getInquiries(): Promise<CmsInquiry[]> {
    const db = await this.getDbInstance();
    const docs = await db.collection("cms_inquiries").find({}).sort({ createdAt: -1 }).toArray();
    return docs.map((d) => cleanDoc<CmsInquiry>(d));
  }

  async getInquiryById(id: string): Promise<CmsInquiry | null> {
    const db = await this.getDbInstance();
    const doc = await db.collection("cms_inquiries").findOne({ id });
    return doc ? cleanDoc<CmsInquiry>(doc) : null;
  }

  async createInquiry(
    inquiry: Omit<CmsInquiry, "id" | "referenceId" | "status" | "createdAt" | "updatedAt">
  ): Promise<CmsInquiry> {
    const db = await this.getDbInstance();
    const id = `inq-${Date.now()}`;
    const rand = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `INQ-2026-${rand}`;
    const now = new Date().toISOString();

    const newInquiry: CmsInquiry = {
      id,
      referenceId,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      organization: inquiry.organization,
      subject: inquiry.subject,
      message: inquiry.message,
      source: inquiry.source || "website",
      status: "New",
      internalNotes: inquiry.internalNotes || "",
      createdAt: now,
      updatedAt: now,
    };

    await db.collection("cms_inquiries").insertOne(newInquiry);
    return newInquiry;
  }

  async updateInquiryStatus(
    id: string,
    status: CmsInquiry["status"],
    internalNotes?: string
  ): Promise<CmsInquiry | null> {
    const db = await this.getDbInstance();
    const updatePayload: Record<string, any> = {
      status,
      updatedAt: new Date().toISOString(),
    };
    if (typeof internalNotes === "string") {
      updatePayload.internalNotes = internalNotes;
    }

    const res = await db.collection("cms_inquiries").findOneAndUpdate(
      { id },
      { $set: updatePayload },
      { returnDocument: "after" }
    );

    return res ? cleanDoc<CmsInquiry>(res) : null;
  }

  async deleteInquiry(id: string): Promise<boolean> {
    const db = await this.getDbInstance();
    const res = await db.collection("cms_inquiries").deleteOne({ id });
    return res.deletedCount > 0;
  }

  // --- NOW BUILDING ---
  async getNowBuilding(): Promise<CmsNowBuilding[]> {
    const db = await this.getDbInstance();
    const docs = await db.collection("cms_now_building").find({}).sort({ displayOrder: 1 }).toArray();
    return docs.map((d) => cleanDoc<CmsNowBuilding>(d));
  }

  async saveNowBuilding(item: Partial<CmsNowBuilding>): Promise<CmsNowBuilding> {
    const db = await this.getDbInstance();
    const id = item.id || `nb-${Date.now()}`;

    const completeItem: CmsNowBuilding = {
      id,
      title: item.title || "Untitled Initiative",
      description: item.description || "",
      link: item.link,
      status: item.status || "Active Sprint",
      progress: item.progress ?? 50,
      startDate: item.startDate || new Date().toISOString().slice(0, 10),
      lastUpdated: new Date().toISOString().slice(0, 10),
      isVisible: item.isVisible ?? true,
      displayOrder: item.displayOrder ?? 99,
    };

    await db.collection("cms_now_building").updateOne(
      { id },
      { $set: completeItem },
      { upsert: true }
    );

    return completeItem;
  }

  async deleteNowBuilding(id: string): Promise<boolean> {
    const db = await this.getDbInstance();
    const res = await db.collection("cms_now_building").deleteOne({ id });
    return res.deletedCount > 0;
  }

  // --- TESTIMONIALS ---
  async getTestimonials(): Promise<CmsTestimonial[]> {
    const db = await this.getDbInstance();
    const docs = await db.collection("cms_testimonials").find({}).sort({ displayOrder: 1 }).toArray();
    return docs.map((d) => cleanDoc<CmsTestimonial>(d));
  }

  async saveTestimonial(item: Partial<CmsTestimonial>): Promise<CmsTestimonial> {
    const db = await this.getDbInstance();
    const id = item.id || `test-${Date.now()}`;

    const completeTestimonial: CmsTestimonial = {
      id,
      name: item.name || "Anonymous",
      designation: item.designation || "Executive",
      organization: item.organization || "",
      content: item.content || "",
      photo: item.photo,
      relatedProject: item.relatedProject,
      displayOrder: item.displayOrder ?? 99,
      status: item.status || "published",
    };

    await db.collection("cms_testimonials").updateOne(
      { id },
      { $set: completeTestimonial },
      { upsert: true }
    );

    return completeTestimonial;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const db = await this.getDbInstance();
    const res = await db.collection("cms_testimonials").deleteOne({ id });
    return res.deletedCount > 0;
  }

  // --- MEDIA ---
  async getMediaItems(): Promise<CmsMediaItem[]> {
    const db = await this.getDbInstance();
    const docs = await db.collection("cms_media").find({}).sort({ createdAt: -1 }).toArray();
    return docs.map((d) => cleanDoc<CmsMediaItem>(d));
  }

  async saveMediaItem(item: Omit<CmsMediaItem, "id" | "createdAt">): Promise<CmsMediaItem> {
    const db = await this.getDbInstance();
    const newItem: CmsMediaItem = {
      id: `media-${Date.now()}`,
      ...item,
      createdAt: new Date().toISOString(),
    };

    await db.collection("cms_media").insertOne(newItem);
    return newItem;
  }

  async deleteMediaItem(id: string): Promise<boolean> {
    const db = await this.getDbInstance();
    const res = await db.collection("cms_media").deleteOne({ id });
    return res.deletedCount > 0;
  }

  // --- HOMEPAGE CONFIG ---
  async getHomepageSettings(): Promise<CmsHomepageSettings> {
    const db = await this.getDbInstance();
    const doc = await db.collection("cms_homepage").findOne({ _id: "homepage" as any });
    if (!doc) {
      return {
        heroHeadline: "Turning Ideas Into Digital Solutions That Move Businesses Forward.",
        heroSubheadline: "Technology strategist, product architect, and entrepreneur.",
        availabilityText: "Available for Technology Consulting & High-Impact Projects",
        isAvailable: true,
        primaryCtaText: "Let's Discuss a Project",
        primaryCtaLink: "/contact",
        secondaryCtaText: "Explore My Work",
        secondaryCtaLink: "#featured-work",
        featuredProjectSlugs: ["ngit-edu", "divyajap", "lexink-legal", "maz-dialysis-center", "idps-pratapgarh", "the-home-shifting"],
        sectionVisibility: {
          snapshot: true,
          featuredWork: true,
          whatIDo: true,
          ventures: true,
          howIWork: true,
          nowBuilding: true,
          insights: true,
          contactCta: true,
        },
      };
    }
    return cleanDoc<CmsHomepageSettings>(doc);
  }

  async saveHomepageSettings(settings: Partial<CmsHomepageSettings>): Promise<CmsHomepageSettings> {
    const current = await this.getHomepageSettings();
    const updated = { ...current, ...settings };
    const db = await this.getDbInstance();
    await db.collection("cms_homepage").updateOne(
      { _id: "homepage" as any },
      { $set: updated },
      { upsert: true }
    );
    return updated;
  }

  // --- PROFILE ---
  async getProfile(): Promise<CmsProfile> {
    const db = await this.getDbInstance();
    const doc = await db.collection("cms_profile").findOne({ _id: "profile" as any });
    if (!doc) {
      return {
        fullName: "Devraj Singh Tomar",
        title: "Technology Strategist & Entrepreneur",
        shortBio: "I turn business ideas into practical technology solutions and scalable digital products.",
        detailedBio: "Working at the intersection of technology, business and digital innovation.",
        profileImage: "/devraj-singh-tomar.jpg",
        location: "Kudri (Jhansi) / Noida, UP",
        experienceYears: "7+ Years",
        milestones: [],
        philosophy: [],
        socialLinks: [],
      };
    }
    return cleanDoc<CmsProfile>(doc);
  }

  async saveProfile(profile: Partial<CmsProfile>): Promise<CmsProfile> {
    const current = await this.getProfile();
    const updated = { ...current, ...profile };
    const db = await this.getDbInstance();
    await db.collection("cms_profile").updateOne(
      { _id: "profile" as any },
      { $set: updated },
      { upsert: true }
    );
    return updated;
  }

  // --- WEBSITE SETTINGS ---
  async getWebsiteSettings(): Promise<CmsWebsiteSettings> {
    const db = await this.getDbInstance();
    const doc = await db.collection("cms_settings").findOne({ _id: "settings" as any });
    if (!doc) {
      return {
        siteName: "Devraj Singh Tomar",
        titleTemplate: "Devraj Singh Tomar | Technology Strategist & Entrepreneur",
        contactEmail: "hello@devrajsinghtomar.com",
        publicPhone: "+91 9140946121",
        whatsappNumber: "+91 9140946121",
        officeAddress: "Sector 18, Noida, Uttar Pradesh, India",
        copyrightText: "© 2026 Devraj Singh Tomar. All rights reserved.",
        defaultOgImage: "/og-image.png",
      };
    }
    return cleanDoc<CmsWebsiteSettings>(doc);
  }

  async saveWebsiteSettings(settings: Partial<CmsWebsiteSettings>): Promise<CmsWebsiteSettings> {
    const current = await this.getWebsiteSettings();
    const updated = { ...current, ...settings };
    const db = await this.getDbInstance();
    await db.collection("cms_settings").updateOne(
      { _id: "settings" as any },
      { $set: updated },
      { upsert: true }
    );
    return updated;
  }

  // --- SEO SETTINGS ---
  async getSeoSettings(): Promise<CmsSeoSettings> {
    const db = await this.getDbInstance();
    const doc = await db.collection("cms_seo").findOne({ _id: "seo" as any });
    if (!doc) {
      return {
        "/": {
          title: "Devraj Singh Tomar | Technology Strategist & Entrepreneur",
          description: "Official portfolio of Devraj Singh Tomar. Turning business ideas into practical technology solutions and scalable digital products.",
        },
        "/about": {
          title: "About Devraj Singh Tomar | Technology Strategist & Entrepreneur",
          description: "Learn about Devraj Singh Tomar's journey from Kudri (Jhansi) to leading enterprise technology architecture.",
        },
        "/case-studies": {
          title: "Case Studies & Project Explorer | Devraj Singh Tomar",
          description: "Explore 60+ digital platforms, high-concurrency software architectures, and detailed case studies.",
        },
        "/expertise": {
          title: "Expertise & Strategic Capabilities | Devraj Singh Tomar",
          description: "Explore Devraj Singh Tomar's strategic capabilities across Technology Strategy, Product Development, and Leadership.",
        },
        "/ventures": {
          title: "Ventures & Partnerships | Devraj Singh Tomar",
          description: "Explore the businesses co-founded, strategic institutional partnerships, and digital products created by Devraj Singh Tomar.",
        },
        "/blog": {
          title: "Insights & Strategic Field Notes | Devraj Singh Tomar",
          description: "Explore strategic essays and field notes on technology architecture, digital product development, and IT leadership.",
        },
      };
    }
    return cleanDoc<CmsSeoSettings>(doc);
  }

  async saveSeoSettings(seo: Partial<CmsSeoSettings>): Promise<CmsSeoSettings> {
    const current = await this.getSeoSettings();
    const updated = { ...current, ...(seo as CmsSeoSettings) };
    const db = await this.getDbInstance();
    await db.collection("cms_seo").updateOne(
      { _id: "seo" as any },
      { $set: updated },
      { upsert: true }
    );
    return updated;
  }

  // --- DASHBOARD STATS ---
  async getDashboardStats() {
    const projects = await this.getProjects();
    const articles = await this.getArticles();
    const ventures = await this.getVentures();
    const testimonials = await this.getTestimonials();
    const inquiries = await this.getInquiries();

    return {
      totalProjects: projects.length,
      publishedProjects: projects.filter((p) => p.status === "published").length,
      draftProjects: projects.filter((p) => p.status === "draft").length,
      totalArticles: articles.length,
      publishedArticles: articles.filter((a) => a.status === "published").length,
      draftArticles: articles.filter((a) => a.status === "draft").length,
      totalVentures: ventures.length,
      totalTestimonials: testimonials.length,
      unreadInquiries: inquiries.filter((i) => i.status === "New").length,
      totalInquiries: inquiries.length,
    };
  }
}
