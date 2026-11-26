import { apiClient } from '@/lib/api/client';
import type { BlogArticle, PaginatedBlogResult } from './types';

export const JOURNAL_PAGE_SIZE = 3;
export const LANDING_JOURNAL_LIMIT = 6;

/**
 * Curated UAE corporate journal articles using verified project imagery.
 * Ordered newest-first; used as SSR fallback when the Django blog endpoint is not yet mounted.
 */
export const UAE_BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'cctv-permit-abu-dhabi-admcc-2026',
    slug: 'cctv-permit-abu-dhabi-admcc-2026-guide',
    title: 'CCTV Permit Abu Dhabi: The Complete 2026 ADMCC Guide',
    excerpt:
      'Every commercial premises in Abu Dhabi emirate needs an ADMCC-approved CCTV permit before you open, renew your trade licence, or pass your municipality inspection.',
    content: [
      'Commercial establishments operating across Abu Dhabi mainland and designated economic zones are required to maintain compliant surveillance systems certified by the Abu Dhabi Monitoring and Control Center (ADMCC).',
      'Before applying for a new trade licence or completing an annual renewal, businesses must engage an ADMCC-registered security contractor to design camera coverage, retention capacity, and network specifications.',
      'Once installation is verified, Takhlees Business coordinates the technical submission, inspection scheduling, and final clearance certificate so your municipality approval proceeds without delays.',
    ],
    category: 'CCTV Permit',
    categoryIcon: 'shield',
    publishedAt: '2026-06-30',
    formattedDate: 'Tue, Jun 30, 2026',
    readingTimeMinutes: 8,
    image: '/images/corporate-towers.jpg',
    imageAlt: 'Commercial towers in Abu Dhabi requiring ADMCC CCTV permit compliance',
    author: {
      name: 'Takhlees Regulatory Desk',
      role: 'Compliance & Licensing Advisory',
    },
  },
  {
    id: 'uae-trade-licence-2026-guide',
    slug: 'uae-trade-licence-2026-abu-dhabi-dubai-guide',
    title:
      'UAE Trade Licence 2026: Complete Step-by-Step Guide for Abu Dhabi & Dubai',
    excerpt:
      'Compare mainland DED and free zone trade licence structures, initial approvals, MOA notarisation, and Ejari or Tawtheeq lease requirements across the UAE.',
    content: [
      'Selecting the right UAE trade licence category—commercial, professional, or industrial—determines your permitted business activities, office footprint, and visa quota.',
      'In Abu Dhabi (ADDED) and Dubai (DET), investors must complete trade name reservation, initial approval, and tenancy registration (Tawtheeq or Ejari) before final licence issuance.',
      'Our PRO specialists handle activity classification, local service agent structuring where applicable, and ministry clearances from start to finish.',
    ],
    category: 'Trade Licence',
    categoryIcon: 'file',
    publishedAt: '2026-06-01',
    formattedDate: 'Mon, Jun 1, 2026',
    readingTimeMinutes: 7,
    image: '/images/services/pro-service.webp',
    imageAlt: 'UAE corporate trade licence documents and executive workspace',
    author: {
      name: 'Takhlees Corporate Setup Team',
      role: 'Business Formation Specialists',
    },
  },
  {
    id: 'doh-license-abu-dhabi-healthcare-2026',
    slug: 'doh-license-abu-dhabi-healthcare-professionals-2026',
    title:
      'DOH License in Abu Dhabi: The Complete 2026 Guide for Healthcare Professionals',
    excerpt:
      'Understand DataFlow primary source verification, Prometric exam eligibility, and facility linking for physicians, nurses, and allied health specialists in Abu Dhabi.',
    content: [
      'Healthcare practitioners seeking to practice in Abu Dhabi must obtain a Department of Health (DOH) professional licence prior to clinical onboarding.',
      'The licensing journey begins with DataFlow Primary Source Verification (PSV) of academic degrees, experience letters, and good standing certificates, followed by credential evaluation and assessment.',
      'Takhlees Business manages end-to-end DOH portal submissions, clinic facility approvals, and visa coordination for medical groups and practitioners.',
    ],
    category: 'DOH License',
    categoryIcon: 'stethoscope',
    publishedAt: '2026-05-23',
    formattedDate: 'Sat, May 23, 2026',
    readingTimeMinutes: 10,
    image: '/images/services/doh-licensing.webp',
    imageAlt: 'Healthcare licensing and DOH compliance preparation in Abu Dhabi',
    author: {
      name: 'Takhlees Healthcare Desk',
      role: 'Medical Licensing Advisors',
    },
  },
  {
    id: 'foreign-entrepreneurs-start-business-abu-dhabi-2026',
    slug: 'foreign-entrepreneurs-start-business-abu-dhabi-2026',
    title:
      'How Foreign Entrepreneurs Can Start a Business in Abu Dhabi in 2026',
    excerpt:
      'A practical roadmap covering 100% foreign ownership rules, investor residence visas, corporate bank account readiness, and VAT registration thresholds.',
    content: [
      'International founders can establish 100% foreign-owned mainland LLCs across more than a thousand commercial and industrial activities in Abu Dhabi without a local sponsor.',
      'Key milestones include choosing the optimal legal form, securing investor visas and Emirates IDs, and preparing compliant KYC packages for UAE corporate banking.',
      'Working with an experienced PRO partner ensures every ministry, chamber of commerce, and immigration step stays aligned.',
    ],
    category: 'Business Setup',
    categoryIcon: 'briefcase',
    publishedAt: '2026-05-21',
    formattedDate: 'Thu, May 21, 2026',
    readingTimeMinutes: 8,
    image: '/images/consultation/uae-consultation.webp',
    imageAlt: 'Foreign entrepreneur consulting with UAE business setup advisor',
    author: {
      name: 'Takhlees Advisory Board',
      role: 'UAE Market Entry Team',
    },
  },
  {
    id: 'uae-corporate-tax-vat-filing-2026',
    slug: 'uae-corporate-tax-vat-filing-compliance-2026',
    title:
      'UAE Corporate Tax & VAT Filing Checklist for Mainland & Free Zone Entities',
    excerpt:
      'Stay ahead of Federal Tax Authority deadlines with clean bookkeeping, qualifying free zone income rules, and timely VAT return reconciliations.',
    content: [
      'Registered UAE businesses must maintain accurate VAT ledgers, tax invoices, and corporate tax computations aligned with Federal Tax Authority (FTA) regulations.',
      'Even Qualifying Free Zone Persons must file annual corporate tax returns and demonstrate adequate substance to preserve preferential tax treatment.',
      'Takhlees Business coordinates FTA portal filings, TRN updates, and documentation audits for SMEs and growing enterprises.',
    ],
    category: 'VAT & Tax',
    categoryIcon: 'building',
    publishedAt: '2026-05-12',
    formattedDate: 'Tue, May 12, 2026',
    readingTimeMinutes: 6,
    image: '/images/services/vat-filing.webp',
    imageAlt: 'UAE corporate tax and VAT filing financial documentation',
    author: {
      name: 'Takhlees Compliance Desk',
      role: 'Tax & Regulatory Operations',
    },
  },
  {
    id: 'uae-family-golden-visa-sponsorship-2026',
    slug: 'uae-family-golden-visa-sponsorship-requirements-2026',
    title:
      'UAE Family & Golden Visa Sponsorship: Attestation & Renewal Essentials',
    excerpt:
      'Everything residents and business owners need to know about MOFA attestation, Emirates ID biometrics, medical fitness, and dependant visa renewals.',
    content: [
      'Sponsoring spouses, children, or parents in the UAE requires properly attested marriage and birth certificates, active tenancy contracts, and salary or investor documentation.',
      'Preparing MOFA and embassy attestations in advance eliminates common ICP/GDRFA application returns during entry permit issuance.',
      'Our typing and PRO team handles document clearing, medical typing, and Emirates ID scheduling across all emirates.',
    ],
    category: 'Visa Services',
    categoryIcon: 'file',
    publishedAt: '2026-04-28',
    formattedDate: 'Tue, Apr 28, 2026',
    readingTimeMinutes: 7,
    image: '/images/services/family-visa.webp',
    imageAlt: 'UAE family visa and residency documentation support',
    author: {
      name: 'Takhlees Immigration Desk',
      role: 'Visa & Residency Specialists',
    },
  },
  {
    id: 'icv-certification-abu-dhabi-tenders-2026',
    slug: 'icv-certification-abu-dhabi-government-tenders-2026',
    title:
      'ICV Certification in UAE: Boosting Your Score for Government Tenders',
    excerpt:
      'How In-Country Value (ICV) certification works for ADNOC and Abu Dhabi government suppliers, and the audited financials required to apply.',
    content: [
      'In-Country Value (ICV) certification is a decisive factor when bidding on ADNOC and semi-government contracts across the UAE.',
      'Your ICV score evaluates local procurement, Emiratisation, investment, and revenue retention based on audited financial statements.',
      'Takhlees Business assists suppliers with document preparation, auditor coordination, and renewal tracking.',
    ],
    category: 'Business Setup',
    categoryIcon: 'briefcase',
    publishedAt: '2026-04-14',
    formattedDate: 'Tue, Apr 14, 2026',
    readingTimeMinutes: 6,
    image: '/images/document-signing.jpg',
    imageAlt: 'Executive signing UAE ICV certification and tender compliance documents',
    author: {
      name: 'Takhlees Advisory Board',
      role: 'Government Tender Readiness',
    },
  },
  {
    id: 'tasheel-amer-tawjeeh-pro-clearing-2026',
    slug: 'tasheel-amer-tawjeeh-pro-document-clearing-2026',
    title:
      'Tasheel, Amer & Tawjeeh: Navigating UAE Labour & Immigration Workflows',
    excerpt:
      'Streamline employee offer letters, work permits, and establishment card renewals with unified PRO document clearing.',
    content: [
      'Managing workforce onboarding in the UAE involves coordinated submissions across MOHRE (Tasheel/Tawjeeh) and immigration portals (ICP/Amer).',
      'Keeping establishment cards, labour quotas, and WPS payroll compliance synchronized prevents administrative fines and hiring freezes.',
      'Takhlees Business provides dedicated PRO retainers tailored for high-growth teams across Abu Dhabi and Dubai.',
    ],
    category: 'PRO Services',
    categoryIcon: 'building',
    publishedAt: '2026-04-02',
    formattedDate: 'Thu, Apr 2, 2026',
    readingTimeMinutes: 5,
    image: '/images/business-handshake.jpg',
    imageAlt: 'Corporate partners completing UAE PRO and labour approvals',
    author: {
      name: 'Takhlees PRO Operations',
      role: 'Government Liaison Team',
    },
  },
];

/**
 * Splits articles into 1 pinned Featured Article + paginated Supporting Cards
 * (default 3 per page):
 * - 0 articles -> empty state (featured: null, supporting: [], totalPages: 0)
 * - 1 article  -> featured only, 0 supporting cards, totalPages: 0
 * - 2+ articles -> featured = articles[0], supportingPool = articles.slice(1)
 *   paginated by `pageSize` (e.g. 7 supporting -> Page 1: 3, Page 2: 3, Page 3: 1).
 * Never fabricates placeholders or duplicates articles across pages.
 */
export function paginateBlogArticles(
  articles: readonly BlogArticle[],
  requestedPage: number,
  pageSize: number = JOURNAL_PAGE_SIZE
): PaginatedBlogResult {
  const safePageSize = Math.max(1, pageSize);
  const totalItems = articles.length;

  if (totalItems === 0) {
    return {
      items: [],
      featured: null,
      supporting: [],
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      hasPrevious: false,
      hasNext: false,
    };
  }

  const featured = articles[0] ?? null;
  const supportingPool = articles.slice(1);

  if (supportingPool.length === 0) {
    return {
      items: featured ? [featured] : [],
      featured,
      supporting: [],
      currentPage: 1,
      totalPages: 0,
      totalItems,
      hasPrevious: false,
      hasNext: false,
    };
  }

  const totalPages = Math.ceil(supportingPool.length / safePageSize);
  const currentPage = Math.min(Math.max(1, Math.floor(requestedPage)), totalPages);
  const start = (currentPage - 1) * safePageSize;
  const supporting = supportingPool.slice(start, start + safePageSize);

  return {
    items: featured ? [featured, ...supporting] : supporting,
    featured,
    supporting,
    currentPage,
    totalPages,
    totalItems,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}

/**
 * Fetches blog articles from the Django API if available, falling back
 * gracefully to verified editorial articles so SSR never fails offline.
 */
export async function getBlogArticles(): Promise<BlogArticle[]> {
  try {
    const response = await apiClient<{ results?: BlogArticle[] } | BlogArticle[]>(
      '/blog/articles/',
      { next: { revalidate: 300 } } as RequestInit
    );

    if (Array.isArray(response) && response.length > 0) {
      return response;
    }
    if (
      !Array.isArray(response) &&
      Array.isArray(response.results) &&
      response.results.length > 0
    ) {
      return response.results;
    }
  } catch {
    // Backend blog endpoint not mounted yet; serve curated verified articles.
  }

  return UAE_BLOG_ARTICLES;
}

/**
 * Returns the curated latest articles for the landing-page journal showcase
 * (capped at 6 latest articles so pagination stays concise and fast).
 */
export async function getLandingBlogArticles(
  limit: number = LANDING_JOURNAL_LIMIT
): Promise<BlogArticle[]> {
  const articles = await getBlogArticles();
  return articles.slice(0, Math.max(0, limit));
}

export async function getBlogArticleBySlug(
  slug: string
): Promise<BlogArticle | null> {
  const articles = await getBlogArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}
