'use client';

import { type MouseEvent } from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { m, useReducedMotion } from 'motion/react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export function BranchHero() {
  const prefersReducedMotion = useReducedMotion();

  const handleExploreClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('branch-directory');
    if (!target) return;

    event.preventDefault();
    const top = Math.max(
      0,
      window.scrollY + target.getBoundingClientRect().top - 72
    );
    window.history.pushState(null, '', '#branch-directory');
    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="branch-hero"
      aria-labelledby="branch-hero-heading"
      className="relative overflow-hidden bg-[#FAF9F5] transition-colors duration-300 dark:bg-[#050B08]"
    >
      {/* ================= FULL-BLEED ARCHITECTURAL PHOTOGRAPHY ================= */}
      <m.div
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.01 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
        }
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        {/* Desktop & Tablet (md+): Slightly Zoomed-Out Framing Anchored Right, Melting Into Left & Top Background */}
        <div className="relative hidden h-full w-full md:block">
          <div className="absolute inset-y-0 right-0 w-[92%] lg:w-[86%] xl:w-[84%]">
            <Image
              src="/images/branches/branch-hero-desktop.webp"
              alt="Contemporary UAE travertine limestone commercial pavilion at golden hour with bronze cantilevered canopy, illuminated mashrabiya screens, receding colonnade with date palms, and polished stone plaza"
              fill
              priority
              loading="eager"
              unoptimized
              fetchPriority="high"
              sizes="(min-width: 1280px) 84vw, (min-width: 1024px) 86vw, 92vw"
              className="object-cover object-[72%_52%] transition-[filter] duration-300 dark:brightness-[0.76] dark:contrast-[1.08] dark:saturate-[0.94] lg:object-[64%_50%]"
            />
            {/* Seamless Left Edge Blend Into Section Background */}
            <div className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/85 to-transparent dark:from-[#050B08] dark:via-[#050B08]/90 lg:w-56" />
          </div>
        </div>

        {/* Mobile (< md): Dedicated Portrait Pavilion Portico & Plaza */}
        <Image
          src="/images/branches/branch-hero-mobile.webp"
          alt="Contemporary UAE travertine limestone pavilion entrance at golden hour with illuminated mashrabiya canopy, date palm, and warm glass lobby"
          fill
          priority
          loading="eager"
          unoptimized
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[50%_92%] transition-[filter] duration-300 dark:brightness-[0.76] dark:contrast-[1.08] dark:saturate-[0.94] md:hidden"
        />

        {/* Light Mode: Seamless Top & Left-Sky Readability Feathering */}
        <div className="absolute inset-x-0 top-0 h-[58%] bg-gradient-to-b from-[#FAF9F5] via-[#FAF9F5]/75 to-transparent dark:hidden md:hidden" />
        <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_24%_36%,rgba(250,249,245,0.92)_0%,rgba(250,249,245,0.62)_40%,transparent_72%)] dark:hidden md:block" />

        {/* Dark Mode: Controlled Obsidian-Emerald Dusk Sky & Left Atmospheric Scrim (Preserving Warm Lit Stone) */}
        <div className="absolute inset-x-0 top-0 hidden h-[64%] bg-gradient-to-b from-[#050B08] via-[#061810]/85 to-transparent dark:block md:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(108deg,#050B08_0%,rgba(5,11,8,0.90)_28%,rgba(6,22,15,0.48)_48%,rgba(5,11,8,0.12)_72%,transparent_100%)] dark:md:block" />

        {/* Seamless Top Edge Blend With Page Background (No Visible Image Top Seam) */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF9F5] via-[#FAF9F5]/80 to-transparent dark:from-[#050B08] dark:via-[#050B08]/85 md:h-36" />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#FAF9F5]/35 to-transparent dark:h-16 dark:from-[#050B08]/75" />
      </m.div>

      {/* ================= ARCHITECTURAL CONTOUR LINE (md+) ================= */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 660"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full select-none md:block"
      >
        <defs>
          <linearGradient
            id="branchHeroContourLight"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#146736" stopOpacity="0.18" />
            <stop offset="48%" stopColor="#C9A45C" stopOpacity="0.68" />
            <stop offset="82%" stopColor="#C9A45C" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C2242B" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient
            id="branchHeroContourDark"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#2EB04B" stopOpacity="0.22" />
            <stop offset="48%" stopColor="#D2B475" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#D2B475" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#C2242B" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Sweeping Fine Champagne-Gold Architectural Arc Framing Sky Negative Space */}
        <m.path
          d="M 120 658 Q 520 510 695 270 T 1245 4"
          fill="none"
          stroke="url(#branchHeroContourLight)"
          strokeWidth="1.35"
          className="dark:hidden"
          initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 1.05, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
          }
        />
        <m.path
          d="M 120 658 Q 520 510 695 270 T 1245 4"
          fill="none"
          stroke="url(#branchHeroContourDark)"
          strokeWidth="1.35"
          className="hidden dark:block"
          initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 1.05, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
          }
        />
      </svg>

      {/* ================= FOREGROUND EDITORIAL CONTENT ================= */}
      <div className="relative z-10 mx-auto flex min-h-[540px] max-w-[1440px] flex-col justify-start px-5 pb-16 pt-8 sm:min-h-[580px] sm:px-8 sm:pt-10 md:min-h-[560px] md:justify-center md:px-10 md:pb-20 md:pt-10 lg:min-h-[620px] lg:px-[7%] lg:pb-24 lg:pt-12 xl:min-h-[660px]">
        <div className="max-w-[460px] text-center md:max-w-[450px] md:text-left lg:max-w-[500px]">
          {/* Eyebrow */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.55, delay: 0.04, ease: [0.22, 1, 0.36, 1] }
            }
            className="mb-3 flex items-center justify-center gap-3 md:justify-start"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.23em] text-[#146736] dark:text-[#2EB04B]">
              OUR BRANCH NETWORK
            </span>
            <span
              aria-hidden="true"
              className="h-[1.5px] w-14 rounded-full bg-gradient-to-r from-[#146736]/75 via-[#C9A45C] to-[#C2242B]/70 dark:from-[#2EB04B]/80 dark:via-[#D2B475] dark:to-[#C2242B]/80"
            />
          </m.div>

          {/* Single Semantic H1 with Brand Curved Underline */}
          <m.h1
            id="branch-hero-heading"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
            }
            className="font-serif text-[34px] font-semibold leading-[1.06] tracking-[-0.015em] text-[#0B3B28] dark:text-[#F4F0E8] sm:text-[42px] md:text-[44px] lg:text-[50px] xl:text-[54px]"
          >
            Find Your Nearest
            <br />
            Takhlees{' '}
            <span className="relative inline-block text-[#B88E44] dark:text-[#D2B475]">
              Branch
              <svg
                aria-hidden="true"
                viewBox="0 0 180 12"
                fill="none"
                className="pointer-events-none absolute -bottom-1.5 left-0 h-2.5 w-full"
              >
                <path
                  d="M3 9.5 C 52 2.5, 130 2, 177 7"
                  stroke="#C9A45C"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </m.h1>

          {/* Supporting Description */}
          <m.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }
            }
            className="mx-auto mt-3.5 max-w-[400px] text-[14.5px] leading-[1.6] text-[#2C3530] dark:text-[#D4DBD5] md:mx-0 sm:text-[15px]"
          >
            Explore Takhlees branches and connect with the branch that works
            best for you.
          </m.p>

          {/* Single Primary Liquid-Glass CTA */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }
            }
            className="mt-5 flex justify-center md:justify-start"
          >
            <LiquidButton
              asChild
              variant="emerald"
              size="lg"
              className="group/cta h-10 border border-[#C9A45C]/45 bg-[#0A6B36]/90 px-5 text-[13.5px] font-semibold backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.42),0_12px_28px_-8px_rgba(6,61,41,0.45)] hover:bg-[#085C2E]/95 dark:border-[#C9A45C]/50 dark:bg-[#0B6B45]/85 dark:hover:bg-[#0E7F52]/90"
            >
              <a href="#branch-directory" onClick={handleExploreClick}>
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Explore All Branches</span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </LiquidButton>
          </m.div>
        </div>
      </div>

      {/* ================= LAYERED EMERALD & CHAMPAGNE BOTTOM WAVES ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden leading-none"
      >
        <svg
          viewBox="0 0 1440 76"
          preserveAspectRatio="none"
          className="block h-[42px] w-full sm:h-[52px] md:h-[60px] lg:h-[68px]"
        >
          <defs>
            <linearGradient
              id="branchWaveFillLight"
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
              id="branchWaveFillDark"
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
              id="branchWaveGoldCrest"
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

          {/* Back Translucent Wave & Fine Champagne Hairline */}
          <path
            d="M0,34 C340,6 700,56 1080,22 C1260,6 1370,18 1440,28 L1440,76 L0,76 Z"
            className="fill-[#0B3B28]/10 dark:fill-[#146736]/20"
          />
          <path
            d="M0,34 C340,6 700,56 1080,22 C1260,6 1370,18 1440,28"
            fill="none"
            stroke="#C9A45C"
            strokeOpacity="0.45"
            strokeWidth="1.1"
          />

          {/* Foreground Rich Emerald Wave & Champagne-Gold Crest */}
          <path
            d="M0,48 C360,22 740,66 1130,36 C1295,24 1385,34 1440,42 L1440,76 L0,76 Z"
            fill="url(#branchWaveFillLight)"
            className="dark:hidden"
          />
          <path
            d="M0,48 C360,22 740,66 1130,36 C1295,24 1385,34 1440,42 L1440,76 L0,76 Z"
            fill="url(#branchWaveFillDark)"
            className="hidden dark:block"
          />
          <path
            d="M0,48 C360,22 740,66 1130,36 C1295,24 1385,34 1440,42"
            fill="none"
            stroke="url(#branchWaveGoldCrest)"
            strokeWidth="1.75"
          />
        </svg>
      </div>
    </section>
  );
}

export default BranchHero;
