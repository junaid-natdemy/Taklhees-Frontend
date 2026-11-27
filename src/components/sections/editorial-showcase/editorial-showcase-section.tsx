'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeImage } from '@/components/ui/theme-image';
import { m, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Briefcase,
  FileText,
  Plane,
  Users,
} from 'lucide-react';
import { MotionTiltCard } from '@/components/ui/motion-tilt-card';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

const SERVICE_HIGHLIGHTS = [
  { icon: Briefcase, label: 'Business\nLicensing' },
  { icon: Users, label: 'Government\nRelations' },
  { icon: FileText, label: 'Document\nClearance' },
  { icon: Plane, label: 'Visa\nServices' },
] as const;

/* Normalized 0..100 organic asymmetric contour for the hero consultation visual */
const VISUAL_ORGANIC_PATH_100 =
  'M 18,3 C 38,0.5 68,1.5 88,3 C 96,4 98.5,11 98.5,24 C 98.5,46 97,66 96,78 C 94.5,93 84,98.5 64,98 C 42,97.5 22,96.5 11,94 C 3.5,92 1.5,83 1.5,68 C 1.5,48 2,26 4,14 C 5.5,6 10,4 18,3 Z';

const VISUAL_ORGANIC_CLIP = VISUAL_ORGANIC_PATH_100.replace(
  /(\d+(?:\.\d+)?)/g,
  (val) => (parseFloat(val) / 100).toFixed(4)
);

/* Exact LiquidButton water-glass shadow system */
const WATER_GLASS_SHADOW =
  'shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]';

/* Exact Navbar UAE Flag Gradient Border (matches .nav-center-flag-border) */
const NAV_FLAG_BORDER_MASK_STYLE: React.CSSProperties = {
  padding: '1.5px',
  WebkitMask:
    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  maskComposite: 'exclude',
};

const NAV_FLAG_BORDER_CLASS =
  'pointer-events-none absolute inset-0 z-20 [background:linear-gradient(90deg,rgba(0,132,61,0.85)_0%,rgba(0,132,61,0.3)_18%,rgba(33,33,33,0.18)_50%,rgba(228,0,43,0.3)_82%,rgba(228,0,43,0.85)_100%)] dark:[background:linear-gradient(90deg,rgba(22,160,90,0.85)_0%,rgba(22,160,90,0.35)_18%,rgba(255,255,255,0.18)_50%,rgba(228,0,43,0.35)_82%,rgba(228,0,43,0.85)_100%)]';

/* 3-color UAE Flag gradient applied to each letter of "UAE" */
const UAE_FLAG_LETTER_CLASS =
  'inline-block bg-clip-text text-transparent bg-[linear-gradient(155deg,#C2242B_0%,#C2242B_30%,#00843D_38%,#00843D_64%,#171717_72%,#171717_100%)] dark:bg-[linear-gradient(155deg,#E4002B_0%,#E4002B_30%,#2EB04B_38%,#2EB04B_64%,#F5F5F2_72%,#F5F5F2_100%)]';

function EditorialWaterGlassDefs() {
  return (
    <svg
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="editorial-visual-clip" clipPathUnits="objectBoundingBox">
          <path d={VISUAL_ORGANIC_CLIP} />
        </clipPath>
      </defs>
    </svg>
  );
}

export function EditorialShowcaseSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shouldAnimate = !prefersReducedMotion && inView;

  return (
    <section
      ref={sectionRef}
      id="corporate-overview"
      aria-labelledby="editorial-showcase-heading"
      className="relative overflow-hidden bg-[#F7F6F1] pt-14 pb-20 transition-colors duration-300 dark:bg-[#050807] sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-24"
    >
        <EditorialWaterGlassDefs />

        {/* ================= LUXURY LAYERED BACKGROUND ================= */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        >
          {/* Delicate Atmospheric Radial Lighting (zero-blur smooth gradient) */}
          <div className="absolute left-[12%] top-[16%] h-[480px] w-[620px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.88),rgba(247,246,241,0)_76%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(8,122,66,0.14),transparent_76%)]" />
          <m.div
            animate={
              shouldAnimate
                ? { scale: [1, 1.045, 1], opacity: [0.85, 1, 0.85] }
                : undefined
            }
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-[10%] top-[22%] h-[460px] w-[580px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(8,122,66,0.14),rgba(212,175,55,0.08)_52%,transparent_78%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,168,90,0.22),rgba(212,175,55,0.08)_55%,transparent_78%)]"
          />

          {/* Faint Architectural Grid Texture */}
          <div
            className="absolute inset-0 opacity-[0.22] dark:opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(8, 122, 66, 0.14) 1px, transparent 0)',
              backgroundSize: '36px 36px',
              maskImage:
                'radial-gradient(ellipse 75% 70% at 35% 45%, #000 10%, transparent 80%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 75% 70% at 35% 45%, #000 10%, transparent 80%)',
            }}
          />

          {/* Soft Dubai Skyline Silhouette at Bottom-Left */}
          <div
            className="absolute bottom-4 left-0 z-0 h-[190px] w-[380px] opacity-60 sm:h-[240px] sm:w-[500px] lg:h-[270px] lg:w-[580px] dark:opacity-38"
            style={{
              maskImage:
                'radial-gradient(ellipse 85% 85% at 22% 78%, #000 24%, rgba(0,0,0,0.5) 58%, transparent 90%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 85% 85% at 22% 78%, #000 24%, rgba(0,0,0,0.5) 58%, transparent 90%)',
            }}
          >
            <ThemeImage
              lightSrc="/images/testimonials/dubai-skyline-light.webp"
              darkSrc="/images/testimonials/dubai-skyline-dark.webp"
              alt=""
              width={1920}
              height={320}
              loading="lazy"
              className="block h-full w-full object-cover object-left-bottom"
            />
          </div>

          {/* Multi-Layer Organic Emerald, Ivory & Champagne-Gold Waves */}
          <svg
            viewBox="0 0 1440 760"
            preserveAspectRatio="none"
            fill="none"
            className="absolute inset-0 z-0 h-full w-full"
          >
            <defs>
              <linearGradient id="editorial-ivory-wave" x1="25%" y1="0%" x2="90%" y2="95%">
                <stop offset="0%" stopColor="#EFECE2" stopOpacity="0.92" />
                <stop offset="55%" stopColor="#E6E2D4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#DCD7C7" stopOpacity="0.28" />
              </linearGradient>

              <linearGradient id="editorial-ivory-wave-dark" x1="25%" y1="0%" x2="90%" y2="95%">
                <stop offset="0%" stopColor="#0C1B13" stopOpacity="0.72" />
                <stop offset="60%" stopColor="#08140E" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#050807" stopOpacity="0.2" />
              </linearGradient>

              <linearGradient id="editorial-emerald-flow" x1="15%" y1="90%" x2="100%" y2="10%">
                <stop offset="0%" stopColor="#043A1F" stopOpacity="0.96" />
                <stop offset="48%" stopColor="#086E3B" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#032E18" stopOpacity="0.98" />
              </linearGradient>

              <linearGradient id="editorial-emerald-accent" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#0A7A42" stopOpacity="0.72" />
                <stop offset="55%" stopColor="#054726" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#032C17" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="editorial-gold-edge" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.12" />
                <stop offset="30%" stopColor="#E5C158" stopOpacity="0.78" />
                <stop offset="65%" stopColor="#F5D77F" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#C99726" stopOpacity="0.28" />
              </linearGradient>
            </defs>

            {/* Layer 1: Broad Soft Ivory Organic Curve */}
            <path
              d="M520 760 C 560 520, 610 180, 810 85 C 1020 -15, 1270 70, 1440 20 L1440 760 Z"
              fill="url(#editorial-ivory-wave)"
              className="dark:hidden"
            />
            <path
              d="M520 760 C 560 520, 610 180, 810 85 C 1020 -15, 1270 70, 1440 20 L1440 760 Z"
              fill="url(#editorial-ivory-wave-dark)"
              className="hidden dark:block"
            />

            {/* Layer 2: Translucent Emerald Mist Wave */}
            <path
              d="M390 760 C 560 680, 790 662, 1020 672 C 1210 680, 1335 470, 1440 280 L1440 760 Z"
              fill="#087A42"
              fillOpacity="0.14"
            />

            {/* Layer 3: Deep Emerald Organic Shape Entering From Right & Bottom */}
            <path
              d="M1440 35 C 1335 105, 1365 365, 1320 535 C 1275 700, 1020 688, 740 700 C 510 710, 310 732, 180 760 L1440 760 Z"
              fill="url(#editorial-emerald-flow)"
            />

            {/* Layer 4: Overlapping Secondary Emerald Contour Along Bottom-Right */}
            <path
              d="M320 760 C 530 712, 810 702, 1075 696 C 1255 692, 1368 615, 1440 535 L1440 760 Z"
              fill="url(#editorial-emerald-accent)"
              opacity="0.88"
            />

            {/* Layer 5: Soft Ivory Whisper Wave Overlapping Emerald Near Bottom-Right */}
            <path
              d="M220 760 C 420 705, 720 692, 995 708 C 1200 720, 1345 655, 1440 580 L1440 635 C 1315 700, 1145 742, 920 736 C 670 728, 450 735, 310 760 Z"
              fill="#F7F6F1"
              fillOpacity="0.3"
              className="dark:fill-[#16A05A] dark:fill-opacity-[0.14]"
            />

            {/* Champagne-Gold Illuminated Edge Along Primary Emerald Crest */}
            <path
              d="M1440 35 C 1335 105, 1365 365, 1320 535 C 1275 700, 1020 688, 740 700 C 510 710, 310 732, 180 760"
              stroke="url(#editorial-gold-edge)"
              strokeWidth="1.8"
            />

            {/* Secondary Champagne-Gold Contour Hairline */}
            <path
              d="M320 760 C 530 712, 810 702, 1075 696 C 1255 692, 1368 615, 1440 535"
              stroke="#E5C158"
              strokeOpacity="0.45"
              strokeWidth="1.4"
            />
          </svg>

          {/* Seamless Bottom Transition Veil Matching ImpactSection (#F7F6F1 / #050807) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent via-[#F7F6F1]/75 to-[#F7F6F1] dark:via-[#050807]/75 dark:to-[#050807]" />
        </div>

        {/* ================= MAIN COMPOSITION ================= */}
        <div className="relative z-10 mx-auto max-w-[1260px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* ---------- LEFT SIDE: EDITORIAL CONTENT ---------- */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0.99, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start lg:col-span-5"
            >
              {/* Borderless Eyebrow Label */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/65 px-4 py-1.5 backdrop-blur-md dark:bg-[#0D1A13]/65">
                <Briefcase
                  className="relative z-10 h-3.5 w-3.5 shrink-0 text-[#087A42] dark:text-[#16A05A]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="relative z-10 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#1F2722] dark:text-white/90 sm:text-[11px]">
                  BUSINESS SETUP &amp; CORPORATE SERVICES IN UAE
                </span>
              </div>

              {/* Section H2 — Editorial Serif Typography */}
              <h2
                id="editorial-showcase-heading"
                className="font-serif text-[34px] font-semibold leading-[1.12] tracking-[-0.015em] text-[#1C1C1C] dark:text-[#F5F5F2] sm:text-[42px] lg:text-[42px] xl:text-[47px]"
              >
                <span className="block">Seamless Business</span>
                <span className="block sm:whitespace-nowrap">Setup and PRO Services</span>
                <span className="block">
                  in the{' '}
                  <span className="relative inline-block italic font-bold">
                    <span className={UAE_FLAG_LETTER_CLASS}>U</span>
                    <span className={UAE_FLAG_LETTER_CLASS}>A</span>
                    <span className={UAE_FLAG_LETTER_CLASS}>E</span>
                    {/* Subtle Champagne-Gold Underline */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 120 12"
                      fill="none"
                      className="pointer-events-none absolute -bottom-1.5 left-0 h-2.5 w-full"
                    >
                      <path
                        d="M2 9.5 C 36 3, 84 2.5, 118 6.5"
                        stroke="#C99726"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-[470px] text-[14.5px] leading-[1.7] text-[#454846] dark:text-white/75 sm:text-[15.5px]">
                Takhlees Transactions LLC delivers Mainland and Free Zone company
                formation, trade licensing, document clearing, visa processing
                and government liaison services across the UAE.
              </p>

              {/* Single Primary CTA — LiquidButton */}
              <div className="mt-7">
                <LiquidButton variant="emerald" size="lg" asChild>
                  <Link href="/ae/contact" className="group px-7 py-3.5 text-[14.5px] font-semibold">
                    <span>Get a Consultation</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </LiquidButton>
              </div>
            </m.div>

            {/* ---------- RIGHT SIDE: SCULPTED ORGANIC WATER-GLASS VISUAL ---------- */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0.99, scale: 0.985 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:col-span-7"
            >
              <MotionTiltCard
                maxTilt={2.5}
                perspective={1200}
                hoverZ={-4}
                className="w-full"
              >
                <div className="relative mx-auto max-w-[660px] lg:ml-auto lg:mr-0">
                  {/* Soft Emerald & Champagne Ambient Glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-4 bg-[radial-gradient(ellipse_at_60%_50%,rgba(8,122,66,0.22),rgba(212,175,55,0.16)_50%,transparent_78%)] dark:bg-[radial-gradient(ellipse_at_60%_50%,rgba(22,160,90,0.24),rgba(212,175,55,0.12)_50%,transparent_78%)]"
                  />

                  {/* Outer Water-Glass Lens Shell (Refracts Background Around Photo) */}
                  <div
                    aria-hidden="true"
                    className="liquid-glass-refract-editorial pointer-events-none absolute -inset-3 z-0 overflow-hidden bg-white/10 dark:bg-black/15"
                    style={{
                      clipPath: 'url(#editorial-visual-clip)',
                      WebkitClipPath: 'url(#editorial-visual-clip)',
                    }}
                  />

                  {/* Main Sculpted Organic Clipped Photo Frame */}
                  <div className="relative drop-shadow-[0_24px_48px_rgba(4,48,25,0.26)] dark:drop-shadow-[0_28px_56px_rgba(0,0,0,0.85)]">
                    <div
                      className="relative aspect-[16/10] w-full overflow-hidden"
                      style={{
                        clipPath: 'url(#editorial-visual-clip)',
                        WebkitClipPath: 'url(#editorial-visual-clip)',
                      }}
                    >
                      <Image
                        src="/images/consultation/uae-consultation.webp"
                        alt="UAE business setup and corporate PRO advisors reviewing company licensing documents with a client"
                        width={1280}
                        height={800}
                        sizes="(max-width: 1024px) 100vw, 620px"
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                      />
                      {/* Subtle Emerald & Specular Glass Vignette */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_12%_10%,rgba(255,255,255,0.24)_0%,transparent_45%),linear-gradient(to_top_right,rgba(4,58,31,0.22),transparent_55%)]"
                      />

                      {/* Navbar-Style UAE Flag Gradient Rim on Organic Photo Frame */}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
                      >
                        <defs>
                          <linearGradient
                            id="editorial-visual-rim"
                            x1="0%"
                            y1="50%"
                            x2="100%"
                            y2="50%"
                          >
                            <stop offset="0%" stopColor="#00843D" stopOpacity="0.88" />
                            <stop offset="20%" stopColor="#00843D" stopOpacity="0.35" />
                            <stop offset="50%" stopColor="#212121" stopOpacity="0.22" />
                            <stop offset="80%" stopColor="#E4002B" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#E4002B" stopOpacity="0.88" />
                          </linearGradient>
                        </defs>
                        <path
                          d={VISUAL_ORGANIC_PATH_100}
                          fill="none"
                          stroke="url(#editorial-visual-rim)"
                          strokeWidth="2.5"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </MotionTiltCard>
            </m.div>
          </div>

          {/* ================= FLOATING WATER-GLASS SERVICE NAVIGATION (EXACT LIQUIDBUTTON SYSTEM) ================= */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0.99, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 mx-auto mt-8 max-w-[790px] lg:-mt-11 lg:ml-auto lg:mr-14"
          >
            <div
              role="region"
              aria-label="Core UAE corporate service categories"
              className="group relative isolate overflow-hidden bg-white/18 px-4 py-4 dark:bg-black/22 sm:px-6 sm:py-5"
              style={{
                borderRadius: '54px 24px 48px 28px / 34px 44px 28px 40px',
              }}
            >
              {/* Layer 1: Exact LiquidButton 9-Layer Beveled Water-Glass Shadows */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 z-0 ${WATER_GLASS_SHADOW}`}
                style={{ borderRadius: 'inherit' }}
              />

              {/* Layer 1b: Exact Navbar UAE Flag Gradient Border */}
              <div
                aria-hidden="true"
                className={NAV_FLAG_BORDER_CLASS}
                style={{
                  ...NAV_FLAG_BORDER_MASK_STYLE,
                  borderRadius: 'inherit',
                }}
              />

              {/* Layer 2: Hardware-Adaptive LiquidButton Water-Refraction Backdrop */}
              <div
                aria-hidden="true"
                className="liquid-glass-refract-editorial pointer-events-none absolute inset-0 -z-10 overflow-hidden"
                style={{
                  borderRadius: 'inherit',
                }}
              />

              {/* Layer 3: Subtle Champagne-Gold Specular Top Edge */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 z-20 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-white/95 to-transparent dark:via-white/35"
              />

              <div className="relative z-10 grid grid-cols-2 divide-y divide-black/10 dark:divide-white/12 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
                {SERVICE_HIGHLIGHTS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="group/item flex flex-col items-center justify-center gap-2 px-3 py-2.5 text-center transition-colors duration-200 hover:bg-white/25 dark:hover:bg-white/[0.06] sm:rounded-2xl sm:py-1.5"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/75 shadow-xs ring-1 ring-[#C2242B]/15 backdrop-blur-sm transition-transform duration-300 group-hover/item:-translate-y-0.5 dark:bg-[#0D1712]/80 dark:ring-white/15">
                      <Icon
                        className="h-5 w-5 text-[#C2242B] dark:text-[#F25C63]"
                        strokeWidth={1.85}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="whitespace-pre-line text-[12.5px] font-semibold leading-snug text-[#111A15] drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)] dark:text-white dark:drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] sm:text-[13px]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </m.div>
        </div>
      </section>
  );
}

export default EditorialShowcaseSection;
