'use client';

import Image from 'next/image';
import { Building2 } from 'lucide-react';
import { DriftWall, type DriftWallItem } from '@/components/ui/drift-wall';

/**
 * Supporting tiles only. The training room is deliberately excluded here so it
 * stays the dominant anchor of the composition instead of repeating.
 */
const AMBIENT_TILES: DriftWallItem[] = [
  { image: '/images/driftwall/skyline-sunset.webp', title: 'Dubai business district' },
  { image: '/images/driftwall/corporate-towers.webp', title: 'Corporate headquarters' },
  { image: '/images/driftwall/team-consultation.webp', title: 'Client consultation' },
  { image: '/images/driftwall/business-handshake.webp', title: 'Partnership agreement' },
  { image: '/images/driftwall/construction-crane.webp', title: 'Industrial development' },
  { image: '/images/driftwall/dubai-highway-night.webp', title: 'Dubai financial district' },
];

function Laurel({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 30"
      fill="none"
      className={`h-7 w-3.5 text-[#C9A227] ${flip ? '-scale-x-100' : ''}`}
    >
      <path
        d="M11.5 2C7 6.5 2.8 12.5 2.2 19c-.2 3.2 1.4 6.4 4.4 8.6-2.7-2.4-4-5.6-3.6-8.8C3.6 12.6 7 7 11.5 2Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="8.6" cy="8.4" r="1.35" fill="currentColor" opacity="0.65" />
      <circle cx="5.2" cy="14.6" r="1.35" fill="currentColor" opacity="0.65" />
      <circle cx="5.9" cy="21.4" r="1.25" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function HeroVisual() {
  return (
    <div className="relative z-0 w-full">
      <div className="relative mx-auto w-full max-w-[620px] lg:max-w-none lg:h-[624px]">
        {/* ============ 1. Ambient Drift Wall environment ============ */}
        <div className="motion-reveal motion-delay-2 relative h-[196px] overflow-hidden rounded-[22px] border border-ink/10 bg-forest shadow-[0_30px_60px_-40px_rgba(6,17,12,0.8)] sm:h-[264px] lg:absolute lg:right-0 lg:top-0 lg:h-[456px] lg:w-[89%] lg:rounded-[34px] dark:border-white/10">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(140deg,#0C2418_0%,#081811_55%,#04100B_100%)]"
          />

          <div
            className="absolute inset-0"
            style={{
              maskImage:
                'radial-gradient(ellipse 74% 78% at 56% 50%, #000 40%, rgba(0,0,0,0.55) 72%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 74% 78% at 56% 50%, #000 40%, rgba(0,0,0,0.55) 72%, transparent 100%)',
            }}
          >
            <DriftWall
              items={AMBIENT_TILES}
              columns={3}
              columnWidths={[148, 194, 148]}
              columnHeights={[134, 168, 134]}
              gap={14}
              radius={16}
              tilt={13}
              turn={-15}
              perspective={1180}
              depth={70}
              speed={19}
              variance={0.3}
              parallax={0.4}
              pauseOnHover
              lift={30}
              fade={0}
              dim={0.88}
              decorative
              className="h-full w-full"
            />
          </div>

          {/* Scrims: dissolve the wall into the page instead of hard-clipping it */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[46%] bg-gradient-to-r from-ivory via-ivory/45 to-transparent dark:from-[#06110C] dark:via-[#06110C]/45"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ivory/85 via-ivory/20 to-transparent dark:from-[#06110C]/85 dark:via-[#06110C]/20"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/25 lg:rounded-[34px] dark:ring-white/10"
          />
        </div>

        {/* ============ 2. Floating supporting plate (back layer) ============ */}
        <figure className="motion-settle motion-delay-3 pointer-events-none absolute left-[2%] top-[14px] z-10 hidden w-[29%] -rotate-[6deg] lg:block">
          <div className="rounded-[16px] bg-white p-[5px] shadow-[0_28px_50px_-30px_rgba(6,17,12,0.75)] ring-1 ring-ink/10 dark:bg-[#0E2117] dark:ring-white/10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[11px] bg-forest">
              <Image
                src="/images/skyline-sunset.jpg"
                alt="Dubai business district skyline at sunset"
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </div>
        </figure>

        {/* ============ 3. Dominant anchor: Takhlees training room ============ */}
        <div className="motion-settle motion-delay-4 relative z-20 -mt-[58px] px-2 sm:-mt-[84px] sm:px-6 lg:absolute lg:bottom-[72px] lg:left-0 lg:mt-0 lg:w-[70%] lg:px-0">
          <div className="group relative rounded-[22px] bg-white p-[6px] shadow-[0_46px_80px_-46px_rgba(6,17,12,0.75)] ring-1 ring-ink/10 transition-transform duration-500 ease-out hover:-translate-y-1 lg:-rotate-[1.4deg] lg:rounded-[26px] lg:p-2 dark:bg-[#0E2117] dark:ring-white/12">
            <div className="relative aspect-[7/5] overflow-hidden rounded-[16px] bg-forest lg:rounded-[19px]">
              <Image
                src="/images/classroom-training.webp"
                alt="Takhlees training room: safety-certified candidates in a corporate certification session"
                fill
                priority
                sizes="(max-width: 1023px) 92vw, 42vw"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#04110B]/40 via-transparent to-transparent"
              />
              {/* Brand corner facet, drawn from the logo's triangular geometry */}
              <svg
                aria-hidden="true"
                viewBox="0 0 64 64"
                className="pointer-events-none absolute left-0 top-0 h-12 w-12 lg:h-14 lg:w-14"
              >
                <path d="M0 0H46L0 46Z" fill="#0B4A29" />
                <path d="M0 38 38 0H46L0 46Z" fill="#A31C1B" />
              </svg>
            </div>
          </div>
        </div>

        {/* ============ 4. Integrated achievement plate ============ */}
        <div className="motion-rise motion-delay-5 relative z-30 mx-auto -mt-5 w-[95%] lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[64%] sm:-mt-7">
          <div className="relative flex items-center gap-3 overflow-hidden rounded-[16px] border border-white/10 bg-[#07271B] px-3.5 py-3 shadow-[0_30px_60px_-34px_rgba(4,17,11,0.95)] sm:gap-4 sm:px-4 lg:rounded-[18px] lg:py-3.5">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2EB04B]/80 to-transparent"
            />

            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2EB04B]/30 bg-[#2EB04B]/10 text-[#5FD67C] sm:h-9 sm:w-9">
                <Building2 className="h-4 w-4" />
              </span>
              <span className="text-[11.5px] font-semibold leading-[1.25] text-white/85 sm:text-[12.5px]">
                Empowering
                <br />
                Businesses in UAE
              </span>
            </div>

            <span aria-hidden="true" className="ml-auto h-9 w-px bg-white/10" />

            <div className="flex shrink-0 items-center gap-1.5">
              <span className="hidden sm:block">
                <Laurel />
              </span>
              <div className="text-center">
                <span className="block text-[16px] font-extrabold leading-none text-white sm:text-[18px]">
                  10+
                </span>
                <span className="mt-1 block whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.1em] text-white/55 sm:text-[9.5px]">
                  Years of Excellence
                </span>
              </div>
              <span className="hidden sm:block">
                <Laurel flip />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
