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
} from "./types";
import { webProjects, caseStudiesData } from "@/data/projectsData";
import { blogPosts } from "@/app/blog/data";

const CMS_DIR = path.join(process.cwd(), "data", "cms");

// Helper for atomic file reading and writing
function readJsonFile<T>(filename: string, defaultValue: T): T {
  try {
    const filePath = path.join(CMS_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
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
    console.error(`Error writing ${filename}:`, error);
  }
}

export class CmsStore {
  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized() {
    if (!fs.existsSync(CMS_DIR)) {
      fs.mkdirSync(CMS_DIR, { recursive: true });
    }

    // 1. Initial Admin User
    const users = readJsonFile<AdminUser[]>("users.json", []);
    if (users.length === 0) {
      const salt = crypto.randomBytes(16).toString("hex");
      const defaultPassword = process.env.ADMIN_INITIAL_PASSWORD || "Devraj@CMS2026!";
      const hash = crypto.pbkdf2Sync(defaultPassword, salt, 1000, 64, "sha512").toString("hex");

      const defaultAdmin: AdminUser = {
        id: "admin-default",
        username: "admin",
        email: "admin@devrajsinghtomar.com",
        passwordHash: hash,
        salt: salt,
        role: "admin",
        createdAt: new Date().toISOString(),
      };
      writeJsonFile("users.json", [defaultAdmin]);
    }

    // 2. Initial Projects
    const projects = readJsonFile<CmsProject[]>("projects.json", []);
    if (projects.length === 0) {
      const initialProjects: CmsProject[] = webProjects.map((p, idx) => {
        const caseStudy = caseStudiesData[p.slug];
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
          featured: p.featured ?? false,
          status: "published",
          hasCaseStudy: p.hasCaseStudy,
          caseStudy: caseStudy,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      });
      writeJsonFile("projects.json", initialProjects);
    }

    // 3. Initial Articles
    const articles = readJsonFile<CmsArticle[]>("articles.json", []);
    if (articles.length === 0) {
      const initialArticles: CmsArticle[] = blogPosts.map((post, idx) => ({
        id: `post-${idx + 1}`,
        slug: post.slug,
        title: post.title,
        description: post.description,
        keywords: post.keywords,
        date: post.date,
        dateISO: post.dateISO,
        readTime: post.readTime,
        category: post.category,
        content: post.content,
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
      const initialVentures: CmsVenture[] = [
        {
          id: "vent-1",
          name: "Lotus Loop Media Solutions",
          category: "Co-Founded Business",
          type: "business",
          industry: "Digital Agency & Marketing Solutions",
          role: "Co-Founder & Technical Head",
          status: "Active & Scaling",
          statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
          website: "https://lotusloop.in",
          domain: "lotusloop.in",
          desc: "Premier digital agency and growth consulting enterprise co-founded in Noida with Tushar Nagpal (September 2025). Specializes in high-end technical architectures, enterprise legal portals, and digital transformation initiatives.",
          contributions: [
            "Directing core technical architecture and web engineering.",
            "Delivered zero-trust legal portal for T&S Lex Ink Legal.",
            "Engineered multi-channel inbound customer acquisition pipelines.",
          ],
          caseStudySlug: "lexink-legal",
          caseStudyName: "T&S Lex Ink Legal Case Study",
          displayOrder: 1,
          isPublished: true,
        },
        {
          id: "vent-2",
          name: "Tecxontechnology",
          category: "Proprietary Consultancy",
          type: "business",
          industry: "Software Engineering & IT Architecture",
          role: "Founder & Principal Architect",
          status: "Active",
          statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
          website: "https://tecxontech.com/",
          domain: "tecxontech.com",
          desc: "Independent technology advisory and bespoke software engineering practice delivering high-performance web systems, infrastructure scaling, and cloud solutions.",
          contributions: [
            "Providing technology planning, stack evaluation, and architectural blueprints.",
            "Conducting micro-audits to achieve 100/100 Core Web Vitals on client sites.",
            "Architecting serverless, edge-deployed web ecosystems with zero vendor lock-in.",
          ],
          caseStudySlug: "the-home-shifting",
          caseStudyName: "The Home Shifting Case Study",
          displayOrder: 2,
          isPublished: true,
        },
        {
          id: "vent-3",
          name: "M/S Career Avsar",
          category: "Key Operational Partnership",
          type: "partnership",
          industry: "Educational Recruitment & Public Systems",
          role: "IT Project Head & Technology Partner",
          status: "Active Strategic Partner",
          statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
          website: "https://careeravsar.com/",
          domain: "careeravsar.com",
          desc: "Regional recruitment, talent placement, and institutional printing enterprise led in long-term partnership with Vipin Singh in Pratapgarh.",
          contributions: [
            "Led digital development and web portal structuring for 7 Government Medical Colleges in UP.",
            "Managed delivery of 40+ diverse institutional, healthcare, and educational client systems.",
            "Engineered online admission inquiry funnels boosting school leads by +300%.",
          ],
          caseStudySlug: "idps-pratapgarh",
          caseStudyName: "IDPS Pratapgarh Case Study",
          displayOrder: 3,
          isPublished: true,
        },
        {
          id: "vent-4",
          name: "National Genius Institute (NGIT)",
          category: "Institutional Technology Partnership",
          type: "partnership",
          industry: "EdTech & Computer Examinations",
          role: "Long-Term Systems Architect & Partner",
          status: "Active Strategic Partner",
          statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
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
        {
          id: "vent-6",
          name: "Route 2 Shine (Noida)",
          category: "Past Entrepreneurial Milestone",
          type: "milestone",
          industry: "Voice Process Outsourcing & IT Setup",
          role: "Co-Founder & IT Operations Lead",
          status: "Archived Milestone (2022-2023)",
          statusColor: "text-foreground/60 bg-secondary/30 border-layer-border",
          website: "",
          domain: "Noida Facility",
          desc: "Voice Process Outsourcing (VPO) company co-founded in Noida. Devraj took full ownership of the IT and communication infrastructure.",
          contributions: [
            "Architected enterprise-grade local network switching and secure VoIP gateways.",
            "Maintained 99.9% uptime for multi-agent daily call operations.",
          ],
          displayOrder: 6,
          isPublished: true,
        },
      ];
      writeJsonFile("ventures.json", initialVentures);
    }

    // 5. Initial Inquiries
    if (!fs.existsSync(path.join(CMS_DIR, "inquiries.json"))) {
      writeJsonFile("inquiries.json", []);
    }

    // 6. Initial Testimonials
    if (!fs.existsSync(path.join(CMS_DIR, "testimonials.json"))) {
      writeJsonFile("testimonials.json", []);
    }

    // 7. Initial Now Building
    const nowBuilding = readJsonFile<CmsNowBuilding[]>("now_building.json", []);
    if (nowBuilding.length === 0) {
      writeJsonFile("now_building.json", [
        {
          id: "nb-1",
          title: "Divya Jap Vedic Platform 2.0",
          description: "Enhancing the local-first offline PWA with synchronized community chanting circles and custom haptic pulse rhythms.",
          link: "https://divyajap.com",
          status: "Active Sprint",
          progress: 85,
          startDate: "2026-02-01",
          lastUpdated: new Date().toISOString().split("T")[0],
          isVisible: true,
          displayOrder: 1,
        },
        {
          id: "nb-2",
          title: "NGIT Real-Time Shorthand Engine",
          description: "Architecting a web-based Hindi shorthand audio playback and real-time transcript evaluation pipeline.",
          link: "https://ngitedu.com",
          status: "Prototyping",
          progress: 60,
          startDate: "2026-03-15",
          lastUpdated: new Date().toISOString().split("T")[0],
          isVisible: true,
          displayOrder: 2,
        },
        {
          id: "nb-3",
          title: "Enterprise WebMCP & AI Integrations",
          description: "Deploying machine-readable portfolio endpoints and model context protocol servers for automated B2B partner inquiries.",
          link: "https://devrajsinghtomar.com",
          status: "Testing",
          progress: 95,
          startDate: "2026-04-01",
          lastUpdated: new Date().toISOString().split("T")[0],
          isVisible: true,
          displayOrder: 3,
        },
      ]);
    }

    // 8. Initial Media
    const media = readJsonFile<CmsMediaItem[]>("media.json", []);
    if (media.length === 0) {
      writeJsonFile("media.json", [
        {
          id: "media-1",
          name: "devraj-singh-tomar.jpg",
          url: "/devraj-singh-tomar.jpg",
          type: "image/jpeg",
          size: 145000,
          altText: "Devraj Singh Tomar – Technology Strategist & Entrepreneur Portrait",
          createdAt: new Date().toISOString(),
        },
        {
          id: "media-2",
          name: "og-image.png",
          url: "/og-image.png",
          type: "image/png",
          size: 210000,
          altText: "Devraj Singh Tomar Portfolio OpenGraph Cover",
          createdAt: new Date().toISOString(),
        },
        {
          id: "media-3",
          name: "logo-dark.png",
          url: "/logo-dark.png",
          type: "image/png",
          size: 32000,
          altText: "Devraj Singh Tomar Brand Logo Dark",
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    // 9. Initial Settings
    const settings = readJsonFile<CmsWebsiteSettings | null>("settings.json", null);
    if (!settings) {
      writeJsonFile("settings.json", {
        siteName: "Devraj Singh Tomar",
        titleTemplate: "Devraj Singh Tomar | Technology Strategist & Entrepreneur",
        contactEmail: "hello@devrajsinghtomar.com",
        publicPhone: "+91 9140946121",
        whatsappNumber: "+91 9140946121",
        officeAddress: "chokhani square, 309, Sector 18, Noida, Uttar Pradesh 201301, India",
        copyrightText: "© 2026 Devraj Singh Tomar. All rights reserved.",
        defaultOgImage: "/og-image.png",
      });
    }

    // 10. Initial Homepage Settings
    const homepage = readJsonFile<CmsHomepageSettings | null>("homepage.json", null);
    if (!homepage) {
      writeJsonFile("homepage.json", {
        heroHeadline: "Turning Ideas Into Digital Solutions That Move Businesses Forward.",
        heroSubheadline: "Technology strategist, product architect, and entrepreneur. I identify business bottlenecks, design practical technology solutions, and lead digital initiatives from concept to execution.",
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

    // 11. Initial Profile
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
            title: "Venture Co-Founding & Enterprise Technology Leadership",
            location: "Noida & Pratapgarh",
            desc: "Co-founded Lotus Loop Media Solutions, led M/S Career Avsar systems for 7 Medical Colleges.",
            badge: "Entrepreneurship",
          },
        ],
        philosophy: [
          { num: "01", title: "Understand the Problem First", desc: "Diagnose bottlenecks before picking frameworks." },
          { num: "02", title: "Prioritize Usefulness", desc: "Build clean, modular systems that solve real friction." },
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

  // USER AUTH
  getUsers(): AdminUser[] {
    return readJsonFile<AdminUser[]>("users.json", []);
  }

  getUserById(id: string): AdminUser | undefined {
    return this.getUsers().find((u) => u.id === id);
  }

  getUserByEmail(email: string): AdminUser | undefined {
    return this.getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  updateUser(id: string, updates: Partial<AdminUser>): AdminUser | null {
    const users = this.getUsers();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return null;

    users[idx] = { ...users[idx], ...updates };
    writeJsonFile("users.json", users);
    return users[idx];
  }

  // PROJECTS
  getProjects(): CmsProject[] {
    return readJsonFile<CmsProject[]>("projects.json", []);
  }

  getProjectById(id: string): CmsProject | undefined {
    return this.getProjects().find((p) => p.id === id);
  }

  getProjectBySlug(slug: string): CmsProject | undefined {
    return this.getProjects().find((p) => p.slug === slug);
  }

  saveProject(project: Partial<CmsProject>): CmsProject {
    const projects = this.getProjects();
    const now = new Date().toISOString();

    if (project.id) {
      const idx = projects.findIndex((p) => p.id === project.id);
      if (idx !== -1) {
        projects[idx] = { ...projects[idx], ...project, updatedAt: now } as CmsProject;
        writeJsonFile("projects.json", projects);
        return projects[idx];
      }
    }

    const newProject: CmsProject = {
      id: `proj-${Date.now()}`,
      slug: project.slug || `project-${Date.now()}`,
      name: project.name || "Untitled Project",
      url: project.url || "",
      category: project.category || "General",
      industry: project.industry || "Technology",
      role: project.role || "Technology Strategist",
      desc: project.desc || "",
      tech: project.tech || [],
      impact: project.impact || "",
      featured: project.featured ?? false,
      status: project.status || "published",
      hasCaseStudy: project.hasCaseStudy ?? false,
      caseStudy: project.caseStudy,
      createdAt: now,
      updatedAt: now,
    };

    projects.unshift(newProject);
    writeJsonFile("projects.json", projects);
    return newProject;
  }

  deleteProject(id: string): boolean {
    const projects = this.getProjects();
    const filtered = projects.filter((p) => p.id !== id);
    if (filtered.length !== projects.length) {
      writeJsonFile("projects.json", filtered);
      return true;
    }
    return false;
  }

  // ARTICLES
  getArticles(): CmsArticle[] {
    return readJsonFile<CmsArticle[]>("articles.json", []);
  }

  getArticleById(id: string): CmsArticle | undefined {
    return this.getArticles().find((a) => a.id === id);
  }

  getArticleBySlug(slug: string): CmsArticle | undefined {
    return this.getArticles().find((a) => a.slug === slug);
  }

  saveArticle(article: Partial<CmsArticle>): CmsArticle {
    const articles = this.getArticles();
    const now = new Date().toISOString();

    if (article.id) {
      const idx = articles.findIndex((a) => a.id === article.id);
      if (idx !== -1) {
        articles[idx] = { ...articles[idx], ...article, updatedAt: now } as CmsArticle;
        writeJsonFile("articles.json", articles);
        return articles[idx];
      }
    }

    const newArticle: CmsArticle = {
      id: `post-${Date.now()}`,
      slug: article.slug || `article-${Date.now()}`,
      title: article.title || "Untitled Article",
      description: article.description || "",
      keywords: article.keywords || [],
      date: article.date || new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      dateISO: article.dateISO || now.split("T")[0],
      readTime: article.readTime || "5 min read",
      category: article.category || "Technology",
      content: article.content || "<p>Start writing article content...</p>",
      coverImage: article.coverImage || "/og-image.png",
      status: article.status || "published",
      featured: article.featured ?? false,
      createdAt: now,
      updatedAt: now,
    };

    articles.unshift(newArticle);
    writeJsonFile("articles.json", articles);
    return newArticle;
  }

  deleteArticle(id: string): boolean {
    const articles = this.getArticles();
    const filtered = articles.filter((a) => a.id !== id);
    if (filtered.length !== articles.length) {
      writeJsonFile("articles.json", filtered);
      return true;
    }
    return false;
  }

  // VENTURES
  getVentures(): CmsVenture[] {
    return readJsonFile<CmsVenture[]>("ventures.json", []);
  }

  getVentureById(id: string): CmsVenture | undefined {
    return this.getVentures().find((v) => v.id === id);
  }

  saveVenture(venture: Partial<CmsVenture>): CmsVenture {
    const ventures = this.getVentures();
    if (venture.id) {
      const idx = ventures.findIndex((v) => v.id === venture.id);
      if (idx !== -1) {
        ventures[idx] = { ...ventures[idx], ...venture } as CmsVenture;
        writeJsonFile("ventures.json", ventures);
        return ventures[idx];
      }
    }

    const newVenture: CmsVenture = {
      id: `vent-${Date.now()}`,
      name: venture.name || "Untitled Venture",
      category: venture.category || "Company",
      type: venture.type || "business",
      industry: venture.industry || "Technology",
      role: venture.role || "Partner",
      status: venture.status || "Active",
      statusColor: venture.statusColor || "text-green-400 bg-green-500/10 border-green-500/20",
      website: venture.website || "",
      domain: venture.domain || "",
      desc: venture.desc || "",
      contributions: venture.contributions || [],
      caseStudySlug: venture.caseStudySlug,
      caseStudyName: venture.caseStudyName,
      displayOrder: venture.displayOrder || ventures.length + 1,
      isPublished: venture.isPublished ?? true,
    };

    ventures.push(newVenture);
    writeJsonFile("ventures.json", ventures);
    return newVenture;
  }

  deleteVenture(id: string): boolean {
    const ventures = this.getVentures();
    const filtered = ventures.filter((v) => v.id !== id);
    if (filtered.length !== ventures.length) {
      writeJsonFile("ventures.json", filtered);
      return true;
    }
    return false;
  }

  // INQUIRIES
  getInquiries(): CmsInquiry[] {
    return readJsonFile<CmsInquiry[]>("inquiries.json", []);
  }

  getInquiryById(id: string): CmsInquiry | undefined {
    return this.getInquiries().find((inq) => inq.id === id);
  }

  createInquiry(data: {
    name: string;
    email: string;
    phone?: string;
    organization?: string;
    subject?: string;
    message: string;
    source?: string;
  }): CmsInquiry {
    const inquiries = this.getInquiries();
    const now = new Date().toISOString();
    const refNumber = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `INQ-2026-${refNumber}`;

    const newInquiry: CmsInquiry = {
      id: `inq-${Date.now()}`,
      referenceId,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      organization: data.organization || "",
      subject: data.subject || "General Consultation",
      message: data.message,
      source: data.source || "contact-form",
      status: "New",
      createdAt: now,
      updatedAt: now,
    };

    inquiries.unshift(newInquiry);
    writeJsonFile("inquiries.json", inquiries);
    return newInquiry;
  }

  updateInquiry(id: string, updates: Partial<CmsInquiry>): CmsInquiry | null {
    const inquiries = this.getInquiries();
    const idx = inquiries.findIndex((i) => i.id === id);
    if (idx === -1) return null;

    inquiries[idx] = { ...inquiries[idx], ...updates, updatedAt: new Date().toISOString() };
    writeJsonFile("inquiries.json", inquiries);
    return inquiries[idx];
  }

  deleteInquiry(id: string): boolean {
    const inquiries = this.getInquiries();
    const filtered = inquiries.filter((i) => i.id !== id);
    if (filtered.length !== inquiries.length) {
      writeJsonFile("inquiries.json", filtered);
      return true;
    }
    return false;
  }

  // TESTIMONIALS
  getTestimonials(): CmsTestimonial[] {
    return readJsonFile<CmsTestimonial[]>("testimonials.json", []);
  }

  saveTestimonial(test: Partial<CmsTestimonial>): CmsTestimonial {
    const list = this.getTestimonials();
    if (test.id) {
      const idx = list.findIndex((t) => t.id === test.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...test } as CmsTestimonial;
        writeJsonFile("testimonials.json", list);
        return list[idx];
      }
    }

    const newItem: CmsTestimonial = {
      id: `test-${Date.now()}`,
      name: test.name || "Anonymous",
      designation: test.designation || "Leader",
      organization: test.organization || "Company",
      content: test.content || "",
      photo: test.photo || "",
      relatedProject: test.relatedProject || "",
      displayOrder: test.displayOrder || list.length + 1,
      status: test.status || "draft",
    };
    list.push(newItem);
    writeJsonFile("testimonials.json", list);
    return newItem;
  }

  deleteTestimonial(id: string): boolean {
    const list = this.getTestimonials();
    const filtered = list.filter((t) => t.id !== id);
    if (filtered.length !== list.length) {
      writeJsonFile("testimonials.json", filtered);
      return true;
    }
    return false;
  }

  // NOW BUILDING
  getNowBuilding(): CmsNowBuilding[] {
    return readJsonFile<CmsNowBuilding[]>("now_building.json", []);
  }

  saveNowBuilding(item: Partial<CmsNowBuilding>): CmsNowBuilding {
    const list = this.getNowBuilding();
    if (item.id) {
      const idx = list.findIndex((n) => n.id === item.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...item, lastUpdated: new Date().toISOString().split("T")[0] } as CmsNowBuilding;
        writeJsonFile("now_building.json", list);
        return list[idx];
      }
    }

    const newItem: CmsNowBuilding = {
      id: `nb-${Date.now()}`,
      title: item.title || "New Initiative",
      description: item.description || "",
      link: item.link || "",
      status: item.status || "In Planning",
      progress: item.progress || 10,
      startDate: item.startDate || new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      isVisible: item.isVisible ?? true,
      displayOrder: item.displayOrder || list.length + 1,
    };
    list.push(newItem);
    writeJsonFile("now_building.json", list);
    return newItem;
  }

  deleteNowBuilding(id: string): boolean {
    const list = this.getNowBuilding();
    const filtered = list.filter((n) => n.id !== id);
    if (filtered.length !== list.length) {
      writeJsonFile("now_building.json", filtered);
      return true;
    }
    return false;
  }

  // MEDIA
  getMediaItems(): CmsMediaItem[] {
    return readJsonFile<CmsMediaItem[]>("media.json", []);
  }

  saveMediaItem(item: Omit<CmsMediaItem, "id" | "createdAt">): CmsMediaItem {
    const list = this.getMediaItems();
    const newItem: CmsMediaItem = {
      id: `media-${Date.now()}`,
      ...item,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newItem);
    writeJsonFile("media.json", list);
    return newItem;
  }

  deleteMediaItem(id: string): boolean {
    const list = this.getMediaItems();
    const item = list.find((m) => m.id === id);
    if (!item) return false;

    // Delete file from disk if it starts with /uploads/
    if (item.url.startsWith("/uploads/")) {
      const localFilePath = path.join(process.cwd(), "public", item.url);
      if (fs.existsSync(localFilePath)) {
        try {
          fs.unlinkSync(localFilePath);
        } catch (e) {
          console.warn("Could not remove file from disk:", e);
        }
      }
    }

    const filtered = list.filter((m) => m.id !== id);
    writeJsonFile("media.json", filtered);
    return true;
  }

  // HOMEPAGE
  getHomepageSettings(): CmsHomepageSettings {
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

  saveHomepageSettings(settings: Partial<CmsHomepageSettings>): CmsHomepageSettings {
    const current = this.getHomepageSettings();
    const updated = { ...current, ...settings };
    writeJsonFile("homepage.json", updated);
    return updated;
  }

  // PROFILE
  getProfile(): CmsProfile {
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

  saveProfile(profile: Partial<CmsProfile>): CmsProfile {
    const current = this.getProfile();
    const updated = { ...current, ...profile };
    writeJsonFile("profile.json", updated);
    return updated;
  }

  // SETTINGS
  getWebsiteSettings(): CmsWebsiteSettings {
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

  saveWebsiteSettings(settings: Partial<CmsWebsiteSettings>): CmsWebsiteSettings {
    const current = this.getWebsiteSettings();
    const updated = { ...current, ...settings };
    writeJsonFile("settings.json", updated);
    return updated;
  }

  // SEO SETTINGS
  getSeoSettings(): CmsSeoSettings {
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

  saveSeoSettings(seo: Partial<CmsSeoSettings>): CmsSeoSettings {
    const current = this.getSeoSettings();
    const updated = { ...current, ...(seo as CmsSeoSettings) };
    writeJsonFile("seo.json", updated);
    return updated;
  }

  // DASHBOARD STATS
  getDashboardStats() {
    const projects = this.getProjects();
    const articles = this.getArticles();
    const ventures = this.getVentures();
    const testimonials = this.getTestimonials();
    const inquiries = this.getInquiries();

    const publishedProjects = projects.filter((p) => p.status === "published").length;
    const draftProjects = projects.filter((p) => p.status === "draft").length;
    const publishedArticles = articles.filter((a) => a.status === "published").length;
    const draftArticles = articles.filter((a) => a.status === "draft").length;
    const unreadInquiries = inquiries.filter((i) => i.status === "New").length;

    return {
      totalProjects: projects.length,
      publishedProjects,
      draftProjects,
      totalArticles: articles.length,
      publishedArticles,
      draftArticles,
      totalVentures: ventures.length,
      totalTestimonials: testimonials.length,
      totalInquiries: inquiries.length,
      unreadInquiries,
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
