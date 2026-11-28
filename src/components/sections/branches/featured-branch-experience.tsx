'use client';

import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import { m, useReducedMotion } from 'motion/react';
import PolaroidLineCarousel, {
  pad2,
  type Slide,
} from '@/components/ui/polaroid-line-carousel';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { FEATURED_BRANCHES } from '@/features/branches/featured-branches';

const CAROUSEL_SLIDES: Slide[] = FEATURED_BRANCHES.map((branch) => ({
  id: branch.id,
  image: branch.image,
  title: branch.name,
  caption: branch.locationLabel,
  alt: branch.alt,
  href: branch.href,
  palette: branch.palette,
  seed: branch.seed,
}));

export function FeaturedBranchExperience() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="featured-branches"
      aria-labelledby="featured-branches-heading"
      className="relative overflow-hidden bg-[#FAF9F5] pb-16 pt-14 transition-colors duration-300 dark:bg-[#06110C] md:pb-20 md:pt-16 lg:pb-24 lg:pt-20"
    >
      {/* ================= ARCHITECTURAL GALLERY BACKDROP ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <Image
          src="/images/about/our-story-bg-light.webp"
          alt=""
          fill
          loading="eager"
          unoptimized
          sizes="100vw"
          className="object-cover object-center opacity-[0.42] dark:hidden"
        />
        <Image
          src="/images/about/our-story-bg-dark.webp"
          alt=""
          fill
          loading="eager"
          unoptimized
          sizes="100vw"
          className="hidden object-cover object-center opacity-[0.48] dark:block"
        />
        {/* Soft Atmospheric & Refractable Emerald-Gold Radial Light Behind Cards */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(20,103,54,0.10)_0%,rgba(201,164,92,0.12)_38%,rgba(250,249,245,0.88)_78%)] dark:bg-[radial-gradient(ellipse_at_50%_55%,rgba(46,176,75,0.14)_0%,rgba(201,164,92,0.10)_38%,rgba(6,17,12,0.92)_78%)]" />
      </div>

      {/* ================= TOP LAYERED EMERALD & CHAMPAGNE WAVES ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 overflow-hidden leading-none"
      >
        <svg
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="block h-[36px] w-full sm:h-[44px] md:h-[52px]"
        >
          <defs>
            <linearGradient
              id="sec2TopWaveGold"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#146736" stopOpacity="0.25" />
              <stop offset="35%" stopColor="#E6C98A" stopOpacity="0.90" />
              <stop offset="70%" stopColor="#C9A45C" stopOpacity="0.80" />
              <stop offset="100%" stopColor="#146736" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Back Translucent Wave */}
          <path
            d="M0,0 L1440,0 L1440,28 C1180,54 840,14 480,44 C260,60 110,42 0,24 Z"
            className="fill-[#0B3B28]/10 dark:fill-[#146736]/22"
          />
          <path
            d="M0,24 C110,42 260,60 480,44 C840,14 1180,54 1440,28"
            fill="none"
            stroke="#C9A45C"
            strokeOpacity="0.45"
            strokeWidth="1.1"
          />

          {/* Foreground Rich Emerald Top Ribbon & Gold Crest */}
          <path
            d="M0,0 L1440,0 L1440,18 C1140,42 780,6 420,30 C210,44 90,28 0,14 Z"
            className="fill-[#0B3B28] dark:fill-[#072419]"
          />
          <path
            d="M0,14 C90,28 210,44 420,30 C780,6 1140,42 1440,18"
            fill="none"
            stroke="url(#sec2TopWaveGold)"
            strokeWidth="1.6"
          />
        </svg>
      </div>

      {/* ================= SECTION HEADING ================= */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[7%]">
        <m.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          }
          className="mx-auto max-w-[620px] text-center"
        >
          <div className="mb-2.5 flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-[1.5px] w-7 rounded-full bg-gradient-to-r from-transparent to-[#C2242B]/80 dark:to-[#C9A45C]"
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.23em] text-[#146736] dark:text-[#2EB04B]">
              FEATURED BRANCH EXPERIENCE
            </span>
            <span
              aria-hidden="true"
              className="h-[1.5px] w-7 rounded-full bg-gradient-to-l from-transparent to-[#146736]/75 dark:to-[#C9A45C]"
            />
          </div>

          <h2
            id="featured-branches-heading"
            className="font-serif text-[30px] font-semibold leading-[1.1] tracking-[-0.015em] text-[#0B3B28] dark:text-[#F4F0E8] sm:text-[36px] md:text-[40px]"
          >
            Explore Our{' '}
            <span className="relative inline-block text-[#B88E44] dark:text-[#D2B475]">
              Key Branches
              <svg
                aria-hidden="true"
                viewBox="0 0 240 12"
                fill="none"
                className="pointer-events-none absolute -bottom-1.5 left-0 h-2.5 w-full"
              >
                <path
                  d="M4 9.5 C 74 2.5, 174 2, 236 7"
                  stroke="#C9A45C"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-[510px] text-[14px] leading-[1.6] text-[#3F4441] dark:text-[#C9D1CA] sm:text-[15px]">
            Take a closer look at selected Takhlees locations and discover the
            people and places behind our branch network.
          </p>
        </m.div>
      </div>

      {/* ================= LIQUID-GLASS HANGING POLAROID CAROUSEL ================= */}
      <m.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }
        }
        className="relative z-10 mt-3 sm:mt-4"
      >
        <PolaroidLineCarousel
          slides={CAROUSEL_SLIDES}
          height={430}
          cardWidth={286}
          sag={40}
          swing={0.85}
          autoplay={0}
          initialIndex={2}
          string="#C9A45C"
          ariaLabel="Featured Takhlees branches hanging Polaroid gallery"
          renderFooter={(activeIndex, _slide, controls) => {
            const activeBranch =
              FEATURED_BRANCHES[activeIndex] ?? FEATURED_BRANCHES[0];

            return (
              <div className="mx-auto mt-1 max-w-[980px] px-5 sm:px-8 md:px-10">
                <div className="flex flex-col items-center justify-between gap-4 border-t border-[#C9A45C]/25 pt-4 sm:flex-row sm:gap-6">
                  {/* Selected Branch Identity + Map Link */}
                  <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#146736] dark:text-[#C9A45C]">
                      <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span>{activeBranch.locationLabel}</span>
                    </div>
                    <div className="mt-0.5 flex flex-col items-center gap-2 sm:items-start">
                      <h3 className="font-serif text-[22px] font-semibold leading-tight text-[#0B3B28] dark:text-[#F4F0E8] sm:text-[24px]">
                        {activeBranch.name}
                      </h3>
                      <LiquidButton
                        asChild
                        variant="glass"
                        size="sm"
                        className="h-6 gap-1 rounded-full border-[#C9A45C]/45 bg-white/50 px-2 text-[10.5px] font-semibold tracking-[0.02em] text-[#0B3B28] has-[>svg]:px-2 dark:border-[#C9A45C]/35 dark:bg-[#0B1D15]/60 dark:text-[#D2B475]"
                      >
                        <a
                          href={activeBranch.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${activeBranch.name} location on Google Maps`}
                        >
                          <MapPin
                            className="h-3 w-3 shrink-0"
                            aria-hidden="true"
                          />
                          <span>View on Map</span>
                          <ExternalLink
                            className="h-2.5 w-2.5 shrink-0 opacity-75"
                            aria-hidden="true"
                          />
                        </a>
                      </LiquidButton>
                    </div>
                  </div>

                  {/* Pagination & Liquid-Glass Previous / Next Controls */}
                  <div className="flex items-center gap-2.5">
                    <LiquidButton
                      type="button"
                      variant="glass"
                      size="icon"
                      aria-label="Previous featured branch"
                      onClick={controls.prev}
                      disabled={activeIndex === 0}
                      className="h-10 w-10 border-[#C9A45C]/45 bg-white/50 text-[#0B3B28] dark:border-[#C9A45C]/35 dark:bg-[#0B1D15]/60 dark:text-[#F4F0E8]"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </LiquidButton>

                    <div
                      role="tablist"
                      aria-label="Select featured branch"
                      className="flex items-center gap-2 px-1.5"
                    >
                      {FEATURED_BRANCHES.map((branch, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                          <button
                            key={branch.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-label={`Show ${branch.name}`}
                            onClick={() => controls.goTo(idx)}
                            className={
                              isActive
                                ? 'h-2 w-6 rounded-full bg-[#0B3B28] transition-all duration-300 dark:bg-[#C9A45C]'
                                : 'h-2 w-2 rounded-full bg-[#C9A45C]/45 transition-all duration-300 hover:bg-[#146736]/75 dark:bg-[#C9A45C]/30 dark:hover:bg-[#C9A45C]/70'
                            }
                          />
                        );
                      })}
                    </div>

                    <span className="min-w-[44px] text-center font-mono text-[11px] tracking-[0.14em] text-[#545955] dark:text-[#929D95]">
                      <strong className="font-semibold text-[#0B3B28] dark:text-[#F4F0E8]">
                        {pad2(activeIndex + 1)}
                      </strong>
                      /{pad2(controls.total)}
                    </span>

                    <LiquidButton
                      type="button"
                      variant="glass"
                      size="icon"
                      aria-label="Next featured branch"
                      onClick={controls.next}
                      disabled={activeIndex === controls.total - 1}
                      className="h-10 w-10 border-[#C9A45C]/45 bg-white/50 text-[#0B3B28] dark:border-[#C9A45C]/35 dark:bg-[#0B1D15]/60 dark:text-[#F4F0E8]"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </LiquidButton>
                  </div>
                </div>
              </div>
            );
          }}
        />
      </m.div>

      {/* ================= BOTTOM LAYERED EMERALD & CHAMPAGNE WAVES ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden leading-none"
      >
        <svg
          viewBox="0 0 1440 68"
          preserveAspectRatio="none"
          className="block h-[38px] w-full sm:h-[46px] md:h-[54px]"
        >
          <defs>
            <linearGradient
              id="sec2BottomWaveLight"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#083623" />
              <stop offset="50%" stopColor="#146736" />
              <stop offset="100%" stopColor="#083623" />
            </linearGradient>
            <linearGradient
              id="sec2BottomWaveDark"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#051D14" />
              <stop offset="50%" stopColor="#0D4A31" />
              <stop offset="100%" stopColor="#051D14" />
            </linearGradient>
            <linearGradient
              id="sec2BottomWaveGold"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#C9A45C" stopOpacity="0.35" />
              <stop offset="35%" stopColor="#E6C98A" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#C9A45C" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#146736" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <path
            d="M0,30 C340,6 700,52 1080,20 C1260,6 1370,18 1440,26 L1440,68 L0,68 Z"
            className="fill-[#0B3B28]/10 dark:fill-[#146736]/20"
          />
          <path
            d="M0,30 C340,6 700,52 1080,20 C1260,6 1370,18 1440,26"
            fill="none"
            stroke="#C9A45C"
            strokeOpacity="0.45"
            strokeWidth="1.1"
          />
          <path
            d="M0,44 C360,20 740,60 1130,32 C1295,22 1385,32 1440,38 L1440,68 L0,68 Z"
            fill="url(#sec2BottomWaveLight)"
            className="dark:hidden"
          />
          <path
            d="M0,44 C360,20 740,60 1130,32 C1295,22 1385,32 1440,38 L1440,68 L0,68 Z"
            fill="url(#sec2BottomWaveDark)"
            className="hidden dark:block"
          />
          <path
            d="M0,44 C360,20 740,60 1130,32 C1295,22 1385,32 1440,38"
            fill="none"
            stroke="url(#sec2BottomWaveGold)"
            strokeWidth="1.65"
          />
        </svg>
      </div>
    </section>
  );
}

export default FeaturedBranchExperience;
