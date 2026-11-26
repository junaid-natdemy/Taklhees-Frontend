export type ServiceIconName = 'stethoscope' | 'layers' | 'users' | 'percent';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  icon: ServiceIconName;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

export const UAE_SERVICES: ServiceItem[] = [
  {
    id: 'doh-licensing',
    title: 'DOH Professional Licensing',
    description:
      'Department of Health (DOH) licensing support for doctors and healthcare specialists in Abu Dhabi & Al Ain.',
    tags: ['DOH Licensing', 'General Practitioners', 'Specialists', 'Consultants'],
    href: '/ae/services#certifications',
    icon: 'stethoscope',
    image: '/images/services/doh-licensing.webp',
    imageAlt:
      'Abu Dhabi healthcare licensing center exterior representing DOH medical professional registration',
    imageWidth: 800,
    imageHeight: 597,
  },
  {
    id: 'pro-service',
    title: 'PRO Services',
    description:
      'End-to-end PRO services in Abu Dhabi & Dubai for visa processing, trade licence renewal and document clearing.',
    tags: [
      'Visa Processing',
      'Trade Licence',
      'Emirates ID',
      'Document Clearing',
    ],
    href: '/ae/services#pro-services',
    icon: 'layers',
    image: '/images/services/pro-service.webp',
    imageAlt:
      'Abu Dhabi corporate government services center for UAE PRO and trade licence clearing',
    imageWidth: 800,
    imageHeight: 597,
  },
  {
    id: 'family-visa',
    title: 'Family Visa',
    description:
      'Sponsor your spouse or children in the UAE with document attestation, medical scheduling and ICP approvals.',
    tags: [
      'Document Verification',
      'Attestation Guidance',
      'ICP Submission',
      'Medical Scheduling',
      'Emirates ID Coordination',
    ],
    href: '/ae/services#visas',
    icon: 'users',
    image: '/images/services/family-visa.webp',
    imageAlt:
      'Family walking along a UAE waterfront promenade supported by Family Residence Visa services',
    imageWidth: 800,
    imageHeight: 536,
  },
  {
    id: 'vat-filing',
    title: 'VAT Registration & Filing',
    description:
      'Complete UAE VAT registration, return filing, corporate tax setup and FTA compliance for your business.',
    tags: ['Corporate Tax', 'VAT UAE', 'FTA Compliance', 'Tax Returns'],
    href: '/ae/services#business-setup',
    icon: 'percent',
    image: '/images/services/vat-filing.webp',
    imageAlt:
      'UAE VAT registration, corporate tax ledger and Federal Tax Authority compliance documents',
    imageWidth: 800,
    imageHeight: 597,
  },
];
