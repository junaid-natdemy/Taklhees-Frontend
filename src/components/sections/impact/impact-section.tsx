'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { m, AnimatePresence, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { IMPACT_METRICS } from './impact-data';
import { ImpactGlobeBackdrop } from './impact-globe-backdrop';
import { ImpactStatCard, type OrbitalSlot } from './impact-stat-card';

const TOTAL_ITEMS = IMPACT_METRICS.length;
const DEFAULT_ACTIVE_INDEX = 2; // 500+ Business Collaborations

interface LiquidGlassArrowButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

/**
 * LiquidGlassArrowButton — Tactile circular water-drop lens button with top surface meniscus,
 * optical bevel refraction, emerald/obsidian theme tuning, and directional icon micro-shift.
 */
const LiquidGlassArrowButton = React.memo(function LiquidGlassArrowButton({
  direction,
  onClick,
  ariaLabel,
  className,
}: LiquidGlassArrowButtonProps) {
  const isPrev = direction === 'prev';
  const Icon = isPrev ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'group relative isolate flex h-11 w-11 xl:h-12 xl:w-12 cursor-pointer items-center justify-center rounded-full touch-manipulation select-none overflow-hidden',
        'bg-gradient-to-b from-white/95 via-white/75 to-[#EBF5EE]/90 backdrop-blur-md backdrop-saturate-150',
        'border border-[#146736]/22 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.16),0_3px_10px_-2px_rgba(20,103,54,0.16),inset_0_2px_3px_rgba(255,255,255,1),inset_0_-4px_8px_rgba(20,103,54,0.16)]',
        'text-neutral-800 hover:scale-105 hover:border-[#146736]/45 hover:text-[#146736] active:scale-95',
        'dark:bg-gradient-to-b dark:from-[#0E1E16]/90 dark:via-[#08110C]/85 dark:to-[#075B35]/35 dark:border-[#00A85A]/45',
        'dark:shadow-[0_14px_30px_-6px_rgba(0,0,0,0.94),0_0_22px_-4px_rgba(0,168,90,0.34),inset_0_1.5px_2px_rgba(255,255,255,0.28),inset_0_-4px_8px_rgba(0,168,90,0.22)]',
        'dark:text-[#F5F5F2] dark:hover:border-[#00A85A] dark:hover:text-[#4ADE80] dark:hover:shadow-[0_0_26px_-2px_rgba(0,168,90,0.55)]',
        'transition-[transform,box-shadow,border-color,color] duration-200 motion-reduce:transition-none',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#146736] focus-visible:ring-offset-2 dark:focus-visible:ring-[#00A85A] dark:focus-visible:ring-offset-[#050807]',
        className
      )}
    >
      {/* Spherical Optical Lens Surface Specular Highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[2px] rounded-full bg-[radial-gradient(110%_70%_at_50%_0%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.25)_42%,transparent_68%)] dark:bg-[radial-gradient(110%_70%_at_50%_0%,rgba(255,255,255,0.48)_0%,rgba(255,255,255,0.08)_44%,transparent_68%)]"
      />
      {/* Circular Inner Bevel Refractive Glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-full ring-1 ring-inset ring-white/70 dark:ring-white/15"
      />
      <Icon
        className={cn(
          'relative z-10 h-5 w-5 transition-transform duration-200',
          isPrev ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
        )}
        strokeWidth={2.2}
        aria-hidden="true"
      />
    </button>
  );
});

function getOrbitalSlot(index: number, activeIndex: number): OrbitalSlot {
  let diff = index - activeIndex;
  if (diff > 2) diff -= TOTAL_ITEMS;
  if (diff < -2) diff += TOTAL_ITEMS;
  return diff as OrbitalSlot;
}

/**
 * ImpactSection — "Our Impact in Numbers"
 * Spatial, globe-anchored institutional credibility stage featuring:
 * - Procedurally projected dotted SVG globe + latitude/longitude curves
 * - UAE-inspired emerald, gold, and crimson orbital ribbon architecture
 * - Interactive 5-card 3D perspective stage (Desktop & Laptop)
 * - Dedicated 3-card perspective deck + quick-select tabs (Tablet)
 * - Interactive Spotlight + 5-metric Bento matrix (Mobile)
 */
export function ImpactSection() {
  const [activeIndex, setActiveIndex] = React.useState<number>(DEFAULT_ACTIVE_INDEX);
  const prefersReduced = !!useReducedMotion();

  const handlePrev = React.useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TOTAL_ITEMS) % TOTAL_ITEMS);
  }, []);

  const handleNext = React.useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TOTAL_ITEMS);
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  const activeMetric = IMPACT_METRICS[activeIndex];

  return (
    <section
      id="impact"
      aria-labelledby="impact-section-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#F7F5F0_0%,#F7F6F1_18%,#F7F6F1_100%)] py-16 sm:py-20 lg:py-24 dark:bg-[linear-gradient(180deg,#080909_0%,#050807_18%,#050807_100%)] transition-colors duration-300"
    >
      {/* Subtle Top Transition Seam Separating Hero & Impact */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent dark:via-white/[0.08]"
      />

      {/* Code-Constructed Dotted Globe, Orbital Rings, Floating Particles & Dubai Skyline */}
      <ImpactGlobeBackdrop />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-[1260px] px-4 sm:px-6">
        {/* ================= SECTION HEADER ================= */}
        <m.header
          initial={prefersReduced ? false : { opacity: 0.99, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Architectural Eyebrow Divider */}
          <div className="mb-3 flex items-center justify-center gap-2.5 sm:gap-3">
            <span className="h-[1.5px] w-6 sm:w-8 shrink-0 rounded-full bg-gradient-to-r from-transparent to-[#146736] dark:to-[#2EB04B]" />
            <span className="whitespace-nowrap text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-neutral-700 dark:text-[#A5AAA7]">
              Trust <span className="mx-1 text-[#C2242B]">•</span> Experience{' '}
              <span className="mx-1 text-[#146736] dark:text-[#2EB04B]">•</span> Results
            </span>
            <span className="h-[1.5px] w-6 sm:w-8 shrink-0 rounded-full bg-gradient-to-l from-transparent to-[#C99726]" />
          </div>

          {/* Section Title with Signature Crimson Underline Swoosh */}
          <h2
            id="impact-section-heading"
            className="text-balance font-sans text-[30px] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#171717] dark:text-white sm:text-[38px] lg:text-[42px]"
          >
            Our Impact in{' '}
            <span className="relative inline-block text-[#146736] dark:text-[#00A85A]">
              <span>Numbers</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 180 14"
                className="pointer-events-none absolute -bottom-2 left-0 h-2.5 w-full"
                fill="none"
              >
                <path
                  d="M2 11 C46 3 125 1 178 4 C128 7 50 13 2 11 Z"
                  className="fill-[#C2242B] dark:fill-[#D92332]"
                />
              </svg>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-pretty text-sm leading-relaxed text-neutral-600 dark:text-[#B5BEB9] sm:text-[15.5px]">
            Trusted by thousands of businesses, investors, and families across all seven Emirates.
          </p>
        </m.header>

        {/* ================= DESKTOP & LAPTOP 5-CARD ORBITAL PERSPECTIVE STAGE (lg+) ================= */}
        <m.div
          role="region"
          aria-roledescription="interactive metrics showcase"
          aria-label="Takhlees impact statistics stage"
          onKeyDown={handleKeyDown}
          initial={prefersReduced ? false : { opacity: 0.99, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 hidden lg:block"
        >
          <div className="relative mx-auto h-[356px] xl:h-[382px] w-full max-w-[1200px]">
            {/* Left Liquid Glass Orbital Arrow Control */}
            <LiquidGlassArrowButton
              direction="prev"
              onClick={handlePrev}
              ariaLabel="Show previous impact statistic"
              className="absolute left-1 xl:left-4 top-[134px] xl:top-[144px] z-50"
            />

            {/* 5 Interactive Perspective Cards */}
            {IMPACT_METRICS.map((metric, idx) => {
              const slot = getOrbitalSlot(idx, activeIndex);
              return (
                <ImpactStatCard
                  key={metric.id}
                  metric={metric}
                  slot={slot}
                  variant="desktop"
                  isActive={idx === activeIndex}
                  onSelect={() => setActiveIndex(idx)}
                  delayMs={idx * 90}
                />
              );
            })}

            {/* Right Liquid Glass Orbital Arrow Control */}
            <LiquidGlassArrowButton
              direction="next"
              onClick={handleNext}
              ariaLabel="Show next impact statistic"
              className="absolute right-1 xl:right-4 top-[134px] xl:top-[144px] z-50"
            />
          </div>
        </m.div>

        {/* ================= TABLET 3-CARD PERSPECTIVE DECK (md to <lg) ================= */}
        <div
          role="region"
          aria-roledescription="interactive metrics showcase"
          aria-label="Takhlees impact statistics stage"
          onKeyDown={handleKeyDown}
          className="relative mt-10 hidden md:block lg:hidden"
        >
          <div className="relative mx-auto h-[342px] w-full max-w-[680px]">
            <LiquidGlassArrowButton
              direction="prev"
              onClick={handlePrev}
              ariaLabel="Show previous impact statistic"
              className="absolute left-0 top-[126px] z-50"
            />

            {IMPACT_METRICS.map((metric, idx) => {
              const slot = getOrbitalSlot(idx, activeIndex);
              return (
                <ImpactStatCard
                  key={metric.id}
                  metric={metric}
                  slot={slot}
                  variant="tablet"
                  isActive={idx === activeIndex}
                  onSelect={() => setActiveIndex(idx)}
                  delayMs={idx * 80}
                />
              );
            })}

            <LiquidGlassArrowButton
              direction="next"
              onClick={handleNext}
              ariaLabel="Show next impact statistic"
              className="absolute right-0 top-[126px] z-50"
            />
          </div>
        </div>

        {/* ================= DESKTOP & TABLET INTERACTIVE METRIC RAIL ================= */}
        <div
          className="mt-4 hidden flex-wrap items-center justify-center gap-2 md:flex"
          role="group"
          aria-label="Jump to statistic"
        >
          {IMPACT_METRICS.map((metric, idx) => {
            const selected = idx === activeIndex;
            return (
              <button
                key={metric.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-pressed={selected}
                className={cn(
                  'cursor-pointer rounded-full px-3.5 py-2 text-xs font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#146736] dark:focus-visible:ring-[#00A85A] touch-manipulation',
                  selected
                    ? 'bg-[#146736] text-white shadow-[0_6px_18px_-4px_rgba(20,103,54,0.45)] dark:bg-[#008546] dark:text-white dark:shadow-[0_6px_22px_-4px_rgba(0,168,90,0.52)] dark:ring-1 dark:ring-[#00A85A]/80'
                    : 'border border-black/[0.08] bg-white/80 text-neutral-700 backdrop-blur-md hover:border-[#146736]/35 hover:text-[#146736] dark:border-white/[0.14] dark:bg-black/60 dark:text-neutral-300 dark:hover:border-[#00A85A]/55 dark:hover:text-white'
                )}
              >
                {metric.shortLabel}
              </button>
            );
          })}
        </div>

        {/* ================= MOBILE BESPOKE SPOTLIGHT + ALL-METRICS BENTO (< md) ================= */}
        <div className="mt-8 space-y-5 md:hidden">
          {/* Active Featured Showcase Stage */}
          <div className="relative mx-auto max-w-[340px]">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={activeMetric.id}
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              >
                <ImpactStatCard
                  metric={activeMetric}
                  variant="mobile"
                  isActive={true}
                  onSelect={handleNext}
                  delayMs={0}
                />
              </m.div>
            </AnimatePresence>

            {/* Mobile Stage Arrows Bar */}
            <div className="mt-3.5 flex items-center justify-between px-1">
              <LiquidGlassArrowButton
                direction="prev"
                onClick={handlePrev}
                ariaLabel="Previous impact metric"
                className="h-11 w-11"
              />

              <span className="text-xs font-semibold text-neutral-600 dark:text-[#A5AAA7]" aria-live="polite">
                {activeIndex + 1} / {TOTAL_ITEMS} — {activeMetric.highlightTag}
              </span>

              <LiquidGlassArrowButton
                direction="next"
                onClick={handleNext}
                ariaLabel="Next impact metric"
                className="h-11 w-11"
              />
            </div>
          </div>

          {/* All 5 Metrics Quick-Overview Bento Grid (Every number readable without hidden tabs) */}
          <div className="grid grid-cols-2 gap-2.5">
            {IMPACT_METRICS.map((metric, idx) => {
              const selected = idx === activeIndex;
              return (
                <button
                  key={metric.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-pressed={selected}
                  className={cn(
                    'flex min-h-[68px] cursor-pointer flex-col items-start justify-center rounded-2xl border p-3.5 text-left transition-[background-color,border-color,box-shadow] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#146736] touch-manipulation',
                    idx === 4 && 'col-span-2',
                    selected
                      ? 'border-[#146736] bg-[#146736]/10 shadow-sm dark:border-[#2EB04B] dark:bg-[#16A05A]/15'
                      : 'border-black/[0.08] bg-white/80 dark:border-white/10 dark:bg-[#111313]/85'
                  )}
                >
                  <span
                    className={cn(
                      'font-sans text-lg font-extrabold tabular-nums leading-none',
                      selected
                        ? 'text-[#146736] dark:text-[#2EB04B]'
                        : 'text-[#171717] dark:text-[#F5F5F2]'
                    )}
                  >
                    {metric.value}
                    {metric.suffix}
                  </span>
                  <span className="mt-1 text-xs font-medium text-neutral-700 dark:text-[#A5AAA7]">
                    {metric.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImpactSection;
