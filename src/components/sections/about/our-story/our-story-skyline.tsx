'use client';

import { ThemeImage } from '@/components/ui/theme-image';

/*
 * Bespoke UAE architectural environment & sculpted bottom wave transition.
 * Uses the original fine-line Dubai skyline illustration (/images/about/dubai-skyline-about-light.webp
 * in Light Mode and /images/testimonials/dubai-skyline-dark.webp in Dark Mode), feathered cleanly
 * into the lower-left and lower horizon so Burj Khalifa, Emirates Towers, and Downtown Dubai
 * anchor the story without competing with typography or timeline labels.
 */
export function OurStorySkylineBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
    >
      {/* Upper-Left Subtle Mashrabiya Architectural Veil */}
      <svg
        viewBox="0 0 260 240"
        fill="none"
        className="absolute left-0 top-0 h-32 w-32 opacity-55 dark:opacity-25 sm:h-44 sm:w-44 lg:h-52 lg:w-52"
      >
        <path
          d="M0 198 C 66 174, 152 98, 212 0 L 0 0 Z"
          fill="#EDE9DE"
          className="dark:fill-[#0B1711]"
        />
        <path
          d="M0 198 C 66 174, 152 98, 212 0"
          stroke="#C9A45C"
          strokeOpacity="0.48"
          strokeWidth="1.15"
        />
        <path
          d="M0 158 C 48 140, 114 78, 162 0"
          stroke="#07563D"
          strokeOpacity="0.16"
          strokeWidth="0.85"
          className="dark:stroke-[#2EB04B]"
        />
      </svg>

      {/* Delicate Upper-Right Ivory Horizon Curve */}
      <svg
        viewBox="0 0 600 260"
        fill="none"
        className="absolute right-0 top-0 h-40 w-64 opacity-45 dark:opacity-20 sm:h-52 sm:w-88 lg:h-60 lg:w-[440px]"
      >
        <path
          d="M120 0 C 260 88, 440 120, 600 185 L 600 0 Z"
          fill="#EFECE2"
          className="dark:fill-[#09150F]"
        />
        <path
          d="M140 0 C 280 86, 448 118, 600 180"
          stroke="#C9A45C"
          strokeOpacity="0.34"
          strokeWidth="1"
        />
      </svg>

      {/* Subtle Warm Ambient Glow Behind Right Architectural Photograph */}
      <div className="absolute right-[6%] top-[24%] h-[340px] w-[420px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,164,92,0.11)_0%,rgba(239,236,227,0.18)_48%,transparent_76%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(22,160,90,0.09)_0%,transparent_72%)]" />

      {/* Original Architectural Dubai Skyline Artwork Along Lower-Left & Lower Horizon */}
      <div
        className="absolute bottom-0 left-0 z-0 h-[135px] w-[92%] max-w-[920px] sm:h-[165px] md:w-[76%] lg:h-[195px] lg:w-[68%]"
        style={{
          maskImage:
            'radial-gradient(ellipse 84% 92% at 32% 88%, #000 38%, rgba(0,0,0,0.58) 64%, transparent 94%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 84% 92% at 32% 88%, #000 38%, rgba(0,0,0,0.58) 64%, transparent 94%)',
        }}
      >
        <ThemeImage
          lightSrc="/images/about/dubai-skyline-about-light.webp"
          darkSrc="/images/testimonials/dubai-skyline-dark.webp"
          alt=""
          width={1920}
          height={620}
          sizes="(max-width: 767px) 92vw, 68vw"
          loading="eager"
          unoptimized
          className="h-full w-full object-cover object-bottom opacity-[0.42] mix-blend-multiply dark:opacity-[0.26] dark:mix-blend-normal"
        />
      </div>

      {/* Subtle Champagne-Gold Horizon Line Sweeping Across Lower Canvas */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        fill="none"
        className="absolute inset-x-0 bottom-0 h-[56px] w-full sm:h-[70px]"
      >
        <path
          d="M0 54 C 320 34, 660 48, 1020 36 C 1220 28, 1345 34, 1440 24"
          stroke="#C9A45C"
          strokeOpacity="0.34"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

/*
 * Sculpted ivory-to-emerald bottom transition bridging Our Story & Journey
 * organically into Footer's top emerald tone (#032D18 / #063D29) with zero seam.
 */
export function OurStoryBottomTransition() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative z-10 -mt-12 w-full overflow-hidden sm:-mt-16"
    >
      <svg
        viewBox="0 0 1440 116"
        preserveAspectRatio="none"
        fill="none"
        className="block h-[72px] w-full sm:h-[92px]"
      >
        <defs>
          <linearGradient id="story-footer-emerald" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#063D29" />
            <stop offset="68%" stopColor="#043121" />
            <stop offset="100%" stopColor="#032D18" />
          </linearGradient>
        </defs>
        {/* Soft Ivory Under-Curve */}
        <path
          d="M0 24 C 320 78, 690 92, 1040 54 C 1220 34, 1345 48, 1440 28 L1440 116 L0 116 Z"
          fill="#EFECE2"
          className="dark:fill-[#08140F]"
        />
        {/* Sculpted Deep Emerald Wave Blending Continuously Into Footer */}
        <path
          d="M0 72 C 260 66, 480 92, 740 86 C 1020 78, 1250 42, 1440 14 L1440 116 L0 116 Z"
          fill="url(#story-footer-emerald)"
        />
        {/* Restrained Champagne-Gold Wave Highlight */}
        <path
          d="M0 71 C 260 65, 480 91, 740 85 C 1020 77, 1250 41, 1440 13"
          stroke="#C9A45C"
          strokeOpacity="0.46"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
