'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ThemeImage } from '@/components/ui/theme-image';

export interface Takhlees3DLoaderProps {
  className?: string;
  label?: string;
  sublabel?: string;
}

/**
 * Takhlees3DLoader
 * Luxury minimal UAE corporate loader featuring the official Takhlees emblem inside
 * a domed frosted-glass circular disc, concentric glass rings, dual emerald & crimson
 * orbital arcs, and refined typography.
 */
export function Takhlees3DLoader({
  className,
  label = 'TAKHLEES',
  sublabel = 'Business Setup & PRO Excellence • UAE',
}: Takhlees3DLoaderProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center select-none', className)}>
      {/* Central Concentric Frosted-Glass Rings & Official Logo */}
      <div className="relative flex h-[216px] w-[216px] items-center justify-center sm:h-[232px] sm:w-[232px]">
        {/* Soft Centered Atmospheric Glow */}
        <div
          aria-hidden="true"
          className="takhlees-loader-breathe pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(255,253,248,0.95)_0%,rgba(229,193,88,0.14)_38%,rgba(8,122,66,0.06)_58%,transparent_74%)] dark:bg-[radial-gradient(circle,rgba(22,160,90,0.18)_0%,rgba(229,193,88,0.08)_42%,transparent_74%)]"
        />

        {/* Outermost Concentric Liquid-Glass Halo Ring */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full border border-white/80 bg-[radial-gradient(circle,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.08)_64%,rgba(229,193,88,0.12)_100%)] shadow-[0_20px_48px_-16px_rgba(12,38,24,0.16),inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-3px_8px_rgba(8,122,66,0.08)] md:backdrop-blur-sm dark:border-white/15 dark:bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_75%)] dark:shadow-[0_22px_52px_-14px_rgba(0,0,0,0.72),inset_0_1.5px_2px_rgba(255,255,255,0.16)]"
        />

        {/* Mid Concentric Frosted Liquid-Glass Bevel Ring */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[26px] rounded-full border border-white/95 bg-white/28 shadow-[0_14px_34px_-12px_rgba(12,38,24,0.16),inset_0_2px_3px_rgba(255,255,255,1),inset_0_-3px_8px_rgba(8,122,66,0.10),inset_0_0_8px_2px_rgba(255,255,255,0.55)] md:backdrop-blur-md dark:border-white/18 dark:bg-white/[0.04] dark:shadow-[0_16px_38px_-12px_rgba(0,0,0,0.8),inset_0_1.5px_2px_rgba(255,255,255,0.2),inset_0_-3px_8px_rgba(22,160,90,0.12)]"
        />

        {/* Smooth Continuously Rotating Dual UAE Progress Arcs (Emerald + Crimson) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          fill="none"
          className="takhlees-loader-arc-spin pointer-events-none absolute inset-[16px] h-[calc(100%-32px)] w-[calc(100%-32px)]"
        >
          <defs>
            <linearGradient id="tl-arc-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5C158" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#C2242B" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#A31C1B" stopOpacity="0.92" />
            </linearGradient>
            <linearGradient id="tl-arc-green" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#E5C158" stopOpacity="0.35" />
              <stop offset="30%" stopColor="#087A42" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#16A05A" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Subtle warm champagne-gold orbital track */}
          <circle
            cx="100"
            cy="100"
            r="74"
            stroke="#E5C158"
            strokeOpacity="0.24"
            strokeWidth="1"
          />

          {/* Upper-Right UAE Crimson Arc */}
          <path
            d="M 106 26.2 A 74 74 0 0 1 172.8 113"
            stroke="url(#tl-arc-red)"
            strokeWidth="4.2"
            strokeLinecap="round"
          />

          {/* Lower-Left UAE Emerald Arc */}
          <path
            d="M 94 173.8 A 74 74 0 0 1 27.2 87"
            stroke="url(#tl-arc-green)"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
        </svg>

        {/* Central Liquid-Glass Sphere Housing the Glowing Official Logo */}
        <div className="relative isolate z-10 flex h-[102px] w-[102px] items-center justify-center overflow-hidden rounded-full bg-white/30 dark:bg-[#0D1F16]/45 sm:h-[108px] sm:w-[108px]">
          {/* Liquid-glass water refraction layer (desktop SVG displacement / mobile frosted blur) */}
          <div
            aria-hidden="true"
            className="liquid-glass-refract-button pointer-events-none absolute inset-0 -z-10 rounded-full"
          />

          {/* 9-Layer Beveled Liquid-Glass Thickness & Rim Shadow System */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-full border border-white/90 shadow-[0_18px_40px_-10px_rgba(8,122,66,0.24),0_4px_14px_-4px_rgba(201,151,38,0.22),inset_3px_3px_1px_-2px_rgba(255,255,255,1),inset_-3px_-3px_1px_-2px_rgba(8,122,66,0.18),inset_0_0_8px_4px_rgba(255,255,255,0.55),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-6px_12px_rgba(8,122,66,0.12)] dark:border-white/25 dark:shadow-[0_20px_44px_-10px_rgba(0,0,0,0.9),0_0_28px_-4px_rgba(46,176,75,0.38),inset_2px_2px_1px_-1.5px_rgba(255,255,255,0.45),inset_-2px_-2px_1px_-1.5px_rgba(46,176,75,0.25),inset_0_0_8px_4px_rgba(255,255,255,0.08),inset_0_-6px_14px_rgba(0,0,0,0.65)]"
          />

          {/* Inner Caustic Glow Behind Logo (Emerald + Champagne Gold Aura) */}
          <div
            aria-hidden="true"
            className="takhlees-loader-breathe pointer-events-none absolute inset-2 z-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96)_0%,rgba(229,193,88,0.30)_38%,rgba(8,122,66,0.18)_66%,transparent_80%)] dark:bg-[radial-gradient(circle,rgba(46,176,75,0.34)_0%,rgba(229,193,88,0.18)_42%,transparent_78%)]"
          />

          {/* Domed Water-Drop Top Specular Meniscus */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-3 top-1 z-20 h-[42%] rounded-full bg-gradient-to-b from-white/95 via-white/40 to-transparent dark:from-white/30 dark:via-white/8"
          />

          {/* Subtle Diagonal Liquid-Glass Reflection Sweep */}
          <span
            aria-hidden="true"
            className="takhlees-loader-sheen pointer-events-none absolute inset-y-0 left-0 z-20 w-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/65 to-transparent dark:via-white/20"
          />

          {/* Glowing Official Takhlees Emblem */}
          <Image
            src="/icons/takhlees-emblem.png"
            alt="Takhlees Business"
            width={54}
            height={54}
            priority
            className="takhlees-loader-breathe relative z-10 h-12 w-12 object-contain [filter:drop-shadow(0_0_10px_rgba(8,122,66,0.38))_drop-shadow(0_0_20px_rgba(229,193,88,0.42))] dark:[filter:drop-shadow(0_0_12px_rgba(46,176,75,0.65))_drop-shadow(0_0_24px_rgba(229,193,88,0.45))] sm:h-[54px] sm:w-[54px]"
          />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="mt-5 flex flex-col items-center text-center">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-[1.5px] w-6 rounded-full bg-[#087A42] dark:bg-[#2EB04B]"
          />
          <span className="text-[16px] font-bold uppercase tracking-[0.38em] text-[#171717] dark:text-[#F5F5F2] sm:text-[18px]">
            {label}
          </span>
          <span
            aria-hidden="true"
            className="h-[1.5px] w-6 rounded-full bg-[#C2242B] dark:bg-[#E4002B]"
          />
        </div>

        <p className="mt-2 font-serif text-[13px] italic tracking-wide text-[#4E534F] dark:text-white/70 sm:text-[14px]">
          {sublabel}
        </p>

        {/* Subtle Champagne-Gold Tapered Accent Beneath Tagline */}
        <div className="relative mt-3.5 h-[1.5px] w-48 overflow-hidden sm:w-56">
          <span
            aria-hidden="true"
            className="block h-full w-full bg-gradient-to-r from-transparent via-[#C99726]/85 to-transparent dark:via-[#E5C158]/80"
          />
          <span
            aria-hidden="true"
            className="takhlees-loader-sheen pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-[#FFF7D6] to-transparent"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Alias preserved for component compatibility.
 */
export const Component = Takhlees3DLoader;

const SPLASH_SESSION_KEY = 'takhlees_splash_seen';

/**
 * TakhleesSplashLoader
 * Luxury UAE corporate initial loading screen shown once per session/tab open.
 * Skips immediately on page reloads or reduced-motion without flash.
 */
export function TakhleesSplashLoader() {
  const [phase, setPhase] = React.useState<'visible' | 'exiting' | 'done'>('visible');

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem(SPLASH_SESSION_KEY) === '1';
    } catch {
      alreadySeen = false;
    }

    if (prefersReduced || alreadySeen) {
      setPhase('done');
      return;
    }

    try {
      window.sessionStorage.setItem(SPLASH_SESSION_KEY, '1');
    } catch {
      // Ignore storage errors in restricted browsing modes
    }

    let minElapsed = false;
    let pageLoaded = document.readyState === 'complete';
    let exitTimer: number | null = null;
    let maxTimer: number | null = null;

    const triggerExit = () => {
      setPhase((prev) => (prev === 'visible' ? 'exiting' : prev));
      if (exitTimer === null) {
        exitTimer = window.setTimeout(() => {
          setPhase('done');
        }, 480);
      }
    };

    const minTimer = window.setTimeout(() => {
      minElapsed = true;
      if (pageLoaded) triggerExit();
    }, 1750);

    maxTimer = window.setTimeout(() => {
      triggerExit();
    }, 2150);

    const onLoad = () => {
      pageLoaded = true;
      if (minElapsed) triggerExit();
    };

    if (!pageLoaded) {
      window.addEventListener('load', onLoad, { once: true });
    }

    return () => {
      window.clearTimeout(minTimer);
      if (maxTimer !== null) window.clearTimeout(maxTimer);
      if (exitTimer !== null) window.clearTimeout(exitTimer);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden={phase === 'exiting'}
      className={cn(
        'takhlees-splash-overlay fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[linear-gradient(155deg,#FAF8F3_0%,#F6F2E8_54%,#EFEADF_100%)] dark:bg-[linear-gradient(155deg,#050807_0%,#07100C_58%,#050907_100%)]',
        'transition-[opacity,transform] duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        phase === 'exiting'
          ? 'pointer-events-none opacity-0 scale-[1.025]'
          : 'opacity-100 scale-100'
      )}
    >
      {/* Subtle Champagne & Ivory Atmospheric Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_52%_at_50%_46%,rgba(255,254,250,0.92)_0%,rgba(229,193,88,0.09)_46%,transparent_76%)] dark:bg-[radial-gradient(ellipse_62%_52%_at_50%_46%,rgba(8,122,66,0.16)_0%,rgba(229,193,88,0.06)_48%,transparent_76%)]"
      />

      {/* Upper-Left Translucent Emerald & Champagne-Gold Corner Accents */}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 260"
        fill="none"
        className="pointer-events-none absolute left-0 top-0 z-0 h-[150px] w-[190px] sm:h-[200px] sm:w-[250px]"
      >
        <defs>
          <linearGradient id="tl-corner-emerald" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#043A1F" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#087A42" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#087A42" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 0 L240 0 C 140 42, 65 110, 0 210 Z"
          fill="url(#tl-corner-emerald)"
          opacity="0.82"
        />
        <path
          d="M290 0 C 175 34, 88 98, 0 185"
          stroke="#C99726"
          strokeOpacity="0.55"
          strokeWidth="1.2"
        />
      </svg>

      {/* Stationary Low-Contrast Dubai Skyline Silhouette (Bottom-Right, Burj Khalifa Focal Point) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 right-0 z-0 h-[210px] w-[420px] opacity-35 sm:h-[260px] sm:w-[600px] lg:h-[300px] lg:w-[720px] dark:opacity-28"
        style={{
          maskImage:
            'radial-gradient(ellipse 78% 82% at 78% 76%, #000 22%, rgba(0,0,0,0.45) 56%, transparent 88%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 78% 82% at 78% 76%, #000 22%, rgba(0,0,0,0.45) 56%, transparent 88%)',
        }}
      >
        <ThemeImage
          lightSrc="/images/testimonials/dubai-skyline-light.webp"
          darkSrc="/images/testimonials/dubai-skyline-dark.webp"
          alt=""
          width={1920}
          height={320}
          loading="eager"
          className="h-full w-full object-cover object-right-bottom"
        />
      </div>

      {/* Bottom Flowing Emerald Waves with Thin Champagne-Gold Crest Outlines */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[135px] w-full sm:h-[175px] lg:h-[200px]"
      >
        <defs>
          <linearGradient id="tl-wave-soft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#087A42" stopOpacity="0.12" />
            <stop offset="48%" stopColor="#087A42" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#087A42" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient id="tl-wave-deep" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#043E20" />
            <stop offset="50%" stopColor="#086B38" />
            <stop offset="100%" stopColor="#032C17" />
          </linearGradient>
          <linearGradient id="tl-wave-gold" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#C99726" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#F5D77F" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C99726" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Back Translucent Wave */}
        <g className="takhlees-loader-wave-slow">
          <path
            d="M-60 120 C 240 60, 520 185, 860 145 C 1140 112, 1320 75, 1500 105 L1500 240 L-60 240 Z"
            fill="url(#tl-wave-soft)"
          />
          <path
            d="M-60 120 C 240 60, 520 185, 860 145 C 1140 112, 1320 75, 1500 105"
            stroke="#C99726"
            strokeOpacity="0.25"
            strokeWidth="1.1"
          />
        </g>

        {/* Primary Deep Emerald Foreground Wave */}
        <g className="takhlees-loader-wave-front">
          <path
            d="M-60 155 C 260 110, 560 212, 920 175 C 1180 148, 1340 102, 1500 124 L1500 240 L-60 240 Z"
            fill="url(#tl-wave-deep)"
          />
          <path
            d="M-60 155 C 260 110, 560 212, 920 175 C 1180 148, 1340 102, 1500 124"
            stroke="url(#tl-wave-gold)"
            strokeWidth="1.8"
          />
        </g>
      </svg>

      {/* Center Brand Showcase */}
      <Takhlees3DLoader className="relative z-10 px-6 pb-8" />
    </div>
  );
}

export default TakhleesSplashLoader;
