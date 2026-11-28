'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BranchVisualPlateProps {
  name: string;
  image?: string;
  isActive?: boolean;
  sizes: string;
  className?: string;
}

/**
 * Renders a branch's architectural photograph when available, or a neutral
 * architectural travertine-and-bronze geometric fallback plate when genuine
 * branch photography is unavailable (never placing a logo inside a photo box).
 */
export function BranchVisualPlate({
  name,
  image,
  isActive = false,
  sizes,
  className,
}: BranchVisualPlateProps) {
  if (image) {
    return (
      <div
        className={cn(
          'relative overflow-hidden bg-[#E9E4D8] dark:bg-[#0B2017]',
          className
        )}
      >
        <Image
          src={image}
          alt={`Takhlees ${name} branch architectural view`}
          fill
          loading="lazy"
          unoptimized
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-out group-hover/branch:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-[#EFE8DA] via-[#E6DEC9] to-[#D9CEB6] dark:from-[#0E2B1E] dark:via-[#081D14] dark:to-[#05130D]',
        className
      )}
    >
      {/* Golden-Hour Diagonal Sunlight Shaft */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(128deg,rgba(255,250,240,0.55)_0%,transparent_48%,rgba(11,59,40,0.08)_100%)] dark:bg-[linear-gradient(128deg,rgba(201,164,92,0.16)_0%,transparent_52%,rgba(0,0,0,0.35)_100%)]" />

      {/* Subtle Mashrabiya-Inspired Concentric Architectural Geometry */}
      <svg
        viewBox="0 0 200 120"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
      >
        <circle
          cx="100"
          cy="60"
          r="46"
          fill="none"
          stroke={isActive ? '#C9A45C' : '#9E834E'}
          strokeOpacity="0.32"
          strokeWidth="0.9"
        />
        <circle
          cx="100"
          cy="60"
          r="28"
          fill="none"
          stroke={isActive ? '#E6C98A' : '#146736'}
          strokeOpacity="0.24"
          strokeWidth="0.9"
        />
        <path
          d="M 100 6 L 146 60 L 100 114 L 54 60 Z"
          fill="none"
          stroke="#C9A45C"
          strokeOpacity="0.28"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}
