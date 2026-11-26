'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Building2,
  Users,
  Handshake,
  FileBadge2,
  Smile,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedCounter } from './animated-counter';
import type { ImpactMetric, ImpactMetricId } from './impact-data';

const METRIC_ICONS: Record<ImpactMetricId, LucideIcon> = {
  branches: Building2,
  staff: Users,
  collaborations: Handshake,
  visas: FileBadge2,
  customers: Smile,
};

export type OrbitalSlot = -2 | -1 | 0 | 1 | 2;

const SLOT_TRANSFORM_CLASSES: Record<OrbitalSlot, string> = {
  [-2]:
    'z-10 opacity-92 [transform:perspective(1200px)_translate3d(-322px,26px,0)_scale(0.81)_rotateY(20deg)] xl:[transform:perspective(1200px)_translate3d(-418px,26px,0)_scale(0.83)_rotateY(20deg)] hover:opacity-100',
  [-1]:
    'z-30 opacity-96 [transform:perspective(1200px)_translate3d(-172px,11px,0)_scale(0.9)_rotateY(13deg)] xl:[transform:perspective(1200px)_translate3d(-222px,11px,0)_scale(0.92)_rotateY(13deg)] hover:opacity-100',
  [0]:
    'z-40 opacity-100 [transform:perspective(1200px)_translate3d(0,-14px,0)_scale(1.06)_rotateY(0deg)]',
  [1]:
    'z-30 opacity-96 [transform:perspective(1200px)_translate3d(172px,11px,0)_scale(0.9)_rotateY(-13deg)] xl:[transform:perspective(1200px)_translate3d(222px,11px,0)_scale(0.92)_rotateY(-13deg)] hover:opacity-100',
  [2]:
    'z-10 opacity-92 [transform:perspective(1200px)_translate3d(322px,26px,0)_scale(0.81)_rotateY(-20deg)] xl:[transform:perspective(1200px)_translate3d(418px,26px,0)_scale(0.83)_rotateY(-20deg)] hover:opacity-100',
};

const TABLET_SLOT_CLASSES: Record<OrbitalSlot, string> = {
  [-2]:
    'z-0 pointer-events-none opacity-0 [transform:perspective(1100px)_translate3d(-260px,24px,0)_scale(0.76)_rotateY(22deg)]',
  [-1]:
    'z-20 opacity-96 [transform:perspective(1100px)_translate3d(-182px,12px,0)_scale(0.89)_rotateY(14deg)]',
  [0]:
    'z-40 opacity-100 [transform:perspective(1100px)_translate3d(0,-10px,0)_scale(1.04)_rotateY(0deg)]',
  [1]:
    'z-20 opacity-96 [transform:perspective(1100px)_translate3d(182px,12px,0)_scale(0.89)_rotateY(-14deg)]',
  [2]:
    'z-0 pointer-events-none opacity-0 [transform:perspective(1100px)_translate3d(260px,24px,0)_scale(0.76)_rotateY(-22deg)]',
};

interface ImpactStatCardProps {
  metric: ImpactMetric;
  slot?: OrbitalSlot;
  variant?: 'desktop' | 'tablet' | 'mobile';
  isActive: boolean;
  onSelect: () => void;
  delayMs?: number;
}

/**
 * ImpactStatCard — Architectural glass card featuring full-depth blended photography,
 * directional top readability gradients, tabular numeric count-up, and elevated emerald showcase active state.
 */
export const ImpactStatCard = React.memo(function ImpactStatCard({
  metric,
  slot = 0,
  variant = 'desktop',
  isActive,
  onSelect,
  delayMs = 0,
}: ImpactStatCardProps) {
  const Icon = METRIC_ICONS[metric.id];

  const slotClasses =
    variant === 'desktop'
      ? SLOT_TRANSFORM_CLASSES[slot]
      : variant === 'tablet'
        ? TABLET_SLOT_CLASSES[slot]
        : '';

  const isPositionedCard = variant === 'desktop' || variant === 'tablet';

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      aria-label={`${metric.value}${metric.suffix} ${metric.label} — ${metric.description}`}
      className={cn(
        'group cursor-pointer text-center select-none touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#146736] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F6F1] dark:focus-visible:ring-[#00A85A] dark:focus-visible:ring-offset-[#050807]',
        isPositionedCard
          ? 'absolute left-1/2 top-0 -ml-[102px] w-[204px] h-[306px] xl:-ml-[116px] xl:w-[232px] xl:h-[332px] rounded-[26px] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
          : 'relative w-full min-h-[296px] rounded-[24px] transition-[transform,box-shadow,border-color] duration-300',
        slotClasses
      )}
    >
      <div
        className={cn(
          'relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-[inherit] px-4 pt-5 pb-3 transition-[background-color,border-color,box-shadow,transform] duration-300 group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0',
          isActive
            ? 'bg-[#073D20] text-white border border-[#2EB04B]/50 shadow-[0_26px_54px_-12px_rgba(11,90,49,0.48),0_0_24px_-4px_rgba(201,151,38,0.24),inset_0_1px_0_rgba(255,255,255,0.38)] dark:bg-gradient-to-b dark:from-[#075B35] dark:via-[#063E24] dark:to-[#041D11] dark:text-[#F5F5F2] dark:border-[#00A85A]/75 dark:shadow-[0_28px_60px_-14px_rgba(0,0,0,0.95),0_0_38px_-6px_rgba(0,168,90,0.45),inset_0_1px_0_rgba(0,168,90,0.28)]'
            : 'bg-white/95 backdrop-blur-md text-[#171717] border border-black/[0.08] shadow-[0_18px_38px_-16px_rgba(15,23,18,0.16),inset_0_1px_0_rgba(255,255,255,0.95)] group-hover:border-[#146736]/38 group-hover:shadow-[0_22px_44px_-14px_rgba(20,103,54,0.24)] dark:bg-[#09100C]/82 dark:backdrop-blur-xl dark:text-[#F5F5F2] dark:border-[#00A85A]/28 dark:shadow-[0_22px_48px_-14px_rgba(0,0,0,0.95),0_0_24px_-8px_rgba(0,168,90,0.20),inset_0_1px_0_rgba(0,168,90,0.14)] dark:group-hover:border-[#00A85A]/65 dark:group-hover:shadow-[0_24px_52px_-12px_rgba(0,0,0,0.96),0_0_32px_-4px_rgba(0,168,90,0.38)]'
        )}
      >
        {/* 1. Full-Depth Photographic Layer */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden',
            isActive ? 'top-0' : 'top-[32%]'
          )}
        >
          <Image
            src={metric.image}
            alt={metric.imageAlt}
            fill
            loading="eager"
            sizes="(max-width: 767px) 92vw, 250px"
            style={{ objectPosition: metric.objectPosition }}
            className={cn(
              'object-cover transition-transform duration-500 will-change-transform',
              isActive
                ? 'scale-[1.03] opacity-75 saturate-[1.05] group-hover:scale-[1.07]'
                : 'opacity-85 saturate-[0.95] group-hover:scale-[1.05] dark:opacity-75'
            )}
          />
        </div>

        {/* 2. Layered Photographic Readability Scrims & Specular Atmospheric Depth */}
        {isActive ? (
          <>
            {/* Emerald Featured Rich Gradient Veil: Crisp contrast behind headline, open photographic glow in lower third */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(12,102,54,0.96)_0%,rgba(8,72,38,0.88)_44%,rgba(6,49,25,0.48)_74%,rgba(4,28,14,0.84)_100%)] dark:bg-[linear-gradient(180deg,rgba(13,68,40,0.96)_0%,rgba(8,40,24,0.90)_46%,rgba(5,26,15,0.52)_74%,rgba(3,16,9,0.88)_100%)]"
            />
            {/* Warm Golden Rim & Top Glass Spotlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(85%_42%_at_50%_0%,rgba(46,176,75,0.28)_0%,transparent_70%),radial-gradient(75%_35%_at_50%_100%,rgba(224,177,58,0.22)_0%,transparent_75%)]"
            />
          </>
        ) : (
          <>
            {/* Light Mode Photographic Fade Scrim */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.97)_42%,rgba(255,255,255,0.68)_63%,rgba(255,255,255,0.08)_88%,rgba(12,24,16,0.28)_100%)] dark:hidden"
            />
            {/* Dark Mode Obsidian Photographic Fade Scrim */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 hidden bg-[linear-gradient(180deg,rgba(17,19,19,0.99)_0%,rgba(17,19,19,0.96)_42%,rgba(17,19,19,0.68)_64%,rgba(10,12,12,0.18)_88%,rgba(0,0,0,0.62)_100%)] dark:block"
            />
          </>
        )}

        {/* 3. Specular Top Edge Rim Lighting */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-6 top-0 z-20 h-[1.5px] rounded-full',
            isActive
              ? 'bg-gradient-to-r from-transparent via-[#E0B13A]/90 to-transparent'
              : 'bg-gradient-to-r from-transparent via-[#146736]/35 to-transparent dark:via-[#2EB04B]/45'
          )}
        />

        {/* 4. Upper Metrics Stack (Preserves crisp AA/AAA typography legibility over image blend) */}
        <div className="relative z-20 flex w-full flex-col items-center">
          <div
            className={cn(
              'mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
              isActive
                ? 'bg-white/16 text-white ring-1 ring-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)]'
                : metric.accentHue === 'crimson'
                  ? 'bg-[#C2242B]/10 text-[#C2242B] ring-1 ring-[#C2242B]/20 dark:bg-[#A31C1B]/20 dark:text-[#F87171] dark:ring-[#A31C1B]/35'
                  : 'bg-[#146736]/10 text-[#146736] ring-1 ring-[#146736]/20 dark:bg-[#2EB04B]/15 dark:text-[#2EB04B] dark:ring-[#2EB04B]/30'
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
          </div>

          <div
            className={cn(
              'font-sans font-extrabold tracking-tight leading-none',
              isActive
                ? 'text-[34px] xl:text-[38px] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]'
                : 'text-[28px] xl:text-[32px] text-[#171717] dark:text-[#F5F5F2]'
            )}
          >
            <AnimatedCounter
              target={metric.value}
              suffix={metric.suffix}
              delayMs={delayMs}
            />
          </div>

          <h3
            className={cn(
              'mt-1.5 text-[13px] xl:text-[13.5px] font-bold leading-snug text-balance px-1',
              isActive
                ? 'text-emerald-50'
                : 'text-neutral-900 dark:text-neutral-100'
            )}
          >
            {metric.label}
          </h3>

          <span
            aria-hidden="true"
            className={cn(
              'my-2 h-[1.5px] w-8 rounded-full',
              isActive
                ? 'bg-gradient-to-r from-transparent via-[#E0B13A] to-transparent'
                : metric.accentHue === 'crimson'
                  ? 'bg-[#C2242B]/45 dark:bg-[#E0353D]/50'
                  : 'bg-[#146736]/35 dark:bg-[#2EB04B]/40'
            )}
          />

          <p
            className={cn(
              'text-[11.5px] leading-snug px-1.5 line-clamp-2',
              isActive
                ? 'text-emerald-50/95 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]'
                : 'text-neutral-700 dark:text-[#C4C9C6]'
            )}
          >
            {metric.description}
          </p>
        </div>

        {/* 5. Bottom Interactive Tag & UAE Horizon Accent */}
        <div className="relative z-20 flex w-full items-center justify-center pt-2">
          {isActive ? (
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/25 px-2.5 py-0.5 backdrop-blur-md whitespace-nowrap text-[9.5px] xl:text-[10px] font-semibold tracking-wider text-amber-200 uppercase"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E0B13A]" />
              {metric.highlightTag}
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-0.5 text-[8.5px] xl:text-[9px] font-semibold tracking-wider text-neutral-800 backdrop-blur-md shadow-sm dark:bg-black/65 dark:text-neutral-200 uppercase whitespace-nowrap"
            >
              {metric.highlightTag}
            </span>
          )}
        </div>

        {/* Bottom UAE Tricolor Specular Hairline */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[2.5px]',
            isActive
              ? 'bg-gradient-to-r from-[#146736] via-[#E0B13A] to-[#C2242B]'
              : 'bg-gradient-to-r from-transparent via-[#146736]/45 to-[#C2242B]/45'
          )}
        />
      </div>
    </button>
  );
});

export default ImpactStatCard;
