/* ===================================================================
 * Trust & Recognition — Evidence Atelier V2 Data
 * ===================================================================
 * Data-driven evidence categories and sample documents.
 * All entries are SAMPLE placeholders for design demonstration only.
 * Never publish invented certifications, fake credentials or
 * fabricated regulatory approvals.
 * =================================================================== */

export type EvidenceCategoryKey =
  | 'certifications'
  | 'partnerships'
  | 'recognition'
  | 'client-trust';

export interface EvidenceDocument {
  id: string;
  categoryLabel: string;
  title: string;
  sampleLabel: string;
  sampleStatement: string;
  issuer: string;
  description: string;
  issueDate: string;
  validUntil: string;
  refNo: string;
  status: 'sample';
}

export interface EvidenceCategory {
  key: EvidenceCategoryKey;
  label: string;
  documents: readonly EvidenceDocument[];
}

export const EVIDENCE_CATEGORIES: readonly EvidenceCategory[] = [
  {
    key: 'certifications',
    label: 'Certifications',
    documents: [
      {
        id: 'cert-service',
        categoryLabel: 'SERVICE CERTIFICATION',
        title: 'Service Certification',
        sampleLabel: 'SAMPLE CERTIFICATE',
        sampleStatement:
          'This is a sample certificate for design demonstration purposes only.',
        issuer: 'Takhlees Business Services (Sample)',
        description:
          'A sample certification that validates our authorisation to deliver business services across the UAE.',
        issueDate: '01 Jan 2026',
        validUntil: '31 Dec 2026 (Sample)',
        refNo: 'TK-DS-001',
        status: 'sample',
      },
      {
        id: 'cert-quality',
        categoryLabel: 'QUALITY ASSURANCE',
        title: 'Quality Assurance Certificate',
        sampleLabel: 'SAMPLE CERTIFICATE',
        sampleStatement:
          'This is a sample quality document for design demonstration purposes only.',
        issuer: 'Standards Review Board (Sample)',
        description:
          'Demonstrates structured quality management workflows across corporate PRO and documentation services.',
        issueDate: '15 Feb 2026',
        validUntil: '31 Dec 2026 (Sample)',
        refNo: 'TK-QA-002',
        status: 'sample',
      },
      {
        id: 'cert-compliance',
        categoryLabel: 'COMPLIANCE RECORD',
        title: 'Compliance & Governance',
        sampleLabel: 'SAMPLE CERTIFICATE',
        sampleStatement:
          'This is a sample compliance record for design demonstration purposes only.',
        issuer: 'Regulatory Liaison Desk (Sample)',
        description:
          'Illustrates alignment with UAE federal and emirate-level corporate documentation procedures.',
        issueDate: '01 Mar 2026',
        validUntil: '31 Dec 2026 (Sample)',
        refNo: 'TK-CG-003',
        status: 'sample',
      },
    ],
  },
  {
    key: 'partnerships',
    label: 'Partnerships',
    documents: [
      {
        id: 'part-gov',
        categoryLabel: 'PARTNERSHIP CERTIFICATE',
        title: 'Government Liaison Charter',
        sampleLabel: 'SAMPLE CERTIFICATE',
        sampleStatement:
          'This is a sample partnership charter for design demonstration purposes only.',
        issuer: 'UAE Service Network (Sample)',
        description:
          'An illustrative service partnership charter representing structured coordination for client documentation.',
        issueDate: '10 Jan 2026',
        validUntil: '31 Dec 2026 (Sample)',
        refNo: 'TK-PR-011',
        status: 'sample',
      },
      {
        id: 'part-freezone',
        categoryLabel: 'FREE ZONE ALLIANCE',
        title: 'Free Zone Collaboration',
        sampleLabel: 'SAMPLE CERTIFICATE',
        sampleStatement:
          'This is a sample alliance record for design demonstration purposes only.',
        issuer: 'Free Zone Desk (Sample)',
        description:
          'Representative collaboration record supporting streamlined mainland and free zone business setup.',
        issueDate: '20 Feb 2026',
        validUntil: '31 Dec 2026 (Sample)',
        refNo: 'TK-FZ-012',
        status: 'sample',
      },
    ],
  },
  {
    key: 'recognition',
    label: 'Recognition',
    documents: [
      {
        id: 'rec-excellence',
        categoryLabel: 'RECOGNITION CERTIFICATE',
        title: 'Service Excellence Award',
        sampleLabel: 'SAMPLE CERTIFICATE',
        sampleStatement:
          'This is a sample recognition award for design demonstration purposes only.',
        issuer: 'Business Excellence Forum (Sample)',
        description:
          'Sample recognition highlighting consistent delivery of corporate setup and PRO advisory services.',
        issueDate: '05 Apr 2026',
        validUntil: '31 Dec 2026 (Sample)',
        refNo: 'TK-RC-021',
        status: 'sample',
      },
      {
        id: 'rec-community',
        categoryLabel: 'COMMUNITY CITATION',
        title: 'Enterprise Support Citation',
        sampleLabel: 'SAMPLE CERTIFICATE',
        sampleStatement:
          'This is a sample citation for design demonstration purposes only.',
        issuer: 'UAE Enterprise Council (Sample)',
        description:
          'Representative citation acknowledging guidance and operational support for growing UAE enterprises.',
        issueDate: '12 May 2026',
        validUntil: '31 Dec 2026 (Sample)',
        refNo: 'TK-RC-022',
        status: 'sample',
      },
    ],
  },
  {
    key: 'client-trust',
    label: 'Client Trust',
    documents: [
      {
        id: 'trust-retention',
        categoryLabel: 'CLIENT TRUST RECORD',
        title: 'Long-Term Client Retention',
        sampleLabel: 'SAMPLE RECORD',
        sampleStatement:
          'This is a sample trust record for design demonstration purposes only.',
        issuer: 'Takhlees Client Archive (Sample)',
        description:
          'Illustrative record reflecting multi-year client partnerships built on transparency and dependable service.',
        issueDate: '01 Jan 2026',
        validUntil: 'Ongoing (Sample)',
        refNo: 'TK-CT-031',
        status: 'sample',
      },
      {
        id: 'trust-referral',
        categoryLabel: 'CLIENT ENDORSEMENT',
        title: 'Client Referral Charter',
        sampleLabel: 'SAMPLE RECORD',
        sampleStatement:
          'This is a sample endorsement record for design demonstration purposes only.',
        issuer: 'Partner Feedback Archive (Sample)',
        description:
          'Representative overview of client-referred corporate engagements across Dubai and the wider UAE.',
        issueDate: '18 Mar 2026',
        validUntil: 'Ongoing (Sample)',
        refNo: 'TK-CT-032',
        status: 'sample',
      },
    ],
  },
] as const;
