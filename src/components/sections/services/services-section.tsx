'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  Layers,
  Percent,
  Stethoscope,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  UAE_SERVICES,
  type ServiceIconName,
  type ServiceItem,
} from './services-data';

const TAG_GAP_PX = 6; // matches gap-1.5

const SERVICE_ICONS: Record<
  ServiceIconName,
  React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
> = {
  stethoscope: Stethoscope,
  layers: Layers,
  users: Users,
  percent: Percent,
};

function ServiceSmartTags({
  tags,
  serviceId,
  serviceTitle,
  reducedMotion,
}: {
  tags: string[];
  serviceId: string;
  serviceTitle: string;
  reducedMotion: boolean | null;
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(Math.min(2, tags.length));
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const computeFitCount = useCallback(
    (start: number) => {
      const container = containerRef.current;
      if (!container || tags.length === 0) return Math.min(2, tags.length);
      const availWidth = container.clientWidth;
      if (availWidth <= 0) return Math.min(2, tags.length);

      let used = 0;
      let count = 0;
      for (let offset = 0; offset < tags.length; offset++) {
        const idx = (start + offset) % tags.length;
        const el = measureRefs.current[idx];
        const w = el ? el.offsetWidth : 90;
        const nextUsed = used + (count > 0 ? TAG_GAP_PX : 0) + w;
        if (nextUsed > availWidth && count >= 1) break;
        used = nextUsed;
        count++;
      }
      return Math.max(1, count);
    },
    [tags]
  );

  useLayoutEffect(() => {
    setVisibleCount(computeFitCount(startIndex));
  }, [startIndex, computeFitCount]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => {
      setVisibleCount(computeFitCount(startIndex));
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [startIndex, computeFitCount]);

  const canCycle = visibleCount < tags.length || startIndex !== 0;

  const visibleTags = Array.from(
    { length: Math.min(visibleCount, tags.length) },
    (_, offset) => {
      const idx = (startIndex + offset) % tags.length;
      return { label: tags[idx], key: `${idx}-${tags[idx]}` };
    }
  );

  const handleNext = () => {
    setStartIndex((prev) => (prev + visibleCount) % tags.length);
  };

  return (
    <div className="relative mt-3 flex w-full items-center justify-between gap-2">
      {/* Hidden measurement pills to measure exact rendered width of each tag */}
      <div
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 flex flex-nowrap items-center gap-1.5"
      >
        {tags.map((tag, idx) => (
          <span
            key={`measure-${tag}`}
            ref={(el) => {
              measureRefs.current[idx] = el;
            }}
            className="shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium leading-tight"
          >
            {tag}
          </span>
        ))}
      </div>

      <div ref={containerRef} className="min-w-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={`${startIndex}-${visibleCount}`}
            id={`${serviceId}-tags`}
            aria-label={`${serviceTitle} highlights`}
            initial={reducedMotion ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-nowrap items-center gap-1.5"
          >
            {visibleTags.map(({ label, key }) => (
              <li
                key={key}
                className="max-w-full shrink-0 truncate whitespace-nowrap rounded-full border border-white/80 bg-white/55 px-2.5 py-0.5 text-[10.5px] font-medium leading-tight text-[#1F2937] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-sm dark:border-white/15 dark:bg-white/[0.06] dark:text-white/85 dark:shadow-none"
              >
                {label}
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>

      {canCycle && (
        <button
          type="button"
          onClick={handleNext}
          data-testid={`next-tags-${serviceId}`}
          aria-label={`Next ${serviceTitle} tags`}
          title="Next tags"
          className={cn(
            'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087A42] dark:focus-visible:ring-[#16A05A]',
            'border-[#087A42]/25 bg-white/75 text-[#087A42] shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_2px_6px_rgba(0,80,40,0.12)] hover:bg-[#087A42] hover:text-white',
            'dark:border-[#16A05A]/35 dark:bg-[#16A05A]/15 dark:text-[#16A05A] dark:shadow-none dark:hover:bg-[#16A05A] dark:hover:text-[#050807]'
          )}
        >
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

function ServiceCard({
  service,
  index,
  reducedMotion,
}: {
  service: ServiceItem;
  index: number;
  reducedMotion: boolean | null;
}) {
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <motion.article
      data-testid={`service-card-${service.id}`}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'service-liquid-glass group relative flex flex-col justify-between overflow-hidden rounded-[24px] transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-[0_24px_48px_-14px_rgba(0,90,45,0.22)] dark:hover:shadow-[0_24px_50px_-14px_rgba(0,168,90,0.24)]',
        'sm:min-h-[214px] lg:min-h-[218px]'
      )}
    >
      {/* Upper Domed Water-Glass Specular Reflection Band */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-0.5 z-20 h-[36%] rounded-t-[22px] bg-gradient-to-b from-white/65 via-white/15 to-transparent dark:from-white/[0.11] dark:via-white/[0.02] dark:to-transparent"
      />

      {/* Top Water Meniscus Crisp Highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 z-20 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-white/40"
      />

      {/* Right-Side Blended Service Photography */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative h-40 w-full shrink-0 overflow-hidden sm:absolute sm:inset-y-0 sm:right-0 sm:h-full sm:w-[39%] lg:w-[41%]"
      >
        <div
          className="relative h-full w-full"
          style={{
            maskImage:
              'radial-gradient(ellipse 95% 96% at 68% 50%, #000 52%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 95% 96% at 68% 50%, #000 52%, transparent 100%)',
          }}
        >
          <Image
            src={service.image}
            alt={service.imageAlt}
            width={service.imageWidth}
            height={service.imageHeight}
            sizes="(max-width: 639px) 100vw, 320px"
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04] dark:brightness-[0.88] dark:contrast-[1.05]"
          />
        </div>

        {/* Soft Gradient Blend into Liquid Glass Surface */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/85 via-white/25 to-transparent sm:bg-gradient-to-r sm:from-white/85 sm:via-white/25 sm:to-transparent dark:from-[#0B110E]/90 dark:via-[#0B110E]/35 dark:sm:from-[#0B110E]/90 dark:sm:via-[#0B110E]/40" />

        {/* Bottom-Right Emerald Corner Ribbon */}
        <svg
          viewBox="0 0 140 90"
          fill="none"
          className="pointer-events-none absolute -bottom-1 -right-1 h-16 w-24 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-[68px] sm:w-[102px]"
        >
          <path
            d="M140 16 C 95 45, 55 72, 14 90 L140 90 Z"
            className="fill-[#087A42] dark:fill-[#16A05A]"
          />
        </svg>
      </div>

      {/* Left Content Area */}
      <div className="relative z-10 flex flex-1 flex-col justify-between p-5 sm:w-[66%] sm:p-5 lg:w-[65%] lg:p-[22px]">
        <div>
          {/* 1. Service Icon + 2. Title + 3. Description */}
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-[#087A42]/12 text-[#087A42] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_10px_rgba(8,122,66,0.12)] backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#087A42]/18 dark:border-[#16A05A]/30 dark:bg-[#16A05A]/15 dark:text-[#16A05A] dark:shadow-none">
              <Icon className="h-4.5 w-4.5" aria-hidden />
            </span>
            <div className="min-w-0">
              <h3 className="text-[16.5px] font-bold leading-snug tracking-tight text-[#171717] dark:text-white sm:text-[17.5px]">
                {service.title}
              </h3>
              <p className="mt-1 text-[12.5px] leading-[1.45] text-[#404040] dark:text-white/75 sm:text-[13px]">
                {service.description}
              </p>
            </div>
          </div>

          {/* 4. Single-Row Cycling Smart Tags */}
          <ServiceSmartTags
            tags={service.tags}
            serviceId={service.id}
            serviceTitle={service.title}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* 5. Learn More Link */}
        <div className="mt-3 pt-1">
          <Link
            href={service.href}
            aria-label={`Learn more about ${service.title}`}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#087A42] transition-colors hover:text-[#065F33] focus-visible:outline-none focus-visible:underline dark:text-[#16A05A] dark:hover:text-[#2EB04B]"
          >
            <span>Learn More</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function ServicesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-[#F8F7F2] py-8 transition-colors duration-300 dark:bg-[#050807] sm:py-10 lg:py-12"
    >
      {/* Richer Ambient Emerald Lighting Behind Liquid Glass Cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_55%,rgba(8,122,66,0.09),transparent_72%)] dark:bg-[radial-gradient(ellipse_75%_55%_at_50%_55%,rgba(0,168,90,0.14),transparent_72%)]"
      />

      {/* Left Sweeping Emerald Ribbon */}
      <svg
        aria-hidden="true"
        viewBox="0 0 360 280"
        fill="none"
        className="pointer-events-none absolute -left-8 top-0 z-0 h-[190px] w-[250px] opacity-85 sm:h-[240px] sm:w-[320px]"
      >
        <defs>
          <linearGradient id="services-left-arc" x1="0" y1="0.8" x2="1" y2="0">
            <stop offset="0%" stopColor="#087A42" stopOpacity="0.95" />
            <stop offset="58%" stopColor="#16A05A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#16A05A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-20 230 C 80 155, 195 95, 340 20 C 205 110, 90 175, -20 260 Z"
          fill="url(#services-left-arc)"
        />
      </svg>

      {/* Top-Right Subtle Dubai Skyline Edge Blend */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-0 h-[195px] w-[540px] select-none opacity-40 sm:h-[235px] sm:w-[700px] lg:opacity-50"
        style={{
          maskImage:
            'radial-gradient(ellipse 76% 68% at 74% 46%, #000 20%, rgba(0,0,0,0.45) 52%, transparent 88%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 76% 68% at 74% 46%, #000 20%, rgba(0,0,0,0.45) 52%, transparent 88%)',
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
        {/* Seamless 4-Side Merge into Section Background */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F8F7F2] via-[#F8F7F2]/80 to-transparent dark:from-[#050807] dark:via-[#050807]/80" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#F8F7F2] to-transparent dark:from-[#050807]" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#F8F7F2] via-[#F8F7F2]/60 to-transparent dark:from-[#050807] dark:via-[#050807]/60" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Eyebrow Pill Flanked by Thin Green Lines */}
          <div className="mb-3 flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-[1.5px] w-8 rounded-full bg-[#087A42] dark:bg-[#16A05A]"
            />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#087A42]/30 bg-white/80 px-3.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#087A42] shadow-xs backdrop-blur-sm dark:border-[#16A05A]/35 dark:bg-[#0D1310]/85 dark:text-[#16A05A]">
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              <span>OUR SERVICES</span>
            </span>
            <span
              aria-hidden="true"
              className="h-[1.5px] w-8 rounded-full bg-[#087A42] dark:bg-[#16A05A]"
            />
          </div>

          <h2
            id="services-heading"
            className="text-2xl font-bold leading-[1.13] tracking-tight text-[#171717] dark:text-white sm:text-3xl lg:text-[36px]"
          >
            Providing Comprehensive
            <br />
            Solutions for{' '}
            <span className="relative inline-block text-[#087A42] dark:text-[#16A05A]">
              Our Clients
              <svg
                aria-hidden="true"
                viewBox="0 0 220 14"
                fill="none"
                className="pointer-events-none absolute -bottom-1.5 left-0 h-3 w-full"
              >
                <path
                  d="M3 10.5 C 62 3.5, 152 2.5, 217 8"
                  stroke="#C2242B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-2.5 max-w-xl text-xs leading-relaxed text-[#525252] dark:text-white/70 sm:text-sm">
            Takhlees Transactions LLC offers licenses, approvals, and
            documentation for seamless company setup and regulatory support in
            the UAE.
          </p>
        </motion.div>

        {/* 2x2 Responsive Services Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 md:grid-cols-2 lg:gap-5">
          {UAE_SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
