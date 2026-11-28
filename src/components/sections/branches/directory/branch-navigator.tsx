'use client';

import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Clock,
  Mail,
  MapPin,
  Phone,
  Plus,
} from 'lucide-react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import {
  formatBranchSequence,
  type BranchItem,
} from '@/features/branches/branches-data';
import { BranchVisualPlate } from './branch-visual-plate';

interface BranchNavigatorProps {
  branches: readonly BranchItem[];
  pageIndex: number;
  selectedBranchId: string;
  onSelectBranch: (id: string) => void;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  nextCount: number;
  remainingAfterCount: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  comingSoonSlots?: number;
}

const RAIL_CURVE_OFFSETS = [18, 4, 0, 10, 20] as const;

const LEFT_BLADE_CLIP_PATH =
  'polygon(44px 0%, 100% 0%, 100% 100%, 44px 100%, 35px 96%, 27px 87%, 19px 76%, 11px 64%, 0px 55%, 7px 45%, 14px 31%, 23px 17%, 33px 6%)';

function buildCurvedRailPath(count: number): string {
  if (count < 2) return '';
  const points = Array.from({ length: count }, (_, idx) => ({
    x: 20 + RAIL_CURVE_OFFSETS[idx % RAIL_CURVE_OFFSETS.length],
    y: 50 + idx * 100,
  }));

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const curr = points[i];
    const next = points[i + 1];
    d += ` C ${curr.x} ${curr.y + 46}, ${next.x} ${next.y - 46}, ${next.x} ${next.y}`;
  }
  return d;
}

export function BranchNavigator({
  branches,
  pageIndex,
  selectedBranchId,
  onSelectBranch,
  hasPrevPage,
  hasNextPage,
  nextCount,
  remainingAfterCount,
  onPrevPage,
  onNextPage,
  comingSoonSlots = 0,
}: BranchNavigatorProps) {
  const prefersReducedMotion = useReducedMotion();
  const totalSlots = branches.length + Math.max(0, comingSoonSlots);
  const railPath = buildCurvedRailPath(totalSlots);
  const activeIdx = Math.max(
    0,
    branches.findIndex((b) => b.id === selectedBranchId)
  );
  const activeRatio =
    totalSlots > 1 ? Math.round((activeIdx / (totalSlots - 1)) * 100) : 50;

  return (
    <div className="relative">
      {/* Sculpted Flowing Glass Branch Ribbons (5-at-a-time Windowed Replacement) */}
      <AnimatePresence mode="wait" initial={false}>
        <m.ol
          key={pageIndex}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
          }
          className="relative z-10 flex flex-col gap-2.5"
        >
          {/* Curved Champagne-Metal Architectural Rail Passing Through All Medallions (sm+) */}
          {totalSlots > 1 ? (
            <svg
              aria-hidden="true"
              viewBox={`0 0 64 ${totalSlots * 100}`}
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden h-full w-16 sm:block"
            >
              <defs>
                <linearGradient
                  id="navigatorRailGoldV3"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#C9A45C" stopOpacity="0.45" />
                  <stop
                    offset={`${Math.max(0, activeRatio - 18)}%`}
                    stopColor="#E6C98A"
                    stopOpacity="0.88"
                  />
                  <stop
                    offset={`${activeRatio}%`}
                    stopColor="#18A86A"
                    stopOpacity="0.95"
                  />
                  <stop
                    offset={`${Math.min(100, activeRatio + 18)}%`}
                    stopColor="#E6C98A"
                    stopOpacity="0.88"
                  />
                  <stop offset="100%" stopColor="#C9A45C" stopOpacity="0.45" />
                </linearGradient>
              </defs>
              {/* Soft Ambient Rail Halo */}
              <path
                d={railPath}
                fill="none"
                stroke="#C9A45C"
                strokeOpacity="0.18"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              {/* Precision Champagne-Metal & Emerald-Illuminated Rail */}
              <path
                d={railPath}
                fill="none"
                stroke="url(#navigatorRailGoldV3)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : null}

          {branches.map((branch, idx) => {
            const isActive = branch.id === selectedBranchId;
            const seq = formatBranchSequence(branch.sequenceNumber);
            const curveOffset =
              RAIL_CURVE_OFFSETS[idx % RAIL_CURVE_OFFSETS.length];

            return (
              <m.li
                key={branch.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.28,
                        delay: idx * 0.035,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
                className="group/branch relative flex items-center gap-3 sm:gap-3"
              >
                {/* Glass / Champagne-Metal Sequence Medallion Following the Curve */}
                <div className="relative z-10 hidden w-16 shrink-0 items-center sm:flex">
                  <button
                    type="button"
                    onClick={() => onSelectBranch(branch.id)}
                    aria-label={`Select ${branch.name} branch`}
                    aria-pressed={isActive}
                    style={{ marginLeft: `${curveOffset}px` }}
                    className={cn(
                      'grid h-10 w-10 place-items-center rounded-full border font-mono text-[11.5px] font-semibold backdrop-blur-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A86A]',
                      isActive
                        ? 'scale-110 border-[#E6C98A] bg-gradient-to-br from-[#063D2B] via-[#087B4B] to-[#18A86A]/90 text-[#FAF9F5] shadow-[0_8px_22px_-4px_rgba(8,123,75,0.55),0_0_0_4px_rgba(24,168,106,0.18),inset_0_1.5px_1px_rgba(255,255,255,0.52)] dark:border-[#E6C98A] dark:from-[#063D2B] dark:via-[#087B4B] dark:to-[#18A86A]/90'
                        : 'border-[#C9A45C]/65 bg-[#FAF9F5]/75 text-[#063D2B] shadow-[0_6px_16px_-6px_rgba(11,59,40,0.16),inset_0_1.5px_1px_rgba(255,255,255,0.95)] hover:border-[#087B4B]/70 hover:bg-white/85 dark:border-[#C9A45C]/40 dark:bg-[#091C14]/85 dark:text-[#E6C98A] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] dark:hover:border-[#E6C98A]'
                    )}
                  >
                    {seq}
                  </button>
                </div>

                {/* Sculpted Asymmetrical Liquid-Glass Ribbon (Left Edge Cut to Match Image) */}
                <div
                  onClick={() => onSelectBranch(branch.id)}
                  className={cn(
                    'relative w-full cursor-pointer transition-all duration-300',
                    isActive
                      ? 'drop-shadow-[0_16px_30px_rgba(8,123,75,0.42)]'
                      : 'drop-shadow-[0_12px_24px_rgba(11,59,40,0.14)] dark:drop-shadow-[0_14px_28px_rgba(0,0,0,0.65)]'
                  )}
                >
                  {/* Champagne/Gold Outer Rim Tracing the Pointed Left Cut */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 44 100"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-y-0 left-0 z-20 h-full w-[44px]"
                  >
                    <path
                      d="M 44,0.5 C 24,0.5 22,36 0.8,55 C 22,72 24,99.5 44,99.5"
                      fill="none"
                      stroke={isActive ? '#E6C98A' : '#C9A45C'}
                      strokeOpacity={isActive ? '0.88' : '0.6'}
                      strokeWidth="1.4"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  <div
                    style={{ clipPath: LEFT_BLADE_CLIP_PATH }}
                    className={cn(
                      'relative flex w-full items-center justify-between overflow-hidden rounded-r-full border backdrop-blur-xl backdrop-saturate-150 transition-all duration-300',
                      isActive
                        ? 'border-[#E6C98A]/85 bg-gradient-to-r from-[#063D2B]/95 via-[#087B4B]/90 to-[#063D2B]/95 text-[#FAF9F5] shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.44),inset_0_0_28px_rgba(24,168,106,0.22),inset_0_-1.5px_2px_rgba(0,0,0,0.28)] dark:border-[#E6C98A]/75 dark:from-[#063D2B]/95 dark:via-[#087B4B]/90 dark:to-[#052E20]/95'
                        : 'border-white/75 bg-gradient-to-r from-white/35 via-[#FAF9F5]/25 to-[#C9A45C]/[0.08] text-[#0B3B28] shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.94),inset_0_-1.5px_2px_rgba(11,59,40,0.08),inset_0_0_0_1px_rgba(201,164,92,0.28)] hover:border-[#C9A45C]/75 hover:from-white/50 hover:via-[#FAF9F5]/35 dark:border-white/[0.14] dark:from-white/[0.06] dark:via-[#0A2016]/35 dark:to-[#C9A45C]/[0.05] dark:text-[#F4F0E8] dark:shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.20),inset_0_0_0_1px_rgba(201,164,92,0.20)] dark:hover:border-[#C9A45C]/45'
                    )}
                  >
                    {/* Internal Central Emerald Illumination (Selected) */}
                    {isActive ? (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_64%_46%,rgba(24,168,106,0.42)_0%,rgba(8,123,75,0.16)_48%,transparent_78%)]"
                      />
                    ) : null}

                    {/* Specular Meniscus & Diagonal Liquid Sheen */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        'pointer-events-none absolute inset-0 rounded-[inherit]',
                        isActive
                          ? 'bg-[linear-gradient(115deg,rgba(255,255,255,0.16)_0%,transparent_42%,rgba(230,201,138,0.18)_78%,transparent_100%)]'
                          : 'bg-[linear-gradient(115deg,rgba(255,255,255,0.48)_0%,transparent_40%,rgba(201,164,92,0.08)_78%,rgba(255,255,255,0.24)_100%)] dark:bg-[linear-gradient(115deg,rgba(255,255,255,0.10)_0%,transparent_42%,rgba(201,164,92,0.06)_78%,transparent_100%)]'
                      )}
                    />

                    {/* Left: Photograph / Neutral Plate (Follows Ribbon Left Cut) */}
                    <div className="relative h-[76px] w-[120px] shrink-0 overflow-hidden sm:h-[82px] sm:w-[170px] md:w-[190px]">
                      <BranchVisualPlate
                        name={branch.name}
                        image={branch.image}
                        isActive={isActive}
                        sizes="(max-width: 640px) 120px, 190px"
                        className="h-full w-full"
                      />
                      {/* Mobile Sequence Badge */}
                      <span
                        className={cn(
                          'absolute left-5 top-2.5 grid h-6 w-6 place-items-center rounded-full border font-mono text-[10px] font-semibold backdrop-blur-md sm:hidden',
                          isActive
                            ? 'border-[#E6C98A] bg-[#087B4B]/90 text-[#FAF9F5]'
                            : 'border-[#C9A45C]/50 bg-[#FAF9F5]/90 text-[#0B3B28] dark:bg-[#06110C]/85 dark:text-[#D2B475]'
                        )}
                      >
                        {seq}
                      </span>
                    </div>

                  {/* Middle: Branch Name, Location & Verified Contact (if present) */}
                  <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center px-3 py-2 sm:px-4">
                    <h3
                      className={cn(
                        'truncate font-serif text-[17px] font-semibold leading-tight sm:text-[18.5px]',
                        isActive
                          ? 'text-[#FAF9F5]'
                          : 'text-[#0B3B28] dark:text-[#F4F0E8]'
                      )}
                    >
                      {branch.name}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 text-[12px] font-medium',
                          isActive
                            ? 'text-[#D8E5DD]'
                            : 'text-[#545955] dark:text-[#A4B0A8]'
                        )}
                      >
                        <MapPin
                          className={cn(
                            'h-3.5 w-3.5 shrink-0',
                            isActive
                              ? 'text-[#E6C98A]'
                              : 'text-[#146736] dark:text-[#C9A45C]'
                          )}
                          aria-hidden="true"
                        />
                        <span>{branch.locationLabel}</span>
                      </span>

                      {branch.phone ? (
                        <a
                          href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            'inline-flex items-center gap-1 text-[12px] font-medium underline-offset-2 hover:underline',
                            isActive
                              ? 'text-[#FAF9F5]'
                              : 'text-[#0B3B28] dark:text-[#D2B475]'
                          )}
                        >
                          <Phone
                            className="h-3 w-3 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{branch.phone}</span>
                        </a>
                      ) : null}

                      {branch.email ? (
                        <a
                          href={`mailto:${branch.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            'inline-flex items-center gap-1 text-[12px] font-medium underline-offset-2 hover:underline',
                            isActive
                              ? 'text-[#D8E5DD]'
                              : 'text-[#545955] dark:text-[#A4B0A8]'
                          )}
                        >
                          <Mail
                            className="h-3 w-3 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{branch.email}</span>
                        </a>
                      ) : null}
                    </div>
                  </div>

                  {/* Right: Illuminated Circular Detail Arrow */}
                  <div className="relative z-10 pr-3 sm:pr-4">
                    <Link
                      href={branch.href}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`View details for ${branch.name}`}
                      className={cn(
                        'grid h-10 w-10 place-items-center rounded-full border backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146736]',
                        isActive
                          ? 'border-[#E6C98A]/75 bg-white/15 text-[#FAF9F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0_16px_rgba(201,164,92,0.22)] hover:bg-[#C9A45C] hover:text-[#050B08]'
                          : 'border-[#C9A45C]/45 bg-white/75 text-[#0B3B28] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:border-[#0B3B28] hover:bg-[#0B3B28] hover:text-[#FAF9F5] dark:border-[#C9A45C]/30 dark:bg-[#06110C]/80 dark:text-[#D2B475] dark:hover:border-[#C9A45C] dark:hover:bg-[#C9A45C] dark:hover:text-[#050B08]'
                      )}
                    >
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover/branch:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                  </div>
                </div>
              </m.li>
            );
          })}

          {/* Sculpted Liquid-Glass "New Branches Coming Soon" Placeholder Ribbons */}
          {Array.from({ length: Math.max(0, comingSoonSlots) }, (_, slotIdx) => {
            const globalIdx = branches.length + slotIdx;
            const curveOffset =
              RAIL_CURVE_OFFSETS[globalIdx % RAIL_CURVE_OFFSETS.length];

            return (
              <m.li
                key={`coming-soon-${slotIdx}`}
                aria-hidden="true"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.3,
                        delay: globalIdx * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
                className="relative flex items-center gap-3 sm:gap-3"
              >
                {/* Glass Medallion on the Curved Rail */}
                <div className="relative z-10 hidden w-16 shrink-0 items-center sm:flex">
                  <div
                    style={{ marginLeft: `${curveOffset}px` }}
                    className="grid h-10 w-10 place-items-center rounded-full border border-[#C9A45C]/45 bg-[#FAF9F5]/60 text-[#C9A45C] shadow-[0_6px_14px_-6px_rgba(11,59,40,0.12),inset_0_1.5px_1px_rgba(255,255,255,0.85)] backdrop-blur-xl dark:border-[#C9A45C]/30 dark:bg-[#091C14]/70 dark:text-[#D2B475]"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </div>

                {/* Sculpted Coming-Soon Ribbon Matching Real Ribbons */}
                <div className="relative w-full drop-shadow-[0_10px_22px_rgba(11,59,40,0.08)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 44 100"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-y-0 left-0 z-20 h-full w-[44px]"
                  >
                    <path
                      d="M 44,0.5 C 24,0.5 22,36 0.8,55 C 22,72 24,99.5 44,99.5"
                      fill="none"
                      stroke="#C9A45C"
                      strokeOpacity="0.45"
                      strokeWidth="1.3"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  <div
                    style={{ clipPath: LEFT_BLADE_CLIP_PATH }}
                    className="relative flex w-full items-center justify-between overflow-hidden rounded-r-full border border-dashed border-[#C9A45C]/45 bg-gradient-to-r from-white/25 via-[#FAF9F5]/18 to-[#C9A45C]/[0.06] backdrop-blur-xl backdrop-saturate-150 dark:border-[#C9A45C]/30 dark:from-white/[0.04] dark:via-[#0A2016]/30 dark:to-[#C9A45C]/[0.04]"
                  >
                    {/* Left Architectural Plate */}
                    <div className="relative h-[76px] w-[120px] shrink-0 overflow-hidden sm:h-[82px] sm:w-[170px] md:w-[190px]">
                      <BranchVisualPlate
                        name="Upcoming Takhlees Branch"
                        isActive={false}
                        sizes="(max-width: 640px) 120px, 190px"
                        className="h-full w-full opacity-80"
                      />
                    </div>

                    {/* Middle: Animated Coming Soon Typography */}
                    <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center px-3 py-2 sm:px-4">
                      <m.div
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : {
                                opacity: [0.72, 1, 0.72],
                                x: [0, 3, 0],
                              }
                        }
                        transition={{
                          duration: 3.2,
                          repeat: Infinity,
                          delay: slotIdx * 0.45,
                          ease: 'easeInOut',
                        }}
                        className="truncate font-serif text-[16px] font-semibold leading-tight text-[#087B4B] dark:text-[#E6C98A] sm:text-[17.5px]"
                      >
                        New Branches Coming Soon
                      </m.div>

                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="relative flex h-2 w-2 shrink-0">
                          {!prefersReducedMotion ? (
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#18A86A] opacity-65" />
                          ) : null}
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#18A86A] dark:bg-[#C9A45C]" />
                        </span>
                        <m.span
                          animate={
                            prefersReducedMotion
                              ? undefined
                              : { opacity: [0.65, 1, 0.65] }
                          }
                          transition={{
                            duration: 2.6,
                            repeat: Infinity,
                            delay: slotIdx * 0.35,
                            ease: 'easeInOut',
                          }}
                          className="truncate text-[11.5px] font-medium tracking-wide text-[#545955] dark:text-[#A4B0A8]"
                        >
                          Expanding Across the UAE
                        </m.span>
                      </div>
                    </div>

                    {/* Right: Subtle Upcoming Clock Medallion */}
                    <div className="relative z-10 pr-3 sm:pr-4">
                      <div className="grid h-10 w-10 place-items-center rounded-full border border-[#C9A45C]/35 bg-white/40 text-[#C9A45C] backdrop-blur-md dark:border-[#C9A45C]/25 dark:bg-[#06110C]/55 dark:text-[#D2B475]">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </m.li>
            );
          })}
        </m.ol>
      </AnimatePresence>

      {/* Circular Liquid-Glass Bottom Navigation Arrows (Zero Heavy Text, Fixed Height) */}
      <div className="relative z-10 mt-4 flex min-h-[36px] items-center gap-3 pl-0 sm:pl-0">
        {hasPrevPage ? (
          <LiquidButton
            type="button"
            variant="glass"
            size="icon"
            onClick={onPrevPage}
            aria-label="Show previous 5 branches"
            className="group/prev h-9 w-9 border-[#C9A45C]/50 bg-white/60 text-[#0B3B28] dark:border-[#C9A45C]/40 dark:bg-[#0B1D15]/75 dark:text-[#D2B475]"
          >
            <ArrowUp
              className="h-4 w-4 transition-transform duration-300 group-hover/prev:-translate-y-0.5"
              aria-hidden="true"
            />
          </LiquidButton>
        ) : null}

        {hasNextPage ? (
          <LiquidButton
            type="button"
            variant="glass"
            size="icon"
            onClick={onNextPage}
            aria-label={`Show next ${nextCount} ${
              nextCount === 1 ? 'branch' : 'branches'
            } (${remainingAfterCount} remaining)`}
            className="group/next h-9 w-9 border-[#C9A45C]/55 bg-white/65 text-[#0B3B28] shadow-[0_10px_24px_-8px_rgba(11,59,40,0.28),0_0_14px_rgba(201,164,92,0.18)] dark:border-[#C9A45C]/45 dark:bg-[#0B2419]/80 dark:text-[#E6C98A]"
          >
            <ArrowDown
              className="h-4 w-4 transition-transform duration-300 group-hover/next:translate-y-0.5"
              aria-hidden="true"
            />
          </LiquidButton>
        ) : null}
      </div>
    </div>
  );
}
