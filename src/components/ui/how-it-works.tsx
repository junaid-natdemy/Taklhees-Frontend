'use client';

import React, { useRef } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useSectionInView } from '@/hooks/use-section-in-view';

export type PinTone = 'red' | 'green' | 'charcoal';

export interface HowItWorksStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  pinTone?: PinTone;
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  steps: HowItWorksStep[];
  className?: string;
  stepPositions?: StepPosition[];
}

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  {
    className: 'md:absolute md:top-1 md:left-[2%] lg:left-[5%]',
    rotate: 'md:-rotate-[1.5deg] lg:-rotate-[1.75deg]',
  },
  {
    className: 'md:absolute md:top-[108px] md:right-[2%] lg:right-[5%]',
    rotate: 'md:rotate-[1.5deg] lg:rotate-[1.75deg]',
  },
  {
    className: 'md:absolute md:top-[220px] md:left-[4%] lg:left-[8%]',
    rotate: 'md:-rotate-[1.25deg] lg:-rotate-[1.5deg]',
  },
];

const PIN_PALETTES: Record<
  PinTone,
  {
    needle: string;
    collar: string;
    stem: string;
    cap: string;
    glow: string;
  }
> = {
  red: {
    needle: 'stroke-[#7F1D1D] dark:stroke-[#FCA5A5]',
    collar: 'fill-[#A31C1B] dark:fill-[#DC2626]',
    stem: 'fill-[#C2242B] dark:fill-[#EF4444]',
    cap: 'fill-[#E11D48] dark:fill-[#F87171]',
    glow: 'drop-shadow-[0_4px_8px_rgba(194,36,43,0.34)]',
  },
  green: {
    needle: 'stroke-[#064E29] dark:stroke-[#86EFAC]',
    collar: 'fill-[#087A42] dark:fill-[#16A05A]',
    stem: 'fill-[#0A8A4B] dark:fill-[#1EB968]',
    cap: 'fill-[#16A05A] dark:fill-[#2EB04B]',
    glow: 'drop-shadow-[0_4px_8px_rgba(8,122,66,0.34)]',
  },
  charcoal: {
    needle: 'stroke-[#111827] dark:stroke-[#D1D5DB]',
    collar: 'fill-[#1F2937] dark:fill-[#6B7280]',
    stem: 'fill-[#2B3440] dark:fill-[#9CA3AF]',
    cap: 'fill-[#374151] dark:fill-[#E5E7EB]',
    glow: 'drop-shadow-[0_4px_8px_rgba(33,33,33,0.32)]',
  },
};

function BrandPushPin({
  tone = 'green',
  className,
}: {
  tone?: PinTone;
  className?: string;
}) {
  const palette = PIN_PALETTES[tone];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 28"
      fill="none"
      className={cn('h-7 w-7', palette.glow, className)}
    >
      <path
        d="M14 17.5L12.6 25.5"
        strokeWidth="1.6"
        strokeLinecap="round"
        className={cn('opacity-70', palette.needle)}
      />
      <ellipse cx="14" cy="15.5" rx="5.5" ry="2.3" className={palette.collar} />
      <rect
        x="11.8"
        y="9.5"
        width="4.4"
        height="6"
        rx="1.5"
        className={palette.stem}
      />
      <ellipse cx="14" cy="8.5" rx="5.2" ry="3" className={palette.cap} />
      <ellipse cx="12.6" cy="7.6" rx="2" ry="0.9" fill="white" fillOpacity="0.58" />
    </svg>
  );
}

function ProcessCard({
  step,
  index,
  position,
  reducedMotion,
}: {
  step: HowItWorksStep;
  index: number;
  position: StepPosition;
  reducedMotion: boolean | null;
}) {
  const fallbackTones: PinTone[] = ['red', 'green', 'charcoal'];
  const pinTone = step.pinTone ?? fallbackTones[index % fallbackTones.length];

  return (
    <m.div
      initial={reducedMotion ? false : { opacity: 0.99, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: 0.48,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'relative z-10 w-full md:w-[335px] lg:w-[440px]',
        position.className,
        position.rotate
      )}
    >
      {/* Takhlees Logo-Colored 3D Pin (Red / Green / Charcoal) */}
      <div className="pointer-events-none absolute -top-3.5 left-12 z-30 hidden md:block">
        <BrandPushPin tone={pinTone} />
      </div>

      {/* 3D Water-Touch Liquid Glass Card */}
      <div
        className={cn(
          'service-liquid-glass group relative flex items-center gap-3.5 overflow-hidden rounded-[20px] p-4 transition-all duration-300 sm:gap-4 sm:p-[18px]',
          'hover:-translate-y-1 hover:shadow-[0_22px_46px_-12px_rgba(0,90,45,0.22)] dark:hover:shadow-[0_22px_48px_-12px_rgba(0,168,90,0.24)]'
        )}
      >
        {/* Upper Domed Water-Glass Specular Reflection Band */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 top-0.5 z-10 h-[38%] rounded-t-[18px] bg-gradient-to-b from-white/70 via-white/15 to-transparent dark:from-white/[0.12] dark:via-white/[0.02] dark:to-transparent"
        />

        {/* Top Water Meniscus Crisp Highlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-7 top-0 z-10 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-white/40"
        />

        {/* Water-Glass Emerald Icon Container */}
        <div className="relative z-20 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-[#087A42]/12 text-[#087A42] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_10px_rgba(8,122,66,0.12)] backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#087A42]/18 dark:border-[#16A05A]/30 dark:bg-[#16A05A]/15 dark:text-[#16A05A] dark:shadow-none sm:h-13 sm:w-13">
          {step.icon}
        </div>

        {/* Large Prominent Emerald Step Number */}
        <span className="relative z-20 shrink-0 text-2xl font-extrabold tracking-tight text-[#087A42] dark:text-[#16A05A] sm:text-3xl">
          {step.number}
        </span>

        {/* Compact Title + Readable Description */}
        <div className="relative z-20 min-w-0 flex-1">
          <h3 className="text-[15.5px] font-bold leading-snug tracking-tight text-[#171717] dark:text-white sm:text-[16.5px]">
            {step.title}
          </h3>
          <p className="mt-0.5 text-[12px] leading-[1.42] text-[#404040] dark:text-white/75 sm:text-[12.5px]">
            {step.description}
          </p>
        </div>
      </div>
    </m.div>
  );
}

export default function HowItWorks({
  steps,
  className,
  stepPositions,
}: HowItWorksProps) {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useSectionInView(wrapperRef);
  const shouldAnimate = !prefersReducedMotion && inView;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  return (
    <div ref={wrapperRef} className={cn('relative mx-auto w-full max-w-[980px]', className)}>
        {/* Desktop & Tablet Staggered 3-Card Stage */}
        <div className="relative flex flex-col gap-5 pl-7 md:block md:h-[346px] md:gap-0 md:pl-0">
          {/* Mobile Vertical Timeline Line & Nodes */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-10 left-2.5 top-10 w-px border-l-2 border-dashed border-[#087A42]/45 dark:border-[#16A05A]/50 md:hidden"
          />
          {steps.map((step, i) => (
            <span
              key={`mob-node-${step.id}`}
              aria-hidden="true"
              style={{ top: `${i === 0 ? 15 : i === 1 ? 50 : 85}%` }}
              className="pointer-events-none absolute left-1 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-[#087A42] bg-[#F8F7F2] shadow-[0_0_10px_rgba(8,122,66,0.4)] dark:border-[#16A05A] dark:bg-[#050807] md:hidden"
            />
          ))}

          {/* Desktop Curved Connecting SVG Path Behind Cards */}
          {steps.length >= 3 && (
            <svg
              aria-hidden="true"
              viewBox="0 0 980 346"
              fill="none"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
            >
              {/* Path 1 -> 2 */}
              <m.path
                d="M 465 62 C 535 50, 580 80, 574 128"
                stroke="currentColor"
                className="text-[#087A42]/60 dark:text-[#16A05A]/65"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
                fill="none"
                initial={prefersReducedMotion ? false : { strokeDashoffset: 0 }}
                animate={
                  shouldAnimate ? { strokeDashoffset: -72 } : undefined
                }
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              {/* Path 2 -> 3 */}
              <m.path
                d="M 548 194 C 470 190, 426 212, 414 246"
                stroke="currentColor"
                className="text-[#087A42]/60 dark:text-[#16A05A]/65"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
                fill="none"
                initial={prefersReducedMotion ? false : { strokeDashoffset: 0 }}
                animate={
                  shouldAnimate ? { strokeDashoffset: -72 } : undefined
                }
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Glowing Circular Connection Nodes */}
              {[
                { cx: 465, cy: 62 },
                { cx: 574, cy: 128 },
                { cx: 548, cy: 194 },
                { cx: 414, cy: 246 },
              ].map((pt, idx) => (
                <g key={idx}>
                  <circle
                    cx={pt.cx}
                    cy={pt.cy}
                    r="11"
                    className="fill-[#087A42]/18 dark:fill-[#16A05A]/22"
                  />
                  <circle
                    cx={pt.cx}
                    cy={pt.cy}
                    r="6"
                    className="fill-white stroke-[#087A42] dark:fill-[#0D1310] dark:stroke-[#16A05A]"
                    strokeWidth="2"
                  />
                  <circle
                    cx={pt.cx}
                    cy={pt.cy}
                    r="2.5"
                    className="fill-[#087A42] dark:fill-[#16A05A]"
                  />
                </g>
              ))}
            </svg>
          )}

          {steps.map((step, index) => (
            <ProcessCard
              key={step.id}
              step={step}
              index={index}
              position={positions[index % positions.length]}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
  );
}
