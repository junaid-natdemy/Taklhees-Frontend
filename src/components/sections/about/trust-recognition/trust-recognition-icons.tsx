/* ===================================================================
 * Trust & Recognition — Category Navigation Icons
 * ===================================================================
 * Minimal line-art icons for each evidence category.
 * Intentionally different from What Sets Us Apart icons.
 * =================================================================== */

import type { EvidenceCategoryKey } from './trust-recognition-data';

interface CategoryIconProps {
  category: EvidenceCategoryKey;
  className?: string;
}

const ICONS: Record<EvidenceCategoryKey, (cls: string) => React.ReactElement> = {
  /* Document with seal — Certifications */
  certifications: (cls) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cls}
    >
      <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" />
      <line x1="9" y1="7" x2="15" y2="7" stroke="currentColor" />
      <line x1="9" y1="10" x2="13" y2="10" stroke="currentColor" />
      <circle cx="12" cy="16" r="2.5" stroke="currentColor" />
      <path d="M10.5 18 L10 21 L12 19.5 L14 21 L13.5 18" stroke="currentColor" />
    </svg>
  ),

  /* Handshake — Partnerships */
  partnerships: (cls) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cls}
    >
      <path d="M2.5 13.5 L7.5 8.5 L10.5 8.5 L12 7 L14.5 9.5" stroke="currentColor" />
      <path d="M21.5 13.5 L16.5 8.5 L14 8.5" stroke="currentColor" />
      <path d="M7.5 13 L10 15.5 L13 12.5 L16 15.5" stroke="currentColor" />
      <path d="M2 14.5 L6 18.5" stroke="currentColor" />
      <path d="M22 14.5 L18 18.5" stroke="currentColor" />
    </svg>
  ),

  /* Award star — Recognition */
  recognition: (cls) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cls}
    >
      <path
        d="M12 2 L14.09 8.26 L20.9 8.56 L15.55 12.84 L17.45 19.44 L12 15.6 L6.55 19.44 L8.45 12.84 L3.1 8.56 L9.91 8.26 Z"
        stroke="currentColor"
      />
    </svg>
  ),

  /* Shield check — Client Trust */
  'client-trust': (cls) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cls}
    >
      <path
        d="M12 3 L20 7 L20 12 C20 16.42 16.42 20.44 12 22 C7.58 20.44 4 16.42 4 12 L4 7 Z"
        stroke="currentColor"
      />
      <polyline points="9 12 11 14 15 10" stroke="currentColor" />
    </svg>
  ),
};

export function TrustCategoryIcon({ category, className = 'h-5 w-5' }: CategoryIconProps) {
  const render = ICONS[category];
  return render(className);
}
