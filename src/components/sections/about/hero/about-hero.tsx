import Image from 'next/image';
import { ThemeImage } from '@/components/ui/theme-image';

/*
 * Desktop architectural opening inside the right 58% container (0..1 objectBoundingBox).
 * Sweeps from upper-center-left down to lower-left, curves along bottom, and connects flush to x=1.00.
 */
const DESKTOP_ARCH_CLIP =
  'M 0.42,0 C 0.25,0.16 0.08,0.44 0.02,0.75 C 0,0.87 0.06,0.94 0.22,0.95 C 0.5,0.97 0.78,0.91 1,0.78 L 1,0 Z';

const MOBILE_ARCH_CLIP =
  'M 0.03,0.26 C 0.14,0.07 0.34,0.01 0.56,0.02 C 0.78,0.03 0.94,0.13 0.97,0.29 L 0.97,0.92 C 0.72,0.97 0.34,0.96 0.03,0.88 Z';

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative overflow-hidden bg-[linear-gradient(155deg,#FCFBF8_0%,#F7F5EF_52%,#F1EEE5_100%)] transition-colors duration-300 dark:bg-[#050B08] dark:bg-none lg:min-h-[580px] lg:max-h-[680px]"
    >
      {/* Hidden SVG ClipPaths */}
      <svg
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="about-v5-desktop-arch" clipPathUnits="objectBoundingBox">
            <path d={DESKTOP_ARCH_CLIP} />
          </clipPath>
          <clipPath id="about-v5-mobile-arch" clipPathUnits="objectBoundingBox">
            <path d={MOBILE_ARCH_CLIP} />
          </clipPath>
        </defs>
      </svg>

      {/* ================= LAYER 1: ARCHITECTURAL DUBAI SKYLINE ILLUSTRATION ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] select-none overflow-hidden lg:bottom-2"
      >
        <div
          className="mx-auto h-[155px] w-full max-w-[1440px] sm:h-[195px] lg:ml-[18%] lg:h-[225px] lg:w-[70%]"
          style={{
            maskImage:
              'radial-gradient(ellipse 58% 82% at 54% 78%, #000 28%, rgba(0,0,0,0.45) 56%, transparent 84%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 58% 82% at 54% 78%, #000 28%, rgba(0,0,0,0.45) 56%, transparent 84%)',
          }}
        >
          <ThemeImage
            lightSrc="/images/about/dubai-skyline-about-light.webp"
            darkSrc="/images/testimonials/dubai-skyline-dark.webp"
            alt=""
            width={1920}
            height={620}
            sizes="(max-width: 1023px) 100vw, 70vw"
            loading="lazy"
            className="h-full w-full object-cover object-bottom opacity-60 mix-blend-multiply dark:opacity-30 dark:mix-blend-normal"
          />
        </div>
      </div>

      {/* ================= LAYER 2: DESKTOP RIGHT ARCHITECTURAL OPENING (BALANCED CROP & SOFT TOP MERGE) ================= */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[2] hidden w-[58%] lg:block"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.62) 10%, #000 24%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.62) 10%, #000 24%)',
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            clipPath: 'url(#about-v5-desktop-arch)',
            WebkitClipPath: 'url(#about-v5-desktop-arch)',
          }}
        >
          <Image
            src="/images/about/dubai-arch-golden-hour.webp"
            alt="Golden-hour view of the Dubai skyline, Burj Khalifa, waterfront, and palm trees framed through a UAE mashrabiya stone arch"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="58vw"
            className="object-cover object-[42%_50%] contrast-[1.02] saturate-[0.98]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden shadow-[inset_0_0_30px_rgba(5,11,8,0.48)] dark:block"
          />
        </div>

        {/* Single Subtle Champagne-Gold Crest Along Upper-Left Arch Opening */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        >
          <path
            d="M 42,0 C 25,16 8,44 2,75"
            fill="none"
            stroke="#C9A45C"
            strokeOpacity="0.65"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* ================= LAYER 3: UNIFIED DESKTOP 3-LAYER BOTTOM WAVE (ZERO GAP) ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] hidden select-none overflow-hidden lg:block"
      >
        <svg
          viewBox="0 0 1440 720"
          preserveAspectRatio="none"
          fill="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="v5-ivory-wave" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#F7F5EF" stopOpacity="0.98" />
              <stop offset="52%" stopColor="#F7F5EF" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#F7F5EF" stopOpacity="0.98" />
            </linearGradient>
            <linearGradient id="v5-emerald-wave" x1="15%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#063D29" stopOpacity="0.98" />
              <stop offset="55%" stopColor="#075C3D" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#033120" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="v5-emerald-wave-dark" x1="15%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#095236" stopOpacity="0.98" />
              <stop offset="55%" stopColor="#0B6B45" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#063B26" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="v5-gold-line" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#C9A45C" stopOpacity="0.1" />
              <stop offset="38%" stopColor="#C9A45C" stopOpacity="0.78" />
              <stop offset="76%" stopColor="#E5C883" stopOpacity="0.58" />
              <stop offset="100%" stopColor="#C9A45C" stopOpacity="0.14" />
            </linearGradient>
          </defs>

          {/* Main Ivory Wave — Flows From Bottom-Left -> Lower-Center -> Directly Beneath Photo */}
          <path
            d="M0 568 C 215 628, 435 674, 700 628 C 930 588, 1185 576, 1440 475 L1440 720 L0 720 Z"
            fill="url(#v5-ivory-wave)"
            className="dark:fill-[#050B08]"
          />

          {/* Restrained Deep Emerald Wave — Connects Directly to Lower-Right of Architectural Photo */}
          <path
            d="M1065 720 C 1185 684, 1315 608, 1440 515 L1440 720 Z"
            fill="url(#v5-emerald-wave)"
            className="dark:hidden"
          />
          <path
            d="M1065 720 C 1185 684, 1315 608, 1440 515 L1440 720 Z"
            fill="url(#v5-emerald-wave-dark)"
            className="hidden dark:block"
          />

          {/* Single Thin Champagne-Gold Curve Along Controlled Portion of Ivory Wave */}
          <path
            d="M120 598 C 320 648, 520 658, 700 628 C 840 605, 975 590, 1105 572"
            stroke="url(#v5-gold-line)"
            strokeWidth="1.4"
          />
        </svg>
      </div>

      {/* ================= TABLET & MOBILE BOTTOM WAVE (RESTRAINED) ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] select-none overflow-hidden lg:hidden"
      >
        <svg
          viewBox="0 0 768 140"
          preserveAspectRatio="none"
          fill="none"
          className="h-[92px] w-full sm:h-[112px]"
        >
          <path
            d="M0 44 C 180 96, 390 112, 768 32 L768 140 L0 140 Z"
            fill="#F7F5EF"
            className="dark:fill-[#050B08]"
          />
          <path
            d="M420 140 C 555 114, 670 68, 768 24 L768 140 Z"
            fill="#075C3D"
            className="dark:fill-[#0B6B45]"
          />
          <path
            d="M80 68 C 230 100, 395 102, 560 72"
            stroke="#C9A45C"
            strokeOpacity="0.65"
            strokeWidth="1.3"
          />
        </svg>
      </div>

      {/* ================= LEFT EDITORIAL CONTENT + TABLET/MOBILE ARCHITECTURAL VIEWS ================= */}
      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col justify-center px-5 pb-10 pt-8 sm:px-8 md:pb-12 md:pt-10 lg:min-h-[580px] lg:pb-12 lg:pl-[7%] lg:pr-8 lg:pt-10">
        {/* Left Side — Minimal Editorial Typography */}
        <div className="max-w-[520px] lg:max-w-[40%]">
          <div className="mb-4 flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="h-[1.5px] w-7 rounded-full bg-[#075C3D] dark:bg-[#2EB04B]"
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#454846] dark:text-[#929D95]">
              ABOUT TAKHLEES
            </span>
          </div>

          <h1
            id="about-hero-heading"
            className="font-serif text-[36px] font-semibold leading-[1.09] tracking-[-0.015em] text-[#1C1C1C] dark:text-[#F4F0E8] sm:text-[46px] lg:text-[52px]"
          >
            A Trusted Partner
            <br />
            in{' '}
            <span className="relative inline-block italic font-semibold text-[#075C3D] dark:text-[#2EB04B]">
              the UAE
              <svg
                aria-hidden="true"
                viewBox="0 0 210 14"
                fill="none"
                className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full"
              >
                <path
                  d="M3 10.5 C 58 3.5, 148 2.5, 207 8"
                  stroke="#C9A45C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-5 max-w-[480px] text-[15px] leading-[1.68] text-[#4A4E4B] dark:text-[#C1C8C1] sm:text-[16px]">
            Empowering businesses and investors with comprehensive setup, PRO
            and documentation support across the UAE since 2010.
          </p>
        </div>

        {/* Dedicated Tablet & Mobile Architectural Opening (< lg) */}
        <div className="relative mt-8 aspect-[16/10] w-full sm:aspect-[16/9] lg:hidden">
          <div
            className="relative z-[1] h-full w-full overflow-hidden"
            style={{
              clipPath: 'url(#about-v5-mobile-arch)',
              WebkitClipPath: 'url(#about-v5-mobile-arch)',
            }}
          >
            <Image
              src="/images/about/dubai-arch-golden-hour.webp"
              alt="Golden-hour view of the Dubai skyline, Burj Khalifa, waterfront, and palm trees framed through a UAE mashrabiya stone arch"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="96vw"
              className="object-cover object-[42%_50%] contrast-[1.03] saturate-[1.03]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden shadow-[inset_0_0_24px_rgba(5,11,8,0.45)] dark:block"
            />
          </div>
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
          >
            <path
              d="M 3,26 C 14,7 34,1 56,2 C 78,3 94,13 97,29"
              fill="none"
              stroke="#C9A45C"
              strokeOpacity="0.68"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
