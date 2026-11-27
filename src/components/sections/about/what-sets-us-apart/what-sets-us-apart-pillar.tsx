'use client';

import { useId } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { DifferentiationPillar } from './what-sets-us-apart-data';
import { WhatSetsUsApartIcon } from './what-sets-us-apart-icons';

/* Curved reflection arc inside the upper glass arch crown */
const CROWN_REFLECTION_ARC =
  'M 12,26 C 22,12 36,6.5 52,6.5 C 62,6.5 70,8.5 76,12';

function buildDesktopPaths(midY: number, rightY: number) {
  const m100 = Number((midY * 100).toFixed(2));
  const r100 = Number((rightY * 100).toFixed(2));
  const innerM = Number((midY * 100 - 2.1).toFixed(2));
  const innerR = Number((rightY * 100 - 2.1).toFixed(2));

  return {
    clip01: `M 0,1 L 0,0.34 C 0,0.115 0.22,0 0.5,0 C 0.78,0 1,0.115 1,0.34 L 1,${rightY} Q 0.5,${midY} 0,1 Z`,
    outer100: `M 0.5,99.4 L 0.5,34 C 0.5,11.5 22,0.8 50,0.8 C 78,0.8 99.5,11.5 99.5,34 L 99.5,${r100} Q 50,${m100} 0.5,99.4 Z`,
    inner100: `M 2.1,97.2 L 2.1,34.5 C 2.1,13.5 23.2,2.8 50,2.8 C 76.8,2.8 97.9,13.5 97.9,34.5 L 97.9,${innerR} Q 50,${innerM} 2.1,97.2 Z`,
    contactLine100: `M 0.5,99.4 Q 50,${m100} 99.5,${r100}`,
  };
}

const MOBILE_CLIP_01 =
  'M 0,1 L 0,0.34 C 0,0.115 0.22,0 0.5,0 C 0.78,0 1,0.115 1,0.34 L 1,1 Z';
const MOBILE_OUTLINE_100 =
  'M 0.5,99.5 L 0.5,34 C 0.5,11.5 22,0.8 50,0.8 C 78,0.8 99.5,11.5 99.5,34 L 99.5,99.5 Z';
const MOBILE_INNER_EDGE_100 =
  'M 2.1,97.8 L 2.1,34.5 C 2.1,13.5 23.2,2.8 50,2.8 C 76.8,2.8 97.9,13.5 97.9,34.5 L 97.9,97.8';
const MOBILE_CONTACT_100 = 'M 0.5,99.5 L 99.5,99.5';

interface WhatSetsUsApartPillarProps {
  pillar: DifferentiationPillar;
  index: number;
  variant?: 'desktop' | 'mobile';
  className?: string;
}

/**
 * Custom-cut architectural liquid glass portal pillar matching Takhlees'
 * liquid glass material language, with per-pillar sloped lower boundary solved
 * directly from the emerald platform Bezier curve and restrained champagne-gold glow.
 */
export function WhatSetsUsApartPillar({
  pillar,
  index,
  variant = 'desktop',
  className,
}: WhatSetsUsApartPillarProps) {
  const prefersReducedMotion = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const clipId = `liquid-arch-${uid}`;
  const rimGradId = `liquid-rim-${uid}`;
  const isMobile = variant === 'mobile';

  const paths = isMobile
    ? {
        clip01: MOBILE_CLIP_01,
        outer100: MOBILE_OUTLINE_100,
        inner100: MOBILE_INNER_EDGE_100,
        contactLine100: MOBILE_CONTACT_100,
      }
    : buildDesktopPaths(pillar.bottomSlope01.midY, pillar.bottomSlope01.rightY);

  return (
    <m.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: 0.65,
              delay: isMobile ? 0.06 : 0.1 + index * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }
      }
      className={cn(
        'group relative isolate flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-0.5',
        className
      )}
    >
      <svg
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={paths.clip01} />
          </clipPath>
        </defs>
      </svg>

      {/* Layer 4: Liquid Glass Architectural Body */}
      <div
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
        className={cn(
          'arch-liquid-glass relative flex h-full w-full flex-col items-center overflow-hidden',
          isMobile
            ? 'px-5 pb-7 pt-8'
            : 'px-2.5 pb-12 pt-5 lg:px-3.5 lg:pb-14 lg:pt-6 xl:px-4 xl:pb-16 xl:pt-7'
        )}
      >
        {/* Layer 6: Upper-Left Meniscus Highlight & Soft Champagne Bottom Refraction */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(96%_68%_at_18%_8%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.28)_42%,transparent_72%),linear-gradient(180deg,transparent_64%,rgba(201,164,92,0.10)_92%,rgba(226,198,141,0.18)_100%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100 dark:bg-[radial-gradient(96%_68%_at_18%_8%,rgba(255,255,255,0.16)_0%,transparent_64%),linear-gradient(180deg,transparent_68%,rgba(201,164,92,0.12)_100%)]"
        />

        {/* Layer 5: Double-Edge Glass Thickness + Restrained Champagne-Gold Refraction */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        >
          <defs>
            <linearGradient id={rimGradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E2C68D" stopOpacity="0.92" />
              <stop offset="38%" stopColor="#C9A45C" stopOpacity="0.82" />
              <stop offset="72%" stopColor="#FFFFFF" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#C9A45C" stopOpacity="0.86" />
            </linearGradient>
          </defs>

          {/* Secondary Inner Specular Glass Rim */}
          <path
            d={paths.inner100}
            fill="none"
            stroke="rgba(255,255,255,0.78)"
            strokeWidth="1.05"
            vectorEffect="non-scaling-stroke"
            className="dark:stroke-[#C9A45C]/25"
          />

          {/* Delicate Curved Surface Reflection Inside Upper Arch */}
          <path
            d={CROWN_REFLECTION_ARC}
            fill="none"
            stroke="rgba(255,255,255,0.62)"
            strokeWidth="1.2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="opacity-75 transition-opacity duration-500 group-hover:opacity-100 dark:stroke-white/15"
          />

          {/* Subtle Warm Champagne Contact Glow Along Wave Seat */}
          <path
            d={paths.contactLine100}
            fill="none"
            stroke="rgba(226, 198, 141, 0.45)"
            strokeWidth="3.2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="opacity-65 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Thin Champagne-Gold Outer Architectural Contour */}
          <path
            d={paths.outer100}
            fill="none"
            stroke={`url(#${rimGradId})`}
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Layer 7: Icons & Editorial Typography (Cleared Above Sloped Base) */}
        <div className="relative z-20 flex w-full flex-col items-center">
          <WhatSetsUsApartIcon
            icon={pillar.icon}
            className={cn(
              'shrink-0',
              isMobile ? 'h-8 w-8' : 'h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8'
            )}
          />

          <h3
            className={cn(
              'mt-2 font-serif font-semibold leading-[1.14] tracking-[-0.01em] text-[#063D29] dark:text-[#2EB04B]',
              isMobile
                ? 'text-[19px]'
                : 'text-[13.5px] lg:mt-2.5 lg:text-[15.5px] xl:mt-3 xl:text-[18px]'
            )}
          >
            <span className="block">{pillar.titleLines[0]}</span>
            <span className="block">{pillar.titleLines[1]}</span>
          </h3>

          <span
            aria-hidden="true"
            className="my-2 block h-[1.5px] w-7 rounded-full bg-[#C9A45C]/85 lg:my-2.5"
          />

          <p
            className={cn(
              'max-w-[200px] leading-[1.44] text-[#4A4E4B] dark:text-[#C1C8C1]',
              isMobile
                ? 'text-[13px]'
                : 'text-[10.5px] lg:text-[11px] xl:text-[11.5px]'
            )}
          >
            {pillar.description}
          </p>
        </div>
      </div>
    </m.article>
  );
}
