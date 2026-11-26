'use client';

import * as React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarCheck2,
  Check,
  FileText,
  Loader2,
  Mail,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { GlassFilter } from '@/components/ui/liquid-glass-button';
import { MotionTiltCard } from '@/components/ui/motion-tilt-card';

const briefingSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your business email address.')
    .email('Please enter a valid business email address.'),
});

type BriefingFormValues = z.infer<typeof briefingSchema>;

const BRIEFING_HIGHLIGHTS = [
  { icon: FileText, label: 'Regulatory\nUpdates' },
  { icon: BarChart3, label: 'Business\nInsights' },
  { icon: CalendarCheck2, label: 'Policy\nChanges' },
] as const;

/* Reused LiquidButton 9-layer beveled glass shadow system */
const LIQUID_GLASS_BEVEL_SHADOW =
  'shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.45),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.4),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.28),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.28),inset_0_0_6px_6px_rgba(0,0,0,0.06),inset_0_0_2px_2px_rgba(0,0,0,0.03),0_0_12px_rgba(255,255,255,0.22)] dark:shadow-[0_0_8px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.14),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.55),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.38),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.38),inset_0_0_6px_6px_rgba(255,255,255,0.08),inset_0_0_2px_2px_rgba(255,255,255,0.04),0_0_12px_rgba(0,0,0,0.18)]';

export function BusinessBriefingSection() {
  const prefersReducedMotion = useReducedMotion();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [resetCountdown, setResetCountdown] = React.useState<number | null>(
    null
  );
  const [subscribedMessage, setSubscribedMessage] = React.useState<string | null>(
    null
  );
  const [lockedPanelHeight, setLockedPanelHeight] = React.useState<
    number | null
  >(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (resetCountdown === null) return;
    if (resetCountdown <= 0) {
      setSubscribedMessage(null);
      setResetCountdown(null);
      setLockedPanelHeight(null);
      return;
    }
    const timer = window.setTimeout(() => {
      setResetCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [resetCountdown]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BriefingFormValues>({
    resolver: zodResolver(briefingSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: BriefingFormValues) => {
    if (subscribedMessage) return;
    setServerError(null);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as {
        message?: string;
        errors?: { email?: string[] };
      };

      if (!response.ok) {
        const msg =
          data.errors?.email?.[0] ??
          data.message ??
          'Unable to subscribe right now. Please try again.';
        setServerError(msg);
        return;
      }

      const measuredHeight = panelRef.current?.offsetHeight ?? null;
      if (measuredHeight) setLockedPanelHeight(measuredHeight);
      setSubscribedMessage(
        data.message ??
          'You are subscribed to The Takhlees Business Briefing. Watch your inbox for curated UAE regulatory and business updates.'
      );
      setResetCountdown(10);
      reset();
    } catch {
      setServerError(
        'Network error while subscribing. Please check your connection and try again.'
      );
    }
  };

  const handleResetSuccess = () => {
    setSubscribedMessage(null);
    setResetCountdown(null);
    setLockedPanelHeight(null);
    setServerError(null);
    reset({ email: '' });
  };

  const isSuccess = Boolean(subscribedMessage && resetCountdown !== null);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="business-briefing"
        aria-labelledby="briefing-heading"
        className="relative flex min-h-[calc(100vh-76px)] items-center overflow-hidden bg-[#F8F7F2] py-20 transition-colors duration-300 dark:bg-[#050807] sm:py-24 lg:min-h-screen lg:py-28"
      >
        {/* Reuse existing shared GlassFilter (#container-glass) from liquid-glass-button */}
        <GlassFilter />

        {/* ================= LAYERED ATMOSPHERIC BACKGROUND ================= */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        >
          {/* Warm Ivory & Golden-Hour Atmospheric Glow */}
          <div className="absolute left-[10%] top-[20%] h-[420px] w-[540px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9),transparent_72%)] blur-2xl dark:bg-[radial-gradient(ellipse_at_center,rgba(8,122,66,0.12),transparent_72%)]" />
          <m.div
            animate={
              prefersReducedMotion
                ? undefined
                : { scale: [1, 1.04, 1], opacity: [0.85, 1, 0.85] }
            }
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-[8%] top-[16%] h-[420px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,215,127,0.22),rgba(8,122,66,0.08)_55%,transparent_76%)] blur-3xl dark:bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.14),rgba(0,168,90,0.16)_52%,transparent_76%)]"
          />

          {/* Golden-Hour Dubai Skyline on the Right Side */}
          <div
            className="absolute bottom-8 right-0 z-0 h-[280px] w-[520px] opacity-72 sm:h-[340px] sm:w-[680px] lg:h-[410px] lg:w-[840px] dark:opacity-42"
            style={{
              maskImage:
                'radial-gradient(ellipse 80% 80% at 80% 56%, #000 28%, rgba(0,0,0,0.5) 58%, transparent 88%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 80% 80% at 80% 56%, #000 28%, rgba(0,0,0,0.5) 58%, transparent 88%)',
            }}
          >
            <Image
              src="/images/testimonials/dubai-skyline-light.webp"
              alt=""
              width={1920}
              height={320}
              loading="lazy"
              className="block h-full w-full object-cover object-right-bottom dark:hidden"
            />
            <Image
              src="/images/testimonials/dubai-skyline-dark.webp"
              alt=""
              width={1920}
              height={320}
              loading="lazy"
              className="hidden h-full w-full object-cover object-right-bottom dark:block"
            />
          </div>

          {/* Upper-Left Emerald Organic Curve (top edge softly merged into background) */}
          <svg
            viewBox="0 0 360 360"
            fill="none"
            className="absolute -left-8 top-0 z-0 h-[210px] w-[210px] sm:h-[260px] sm:w-[270px]"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 24%, #000 56%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 24%, #000 56%)',
            }}
          >
            <defs>
              <linearGradient id="briefing-tl-emerald" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#043A1F" stopOpacity="0.96" />
                <stop offset="60%" stopColor="#086E3B" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#087A42" stopOpacity="0.06" />
              </linearGradient>
            </defs>
            <path
              d="M0 18 C 75 2, 145 18, 215 10 C 155 75, 90 155, 28 265 C 14 290, 5 315, 0 335 Z"
              fill="url(#briefing-tl-emerald)"
            />
            <path
              d="M212 12 C 152 77, 88 157, 26 268"
              stroke="#E5C158"
              strokeWidth="1.8"
              strokeOpacity="0.82"
            />
          </svg>

          {/* Bottom Organic Ivory & Emerald Waves + Champagne-Gold Contours */}
          <svg
            viewBox="0 0 1440 340"
            preserveAspectRatio="none"
            fill="none"
            className="absolute inset-x-0 bottom-0 z-0 h-[190px] w-full sm:h-[230px] lg:h-[260px]"
          >
            <defs>
              <linearGradient id="briefing-ivory-wave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EFECE2" stopOpacity="0.92" />
                <stop offset="60%" stopColor="#E6E1D3" stopOpacity="0.58" />
                <stop offset="100%" stopColor="#DDD7C5" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="briefing-emerald-wave-1" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#043A1F" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#086E3B" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#032D18" stopOpacity="0.96" />
              </linearGradient>
              <linearGradient id="briefing-emerald-wave-2" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#0A7A42" stopOpacity="0.72" />
                <stop offset="60%" stopColor="#054726" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#032C17" stopOpacity="0.96" />
              </linearGradient>
              <linearGradient id="briefing-gold-contour" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
                <stop offset="35%" stopColor="#F5D77F" stopOpacity="0.92" />
                <stop offset="70%" stopColor="#E5C158" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#C99726" stopOpacity="0.3" />
              </linearGradient>
              <filter id="briefingGoldGlow" x="-10%" y="-25%" width="120%" height="150%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Translucent Ivory Wave */}
            <path
              d="M0 190 C 260 110, 520 230, 860 175 C 1140 130, 1300 70, 1440 90 L1440 340 L0 340 Z"
              fill="url(#briefing-ivory-wave)"
              className="dark:hidden"
            />

            {/* Primary Deep Emerald Wave */}
            <path
              d="M0 295 C 240 245, 520 275, 840 215 C 1100 165, 1280 95, 1440 120 L1440 340 L0 340 Z"
              fill="url(#briefing-emerald-wave-1)"
            />

            {/* Overlapping Secondary Emerald Lip */}
            <path
              d="M220 340 C 480 285, 760 265, 1020 245 C 1220 230, 1350 185, 1440 165 L1440 340 Z"
              fill="url(#briefing-emerald-wave-2)"
              opacity="0.85"
            />

            {/* Champagne-Gold Illuminated Contour */}
            <path
              d="M0 295 C 240 245, 520 275, 840 215 C 1100 165, 1280 95, 1440 120"
              stroke="url(#briefing-gold-contour)"
              strokeWidth="1.9"
            />

            {/* Travelling Champagne-Gold Light Reflection */}
            <m.path
              d="M0 295 C 240 245, 520 275, 840 215 C 1100 165, 1280 95, 1440 120"
              stroke="#F7DF92"
              strokeOpacity="0.82"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="240 1360"
              filter="url(#briefingGoldGlow)"
              initial={prefersReducedMotion ? false : { strokeDashoffset: 0 }}
              animate={
                prefersReducedMotion ? undefined : { strokeDashoffset: -1600 }
              }
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </svg>

          {/* Smooth Emerald-to-Charcoal Transition Into Footer (#121212) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-gradient-to-b from-transparent via-[#062415]/60 to-[#121212]" />
        </div>

        {/* ================= MAIN EDITORIAL & GLASS COMPOSITION ================= */}
        <div className="relative z-10 mx-auto max-w-[1260px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* ---------- LEFT SIDE: EDITORIAL BRIEFING CONTENT ---------- */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start lg:col-span-5"
            >
              {/* Eyebrow with Takhlees Brand Red & Emerald/Gold Separator Lines */}
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-7 bg-gradient-to-r from-transparent to-[#C2242B] dark:to-[#F25C63]"
                />
                <span className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#2B332E] dark:text-white/85 sm:text-[11px]">
                  <BookOpen
                    className="h-3.5 w-3.5 text-[#C2242B] dark:text-[#F25C63]"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  <span>THE TAKHLEES BUSINESS BRIEFING</span>
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-7 bg-gradient-to-l from-transparent to-[#C99726] dark:to-[#E0B13A]"
                />
              </div>

              {/* Main Editorial Serif Heading */}
              <h2
                id="briefing-heading"
                className="font-serif text-[38px] font-semibold leading-[1.08] tracking-[-0.015em] text-[#1C1C1C] dark:text-[#F5F5F2] sm:text-[46px] lg:text-[48px] xl:text-[52px]"
              >
                <span className="block">Stay Ahead.</span>
                <span className="block">
                  Stay{' '}
                  <span className="relative inline-block italic font-bold text-[#087A42] dark:text-[#16A05A]">
                    Informed.
                    {/* Thin Champagne-Gold Underline */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 180 12"
                      fill="none"
                      className="pointer-events-none absolute -bottom-2 left-0 h-2.5 w-full"
                    >
                      <path
                        d="M2 9.5 C 55 3, 125 2.5, 178 6.5"
                        stroke="#C99726"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </h2>

              {/* Supporting Description */}
              <p className="mt-5 max-w-[430px] text-[14.5px] leading-[1.7] text-[#454846] dark:text-white/75 sm:text-[15.5px]">
                Get the latest UAE business insights, regulatory updates and
                practical guidance delivered straight to your inbox.
              </p>

              {/* Three Compact Editorial Feature Highlights */}
              <div className="mt-8 grid w-full max-w-[440px] grid-cols-3 divide-x divide-[#C99726]/25 dark:divide-white/12">
                {BRIEFING_HIGHLIGHTS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2.5 px-2 text-center first:pl-0 last:pr-0"
                  >
                    {/* Small Liquid-Glass Icon Container */}
                    <div className="relative isolate flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white/45 dark:bg-[#0D1A13]/55">
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 z-0 rounded-xl ${LIQUID_GLASS_BEVEL_SHADOW}`}
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 rounded-xl"
                        style={{ backdropFilter: 'url("#container-glass")' }}
                      />
                      <Icon
                        className="relative z-10 h-4.5 w-4.5 text-[#C2242B] dark:text-[#F25C63]"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="whitespace-pre-line text-[12px] font-medium leading-snug text-[#252B27] dark:text-white/85">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </m.div>

            {/* ---------- RIGHT SIDE: LIQUID GLASS SUBSCRIPTION PANEL ---------- */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:col-span-7"
            >
              <MotionTiltCard
                maxTilt={2.2}
                perspective={1200}
                hoverZ={-4}
                className="w-full"
              >
                <div className="relative mx-auto max-w-[610px] lg:mr-4">
                  {/* Soft Emerald & Champagne Ambient Glow Beneath Glass Panel */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-4 bg-[radial-gradient(ellipse_at_55%_50%,rgba(8,122,66,0.16),rgba(229,193,88,0.18)_48%,transparent_75%)] blur-2xl dark:bg-[radial-gradient(ellipse_at_55%_50%,rgba(22,160,90,0.22),rgba(212,175,55,0.14)_48%,transparent_75%)]"
                  />

                  {/* Organic Sculpted Liquid-Glass Panel (locks exact height during success) */}
                  <div
                    ref={panelRef}
                    className={`group relative isolate flex flex-col justify-center overflow-hidden px-6 py-7 backdrop-blur-xl transition-all duration-500 sm:px-9 sm:py-9 ${
                      isSuccess
                        ? 'bg-[linear-gradient(148deg,rgba(255,254,250,0.88)_0%,rgba(248,245,234,0.80)_52%,rgba(227,242,233,0.78)_100%)] dark:bg-[linear-gradient(148deg,rgba(14,30,22,0.88)_0%,rgba(10,22,16,0.82)_60%,rgba(7,26,18,0.88)_100%)]'
                        : 'bg-white/42 dark:bg-[#0D1913]/58'
                    }`}
                    style={{
                      borderRadius: '34px 52px 34px 36px / 34px 34px 48px 34px',
                      ...(isSuccess && lockedPanelHeight
                        ? { height: `${lockedPanelHeight}px` }
                        : {}),
                    }}
                  >
                    {/* Layer 1: LiquidButton 9-Layer Beveled Glass Inset Shadows */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 z-0 ${LIQUID_GLASS_BEVEL_SHADOW}`}
                      style={{ borderRadius: 'inherit' }}
                    />

                    {/* Layer 2: Champagne-Gold Reflective Edge Border */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-20 [background:linear-gradient(132deg,rgba(255,255,255,0.95)_0%,rgba(229,193,88,0.82)_32%,rgba(8,122,66,0.32)_62%,rgba(245,215,127,0.88)_100%)] dark:[background:linear-gradient(132deg,rgba(255,255,255,0.22)_0%,rgba(229,193,88,0.68)_35%,rgba(22,160,90,0.42)_68%,rgba(245,215,127,0.55)_100%)]"
                      style={{
                        borderRadius: 'inherit',
                        padding: '1.5px',
                        WebkitMask:
                          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                      }}
                    />

                    {/* Layer 4: Top Specular Highlight, Emerald Success Reflection & Moving Glass Sheen */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500 ${
                        isSuccess
                          ? 'bg-[radial-gradient(85%_60%_at_50%_18%,rgba(8,122,66,0.12)_0%,transparent_64%),radial-gradient(80%_50%_at_50%_85%,rgba(229,193,88,0.12)_0%,transparent_65%)] dark:bg-[radial-gradient(85%_60%_at_50%_18%,rgba(22,160,90,0.20)_0%,transparent_64%),radial-gradient(80%_50%_at_50%_85%,rgba(229,193,88,0.12)_0%,transparent_65%)]'
                          : 'bg-[radial-gradient(110%_75%_at_18%_8%,rgba(255,255,255,0.52)_0%,rgba(255,255,255,0.1)_40%,transparent_68%)] dark:bg-[radial-gradient(110%_75%_at_18%_8%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.02)_40%,transparent_68%)]'
                      }`}
                      style={{ borderRadius: 'inherit' }}
                    />
                    <span
                      aria-hidden="true"
                      className="leadership-glass-sheen pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 bg-gradient-to-r from-transparent via-[#F5DDA0]/[0.18] to-transparent dark:via-white/[0.06]"
                    />

                    {/* Panel Inner Content — Entire Card Transforms on Success */}
                    <div className="relative z-10 w-full">
                      <AnimatePresence mode="wait" initial={false}>
                        {isSuccess ? (
                          <m.div
                            key="briefing-success-panel"
                            role="status"
                            aria-live="polite"
                            initial={
                              prefersReducedMotion ? false : { opacity: 0, y: 8 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            exit={
                              prefersReducedMotion
                                ? undefined
                                : { opacity: 0, y: -6 }
                            }
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="mx-auto flex w-full max-w-[400px] flex-col items-center justify-center text-center"
                          >
                            {/* Compact Emerald Circular Liquid-Glass Indicator */}
                            <m.div
                              initial={
                                prefersReducedMotion
                                  ? false
                                  : { opacity: 0, scale: 0.85 }
                              }
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.34,
                                delay: prefersReducedMotion ? 0 : 0.04,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="relative mb-2.5 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#F5D77F_0%,#C99726_48%,#E5C158_100%)] p-[1.5px] shadow-[0_10px_22px_-6px_rgba(8,122,66,0.42),0_0_16px_rgba(229,193,88,0.3)]"
                            >
                              <div className="relative isolate flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(110%_110%_at_30%_18%,#2EB04B_0%,#087A42_56%,#044323_100%)]">
                                <span
                                  aria-hidden="true"
                                  className={`pointer-events-none absolute inset-0 rounded-full ${LIQUID_GLASS_BEVEL_SHADOW}`}
                                />
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute inset-x-1.5 top-0.5 h-[44%] rounded-full bg-gradient-to-b from-white/55 via-white/15 to-transparent"
                                />
                                <Check
                                  className="relative z-10 h-5 w-5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                                  strokeWidth={2.75}
                                  aria-hidden="true"
                                />
                              </div>
                            </m.div>

                            {/* Eyebrow, Compact Serif Heading & Confirmation Message */}
                            <m.div
                              initial={
                                prefersReducedMotion
                                  ? false
                                  : { opacity: 0, y: 8 }
                              }
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.32,
                                delay: prefersReducedMotion ? 0 : 0.1,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="flex flex-col items-center"
                            >
                              <span className="inline-flex items-center rounded-full border border-[#087A42]/18 bg-white/78 px-3 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#085A30] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-md dark:border-[#2EB04B]/30 dark:bg-[#0D1E15]/85 dark:text-[#6EE7A8]">
                                SUBSCRIPTION CONFIRMED
                              </span>

                              <h3 className="mt-2 font-serif text-[21px] font-bold leading-[1.16] tracking-[-0.015em] text-[#171717] dark:text-white sm:text-[23px]">
                                Subscription{' '}
                                <span className="italic text-[#087A42] dark:text-[#2EB04B]">
                                  Confirmed
                                </span>
                              </h3>

                              <p className="mt-1.5 max-w-[380px] text-[12.5px] leading-[1.5] text-[#454D47] dark:text-white/78 sm:text-[13px]">
                                {subscribedMessage}
                              </p>
                            </m.div>

                            {/* Delicate Progress Hairline + Inline Countdown & Reset */}
                            <m.div
                              initial={
                                prefersReducedMotion
                                  ? false
                                  : { opacity: 0, y: 6 }
                              }
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.28,
                                delay: prefersReducedMotion ? 0 : 0.18,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="mt-3.5 flex w-full max-w-[310px] flex-col items-center gap-2"
                            >
                              <div className="h-1 w-full overflow-hidden rounded-full bg-[#087A42]/12 dark:bg-white/10">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-[#087A42] via-[#16A34A] to-[#C99726] transition-all duration-1000 ease-linear dark:from-[#2EB04B] dark:to-[#E5C158]"
                                  style={{
                                    width: `${((resetCountdown ?? 0) / 10) * 100}%`,
                                  }}
                                />
                              </div>

                              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11.5px]">
                                <span className="font-medium text-[#4E534F] dark:text-white/65">
                                  Ready in{' '}
                                  <span
                                    data-testid="briefing-countdown"
                                    className="font-semibold tabular-nums text-[#087A42] dark:text-[#6EE7A8]"
                                  >
                                    {resetCountdown}s
                                  </span>
                                </span>
                                <span
                                  aria-hidden="true"
                                  className="h-3 w-px bg-black/15 dark:bg-white/20"
                                />
                                <button
                                  type="button"
                                  onClick={handleResetSuccess}
                                  className="group/reset inline-flex cursor-pointer items-center gap-1.5 border-b border-[#C99726] pb-0.5 text-[12px] font-bold text-[#085A30] transition-colors hover:text-[#087A42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087A42] focus-visible:ring-offset-4 dark:border-[#E5C158] dark:text-[#6EE7A8] dark:hover:text-white"
                                >
                                  <span>Subscribe another email</span>
                                  <RotateCcw
                                    className="h-3 w-3 text-[#1C2A21] transition-transform duration-300 group-hover/reset:-rotate-45 dark:text-[#E5C158]"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </m.div>
                          </m.div>
                        ) : (
                          <m.div
                            key="briefing-form-panel"
                            initial={
                              prefersReducedMotion
                                ? false
                                : { opacity: 0, scale: 0.985 }
                            }
                            animate={{ opacity: 1, scale: 1 }}
                            exit={
                              prefersReducedMotion
                                ? undefined
                                : { opacity: 0, scale: 0.98 }
                            }
                            transition={{
                              duration: 0.24,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            {/* Header Row: Small Glass Mail Tile + Heading & Description */}
                            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
                              <div className="relative isolate flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/60 dark:bg-[#112219]/75">
                                <div
                                  aria-hidden="true"
                                  className={`pointer-events-none absolute inset-0 z-0 rounded-2xl ${LIQUID_GLASS_BEVEL_SHADOW}`}
                                />
                                <div
                                  aria-hidden="true"
                                  className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
                                  style={{
                                    backdropFilter: 'url("#container-glass")',
                                  }}
                                />
                                <Mail
                                  className="relative z-10 h-6 w-6 text-[#087A42] dark:text-[#2EB04B]"
                                  strokeWidth={1.75}
                                  aria-hidden="true"
                                />
                              </div>

                              <div>
                                <h3 className="text-[20px] font-bold tracking-tight text-[#171B18] dark:text-white sm:text-[22px]">
                                  Subscribe to Our Business Briefing
                                </h3>
                                <p className="mt-1 text-[13.5px] leading-relaxed text-[#4E534F] dark:text-white/70 sm:text-[14px]">
                                  Your curated update on UAE business, compliance
                                  and opportunities.
                                </p>
                              </div>
                            </div>

                            <form
                              onSubmit={handleSubmit(onSubmit)}
                              noValidate
                              className="mt-6 space-y-3.5"
                            >
                              <div>
                                <label
                                  htmlFor="briefing-email"
                                  className="sr-only"
                                >
                                  Business email address
                                </label>
                                <div className="relative flex items-center">
                                  <Mail
                                    className="pointer-events-none absolute left-4 h-4.5 w-4.5 text-[#5D635F] dark:text-white/55"
                                    strokeWidth={1.75}
                                    aria-hidden="true"
                                  />
                                  <input
                                    id="briefing-email"
                                    type="email"
                                    autoComplete="email"
                                    spellCheck={false}
                                    placeholder="Enter your business email address"
                                    aria-invalid={Boolean(
                                      errors.email || serverError
                                    )}
                                    aria-describedby={
                                      errors.email || serverError
                                        ? 'briefing-email-error'
                                        : undefined
                                    }
                                    {...register('email', {
                                      onChange: () => {
                                        if (serverError) setServerError(null);
                                      },
                                    })}
                                    className="h-12 w-full rounded-full border border-black/10 bg-white/82 pl-11 pr-5 text-[14px] text-[#171717] placeholder:text-[#6B706C] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-200 focus:border-[#087A42]/55 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#087A42]/20 dark:border-white/14 dark:bg-[#101C16]/85 dark:text-white dark:placeholder:text-white/45 dark:focus:border-[#2EB04B]/60 dark:focus:ring-[#2EB04B]/20"
                                  />
                                </div>

                                {(errors.email || serverError) && (
                                  <p
                                    id="briefing-email-error"
                                    role="alert"
                                    className="mt-2 pl-4 text-[12.5px] font-medium text-[#C2242B] dark:text-[#F87171]"
                                  >
                                    {errors.email?.message ?? serverError}
                                  </p>
                                )}
                              </div>

                              {/* Full-Width Green Water-Container Glass Bottle Button */}
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative isolate inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border border-[#D4AF37]/55 bg-[linear-gradient(180deg,#16A34A_0%,#00843D_50%,#064E27_100%)] px-8 text-[14.5px] font-semibold tracking-wide text-white shadow-[0_12px_28px_-6px_rgba(0,132,61,0.48)] transition-all duration-300 hover:scale-[1.015] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A05A] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 dark:bg-[linear-gradient(180deg,#2EB04B_0%,#0E8A48_52%,#064523_100%)]"
                              >
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute inset-0 z-0 rounded-full shadow-[inset_0_2px_3px_rgba(255,255,255,0.55),inset_0_-3px_6px_rgba(0,25,12,0.5),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.65),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.65),inset_0_0_8px_4px_rgba(255,255,255,0.14)]"
                                />
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute inset-x-3 top-1 z-[1] h-[44%] rounded-full bg-gradient-to-b from-white/50 via-white/15 to-transparent"
                                />
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute inset-x-8 bottom-1 z-[1] h-[24%] rounded-full bg-gradient-to-t from-[#8BE8AC]/45 to-transparent"
                                />

                                <span className="relative z-10 inline-flex items-center gap-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
                                  {isSubmitting ? (
                                    <>
                                      <Loader2
                                        className="h-4 w-4 animate-spin"
                                        aria-hidden="true"
                                      />
                                      <span>Subscribing...</span>
                                    </>
                                  ) : (
                                    <>
                                      <span>Subscribe to the Briefing</span>
                                      <ArrowRight
                                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                        aria-hidden="true"
                                      />
                                    </>
                                  )}
                                </span>
                              </button>
                            </form>

                            {/* Trust Message */}
                            <div className="mt-4 flex items-center justify-center gap-2 text-[12.5px] text-[#4E534F] dark:text-white/65">
                              <ShieldCheck
                                className="h-4 w-4 shrink-0 text-[#087A42] dark:text-[#2EB04B]"
                                strokeWidth={1.8}
                                aria-hidden="true"
                              />
                              <span>
                                No spam. Just relevant UAE business updates.
                              </span>
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </MotionTiltCard>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

export default BusinessBriefingSection;
