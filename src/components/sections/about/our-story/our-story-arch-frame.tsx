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
 * Multi-layered sculpted UAE architectural photograph container for Desktop & Tablet.
 * Keeps frame geometry 100% stable across chapter crossfades with zero layout shift.
 */
export function OurStoryArchFrame({
  milestones,
  activeIndex,
  sizes,
  shouldLoadAllSlides = true,
  className,
}: OurStoryArchFrameProps) {
  const clipId = `arch-clip-${useId().replace(/:/g, '')}`;

  return (
    <div className={cn('relative aspect-[3/2] w-full', className)}>
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

      {/* Layer 2: Coordinated Deep Emerald Depth Silhouette */}
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

      {/* Layer 1: Sculpted Photographic Arch Container (Crossfade Only) */}
      <div
        className="relative z-[1] h-full w-full overflow-hidden bg-[#E8E3D5] shadow-[0_24px_52px_-20px_rgba(6,61,41,0.22)] dark:bg-[#08140F]"
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
                shouldLoadAllSlides && isAdjacent && activeIndex > 0
                  ? 'eager'
                  : 'lazy'
              }
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

        {/* Subtle Inner Architectural Edge Vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_64%,rgba(6,61,41,0.16)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_64%,rgba(5,11,8,0.42)_100%)]"
        />
      </div>

      {/* Layer 3: Refined Thin Champagne-Gold Architectural Rim */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      >
        <path
          d={ARCH_OUTLINE_100}
          fill="none"
          stroke="#C9A45C"
          strokeOpacity="0.28"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={GOLD_CONTOUR_RIM}
          fill="none"
          stroke="#C9A45C"
          strokeOpacity="0.72"
          strokeWidth="1.45"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

interface OurStoryMobileArchCardProps {
  milestone: StoryMilestone;
}

/**
 * Lightweight single-image UAE architectural frame for mobile vertical cards
 * so mobile never downloads off-screen desktop slide images.
 */
export function OurStoryMobileArchImage({
  milestone,
}: OurStoryMobileArchCardProps) {
  const clipId = `arch-mob-clip-${useId().replace(/:/g, '')}`;

  return (
    <div className="relative aspect-[3/2] w-full">
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

      <div
        className="relative z-[1] h-full w-full overflow-hidden bg-[#E8E3D5] shadow-[0_16px_34px_-16px_rgba(6,61,41,0.22)] dark:bg-[#08140F]"
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
      >
        <Image
          src={milestone.imageSrc}
          alt={milestone.imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 767px) 92vw, 520px"
          className={cn(
            'object-cover',
            milestone.imagePosition ?? 'object-center'
          )}
        />
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      >
        <path
          d={GOLD_CONTOUR_RIM}
          fill="none"
          stroke="#C9A45C"
          strokeOpacity="0.65"
          strokeWidth="1.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
