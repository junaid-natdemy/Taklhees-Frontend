export type ImpactMetricId =
  | 'branches'
  | 'staff'
  | 'collaborations'
  | 'visas'
  | 'customers';

export interface ImpactMetric {
  id: ImpactMetricId;
  value: number;
  suffix: string;
  label: string;
  shortLabel: string;
  description: string;
  highlightTag: string;
  image: string;
  imageAlt: string;
  objectPosition: string;
  accentHue: 'emerald' | 'crimson' | 'gold';
}

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'branches',
    value: 20,
    suffix: '+',
    label: 'Branches',
    shortLabel: '20+ Branches',
    description: 'Offices across the UAE serving you closer',
    highlightTag: 'All 7 Emirates Network',
    image: '/images/impact/branches.webp',
    imageAlt: 'Luxury UAE emerald-glass corporate skyscraper towers',
    objectPosition: '50% 78%',
    accentHue: 'emerald',
  },
  {
    id: 'staff',
    value: 100,
    suffix: '+',
    label: 'Staff',
    shortLabel: '100+ Staff',
    description: 'Dedicated specialists at your service',
    highlightTag: 'Certified PRO Officers',
    image: '/images/impact/staff.webp',
    imageAlt: 'Takhlees Emirati and international business advisory team in office',
    objectPosition: '50% 62%',
    accentHue: 'crimson',
  },
  {
    id: 'collaborations',
    value: 500,
    suffix: '+',
    label: 'Business Collaborations',
    shortLabel: '500+ Collaborations',
    description: 'Trusted partnerships built over the years',
    highlightTag: 'Enterprise & Government Ties',
    image: '/images/impact/collaborations.webp',
    imageAlt: 'Executive corporate partnership handshake overlooking Dubai skyline',
    objectPosition: '50% 52%',
    accentHue: 'emerald',
  },
  {
    id: 'visas',
    value: 1000,
    suffix: '+',
    label: 'Golden Visas & Trade Licenses',
    shortLabel: '1000+ Visas & Licenses',
    description: 'Successfully processed for our clients',
    highlightTag: 'Fast-Track Clearing Desk',
    image: '/images/impact/visas.webp',
    imageAlt: 'Embossed forest-green executive documentation portfolio and brass pen',
    objectPosition: '50% 68%',
    accentHue: 'gold',
  },
  {
    id: 'customers',
    value: 100,
    suffix: 'K+',
    label: 'Happy Customers',
    shortLabel: '100K+ Customers',
    description: 'Satisfied clients across the UAE',
    highlightTag: '99.4% Approval Trust',
    image: '/images/impact/customers.webp',
    imageAlt: 'Smiling international business clients in sunlit UAE corporate lounge',
    objectPosition: '50% 56%',
    accentHue: 'crimson',
  },
];
