'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUp, Clock, Mail, Phone, Plus } from 'lucide-react';
import { m, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import {
  formatBranchSequence,
  type BranchItem,
} from '@/features/branches/branches-data';

interface BranchCardGalleryProps {
  branches: readonly BranchItem[];
  selectedBranchId: string;
  onSelectBranch: (id: string) => void;
  onShowLess: () => void;
  comingSoonSlots?: number;
}

interface GalleryVisualPanelProps {
  branch: BranchItem;
  seq: string;
  isActive: boolean;
  sizes: string;
}

/**
 * Renders either the branch's genuine architectural photograph or an intentional
 * champagne-ivory architectural panel featuring editorial typography and
 * a subtle Takhlees emblem motif (never a generic repeated logo box).
 */
function GalleryVisualPanel({
  branch,
  seq,
  isActive,
  sizes,
}: GalleryVisualPanelProps) {
  if (branch.image) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#E9E4D8] dark:bg-[#0B2017]">
        <Image
          src={branch.image}
          alt={`Takhlees ${branch.name} branch architectural view`}
          fill
          loading="lazy"
          unoptimized
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover/branch:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col justify-between overflow-hidden p-4 sm:p-4.5',
        isActive
          ? 'bg-gradient-to-br from-[#0A4D33] via-[#073825] to-[#05271A]'
          : 'bg-gradient-to-br from-[#F5EFE2] via-[#ECE3CF] to-[#DFD3BA] dark:from-[#0E291E] dark:via-[#081C14] dark:to-[#05120C]'
      )}
    >
      {/* Golden-Hour Diagonal Architectural Light Shaft */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0',
          isActive
            ? 'bg-[linear-gradient(126deg,rgba(24,168,106,0.22)_0%,transparent_48%,rgba(201,164,92,0.12)_100%)]'
            : 'bg-[linear-gradient(126deg,rgba(255,252,245,0.68)_0%,transparent_50%,rgba(201,164,92,0.16)_100%)] dark:bg-[linear-gradient(126deg,rgba(201,164,92,0.16)_0%,transparent_52%,rgba(0,0,0,0.35)_100%)]'
        )}
      />

      {/* Architectural Arch & Hairline Framing */}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 200"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
      >
        <path
          d="M 48 200 L 48 92 C 48 44, 102 18, 160 18 C 218 18, 272 44, 272 92 L 272 200"
          fill="none"
          stroke={isActive ? '#E6C98A' : '#B8944C'}
          strokeOpacity={isActive ? '0.28' : '0.32'}
          strokeWidth="1"
        />
        <circle
          cx="256"
          cy="52"
          r="44"
          fill="none"
          stroke={isActive ? '#E6C98A' : '#146736'}
          strokeOpacity={isActive ? '0.18' : '0.16'}
          strokeWidth="0.9"
        />
      </svg>

      {/* Top Row: Subtle Takhlees Motif Crest */}
      <div className="relative z-10 flex items-start justify-end">
        <Image
          src="/icons/takhlees-emblem.png"
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
          className={cn(
            'h-6 w-6 object-contain transition-opacity duration-300',
            isActive
              ? 'opacity-45 brightness-150'
              : 'opacity-25 dark:opacity-35'
          )}
        />
      </div>

      {/* Bottom Row: Editorial Architectural Plaque (No Duplicate Branch Name) */}
      <div className="relative z-10 mt-auto pb-2">
        <span
          className={cn(
            'block font-mono text-[10px] font-semibold uppercase tracking-[0.22em]',
            isActive
              ? 'text-[#E6C98A]/85'
              : 'text-[#8C6D32] dark:text-[#C9A45C]/80'
          )}
        >
          {seq} · UAE
        </span>
        <p
          className={cn(
            'mt-0.5 font-serif text-[14.5px] italic leading-tight tracking-tight sm:text-[15.5px]',
            isActive
              ? 'text-[#FAF9F5]/90'
              : 'text-[#0B3B28]/80 dark:text-[#F4F0E8]/85'
          )}
        >
          Takhlees Architectural Center
        </p>
      </div>
    </div>
  );
}

export function BranchCardGallery({
  branches,
  selectedBranchId,
  onSelectBranch,
  onShowLess,
  comingSoonSlots = 0,
}: BranchCardGalleryProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div>
      {/* Shared SVG ClipPath for Sculpted Architectural Card Transitions */}
      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <defs>
          <clipPath id="galleryCardPhotoClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.84 C 0.76,0.98 0.56,0.80 0.30,0.94 C 0.14,1.02 0.04,0.92 0,0.86 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Expanded Gallery Subheader & Show Less Control */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#C9A45C]/30 pb-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#087B4B] dark:bg-[#C9A45C]"
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#063D2B] dark:text-[#E6C98A]">
            ARCHITECTURAL BRANCH EXHIBITION ({branches.length})
          </span>
        </div>

        <LiquidButton
          type="button"
          variant="glass"
          size="sm"
          onClick={onShowLess}
          className="h-8 gap-1.5 rounded-full border-[#C9A45C]/50 bg-white/55 px-3.5 text-[11.5px] font-semibold text-[#063D2B] backdrop-blur-xl dark:border-[#C9A45C]/35 dark:bg-[#0B1D15]/75 dark:text-[#F4F0E8]"
        >
          <span>Show Less</span>
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </LiquidButton>
      </div>

      {/* Uniform-Size Architectural Exhibition Grid (1 / 2 / 3 / 4 equal columns) */}
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {branches.map((branch, idx) => {
          const isActive = branch.id === selectedBranchId;
          const seq = formatBranchSequence(branch.sequenceNumber);

          const cardGlassClasses = cn(
            'group/branch relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[20px] border backdrop-blur-xl backdrop-saturate-150 transition-all duration-300',
            isActive
              ? 'border-[#E6C98A]/85 bg-gradient-to-br from-[#063D2B]/95 via-[#087B4B]/90 to-[#063D2B]/95 text-[#FAF9F5] shadow-[0_22px_44px_-14px_rgba(8,123,75,0.52),0_0_24px_-4px_rgba(24,168,106,0.22),inset_0_1.5px_1px_rgba(255,255,255,0.38)] dark:border-[#E6C98A]/75 dark:from-[#063D2B]/95 dark:via-[#087B4B]/90 dark:to-[#052E20]/95'
              : 'border-[#C9A45C]/40 bg-gradient-to-br from-white/55 via-[#FAF9F5]/40 to-[#C9A45C]/[0.08] text-[#0B3B28] shadow-[0_14px_32px_-16px_rgba(11,59,40,0.16),inset_0_1.5px_1px_rgba(255,255,255,0.92)] hover:-translate-y-0.5 hover:border-[#C9A45C]/75 hover:from-white/70 dark:border-white/[0.14] dark:from-white/[0.06] dark:via-[#091D14]/55 dark:to-[#C9A45C]/[0.05] dark:text-[#F4F0E8] dark:shadow-[0_16px_34px_-14px_rgba(0,0,0,0.68),inset_0_1.5px_1px_rgba(255,255,255,0.18)] dark:hover:border-[#C9A45C]/50'
          );

          return (
            <m.li
              key={branch.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.3,
                      delay: Math.min(idx, 8) * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              onClick={() => onSelectBranch(branch.id)}
              className={cardGlassClasses}
            >
              {/* Internal Emerald Illumination (Selected) */}
              {isActive ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_50%_72%,rgba(24,168,106,0.36)_0%,rgba(8,123,75,0.14)_52%,transparent_80%)]"
                />
              ) : null}

              {/* Subtle Champagne Edge Reflection Sweep on Hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(230,201,138,0.16)_50%,transparent_70%)] transition-transform duration-700 ease-out group-hover/branch:translate-x-full"
              />

              {/* Top: Sculpted Arched-Wave Visual Panel */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <div
                  style={{ clipPath: 'url(#galleryCardPhotoClip)' }}
                  className="relative h-full w-full overflow-hidden"
                >
                  <GalleryVisualPanel
                    branch={branch}
                    seq={seq}
                    isActive={isActive}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                >
                  <path
                    d="M 0,86 C 4,92 14,102 30,94 C 56,80 76,98 100,84"
                    fill="none"
                    stroke={isActive ? '#E6C98A' : '#C9A45C'}
                    strokeOpacity={isActive ? '0.68' : '0.48'}
                    strokeWidth="1.25"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Glass Index Medallion */}
                <span
                  className={cn(
                    'absolute left-3.5 top-3.5 z-10 grid h-8 w-8 place-items-center rounded-full border font-mono text-[11px] font-semibold backdrop-blur-xl',
                    isActive
                      ? 'border-[#E6C98A] bg-[#063D2B]/90 text-[#FAF9F5] shadow-[0_6px_14px_rgba(8,123,75,0.4)]'
                      : 'border-[#C9A45C]/55 bg-[#FAF9F5]/85 text-[#063D2B] dark:bg-[#06110C]/85 dark:text-[#E6C98A]'
                  )}
                >
                  {seq}
                </span>
              </div>

              {/* Card Body */}
              <div className="relative z-10 flex flex-1 flex-col justify-between px-4 pb-3.5 pt-2">
                <div>
                  <h3
                    className={cn(
                      'font-serif text-[17.5px] font-semibold leading-snug',
                      isActive
                        ? 'text-[#FAF9F5]'
                        : 'text-[#063D2B] dark:text-[#F4F0E8]'
                    )}
                  >
                    {branch.name}
                  </h3>

                  {branch.phone || branch.email ? (
                    <div className="mt-2 flex flex-col gap-1">
                      {branch.phone ? (
                        <a
                          href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            'inline-flex items-center gap-1.5 text-[12px] font-medium underline-offset-2 hover:underline',
                            isActive
                              ? 'text-[#FAF9F5]'
                              : 'text-[#0B3B28] dark:text-[#D2B475]'
                          )}
                        >
                          <Phone className="h-3 w-3 shrink-0" aria-hidden="true" />
                          <span>{branch.phone}</span>
                        </a>
                      ) : null}

                      {branch.email ? (
                        <a
                          href={`mailto:${branch.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            'inline-flex items-center gap-1.5 text-[12px] font-medium underline-offset-2 hover:underline',
                            isActive
                              ? 'text-[#D8E5DD]'
                              : 'text-[#545955] dark:text-[#A4B0A8]'
                          )}
                        >
                          <Mail className="h-3 w-3 shrink-0" aria-hidden="true" />
                          <span>{branch.email}</span>
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                {/* Card Footer Link */}
                <div className="mt-2.5 flex items-center justify-between border-t border-current/12 pt-2.5">
                  <span
                    className={cn(
                      'text-[10px] font-semibold uppercase tracking-[0.14em]',
                      isActive
                        ? 'text-[#E6C98A]'
                        : 'text-[#087B4B] dark:text-[#C9A45C]'
                    )}
                  >
                    Branch Details
                  </span>
                  <Link
                    href={branch.href}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View details for ${branch.name}`}
                    className={cn(
                      'grid h-7 w-7 place-items-center rounded-full border backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A86A]',
                      isActive
                        ? 'border-[#E6C98A]/75 bg-white/15 text-[#FAF9F5] hover:bg-[#C9A45C] hover:text-[#050B08]'
                        : 'border-[#C9A45C]/45 bg-[#FAF9F5]/90 text-[#063D2B] hover:border-[#087B4B] hover:bg-[#087B4B] hover:text-[#FAF9F5] dark:bg-[#06110C]/85 dark:text-[#E6C98A] dark:hover:border-[#C9A45C] dark:hover:bg-[#C9A45C] dark:hover:text-[#050B08]'
                    )}
                  >
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/branch:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </m.li>
          );
        })}

        {/* Uniform Coming-Soon Cards to Balance the Final Row */}
        {Array.from({ length: Math.max(0, comingSoonSlots) }, (_, slotIdx) => {
          const globalIdx = branches.length + slotIdx;

          return (
            <m.li
              key={`gallery-coming-soon-${slotIdx}`}
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.3,
                      delay: Math.min(globalIdx, 10) * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-dashed border-[#C9A45C]/45 bg-gradient-to-br from-white/35 via-[#FAF9F5]/25 to-[#C9A45C]/[0.06] backdrop-blur-xl backdrop-saturate-150 dark:border-[#C9A45C]/30 dark:from-white/[0.04] dark:via-[#091D14]/40 dark:to-[#C9A45C]/[0.04]"
            >
              {/* Top: Matching Arched-Wave Champagne Panel */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <div
                  style={{ clipPath: 'url(#galleryCardPhotoClip)' }}
                  className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#F5EFE2] via-[#ECE3CF] to-[#DFD3BA] p-4 dark:from-[#0E291E] dark:via-[#081C14] dark:to-[#05120C]"
                >
                  <div className="flex items-start justify-end">
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-[#C9A45C]/45 bg-[#FAF9F5]/75 text-[#C9A45C] dark:border-[#C9A45C]/30 dark:bg-[#06110C]/75 dark:text-[#D2B475]">
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-auto pb-1.5">
                    <span className="block font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#8C6D32] dark:text-[#C9A45C]/80">
                      UAE · Upcoming
                    </span>
                    <p className="mt-0.5 font-serif text-[14.5px] italic leading-tight text-[#0B3B28]/75 dark:text-[#F4F0E8]/80">
                      Takhlees Expansion
                    </p>
                  </div>
                </div>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                >
                  <path
                    d="M 0,86 C 4,92 14,102 30,94 C 56,80 76,98 100,84"
                    fill="none"
                    stroke="#C9A45C"
                    strokeOpacity="0.4"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              {/* Card Body with Animated Coming Soon Text */}
              <div className="relative z-10 flex flex-1 flex-col justify-between px-4 pb-3.5 pt-2">
                <div>
                  <m.h3
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { opacity: [0.72, 1, 0.72], x: [0, 2, 0] }
                    }
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      delay: slotIdx * 0.4,
                      ease: 'easeInOut',
                    }}
                    className="font-serif text-[17px] font-semibold leading-snug text-[#087B4B] dark:text-[#E6C98A]"
                  >
                    New Branches Coming Soon
                  </m.h3>
                </div>

                <div className="mt-2.5 flex items-center justify-between border-t border-[#C9A45C]/20 pt-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2 shrink-0">
                      {!prefersReducedMotion ? (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#18A86A] opacity-65" />
                      ) : null}
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#18A86A] dark:bg-[#C9A45C]" />
                    </span>
                    <span className="text-[10.5px] font-medium text-[#545955] dark:text-[#A4B0A8]">
                      Expanding Across UAE
                    </span>
                  </div>
                  <div className="grid h-7 w-7 place-items-center rounded-full border border-[#C9A45C]/35 bg-white/45 text-[#C9A45C] dark:border-[#C9A45C]/25 dark:bg-[#06110C]/60 dark:text-[#D2B475]">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </m.li>
          );
        })}
      </ol>

      {/* Bottom Show Less Action for Convenience */}
      <div className="mt-6 flex justify-center">
        <LiquidButton
          type="button"
          variant="glass"
          size="md"
          onClick={onShowLess}
          className="h-9 gap-2 rounded-full border-[#C9A45C]/50 bg-white/60 px-5 text-[12.5px] font-semibold text-[#063D2B] backdrop-blur-xl dark:border-[#C9A45C]/35 dark:bg-[#0B1D15]/80 dark:text-[#F4F0E8]"
        >
          <span>Show Less</span>
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </LiquidButton>
      </div>
    </div>
  );
}
