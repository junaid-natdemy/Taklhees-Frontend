'use client';

import Image from 'next/image';
import { m, useReducedMotion } from 'motion/react';
import { DIFFERENTIATION_PILLARS } from './what-sets-us-apart-data';
import { WhatSetsUsApartPillar } from './what-sets-us-apart-pillar';

/**
 * Section 03 — What Sets Us Apart
 * Layered architectural composition:
 * 1) Full-bleed warm ivory architectural background environment
 * 2) Multi-edge blended UAE mashrabiya opening on the far left edge (Burj Khalifa)
 * 3) Sculpted continuous emerald platform (behind pillars, zero foreground overlap)
 * 4) Four ascending 5-layer liquid glass arch pillars seated flush on the platform
 * 5) Centered editorial serif heading above
 */
export function WhatSetsUsApartSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="what-sets-us-apart"
      aria-labelledby="what-sets-us-apart-heading"
      className="relative overflow-hidden bg-[#F7F5EF] transition-colors duration-300 dark:bg-[#050B08]"
    >
      {/* ================= LAYER 1: FULL-BLEED WARM IVORY ARCHITECTURAL ENVIRONMENT ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <Image
          src="/images/about/sets-us-apart-bg-ivory.webp"
          alt=""
          fill
          loading="eager"
          unoptimized
          sizes="100vw"
          className="object-cover object-center opacity-95 dark:hidden"
        />
        {/* Subtle Warm Diffused Architectural Light & Soft Edge Continuity */}
        <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_18%_45%,rgba(255,250,238,0.35)_0%,transparent_72%)] dark:bg-none" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F1EEE5] via-[#F1EEE5]/55 to-transparent dark:from-[#050B08] dark:via-[#050B08]/60" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F1EEE5] via-[#F1EEE5]/55 to-transparent dark:from-[#050B08] dark:via-[#050B08]/60" />
      </div>

      {/* ================= DESKTOP & TABLET FULL-BLEED LEFT ARCHITECTURE (md+) ================= */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[29%] max-w-[440px] md:block"
        style={{
          /* Multi-edge atmospheric mask: eliminates top, bottom, and right rectangular boundaries */
          maskImage:
            'linear-gradient(to right, #000 0%, #000 58%, rgba(0,0,0,0.48) 78%, transparent 98%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 8%, #000 20%, #000 80%, rgba(0,0,0,0.5) 92%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskImage:
            'linear-gradient(to right, #000 0%, #000 58%, rgba(0,0,0,0.48) 78%, transparent 98%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 8%, #000 20%, #000 80%, rgba(0,0,0,0.5) 92%, transparent 100%)',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <Image
          src="/images/about/sets-us-apart-arch-left.webp"
          alt="Traditional UAE sandstone and mashrabiya archway opening onto the Burj Khalifa and Dubai skyline at golden hour"
          fill
          loading="eager"
          unoptimized
          sizes="(min-width: 1280px) 28vw, 30vw"
          className="object-cover object-[48%_46%] dark:brightness-95"
        />
        {/* Soft Ivory Atmospheric Veil Blending Arch Perimeter Into Section Ground */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,#F7F5EF_0%,transparent_18%,transparent_82%,#F7F5EF_100%),linear-gradient(to_right,transparent_58%,rgba(247,245,239,0.72)_88%,#F7F5EF_100%)] opacity-60 dark:bg-[linear-gradient(to_bottom,#050B08_0%,transparent_20%,transparent_80%,#050B08_100%),linear-gradient(to_right,transparent_58%,rgba(5,11,8,0.75)_88%,#050B08_100%)] dark:opacity-90"
        />
      </div>

      {/* ================= DESKTOP & TABLET COMPOSITION (md+) ================= */}
      <div className="relative z-10 hidden md:block">
        <div className="relative mx-auto w-full max-w-[1320px] md:h-[540px] lg:h-[610px] xl:h-[660px]">
          {/* ZONE B: Top-Center Editorial Heading */}
          <header className="relative z-20 mx-auto max-w-[600px] px-6 pt-6 text-center lg:pt-8 xl:pt-9">
            <div className="mb-1.5 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-[1.5px] w-7 rounded-full bg-[#C9A45C]"
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#454846] dark:text-[#929D95]">
                WHAT SETS US APART
              </span>
            </div>

            <h2
              id="what-sets-us-apart-heading"
              className="font-serif text-[26px] font-semibold leading-[1.09] tracking-[-0.015em] text-[#222321] dark:text-[#F4F0E8] lg:text-[34px] xl:text-[38px]"
            >
              <span className="block">Beyond Business Services.</span>
              <span className="block">
                Built Around{' '}
                <span className="relative inline-block italic font-semibold text-[#063D29] dark:text-[#2EB04B]">
                  Your Success.
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 240 12"
                    fill="none"
                    className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full"
                  >
                    <path
                      d="M4 9.5 C 74 3, 174 2, 236 7"
                      stroke="#C9A45C"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h2>

            <p className="mx-auto mt-2 max-w-[520px] text-[12.5px] leading-[1.55] text-[#4A4E4B] dark:text-[#C1C8C1] lg:text-[13.5px] xl:text-[14px]">
              More than paperwork and processes, we bring UAE expertise,
              personalized support and a long-term commitment to your business
              journey.
            </p>
          </header>

          {/* ZONE C: Sculpted Emerald Platform (z-[2]) Supporting Ascending Liquid Glass Pillars (z-[4]) */}
          <div className="relative mx-auto h-[370px] w-full lg:h-[420px] xl:h-[460px]">
            {/* LAYER 3: Continuous Sculpted Emerald Platform (Strictly BEHIND All Pillars) */}
            <m.div
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
              }
              className="pointer-events-none absolute inset-0 z-[2]"
            >
              <svg
                viewBox="0 0 1320 460"
                preserveAspectRatio="none"
                fill="none"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient
                    id="apart-platform-primary"
                    x1="0.12"
                    y1="0.9"
                    x2="0.95"
                    y2="0.2"
                  >
                    <stop offset="0%" stopColor="#063D29" />
                    <stop offset="52%" stopColor="#07563D" />
                    <stop offset="100%" stopColor="#043322" />
                  </linearGradient>
                  <linearGradient
                    id="apart-platform-primary-dark"
                    x1="0.05"
                    y1="0.8"
                    x2="0.95"
                    y2="0.2"
                  >
                    <stop offset="0%" stopColor="#085337" />
                    <stop offset="52%" stopColor="#0B6B45" />
                    <stop offset="100%" stopColor="#063D28" />
                  </linearGradient>
                  <linearGradient
                    id="apart-platform-secondary"
                    x1="0.15"
                    y1="1"
                    x2="0.9"
                    y2="0.3"
                  >
                    <stop offset="0%" stopColor="#086144" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#0A7552" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#063D29" stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient
                    id="apart-platform-gold"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#C9A45C" stopOpacity="0.55" />
                    <stop offset="38%" stopColor="#F5DDA0" stopOpacity="0.92" />
                    <stop offset="76%" stopColor="#C9A45C" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#C9A45C" stopOpacity="0.48" />
                  </linearGradient>
                </defs>

                {/* Primary Sculpted Emerald Platform Body */}
                <path
                  d="M 175 434 C 460 412, 860 356, 1249 268 C 1276 262, 1292 232, 1292 206 C 1300 264, 1276 314, 1210 342 C 1020 410, 650 444, 175 434 Z"
                  fill="url(#apart-platform-primary)"
                  className="dark:hidden"
                />
                <path
                  d="M 175 434 C 460 412, 860 356, 1249 268 C 1276 262, 1292 232, 1292 206 C 1300 264, 1276 314, 1210 342 C 1020 410, 650 444, 175 434 Z"
                  fill="url(#apart-platform-primary-dark)"
                  className="hidden dark:block"
                />

                {/* Secondary Curved Emerald Highlight Surface */}
                <path
                  d="M 225 431 C 500 412, 860 364, 1235 282 C 1255 278, 1272 264, 1280 248 C 1274 294, 1244 324, 1188 346 C 990 410, 635 440, 225 431 Z"
                  fill="url(#apart-platform-secondary)"
                />

                {/* Upper Contact Contour Gold Rim */}
                <path
                  d="M 178 433 C 462 411, 860 355, 1249 267 C 1274 261, 1289 234, 1291 208"
                  stroke="url(#apart-platform-gold)"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Subtle Lower Contour Rim */}
                <path
                  d="M 200 434 C 640 442, 1010 409, 1208 341"
                  stroke="#C9A45C"
                  strokeOpacity="0.34"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </m.div>

            {/* LAYER 4–6: Four Ascending Liquid Glass Pillars Seated ON the Platform */}
            {DIFFERENTIATION_PILLARS.map((pillar, index) => (
              <div
                key={pillar.id}
                style={{
                  left: `${pillar.desktopLeftPercent}%`,
                  bottom: `${pillar.desktopBottomPercent}%`,
                  height: `${pillar.desktopHeightPercent}%`,
                }}
                className="absolute z-[4] w-[15.6%]"
              >
                <WhatSetsUsApartPillar
                  pillar={pillar}
                  index={index}
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MOBILE DEDICATED VERTICAL ARCHITECTURE (< md) ================= */}
      <div className="relative z-10 px-5 pb-12 pt-6 md:hidden">
        {/* Softly Blended Top UAE Architectural Opening */}
        <div
          className="relative mx-auto -mt-2 mb-4 h-44 w-full max-w-md overflow-hidden"
          style={{
            maskImage:
              'radial-gradient(ellipse 92% 88% at 50% 48%, #000 54%, rgba(0,0,0,0.45) 78%, transparent 98%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 92% 88% at 50% 48%, #000 54%, rgba(0,0,0,0.45) 78%, transparent 98%)',
          }}
        >
          <Image
            src="/images/about/sets-us-apart-arch-left.webp"
            alt="Traditional UAE sandstone archway overlooking Burj Khalifa at golden hour"
            fill
            loading="eager"
            unoptimized
            sizes="94vw"
            className="object-cover object-[48%_44%]"
          />
        </div>

        {/* Mobile Heading */}
        <div className="mx-auto max-w-md text-center">
          <div className="mb-2 flex items-center justify-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-[1.5px] w-6 rounded-full bg-[#C9A45C]"
            />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#454846] dark:text-[#929D95]">
              WHAT SETS US APART
            </span>
          </div>

          <p className="font-serif text-[28px] font-semibold leading-[1.12] tracking-[-0.015em] text-[#222321] dark:text-[#F4F0E8]">
            Beyond Business Services. Built Around{' '}
            <span className="relative inline-block italic font-semibold text-[#063D29] dark:text-[#2EB04B]">
              Your Success.
              <svg
                aria-hidden="true"
                viewBox="0 0 240 12"
                fill="none"
                className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full"
              >
                <path
                  d="M4 9.5 C 74 3, 174 2, 236 7"
                  stroke="#C9A45C"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </p>

          <p className="mx-auto mt-2.5 text-[13.5px] leading-[1.6] text-[#4A4E4B] dark:text-[#C1C8C1]">
            More than paperwork and processes, we bring UAE expertise,
            personalized support and a long-term commitment to your business
            journey.
          </p>
        </div>

        {/* Vertical Stack of 4 Liquid Glass Pillars Seated on Compact Emerald Plinths */}
        <div className="mx-auto mt-7 flex max-w-sm flex-col gap-6">
          {DIFFERENTIATION_PILLARS.map((pillar, index) => (
            <div key={`mob-${pillar.id}`} className="relative">
              <WhatSetsUsApartPillar
                pillar={pillar}
                index={index}
                variant="mobile"
                className="relative z-[2]"
              />
              {/* Compact Emerald Architectural Base Seated Beneath Glass Card */}
              <div
                aria-hidden="true"
                className="relative z-[1] mx-auto -mt-1 h-2.5 w-[94%] rounded-b-full bg-[linear-gradient(90deg,#063D29_0%,#07563D_50%,#063D29_100%)] shadow-[0_8px_16px_-6px_rgba(6,61,41,0.32)] ring-1 ring-[#C9A45C]/45 dark:bg-[linear-gradient(90deg,#063D28_0%,#0B6B45_50%,#063D28_100%)] dark:shadow-[0_10px_22px_-6px_rgba(0,0,0,0.65)] dark:ring-[#C9A45C]/35"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatSetsUsApartSection;
