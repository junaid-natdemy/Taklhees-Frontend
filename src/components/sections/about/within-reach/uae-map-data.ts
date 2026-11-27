/* ===================================================================
 * UAE Geographical Overlay Data — Normalized Artwork Coordinate System
 * ===================================================================
 * Single shared canonical coordinate system calibrated against the
 * 16:9 desktop architectural artwork (x: 0..100%, y: 0..100%).
 *
 * Mobile/tablet viewports project the exact same coordinates
 * mathematically into the cropped artwork region (`MOBILE_ARTWORK_CROP`),
 * keeping markers, SVG leader lines, and floating glass labels
 * strictly locked across every screen size.
 *
 * Verified factual descriptions only — never claim physical Takhlees
 * branches in unconfirmed Emirates.
 * =================================================================== */

export type LabelAlign = 'left' | 'center' | 'right';

export interface EmirateLocation {
  id: string;
  name: string;
  role: string;
  /** Marker X as a percentage of the full 16:9 artwork width */
  xPercent: number;
  /** Marker Y as a percentage of the full 16:9 artwork height */
  yPercent: number;
  /** Normalized label X offset (desktop artwork % units) from marker */
  labelOffsetX: number;
  /** Normalized label Y offset (desktop artwork % units) from marker */
  labelOffsetY: number;
  /** Horizontal alignment of the glass label relative to endpoint */
  align: LabelAlign;
}

export interface ArtworkCrop {
  readonly x0: number;
  readonly x1: number;
  readonly y0: number;
  readonly y1: number;
}

export const DESKTOP_ARTWORK_CROP: ArtworkCrop = {
  x0: 0,
  x1: 100,
  y0: 0,
  y1: 100,
} as const;

export const MOBILE_ARTWORK_CROP: ArtworkCrop = {
  x0: 32,
  x1: 99,
  y0: 2,
  y1: 90,
} as const;

export const UAE_EMIRATES: readonly EmirateLocation[] = [
  {
    id: 'abu-dhabi',
    name: 'Abu Dhabi',
    role: 'Capital Emirate • Institutional & Business Setup Support',
    xPercent: 52.9,
    yPercent: 69.5,
    labelOffsetX: 0,
    labelOffsetY: 5.2,
    align: 'center',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    role: 'Commercial Hub • Licensing, PRO & Corporate Services',
    xPercent: 70.8,
    yPercent: 57.5,
    labelOffsetX: 1.4,
    labelOffsetY: 4.8,
    align: 'left',
  },
  {
    id: 'sharjah',
    name: 'Sharjah',
    role: 'Northern Commercial Corridor • Trade & Documentation Support',
    xPercent: 77.4,
    yPercent: 48.1,
    labelOffsetX: -3.2,
    labelOffsetY: -2.2,
    align: 'right',
  },
  {
    id: 'ajman',
    name: 'Ajman',
    role: 'Coastal Enterprise Zone • Setup & Typing Support',
    xPercent: 81.6,
    yPercent: 42.9,
    labelOffsetX: 3.1,
    labelOffsetY: 0.8,
    align: 'left',
  },
  {
    id: 'umm-al-quwain',
    name: 'Umm Al Quwain',
    role: 'Coastal Emirate • Business & Clearance Assistance',
    xPercent: 85.3,
    yPercent: 38.0,
    labelOffsetX: -3.4,
    labelOffsetY: -3.4,
    align: 'right',
  },
  {
    id: 'ras-al-khaimah',
    name: 'Ras Al Khaimah',
    role: 'Northern Emirate • Industrial & Free Zone Support',
    xPercent: 90.5,
    yPercent: 31.1,
    labelOffsetX: -3.0,
    labelOffsetY: -4.6,
    align: 'right',
  },
  {
    id: 'fujairah',
    name: 'Fujairah',
    role: 'East Coast Emirate • Port & Corporate Documentation',
    xPercent: 89.2,
    yPercent: 49.4,
    labelOffsetX: 0.6,
    labelOffsetY: 5.4,
    align: 'center',
  },
] as const;

export interface ProjectedEmirateGeometry {
  markerX: number;
  markerY: number;
  labelX: number;
  labelY: number;
}

/**
 * Projects a canonical location & its label offset into any cropped
 * artwork percentage coordinate system (desktop full 16:9 or mobile crop).
 */
export function projectEmirateToCrop(
  loc: EmirateLocation,
  crop: ArtworkCrop
): ProjectedEmirateGeometry {
  const spanX = crop.x1 - crop.x0;
  const spanY = crop.y1 - crop.y0;
  const markerX = ((loc.xPercent - crop.x0) / spanX) * 100;
  const markerY = ((loc.yPercent - crop.y0) / spanY) * 100;
  const labelX = ((loc.xPercent + loc.labelOffsetX - crop.x0) / spanX) * 100;
  const labelY = ((loc.yPercent + loc.labelOffsetY - crop.y0) / spanY) * 100;
  return { markerX, markerY, labelX, labelY };
}
