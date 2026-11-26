'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Briefcase, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DriftWall } from '@/components/ui/drift-wall';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

const TRUST_HIGHLIGHTS = [
  { icon: Briefcase, title: 'Business Setup' },
  { icon: ShieldCheck, title: 'PRO Services' },
  { icon: FileCheck, title: 'Documentation' },
];

/* 36-point scalloped starburst rosette points for vintage seal stamp */
const ROSETTE_POINTS =
  '100.0,6.0 107.7,12.3 116.3,7.4 122.8,15.0 132.1,11.7 137.2,20.2 147.0,18.6 150.5,27.9 160.4,28.0 162.2,37.8 172.0,39.6 172.1,49.5 181.4,53.0 179.8,62.8 188.3,67.9 185.0,77.2 192.6,83.7 187.7,92.3 194.0,100.0 187.7,107.7 192.6,116.3 185.0,122.8 188.3,132.1 179.8,137.2 181.4,147.0 172.1,150.5 172.0,160.4 162.2,162.2 160.4,172.0 150.5,172.1 147.0,181.4 137.2,179.8 132.1,188.3 122.8,185.0 116.3,192.6 107.7,187.7 100.0,194.0 92.3,187.7 83.7,192.6 77.2,185.0 67.9,188.3 62.8,179.8 53.0,181.4 49.5,172.1 39.6,172.0 37.8,162.2 28.0,160.4 27.9,150.5 18.6,147.0 20.2,137.2 11.7,132.1 15.0,122.8 7.4,116.3 12.3,107.7 6.0,100.0 12.3,92.3 7.4,83.7 15.0,77.2 11.7,67.9 20.2,62.8 18.6,53.0 27.9,49.5 28.0,39.6 37.8,37.8 39.6,28.0 49.5,27.9 53.0,18.6 62.8,20.2 67.9,11.7 77.2,15.0 83.7,7.4 92.3,12.3';

function VintageSealStamp({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Takhlees Certified 10+ Years of Excellence"
      className={cn(
        'group relative flex items-center justify-center select-none transition-transform duration-300 hover:scale-105 hover:rotate-0 -rotate-6',
        className
      )}
    >
      {/* Outer ambient drop shadow */}
      <div className="pointer-events-none absolute inset-3 rounded-full bg-[#00843D]/20 blur-xl dark:bg-transparent" />

      {/* SVG Vintage Seal Stamp */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="h-32 w-32 sm:h-36 sm:w-36 drop-shadow-[0_14px_28px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)]"
      >
        <defs>
          {/* Upper arc: from left (32,100) to right (168,100) sweeping over top */}
          <path id="sealUpperArc" d="M 32,100 A 68,68 0 1,1 168,100" fill="none" />
          {/* Lower arc: from left (32,100) to right (168,100) sweeping under bottom */}
          <path id="sealLowerArc" d="M 32,100 A 68,68 0 0,0 168,100" fill="none" />

          {/* Radial gradient for seal disc background */}
          <radialGradient id="sealDiscGradLight" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.97" />
            <stop offset="70%" stopColor="#FAF7F0" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ECE6D8" stopOpacity="0.98" />
          </radialGradient>

          <radialGradient id="sealDiscGradDark" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#202222" stopOpacity="0.98" />
            <stop offset="70%" stopColor="#171717" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#101111" stopOpacity="0.98" />
          </radialGradient>
        </defs>

        {/* Outer Scalloped Rosette Starburst */}
        <polygon
          points={ROSETTE_POINTS}
          className="fill-[#F8F5EE] stroke-[#C99726]/60 dark:fill-[#171717] dark:stroke-[#E0B13A]/50"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Outer Circular Disc */}
        <circle
          cx="100"
          cy="100"
          r="86"
          className="fill-[url(#sealDiscGradLight)] stroke-[#0B5A31] dark:fill-[url(#sealDiscGradDark)] dark:stroke-[#16A05A]"
          strokeWidth="2.5"
        />

        {/* Concentric Milled Notary Rings */}
        <circle
          cx="100"
          cy="100"
          r="81"
          fill="none"
          stroke="#C99726"
          strokeWidth="1"
          strokeDasharray="2.5,2.5"
          className="opacity-80 dark:stroke-[#E0B13A]"
        />

        <circle
          cx="100"
          cy="100"
          r="54"
          fill="none"
          className="stroke-[#0B5A31] dark:stroke-[#16A05A]"
          strokeWidth="2"
        />

        <circle
          cx="100"
          cy="100"
          r="50"
          fill="none"
          stroke="#C99726"
          strokeWidth="1"
          strokeDasharray="2,2"
          className="opacity-70 dark:stroke-[#E0B13A]"
        />

        {/* Circular Curved Typography (Top: EMPOWERING BUSINESSES • UAE) */}
        <text
          className="fill-[#0B5A31] text-[9.5px] font-black uppercase tracking-[0.18em] dark:fill-[#16A05A]"
          textAnchor="middle"
        >
          <textPath href="#sealUpperArc" startOffset="50%">
            EMPOWERING BUSINESSES • UAE
          </textPath>
        </text>

        {/* Circular Curved Typography (Bottom: 10+ YEARS OF EXCELLENCE) */}
        <text
          className="fill-[#A31C1B] text-[9px] font-extrabold uppercase tracking-[0.17em] dark:fill-[#A31C1B]"
          textAnchor="middle"
        >
          <textPath href="#sealLowerArc" startOffset="50%">
            ★ 10+ YEARS OF EXCELLENCE ★
          </textPath>
        </text>

        {/* Inner Seal Core */}
        <circle
          cx="100"
          cy="100"
          r="45"
          className="fill-black/[0.02] dark:fill-white/[0.04]"
        />

        {/* Decorative 3 Stars */}
        <g className="fill-[#C99726] dark:fill-[#E0B13A]" transform="translate(100, 74)">
          <text x="-16" y="0" textAnchor="middle" fontSize="7" fontWeight="bold">★</text>
          <text x="0" y="-3" textAnchor="middle" fontSize="9" fontWeight="bold">★</text>
          <text x="16" y="0" textAnchor="middle" fontSize="7" fontWeight="bold">★</text>
        </g>

        {/* Big Majestic Vintage Serif 10+ */}
        <text
          x="97"
          y="108"
          textAnchor="middle"
          className="fill-[#0B5A31] font-serif text-[34px] font-black tracking-tighter dark:fill-[#16A05A]"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          10
        </text>
        <text
          x="122"
          y="98"
          textAnchor="middle"
          className="fill-[#A31C1B] font-serif text-[20px] font-black dark:fill-[#A31C1B]"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          +
        </text>

        {/* Vintage Ribbon Label at Bottom Core */}
        <g transform="translate(100, 126)">
          <rect
            x="-34"
            y="-7"
            width="68"
            height="13"
            rx="3"
            className="fill-[#0B5A31] dark:fill-[#16A05A]"
          />
          <text
            x="0"
            y="2.5"
            textAnchor="middle"
            className="fill-white text-[7px] font-black uppercase tracking-[0.2em] dark:fill-[#080909]"
          >
            CERTIFIED
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Complete Dubai Skyline Architectural Skeleton Composition
 * Extracted directly from official panorama (public/image copy.png).
 * Preserves Burj Khalifa as the tallest focal point along with the complete surrounding
 * skyscrapers, stepped setbacks, spires, and authentic skyline horizontal composition.
 * Monochromatic architectural line-art: subtle grey-green in Light Mode, muted emerald in Dark Mode.
 */
function DubaiSkylineSkeleton() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 z-0 h-[230px] sm:h-[275px] lg:h-[320px] xl:h-[360px] w-[min(92vw,760px)] select-none"
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, #000 58%, rgba(0,0,0,0.45) 82%, transparent 98%), linear-gradient(to top, #000 68%, rgba(0,0,0,0.5) 88%, transparent 100%)',
        WebkitMaskComposite: 'source-in',
        maskImage:
          'linear-gradient(to right, #000 58%, rgba(0,0,0,0.45) 82%, transparent 98%), linear-gradient(to top, #000 68%, rgba(0,0,0,0.5) 88%, transparent 100%)',
        maskComposite: 'intersect',
      }}
      aria-hidden="true"
    >
      {/* Light Mode: Crisp Recognizable Dubai Skyline Illustration */}
      <Image
        src="/images/dubai-skyline-hero-light.jpg"
        alt="Dubai Skyline featuring Burj Khalifa, Emirates Towers, and Museum of the Future"
        width={1376}
        height={768}
        sizes="(max-width: 1024px) 92vw, 760px"
        priority
        className="block h-full w-full object-cover object-left-bottom opacity-[0.65] mix-blend-multiply transition-opacity duration-300 dark:hidden"
      />
      {/* Dark Mode: Obsidian & Emerald-Gold Dubai Skyline Illustration */}
      <Image
        src="/images/dubai-skyline-hero-dark.jpg"
        alt="Dubai Skyline featuring Burj Khalifa, Emirates Towers, and Museum of the Future"
        width={1376}
        height={768}
        sizes="(max-width: 1024px) 92vw, 760px"
        priority
        className="hidden h-full w-full object-cover object-left-bottom opacity-[0.82] mix-blend-screen transition-opacity duration-300 dark:block"
      />
    </div>
  );
}

export function UAEHero() {
  return (
    <section className="relative flex min-h-[calc(100vh-76px)] sm:min-h-[calc(100vh-78px)] lg:min-h-[calc(100vh-76px)] xl:min-h-[calc(100vh-76px)] 2xl:min-h-[calc(100vh-84px)] items-center overflow-hidden bg-transparent transition-colors duration-300">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        {/* Dark mode subtle charcoal tonal depth (zero-blur radial gradient) */}
        <div className="absolute right-0 top-1/4 hidden h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,17,17,0.45)_0%,transparent_70%)] dark:block" />

        {/* Light mode whisper wave, top-left (Soft Ivory Accent, Zero Green Tint) */}
        <div className="absolute -left-20 -top-20 block h-[380px] w-[380px] opacity-[0.08] dark:hidden">
          <svg viewBox="0 0 500 500" fill="none" className="h-full w-full">
            <path d="M-50,0 C150,50 250,220 200,380 C160,500 60,520 -50,500 Z" fill="url(#heroLightGreen)" />
            <path d="M-40,10 C160,60 260,230 210,390" stroke="#146736" strokeWidth="2" strokeOpacity="0.25" />
            <defs>
              <linearGradient id="heroLightGreen" x1="0" y1="0" x2="300" y2="400" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2EB04B" stopOpacity="0.2" />
                <stop offset="1" stopColor="#DCFCE7" stopOpacity="0.03" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* UAE flag ribbons, bottom-right (softly blended into background) */}
        <div
          className="absolute -bottom-10 -right-10 h-[240px] w-[440px] opacity-90 dark:opacity-30"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, #000 48%, rgba(0,0,0,0.4) 78%, transparent 100%), linear-gradient(to left, #000 62%, rgba(0,0,0,0.4) 86%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            maskImage:
              'linear-gradient(to bottom, #000 48%, rgba(0,0,0,0.4) 78%, transparent 100%), linear-gradient(to left, #000 62%, rgba(0,0,0,0.4) 86%, transparent 100%)',
            maskComposite: 'intersect',
          }}
        >
          <svg viewBox="0 0 640 370" fill="none" className="h-full w-full">
            <path d="M 60 370 C 190 320, 330 250, 490 230 C 560 220, 610 230, 640 240 L 640 370 Z" fill="url(#heroRedWave)" />
            <path d="M 0 370 C 170 300, 350 310, 500 280 C 570 265, 610 280, 640 290 L 640 370 Z" fill="url(#heroGreenWave)" />
            <defs>
              <linearGradient id="heroRedWave" x1="100" y1="370" x2="640" y2="230" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C2242B" stopOpacity="0.9" />
                <stop offset="1" stopColor="#A31C1B" />
              </linearGradient>
              <linearGradient id="heroGreenWave" x1="0" y1="370" x2="640" y2="280" gradientUnits="userSpaceOnUse">
                <stop stopColor="#146736" />
                <stop offset="1" stopColor="#0B4223" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Complete Dubai Skyline Architectural Skeleton Composition */}
        <DubaiSkylineSkeleton />
      </div>

      {/* ================= CONTENT (REFINED STANDARD SIZE) ================= */}
      <div className="relative z-10 mx-auto w-full max-w-[1140px] px-4 py-6 sm:px-6 sm:py-8 lg:py-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ---------- LEFT ---------- */}
          <div className="flex flex-col space-y-4 sm:space-y-5 lg:col-span-5 xl:col-span-5">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-7 shrink-0 rounded-full bg-[#A31C1B]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-700 dark:text-[#F5F5F2] sm:text-[11px]">
                BUSINESS SETUP &amp; PRO SERVICES IN UAE
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-sans text-[32px] font-extrabold leading-[1.08] tracking-[-0.02em] text-neutral-900 dark:text-[#F5F5F2] sm:text-[38px] lg:text-[40px] xl:text-[44px]">
              <span className="block">Your Trusted</span>
              <span className="block">Business Partner</span>
              <span className="block">
                in{' '}
                <span className="relative inline-block">
                  <span className="text-[#A31C1B]">U</span>
                  <span>A</span>
                  <span className="text-[#00843D] dark:text-[#16A05A]">E.</span>
                  {/* Single red swoosh */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 240 20"
                    className="pointer-events-none absolute -bottom-2.5 left-0 h-3 w-[106%]"
                    fill="none"
                  >
                    <path d="M2 15 C50 5 150 2 238 6 C150 9 60 18 2 15 Z" fill="#A31C1B" />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="max-w-[400px] text-sm sm:text-[15px] leading-relaxed text-neutral-600 dark:text-[#A5AAA7] pt-0.5">
              Simplifying business setup, PRO services, visa &amp; document clearing in UAE.
            </p>

            {/* Trust & Service Highlights */}
            <div className="flex flex-wrap items-center gap-y-3 divide-neutral-300 dark:divide-[#303432] sm:divide-x">
              {TRUST_HIGHLIGHTS.map(({ icon: Icon, title }) => (
                <div key={title} className="flex items-center gap-2 pr-4 sm:px-4 sm:first:pl-0 sm:last:pr-0">
                  <Icon className="h-4 w-4 shrink-0 text-[#0B6B35] dark:text-[#16A05A]" strokeWidth={2} />
                  <span className="text-xs font-bold text-neutral-900 dark:text-[#F5F5F2]">{title}</span>
                </div>
              ))}
            </div>

            {/* CTAs with Liquid Glass Button */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <LiquidButton variant="emerald" size="md" asChild>
                <Link href="/ae/contact" className="group">
                  <span>Get a Consultation</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </LiquidButton>
              <LiquidButton variant="glass" size="md" asChild>
                <Link href="/ae/services">
                  <span>Explore Our Services</span>
                </Link>
              </LiquidButton>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: AMBIENT DRIFT WALL (SEAMLESSLY MERGED INTO BACKGROUND) ================= */}
          <div className="relative flex justify-center lg:col-span-7 xl:col-span-7 lg:justify-end animate-in fade-in duration-500">
            {/* Visual Stage (Natural Canvas, Zero Box Boundaries) */}
            <div className="relative w-full max-w-[560px] lg:max-w-[580px] h-[450px] sm:h-[480px]">
              {/* DriftWall (Smooth Dissolve on Left, Top & Bottom — Fully Unclipped Right Edge) */}
              <div
                className="relative w-full h-full z-10 [perspective:1400px]"
                style={{
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 4%, #000 15%, #000 100%), linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)',
                  WebkitMaskComposite: 'source-in',
                  maskImage:
                    'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 4%, #000 15%, #000 100%), linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)',
                  maskComposite: 'intersect',
                }}
              >
                <DriftWall
                  columns={3}
                  columnWidths={[125, 245, 125]}
                  columnHeights={[105, 185, 105]}
                  gap={14}
                  radius={18}
                  tilt={8}
                  turn={-10}
                  roll={20}
                  perspective={1400}
                  depth={45}
                  speed={18}
                  direction="up"
                  variance={0.2}
                  parallax={0.25}
                  pauseOnHover={true}
                  lift={22}
                  fade={0}
                  dim={1}
                  decorative={false}
                  className="w-full h-full"
                />
              </div>

              {/* Floating Vintage Seal Stamp */}
              <div className="absolute -bottom-4 right-2 sm:right-4 z-30 pointer-events-auto">
                <VintageSealStamp />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UAEHero;
