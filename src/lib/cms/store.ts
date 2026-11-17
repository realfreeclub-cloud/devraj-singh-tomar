import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {
  AdminUser,
  CmsProject,
  CmsArticle,
  CmsVenture,
  CmsExpertisePillar,
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
import { webProjects, caseStudiesData } from "@/data/projectsData";
import { blogPosts } from "@/app/blog/data";
import { isMongoConfigured } from "@/lib/db/mongodb";
import { MongoCmsStore } from "./mongoStore";
import { deleteMediaFile } from "./mediaStorage";

const CMS_DIR = path.join(process.cwd(), "data", "cms");

// Helper for atomic file reading and writing (Development Fallback)
function readJsonFile<T>(filename: string, defaultValue: T): T {
  try {
    const filePath = path.join(CMS_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`[Local Store] Error reading ${filename}:`, error);
    return defaultValue;
  }
}

function writeJsonFile<T>(filename: string, data: T): void {
  try {
    if (!fs.existsSync(CMS_DIR)) {
      fs.mkdirSync(CMS_DIR, { recursive: true });
    }
    const filePath = path.join(CMS_DIR, filename);
    const tempPath = `${filePath}.${Date.now()}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempPath, filePath);
  } catch (error) {
    console.error(`[Local Store] Error writing ${filename}:`, error);
  }
}

export class CmsStore {
  private mongo = new MongoCmsStore();

  constructor() {
    // Only bootstrap local files if not in production or when Mongo is not configured
    if (!isMongoConfigured()) {
      this.bootstrapLocalFiles();
    }
  }

  private bootstrapLocalFiles(): void {
    if (!fs.existsSync(CMS_DIR)) {
      fs.mkdirSync(CMS_DIR, { recursive: true });
    }

    // 1. Initial Admin User
    const users = readJsonFile<AdminUser[]>("users.json", []);
    if (users.length === 0) {
      const initialEmail = process.env.ADMIN_INITIAL_EMAIL || "admin@devrajsinghtomar.com";
      const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || "Devraj@CMS2026!";
      const salt = crypto.randomBytes(16).toString("hex");
      // Use 210,000 iterations
      const passwordHash = crypto.pbkdf2Sync(initialPassword, salt, 210000, 64, "sha512").toString("hex");

      writeJsonFile("users.json", [
        {
          id: "usr-admin-1",
          username: "admin",
          email: initialEmail,
          passwordHash,
          salt,
          role: "superadmin",
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    // 2. Initial Projects
    const projects = readJsonFile<CmsProject[]>("projects.json", []);
    if (projects.length === 0) {
      const initialProjects: CmsProject[] = webProjects.map((p, idx) => {
        const caseStudyObj = caseStudiesData[p.slug];
        return {
          id: `proj-${idx + 1}`,
          slug: p.slug,
          name: p.name,
          url: p.url,
          category: p.category,
          industry: p.industry,
          role: p.role,
          desc: p.desc,
          tech: p.tech,
          impact: p.impact,
          featured: p.featured || false,
          status: "published",
          hasCaseStudy: Boolean(caseStudyObj),
          caseStudy: caseStudyObj,
          displayOrder: idx + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      });
      writeJsonFile("projects.json", initialProjects);
    }

    // 3. Initial Blog Articles
    const articles = readJsonFile<CmsArticle[]>("articles.json", []);
    if (articles.length === 0) {
      const initialArticles: CmsArticle[] = blogPosts.map((b, idx) => ({
        id: `art-${idx + 1}`,
        slug: b.slug,
        title: b.title,
        description: b.description,
        keywords: b.keywords,
        date: b.date,
        dateISO: b.dateISO,
        readTime: b.readTime,
        category: b.category,
        content: b.content,
        coverImage: "/og-image.png",
        status: "published",
        featured: idx === 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      writeJsonFile("articles.json", initialArticles);
    }

    // 4. Initial Ventures
    const ventures = readJsonFile<CmsVenture[]>("ventures.json", []);
    if (ventures.length === 0) {
      writeJsonFile("ventures.json", [
        {
          id: "vent-1",
          name: "Career Avsar",
          category: "Technology Venture",
          type: "business",
          industry: "EdTech & Career Opportunities",
          role: "Co-Founder & Chief Technology Strategist",
          status: "Active & Scaling",
          statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
          website: "https://careeravsar.com",
          domain: "careeravsar.com",
          desc: "A digital career ecosystem delivering structured, verified employment and competitive exam pathways to Tier-2 and Tier-3 talent across India.",
          contributions: [
            "Architected high-throughput content delivery pipeline handling spikes during exam result declarations.",
            "Designed automated multi-channel alert delivery (WhatsApp, Telegram, Push Notifications).",
            "Structured SEO taxonomy securing #1 Google rankings across regional government hiring keywords.",
          ],
          displayOrder: 1,
          isPublished: true,
        },
        {
          id: "vent-2",
          name: "Tecxontechnology",
          category: "Digital Agency & Technology Practice",
          type: "business",
          industry: "Custom Software Engineering & Cloud Solutions",
          role: "Founder & Lead Architect",
          status: "Active & Commercial",
          statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
          website: "https://tecxontechnology.com",
          domain: "tecxontechnology.com",
          desc: "Full-service digital engineering firm that has delivered over 60+ production platforms across healthcare, legal, logistics, and education.",
          contributions: [
            "Directly architected, audited, and deployed 60+ commercial web applications.",
            "Established modern CI/CD, Next.js App Router best practices, and enterprise caching standards.",
            "Managed cross-functional development, UI/UX, and cloud infrastructure teams.",
          ],
          displayOrder: 2,
          isPublished: true,
        },
        {
          id: "vent-3",
          name: "Lotus Loop Media",
          category: "Strategic Partnership",
          type: "partnership",
          industry: "Digital Growth & Performance Marketing",
          role: "Technology Advisor & Strategic Partner",
          status: "Strategic Partnership",
          statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
          website: "https://lotusloopmedia.com",
          domain: "lotusloopmedia.com",
          desc: "Data-driven growth marketing venture managing 45+ enterprise brands and 80M+ aggregate campaign impressions.",
          contributions: [
            "Architected analytics telemetry, custom conversion tracking, and marketing automation integrations.",
            "Implemented enterprise landing page performance optimization achieving 95+ PageSpeed scores.",
          ],
          displayOrder: 3,
          isPublished: true,
        },
        {
          id: "vent-4",
          name: "NGIT Edu",
          category: "Educational Examination System",
          type: "product",
          industry: "EdTech & Typing Examination",
          role: "Lead Platform Architect",
          status: "Live in Production",
          statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
          website: "https://ngitedu.com",
          domain: "ngitedu.com",
          desc: "Premier government computer certification, typing examination, and steno shorthand institute in Prayagraj.",
          contributions: [
            "Engineered the sub-millisecond real-time typing evaluation engine with 0ms keystroke lag.",
            "Created bilingual Hindi (Mangal & Kruti Dev) and English exam simulation models.",
            "Guaranteed 99.98% platform uptime during massive recruitment surges.",
          ],
          caseStudySlug: "ngit-edu",
          caseStudyName: "NGIT Edu Case Study",
          displayOrder: 4,
          isPublished: true,
        },
        {
          id: "vent-5",
          name: "Divya Jap",
          category: "Digital Product Venture",
          type: "product",
          industry: "Spiritual Tech & Consumer Web",
          role: "Creator & Full-Stack System Architect",
          status: "Live in Production",
          statusColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
          website: "https://divyajap.com",
          domain: "divyajap.com",
          desc: "An original technology product combining ancient Vedic sadhana with modern web ergonomics. Features a tactile haptic Jap Mala and 100% offline resilience.",
          contributions: [
            "Conceived, architected, and built the local-first PWA from scratch.",
            "Engineered hardware-level Web Haptics and Web Audio frequency synthesis.",
            "Designed anonymous cryptographic room synchronization for family prayer circles.",
          ],
          caseStudySlug: "divyajap",
          caseStudyName: "Divya Jap Full Case Study",
          displayOrder: 5,
          isPublished: true,
        },
      ]);
    }

    // 5. Initial Now Building
    const nowBuilding = readJsonFile<CmsNowBuilding[]>("now_building.json", []);
    if (nowBuilding.length === 0) {
      writeJsonFile("now_building.json", [
        {
          id: "nb-1",
          title: "Vedic Sadhana AI Companion (Divya Jap)",
          description: "Fine-tuning localized offline Sanskrit mantra transcription models for real-time japa audio cadence evaluation.",
          link: "https://divyajap.com",
          status: "Active Sprint",
          progress: 85,
          startDate: "2026-02-01",
          lastUpdated: "2026-11-15",
          isVisible: true,
          displayOrder: 1,
        },
        {
          id: "nb-2",
          title: "Autonomous Agentic SEO Telemetry",
          description: "Building zero-latency MCP tools that audit Core Web Vitals, Schema.org validity, and llms.txt endpoints automatically.",
          status: "Architecture & Testing",
          progress: 60,
          startDate: "2026-03-01",
          lastUpdated: "2026-11-16",
          isVisible: true,
          displayOrder: 2,
        },
      ]);
    }

    // 6. Initial Testimonials
    const testimonials = readJsonFile<CmsTestimonial[]>("testimonials.json", []);
    if (testimonials.length === 0) {
      writeJsonFile("testimonials.json", [
        {
          id: "test-1",
          name: "Advocate T. Sharma",
          designation: "Managing Partner",
          organization: "T&S Lex Ink Legal",
          content: "Devraj built our law firm's digital presence with absolute zero-trust security and flawless document confidentiality. Our client inquiries increased by 300% within 90 days.",
          relatedProject: "lexinklegal.in",
          displayOrder: 1,
          status: "published",
        },
        {
          id: "test-2",
          name: "Dr. M. A. Zaidi",
          designation: "Director of Critical Care",
          organization: "MAZ Dialysis Center",
          content: "In healthcare, minutes matter. Devraj designed an ultra-reliable emergency dialysis consultation portal that has never experienced downtime during critical patient admissions.",
          relatedProject: "mazdialysiscenter.in",
          displayOrder: 2,
          status: "published",
        },
      ]);
    }

    // 7. Initial Homepage
    const homepage = readJsonFile<CmsHomepageSettings | null>("homepage.json", null);
    if (!homepage) {
      writeJsonFile("homepage.json", {
        heroHeadline: "Turning Ideas Into Digital Solutions That Move Businesses Forward.",
        heroSubheadline: "Technology strategist, product architect, and entrepreneur working at the intersection of business, code, and digital systems.",
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
      });
    }

    // 8. Initial Profile
    const profile = readJsonFile<CmsProfile | null>("profile.json", null);
    if (!profile) {
      writeJsonFile("profile.json", {
        fullName: "Devraj Singh Tomar",
        title: "Technology Strategist & Entrepreneur",
        shortBio: "I turn business ideas into practical technology solutions and scalable digital products.",
        detailedBio: "Working at the intersection of technology, business and digital innovation. Over 7+ years of track record building and managing mission-critical digital platforms across India.",
        profileImage: "/devraj-singh-tomar.jpg",
        location: "Kudri (Jhansi) / Noida, UP",
        experienceYears: "7+ Years",
        milestones: [
          {
            period: "Early Roots",
            title: "Roots, Family Support & Early Curiosity",
            location: "Kudri, Jhansi (UP)",
            desc: "First in village to study computers; daily 6 AM bike rides with father.",
            badge: "Foundations",
          },
          {
            period: "2014 – 2016",
            title: "Academic Milestones & The Unconventional Choice",
            location: "Orai & Prayagraj",
            desc: "Cleared Air Force defense exams; chose technology entrepreneurship.",
            badge: "Pivotal Decision",
          },
          {
            period: "2018 – 2022",
            title: "EdTech Systems & Professional Digital Practice",
            location: "Uttar Pradesh",
            desc: "Architected government exam software and regional school communication hubs.",
            badge: "Industry Entry",
          },
          {
            period: "2022 – Present",
            title: "Enterprise Systems, High-Concurrency & Leadership",
            location: "Noida / National",
            desc: "Leading high-scale e-commerce support operations and multi-tier enterprise platforms.",
            badge: "Strategic Advisory",
          },
        ],
        philosophy: [
          { num: "01", title: "Problem Before Technology", desc: "Never deploy a framework until the unit economics and user workflow demand it." },
          { num: "02", title: "Architect for Reality", desc: "Build systems that perform flawlessly under low bandwidth and real human constraints." },
          { num: "03", title: "Tech Serving Business", desc: "Ensure every architectural choice serves commercial objectives." },
        ],
        socialLinks: [
          { name: "LinkedIn", href: "https://www.linkedin.com/in/devraj-singh-tomar-it/" },
          { name: "GitHub", href: "https://github.com/realfreeclub-cloud" },
          { name: "Dev.to", href: "https://dev.to/devraj_singh_tomar" },
          { name: "Medium", href: "https://medium.com/@devrajsinghtomar" },
        ],
      });
    }
  }

  // --- USERS ---
  async getUsers(): Promise<AdminUser[]> {
    if (isMongoConfigured()) return this.mongo.getUsers();
    return readJsonFile<AdminUser[]>("users.json", []);
  }

  async getUserById(id: string): Promise<AdminUser | null> {
    if (isMongoConfigured()) return this.mongo.getUserById(id);
    const users = readJsonFile<AdminUser[]>("users.json", []);
    return users.find((u) => u.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<AdminUser | null> {
    if (isMongoConfigured()) return this.mongo.getUserByEmail(email);
    const users = readJsonFile<AdminUser[]>("users.json", []);
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async updateUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser | null> {
    if (isMongoConfigured()) return this.mongo.updateUser(id, updates);
    const users = readJsonFile<AdminUser[]>("users.json", []);
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...updates };
    writeJsonFile("users.json", users);
    return users[idx];
  }

  // --- SESSIONS & REVOCATION ---
  async saveSession(session: CmsSession): Promise<void> {
    if (isMongoConfigured()) return this.mongo.saveSession(session);
    const sessions = readJsonFile<CmsSession[]>("sessions.json", []);
    const idx = sessions.findIndex((s) => s.tokenHash === session.tokenHash);
    if (idx !== -1) sessions[idx] = session;
    else sessions.push(session);
    writeJsonFile("sessions.json", sessions);
  }

  async getSessionByHash(tokenHash: string): Promise<CmsSession | null> {
    if (isMongoConfigured()) return this.mongo.getSessionByHash(tokenHash);
    const sessions = readJsonFile<CmsSession[]>("sessions.json", []);
    const session = sessions.find((s) => s.tokenHash === tokenHash);
    return session || null;
  }

  async revokeSession(tokenHash: string): Promise<boolean> {
    if (isMongoConfigured()) return this.mongo.revokeSession(tokenHash);
    const sessions = readJsonFile<CmsSession[]>("sessions.json", []);
    const session = sessions.find((s) => s.tokenHash === tokenHash);
    if (!session) return false;
    session.isRevoked = true;
    writeJsonFile("sessions.json", sessions);
    return true;
  }

  async revokeAllUserSessions(userId: string): Promise<void> {
    if (isMongoConfigured()) return this.mongo.revokeAllUserSessions(userId);
    const sessions = readJsonFile<CmsSession[]>("sessions.json", []);
    sessions.forEach((s) => {
      if (s.userId === userId) s.isRevoked = true;
    });
    writeJsonFile("sessions.json", sessions);
  }

  // --- LOGIN RATE LIMITING ---
  async checkRateLimit(ip: string): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
    if (isMongoConfigured()) return this.mongo.checkRateLimit(ip);
    const attempts = readJsonFile<CmsLoginAttempt[]>("login_attempts.json", []);
    const record = attempts.find((a) => a.ip === ip);
    if (!record || !record.lockedUntil) return { allowed: true };
    const lockExpires = new Date(record.lockedUntil).getTime();
    const now = Date.now();
    if (now < lockExpires) {
      return { allowed: false, retryAfterSeconds: Math.ceil((lockExpires - now) / 1000) };
    }
    return { allowed: true };
  }

  async recordFailedLogin(ip: string): Promise<{ locked: boolean; remainingAttempts: number; lockTimeRemainingMinutes?: number }> {
    if (isMongoConfigured()) return this.mongo.recordFailedLogin(ip);
    const MAX_ATTEMPTS = 5;
    const LOCK_MINUTES = 15;
    const attempts = readJsonFile<CmsLoginAttempt[]>("login_attempts.json", []);
    const record = attempts.find((a) => a.ip === ip);
    const now = new Date();
    let currentAttempts = (record?.attempts || 0) + 1;
    let lockedUntil: string | undefined = undefined;

    if (currentAttempts >= MAX_ATTEMPTS) {
      lockedUntil = new Date(now.getTime() + LOCK_MINUTES * 60 * 1000).toISOString();
    }

    if (record) {
      record.attempts = currentAttempts;
      record.lastAttempt = now.toISOString();
      record.lockedUntil = lockedUntil;
    } else {
      attempts.push({ ip, attempts: currentAttempts, lastAttempt: now.toISOString(), lockedUntil });
    }

    writeJsonFile("login_attempts.json", attempts);
    return {
      locked: currentAttempts >= MAX_ATTEMPTS,
      remainingAttempts: Math.max(0, MAX_ATTEMPTS - currentAttempts),
      lockTimeRemainingMinutes: currentAttempts >= MAX_ATTEMPTS ? LOCK_MINUTES : undefined,
    };
  }

  async resetFailedLogins(ip: string): Promise<void> {
    if (isMongoConfigured()) return this.mongo.resetFailedLogins(ip);
    const attempts = readJsonFile<CmsLoginAttempt[]>("login_attempts.json", []);
    const filtered = attempts.filter((a) => a.ip !== ip);
    writeJsonFile("login_attempts.json", filtered);
  }

  // --- PROJECTS ---
  async getProjects(): Promise<CmsProject[]> {
    if (isMongoConfigured()) return this.mongo.getProjects();
    return readJsonFile<CmsProject[]>("projects.json", []);
  }

  async getProjectById(id: string): Promise<CmsProject | null> {
    if (isMongoConfigured()) return this.mongo.getProjectById(id);
    const list = readJsonFile<CmsProject[]>("projects.json", []);
    return list.find((p) => p.id === id) || null;
  }

  async getProjectBySlug(slug: string): Promise<CmsProject | null> {
    if (isMongoConfigured()) return this.mongo.getProjectBySlug(slug);
    const list = readJsonFile<CmsProject[]>("projects.json", []);
    return list.find((p) => p.slug === slug) || null;
  }

  async saveProject(project: Partial<CmsProject>): Promise<CmsProject> {
    if (isMongoConfigured()) return this.mongo.saveProject(project);
    const list = readJsonFile<CmsProject[]>("projects.json", []);
    const id = project.id || `proj-${Date.now()}`;
    const slug = (project.slug || project.name || "project").toLowerCase().replace(/[^a-z0-9_-]/g, "-");

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

    const idx = list.findIndex((p) => p.id === id);
    if (idx !== -1) list[idx] = completeProject;
    else list.push(completeProject);

    writeJsonFile("projects.json", list);
    return completeProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    if (isMongoConfigured()) return this.mongo.deleteProject(id);
    const list = readJsonFile<CmsProject[]>("projects.json", []);
    const filtered = list.filter((p) => p.id !== id);
    if (filtered.length === list.length) return false;
    writeJsonFile("projects.json", filtered);
    return true;
  }

  // --- ARTICLES ---
  async getArticles(): Promise<CmsArticle[]> {
    if (isMongoConfigured()) return this.mongo.getArticles();
    return readJsonFile<CmsArticle[]>("articles.json", []);
  }

  async getArticleById(id: string): Promise<CmsArticle | null> {
    if (isMongoConfigured()) return this.mongo.getArticleById(id);
    const list = readJsonFile<CmsArticle[]>("articles.json", []);
    return list.find((a) => a.id === id) || null;
  }

  async getArticleBySlug(slug: string): Promise<CmsArticle | null> {
    if (isMongoConfigured()) return this.mongo.getArticleBySlug(slug);
    const list = readJsonFile<CmsArticle[]>("articles.json", []);
    return list.find((a) => a.slug === slug) || null;
  }

  async saveArticle(article: Partial<CmsArticle>): Promise<CmsArticle> {
    if (isMongoConfigured()) return this.mongo.saveArticle(article);
    const list = readJsonFile<CmsArticle[]>("articles.json", []);
    const id = article.id || `art-${Date.now()}`;
    const slug = (article.slug || article.title || "article").toLowerCase().replace(/[^a-z0-9_-]/g, "-");

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

    const idx = list.findIndex((a) => a.id === id);
    if (idx !== -1) list[idx] = completeArticle;
    else list.unshift(completeArticle);

    writeJsonFile("articles.json", list);
    return completeArticle;
  }

  async deleteArticle(id: string): Promise<boolean> {
    if (isMongoConfigured()) return this.mongo.deleteArticle(id);
    const list = readJsonFile<CmsArticle[]>("articles.json", []);
    const filtered = list.filter((a) => a.id !== id);
    if (filtered.length === list.length) return false;
    writeJsonFile("articles.json", filtered);
    return true;
  }

  // --- VENTURES ---
  async getVentures(): Promise<CmsVenture[]> {
    if (isMongoConfigured()) return this.mongo.getVentures();
    return readJsonFile<CmsVenture[]>("ventures.json", []);
  }

  async getVentureById(id: string): Promise<CmsVenture | null> {
    if (isMongoConfigured()) return this.mongo.getVentureById(id);
    const list = readJsonFile<CmsVenture[]>("ventures.json", []);
    return list.find((v) => v.id === id) || null;
  }

  async saveVenture(venture: Partial<CmsVenture>): Promise<CmsVenture> {
    if (isMongoConfigured()) return this.mongo.saveVenture(venture);
    const list = readJsonFile<CmsVenture[]>("ventures.json", []);
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

    const idx = list.findIndex((v) => v.id === id);
    if (idx !== -1) list[idx] = completeVenture;
    else list.push(completeVenture);

    writeJsonFile("ventures.json", list);
    return completeVenture;
  }

  async deleteVenture(id: string): Promise<boolean> {
    if (isMongoConfigured()) return this.mongo.deleteVenture(id);
    const list = readJsonFile<CmsVenture[]>("ventures.json", []);
    const filtered = list.filter((v) => v.id !== id);
    if (filtered.length === list.length) return false;
    writeJsonFile("ventures.json", filtered);
    return true;
  }

  // --- INQUIRIES ---
  async getInquiries(): Promise<CmsInquiry[]> {
    if (isMongoConfigured()) return this.mongo.getInquiries();
    return readJsonFile<CmsInquiry[]>("inquiries.json", []);
  }

  async getInquiryById(id: string): Promise<CmsInquiry | null> {
    if (isMongoConfigured()) return this.mongo.getInquiryById(id);
    const list = readJsonFile<CmsInquiry[]>("inquiries.json", []);
    return list.find((i) => i.id === id) || null;
  }

  async createInquiry(
    inquiry: Omit<CmsInquiry, "id" | "referenceId" | "status" | "createdAt" | "updatedAt">
  ): Promise<CmsInquiry> {
    if (isMongoConfigured()) return this.mongo.createInquiry(inquiry);
    const list = readJsonFile<CmsInquiry[]>("inquiries.json", []);
    const rand = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `INQ-2026-${rand}`;
    const now = new Date().toISOString();

    const newInquiry: CmsInquiry = {
      id: `inq-${Date.now()}`,
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

    list.unshift(newInquiry);
    writeJsonFile("inquiries.json", list);
    return newInquiry;
  }

  async updateInquiryStatus(
    id: string,
    status: CmsInquiry["status"],
    internalNotes?: string
  ): Promise<CmsInquiry | null> {
    if (isMongoConfigured()) return this.mongo.updateInquiryStatus(id, status, internalNotes);
    const list = readJsonFile<CmsInquiry[]>("inquiries.json", []);
    const idx = list.findIndex((i) => i.id === id);
    if (idx === -1) return null;

    list[idx].status = status;
    list[idx].updatedAt = new Date().toISOString();
    if (typeof internalNotes === "string") {
      list[idx].internalNotes = internalNotes;
    }

    writeJsonFile("inquiries.json", list);
    return list[idx];
  }

  async deleteInquiry(id: string): Promise<boolean> {
    if (isMongoConfigured()) return this.mongo.deleteInquiry(id);
    const list = readJsonFile<CmsInquiry[]>("inquiries.json", []);
    const filtered = list.filter((i) => i.id !== id);
    if (filtered.length === list.length) return false;
    writeJsonFile("inquiries.json", filtered);
    return true;
  }

  // --- NOW BUILDING ---
  async getNowBuilding(): Promise<CmsNowBuilding[]> {
    if (isMongoConfigured()) return this.mongo.getNowBuilding();
    return readJsonFile<CmsNowBuilding[]>("now_building.json", []);
  }

  async saveNowBuilding(item: Partial<CmsNowBuilding>): Promise<CmsNowBuilding> {
    if (isMongoConfigured()) return this.mongo.saveNowBuilding(item);
    const list = readJsonFile<CmsNowBuilding[]>("now_building.json", []);
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

    const idx = list.findIndex((nb) => nb.id === id);
    if (idx !== -1) list[idx] = completeItem;
    else list.push(completeItem);

    writeJsonFile("now_building.json", list);
    return completeItem;
  }

  async deleteNowBuilding(id: string): Promise<boolean> {
    if (isMongoConfigured()) return this.mongo.deleteNowBuilding(id);
    const list = readJsonFile<CmsNowBuilding[]>("now_building.json", []);
    const filtered = list.filter((nb) => nb.id !== id);
    if (filtered.length === list.length) return false;
    writeJsonFile("now_building.json", filtered);
    return true;
  }

  // --- TESTIMONIALS ---
  async getTestimonials(): Promise<CmsTestimonial[]> {
    if (isMongoConfigured()) return this.mongo.getTestimonials();
    return readJsonFile<CmsTestimonial[]>("testimonials.json", []);
  }

  async saveTestimonial(item: Partial<CmsTestimonial>): Promise<CmsTestimonial> {
    if (isMongoConfigured()) return this.mongo.saveTestimonial(item);
    const list = readJsonFile<CmsTestimonial[]>("testimonials.json", []);
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

    const idx = list.findIndex((t) => t.id === id);
    if (idx !== -1) list[idx] = completeTestimonial;
    else list.push(completeTestimonial);

    writeJsonFile("testimonials.json", list);
    return completeTestimonial;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    if (isMongoConfigured()) return this.mongo.deleteTestimonial(id);
    const list = readJsonFile<CmsTestimonial[]>("testimonials.json", []);
    const filtered = list.filter((t) => t.id !== id);
    if (filtered.length === list.length) return false;
    writeJsonFile("testimonials.json", filtered);
    return true;
  }

  // --- MEDIA ---
  async getMediaItems(): Promise<CmsMediaItem[]> {
    if (isMongoConfigured()) return this.mongo.getMediaItems();
    return readJsonFile<CmsMediaItem[]>("media.json", []);
  }

  async saveMediaItem(item: Omit<CmsMediaItem, "id" | "createdAt">): Promise<CmsMediaItem> {
    if (isMongoConfigured()) return this.mongo.saveMediaItem(item);
    const list = readJsonFile<CmsMediaItem[]>("media.json", []);
    const newItem: CmsMediaItem = {
      id: `media-${Date.now()}`,
      ...item,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newItem);
    writeJsonFile("media.json", list);
    return newItem;
  }

  async deleteMediaItem(id: string): Promise<boolean> {
    let itemUrl = "";
    if (isMongoConfigured()) {
      const items = await this.mongo.getMediaItems();
      const item = items.find((m) => m.id === id);
      if (item) itemUrl = item.url;
      await this.mongo.deleteMediaItem(id);
    } else {
      const list = readJsonFile<CmsMediaItem[]>("media.json", []);
      const item = list.find((m) => m.id === id);
      if (item) itemUrl = item.url;
      const filtered = list.filter((m) => m.id !== id);
      writeJsonFile("media.json", filtered);
    }

    if (itemUrl) {
      await deleteMediaFile(itemUrl);
    }
    return true;
  }

  // --- HOMEPAGE CONFIG ---
  async getHomepageSettings(): Promise<CmsHomepageSettings> {
    if (isMongoConfigured()) return this.mongo.getHomepageSettings();
    return readJsonFile<CmsHomepageSettings>("homepage.json", {
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
    });
  }

  async saveHomepageSettings(settings: Partial<CmsHomepageSettings>): Promise<CmsHomepageSettings> {
    if (isMongoConfigured()) return this.mongo.saveHomepageSettings(settings);
    const current = await this.getHomepageSettings();
    const updated = { ...current, ...settings };
    writeJsonFile("homepage.json", updated);
    return updated;
  }

  // --- PROFILE ---
  async getProfile(): Promise<CmsProfile> {
    if (isMongoConfigured()) return this.mongo.getProfile();
    return readJsonFile<CmsProfile>("profile.json", {
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
    });
  }

  async saveProfile(profile: Partial<CmsProfile>): Promise<CmsProfile> {
    if (isMongoConfigured()) return this.mongo.saveProfile(profile);
    const current = await this.getProfile();
    const updated = { ...current, ...profile };
    writeJsonFile("profile.json", updated);
    return updated;
  }

  // --- WEBSITE SETTINGS ---
  async getWebsiteSettings(): Promise<CmsWebsiteSettings> {
    if (isMongoConfigured()) return this.mongo.getWebsiteSettings();
    return readJsonFile<CmsWebsiteSettings>("settings.json", {
      siteName: "Devraj Singh Tomar",
      titleTemplate: "Devraj Singh Tomar | Technology Strategist & Entrepreneur",
      contactEmail: "hello@devrajsinghtomar.com",
      publicPhone: "+91 9140946121",
      whatsappNumber: "+91 9140946121",
      officeAddress: "Sector 18, Noida, Uttar Pradesh, India",
      copyrightText: "© 2026 Devraj Singh Tomar. All rights reserved.",
      defaultOgImage: "/og-image.png",
    });
  }

  async saveWebsiteSettings(settings: Partial<CmsWebsiteSettings>): Promise<CmsWebsiteSettings> {
    if (isMongoConfigured()) return this.mongo.saveWebsiteSettings(settings);
    const current = await this.getWebsiteSettings();
    const updated = { ...current, ...settings };
    writeJsonFile("settings.json", updated);
    return updated;
  }

  // --- SEO SETTINGS ---
  async getSeoSettings(): Promise<CmsSeoSettings> {
    if (isMongoConfigured()) return this.mongo.getSeoSettings();
    return readJsonFile<CmsSeoSettings>("seo.json", {
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
    });
  }

  async saveSeoSettings(seo: Partial<CmsSeoSettings>): Promise<CmsSeoSettings> {
    if (isMongoConfigured()) return this.mongo.saveSeoSettings(seo);
    const current = await this.getSeoSettings();
    const updated = { ...current, ...(seo as CmsSeoSettings) };
    writeJsonFile("seo.json", updated);
    return updated;
  }

  // --- DASHBOARD STATS ---
  async getDashboardStats() {
    if (isMongoConfigured()) return this.mongo.getDashboardStats();
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
      totalInquiries: inquiries.length,
      unreadInquiries: inquiries.filter((i) => i.status === "New").length,
      recentInquiries: inquiries.slice(0, 5),
      recentProjects: projects.slice(0, 5),
      recentArticles: articles.slice(0, 5),
    };
  }
}

// Singleton CMS Store instance
let instance: CmsStore | null = null;
export function getCmsStore(): CmsStore {
  if (!instance) {
    instance = new CmsStore();
  }
  return instance;
}
