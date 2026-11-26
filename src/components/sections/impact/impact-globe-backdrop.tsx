'use client';

import * as React from 'react';
import { m, useReducedMotion } from 'motion/react';
import { ThemeImage } from '@/components/ui/theme-image';

interface OrbitalNode {
  id: string;
  cx: number;
  cy: number;
  r: number;
  tone: 'emerald' | 'crimson' | 'gold';
  delay: number;
}

const OUTER_RING_NODES: OrbitalNode[] = [
  { id: 'node-ul', cx: 191.6, cy: 280.7, r: 3.2, tone: 'emerald', delay: 0.2 },
  { id: 'node-ur', cx: 1009.6, cy: 237.0, r: 3.6, tone: 'emerald', delay: 1.4 },
  { id: 'node-mr', cx: 1116.1, cy: 408.1, r: 2.8, tone: 'emerald', delay: 2.1 },
];

const MID_RING_NODES: OrbitalNode[] = [
  { id: 'node-ml', cx: 70.9, cy: 370.2, r: 2.8, tone: 'gold', delay: 0.9 },
];

const LOWER_ARC_NODES: OrbitalNode[] = [
  { id: 'node-bl', cx: 219.5, cy: 581.0, r: 3.2, tone: 'emerald', delay: 1.7 },
  { id: 'node-br', cx: 997.2, cy: 558.0, r: 3.4, tone: 'crimson', delay: 0.6 },
];

const NODE_FILL_CLASSES: Record<OrbitalNode['tone'], string> = {
  emerald: 'fill-[#1FA05E]/75 dark:fill-[#4ADE80]',
  crimson: 'fill-[#D92332]/75 dark:fill-[#FF4D5A]',
  gold: 'fill-[#C99726]/75 dark:fill-[#E0B13A]',
};

const NODE_HALO_CLASSES: Record<OrbitalNode['tone'], string> = {
  emerald: 'fill-[#1FA05E]/18 dark:fill-[#00A85A]/34',
  crimson: 'fill-[#D92332]/18 dark:fill-[#D92332]/34',
  gold: 'fill-[#C99726]/18 dark:fill-[#E0B13A]/30',
};

function renderOrbitalNodes(nodes: OrbitalNode[], shouldAnimate: boolean) {
  return nodes.map((node) => (
    <m.g
      key={node.id}
      filter="url(#nodeGlow)"
      animate={
        shouldAnimate
          ? {
              opacity: [0.55, 1, 0.55],
              scale: [0.92, 1.15, 0.92],
            }
          : undefined
      }
      transition={{
        duration: 3.8 + node.delay * 0.4,
        delay: node.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
    >
      <circle cx={node.cx} cy={node.cy} r={node.r * 2.5} className={NODE_HALO_CLASSES[node.tone]} />
      <circle cx={node.cx} cy={node.cy} r={node.r} className={NODE_FILL_CLASSES[node.tone]} />
      <circle cx={node.cx} cy={node.cy} r={node.r * 0.52} className="fill-white" />
    </m.g>
  ));
}

/**
 * ImpactGlobeBackdrop — Dual-calibrated Light Mode & Blackout Dark Mode background visualization:
 * 1. Clean warm off-white (#F7F6F1) or deep charcoal black (#050807) foundation with central radial lighting.
 * 2. Prominent centered 3D dotted world globe positioned behind & slightly above the cards down through the bottom pills.
 * 3. Multiple intersecting elliptical orbital rings in emerald green & UAE crimson red with synchronized glowing star nodes.
 */
export const ImpactGlobeBackdrop = React.memo(function ImpactGlobeBackdrop() {
  const prefersReduced = !!useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '150px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shouldAnimate = !prefersReduced && inView;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* LAYER 1: Calibrated Light & Blackout Dark Radial Depth (zero-blur gradients) */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[720px] w-[min(1260px,100vw)] -translate-x-1/2 rounded-full dark:hidden"
        style={{
          background: [
            'radial-gradient(ellipse 62% 54% at 50% 48%, rgba(255,255,255,0.88) 0%, rgba(20,103,54,0.06) 52%, rgba(247,246,241,0) 80%)',
            'radial-gradient(ellipse 40% 34% at 50% 60%, rgba(0,168,90,0.06) 0%, transparent 72%)',
          ].join(', '),
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 hidden h-[720px] w-[min(1260px,100vw)] -translate-x-1/2 rounded-full dark:block"
        style={{
          background: [
            'radial-gradient(ellipse 52% 48% at 50% 54%, rgba(0,168,90,0.16) 0%, rgba(7,91,53,0.09) 44%, rgba(5,8,7,0) 78%)',
            'radial-gradient(ellipse 36% 24% at 50% 74%, rgba(0,168,90,0.12) 0%, transparent 72%)',
          ].join(', '),
        }}
      />

      {/* Subtle Ambient Emerald Peripheral Depth (Matches Blackout Reference Corner Glow) */}
      <div
        className="pointer-events-none absolute -right-24 top-1/4 hidden h-[420px] w-[420px] rounded-full dark:block"
        style={{
          background: 'radial-gradient(circle, rgba(7,91,53,0.12) 0%, transparent 74%)',
        }}
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-12 hidden h-[380px] w-[380px] rounded-full dark:block"
        style={{
          background: 'radial-gradient(circle, rgba(0,168,90,0.09) 0%, transparent 74%)',
        }}
      />

      {/* LAYER 2: Prominent Horizontally Centered 3D Dotted World Globe (Crown just under heading down behind selector bar) */}
      <div className="pointer-events-none absolute left-1/2 top-[118px] sm:top-[116px] lg:top-[114px] h-[440px] w-[440px] -translate-x-1/2 sm:h-[540px] sm:w-[540px] lg:h-[620px] lg:w-[620px]">
        <m.div
          className="relative h-full w-full"
          animate={shouldAnimate ? { scale: [1, 1.011, 1] } : undefined}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Soft Spherical Outer Rim Atmospheric Corona */}
          <div
            className="pointer-events-none absolute -inset-4 rounded-full dark:hidden"
            style={{
              background:
                'radial-gradient(circle, rgba(0,168,90,0.09) 42%, rgba(20,103,54,0.10) 64%, transparent 76%)',
            }}
          />
          <div
            className="pointer-events-none absolute -inset-5 hidden rounded-full dark:block"
            style={{
              background:
                'radial-gradient(circle, rgba(0,168,90,0.14) 48%, rgba(0,168,90,0.22) 67%, transparent 78%)',
            }}
          />

          {/* Active Theme 3D Dotted Continent Globe (single image downloaded per theme) */}
          <div
            className="h-full w-full dark:[mask-image:none]"
            style={{
              WebkitMaskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.68) 16%, rgba(0,0,0,0.95) 36%, rgba(0,0,0,1) 74%, rgba(0,0,0,0.88) 92%, rgba(0,0,0,0.5) 100%)',
              maskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.68) 16%, rgba(0,0,0,0.95) 36%, rgba(0,0,0,1) 74%, rgba(0,0,0,0.88) 92%, rgba(0,0,0,0.5) 100%)',
            }}
          >
            <ThemeImage
              lightSrc="/images/impact/globe-orb-light.webp"
              darkSrc="/images/impact/globe-orb-dark.webp"
              alt=""
              width={640}
              height={640}
              loading="lazy"
              sizes="(max-width: 639px) 440px, (max-width: 1023px) 540px, 620px"
              lightClassName="opacity-[0.76]"
              darkClassName="opacity-[0.95]"
              className="h-full w-full object-contain"
            />
          </div>
        </m.div>
      </div>

      {/* Subtle Typography Legibility Guard Under Subtitle Over Top Crown */}
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[140px] w-[min(680px,92vw)] -translate-x-1/2 rounded-full dark:hidden"
        style={{
          background:
            'radial-gradient(ellipse 68% 58% at 50% 42%, rgba(247,246,241,0.74) 0%, rgba(247,246,241,0) 80%)',
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-24 hidden h-[140px] w-[min(680px,92vw)] -translate-x-1/2 rounded-full dark:block"
        style={{
          background:
            'radial-gradient(ellipse 68% 58% at 50% 42%, rgba(5,8,7,0.68) 0%, rgba(5,8,7,0) 80%)',
        }}
      />

      {/* LAYER 3: Multiple Sweeping Elliptical Orbital Rings, Emerald/Red Trails & Synchronized Star Nodes */}
      <svg
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-x-0 top-6 h-[680px] w-full sm:h-[720px] lg:h-[740px]"
        fill="none"
      >
        <defs>
          {/* Halo Outer Arc */}
          <linearGradient id="orbitOuterHalo" x1="110" y1="140" x2="1090" y2="560" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00A85A" stopOpacity="0" />
            <stop offset="20%" stopColor="#00A85A" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#4ADE80" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#00A85A" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#00A85A" stopOpacity="0" />
          </linearGradient>

          {/* Lower Emerald Leading Sweep */}
          <linearGradient id="orbitEmeraldSweep" x1="62" y1="520" x2="710" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00A85A" stopOpacity="0" />
            <stop offset="22%" stopColor="#00A85A" stopOpacity="0.72" />
            <stop offset="58%" stopColor="#2EB04B" stopOpacity="0.88" />
            <stop offset="86%" stopColor="#00A85A" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00A85A" stopOpacity="0" />
          </linearGradient>

          {/* Lower-Right UAE Crimson Trailing Accent */}
          <linearGradient id="orbitCrimsonTrail" x1="665" y1="602" x2="1146" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D92332" stopOpacity="0" />
            <stop offset="28%" stopColor="#D92332" stopOpacity="0.58" />
            <stop offset="68%" stopColor="#C2242B" stopOpacity="0.84" />
            <stop offset="92%" stopColor="#D92332" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#D92332" stopOpacity="0" />
          </linearGradient>

          {/* Diagonal Upper Emerald Ring */}
          <linearGradient id="orbitDiagonal" x1="120" y1="300" x2="1080" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00A85A" stopOpacity="0" />
            <stop offset="28%" stopColor="#2EB04B" stopOpacity="0.38" />
            <stop offset="52%" stopColor="#E0B13A" stopOpacity="0.35" />
            <stop offset="76%" stopColor="#00A85A" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#00A85A" stopOpacity="0" />
          </linearGradient>

          <filter id="nodeGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Atmospheric Dome Orbit Ring Arching Over Cards & Subtitle (with Locked Nodes) */}
        <m.g
          style={{ transformOrigin: '600px 410px' }}
          animate={shouldAnimate ? { rotate: [-0.7, 0.7, -0.7] } : undefined}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ellipse
            cx="600"
            cy="410"
            rx="520"
            ry="245"
            transform="rotate(-4 600 410)"
            stroke="url(#orbitOuterHalo)"
            strokeWidth="1.25"
            className="opacity-70 dark:opacity-90"
          />
          <ellipse
            cx="600"
            cy="414"
            rx="468"
            ry="220"
            transform="rotate(5 600 414)"
            className="stroke-[#146736]/22 dark:stroke-[#00A85A]/30"
            strokeWidth="0.9"
          />
          {renderOrbitalNodes(OUTER_RING_NODES, shouldAnimate)}
        </m.g>

        {/* Mid Tilted Planetary Orbit Ring (with Locked Node) */}
        <m.g
          style={{ transformOrigin: '600px 435px' }}
          animate={shouldAnimate ? { rotate: [0.8, -0.8, 0.8] } : undefined}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ellipse
            cx="600"
            cy="435"
            rx="538"
            ry="135"
            transform="rotate(9 600 435)"
            stroke="url(#orbitDiagonal)"
            strokeWidth="1.4"
          />
          <ellipse
            cx="600"
            cy="442"
            rx="510"
            ry="120"
            transform="rotate(-6 600 442)"
            className="stroke-[#146736]/20 dark:stroke-[#00A85A]/28"
            strokeWidth="0.85"
            strokeDasharray="4 7"
          />
          {renderOrbitalNodes(MID_RING_NODES, shouldAnimate)}
        </m.g>

        {/* Lower Orbital Sweep Cradling Beneath Cards & Wrapping Toward Pills: Emerald Leading Arc */}
        <path
          d="M 62 520 C 175 596, 395 620, 710 600"
          stroke="url(#orbitEmeraldSweep)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M 86 526 C 202 594, 405 614, 695 596"
          stroke="#4ADE80"
          strokeWidth="0.9"
          strokeLinecap="round"
          className="opacity-35 dark:opacity-65"
        />

        {/* Lower-Right UAE Crimson Trailing Ribbon Arc */}
        <path
          d="M 665 602 C 855 594, 1045 562, 1146 500"
          stroke="url(#orbitCrimsonTrail)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M 695 598 C 870 588, 1038 560, 1126 510"
          stroke="#FF6B78"
          strokeWidth="0.9"
          strokeLinecap="round"
          className="opacity-30 dark:opacity-55"
        />

        {/* Subtle Secondary Outer Cradle Framing Beneath Bottom Pills */}
        <path
          d="M 110 622 C 320 676, 880 676, 1090 622"
          className="stroke-[#146736]/18 dark:stroke-[#00A85A]/24"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Upper-Right Secondary Emerald Halo Curve */}
        <path
          d="M 885 200 C 1030 236, 1128 310, 1138 412"
          className="stroke-[#146736]/26 dark:stroke-[#00A85A]/45"
          strokeWidth="1.25"
          strokeLinecap="round"
        />

        {/* Locked Lower Orbit Star Nodes */}
        {renderOrbitalNodes(LOWER_ARC_NODES, shouldAnimate)}
      </svg>
    </div>
  );
});

export default ImpactGlobeBackdrop;
