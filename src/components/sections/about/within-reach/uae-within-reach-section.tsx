'use client';

/* ===================================================================
 * The UAE, Within Reach — Architectural Campaign CTA Section
 * ===================================================================
 * Bespoke final closing experience combining:
 * - Left (~42%): Editorial typography & magnetic LiquidButton CTA
 * - Right (~58% desktop / full-width mobile crop): High-resolution
 *   3D ivory limestone & brushed champagne-gold UAE architectural
 *   installation seamlessly integrated into golden-hour Dubai canal sky
 * - Unified normalized coordinate overlays: refined emerald markers
 *   with champagne-gold rings, hairline SVG connector lines, and
 *   compact informational ivory glass Emirate labels (subtle hover
 *   polish only — no click/touch modals or popups)
 * - Seamless monolithic emerald & champagne-gold waves at top/bottom
 * =================================================================== */

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { cn } from '@/lib/utils';
import {
  DESKTOP_ARTWORK_CROP,
  MOBILE_ARTWORK_CROP,
  UAE_EMIRATES,
  projectEmirateToCrop,
  type EmirateLocation,
  type LabelAlign,
} from './uae-map-data';

interface EmirateMarkerLayerProps {
  variant: 'desktop' | 'mobile';
}

function getLabelAnchorTransform(align: LabelAlign, offsetY: number): string {
  if (align === 'left') return 'translate(0, -50%)';
  if (align === 'right') return 'translate(-100%, -50%)';
  return offsetY >= 0 ? 'translate(-50%, 0)' : 'translate(-50%, -100%)';
}

function EmirateMarkerLayer({ variant }: EmirateMarkerLayerProps) {
  const isDesktop = variant === 'desktop';
  const crop = isDesktop ? DESKTOP_ARTWORK_CROP : MOBILE_ARTWORK_CROP;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const projected = UAE_EMIRATES.map((loc: EmirateLocation) => ({
    loc,
    ...projectEmirateToCrop(loc, crop),
  }));

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20"
      aria-label="United Arab Emirates emirate locations"
    >
      {/* Unified SVG Connector Layer — crisp dual-stroke gold/ivory hairlines below marker cores */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[10] h-full w-full overflow-visible"
      >
        {projected.map(({ loc, markerX, markerY, labelX, labelY }) => {
          const isHovered = hoveredId === loc.id;
          return (
            <g key={`line-${variant}-${loc.id}`}>
              {/* Subtle ivory contrast casing keeps connectors visible over dark or sunlit stone */}
              <line
                x1={markerX}
                y1={markerY}
                x2={labelX}
                y2={labelY}
                stroke="#FFFDF7"
                strokeOpacity={isHovered ? 0.85 : 0.68}
                strokeWidth={isHovered ? 2.8 : 2.3}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={markerX}
                y1={markerY}
                x2={labelX}
                y2={labelY}
                stroke={isHovered ? '#064B35' : '#9E762A'}
                strokeOpacity={isHovered ? 0.96 : 0.9}
                strokeWidth={isHovered ? 1.65 : 1.2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-200"
              />
            </g>
          );
        })}
      </svg>

      {/* Informational Markers & Connected Ivory Liquid-Glass Labels (Hover polish only; no modal on tap/click) */}
      {projected.map(({ loc, markerX, markerY, labelX, labelY }) => {
        const isHovered = hoveredId === loc.id;

        return (
          <div key={`group-${variant}-${loc.id}`}>
            {/* Refined Emerald Marker + Subtle Champagne-Gold Outer Ring */}
            <div
              aria-hidden="true"
              style={{ left: `${markerX}%`, top: `${markerY}%` }}
              className="pointer-events-none absolute z-[15] -translate-x-1/2 -translate-y-1/2"
            >
              <span
                className={cn(
                  'relative flex items-center justify-center rounded-full transition-all duration-200',
                  isDesktop ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5 sm:h-3 sm:w-3',
                  isHovered
                    ? 'scale-125 bg-[#C9A45C]/30 ring-[1.5px] ring-[#C9A45C] shadow-[0_0_10px_rgba(6,75,53,0.28)]'
                    : 'bg-[#C9A45C]/20 ring-1 ring-[#C9A45C]/80 shadow-[0_2px_6px_rgba(6,75,53,0.2)]'
                )}
              >
                <span
                  className={cn(
                    'block rounded-full transition-colors duration-200',
                    isDesktop ? 'h-1.5 w-1.5' : 'h-1 w-1 sm:h-1.5 sm:w-1.5',
                    isHovered
                      ? 'bg-[#064B35] dark:bg-[#2EB04B]'
                      : 'bg-[#085A3F] dark:bg-[#2EB04B]'
                  )}
                />
              </span>
            </div>

            {/* Informational Optical Liquid-Glass Location Label (Non-modal, subtle hover highlight) */}
            <span
              onMouseEnter={() => setHoveredId(loc.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                left: `${labelX}%`,
                top: `${labelY}%`,
                transform: getLabelAnchorTransform(loc.align, loc.labelOffsetY),
              }}
              className={cn(
                'liquid-glass-refract-button pointer-events-auto absolute z-[20] inline-flex cursor-default select-none items-center whitespace-nowrap rounded-full font-semibold tracking-[0.005em] transition-all duration-200',
                isDesktop
                  ? 'gap-1.5 px-2.5 py-[3px] text-[11px] leading-[1.35]'
                  : 'gap-1 px-2 py-[2px] text-[9.5px] leading-[1.25] sm:text-[10px]',
                isHovered
                  ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(244,238,223,0.90)_100%)] text-[#063D29] shadow-[0_8px_18px_-4px_rgba(201,164,92,0.28),inset_1px_1px_1px_rgba(255,255,255,0.98)] ring-1 ring-[#C9A45C] dark:bg-[linear-gradient(135deg,rgba(16,44,30,0.94)_0%,rgba(9,24,17,0.90)_100%)] dark:text-[#2EB04B] dark:shadow-[0_10px_22px_-4px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] dark:ring-[#C9A45C]/70'
                  : 'bg-[linear-gradient(135deg,rgba(255,254,250,0.90)_0%,rgba(247,242,231,0.82)_100%)] text-[#242321] shadow-[0_4px_12px_-3px_rgba(24,20,12,0.16),inset_1px_1px_1px_rgba(255,255,255,0.96)] ring-1 ring-[#C9A45C]/65 dark:bg-[linear-gradient(135deg,rgba(11,29,21,0.88)_0%,rgba(8,20,15,0.84)_100%)] dark:text-[#F4F0E8] dark:shadow-[0_6px_16px_-3px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.10)] dark:ring-[#C9A45C]/30'
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'shrink-0 rounded-full transition-colors duration-200',
                  isDesktop ? 'h-1.5 w-1.5' : 'h-1 w-1 sm:h-1.5 sm:w-1.5',
                  isHovered
                    ? 'bg-[#064B35] ring-2 ring-[#C9A45C]/65 dark:bg-[#2EB04B]'
                    : 'bg-[#064B35] dark:bg-[#2EB04B]'
                )}
              />
              <span>{loc.name}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function UaeWithinReachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const smoothX = useSpring(magnetX, { stiffness: 260, damping: 22 });
  const smoothY = useSpring(magnetY, { stiffness: 260, damping: 22 });

  const handleCtaPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      magnetX.set(dx);
      magnetY.set(dy);
    },
    [magnetX, magnetY, prefersReducedMotion]
  );

  const handleCtaPointerLeave = useCallback(() => {
    magnetX.set(0);
    magnetY.set(0);
  }, [magnetX, magnetY]);

  return (
    <section
      ref={sectionRef}
      id="uae-within-reach"
      aria-labelledby="uae-within-reach-heading"
      className="relative overflow-x-clip bg-[#F7F4EC] transition-colors duration-300 dark:bg-[#050B08] lg:min-h-[600px] xl:min-h-[690px]"
    >
      {/* Subtle dark emerald-black atmosphere behind the left editorial column */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[64%] bg-[radial-gradient(62%_78%_at_24%_50%,rgba(11,107,69,0.14)_0%,rgba(6,19,13,0.45)_46%,transparent_78%)] dark:lg:block"
      />
      {/* ================= TOP TRANSITION WAVE FROM TRUST & RECOGNITION ================= */}
      {/* Overlaps the section boundary by 3px in solid #032D18 to prevent any fractional subpixel seam line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-[3px] z-[16] h-[67px] w-full sm:h-[85px] lg:h-[95px]"
      >
        <svg
          viewBox="0 -4 1440 108"
          preserveAspectRatio="none"
          fill="none"
          className="block h-full w-full"
        >
          <defs>
            <linearGradient id="within-reach-top-emerald" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#032D18" />
              <stop offset="100%" stopColor="#03311B" />
            </linearGradient>
          </defs>
          <path
            d="M 0 -4 L 1440 -4 L 1440 42 C 1180 76, 860 24, 520 54 C 260 78, 110 46, 0 62 Z"
            fill="#DCE5D8"
            fillOpacity="0.28"
            className="dark:hidden"
          />
          <path
            d="M 0 -4 L 1440 -4 L 1440 30 C 1170 62, 860 14, 520 42 C 270 64, 110 34, 0 50 Z"
            fill="url(#within-reach-top-emerald)"
          />
          <path
            d="M 0 51 C 110 35, 270 65, 520 43 C 860 15, 1170 63, 1440 31"
            stroke="#C9A45C"
            strokeOpacity="0.52"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* ================= DESKTOP 16:9 ARCHITECTURAL UAE SCENE (RIGHT-LOCKED, SEAMLESS IVORY BLEND) ================= */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] hidden items-center justify-end overflow-hidden lg:flex"
      >
        {/* Aspect-locked 16:9 stage keeping markers, connectors, and pills geometry-locked without top/bottom fade strips */}
        <div
          className="relative aspect-[1376/768] w-[1000px] max-w-none xl:w-[1250px] 2xl:w-[1440px]"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 14%, #000 32%, #000 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 14%, #000 32%, #000 100%)',
          }}
        >
          <Image
            src="/images/about/uae-within-reach-3d.webp"
            alt="Sculpted 3D warm ivory limestone and brushed champagne-gold architectural model of the United Arab Emirates with Downtown Dubai skyline over reflective water"
            fill
            quality={95}
            loading="eager"
            unoptimized
            sizes="(min-width: 1536px) 1440px, (min-width: 1280px) 1250px, 1000px"
            className="object-cover object-center"
          />

          {/* Soft ivory/dark readability feather behind the left editorial column */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#F7F4EC_0%,rgba(247,244,236,0.92)_24%,rgba(247,244,236,0.38)_38%,transparent_52%)] dark:bg-[linear-gradient(90deg,#050B08_0%,#050B08_15%,rgba(5,13,9,0.94)_23%,rgba(6,17,12,0.72)_32%,rgba(7,21,14,0.36)_41%,rgba(8,24,16,0.12)_48%,transparent_55%)]"
          />

          {/* Calibrated Normalized HTML/SVG Emirate Overlays (Desktop) */}
          <EmirateMarkerLayer variant="desktop" />
        </div>
      </div>

      {/* ================= EDITORIAL CONTENT & MOBILE/TABLET STAGE ================= */}
      <div className="pointer-events-none relative z-10 mx-auto flex max-w-[1440px] flex-col justify-center px-5 pb-20 pt-20 sm:px-8 sm:pt-24 md:pb-24 lg:min-h-[600px] lg:px-12 lg:py-24 xl:min-h-[690px] xl:px-16">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          {/* LEFT (~42%): Preserved Editorial Typography & Magnetic Liquid-Glass CTA */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
            }
            className="pointer-events-auto max-w-md xl:max-w-lg"
          >
            <div className="mb-2.5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-[1.5px] w-7 rounded-full bg-[#C9A45C]"
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#454846] dark:text-[#929D95]">
                YOUR NEXT CHAPTER
              </span>
            </div>

            <h2
              id="uae-within-reach-heading"
              className="font-serif text-[31px] font-semibold leading-[1.08] tracking-[-0.015em] text-[#242321] dark:text-[#F4F0E8] sm:text-[38px] lg:text-[36px] xl:text-[44px]"
            >
              <span className="block">Your UAE Business</span>
              <span className="relative inline-block font-semibold italic text-[#063D29] sm:whitespace-nowrap dark:text-[#2EB04B]">
                Journey Starts Here.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 280 12"
                  fill="none"
                  className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full"
                >
                  <path
                    d="M4 9.5 C 86 3, 198 2, 276 7"
                    stroke="#C9A45C"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="mt-4 max-w-md text-[14px] leading-[1.65] text-[#4A4E4B] dark:text-[#C1C8C1] sm:text-[15px]">
              From your first business decision to establishing your presence in
              the UAE, Takhlees is here to help you move forward with clarity and
              confidence.
            </p>

            {/* Primary Magnetic Liquid-Glass CTA */}
            <m.div
              onPointerMove={handleCtaPointerMove}
              onPointerLeave={handleCtaPointerLeave}
              style={
                prefersReducedMotion ? undefined : { x: smoothX, y: smoothY }
              }
              className="mt-7 inline-block"
            >
              <LiquidButton
                asChild
                variant="emerald"
                size="xl"
                className="group/cta shadow-[0_14px_30px_-8px_rgba(6,61,41,0.42),0_0_0_1px_rgba(201,164,92,0.38)]"
              >
                <Link href="/ae/contact">
                  <span>Speak With Our Team</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#063D29] transition-transform duration-300 group-hover/cta:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </LiquidButton>
            </m.div>
          </m.div>

          <div className="hidden min-h-[360px] lg:block" aria-hidden="true" />
        </div>

        {/* MOBILE & TABLET (< lg): Dedicated Aspect-Locked UAE Map Crop + Connected Overlays */}
        <div className="pointer-events-auto relative mt-4 w-full lg:hidden">
          <div className="relative mx-auto aspect-[922/676] w-full max-w-[680px]">
            <div
              className="relative h-full w-full"
              style={{
                maskImage:
                  'radial-gradient(ellipse 68% 66% at 52% 50%, #000 38%, rgba(0,0,0,0.48) 68%, transparent 96%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 68% 66% at 52% 50%, #000 38%, rgba(0,0,0,0.48) 68%, transparent 96%)',
              }}
            >
              <Image
                src="/images/about/uae-within-reach-3d-mobile.webp"
                alt="Sculpted 3D ivory limestone architectural model of the United Arab Emirates"
                fill
                quality={85}
                loading="eager"
                unoptimized
                sizes="(max-width: 768px) 100vw, 680px"
                className="object-cover object-center"
              />
            </div>

            {/* Calibrated Normalized HTML/SVG Emirate Overlays (Mobile/Tablet) */}
            <EmirateMarkerLayer variant="mobile" />
          </div>
        </div>
      </div>

      {/* ================= BOTTOM SCULPTED EMERALD WAVE -> SEAMLESS MONOLITHIC FOOTER BRIDGE ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-[3px] z-[16] h-[99px] w-full sm:h-[121px] lg:h-[137px]"
      >
        <svg
          viewBox="0 0 1440 139"
          preserveAspectRatio="none"
          fill="none"
          className="block h-full w-full"
        >
          <defs>
            <linearGradient id="within-reach-footer-gold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C9A45C" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#F5DDA0" stopOpacity="0.88" />
              <stop offset="70%" stopColor="#C9A45C" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#F5DDA0" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          {/* Sheer translucent emerald transition mist directly over sunlit travertine (zero pale strip) */}
          <path
            d="M 0 46 C 280 92, 640 110, 980 84 C 1200 66, 1340 40, 1440 22 L 1440 141 L 0 141 Z"
            fill="#064B35"
            fillOpacity="0.16"
            className="dark:opacity-25"
          />

          {/* Monolithic deep emerald base (#032D18) flowing seamlessly into Footer top bridge */}
          <path
            d="M 0 66 C 290 102, 650 116, 990 92 C 1205 76, 1345 50, 1440 34 L 1440 141 L 0 141 Z"
            fill="#032D18"
          />

          {/* Fine champagne-gold crest line */}
          <path
            d="M 0 65 C 290 101, 650 115, 990 91 C 1205 75, 1345 49, 1440 33"
            stroke="url(#within-reach-footer-gold)"
            strokeWidth="1.45"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  );
}

export default UaeWithinReachSection;
