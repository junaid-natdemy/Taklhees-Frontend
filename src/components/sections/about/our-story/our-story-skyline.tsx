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
      {/* Layer 1: Bespoke Full-Bleed UAE Architectural Gallery Backdrop (Light & Dark) */}
      <ThemeImage
        lightSrc="/images/about/our-story-bg-light.webp"
        darkSrc="/images/about/our-story-bg-dark.webp"
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        unoptimized
        className="object-cover object-center opacity-90 dark:opacity-85"
      />

      {/* Seamless Top & Bottom Section Boundary Feathering */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F1EEE5] via-[#F1EEE5]/55 to-transparent dark:from-[#050B08] dark:via-[#050B08]/65" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#EFECE2] via-[#EFECE2]/45 to-transparent dark:from-[#050B08] dark:via-[#050B08]/55" />

      {/* Readability Veil Protecting Left Editorial Copy Without Dimming Right Arches */}
      <div className="absolute inset-0 bg-[radial-gradient(58%_68%_at_24%_52%,rgba(247,245,239,0.52)_0%,transparent_72%)] dark:bg-[radial-gradient(58%_68%_at_24%_52%,rgba(5,11,8,0.52)_0%,transparent_72%)]" />

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
