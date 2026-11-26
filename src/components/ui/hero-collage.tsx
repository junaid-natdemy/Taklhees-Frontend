'use client';

import * as React from 'react';
import Image from 'next/image';
import { m, useReducedMotion } from 'motion/react';
import { Building2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  IMAGES - swap paths here only                                      */
/* ------------------------------------------------------------------ */
const IMG = {
  skyline: '/images/driftwall/skyline-sunset.webp',
  meeting: '/images/meeting-partners.jpg', // NEW - 3 people at a table
  signing: '/images/document-signing.jpg', // NEW - hand signing on clipboard
  training: '/images/classroom-training.webp',
  towers: '/images/driftwall/corporate-towers.webp',
  crane: '/images/driftwall/construction-crane.webp',
};

/* Outer card skew. The photo inside gets the inverse skew so it stays upright. */
const SKEW_X = -9;
const SKEW_Y = -5;

interface CollageCard {
  id: string;
  src: string;
  alt: string;
  /* all values are % of the stage */
  left: number;
  top: number;
  width: number;
  height: number;
  z: number;
  floatY: number;
  duration: number;
  delay: number;
  objectPosition?: string;
  priority?: boolean;
}

const CARDS: CollageCard[] = [
  { id: 'skyline', src: IMG.skyline, alt: 'Dubai skyline at sunset', left: 7.9, top: 13.7, width: 36.1, height: 30.6, z: 10, floatY: -6, duration: 7, delay: 0 },
  { id: 'meeting', src: IMG.meeting, alt: 'Business partners in a meeting', left: 45.6, top: 2.4, width: 33.6, height: 20.7, z: 10, floatY: -5, duration: 8, delay: 0.6 },
  { id: 'signing', src: IMG.signing, alt: 'Signing a certification document', left: 0.7, top: 50.1, width: 23.8, height: 24.4, z: 10, floatY: -5, duration: 9, delay: 1.1 },
  { id: 'training', src: IMG.training, alt: 'Takhlees safety training session', left: 19.4, top: 25.7, width: 60.6, height: 62.9, z: 20, floatY: -4, duration: 8, delay: 0.3, priority: true },
  { id: 'towers', src: IMG.towers, alt: 'Glass corporate towers', left: 79.9, top: 19.4, width: 17, height: 33.3, z: 10, floatY: -6, duration: 7.5, delay: 0.9 },
  { id: 'crane', src: IMG.crane, alt: 'Construction site with crane', left: 76, top: 56.3, width: 22.8, height: 24.6, z: 10, floatY: -5, duration: 8.5, delay: 0.4 },
];

/* ------------------------------------------------------------------ */
/*  Laurel branch (gold)                                               */
/* ------------------------------------------------------------------ */
const LEAVES: Array<[number, number, number]> = [
  // outer
  [3.7, 49.3, 55], [2, 38.4, 75], [2.6, 26.5, -80], [5.7, 14.6, -55], [11.5, 5.5, -30],
  // inner
  [10.7, 49.3, -55], [9, 38.4, -75], [9.6, 26.5, -80], [12.7, 14.6, -55], [18, 6, -35],
];

function Laurel({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 62"
      aria-hidden="true"
      className="h-[6.2cqw] w-auto shrink-0 text-[#E0B13A]"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M11 58 C3 46 3 20 15 4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {LEAVES.map(([cx, cy, r], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="4.2" ry="1.7" fill="currentColor" transform={`rotate(${r} ${cx} ${cy})`} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Single photo card                                                  */
/* ------------------------------------------------------------------ */
function PhotoCard({ card, reduced }: { card: CollageCard; reduced: boolean }) {
  return (
    <m.div
      className="absolute"
      style={{
        left: `${card.left}%`,
        top: `${card.top}%`,
        width: `${card.width}%`,
        height: `${card.height}%`,
        zIndex: card.z,
      }}
      animate={reduced ? undefined : { y: [0, card.floatY, 0] }}
      transition={{ duration: card.duration, delay: card.delay, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.03 }}
    >
      <div
        className="relative h-full w-full overflow-hidden border-[3px] border-white bg-neutral-200 shadow-[0_22px_40px_-14px_rgba(15,23,42,0.38)] dark:border-white/25 dark:bg-neutral-800"
        style={{
          borderRadius: 'clamp(14px, 4cqw, 28px)',
          transform: `skewX(${SKEW_X}deg) skewY(${SKEW_Y}deg)`,
          isolation: 'isolate',
        }}
      >
        <Image
          src={card.src}
          alt={card.alt}
          fill
          priority={card.priority}
          sizes="(min-width: 1024px) 420px, 70vw"
          className="object-cover"
          style={{
            objectPosition: card.objectPosition,
            transform: `skewY(${-SKEW_Y}deg) skewX(${-SKEW_X}deg) scale(1.22)`,
          }}
          draggable={false}
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20" />
      </div>
    </m.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Collage                                                            */
/* ------------------------------------------------------------------ */
export function HeroCollage() {
  const reduced = !!useReducedMotion();

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: '1010 / 630', containerType: 'inline-size' }}
    >
      {/* Green swoosh behind skyline card (top) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 160 70"
        className="pointer-events-none absolute z-0"
        style={{ left: '30.7%', top: '6.5%', width: '15.5%', height: '11%' }}
        fill="none"
      >
        <path d="M0 70 C40 20 110 0 160 5 C150 30 120 50 90 70 Z" fill="#0B5A30" />
      </svg>

      {/* Red crescent along the left edge of the training card */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 260"
        preserveAspectRatio="none"
        className="pointer-events-none absolute z-[15]"
        style={{ left: '13.4%', top: '48.4%', width: '11.4%', height: '46%' }}
        fill="none"
      >
        <defs>
          <linearGradient id="collageRed" x1="0" y1="260" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A31C1B" />
            <stop offset="1" stopColor="#E0242E" />
          </linearGradient>
        </defs>
        <path d="M100 10 C40 60 0 170 20 250 C40 262 70 258 95 245 C60 190 60 100 100 10 Z" fill="url(#collageRed)" />
      </svg>

      {CARDS.map((card) => (
        <PhotoCard key={card.id} card={card} reduced={reduced} />
      ))}

      {/* Trust badge */}
      <div
        className="absolute z-30"
        style={{ left: '34.7%', top: '84.1%', width: '53.5%', height: '15.1%' }}
      >
        <div
          className="flex h-full w-full items-center justify-center border border-emerald-400/30 bg-[#06281B]/95 text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-md"
          style={{ borderRadius: '2.6cqw', transform: 'skewX(-6deg)' }}
        >
          <div className="flex items-center gap-[2.2cqw]" style={{ transform: 'skewX(6deg)' }}>
            {/* Left: icon + text */}
            <div className="flex items-center gap-[1.6cqw]">
              <Building2
                strokeWidth={1.5}
                className="shrink-0 text-[#4ADE80]"
                style={{ width: '4.6cqw', height: '4.6cqw' }}
              />
              <div className="flex flex-col leading-tight">
                <span style={{ fontSize: 'clamp(10px, 2cqw, 15px)' }} className="font-medium text-emerald-50/90">
                  Empowering
                </span>
                <span style={{ fontSize: 'clamp(11px, 2.2cqw, 16px)' }} className="whitespace-nowrap font-bold">
                  Businesses in UAE
                </span>
              </div>
            </div>

            <span className="h-[5cqw] w-px bg-white/25" />

            {/* Right: laurel + 10+ */}
            <div className="flex items-center gap-[0.8cqw]">
              <Laurel />
              <div className="flex flex-col items-center leading-none">
                <span style={{ fontSize: 'clamp(16px, 3.4cqw, 26px)' }} className="font-extrabold">
                  10+
                </span>
                <span
                  style={{ fontSize: 'clamp(8px, 1.35cqw, 11px)' }}
                  className="mt-[0.5cqw] whitespace-nowrap font-medium text-emerald-50/80"
                >
                  Years of Excellence
                </span>
              </div>
              <Laurel flip />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCollage;
