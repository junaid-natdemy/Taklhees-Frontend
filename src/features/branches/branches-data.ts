export interface BranchItem {
  id: string;
  sequenceNumber: number;
  slug: string;
  name: string;
  locationLabel: string;
  href: string;
  image?: string;
  phone?: string;
  email?: string;
  isFeatured: boolean;
}

/**
 * Single Canonical Source of Truth for all 17 verified Takhlees branches.
 * Preserves the exact verified branch list and original ordering (1–17).
 * Unverified street addresses, emirate assignments, hours, and phone/email
 * fields are intentionally omitted rather than invented.
 */
export const BRANCHES: readonly BranchItem[] = [
  {
    id: 'mbz-12',
    sequenceNumber: 1,
    slug: 'mbz-12',
    name: 'MBZ 12',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/mbz-12',
    image: '/images/branches/featured-mbz-12.webp',
    isFeatured: true,
  },
  {
    id: 'madina-zayed',
    sequenceNumber: 2,
    slug: 'madina-zayed',
    name: 'Madina Zayed',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/madina-zayed',
    image: '/images/branches/featured-madina-zayed.webp',
    isFeatured: true,
  },
  {
    id: 'al-ain',
    sequenceNumber: 3,
    slug: 'al-ain',
    name: 'Al Ain',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/al-ain',
    image: '/images/branches/featured-al-ain.webp',
    isFeatured: true,
  },
  {
    id: 'mussafah',
    sequenceNumber: 4,
    slug: 'mussafah',
    name: 'Mussafah',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/mussafah',
    isFeatured: false,
  },
  {
    id: 'al-shahama',
    sequenceNumber: 5,
    slug: 'al-shahama',
    name: 'Al Shahama',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/al-shahama',
    isFeatured: false,
  },
  {
    id: 'al-sila',
    sequenceNumber: 6,
    slug: 'al-sila',
    name: 'Al Sila',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/al-sila',
    isFeatured: false,
  },
  {
    id: 'bada-zayed',
    sequenceNumber: 7,
    slug: 'bada-zayed',
    name: 'Bada Zayed',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/bada-zayed',
    isFeatured: false,
  },
  {
    id: 'al-falah',
    sequenceNumber: 8,
    slug: 'al-falah',
    name: 'Al Falah',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/al-falah',
    isFeatured: false,
  },
  {
    id: 'baniyas',
    sequenceNumber: 9,
    slug: 'baniyas',
    name: 'Baniyas',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/baniyas',
    isFeatured: false,
  },
  {
    id: 'khalis',
    sequenceNumber: 10,
    slug: 'khalis',
    name: 'Khalis',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/khalis',
    isFeatured: false,
  },
  {
    id: 'shabiya',
    sequenceNumber: 11,
    slug: 'shabiya',
    name: 'Shabiya',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/shabiya',
    isFeatured: false,
  },
  {
    id: 'y-tower',
    sequenceNumber: 12,
    slug: 'y-tower',
    name: 'Y Tower',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/y-tower',
    isFeatured: false,
  },
  {
    id: 'al-meeda',
    sequenceNumber: 13,
    slug: 'al-meeda',
    name: 'Al Meeda',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/al-meeda',
    isFeatured: false,
  },
  {
    id: 'al-wahdah',
    sequenceNumber: 14,
    slug: 'al-wahdah',
    name: 'Al Wahdah',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/al-wahdah',
    isFeatured: false,
  },
  {
    id: 'zayani',
    sequenceNumber: 15,
    slug: 'zayani',
    name: 'Zayani',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/zayani',
    isFeatured: false,
  },
  {
    id: 'al-zahiyah',
    sequenceNumber: 16,
    slug: 'al-zahiyah',
    name: 'Al Zahiyah',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/al-zahiyah',
    image: '/images/branches/featured-al-zahiyah.webp',
    isFeatured: true,
  },
  {
    id: 'khalidiya',
    sequenceNumber: 17,
    slug: 'khalidiya',
    name: 'Khalidiya',
    locationLabel: 'Takhlees Branch',
    href: '/ae/branches/khalidiya',
    image: '/images/branches/featured-khalidiya.webp',
    isFeatured: true,
  },
] as const;

export function formatBranchSequence(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}
