import type { LandPalette } from '@/components/ui/polaroid-line-carousel';

export interface FeaturedBranchItem {
  id: string;
  slug: string;
  name: string;
  locationLabel: string;
  image: string;
  mapUrl: string;
  href: string;
  palette: LandPalette;
  seed: number;
  alt: string;
}

const mapsSearchUrl = (branchName: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Takhlees ${branchName} UAE`
  )}`;

/**
 * Curated subset of 5 verified branches for Section 02 (Featured Branch Experience).
 * Uses strictly verified branch names; full 17-branch directory belongs in Section 03.
 */
export const FEATURED_BRANCHES: readonly FeaturedBranchItem[] = [
  {
    id: 'al-zahiyah',
    slug: 'al-zahiyah',
    name: 'Al Zahiyah',
    locationLabel: 'Takhlees Branch',
    image: '/images/branches/featured-al-zahiyah.webp',
    mapUrl: mapsSearchUrl('Al Zahiyah'),
    href: '/ae/branches/al-zahiyah',
    palette: 'dawn',
    seed: 11,
    alt: 'Architectural exterior representing Takhlees Al Zahiyah branch with travertine colonnade and warm bronze glazing',
  },
  {
    id: 'khalidiya',
    slug: 'khalidiya',
    name: 'Khalidiya',
    locationLabel: 'Takhlees Branch',
    image: '/images/branches/featured-khalidiya.webp',
    mapUrl: mapsSearchUrl('Khalidiya'),
    href: '/ae/branches/khalidiya',
    palette: 'mist',
    seed: 24,
    alt: 'Architectural entrance representing Takhlees Khalidiya branch with limestone arches and mashrabiya latticework',
  },
  {
    id: 'madina-zayed',
    slug: 'madina-zayed',
    name: 'Madina Zayed',
    locationLabel: 'Takhlees Branch',
    image: '/images/branches/featured-madina-zayed.webp',
    mapUrl: mapsSearchUrl('Madina Zayed'),
    href: '/ae/branches/madina-zayed',
    palette: 'dusk',
    seed: 37,
    alt: 'Architectural pavilion representing Takhlees Madina Zayed branch with shaded colonnade and bronze facade',
  },
  {
    id: 'al-ain',
    slug: 'al-ain',
    name: 'Al Ain',
    locationLabel: 'Takhlees Branch',
    image: '/images/branches/featured-al-ain.webp',
    mapUrl: mapsSearchUrl('Al Ain'),
    href: '/ae/branches/al-ain',
    palette: 'alpine',
    seed: 48,
    alt: 'Courtyard architecture representing Takhlees Al Ain branch with water reflection channel and date palms',
  },
  {
    id: 'mbz-12',
    slug: 'mbz-12',
    name: 'MBZ 12',
    locationLabel: 'Takhlees Branch',
    image: '/images/branches/featured-mbz-12.webp',
    mapUrl: mapsSearchUrl('MBZ 12'),
    href: '/ae/branches/mbz-12',
    palette: 'dawn',
    seed: 63,
    alt: 'Architectural portico representing Takhlees MBZ 12 branch with cantilevered bronze canopy and travertine facade',
  },
] as const;
