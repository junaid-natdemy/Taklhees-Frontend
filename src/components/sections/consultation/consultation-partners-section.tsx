'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { m, useReducedMotion } from 'motion/react';
import { GOVERNMENT_PARTNERS } from './partners-data';

const MARQUEE_PARTNERS = [
  ...GOVERNMENT_PARTNERS,
  ...GOVERNMENT_PARTNERS,
  ...GOVERNMENT_PARTNERS,
];

export function ConsultationPartnersSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    let rafId = 0;
    let lastTime: number | null = null;
    let offset = 0;
    let velocity = 46; // px per second
    let isVisible = true;

    // Cache geometry outside rAF to prevent forced layout reflows during scroll
    let vpWidth = viewport.clientWidth || 1000;
    let copyWidth = track.scrollWidth / 3;
    let itemStride = copyWidth / GOVERNMENT_PARTNERS.length;

    const measure = () => {
      vpWidth = viewport.clientWidth || 1000;
      copyWidth = track.scrollWidth / 3;
      itemStride = copyWidth / GOVERNMENT_PARTNERS.length;
    };

    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(track);

    const tick = (now: number) => {
      if (!isVisible) {
        rafId = 0;
        return;
      }

      if (lastTime === null) lastTime = now;
      const dt = Math.min(0.05, Math.max(0, (now - lastTime) / 1000));
      lastTime = now;

      if (copyWidth > 0 && itemStride > 0) {
        const targetVel = isHoveredRef.current ? 0 : 46;
        const ease = 1 - Math.exp(-dt / 0.18);
        velocity += (targetVel - velocity) * ease;
        offset = (offset + velocity * dt) % copyWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;

        // Pure-math center-lens magnification (0 getBoundingClientRect calls per frame)
        const vpCenter = vpWidth / 2;
        const halfWidth = Math.max(1, vpCenter);

        for (let i = 0; i < itemRefs.current.length; i++) {
          const el = itemRefs.current[i];
          if (!el) continue;
          const itemCenter = (i + 0.5) * itemStride - offset;
          if (itemCenter < -itemStride || itemCenter > vpWidth + itemStride) continue;
          const normDist = Math.abs(itemCenter - vpCenter) / halfWidth;
          const focus = Math.exp(-(normDist * normDist) * 4.2);
          const scale = 0.88 + 0.34 * focus;
          const opacity = 0.66 + 0.34 * focus;
          el.style.transform = `scale(${scale.toFixed(3)})`;
          el.style.opacity = opacity.toFixed(3);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        section.dataset.sectionPaused = isVisible ? '' : 'true';
        if (isVisible && rafId === 0) {
          lastTime = null;
          rafId = requestAnimationFrame(tick);
        } else if (!isVisible && rafId !== 0) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { rootMargin: '120px' }
    );
    io.observe(section);

    rafId = requestAnimationFrame(tick);
    return () => {
      io.disconnect();
      ro.disconnect();
      if (rafId !== 0) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="consultation"
      aria-labelledby="consultation-heading"
      className="relative overflow-hidden bg-[#F8F7F2] pt-16 pb-20 transition-colors duration-300 dark:bg-[#050807] sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
    >
      {/* ================= RICH ATMOSPHERIC BACKGROUND ================= */}
      {/* Layered Emerald & Champagne Radial Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_22%_34%,rgba(8,122,66,0.10),rgba(212,175,55,0.05)_50%,transparent_75%),radial-gradient(ellipse_55%_45%_at_78%_28%,rgba(229,193,88,0.12),transparent_72%)] dark:bg-[radial-gradient(ellipse_65%_50%_at_22%_34%,rgba(0,168,90,0.16),rgba(212,175,55,0.05)_52%,transparent_75%),radial-gradient(ellipse_55%_45%_at_78%_28%,rgba(0,168,90,0.12),transparent_72%)]"
      />

      {/* Faint Architectural Dot-Grid Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(8, 122, 66, 0.16) 1px, transparent 0)',
          backgroundSize: '34px 34px',
          maskImage:
            'radial-gradient(ellipse 75% 70% at 32% 42%, #000 12%, transparent 82%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 70% at 32% 42%, #000 12%, transparent 82%)',
        }}
      />

      {/* Subtle Islamic Geometric Lattice in Upper-Left Corner */}
      <svg
        aria-hidden="true"
        viewBox="0 0 260 220"
        fill="none"
        className="pointer-events-none absolute left-0 top-0 z-0 h-44 w-56 opacity-45 dark:opacity-25"
      >
        <defs>
          <pattern
            id="consult-geo-pattern"
            width="44"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M22 0 L44 22 L22 44 L0 22 Z M22 7 L37 22 L22 37 L7 22 Z"
              stroke="#C99726"
              strokeWidth="0.7"
              strokeOpacity="0.45"
              fill="none"
            />
          </pattern>
          <radialGradient id="consult-geo-fade" cx="0%" cy="0%" r="85%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="consult-geo-mask">
            <rect width="260" height="220" fill="url(#consult-geo-fade)" />
          </mask>
        </defs>
        <rect
          width="260"
          height="220"
          fill="url(#consult-geo-pattern)"
          mask="url(#consult-geo-mask)"
        />
      </svg>

      {/* Top Sweeping S-Curve Emerald, Sage & Champagne-Gold Horizon Wave */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[115px] w-full sm:h-[145px] lg:h-[165px]"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 18%, #000 44%, rgba(0,0,0,0.38) 78%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 18%, #000 44%, rgba(0,0,0,0.38) 78%, transparent 100%)',
        }}
      >
        <defs>
          <linearGradient id="consult-top-sage" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#087A42" stopOpacity="0.14" />
            <stop offset="52%" stopColor="#16A05A" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#C99726" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="consult-top-emerald" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#054424" stopOpacity="0.54" />
            <stop offset="42%" stopColor="#087A42" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#054424" stopOpacity="0.10" />
          </linearGradient>
          <linearGradient id="consult-top-gold" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#C99726" stopOpacity="0.26" />
            <stop offset="46%" stopColor="#F5DDA0" stopOpacity="0.88" />
            <stop offset="82%" stopColor="#E5C158" stopOpacity="0.54" />
            <stop offset="100%" stopColor="#C99726" stopOpacity="0.14" />
          </linearGradient>
        </defs>
        <path
          d="M0 0 L1440 0 L1440 86 C 1140 128, 860 36, 560 92 C 320 136, 130 96, 0 68 Z"
          fill="url(#consult-top-sage)"
        />
        <path
          d="M0 0 L1440 0 L1440 52 C 1180 94, 880 18, 580 68 C 340 108, 145 72, 0 42 Z"
          fill="url(#consult-top-emerald)"
        />
        <path
          d="M0 42 C 145 72, 340 108, 580 68 C 880 18, 1180 94, 1440 52"
          stroke="url(#consult-top-gold)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Full-Width Sweeping Emerald, Ivory & Champagne-Gold Wave Behind Partners Capsule */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[190px] w-full sm:h-[225px] lg:h-[250px]"
      >
        <defs>
          <linearGradient id="consult-wave-ivory" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EFECE2" stopOpacity="0.88" />
            <stop offset="55%" stopColor="#E4DFCF" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#D9D3C0" stopOpacity="0.24" />
          </linearGradient>
          <linearGradient id="consult-wave-emerald" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#043D20" stopOpacity="0.88" />
            <stop offset="48%" stopColor="#087A42" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#043A1F" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="consult-wave-gold" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.12" />
            <stop offset="35%" stopColor="#F3D37A" stopOpacity="0.82" />
            <stop offset="68%" stopColor="#C99726" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Soft Ivory Overlap Wave */}
        <path
          d="M0 95 C 280 35, 580 155, 920 105 C 1180 68, 1330 35, 1440 52 L1440 280 L0 280 Z"
          fill="url(#consult-wave-ivory)"
          className="dark:hidden"
        />

        {/* Deep Emerald Sweeping Wave */}
        <path
          d="M0 155 C 250 105, 540 205, 880 150 C 1140 108, 1310 68, 1440 92 L1440 280 L0 280 Z"
          fill="url(#consult-wave-emerald)"
          opacity="0.82"
        />

        {/* Champagne-Gold Crest Contour */}
        <path
          d="M0 155 C 250 105, 540 205, 880 150 C 1140 108, 1310 68, 1440 92"
          stroke="url(#consult-wave-gold)"
          strokeWidth="1.8"
        />
      </svg>

      {/* Right Edge UAE Crimson/Emerald Ribbon sweeping behind the Liquid Glass Capsule */}
      <svg
        aria-hidden="true"
        viewBox="0 0 420 220"
        fill="none"
        className="pointer-events-none absolute -right-8 bottom-12 z-[2] h-[150px] w-[280px] opacity-80 sm:h-[185px] sm:w-[360px]"
      >
        <defs>
          <linearGradient id="consult-right-ribbon" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C2242B" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#087A42" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#087A42" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M440 45 C 325 102, 200 128, 20 118 C 185 162, 315 142, 440 96 Z"
          fill="url(#consult-right-ribbon)"
        />
      </svg>

      {/* Seamless Bottom Fade Into BusinessBriefingSection (#F8F7F2 / #050807) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-20 bg-gradient-to-b from-transparent via-[#F8F7F2]/75 to-[#F8F7F2] dark:via-[#050807]/75 dark:to-[#050807]"
      />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ================= UPPER: CONSULTATION HERO AREA ================= */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-4">
          {/* Left Side: Editorial Copy */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0.99, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 lg:col-span-5"
          >
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-[1.5px] w-7 rounded-full bg-[#087A42] dark:bg-[#16A05A]"
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#212121]/80 dark:text-white/75 sm:text-xs">
                CONSULTATION
              </p>
            </div>

            {/* Heading */}
            <h2
              id="consultation-heading"
              className="text-[28px] font-bold leading-[1.16] tracking-tight text-[#171717] dark:text-white sm:text-[34px] lg:text-[38px]"
            >
              Make an Appointment
              <br />
              with{' '}
              <span className="relative inline-block text-[#087A42] dark:text-[#16A05A]">
                Our Consultant
                <svg
                  aria-hidden="true"
                  viewBox="0 0 240 14"
                  fill="none"
                  className="pointer-events-none absolute -bottom-1.5 left-0 h-3 w-full"
                >
                  <path
                    d="M3 10.5 C 68 3.5, 168 2.5, 237 8"
                    stroke="#C2242B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-[#525252] dark:text-white/70 sm:text-[15.5px]">
              Get expert guidance for your business setup, documentation and PRO
              service needs in the UAE.
            </p>
          </m.div>

          {/* Right Side: Seamlessly Blended Background Consultation Photography */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0.99, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-7"
          >
            <div className="relative mx-auto aspect-[16/10] w-full max-w-[740px] lg:-mr-6 lg:ml-auto">
              {/* Sweeping Emerald Green Curve Accent */}
              <svg
                aria-hidden="true"
                viewBox="0 0 220 420"
                fill="none"
                className="pointer-events-none absolute -left-6 top-2 z-20 hidden h-[92%] w-[150px] lg:block"
              >
                <defs>
                  <linearGradient
                    id="consult-curve-green"
                    x1="0.8"
                    y1="0"
                    x2="0.1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#087A42" stopOpacity="0" />
                    <stop offset="22%" stopColor="#087A42" stopOpacity="0.88" />
                    <stop offset="68%" stopColor="#16A05A" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#16A05A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M175 10 C 95 115, 42 230, 8 410 C 26 240, 74 120, 145 10 Z"
                  fill="url(#consult-curve-green)"
                />
              </svg>

              {/* Multi-Side Feathered Mask so All 4 Edges Dissolve Into Background */}
              <div
                className="relative h-full w-full overflow-hidden"
                style={{
                  maskImage:
                    'radial-gradient(ellipse 72% 70% at 54% 52%, #000 32%, rgba(0,0,0,0.62) 56%, transparent 90%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 72% 70% at 54% 52%, #000 32%, rgba(0,0,0,0.62) 56%, transparent 90%)',
                }}
              >
                <Image
                  src="/images/consultation/uae-consultation.webp"
                  alt="UAE corporate business setup consultant meeting with clients in Abu Dhabi office"
                  width={1376}
                  height={768}
                  sizes="(max-width: 1024px) 100vw, 580px"
                  loading="lazy"
                  className="h-full w-full object-cover object-center dark:brightness-[0.88] dark:contrast-[1.05]"
                />
                {/* Top edge seamless dissolve */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F8F7F2] via-[#F8F7F2]/65 to-transparent dark:from-[#050807] dark:via-[#050807]/65"
                />
                {/* Bottom edge seamless dissolve */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F8F7F2] via-[#F8F7F2]/70 to-transparent dark:from-[#050807] dark:via-[#050807]/70"
                />
                {/* Left & Right edge seamless dissolve */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#F8F7F2] via-transparent to-[#F8F7F2]/90 dark:from-[#050807] dark:via-transparent dark:to-[#050807]/90"
                />
              </div>
            </div>
          </m.div>
        </div>

        {/* ================= LOWER: WATER-FLOW LIQUID GLASS GOVERNMENT PARTNERS ================= */}
        <m.div
          initial={prefersReducedMotion ? false : { opacity: 0.99, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 mt-4 lg:-mt-8"
        >
          {/* Centered Section Heading with Thin Green Lines */}
          <div className="mb-4 flex items-center justify-center gap-4 px-4">
            <span
              aria-hidden="true"
              className="h-[1px] w-10 rounded-full bg-[#087A42]/60 dark:bg-[#16A05A]/60 sm:w-16"
            />
            <h3 className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#087A42] dark:text-[#16A05A] sm:text-xs">
              UAE AUTHORITIES &amp; GOVERNMENT PORTALS
            </h3>
            <span
              aria-hidden="true"
              className="h-[1px] w-10 rounded-full bg-[#087A42]/60 dark:bg-[#16A05A]/60 sm:w-16"
            />
          </div>

          {/* Unified Water-Flow Liquid Glass Capsule */}
          <div
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={(e) => {
              isHoveredRef.current = false;
              e.currentTarget.style.setProperty('--mx', '50%');
              e.currentTarget.style.setProperty('--my', '50%');
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              e.currentTarget.style.setProperty('--mx', `${x.toFixed(1)}%`);
              e.currentTarget.style.setProperty('--my', `${y.toFixed(1)}%`);
            }}
            className="partners-liquid-glass group/glass mx-auto w-full overflow-hidden rounded-[30px] py-6 sm:rounded-full sm:py-7 lg:py-8"
          >
            {/* Upper Domed Glass Specular Reflection Band */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-1 h-[42%] rounded-full bg-gradient-to-b from-white/75 via-white/25 to-transparent dark:from-white/[0.14] dark:via-white/[0.04] dark:to-transparent"
            />

            {/* Top Water Meniscus Crisp Highlight */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-white/45"
            />

            {/* Cursor-Reactive Water-Drop Refraction Glow (Hover Only) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/glass:opacity-80 dark:hidden"
              style={{
                background:
                  'radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.5), rgba(8,122,66,0.06) 45%, transparent 75%)',
              }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-300 group-hover/glass:opacity-80 dark:block"
              style={{
                background:
                  'radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(22,160,90,0.22), rgba(255,255,255,0.05) 45%, transparent 75%)',
              }}
            />

            {/* Animated Liquid Caustic Shimmer Sweep */}
            <span
              aria-hidden="true"
              className="partners-water-shimmer pointer-events-none absolute inset-y-0 left-1/4 w-1/2 bg-gradient-to-r from-transparent via-white/55 to-transparent blur-md dark:via-emerald-300/[0.10]"
            />

            {/* Infinite Horizontal Marquee Viewport with Soft Left/Right Edge Mask */}
            <div
              ref={viewportRef}
              className="relative z-10 w-full overflow-hidden"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)',
              }}
            >
              {prefersReducedMotion ? (
                <div className="grid grid-cols-2 items-center gap-y-6 px-6 md:grid-cols-5 md:gap-y-0">
                  {GOVERNMENT_PARTNERS.map((partner) => (
                    <div
                      key={partner.id}
                      className="flex items-center justify-center px-4"
                    >
                      <Image
                        src={partner.src}
                        alt={partner.name}
                        width={partner.width}
                        height={partner.height}
                        loading="lazy"
                        className="h-11 w-auto max-w-[140px] select-none object-contain sm:h-12 lg:h-[54px] dark:[filter:drop-shadow(0_0_1px_rgba(255,255,255,0.72))]"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  ref={trackRef}
                  data-testid="partners-marquee-track"
                  className="flex w-max items-center will-change-transform"
                >
                  {MARQUEE_PARTNERS.map((partner, idx) => {
                    const isClone = idx >= GOVERNMENT_PARTNERS.length;
                    return (
                    <div
                      key={`${partner.id}-${idx}`}
                      aria-hidden={isClone || undefined}
                      className="flex shrink-0 items-center"
                    >
                      <div
                        ref={(el) => {
                          itemRefs.current[idx] = el;
                        }}
                        data-testid={`partner-logo-item-${idx}`}
                        className="flex h-16 w-[170px] items-center justify-center px-5 transition-[filter] duration-200 will-change-transform sm:w-[210px] sm:px-7 lg:w-[235px]"
                      >
                        <Image
                          src={partner.src}
                          alt={isClone ? '' : partner.name}
                          width={partner.width}
                          height={partner.height}
                          sizes="(max-width: 639px) 140px, 165px"
                          loading="lazy"
                          className="h-11 w-auto max-w-[145px] select-none object-contain sm:h-12 lg:h-[54px] lg:max-w-[165px] dark:[filter:drop-shadow(0_0_1px_rgba(255,255,255,0.72))]"
                        />
                      </div>
                      {/* Subtle Vertical Separator */}
                      <span
                        aria-hidden="true"
                        className="h-9 w-px shrink-0 bg-black/[0.08] dark:bg-white/[0.12]"
                      />
                    </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
