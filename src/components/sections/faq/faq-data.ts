export type FaqCategoryId =
  | 'general'
  | 'company-setup'
  | 'pro-services'
  | 'visas'
  | 'documentation';

export interface FaqCategory {
  id: FaqCategoryId;
  label: string;
  shortLabel: string;
  description: string;
}

export interface FaqItem {
  id: string;
  category: FaqCategoryId;
  question: string;
  answer: string;
  linkLabel?: string;
  linkHref?: string;
}

export const FAQ_PAGE_SIZE = 5;

export interface PaginatedFaqResult {
  items: FaqItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function paginateFaqItems(
  items: readonly FaqItem[],
  page: number,
  pageSize: number = FAQ_PAGE_SIZE
): PaginatedFaqResult {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    currentPage,
    totalPages,
    totalItems,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    id: 'general',
    label: 'General',
    shortLabel: 'General',
    description: 'Core guidance on starting a business in the UAE and working with Takhlees.',
  },
  {
    id: 'company-setup',
    label: 'Company Setup',
    shortLabel: 'Setup',
    description: 'Mainland vs. Free Zone formation, trade licences, ownership, and office rules.',
  },
  {
    id: 'pro-services',
    label: 'PRO Services',
    shortLabel: 'PRO',
    description: 'Government liaison, corporate approvals, renewals, and regulatory compliance.',
  },
  {
    id: 'visas',
    label: 'Visas',
    shortLabel: 'Visas',
    description: 'Investor, employment, and family residence visa processing in the UAE.',
  },
  {
    id: 'documentation',
    label: 'Documentation',
    shortLabel: 'Docs',
    description: 'Document attestation, legal Arabic typing, and official government submissions.',
  },
] as const;

export const FAQ_ITEMS: readonly FaqItem[] = [
  // GENERAL (5)
  {
    id: 'gen-foreign-investor',
    category: 'general',
    question: 'How can I start a business in the UAE as a foreign investor?',
    answer:
      'Choose your jurisdiction (Mainland or Free Zone), select approved business activities, reserve a trade name, and secure authority approvals. Requirements vary by emirate and activity, and Takhlees handles every step through licence issuance.',
    linkLabel: 'Explore Business Setup Services',
    linkHref: '/ae/services',
  },
  {
    id: 'gen-main-steps',
    category: 'general',
    question: 'What are the main steps involved in establishing a UAE business?',
    answer:
      'The core flow covers legal structure selection, trade name reservation, initial approval, registered lease setup (Ejari or Tawtheeq), constitutional signing, and licence fee payment. Regulated sectors may require extra authority sign-offs.',
    linkLabel: 'Request a Consultation',
    linkHref: '/ae/contact',
  },
  {
    id: 'gen-takhlees-end-to-end',
    category: 'general',
    question: 'Can Takhlees assist with the complete business setup process?',
    answer:
      'Yes. Takhlees Transactions LLC manages Mainland and Free Zone company formation, trade licence renewals, corporate PRO services, Arabic typing, attestation, and visas across Abu Dhabi, Dubai, and the UAE.',
    linkLabel: 'View Our UAE Branches',
    linkHref: '/ae/branches',
  },
  {
    id: 'gen-emirates-served',
    category: 'general',
    question: 'Which emirates does Takhlees serve across the UAE?',
    answer:
      'Takhlees supports clients across Abu Dhabi, Dubai, and wider UAE emirates through our corporate PRO and documentation desks, handling Mainland and Free Zone licensing, visa workflows, and government approvals.',
    linkLabel: 'Find a Branch Near You',
    linkHref: '/ae/branches',
  },
  {
    id: 'gen-remote-setup',
    category: 'general',
    question: 'Can I manage my UAE company setup or renewals remotely?',
    answer:
      'Many initial name reservations, document reviews, and government portal submissions can be coordinated remotely. Certain steps—such as Emirates ID biometrics, medical fitness tests, or bank KYC—may require physical presence depending on authority rules.',
    linkLabel: 'Speak with an Advisor',
    linkHref: '/ae/contact',
  },

  // COMPANY SETUP (5)
  {
    id: 'setup-mainland-vs-freezone',
    category: 'company-setup',
    question: 'What is the difference between Mainland and Free Zone company formation?',
    answer:
      'Mainland companies (licensed by ADDED or DET) can trade directly across the UAE local market and bid on government tenders. Free Zone entities operate within designated zones with sector benefits and specific rules for local Mainland trade.',
    linkLabel: 'Compare Setup Options',
    linkHref: '/ae/services',
  },
  {
    id: 'setup-licence-timeline',
    category: 'company-setup',
    question: 'How long does it take to obtain a UAE trade licence?',
    answer:
      'Timelines depend on your jurisdiction, legal structure, business activity, and external approvals. Standard commercial activities with complete documents progress faster than regulated sectors like healthcare or industrial operations.',
    linkLabel: 'Check Your Activity Timeline',
    linkHref: '/ae/contact',
  },
  {
    id: 'setup-required-documents',
    category: 'company-setup',
    question: 'What documents are required to establish a company in the UAE?',
    answer:
      'You typically need shareholder and manager passport copies, Emirates ID/visa copies (if resident), proposed trade names, activity details, and a registered lease or flexi-desk contract. Corporate shareholders require attested incorporation documents.',
    linkLabel: 'View Documentation Support',
    linkHref: '/ae/services',
  },
  {
    id: 'setup-100-ownership',
    category: 'company-setup',
    question: 'Can foreigners own 100% of a company in the UAE?',
    answer:
      'Yes, 100% foreign ownership is permitted across UAE Free Zones and for most commercial and industrial Mainland activities. Certain strategic or regulated sectors may carry specific local conditions set by the economic department.',
  },
  {
    id: 'setup-cost',
    category: 'company-setup',
    question: 'How much does it cost to establish a company in the UAE?',
    answer:
      'Setup costs depend on the emirate, Mainland versus Free Zone jurisdiction, office type, visa quota, and external approvals. We provide a transparent, itemized authority fee breakdown tailored to your exact activity.',
    linkLabel: 'Request a Custom Breakdown',
    linkHref: '/ae/contact',
  },

  // PRO SERVICES (5)
  {
    id: 'pro-what-and-why',
    category: 'pro-services',
    question: 'What are PRO services and why does my business need them?',
    answer:
      'PRO services cover official government liaison with MOHRE, ICP/GDRFA, economic departments, and municipalities. Outsourcing PRO work prevents missed renewals, compliance fines, and administrative delays across your licences and visas.',
    linkLabel: 'Explore Corporate PRO Services',
    linkHref: '/ae/services',
  },
  {
    id: 'pro-services-provided',
    category: 'pro-services',
    question: 'What government documentation services does Takhlees provide?',
    answer:
      'We handle trade licence renewals and amendments, establishment cards, MOHRE labour files, employment and family visas, Emirates ID typing, medical scheduling, and DOH healthcare licensing on a per-task or retainer basis.',
    linkLabel: 'Speak with Our PRO Team',
    linkHref: '/ae/contact',
  },
  {
    id: 'pro-attestation-approvals',
    category: 'pro-services',
    question: 'Can Takhlees manage document attestation and government approvals?',
    answer:
      'Yes. We coordinate notary, embassy, and UAE Ministry of Foreign Affairs (MOFAIC) attestations alongside certified Arabic legal translation and external ministry approvals, verifying every step to prevent submission rejections.',
  },
  {
    id: 'pro-monthly-retainers',
    category: 'pro-services',
    question: 'Does Takhlees offer ongoing monthly PRO support for companies?',
    answer:
      'Yes. Businesses can choose per-transaction PRO assistance or ongoing corporate support for recurring trade licence renewals, MOHRE labour updates, establishment card renewals, and employee visa tracking.',
    linkLabel: 'Request Corporate PRO Support',
    linkHref: '/ae/contact',
  },
  {
    id: 'pro-licence-amendments',
    category: 'pro-services',
    question: 'Can Takhlees assist with UAE trade licence amendments and renewals?',
    answer:
      'Yes. We coordinate annual trade licence renewals as well as licence amendments—including activity additions, manager updates, share transfers, and address changes—subject to the relevant economic department or Free Zone authority.',
    linkLabel: 'View Licensing Services',
    linkHref: '/ae/services',
  },

  // VISAS (5)
  {
    id: 'visas-processing-renewals',
    category: 'visas',
    question: 'Can Takhlees assist with UAE visa processing and renewals?',
    answer:
      'Yes. We manage investor, employment, and family residence visa applications and renewals through ICP and GDRFA—covering entry permits, status changes, medical fitness bookings, Emirates ID typing, and residence stamping.',
    linkLabel: 'Explore Visa Services',
    linkHref: '/ae/services',
  },
  {
    id: 'visas-required-documents',
    category: 'visas',
    question: 'What documents are required for UAE visa applications?',
    answer:
      'Applications generally require a valid passport, ICP-compliant photo, and active trade licence/establishment card for corporate visas, or attested marriage/birth certificates, tenancy contract, and income proof for family sponsorship.',
  },
  {
    id: 'visas-employee-sponsorship',
    category: 'visas',
    question: 'Can businesses obtain employment visas for their employees?',
    answer:
      'Yes. Companies with an active trade licence, establishment card, and MOHRE or Free Zone labour quota can sponsor staff. Takhlees manages quota requests, offer letters, labour contracts, and complete onboarding.',
    linkLabel: 'Discuss Employee Visa Quotas',
    linkHref: '/ae/contact',
  },
  {
    id: 'visas-family-sponsorship',
    category: 'visas',
    question: 'Can I sponsor my spouse and children for a UAE residence visa?',
    answer:
      'Eligible UAE residents, investors, and employees who meet minimum income and registered tenancy criteria can sponsor their spouse and children. Exact eligibility and document requirements are set by ICP or GDRFA.',
    linkLabel: 'Explore Family Visa Support',
    linkHref: '/ae/services',
  },
  {
    id: 'visas-renewal-process',
    category: 'visas',
    question: 'What happens during a UAE residence visa renewal?',
    answer:
      'Visa renewal typically includes updating medical fitness results, renewing Emirates ID registration, verifying valid health insurance and sponsor licence status, and submitting the renewal application through ICP or GDRFA before expiry.',
    linkLabel: 'Start Your Visa Renewal',
    linkHref: '/ae/contact',
  },

  // DOCUMENTATION (5)
  {
    id: 'docs-what-is-attestation',
    category: 'documentation',
    question: 'What is document attestation?',
    answer:
      'Document attestation officially verifies the authenticity of signatures and seals so foreign or local documents are accepted by UAE ministries, courts, and immigration. Foreign documents require home-country, UAE Embassy, and MOFAIC attestation.',
    linkLabel: 'Get Attestation Guidance',
    linkHref: '/ae/contact',
  },
  {
    id: 'docs-which-require-attestation',
    category: 'documentation',
    question: 'Which documents require government attestation?',
    answer:
      'Common personal documents include university degrees (for skilled visas or licensing), marriage certificates, and birth certificates. Corporate documents often include Certificates of Incorporation, Memoranda of Association, and Powers of Attorney.',
  },
  {
    id: 'docs-arabic-typing',
    category: 'documentation',
    question: 'Can Takhlees assist with Arabic typing and official submissions?',
    answer:
      'Yes. UAE portals, courts, and ministries require accurate official Arabic forms and legal drafts. Takhlees provides certified Arabic typing, government application preparation, and direct portal submissions across the UAE.',
    linkLabel: 'Visit Our Typing & PRO Desk',
    linkHref: '/ae/branches',
  },
  {
    id: 'docs-translation-vs-mofaic',
    category: 'documentation',
    question: 'What is the difference between certified translation and MOFAIC attestation?',
    answer:
      'Certified legal translation converts a document into official Arabic or English by a Ministry of Justice-licensed translator, whereas MOFAIC attestation verifies the authenticity of official stamps and signatures for UAE legal recognition.',
    linkLabel: 'Ask About Document Clearing',
    linkHref: '/ae/contact',
  },
  {
    id: 'docs-notary-poa',
    category: 'documentation',
    question: 'Can Takhlees coordinate notarization and POA documentation in the UAE?',
    answer:
      'Yes. We assist with preparing and typing Arabic or bilingual Powers of Attorney, board resolutions, and Memoranda of Association for UAE notary public appointments, alongside required pre-checks and supporting filings.',
    linkLabel: 'Schedule Documentation Support',
    linkHref: '/ae/contact',
  },
] as const;
