'use client';

import { useId } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { StoryMilestone } from './our-story-data';

/*
 * Sculpted UAE architectural arch opening in normalized objectBoundingBox (0..1)
 * and matching 0..100 SVG coordinates: arched upper crest inspired by UAE stone
 * archways paired with a smooth sweeping lower contour (zero harsh corners).
 */
const ARCH_CLIP_BOUNDING_BOX =
  'M 0.065,0.89 C 0.015,0.81 0.01,0.55 0.04,0.34 C 0.08,0.14 0.30,0.032 0.56,0.025 C 0.80,0.02 0.945,0.14 0.975,0.38 C 0.992,0.56 0.96,0.755 0.87,0.845 C 0.73,0.955 0.38,0.975 0.14,0.92 C 0.098,0.91 0.078,0.902 0.065,0.89 Z';

const ARCH_OUTLINE_100 =
  'M 6.5,89 C 1.5,81 1,55 4,34 C 8,14 30,3.2 56,2.5 C 80,2 94.5,14 97.5,38 C 99.2,56 96,75.5 87,84.5 C 73,95.5 38,97.5 14,92 C 9.8,91 7.8,90.2 6.5,89 Z';

/*
 * Seamlessly tucked emerald depth contour following the lower-right arch boundary:
 * both endpoints sit subtly inside the clipped arch perimeter so the outer crescent
 * tapers smoothly into zero protrusion.
 */
const EMERALD_DEPTH_SILHOUETTE =
  'M 22,92.5 C 44,96 73,94.5 87,84.5 C 93.5,78 96.8,66 98,53 C 99.6,65 97.4,80.5 88.8,88.8 C 74.5,99 42,99.8 24,95.2 C 20,94.2 19.5,92.8 22,92.5 Z';

/* Thin champagne-gold rim accent hugging upper arch crown & right architectural curve */
const GOLD_CONTOUR_RIM =
  'M 4.2,34 C 8.2,14.2 30.2,3.4 56,2.7 C 79.8,2.2 94.2,14.2 97.3,38 C 98.4,48 97.8,59 95.8,69';

interface OurStoryArchFrameProps {
  milestones: readonly StoryMilestone[];
  activeIndex: number;
  sizes: string;
  shouldLoadAllSlides?: boolean;
  className?: string;
}

/**
 * Shared optical liquid-glass SVG bezel strokes (outer specular edge, champagne-gold
 * refraction contour, and subtle inner meniscus reflection) aligned to the organic arch.
 */
function ArchGlassBezelOverlay({
  gradPrefix,
  subtle = false,
}: {
  gradPrefix: string;
  subtle?: boolean;
}) {
  const outerRimId = `${gradPrefix}-outer-rim`;
  const innerRimId = `${gradPrefix}-inner-rim`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
    >
      <defs>
        <linearGradient id={outerRimId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="28%" stopColor="#E5C883" stopOpacity="0.88" />
          <stop offset="62%" stopColor="#0A6B36" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={innerRimId} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.88" />
          <stop offset="45%" stopColor="#C9A45C" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.68" />
        </linearGradient>
      </defs>

      {/* Soft refractive glass bevel halo */}
      <path
        d={ARCH_OUTLINE_100}
        fill="none"
        stroke="rgba(255,255,255,0.42)"
        strokeWidth={subtle ? '2.4' : '2.8'}
        vectorEffect="non-scaling-stroke"
        className="dark:stroke-[#20B765]/20"
      />

      {/* Primary outer liquid-glass perimeter edge (Light Mode) */}
      <path
        d={ARCH_OUTLINE_100}
        fill="none"
        stroke={`url(#${outerRimId})`}
        strokeWidth={subtle ? '1.35' : '1.55'}
        vectorEffect="non-scaling-stroke"
        className="dark:hidden"
      />

      {/* Primary outer smoked-gold liquid-glass rim (Dark Mode) */}
      <path
        d={ARCH_OUTLINE_100}
        fill="none"
        stroke={`url(#${innerRimId})`}
        strokeOpacity="0.58"
        strokeWidth={subtle ? '1.25' : '1.45'}
        vectorEffect="non-scaling-stroke"
        className="hidden dark:block"
      />

      {/* Upper crown liquid meniscus specular highlight */}
      <path
        d={GOLD_CONTOUR_RIM}
        fill="none"
        stroke="rgba(255,255,255,0.82)"
        strokeWidth={subtle ? '1.3' : '1.6'}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="dark:stroke-white/25"
      />
    </svg>
  );
}

/**
 * Multi-layered sculpted UAE architectural photograph container with a translucent
 * optical liquid-glass frame for Desktop & Tablet.
 */
export function OurStoryArchFrame({
  milestones,
  activeIndex,
  sizes,
  shouldLoadAllSlides = true,
  className,
}: OurStoryArchFrameProps) {
  const uid = useId().replace(/:/g, '');
  const clipId = `arch-clip-${uid}`;

  return (
    <div
      className={cn(
        'relative aspect-[3/2] w-full [filter:drop-shadow(0_22px_36px_rgba(6,61,41,0.16))] dark:[filter:drop-shadow(0_26px_42px_rgba(0,0,0,0.72))]',
        className
      )}
    >
      <svg
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={ARCH_CLIP_BOUNDING_BOX} />
          </clipPath>
        </defs>
      </svg>

      {/* Layer 0: Coordinated Deep Emerald Depth Silhouette */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      >
        <path
          d={EMERALD_DEPTH_SILHOUETTE}
          fill="#063D29"
          fillOpacity="0.94"
          className="dark:fill-[#0B6B45]/95"
        />
      </svg>

      {/* Layer 1: Optical Liquid-Glass Outer Frame & Refracting Border Collar */}
      <div
        className="relative z-[1] h-full w-full overflow-hidden bg-[linear-gradient(142deg,rgba(255,255,255,0.68)_0%,rgba(240,247,243,0.34)_48%,rgba(255,252,244,0.60)_100%)] p-[10px] backdrop-blur-md backdrop-saturate-150 dark:bg-[linear-gradient(142deg,rgba(18,42,30,0.78)_0%,rgba(10,24,17,0.62)_50%,rgba(14,34,24,0.74)_100%)] sm:p-[12px] lg:p-[14px]"
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
      >
        {/* Curved Liquid-Glass Specular Meniscus Across Border & Upper Rim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(88%_58%_at_18%_8%,rgba(255,255,255,0.82)_0%,transparent_58%),linear-gradient(135deg,rgba(20,103,54,0.10)_0%,transparent_38%,transparent_66%,rgba(201,164,92,0.18)_100%)] dark:bg-[radial-gradient(88%_58%_at_18%_8%,rgba(255,255,255,0.16)_0%,transparent_58%),linear-gradient(135deg,rgba(32,183,101,0.14)_0%,transparent_38%,transparent_66%,rgba(205,170,104,0.20)_100%)]"
        />

        {/* Layer 2: Inner Sculpted Photographic Arch Seated Inside Liquid Glass */}
        <div
          className="relative z-[1] h-full w-full overflow-hidden bg-[#E8E3D5] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.75)] dark:bg-[#08140F] dark:shadow-[inset_0_0_0_1px_rgba(205,170,104,0.28)]"
          style={{
            clipPath: `url(#${clipId})`,
            WebkitClipPath: `url(#${clipId})`,
          }}
        >
          {milestones.map((chapter, index) => {
            const isCurrent = activeIndex === index;
            const isAdjacent = Math.abs(activeIndex - index) <= 1;

            return (
              <Image
                key={chapter.id}
                src={chapter.imageSrc}
                alt={chapter.imageAlt}
                fill
                loading={
                  shouldLoadAllSlides && isAdjacent
                    ? 'eager'
                    : 'lazy'
                }
                unoptimized
                sizes={sizes}
                aria-hidden={!isCurrent}
                className={cn(
                  'object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                  chapter.imagePosition ?? 'object-center',
                  isCurrent
                    ? 'scale-100 opacity-100 motion-reduce:scale-100'
                    : 'scale-[1.025] opacity-0 motion-reduce:scale-100'
                )}
              />
            );
          })}

          {/* Subtle Inner Architectural Edge Vignette & Glass Lip */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_64%,rgba(6,61,41,0.16)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_64%,rgba(5,11,8,0.42)_100%)]"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          >
            <path
              d={ARCH_OUTLINE_100}
              fill="none"
              stroke="rgba(255,255,255,0.72)"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
              className="dark:stroke-[#C9A45C]/35"
            />
          </svg>
        </div>
      </div>

      {/* Layer 3: Crisp Outer Optical Liquid-Glass Rim & Crown Specular Arc */}
      <ArchGlassBezelOverlay gradPrefix={`desk-${uid}`} />
    </div>
  );
}

interface OurStoryMobileArchCardProps {
  milestone: StoryMilestone;
}

/**
 * Lightweight single-image UAE architectural optical liquid-glass frame for mobile vertical cards
 * so mobile never downloads off-screen desktop slide images.
 */
export function OurStoryMobileArchImage({
  milestone,
}: OurStoryMobileArchCardProps) {
  const uid = useId().replace(/:/g, '');
  const clipId = `arch-mob-clip-${uid}`;

  return (
    <div className="relative aspect-[3/2] w-full [filter:drop-shadow(0_16px_26px_rgba(6,61,41,0.14))] dark:[filter:drop-shadow(0_18px_28px_rgba(0,0,0,0.7))]">
      <svg
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={ARCH_CLIP_BOUNDING_BOX} />
          </clipPath>
        </defs>
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      >
        <path
          d={EMERALD_DEPTH_SILHOUETTE}
          fill="#063D29"
          fillOpacity="0.94"
          className="dark:fill-[#0B6B45]/95"
        />
      </svg>

      {/* Mobile Optical Liquid-Glass Outer Frame */}
      <div
        className="relative z-[1] h-full w-full overflow-hidden bg-[linear-gradient(142deg,rgba(255,255,255,0.68)_0%,rgba(240,247,243,0.34)_48%,rgba(255,252,244,0.60)_100%)] p-[8px] backdrop-blur-md backdrop-saturate-150 dark:bg-[linear-gradient(142deg,rgba(18,42,30,0.78)_0%,rgba(10,24,17,0.62)_50%,rgba(14,34,24,0.74)_100%)] sm:p-[10px]"
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(88%_58%_at_18%_8%,rgba(255,255,255,0.80)_0%,transparent_58%),linear-gradient(135deg,rgba(20,103,54,0.10)_0%,transparent_38%,transparent_66%,rgba(201,164,92,0.18)_100%)] dark:bg-[radial-gradient(88%_58%_at_18%_8%,rgba(255,255,255,0.14)_0%,transparent_58%),linear-gradient(135deg,rgba(32,183,101,0.12)_0%,transparent_38%,transparent_66%,rgba(205,170,104,0.18)_100%)]"
        />

        <div
          className="relative z-[1] h-full w-full overflow-hidden bg-[#E8E3D5] dark:bg-[#08140F]"
          style={{
            clipPath: `url(#${clipId})`,
            WebkitClipPath: `url(#${clipId})`,
          }}
        >
          <Image
            src={milestone.imageSrc}
            alt={milestone.imageAlt}
            fill
            loading="eager"
            unoptimized
            sizes="(max-width: 767px) 92vw, 520px"
            className={cn(
              'object-cover',
              milestone.imagePosition ?? 'object-center'
            )}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          >
            <path
              d={ARCH_OUTLINE_100}
              fill="none"
              stroke="rgba(255,255,255,0.70)"
              strokeWidth="1.15"
              vectorEffect="non-scaling-stroke"
              className="dark:stroke-[#C9A45C]/35"
            />
          </svg>
        </div>
      </div>

      <ArchGlassBezelOverlay gradPrefix={`mob-${uid}`} subtle />
    </div>
  );
}
