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
      'Official government authorization that permits healthcare professionals to legally practice in Abu Dhabi and Al Ain.',
    tags: ['DHA', 'General Practitioners', 'Specialists', 'Consultants'],
    href: '/ae/services#certifications',
    icon: 'stethoscope',
    image: '/images/services/doh-licensing.webp',
    imageAlt:
      'Modern Abu Dhabi healthcare authority medical center exterior with glass facade and palm trees',
    imageWidth: 800,
    imageHeight: 597,
  },
  {
    id: 'pro-service',
    title: 'PRO Service',
    description:
      'Reliable and efficient PRO services in Abu Dhabi for visa processing, trade license renewal and document clearing.',
    tags: [
      'Visa Applications',
      'Trade License',
      'Emirates ID',
      'Document Clearing',
    ],
    href: '/ae/services#pro-services',
    icon: 'layers',
    image: '/images/services/pro-service.webp',
    imageAlt:
      'Modern Abu Dhabi government services and corporate business center building exterior',
    imageWidth: 800,
    imageHeight: 597,
  },
  {
    id: 'family-visa',
    title: 'Family Visa',
    description:
      'Apply for a UAE Family Residence Visa to sponsor your wife, husband or children in Abu Dhabi.',
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
      'Emirati family walking together on a sunlit waterfront promenade with Dubai skyline in the background',
    imageWidth: 800,
    imageHeight: 536,
  },
  {
    id: 'vat-filing',
    title: 'VAT Registration & Filing',
    description:
      'Seamless Value Added Tax management and compliance support for your business.',
    tags: ['Corporate Tax', 'VAT UAE', 'FTA Compliance', 'Business Growth'],
    href: '/ae/services#business-setup',
    icon: 'percent',
    image: '/images/services/vat-filing.webp',
    imageAlt:
      'Financial tax compliance documents, calculator, fountain pen, and laptop on an executive desk',
    imageWidth: 800,
    imageHeight: 597,
  },
];
