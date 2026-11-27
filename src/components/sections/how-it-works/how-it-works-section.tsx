'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, FileCheck2, Layers, Rocket } from 'lucide-react';
import { m, useReducedMotion } from 'motion/react';
import { useSectionInView } from '@/hooks/use-section-in-view';
import HowItWorks, {
  type HowItWorksStep,
  type PinTone,
} from '@/components/ui/how-it-works';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import {
  HOW_IT_WORKS_STEPS,
  type HowItWorksIconName,
} from './how-it-works-data';

const STEP_ICONS: Record<HowItWorksIconName, React.ReactNode> = {
  building: <Building2 className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />,
  'file-check': (
    <FileCheck2 className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
  ),
  rocket: <Rocket className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />,
};

const STEP_PIN_TONES: Record<string, PinTone> = {
  'step-01': 'red',
  'step-02': 'green',
  'step-03': 'charcoal',
};

export function HowItWorksSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useSectionInView(sectionRef);
  const shouldAnimate = !prefersReducedMotion && inView;

  const steps: HowItWorksStep[] = HOW_IT_WORKS_STEPS.map((item) => ({
    id: item.id,
    number: item.number,
    title: item.title,
    description: item.description,
    icon: STEP_ICONS[item.iconName],
    pinTone: STEP_PIN_TONES[item.id] ?? 'green',
  }));

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      data-section-paused={!inView ? 'true' : undefined}
      aria-labelledby="how-it-works-heading"
      className="relative overflow-hidden bg-[#F8F7F2] py-8 transition-colors duration-300 dark:bg-[#050807] sm:py-9 lg:py-10"
    >
        {/* Futuristic Impact-Style Orbital Rings & Glowing UAE Star Nodes */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 680"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        >
          <defs>
            <linearGradient id="hiw-orbit-green" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#087A42" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#16A05A" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#087A42" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="hiw-orbit-red" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C2242B" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#D92332" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#C2242B" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="hiw-orbit-gold" x1="0" y1="0.5" x2="1" y2="0.5">
              <stop offset="0%" stopColor="#C99726" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#E0B13A" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#C99726" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Outer Emerald Elliptical Orbit */}
          <ellipse
            cx="600"
            cy="330"
            rx="540"
            ry="235"
            transform="rotate(-9 600 330)"
            stroke="url(#hiw-orbit-green)"
            strokeWidth="1.4"
          />

          {/* Intersecting UAE Crimson Orbit */}
          <ellipse
            cx="600"
            cy="345"
            rx="475"
            ry="195"
            transform="rotate(11 600 345)"
            stroke="url(#hiw-orbit-red)"
            strokeWidth="1.25"
          />

          {/* Inner Subtle Gold Horizon Orbit */}
          <ellipse
            cx="600"
            cy="335"
            rx="380"
            ry="145"
            transform="rotate(-3 600 335)"
            stroke="url(#hiw-orbit-gold)"
            strokeWidth="1"
            strokeDasharray="6 8"
          />

          {/* Glowing Orbital Star Nodes */}
          {[
            { cx: 148, cy: 245, r: 3.2, fill: 'fill-[#1FA05E]/80 dark:fill-[#4ADE80]', halo: 'fill-[#1FA05E]/20 dark:fill-[#00A85A]/35', delay: 0.2 },
            { cx: 1035, cy: 220, r: 3.4, fill: 'fill-[#D92332]/80 dark:fill-[#FF4D5A]', halo: 'fill-[#D92332]/20 dark:fill-[#D92332]/35', delay: 1.1 },
            { cx: 920, cy: 465, r: 3.0, fill: 'fill-[#1FA05E]/80 dark:fill-[#4ADE80]', halo: 'fill-[#1FA05E]/20 dark:fill-[#00A85A]/35', delay: 1.8 },
            { cx: 235, cy: 435, r: 2.9, fill: 'fill-[#C99726]/80 dark:fill-[#E0B13A]', halo: 'fill-[#C99726]/20 dark:fill-[#E0B13A]/30', delay: 0.7 },
            { cx: 600, cy: 190, r: 2.6, fill: 'fill-[#1FA05E]/75 dark:fill-[#4ADE80]', halo: 'fill-[#1FA05E]/18 dark:fill-[#00A85A]/30', delay: 1.4 },
          ].map((node, i) => (
            <m.g
              key={`hiw-node-${i}`}
              animate={
                shouldAnimate
                  ? { opacity: [0.55, 1, 0.55], scale: [0.92, 1.15, 0.92] }
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
              <circle cx={node.cx} cy={node.cy} r={node.r * 2.6} className={node.halo} />
              <circle cx={node.cx} cy={node.cy} r={node.r} className={node.fill} />
              <circle cx={node.cx} cy={node.cy} r={node.r * 0.5} className="fill-white" />
            </m.g>
          ))}
        </svg>

        {/* Multi-Tone UAE Ambient Light Orbs (zero-blur radial gradients for 60fps scroll) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-16 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(194,36,43,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(217,35,50,0.12)_0%,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(8,122,66,0.11)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,168,90,0.15)_0%,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(8,122,66,0.10)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(22,160,90,0.13)_0%,transparent_70%)]"
        />

        {/* Top-Left UAE Green & Subtle Crimson Sweeping Ribbons */}
        <svg
          aria-hidden="true"
          viewBox="0 0 420 280"
          fill="none"
          className="pointer-events-none absolute -left-10 top-0 z-0 h-[190px] w-[260px] opacity-90 sm:h-[230px] sm:w-[340px]"
        >
          <defs>
            <linearGradient id="hiw-left-arc" x1="0" y1="0.8" x2="1" y2="0">
              <stop offset="0%" stopColor="#087A42" stopOpacity="0.95" />
              <stop offset="58%" stopColor="#16A05A" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#16A05A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hiw-left-red" x1="0" y1="0.9" x2="1" y2="0.1">
              <stop offset="0%" stopColor="#C2242B" stopOpacity="0.65" />
              <stop offset="65%" stopColor="#C2242B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M-20 225 C 85 150, 210 90, 360 15 C 220 105, 95 170, -20 255 Z"
            fill="url(#hiw-left-arc)"
          />
          <path
            d="M-20 175 C 65 120, 145 78, 240 28 C 140 90, 58 135, -20 198 Z"
            fill="url(#hiw-left-red)"
          />
        </svg>

        {/* Bottom-Right Sweeping Emerald & Subtle Crimson Ribbon behind Banner */}
        <svg
          aria-hidden="true"
          viewBox="0 0 440 260"
          fill="none"
          className="pointer-events-none absolute -right-10 bottom-0 z-0 h-[180px] w-[280px] opacity-95 sm:h-[210px] sm:w-[360px]"
          style={{
            maskImage:
              'linear-gradient(to bottom, #000 0%, #000 58%, rgba(0,0,0,0.45) 84%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, #000 0%, #000 58%, rgba(0,0,0,0.45) 84%, transparent 100%)',
          }}
        >
          <defs>
            <linearGradient id="hiw-right-arc" x1="1" y1="0.2" x2="0" y2="1">
              <stop offset="0%" stopColor="#087A42" stopOpacity="0.98" />
              <stop offset="60%" stopColor="#16A05A" stopOpacity="0.52" />
              <stop offset="100%" stopColor="#16A05A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M460 30 C 335 105, 195 162, 20 232 C 175 148, 305 92, 460 4 Z"
            fill="url(#hiw-right-arc)"
          />
        </svg>

        {/* Panoramic Dubai Skyline & Emerald Wave Horizon Blend (enriched top green, smooth bottom merge) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[240px] select-none opacity-75 sm:h-[300px] lg:h-[350px] dark:opacity-38"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 32%, #000 64%, rgba(0,0,0,0.42) 86%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 32%, #000 64%, rgba(0,0,0,0.42) 86%, transparent 100%)',
          }}
        >
          <Image
            src="/images/contact/dubai-skyline-contact-bg.webp"
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover object-bottom dark:brightness-75 dark:contrast-110"
          />
          <div className="pointer-events-none absolute inset-x-0 top-12 bottom-10 bg-gradient-to-b from-transparent via-[#087A42]/[0.08] to-[#087A42]/[0.14] dark:via-[#16A05A]/[0.08] dark:to-[#16A05A]/[0.14]" />
        </div>

        {/* Soft Bottom Merge into Consultation Partners Section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-14 bg-gradient-to-t from-[#F8F7F2] via-[#F8F7F2]/60 to-transparent dark:from-[#050807] dark:via-[#050807]/60 sm:h-16"
        />

        {/* Main Content Container */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Centered Section Heading */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0.99, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            {/* Liquid-Glass Eyebrow Pill */}
            <div className="mb-2.5 flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-[1.5px] w-8 rounded-full bg-[#087A42] dark:bg-[#16A05A]"
              />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/65 px-3.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#087A42] shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_4px_12px_rgba(8,122,66,0.1)] backdrop-blur-md dark:border-[#16A05A]/35 dark:bg-[#0D1310]/75 dark:text-[#16A05A] dark:shadow-none">
                <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                <span>HOW IT WORKS</span>
              </span>
              <span
                aria-hidden="true"
                className="h-[1.5px] w-8 rounded-full bg-[#087A42] dark:bg-[#16A05A]"
              />
            </div>

            <h2
              id="how-it-works-heading"
              className="text-2xl font-bold leading-[1.14] tracking-tight text-[#171717] dark:text-white sm:text-3xl lg:text-[34px]"
            >
              Three Simple Steps to{' '}
              <span className="relative inline-block text-[#087A42] dark:text-[#16A05A]">
                Grow Your Business
                <svg
                  aria-hidden="true"
                  viewBox="0 0 280 14"
                  fill="none"
                  className="pointer-events-none absolute -bottom-1.5 left-0 h-3 w-full"
                >
                  <path
                    d="M3 10.5 C 82 3.5, 196 2.5, 277 8"
                    stroke="#C2242B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-[#525252] dark:text-white/70 sm:text-sm">
              A clear, guided process for setting up and growing your business
              in the UAE.
            </p>
          </m.div>

          {/* Staggered Connected 3-Step Liquid Glass Cards */}
          <div className="mt-5 sm:mt-6">
            <HowItWorks steps={steps} />
          </div>

          {/* Full-Width Water-Flow Liquid Glass Consultation Banner */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0.99, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="partners-liquid-glass relative mt-5 overflow-hidden rounded-[22px] px-5 py-4 sm:px-7 sm:py-5 lg:mt-5"
          >
            {/* Upper Domed Water-Glass Specular Reflection Band */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-0.5 h-[42%] rounded-t-[20px] bg-gradient-to-b from-white/70 via-white/20 to-transparent dark:from-white/[0.12] dark:via-white/[0.03] dark:to-transparent"
            />

            {/* Top Water Meniscus Crisp Highlight */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-white/40"
            />

            {/* Subtle Animated Liquid Caustic Shimmer Sweep */}
            <span
              aria-hidden="true"
              className="partners-water-shimmer pointer-events-none absolute inset-y-0 left-1/4 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent blur-md dark:via-emerald-300/[0.08]"
            />

            <div className="relative z-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="border-l-2 border-[#087A42] pl-4 dark:border-[#16A05A]">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#087A42] dark:text-[#16A05A]">
                  PERSONALIZED SUPPORT
                </p>
                <h3 className="mt-1 text-lg font-bold tracking-tight text-[#171717] dark:text-white sm:text-xl">
                  Your next step starts with the right guidance.
                </h3>
                <p className="mt-0.5 text-xs leading-relaxed text-[#404040] dark:text-white/75 sm:text-sm">
                  Speak with a Takhlees consultant about your UAE business
                  requirements.
                </p>
              </div>

              <div className="shrink-0">
                <LiquidButton variant="emerald" size="md" asChild>
                  <Link href="/ae/contact">Talk to a Consultant</Link>
                </LiquidButton>
              </div>
            </div>
          </m.div>
        </div>
      </section>
  );
}
