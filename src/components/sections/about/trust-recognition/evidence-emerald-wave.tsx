'use client';

/* ===================================================================
 * Evidence Emerald Wave V3 — Sculpted Multi-Layer Liquid Surface
 * ===================================================================
 * Full-width organic liquid-emerald surface with deep emerald base,
 * forest-green mid-ribbon, translucent sage crest, liquid surface
 * reflection, and fine champagne-gold contour line. Bridges seamlessly
 * into the Footer without overlapping exhibition content.
 * =================================================================== */

import { m, useReducedMotion } from 'motion/react';

/* Top sculpted emerald wave bridging seamlessly from Our Story & Journey */
export function EvidenceTopWave() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      aria-hidden="true"
      initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
      }
      className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[76px] w-full overflow-hidden sm:h-[96px] lg:h-[116px]"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
        className="block h-full w-full"
      >
        <defs>
          <linearGradient id="v3-top-wave-deep" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" stopColor="#032D18" />
            <stop offset="48%" stopColor="#063D29" />
            <stop offset="100%" stopColor="#032D18" />
          </linearGradient>
          <linearGradient id="v3-top-wave-sage" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0E7B54" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#1E9664" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#063D29" stopOpacity="0.24" />
          </linearGradient>
          <linearGradient id="v3-top-wave-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A45C" stopOpacity="0.4" />
            <stop offset="38%" stopColor="#F5DDA0" stopOpacity="0.86" />
            <stop offset="76%" stopColor="#C9A45C" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#F5DDA0" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Secondary translucent sage under-wave */}
        <path
          d="M 0 0 L 1440 0 L 1440 64 C 1180 96, 860 36, 520 72 C 280 98, 120 68, 0 88 Z"
          fill="url(#v3-top-wave-sage)"
        />

        {/* Primary deep emerald top ribbon */}
        <path
          d="M 0 0 L 1440 0 L 1440 46 C 1190 78, 880 22, 540 54 C 290 78, 130 48, 0 68 Z"
          fill="url(#v3-top-wave-deep)"
        />

        {/* Fine champagne-gold crest highlight */}
        <path
          d="M 0 69 C 130 49, 290 79, 540 55 C 880 23, 1190 79, 1440 47"
          stroke="url(#v3-top-wave-gold)"
          strokeWidth="1.35"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </m.div>
  );
}

export function EvidenceEmeraldWave() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-[2px] z-[3] h-[126px] w-full sm:h-[156px] lg:h-[186px]"
    >
      <svg
        viewBox="0 0 1440 192"
        preserveAspectRatio="none"
        fill="none"
        className="block h-full w-full"
      >
        <defs>
          <linearGradient id="v3-wave-deep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#043A24" />
            <stop offset="55%" stopColor="#032D18" />
            <stop offset="100%" stopColor="#032D18" />
          </linearGradient>

          <linearGradient id="v3-wave-forest" x1="0" y1="0.6" x2="1" y2="0.2">
            <stop offset="0%" stopColor="#0A6B46" stopOpacity="0.46" />
            <stop offset="52%" stopColor="#0E7B54" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#053B27" stopOpacity="0.38" />
          </linearGradient>

          <linearGradient id="v3-wave-sage" x1="0.1" y1="0.5" x2="0.95" y2="0.1">
            <stop offset="0%" stopColor="#2EB04B" stopOpacity="0.12" />
            <stop offset="55%" stopColor="#1E9664" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#0D6E49" stopOpacity="0.18" />
          </linearGradient>

          <linearGradient id="v3-wave-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A45C" stopOpacity="0.4" />
            <stop offset="32%" stopColor="#F5DDA0" stopOpacity="0.88" />
            <stop offset="68%" stopColor="#C9A45C" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#F5DDA0" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Layer 1: Translucent sage liquid mist */}
        <path
          d="M 0 118 C 220 96, 460 132, 730 126 C 1010 120, 1255 68, 1440 16 L 1440 194 L 0 194 Z"
          fill="url(#v3-wave-sage)"
        />

        {/* Layer 2: Mid forest-green liquid swell */}
        <path
          d="M 0 134 C 240 112, 480 146, 750 138 C 1030 130, 1260 80, 1440 30 L 1440 194 L 0 194 Z"
          fill="url(#v3-wave-forest)"
        />

        {/* Layer 3: Monolithic deep emerald base terminating cleanly in #032D18 */}
        <path
          d="M 0 148 C 210 124, 440 156, 725 149 C 1020 142, 1250 96, 1440 44 L 1440 194 L 0 194 Z"
          fill="url(#v3-wave-deep)"
        />

        {/* Fine champagne-gold crest contour */}
        <path
          d="M 0 147 C 210 123, 440 155, 725 148 C 1020 141, 1250 95, 1440 43"
          stroke="url(#v3-wave-gold)"
          strokeWidth="1.45"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Secondary delicate specular highlight along inner swell */}
        <path
          d="M 520 144 C 820 136, 1140 94, 1440 31"
          stroke="#FFFFFF"
          strokeOpacity="0.14"
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
