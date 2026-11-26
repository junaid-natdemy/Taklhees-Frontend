'use client';

import { useEffect, useRef } from 'react';
import {
  Award,
  Briefcase,
  Building2,
  CheckCircle2,
  FileCheck2,
  Globe,
  Landmark,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ThemeImage } from '@/components/ui/theme-image';
import { cn } from '@/lib/utils';
import {
  TESTIMONIAL_COLUMNS,
  type TestimonialItem,
  type TestimonialServiceIcon,
} from './testimonials-data';

const SERVICE_ICONS: Record<
  TestimonialServiceIcon,
  React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
> = {
  building: Building2,
  shield: ShieldCheck,
  'file-check': FileCheck2,
  landmark: Landmark,
  award: Award,
  briefcase: Briefcase,
  users: Users,
  globe: Globe,
  'check-circle': CheckCircle2,
};

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const Icon = SERVICE_ICONS[item.icon];

  return (
    <figure
      className={cn(
        'testimonial-liquid-glass group overflow-hidden rounded-[22px] p-6 transition-[transform,box-shadow] duration-200',
        'hover:-translate-y-0.5',
        'hover:shadow-[0_20px_42px_-12px_rgba(8,122,66,0.18)] dark:hover:shadow-[0_20px_44px_-12px_rgba(0,168,90,0.24)]'
      )}
    >
      {/* Top specular liquid gloss sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/95 to-transparent dark:via-white/35"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.45)_0%,transparent_70%)] transition-opacity duration-300 group-hover:opacity-90 dark:bg-[radial-gradient(circle,rgba(52,211,153,0.14)_0%,transparent_70%)]"
      />

      {/* Decorative Green Opening Quotation Mark */}
      <span
        aria-hidden="true"
        className="mb-2 block font-serif text-4xl leading-none tracking-tight text-[#087A42] dark:text-[#16A05A] select-none"
      >
        &ldquo;
      </span>

      <blockquote className="text-[14.5px] leading-[1.6] text-[#212121]/85 dark:text-white/85">
        {item.quote}
      </blockquote>

      <figcaption className="mt-5 flex items-center justify-between gap-3 pt-1">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-10 w-10 shrink-0 ring-1 ring-black/[0.06] dark:ring-white/[0.1]">
            {item.avatar ? (
              <AvatarImage
                src={item.avatar}
                alt={`${item.name} — ${item.role}`}
                loading="lazy"
              />
            ) : null}
            <AvatarFallback className="bg-[#087A42]/10 text-xs font-semibold text-[#087A42] dark:bg-[#16A05A]/15 dark:text-[#2EB04B]">
              {item.initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <cite className="block truncate text-[13.5px] font-semibold not-italic text-[#171717] dark:text-white">
              {item.name}
            </cite>
            <p className="truncate text-[12px] text-[#525252] dark:text-white/60">
              {item.role}
            </p>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.03] text-[#212121]/40 transition-colors duration-300 group-hover:bg-[#087A42]/10 group-hover:text-[#087A42] dark:bg-white/[0.04] dark:text-white/35 dark:group-hover:bg-[#16A05A]/15 dark:group-hover:text-[#16A05A]"
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection() {
  const [col1, col2, col3] = TESTIMONIAL_COLUMNS;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.removeAttribute('data-marquee-paused');
        } else {
          el.setAttribute('data-marquee-paused', 'true');
        }
      },
      { rootMargin: '150px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-[#F8F7F2] py-16 transition-colors duration-300 dark:bg-[#050807] sm:py-20 lg:py-24"
    >
      {/* Ambient Emerald Lighting for Liquid Glass Refraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_45%,rgba(8,122,66,0.10),transparent_72%)] dark:bg-[radial-gradient(ellipse_75%_55%_at_50%_45%,rgba(0,168,90,0.15),transparent_72%)]"
      />

      {/* Left UAE Green Decorative Ribbon Curve */}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 420"
        fill="none"
        className="pointer-events-none absolute -left-8 top-[46%] z-[1] h-[280px] w-[220px] -translate-y-1/2 opacity-80 sm:h-[340px] sm:w-[270px] lg:-left-2"
      >
        <defs>
          <linearGradient id="uae-ribbon-green" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#087A42" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#16A05A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#16A05A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-24 140 C 60 190, 155 245, 290 250 C 175 270, 75 245, -24 205 Z"
          fill="url(#uae-ribbon-green)"
        />
      </svg>

      {/* Right UAE Crimson Decorative Ribbon Curve */}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 420"
        fill="none"
        className="pointer-events-none absolute -right-8 top-[42%] z-[1] h-[280px] w-[220px] -translate-y-1/2 opacity-80 sm:h-[340px] sm:w-[270px] lg:-right-2"
      >
        <defs>
          <linearGradient id="uae-ribbon-red" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C2242B" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#D92332" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#D92332" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M344 120 C 245 170, 145 205, 18 190 C 135 225, 245 200, 344 165 Z"
          fill="url(#uae-ribbon-red)"
        />
      </svg>

      {/* Bottom Panoramic Dubai Skyline & Emerald-Gold Wave */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[240px] select-none sm:h-[300px] lg:h-[350px]"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 35%, #000 72%, #000 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 35%, #000 72%, #000 100%)',
        }}
      >
        <ThemeImage
          lightSrc="/images/testimonials/dubai-skyline-testimonials-light.webp"
          darkSrc="/images/testimonials/dubai-skyline-testimonials-dark.webp"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          lightClassName="opacity-75 mix-blend-multiply"
          darkClassName="opacity-60 mix-blend-screen"
          className="block object-cover object-bottom"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Editorial Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-[1.5px] w-7 rounded-full bg-[#087A42] dark:bg-[#16A05A]"
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#212121]/75 dark:text-white/75 sm:text-xs">
              REAL EXPERIENCES <span className="mx-1.5 text-[#087A42] dark:text-[#16A05A]">&bull;</span> REAL TRUST
            </p>
            <span
              aria-hidden="true"
              className="h-[1.5px] w-7 rounded-full bg-[#C2242B] dark:bg-[#D92332]"
            />
          </div>

          <h2
            id="testimonials-heading"
            className="text-3xl font-bold tracking-tight text-[#171717] dark:text-white sm:text-4xl lg:text-[44px] lg:leading-[1.14]"
          >
            Trusted by Businesses
            <br />
            Across{' '}
            <span className="relative inline-block italic text-[#087A42] dark:text-[#16A05A]">
              the UAE.
              <svg
                aria-hidden="true"
                viewBox="0 0 180 14"
                fill="none"
                className="pointer-events-none absolute -bottom-1.5 left-0 h-3 w-full"
              >
                <path
                  d="M3 10.5 C 48 3.5, 128 2.5, 177 8.5"
                  stroke="#C2242B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#525252] dark:text-white/70 sm:text-[15.5px]">
            Discover why businesses and individuals trust Takhlees for their
            business setup, documentation and PRO service needs.
          </p>
        </div>

        {/* 3-Column Vertical Infinite-Scrolling Marquee (2 Visible Rows) */}
        <div
          className="relative mt-10 h-[430px] overflow-hidden sm:mt-12 sm:h-[460px] lg:h-[470px]"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)',
          }}
        >
          <div className="grid h-full grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {/* Column 1 — Scrolls Up */}
            <div data-testid="testimonial-column-1" className="h-full overflow-hidden">
              <InfiniteSlider
                direction="vertical"
                speed={34}
                pauseOnHover
                gap={20}
              >
                {col1.map((item) => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </InfiniteSlider>
            </div>

            {/* Column 2 — Scrolls Down (Tablet & Desktop) */}
            <div
              data-testid="testimonial-column-2"
              className="hidden h-full overflow-hidden md:block"
            >
              <InfiniteSlider
                direction="vertical"
                reverse
                speed={28}
                pauseOnHover
                gap={20}
              >
                {col2.map((item) => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </InfiniteSlider>
            </div>

            {/* Column 3 — Scrolls Up (Desktop) */}
            <div
              data-testid="testimonial-column-3"
              className="hidden h-full overflow-hidden lg:block"
            >
              <InfiniteSlider
                direction="vertical"
                speed={38}
                pauseOnHover
                gap={20}
              >
                {col3.map((item) => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </InfiniteSlider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
