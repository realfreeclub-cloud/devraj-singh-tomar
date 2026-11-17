export interface AdminUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: "admin" | "editor";
  createdAt: string;
  lastLoginAt?: string;
}

export interface CmsProject {
  id: string;
  slug: string;
  name: string;
  url: string;
  category: string;
  industry: string;
  role: string;
  desc: string;
  tech: string[];
  impact?: string;
  featured: boolean;
  status: "published" | "draft";
  hasCaseStudy: boolean;
  displayOrder?: number;
  caseStudy?: {
    title: string;
    subtitle: string;
    client: string;
    category: string;
    industry: string;
    timeline: string;
    liveUrl: string;
    role: string;
    verifiedImpactBadge: string;
    overview: string;
    challenge: {
      problem: string;
      bottlenecks: string[];
      whyExistingFailed: string;
    };
    solution: {
      strategy: string;
      architectureHighlights: string[];
      keyDecisions: string[];
    };
    myContribution: {
      summary: string;
      responsibilities: string[];
      distinctions: string[];
    };
    systemArchitecture: {
      frontend: string;
      backend: string;
      databaseAndCaching: string;
      securityCompliance: string;
      deploymentInfra: string;
    };
    features: {
      title: string;
      desc: string;
      badge?: string;
    }[];
    results: {
      metrics: { label: string; value: string; detail: string }[];
      qualitative: string[];
    };
    keywords: string[];
    relatedSlugs: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CmsArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  date: string;
  dateISO: string;
  readTime: string;
  category: string;
  content: string;
  coverImage?: string;
  status: "published" | "draft";
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CmsVenture {
  id: string;
  name: string;
  category: string;
  type: "business" | "partnership" | "product" | "milestone";
  industry: string;
  role: string;
  status: string;
  statusColor: string;
  website: string;
  domain: string;
  desc: string;
  contributions: string[];
  caseStudySlug?: string;
  caseStudyName?: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface CmsExpertisePillar {
  id: string;
  num: string;
  title: string;
  tagline: string;
  summary: string;
  capabilities: string[];
  problemsSolved: string[];
  myRoleDistinction: string;
  projects: { name: string; slug: string; note: string }[];
  displayOrder: number;
  isPublished: boolean;
}

export interface CmsInquiry {
  id: string;
  referenceId: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject?: string;
  message: string;
  source: string;
  status: "New" | "Contacted" | "In Discussion" | "Converted" | "Closed" | "Spam";
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CmsTestimonial {
  id: string;
  name: string;
  designation: string;
  organization: string;
  content: string;
  photo?: string;
  relatedProject?: string;
  displayOrder: number;
  status: "published" | "draft";
}

export interface CmsNowBuilding {
  id: string;
  title: string;
  description: string;
  link?: string;
  status: string;
  progress?: number;
  startDate: string;
  lastUpdated: string;
  isVisible: boolean;
  displayOrder: number;
}

export interface CmsMediaItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  altText: string;
  createdAt: string;
}

export interface CmsHomepageSettings {
  heroHeadline: string;
  heroSubheadline: string;
  availabilityText: string;
  isAvailable: boolean;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  featuredProjectSlugs: string[];
  sectionVisibility: {
    snapshot: boolean;
    featuredWork: boolean;
    whatIDo: boolean;
    ventures: boolean;
    howIWork: boolean;
    nowBuilding: boolean;
    insights: boolean;
    contactCta: boolean;
  };
}

export interface CmsProfile {
  fullName: string;
  title: string;
  shortBio: string;
  detailedBio: string;
  profileImage: string;
  location: string;
  experienceYears: string;
  milestones: {
    period: string;
    title: string;
    location: string;
    desc: string;
    badge: string;
  }[];
  philosophy: {
    num: string;
    title: string;
    desc: string;
  }[];
  socialLinks: {
    name: string;
    href: string;
  }[];
}

export interface CmsWebsiteSettings {
  siteName: string;
  titleTemplate: string;
  contactEmail: string;
  publicPhone: string;
  whatsappNumber: string;
  officeAddress: string;
  copyrightText: string;
  defaultOgImage: string;
}

export interface CmsRouteSeo {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export type CmsSeoSettings = Record<string, CmsRouteSeo>;

export interface CmsSession {
  tokenHash: string;
  userId: string;
  username: string;
  email: string;
  role: string;
  ip: string;
  userAgent: string;
  createdAt: string;
  expiresAt: string;
  isRevoked: boolean;
}

export interface CmsLoginAttempt {
  ip: string;
  attempts: number;
  lastAttempt: string;
  lockedUntil?: string;
}
