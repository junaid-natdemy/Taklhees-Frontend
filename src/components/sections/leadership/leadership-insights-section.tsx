'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ThemeImage } from '@/components/ui/theme-image';
import { m, useReducedMotion } from 'motion/react';
import { Users } from 'lucide-react';
import { MotionTiltCard } from '@/components/ui/motion-tilt-card';
import { cn } from '@/lib/utils';
import {
  LEADERSHIP_PROFILES,
  type LeadershipProfile,
} from './leadership-data';

/* ------------------------------------------------------------------ */
/*  Torn-Paper SVG Paths (normalized 0..1 for objectBoundingBox clipPath
    and 0..100 for vectorEffect="non-scaling-stroke" rim overlay)      */
/* ------------------------------------------------------------------ */
const TORN_PATH_LEFT_100 =
  'M 2.5,3.2 L 8,1.8 14,2.9 21,1.4 28,2.6 36,1.2 44,2.4 53,1.5 61,2.7 70,1.3 78,2.5 86,1.6 93,2.8 97.8,2.0 ' +
  'L 98.8,9 97.4,17 98.9,25 97.6,34 99.1,43 97.5,52 98.8,61 97.3,70 98.9,79 97.7,88 98.5,96.5 ' +
  'L 93,98.2 85,96.9 77,98.5 69,97.1 60,98.6 51,97.0 42,98.4 33,96.8 24,98.3 15,96.9 7,98.1 2.2,96.8 ' +
  'L 1.2,89 2.6,80 1.1,71 2.5,62 1.3,53 2.7,44 1.2,35 2.4,26 1.3,17 2.8,9 Z';

const TORN_PATH_RIGHT_100 =
  'M 2.0,2.4 L 9,1.3 17,2.7 25,1.5 34,2.8 43,1.4 52,2.5 61,1.2 70,2.6 79,1.5 88,2.8 94,1.7 98.0,2.9 ' +
  'L 99.0,11 97.6,20 98.8,29 97.4,38 99.0,47 97.7,56 98.9,65 97.5,74 98.8,83 97.3,91 98.2,97.2 ' +
  'L 91,98.4 83,97.0 74,98.6 65,97.2 56,98.5 47,96.9 38,98.4 29,97.1 20,98.5 11,97.0 3.0,98.0 ' +
  'L 1.4,90 2.7,81 1.2,72 2.6,63 1.1,54 2.5,45 1.3,36 2.8,27 1.4,18 2.6,10 Z';

function toNormalizedPath(path100: string): string {
  return path100.replace(/(\d+(?:\.\d+)?)/g, (m) =>
    (parseFloat(m) / 100).toFixed(4)
  );
}

const TORN_CLIP_LEFT = toNormalizedPath(TORN_PATH_LEFT_100);
const TORN_CLIP_RIGHT = toNormalizedPath(TORN_PATH_RIGHT_100);

/* ------------------------------------------------------------------ */
/*  Hidden SVG Glass-Distortion Filter & Torn-Paper ClipPaths          */
/* ------------------------------------------------------------------ */
function LeadershipGlassFilter() {
  return (
    <svg className="pointer-events-none absolute h-0 w-0 overflow-hidden" aria-hidden="true">
      <defs>
        <clipPath id="torn-paper-left" clipPathUnits="objectBoundingBox">
          <path d={TORN_CLIP_LEFT} />
        </clipPath>
        <clipPath id="torn-paper-right" clipPathUnits="objectBoundingBox">
          <path d={TORN_CLIP_RIGHT} />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating Quote Panel — Advanced Liquid Glass Architecture           */
/* ------------------------------------------------------------------ */
function FloatingQuotePanel({
  profile,
  index,
  reducedMotion,
  animateFloat,
  className,
}: {
  profile: LeadershipProfile;
  index: number;
  reducedMotion: boolean | null;
  animateFloat: boolean;
  className?: string;
}) {
  const floatDuration = index === 0 ? 7.4 : 8.6;
  const isLeft = index === 0;
  const clipUrl = isLeft ? 'url(#torn-paper-left)' : 'url(#torn-paper-right)';
  const tornRimPath = isLeft ? TORN_PATH_LEFT_100 : TORN_PATH_RIGHT_100;

  return (
    <m.div
      initial={reducedMotion ? false : { opacity: 0.99, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: 0.65,
        delay: 0.1 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'relative',
        isLeft ? 'lg:-rotate-[1deg]' : 'lg:rotate-[0.9deg]',
        className
      )}
    >
      {/* Warm Champagne & Emerald Ambient Glow Beneath Floating Torn-Paper Glass (zero-blur gradient) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 inset-x-4 h-12 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(224,177,58,0.22)_0%,rgba(8,122,66,0.14)_48%,transparent_76%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(224,177,58,0.18)_0%,rgba(0,168,90,0.18)_48%,transparent_76%)]"
      />

      <MotionTiltCard
        maxTilt={5}
        perspective={1000}
        hoverZ={-8}
        className="w-full"
      >
        {/* Outer Drop-Shadow Wrapper (follows exact torn-paper silhouette) */}
        <m.div
          animate={
            animateFloat
              ? {
                  y: [0, -4, 0],
                }
              : undefined
          }
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative drop-shadow-[0_18px_32px_rgba(8,86,46,0.18)] dark:drop-shadow-[0_22px_40px_rgba(0,0,0,0.8)]"
        >
          {/* Clipped Torn-Paper Liquid Glass Body */}
          <div
            className="leadership-liquid-glass group relative overflow-hidden px-7 py-8 sm:px-9 sm:py-9"
            style={{
              clipPath: clipUrl,
              WebkitClipPath: clipUrl,
            }}
          >
            {/* Layer 1: Hardware-Adaptive Liquid Refraction Backdrop */}
            <div
              aria-hidden="true"
              className="liquid-glass-refract-leadership pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            />

            {/* Layer 2: Glossy Liquid-Glass Specular & Caustic Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(110%_75%_at_18%_8%,rgba(255,255,255,0.68)_0%,rgba(255,255,255,0.18)_36%,transparent_66%),radial-gradient(85%_60%_at_85%_92%,rgba(22,160,90,0.16)_0%,transparent_65%)] dark:bg-[radial-gradient(110%_75%_at_18%_8%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_36%,transparent_66%),radial-gradient(85%_60%_at_85%_92%,rgba(22,160,90,0.22)_0%,transparent_65%)]"
            />

            {/* Moving Glass Reflection Sweep */}
            <span
              aria-hidden="true"
              className="leadership-glass-sheen pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent dark:via-white/[0.12]"
            />

            {/* Layer 3: Liquid-Glass Thick Wet Inner Bevel + Specular Rim (follows torn-paper contour) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 z-20 h-full w-full"
            >
              <defs>
                <linearGradient
                  id={`torn-rim-${profile.id}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
                  <stop offset="32%" stopColor="#16A05A" stopOpacity="0.65" />
                  <stop offset="68%" stopColor="#E5C158" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.92" />
                </linearGradient>
                <linearGradient
                  id={`torn-inner-glow-${profile.id}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#16A05A" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#043A1F" stopOpacity="0.32" />
                </linearGradient>
              </defs>

              {/* Inner glass meniscus (lightweight crisp stroke) */}
              <path
                d={tornRimPath}
                fill="none"
                stroke={`url(#torn-inner-glow-${profile.id})`}
                strokeOpacity="0.65"
                strokeWidth="8"
                vectorEffect="non-scaling-stroke"
              />

              {/* Top-left bright specular bevel highlight */}
              <path
                d={tornRimPath}
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity="0.72"
                strokeWidth="3.5"
                vectorEffect="non-scaling-stroke"
                transform="translate(0.4, 0.5)"
              />

              {/* Outer crisp champagne-gold & emerald glass edge */}
              <path
                d={tornRimPath}
                fill="none"
                stroke={`url(#torn-rim-${profile.id})`}
                strokeWidth="2.2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="relative z-10">
              {/* Champagne-Gold Decorative Quotation Mark */}
              <span
                aria-hidden="true"
                className="mb-2 block select-none font-serif text-[42px] leading-[0.75]"
                style={{
                  background: 'linear-gradient(135deg, #C99726, #E5C76B, #C99726)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 1px 3px rgba(201,151,38,0.25)',
                }}
              >
                &ldquo;
              </span>

              <blockquote className="text-[13.5px] italic leading-[1.72] text-[#1A1A1A]/92 dark:text-white/85 sm:text-[14px]">
                {profile.quote}
              </blockquote>

              {/* Champagne-Gold Accent Line & Executive Identity */}
              <div className="mt-5 flex items-end justify-between pt-1">
                <div>
                  <span
                    aria-hidden="true"
                    className="mb-2.5 block h-[1.5px] w-10 rounded-full bg-gradient-to-r from-[#C99726] to-[#E5C76B]/30 dark:from-[#E0B13A] dark:to-[#E0B13A]/20"
                  />
                  <h3 className="text-[17px] font-bold tracking-tight text-[#121212] dark:text-white sm:text-[18px]">
                    {profile.name}
                  </h3>
                  <p className="mt-0.5 text-[12.5px] font-medium tracking-[0.01em] text-[#525252] dark:text-white/65">
                    {profile.role}
                  </p>
                </div>

                {/* Signature-style flourish */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 60 30"
                  fill="none"
                  className="mb-1 h-6 w-12 opacity-30 dark:opacity-20"
                >
                  <path
                    d="M5 25 C 15 5, 25 5, 30 15 S 45 25, 55 10"
                    stroke="#C99726"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </m.div>
      </MotionTiltCard>
    </m.div>
  );
}

export function LeadershipInsightsSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '150px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shouldAnimate = !prefersReducedMotion && inView;
  const mdProfile = LEADERSHIP_PROFILES[0];
  const ceoProfile = LEADERSHIP_PROFILES[1];

  return (
    <section
      ref={sectionRef}
      id="leadership"
      data-section-paused={!inView ? 'true' : undefined}
      aria-labelledby="leadership-heading"
      className="relative overflow-hidden bg-[#F7F6F1] pt-16 pb-10 transition-colors duration-300 dark:bg-[#050807] sm:pt-20 sm:pb-12 lg:pt-22 lg:pb-10"
    >
        {/* Hidden SVG Glass Distortion Filter */}
        <LeadershipGlassFilter />

        {/* ================= ATMOSPHERIC EDITORIAL CANVAS ================= */}

        {/* Large Diffused Emerald & Champagne Radial Glow Behind Center Stage (zero-blur gradient) */}
        <m.div
          aria-hidden="true"
          animate={
            shouldAnimate
              ? { scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }
              : undefined
          }
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute left-1/2 top-[56%] z-0 h-[440px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(8,122,66,0.16),rgba(201,151,38,0.08)_52%,transparent_78%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,168,90,0.22),rgba(224,177,58,0.1)_52%,transparent_78%)]"
        />

        {/* Subtle Islamic Geometric Lattice in Upper-Left Corner */}
        <svg
          aria-hidden="true"
          viewBox="0 0 280 240"
          fill="none"
          className="pointer-events-none absolute left-0 top-0 z-0 h-48 w-60 opacity-50 dark:opacity-28"
        >
          <defs>
            <pattern
              id="islamic-geo-pattern"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M24 0 L48 24 L24 48 L0 24 Z M24 8 L40 24 L24 40 L8 24 Z"
                stroke="#C99726"
                strokeWidth="0.75"
                strokeOpacity="0.5"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="4"
                stroke="#C99726"
                strokeWidth="0.6"
                strokeOpacity="0.35"
              />
            </pattern>
            <radialGradient id="islamic-fade" cx="0%" cy="0%" r="88%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="islamic-mask">
              <rect width="280" height="240" fill="url(#islamic-fade)" />
            </mask>
          </defs>
          <rect
            width="280"
            height="240"
            fill="url(#islamic-geo-pattern)"
            mask="url(#islamic-mask)"
          />
        </svg>

        {/* Deep Emerald Organic Shape Entering Upper-Left Corner (top edge softly merged into background) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 380 420"
          fill="none"
          className="pointer-events-none absolute -left-10 top-0 z-0 h-[260px] w-[220px] sm:h-[340px] sm:w-[290px]"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 22%, #000 52%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 22%, #000 52%)',
          }}
        >
          <defs>
            <linearGradient id="lead-top-left-wave" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#043A1F" stopOpacity="1" />
              <stop offset="55%" stopColor="#075A31" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#087A42" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M0 0 L240 0 C 145 75, 75 180, 35 320 C 18 375, 6 405, 0 420 Z"
            fill="url(#lead-top-left-wave)"
          />
          <path
            d="M236 2 C 142 78, 72 182, 32 322"
            stroke="#D4AF37"
            strokeWidth="1.6"
            strokeOpacity="0.7"
          />
        </svg>

        {/* Far-Left Subtle UAE Architectural Silhouette Behind MD */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-36 z-0 hidden h-[240px] w-[360px] select-none opacity-25 lg:block dark:opacity-20"
          style={{
            maskImage:
              'radial-gradient(ellipse 70% 70% at 32% 52%, #000 15%, rgba(0,0,0,0.35) 48%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 70% at 32% 52%, #000 15%, rgba(0,0,0,0.35) 48%, transparent 80%)',
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

        {/* Far-Right Subtle UAE Skyline Silhouette Behind CEO */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-28 z-0 hidden h-[220px] w-[580px] select-none opacity-38 sm:top-10 sm:block sm:h-[280px] sm:w-[760px] dark:opacity-28"
          style={{
            maskImage:
              'radial-gradient(ellipse 68% 60% at 76% 44%, #000 12%, rgba(0,0,0,0.35) 45%, transparent 76%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 68% 60% at 76% 44%, #000 12%, rgba(0,0,0,0.35) 45%, transparent 76%)',
          }}
        >
          <ThemeImage
            lightSrc="/images/testimonials/dubai-skyline-light.webp"
            darkSrc="/images/testimonials/dubai-skyline-dark.webp"
            alt=""
            width={1920}
            height={320}
            loading="lazy"
            className="block h-full w-full object-cover object-right-bottom"
          />
        </div>

        {/* ========== MULTI-LAYER CHAMPAGNE-GOLD LIQUID WAVE SYSTEM ========== */}
        {/* Background Layer: Continuous Sweeping Emerald Wave + Multiple Gold Streams */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 340"
          preserveAspectRatio="none"
          fill="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[210px] w-full sm:h-[260px] lg:h-[300px]"
        >
          <defs>
            <linearGradient id="editorial-wave-back" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#054726" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#086E3B" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#043D20" stopOpacity="0.95" />
            </linearGradient>

            {/* Metallic champagne-gold gradient (from liquid-glass-button gold variant) */}
            <linearGradient id="editorial-gold-stream" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#E0B13A" stopOpacity="0" />
              <stop offset="28%" stopColor="#F5D77F" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#E0B13A" stopOpacity="0.95" />
              <stop offset="82%" stopColor="#16A05A" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#E0B13A" stopOpacity="0" />
            </linearGradient>

            {/* Second gold stream — slower, offset phase */}
            <linearGradient id="editorial-gold-stream-2" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FFEBA1" stopOpacity="0" />
              <stop offset="30%" stopColor="#E5C76B" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#C99726" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFEBA1" stopOpacity="0" />
            </linearGradient>

            {/* Third gold stream — fastest, thinnest */}
            <linearGradient id="editorial-gold-stream-3" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
              <stop offset="40%" stopColor="#F5D77F" stopOpacity="0.65" />
              <stop offset="70%" stopColor="#917100" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Sweeping Emerald Wave Crest */}
          <path
            d="M0 135 C 210 65, 390 250, 690 195 C 960 145, 1180 40, 1440 95 L1440 340 L0 340 Z"
            fill="url(#editorial-wave-back)"
          />

          {/* Static Champagne-Gold Crest Hairline */}
          <path
            d="M0 135 C 210 65, 390 250, 690 195 C 960 145, 1180 40, 1440 95"
            stroke="#E5C158"
            strokeOpacity="0.82"
            strokeWidth="2.2"
          />

          {/* Secondary subtle gold ribbon crest */}
          <path
            d="M0 110 C 240 40, 480 200, 740 155 C 980 115, 1140 60, 1440 80"
            stroke="url(#editorial-gold-stream-3)"
            strokeOpacity="0.65"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Static champagne-gold crest accent (thicker, luminous) */}
          <path
            d="M-40 170 C 180 100, 420 220, 720 170 C 1000 125, 1210 70, 1480 120"
            stroke="#D4AF37"
            strokeOpacity="0.48"
            strokeWidth="1.5"
          />
        </svg>

        {/* ================= HEADER & ASYMMETRIC EDITORIAL STAGE ================= */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {/* Centered Section Heading */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0.99, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-2xl text-center"
          >
            {/* Eyebrow Pill */}
            <div className="mb-4 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-[1.5px] w-8 rounded-full bg-[#087A42]/70 dark:bg-[#16A05A]/70"
              />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#087A42]/30 bg-white/80 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#087A42] shadow-xs backdrop-blur-md dark:border-[#16A05A]/35 dark:bg-[#0D1310]/85 dark:text-[#16A05A]">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                <span>LEADERSHIP INSIGHTS</span>
              </span>
              <span
                aria-hidden="true"
                className="h-[1.5px] w-8 rounded-full bg-[#087A42]/70 dark:bg-[#16A05A]/70"
              />
            </div>

            <h2
              id="leadership-heading"
              className="text-3xl font-bold leading-[1.15] tracking-tight text-[#171717] dark:text-white sm:text-4xl lg:text-[42px]"
            >
              Voices That Drive{' '}
              <span className="relative inline-block italic text-[#087A42] dark:text-[#16A05A]">
                Takhlees
                <svg
                  aria-hidden="true"
                  viewBox="0 0 180 12"
                  fill="none"
                  className="pointer-events-none absolute -bottom-1.5 left-0 h-2.5 w-full"
                >
                  <path
                    d="M3 9.5 C 55 3, 125 2.5, 177 7"
                    stroke="#C99726"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#525252] dark:text-white/70 sm:text-[15px]">
              Perspectives from our leadership on our vision, values, and
              commitment to business success in the UAE.
            </p>
          </m.div>

          {/* DESKTOP ASYMMETRIC EDITORIAL STAGE (>= 1024px) */}
          <div className="relative mt-10 hidden min-h-[455px] lg:block">
            {/* Left Dominant Executive Portrait: Mr. Ramshad Ashraf */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0.99, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute -bottom-10 left-0 z-10 h-[500px] w-[360px]"
            >
              {/* Emerald radial glow behind portrait */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(8,122,66,0.14),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_50%_55%,rgba(22,160,90,0.12),transparent_65%)]"
              />
              <div
                className="relative z-[1] h-full w-full"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, #000 76%, rgba(0,0,0,0.4) 93%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, #000 76%, rgba(0,0,0,0.4) 93%, transparent 100%)',
                }}
              >
                <Image
                  src={mdProfile.portrait}
                  alt={mdProfile.portraitAlt}
                  width={mdProfile.portraitWidth}
                  height={mdProfile.portraitHeight}
                  sizes="(max-width: 1024px) 220px, 345px"
                  loading="lazy"
                  className="h-full w-full object-contain object-bottom drop-shadow-[0_18px_36px_rgba(4,42,23,0.22)]"
                />
              </div>
            </m.div>

            {/* Right Dominant Executive Portrait: Mr. Sadique Manalaya */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0.99, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute -bottom-10 -right-2 z-10 h-[400px] w-[345px]"
            >
              {/* Emerald radial glow behind portrait */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(8,122,66,0.12),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_50%_50%,rgba(22,160,90,0.1),transparent_60%)]"
              />
              <div
                className="relative z-[1] h-full w-full"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, #000 74%, rgba(0,0,0,0.35) 92%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, #000 74%, rgba(0,0,0,0.35) 92%, transparent 100%)',
                }}
              >
                <Image
                  src={ceoProfile.portrait}
                  alt={ceoProfile.portraitAlt}
                  width={ceoProfile.portraitWidth}
                  height={ceoProfile.portraitHeight}
                  sizes="(max-width: 1024px) 220px, 345px"
                  loading="lazy"
                  className="h-full w-full object-cover object-[35%_18%] drop-shadow-[0_18px_36px_rgba(4,42,23,0.22)]"
                />
              </div>
            </m.div>

            {/* Center Asymmetric Staggered Floating Glass Quote Panels */}
            <div className="relative z-20 mx-auto grid max-w-[770px] grid-cols-2 items-start gap-7 pt-4">
              {/* Left-Center Panel (Higher, Beside MD) */}
              <FloatingQuotePanel
                profile={mdProfile}
                index={0}
                reducedMotion={prefersReducedMotion}
                animateFloat={shouldAnimate}
              />

              {/* Right-Center Panel (Lowered Offset, Beside CEO) */}
              <FloatingQuotePanel
                profile={ceoProfile}
                index={1}
                reducedMotion={prefersReducedMotion}
                animateFloat={shouldAnimate}
                className="mt-16"
              />
            </div>
          </div>

          {/* MOBILE & TABLET RESPONSIVE EDITORIAL FLOW (< 1024px) */}
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:hidden">
            {LEADERSHIP_PROFILES.map((profile, index) => (
              <div key={profile.id} className="flex flex-col items-center">
                <m.div
                  initial={
                    prefersReducedMotion ? false : { opacity: 0.99, scale: 0.97 }
                  }
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative -mb-10 h-[270px] w-[220px] sm:h-[300px] sm:w-[245px]"
                  style={{
                    maskImage:
                      'linear-gradient(to bottom, #000 72%, rgba(0,0,0,0.4) 90%, transparent 100%)',
                    WebkitMaskImage:
                      'linear-gradient(to bottom, #000 72%, rgba(0,0,0,0.4) 90%, transparent 100%)',
                  }}
                >
                  <Image
                    src={profile.portrait}
                    alt={profile.portraitAlt}
                    width={profile.portraitWidth}
                    height={profile.portraitHeight}
                    sizes="(max-width: 640px) 220px, 245px"
                    loading="lazy"
                    className={cn(
                      'h-full w-full drop-shadow-[0_14px_28px_rgba(4,42,23,0.2)]',
                      profile.id === 'sadique-manalaya'
                        ? 'object-cover object-[35%_18%]'
                        : 'object-contain object-bottom'
                    )}
                  />
                </m.div>

                <FloatingQuotePanel
                  profile={profile}
                  index={index}
                  reducedMotion={prefersReducedMotion}
                  animateFloat={shouldAnimate}
                  className="z-20 w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Foreground Translucent Emerald Wave Lip Blending Portrait Bases */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-15 h-[68px] w-full sm:h-[86px] lg:h-[96px]"
        >
          <defs>
            <linearGradient id="editorial-wave-front" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#043A1F" stopOpacity="0.92" />
              <stop offset="50%" stopColor="#076335" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#043A1F" stopOpacity="0.92" />
            </linearGradient>
          </defs>
          <path
            d="M0 45 C 240 105, 520 5, 860 65 C 1120 110, 1300 25, 1440 40 L1440 120 L0 120 Z"
            fill="url(#editorial-wave-front)"
          />
          <path
            d="M0 45 C 240 105, 520 5, 860 65 C 1120 110, 1300 25, 1440 40"
            stroke="#F3D37A"
            strokeOpacity="0.55"
            strokeWidth="1.25"
          />
        </svg>
      </section>
  );
}
