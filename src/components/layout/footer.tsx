'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Layers,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { m, useReducedMotion } from 'motion/react';
import { siteConfig } from '@/config/site';
import { useSectionInView } from '@/hooks/use-section-in-view';

interface FooterProps {
  country?: 'ae' | 'in';
}

function UAEFlag() {
  return (
    <svg
      viewBox="0 0 24 16"
      className="h-3.5 w-5 shrink-0 rounded-[3px] shadow-xs ring-1 ring-white/15"
      aria-hidden="true"
    >
      <rect width="6" height="16" fill="#E4002B" />
      <rect x="6" width="18" height="5.33" fill="#00843D" />
      <rect x="6" y="5.33" width="18" height="5.34" fill="#FFFFFF" />
      <rect x="6" y="10.67" width="18" height="5.33" fill="#171717" />
    </svg>
  );
}

function IndiaFlag() {
  return (
    <svg
      viewBox="0 0 24 16"
      className="h-3.5 w-5 shrink-0 rounded-[3px] shadow-xs ring-1 ring-white/15"
      aria-hidden="true"
    >
      <rect width="24" height="5.33" fill="#FF9933" />
      <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
      <rect y="10.67" width="24" height="5.33" fill="#138808" />
      <circle cx="12" cy="8" r="1.8" fill="none" stroke="#000080" strokeWidth="0.7" />
    </svg>
  );
}

const SOCIAL_ICONS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    svg: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1.02 4.6 1.02 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2ZM1.3 7.1h3.4V18H1.3V7.1Zm5.4 0h3.25v1.49h.05c.45-.86 1.56-1.76 3.21-1.76 3.43 0 4.07 2.26 4.07 5.2V18h-3.4v-5.28c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79V18H6.7V7.1Z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    svg: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.65" className="h-3.5 w-3.5" aria-hidden="true">
        <rect x="2.5" y="2.5" width="15" height="15" rx="4.2" />
        <circle cx="10" cy="10" r="3.4" />
        <circle cx="14.3" cy="5.7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    label: 'YouTube',
    svg: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M18.1 6.1a2.3 2.3 0 0 0-1.6-1.6C15.1 4.1 10 4.1 10 4.1s-5.1 0-6.5.4A2.3 2.3 0 0 0 1.9 6.1 24 24 0 0 0 1.5 10a24 24 0 0 0 .4 3.9 2.3 2.3 0 0 0 1.6 1.6c1.4.4 6.5.4 6.5.4s5.1 0 6.5-.4a2.3 2.3 0 0 0 1.6-1.6 24 24 0 0 0 .4-3.9 24 24 0 0 0-.4-3.9ZM8.3 12.6V7.4L12.8 10l-4.5 2.6Z" />
      </svg>
    ),
  },
  {
    id: 'x',
    label: 'X',
    svg: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M15.2 2.5h2.7l-5.9 6.7 6.9 8.3h-5.4l-4.2-5.5-4.9 5.5H1.7l6.3-7.2L1.4 2.5h5.5l3.8 5 4.5-5Zm-.9 13.5h1.5L6.1 4H4.5l9.8 12Z" />
      </svg>
    ),
  },
] as const;

export function Footer({ country = 'ae' }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const contact = siteConfig.contacts[country];
  const isUAE = country === 'ae';
  const footerRef = useRef<HTMLElement>(null);
  const inView = useSectionInView(footerRef, '120px');
  const prefersReducedMotion = useReducedMotion();

  const primaryLinks = isUAE
    ? [
        { label: 'PRO Services', href: '/ae/services' },
        { label: 'Company Setup', href: '/ae/services' },
        { label: 'Branch Locator', href: '/ae/branches' },
        { label: 'Careers', href: '/ae/career' },
      ]
    : [
        { label: 'Courses', href: '/in/courses' },
        { label: 'Faculty', href: '/in/teachers' },
        { label: 'Admissions', href: '/in/admissions' },
        { label: 'Enquiries', href: '/in/contact' },
      ];

  const legalLinks = [
    { label: 'Privacy Policy', href: `/${country}/privacy` },
    { label: 'Terms of Service', href: `/${country}/terms` },
    { label: 'Support', href: `/${country}/contact` },
  ];

  return (
    <footer
      ref={footerRef}
      data-section-paused={!inView ? 'true' : undefined}
      className="relative isolate overflow-hidden bg-[linear-gradient(155deg,#063D29_0%,#043121_48%,#022C20_100%)] text-[#F7F5ED]"
    >
      {/* ═══════════════ LAYERED EMERALD, GOLD & SKYLINE BACKGROUND ═══════════════ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      >
        {/* Seamless Top Emerald Bridge Continuing from Section Bottom Waves */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 bg-gradient-to-b from-[#032D18] via-[#032D18]/85 to-transparent" />

        {/* Soft Atmospheric Emerald & Champagne-Gold Ambient Glows (zero blur kernel cost) */}
        <div className="absolute -left-24 top-0 h-[320px] w-[480px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(22,160,90,0.16),transparent_72%)]" />
        <div className="absolute right-[8%] top-[12%] h-[340px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(214,182,108,0.10),rgba(8,122,66,0.08)_55%,transparent_76%)]" />

        {/* Subtle Moving Champagne-Gold Glass Reflection Sweep */}
        <span
          className="leadership-glass-sheen pointer-events-none absolute inset-y-0 left-0 z-[1] w-[36%] bg-gradient-to-r from-transparent via-[#D6B66C]/[0.05] to-transparent"
          style={{ animationDuration: '14s' }}
        />

        {/* Subtle Low-Opacity Dubai Skyline Silhouette (Bottom-Right) */}
        <div
          className="absolute bottom-8 right-0 z-[1] h-[135px] w-[320px] opacity-[0.22] sm:h-[160px] sm:w-[460px] lg:h-[180px] lg:w-[560px]"
          style={{
            maskImage:
              'radial-gradient(ellipse 80% 80% at 78% 72%, #000 18%, rgba(0,0,0,0.4) 55%, transparent 88%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 80% at 78% 72%, #000 18%, rgba(0,0,0,0.4) 55%, transparent 88%)',
          }}
        >
          <Image
            src="/images/testimonials/dubai-skyline-dark.webp"
            alt=""
            width={1920}
            height={320}
            loading="lazy"
            className="h-full w-full object-cover object-right-bottom opacity-80 sepia-[0.2] hue-rotate-[85deg] saturate-[1.15]"
          />
        </div>

        {/* Lower Flowing Organic Emerald Waves & Thin Champagne-Gold Crest Lines */}
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          fill="none"
          className="absolute inset-x-0 bottom-0 z-[2] h-[82px] w-full sm:h-[96px]"
        >
          <defs>
            <linearGradient id="footer-wave-back" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#085338" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#043423" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#085C3E" stopOpacity="0.48" />
            </linearGradient>
            <linearGradient id="footer-wave-front" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#02261B" stopOpacity="0.92" />
              <stop offset="55%" stopColor="#053826" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#022117" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="footer-gold-line" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#D6B66C" stopOpacity="0.18" />
              <stop offset="48%" stopColor="#F5DDA0" stopOpacity="0.85" />
              <stop offset="72%" stopColor="#D6B66C" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#D6B66C" stopOpacity="0.22" />
            </linearGradient>
          </defs>

          <g className="takhlees-loader-wave-slow">
            <path
              d="M-60 95 C 240 48, 520 148, 860 110 C 1140 78, 1320 48, 1500 72 L1500 200 L-60 200 Z"
              fill="url(#footer-wave-back)"
            />
            <path
              d="M-60 95 C 240 48, 520 148, 860 110 C 1140 78, 1320 48, 1500 72"
              stroke="url(#footer-gold-line)"
              strokeOpacity="0.45"
              strokeWidth="1.1"
            />
          </g>

          <g className="takhlees-loader-wave-front">
            <path
              d="M-60 128 C 260 88, 560 165, 920 128 C 1180 100, 1340 62, 1500 84 L1500 200 L-60 200 Z"
              fill="url(#footer-wave-front)"
            />
            <path
              d="M-60 128 C 260 88, 560 165, 920 128 C 1180 100, 1340 62, 1500 84"
              stroke="url(#footer-gold-line)"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>

      {/* ═══════════════ MAIN 4-COLUMN CONTENT ═══════════════ */}
      <div className="relative z-10 mx-auto max-w-[1220px] px-4 pt-7 pb-0 sm:px-6 lg:px-8 lg:pt-7 lg:pb-0">
        <m.div
          initial={prefersReducedMotion ? false : { opacity: 0.99, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-10 md:gap-y-6 lg:grid-cols-[1.35fr_0.85fr_0.95fr_1.15fr] lg:gap-0 lg:divide-x lg:divide-[#D6B66C]/14"
        >
          {/* ─── COLUMN 1: BRAND IDENTITY ─── */}
          <div className="flex flex-col items-start lg:pr-8">
            <Link href={`/${country}`} className="group inline-flex items-center gap-3">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                <Image
                  src="/icons/takhlees-emblem.png"
                  alt="Takhlees Logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain drop-shadow-[0_2px_10px_rgba(214,182,108,0.24)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-[18px] font-bold leading-none tracking-[0.16em] text-[#F7F5ED]">
                TAKHLEES
              </span>
            </Link>

            {/* Subtle Champagne-Gold Divider */}
            <div
              aria-hidden="true"
              className="mt-2.5 h-[1.5px] w-11 rounded-full bg-gradient-to-r from-[#D6B66C] to-[#D6B66C]/25"
            />

            <p className="mt-2.5 max-w-[290px] text-[13.5px] leading-[1.55] text-[#F7F5ED]/78">
              {isUAE
                ? 'Your trusted partner for UAE company formation, government document clearing, and executive PRO services.'
                : 'Premier career training academy empowering professionals with comprehensive UAE business setup and PR mastery.'}
            </p>

            {/* Minimal Circular Liquid-Glass Social Containers */}
            <div className="mt-4 flex items-center gap-2.5" aria-label="Official Takhlees channels">
              {SOCIAL_ICONS.map((social) => (
                <Link
                  key={social.id}
                  href={`/${country}/contact`}
                  aria-label={`${social.label} — Connect with Takhlees`}
                  title={`${social.label} — Connect with Takhlees`}
                  className="group relative isolate flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[#D6B66C]/30 bg-white/[0.06] text-[#F7F5ED]/82 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_2px_rgba(0,0,0,0.24),0_4px_12px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D6B66C]/75 hover:bg-white/[0.12] hover:text-[#F5DDA0] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),0_6px_16px_rgba(0,0,0,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B66C]"
                >
                  {social.svg}
                </Link>
              ))}
            </div>
          </div>

          {/* ─── COLUMN 2: SERVICES / ACADEMY ─── */}
          <div className="lg:px-7 lg:pt-1">
            <div className="flex min-h-[22px] items-center gap-2">
              <Layers className="h-3.5 w-3.5 shrink-0 text-[#D6B66C]" aria-hidden="true" />
              <h3 className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#F7F5ED]">
                {isUAE ? 'SERVICES' : 'ACADEMY'}
              </h3>
            </div>

            <ul className="mt-3 space-y-2 text-[13.5px]">
              {primaryLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-[#F7F5ED]/78 transition-colors duration-200 hover:text-[#F7F5ED]"
                  >
                    <span className="relative">
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#D6B66C]/85 transition-transform duration-200 group-hover:scale-x-100"
                      />
                    </span>
                    <ArrowRight
                      className="h-3.5 w-3.5 text-[#D6B66C]/75 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#F5DDA0]"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── COLUMN 3: LEGAL & POLICY ─── */}
          <div className="lg:px-7 lg:pt-1">
            <div className="flex min-h-[22px] items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#D6B66C]" aria-hidden="true" />
              <h3 className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#F7F5ED]">
                LEGAL &amp; POLICY
              </h3>
            </div>

            <ul className="mt-3 space-y-2 text-[13.5px]">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-[#F7F5ED]/78 transition-colors duration-200 hover:text-[#F7F5ED]"
                  >
                    <span className="relative">
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#D6B66C]/85 transition-transform duration-200 group-hover:scale-x-100"
                      />
                    </span>
                    <ArrowRight
                      className="h-3.5 w-3.5 text-[#D6B66C]/75 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#F5DDA0]"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── COLUMN 4: CONTACT ─── */}
          <div className="lg:pl-7 lg:pt-1">
            <div className="flex min-h-[22px] items-center gap-2">
              <Mail className="h-3.5 w-3.5 shrink-0 text-[#D6B66C]" aria-hidden="true" />
              <h3 className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#F7F5ED]">
                CONTACT
              </h3>
            </div>

            <div className="mt-3 space-y-2.5 text-[13.5px]">
              {/* Location */}
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-white/15 bg-white/[0.07] text-[#D6B66C] shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_2px_rgba(0,0,0,0.25),0_4px_10px_rgba(0,0,0,0.18)] backdrop-blur-[4px]">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="leading-snug text-[#F7F5ED]/82">{contact.location}</span>
              </div>

              {/* Email */}
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-3 transition-colors"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-white/15 bg-white/[0.07] text-[#D6B66C] shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_2px_rgba(0,0,0,0.25),0_4px_10px_rgba(0,0,0,0.18)] backdrop-blur-[4px] transition-colors group-hover:border-[#D6B66C]/55 group-hover:bg-white/[0.13]">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="break-all text-[#4ADE80] transition-colors group-hover:text-[#F5DDA0] group-hover:underline group-hover:underline-offset-4 sm:break-normal">
                  {contact.email}
                </span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                className="group flex items-center gap-3 transition-colors"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-white/15 bg-white/[0.07] text-[#D6B66C] shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_2px_rgba(0,0,0,0.25),0_4px_10px_rgba(0,0,0,0.18)] backdrop-blur-[4px] transition-colors group-hover:border-[#D6B66C]/55 group-hover:bg-white/[0.13]">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="text-[#F7F5ED]/82 transition-colors group-hover:text-[#F7F5ED]">
                  {contact.phone}
                </span>
              </a>
            </div>
          </div>
        </m.div>

        {/* ═══════════════ BOTTOM COPYRIGHT BAR ═══════════════ */}
        <div className="mt-5">
          <div
            aria-hidden="true"
            className="h-px w-full bg-gradient-to-r from-transparent via-[#D6B66C]/42 to-transparent"
          />

          <div className="flex min-h-[52px] flex-col items-center justify-center gap-2 py-2.5 text-[12px] text-[#F7F5ED]/72 sm:flex-row sm:justify-between">
            <p className="text-center sm:text-left">
              © {currentYear} Takhlees Business. All rights reserved.
            </p>

            <div className="flex shrink-0 items-center gap-2.5 whitespace-nowrap">
              <span
                aria-hidden="true"
                className="hidden h-3.5 w-px bg-[#D6B66C]/30 sm:inline-block"
              />
              <UAEFlag />
              <span className="font-medium text-[#F7F5ED]/80">
                Official UAE &amp; India platform.
              </span>
              <IndiaFlag />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
