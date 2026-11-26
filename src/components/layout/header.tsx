'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowUpRight, ShieldCheck, Briefcase, FileCheck, Award, FileText } from 'lucide-react';
import { m, AnimatePresence } from 'motion/react';
import { ThemeToggle } from './theme-toggle';

type Country = 'ae' | 'in';

interface HeaderProps {
  country?: Country;
}

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const NAV: Record<Country, NavLink[]> = {
  ae: [
    { label: 'Home', href: '/ae' },
    { label: 'About Us', href: '/ae/about' },
    { label: 'Services', href: '/ae/services', hasDropdown: true },
    { label: 'Branches', href: '/ae/branches' },
    { label: 'Gallery', href: '/ae/gallery' },
    { label: 'Career', href: '/ae/career' },
    { label: 'Blog', href: '/ae/blog' },
    { label: 'Contact', href: '/ae/contact' },
  ],
  in: [
    { label: 'Home', href: '/in' },
    { label: 'About Us', href: '/in/about' },
    { label: 'Courses', href: '/in/courses' },
    { label: 'Teachers', href: '/in/teachers' },
    { label: 'Admissions', href: '/in/admissions' },
    { label: 'Contact', href: '/in/contact' },
  ],
};

const UAE_SERVICES_DROPDOWN = [
  {
    icon: Briefcase,
    title: 'Business Setup & Licensing',
    desc: 'Mainland, Freezone & Offshore company formation',
    href: '/ae/services#business-setup',
  },
  {
    icon: ShieldCheck,
    title: 'PRO & Government Services',
    desc: 'Labour, Immigration, Tasheel, Amer & VIP clearing',
    href: '/ae/services#pro-services',
  },
  {
    icon: FileCheck,
    title: 'Visa & Document Processing',
    desc: 'Golden Visa, Investor, Employment & Family visas',
    href: '/ae/services#visas',
  },
  {
    icon: Award,
    title: 'ICV & ISO Certifications',
    desc: 'In-Country Value score improvement & ISO compliance',
    href: '/ae/services#certifications',
  },
  {
    icon: FileText,
    title: 'Trade Mark & Legal Attestation',
    desc: 'MOFA, Embassy & Ministry brand protection',
    href: '/ae/services#trademark',
  },
];

function UAEFlag() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] border border-black/10 dark:border-white/20 shadow-xs"
    >
      <span className="absolute inset-y-0 left-0 w-[28%] bg-[#E4002B]" />
      <span className="absolute left-[28%] right-0 top-0 h-1/3 bg-[#00732F]" />
      <span className="absolute left-[28%] right-0 top-1/3 h-1/3 bg-white" />
      <span className="absolute bottom-0 left-[28%] right-0 h-1/3 bg-black" />
    </span>
  );
}

function IndiaFlag() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] border border-black/10 dark:border-white/20 shadow-xs"
    >
      <span className="absolute inset-x-0 top-0 h-1/3 bg-[#FF9933]" />
      <span className="absolute inset-x-0 top-1/3 flex h-1/3 items-center justify-center bg-white">
        <span className="h-1 w-1 rounded-full border border-[#000080]" />
      </span>
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[#128807]" />
    </span>
  );
}

/**
 * EmeraldRibbonConnector — Left UAE Satin Ribbon Connector
 * Connects the Logo Capsule directly to the Central Navigation Capsule.
 * Single continuous emerald-green ribbon with controlled S-shaped twist,
 * pure satin gradient, specular crest highlight, soft lustrous core beam,
 * and zero protrusion outside capsule borders (starts X=0 Y=26..34.5 inside Logo, ends X=54 Y=13..21.5 inside Nav).
 */
function EmeraldRibbonConnector() {
  return (
    <div
      className="relative z-10 hidden h-[48px] w-[50px] xl:w-[56px] shrink-0 items-center justify-center -mx-2 xl:-mx-2.5 lg:flex pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 56 48"
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {/* Light Mode: Pure Emerald Satin Gradient */}
          <linearGradient id="emeraldSatinPureLight" x1="0" y1="35" x2="56" y2="13" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#007A38" />
            <stop offset="25%" stopColor="#00843D" />
            <stop offset="50%" stopColor="#0FA958" />
            <stop offset="75%" stopColor="#00843D" />
            <stop offset="100%" stopColor="#007A38" />
          </linearGradient>

          {/* Dark Mode: Luminous Pure Emerald Satin Gradient */}
          <linearGradient id="emeraldSatinPureDark" x1="0" y1="35" x2="56" y2="13" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00843D" />
            <stop offset="25%" stopColor="#16A05A" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="75%" stopColor="#16A05A" />
            <stop offset="100%" stopColor="#0FA958" />
          </linearGradient>
        </defs>

        {/* 1. Continuous Emerald Satin Ribbon Body (Zero Protrusion & Zero SVG Filter Cost) */}
        <path
          d="M 0 26 C 18 27.5, 36 13, 54 13 L 54 21.5 C 36 21.5, 18 36, 0 34.5 Z"
          className="fill-[url(#emeraldSatinPureLight)] dark:fill-[url(#emeraldSatinPureDark)]"
        />

        {/* 2. Top Satin Specular Sheen (Reflective highlight along upper crest) */}
        <path
          d="M 2 26 C 18 27.5, 36 13, 54 13"
          className="stroke-white/95 dark:stroke-white/85"
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {/* 3. Longitudinal Lustrous Core Light Beam */}
        <path
          d="M 4 28.5 C 20 30, 36 15.5, 52 15.5"
          className="stroke-white/35 dark:stroke-white/30"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * CrimsonRibbonConnector — Right UAE Satin Ribbon Connector
 * Connects the Central Navigation Capsule directly to the Utility Capsule.
 * Single continuous crimson-red ribbon with elegant mirrored curve,
 * pure satin gradient, specular crest highlight, soft lustrous core beam,
 * and zero protrusion outside capsule borders (starts X=2 Y=13..21.5 inside Nav, ends X=56 Y=26..34.5 inside Utility).
 */
function CrimsonRibbonConnector() {
  return (
    <div
      className="relative z-10 hidden h-[48px] w-[50px] xl:w-[56px] shrink-0 items-center justify-center -mx-2 xl:-mx-2.5 lg:flex pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 56 48"
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {/* Light Mode: Pure Crimson Satin Gradient */}
          <linearGradient id="crimsonSatinPureLight" x1="0" y1="13" x2="56" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B81D24" />
            <stop offset="25%" stopColor="#E4002B" />
            <stop offset="50%" stopColor="#FA203B" />
            <stop offset="75%" stopColor="#E4002B" />
            <stop offset="100%" stopColor="#B81D24" />
          </linearGradient>

          {/* Dark Mode: Luminous Pure Crimson Satin Gradient */}
          <linearGradient id="crimsonSatinPureDark" x1="0" y1="13" x2="56" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C2242B" />
            <stop offset="25%" stopColor="#E4002B" />
            <stop offset="50%" stopColor="#FF3352" />
            <stop offset="75%" stopColor="#E4002B" />
            <stop offset="100%" stopColor="#D1182A" />
          </linearGradient>
        </defs>

        {/* 1. Continuous Crimson Satin Ribbon Body (Zero Protrusion & Zero SVG Filter Cost) */}
        <path
          d="M 2 13 C 20 13, 38 27.5, 56 26 L 56 34.5 C 38 36, 20 21.5, 2 21.5 Z"
          className="fill-[url(#crimsonSatinPureLight)] dark:fill-[url(#crimsonSatinPureDark)]"
        />

        {/* 2. Top Satin Specular Sheen (Reflective highlight along upper crest) */}
        <path
          d="M 2 13 C 20 13, 38 27.5, 54 26"
          className="stroke-white/95 dark:stroke-white/85"
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {/* 3. Longitudinal Lustrous Core Light Beam */}
        <path
          d="M 4 15.5 C 20 15.5, 36 30, 52 28.5"
          className="stroke-white/35 dark:stroke-white/30"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function Header({ country = 'ae' }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [countryOpen, setCountryOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const servicesDropdownRef = React.useRef<HTMLDivElement>(null);

  const isUAE = country === 'ae';
  const links = NAV[country];

  const isActive = (href: string) =>
    href === `/${country}` ? pathname === href : pathname.startsWith(href);

  // Close dropdowns on outside click
  React.useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const switchCountry = (target: Country) => {
    setCountryOpen(false);
    if (target === 'ae' && !pathname.startsWith('/ae')) {
      router.push(`/ae${pathname.replace(/^\/in/, '')}`);
    } else if (target === 'in' && !pathname.startsWith('/in')) {
      router.push(`/in${pathname.replace(/^\/ae/, '')}`);
    }
  };

  return (
    <header className="relative z-50 w-full px-3 pb-1 pt-2 sm:pt-2.5 lg:pt-2 xl:pt-2.5 sm:px-5">
      <div className="mx-auto max-w-[1160px]">
        {/* ============ THREE-PART CONNECTED NAVBAR ARCHITECTURE (DUAL SATIN RIBBONS & LIQUID GLASS) ============ */}
        <div className="relative flex items-center justify-between lg:justify-center w-full">
          
          {/* ================= 1. LEFT SECTION — LOGO CAPSULE (UAE GREEN BRAND BORDER) ================= */}
          <div className="relative z-20 flex h-[48px] shrink-0 items-center rounded-full bg-[#FAF8F5]/95 px-3 sm:px-3.5 lg:w-auto lg:px-4 backdrop-blur-sm border-[1.5px] border-[#00843D]/80 dark:border-[#16A05A]/80 shadow-[0_2px_12px_-2px_rgba(0,132,61,0.2),inset_0_1.5px_2px_0_rgba(255,255,255,0.95)] dark:bg-[#111313]/95 dark:shadow-[0_0_16px_rgba(22,160,90,0.3),inset_0_1.5px_2px_0_rgba(255,255,255,0.18)] transition-[border-color,box-shadow] duration-150">
            <Link
              href={`/${country}`}
              aria-label="Takhlees Business Home"
              className="group flex items-center gap-2 sm:gap-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <Image
                src="/icons/takhlees-emblem.png"
                alt="Takhlees emblem"
                width={32}
                height={32}
                priority
                className="h-7 w-7 xl:h-7.5 xl:w-7.5 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="text-right text-[11.5px] lg:text-[12px] font-bold text-neutral-800 dark:text-[#A5AAA7]">
                  تـخـلـيـص
                </span>
                <span className="mt-0.5 text-[13.5px] lg:text-[14px] xl:text-[14.5px] font-extrabold uppercase tracking-wide text-neutral-900 dark:text-[#F5F5F2]">
                  TAKHLEES
                </span>
              </div>
            </Link>
          </div>

          {/* ================= 1ST FLOWING RIBBON: EMERALD GREEN SATIN CONNECTOR ================= */}
          <EmeraldRibbonConnector />

          {/* ================= 2. CENTER SECTION — MAIN NAVIGATION CAPSULE (UAE FLAG COLOR FLOW BORDER) ================= */}
          <nav
            className="nav-center-flag-border relative z-20 hidden flex-1 max-w-[650px] xl:max-w-[680px] h-[48px] items-center justify-evenly rounded-full bg-[#FAF8F5]/94 px-3 lg:flex xl:px-4 backdrop-blur-sm shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.95),inset_0_-1.5px_2px_0_rgba(0,0,0,0.04),0_8px_24px_-4px_rgba(0,0,0,0.08),0_2px_6px_0_rgba(0,0,0,0.04)] dark:bg-[#111313]/90 dark:shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.16),inset_0_-1px_2px_0_rgba(0,0,0,0.6),0_12px_36px_-4px_rgba(0,0,0,0.75),0_2px_8px_0_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-150"
            aria-label="Main Navigation"
          >
            {links.map((link) => {
              const active = isActive(link.href);

              if (link.hasDropdown && isUAE) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    ref={servicesDropdownRef}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setServicesOpen((v) => !v)}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      className={`group relative inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] xl:text-[12.5px] 2xl:text-[13px] tracking-normal transition-colors duration-200 select-none ${
                        active
                          ? 'font-semibold text-[#00843D] dark:text-[#16A05A]'
                          : 'font-medium text-neutral-700 hover:text-neutral-900 dark:text-[#A5AAA7] dark:hover:text-[#F5F5F2]'
                      }`}
                    >
                      {/* Signature Liquid Glass Active Water Drop */}
                      {active && (
                        <m.span
                          layoutId={`liquid-glass-water-drop-${country}`}
                          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                          className="absolute inset-0 z-0 rounded-full bg-gradient-to-b from-white/95 via-white/40 to-emerald-500/15 border border-emerald-600/25 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,132,61,0.22),0_4px_14px_-2px_rgba(0,132,61,0.25)] backdrop-blur-md dark:from-white/20 dark:via-white/5 dark:to-[#16A05A]/25 dark:border-[#16A05A]/40 dark:shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(22,160,90,0.3),0_4px_16px_-2px_rgba(0,0,0,0.7),0_0_14px_-2px_rgba(22,160,90,0.35)]"
                          aria-hidden="true"
                        >
                          {/* Liquid surface tension water meniscus */}
                          <span className="pointer-events-none absolute inset-x-2 top-0.5 h-[40%] rounded-full bg-gradient-to-b from-white/80 to-transparent dark:from-white/35" />
                        </m.span>
                      )}
                      {!active && (
                        <span
                          className="absolute inset-0 z-0 rounded-full bg-black/[0.04] opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-white/[0.06]"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                      <ChevronDown
                        className={`relative z-10 h-3 w-3 opacity-70 transition-transform duration-200 ${
                          servicesOpen ? 'rotate-180 text-[#00843D] dark:text-[#16A05A]' : ''
                        }`}
                      />
                    </Link>

                    {/* Interactive Glass Services Dropdown */}
                    <AnimatePresence>
                      {servicesOpen && (
                        <m.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.16 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 rounded-2xl border border-white/90 bg-[#FAF8F5]/96 p-2 shadow-2xl backdrop-blur-md dark:border-white/12 dark:bg-[#111313]/96 z-50"
                        >
                          <div className="px-3 py-1.5 border-b border-black/5 dark:border-white/5 mb-1">
                            <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                              UAE Corporate Services
                            </span>
                          </div>
                          <div className="space-y-0.5">
                            {UAE_SERVICES_DROPDOWN.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  onClick={() => setServicesOpen(false)}
                                  className="group flex items-start gap-2.5 rounded-xl p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-[#1A1D1D]"
                                >
                                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-[#00843D] dark:bg-[#16A05A]/15 dark:text-[#16A05A] transition-colors group-hover:bg-[#00843D] group-hover:text-white dark:group-hover:bg-[#16A05A] dark:group-hover:text-black">
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-800 group-hover:text-[#00843D] dark:text-[#F5F5F2] dark:group-hover:text-[#16A05A]">
                                      <span>{item.title}</span>
                                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                    </div>
                                    <p className="text-[11px] text-neutral-500 dark:text-[#A5AAA7] line-clamp-1">
                                      {item.desc}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] xl:text-[12.5px] 2xl:text-[13px] tracking-normal transition-colors duration-200 select-none ${
                    active
                      ? 'font-semibold text-[#00843D] dark:text-[#16A05A]'
                      : 'font-medium text-neutral-700 hover:text-neutral-900 dark:text-[#A5AAA7] dark:hover:text-[#F5F5F2]'
                  }`}
                >
                  {/* Signature Liquid Glass Active Water Drop */}
                  {active && (
                    <m.span
                      layoutId={`liquid-glass-water-drop-${country}`}
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                      className="absolute inset-0 z-0 rounded-full bg-gradient-to-b from-white/95 via-white/40 to-emerald-500/15 border border-emerald-600/25 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,132,61,0.22),0_4px_14px_-2px_rgba(0,132,61,0.25)] backdrop-blur-md dark:from-white/20 dark:via-white/5 dark:to-[#16A05A]/25 dark:border-[#16A05A]/40 dark:shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(22,160,90,0.3),0_4px_16px_-2px_rgba(0,0,0,0.7),0_0_14px_-2px_rgba(22,160,90,0.35)]"
                      aria-hidden="true"
                    >
                      {/* Liquid surface tension water meniscus */}
                      <span className="pointer-events-none absolute inset-x-2 top-0.5 h-[40%] rounded-full bg-gradient-to-b from-white/80 to-transparent dark:from-white/35" />
                    </m.span>
                  )}
                  {!active && (
                    <span
                      className="absolute inset-0 z-0 rounded-full bg-black/[0.04] opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-white/[0.06]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ================= 2ND FLOWING RIBBON: CRIMSON RED SATIN CONNECTOR ================= */}
          <CrimsonRibbonConnector />

          {/* ================= 3. RIGHT SECTION — UTILITY CAPSULE (UAE CRIMSON RED BRAND BORDER) ================= */}
          <div className="relative z-20 flex h-[48px] shrink-0 items-center justify-between gap-2 sm:gap-2.5 rounded-full bg-[#FAF8F5]/95 px-3 sm:px-3.5 lg:w-[204px] lg:px-4 backdrop-blur-sm border-[1.5px] border-[#E4002B]/80 dark:border-[#E4002B]/80 shadow-[0_2px_12px_-2px_rgba(228,0,43,0.2),inset_0_1.5px_2px_0_rgba(255,255,255,0.95)] dark:bg-[#111313]/95 dark:shadow-[0_0_16px_rgba(228,0,43,0.3),inset_0_1.5px_2px_0_rgba(255,255,255,0.18)] transition-[border-color,box-shadow] duration-150">
            {/* Country Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCountryOpen((v) => !v)}
                aria-expanded={countryOpen}
                aria-haspopup="listbox"
                aria-label="Select country"
                className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold text-neutral-800 transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-[#F5F5F2] dark:hover:bg-white/10"
              >
                {isUAE ? <UAEFlag /> : <IndiaFlag />}
                <span className="font-semibold text-xs">{isUAE ? 'UAE' : 'India'}</span>
                <ChevronDown
                  className={`h-3 w-3 opacity-70 transition-transform duration-200 ${countryOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {countryOpen && (
                  <m.div
                    role="listbox"
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-0 z-50 mt-2 w-36 rounded-2xl border border-white/90 bg-[#FAF8F5]/98 p-1 shadow-xl backdrop-blur-md dark:border-white/12 dark:bg-[#111313]/98"
                  >
                    {(['ae', 'in'] as const).map((c) => {
                      const selected = country === c;
                      return (
                        <button
                          key={c}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          onClick={() => switchCountry(c)}
                          className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs transition-colors ${
                            selected
                              ? 'bg-emerald-500/10 font-semibold text-[#00843D] dark:bg-[#1A1D1D] dark:text-[#16A05A]'
                              : 'text-neutral-700 hover:bg-neutral-100 dark:text-[#A5AAA7] dark:hover:bg-[#1A1D1D] dark:hover:text-[#F5F5F2]'
                          }`}
                        >
                          {c === 'ae' ? <UAEFlag /> : <IndiaFlag />}
                          <span className="font-medium">{c === 'ae' ? 'UAE' : 'India'}</span>
                        </button>
                      );
                    })}
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subtle Divider */}
            <span className="h-4 w-px bg-neutral-300 dark:bg-[#303432]" aria-hidden="true" />

            {/* Nimbus Liquid Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Trigger (Visible on < lg) */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
              className="touch-manipulation rounded-full p-1.5 text-neutral-800 transition-colors hover:bg-black/5 dark:text-[#F5F5F2] dark:hover:bg-white/10 lg:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE EXPANDED DRAWER ================= */}
        <AnimatePresence>
          {mobileOpen && (
            <m.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2.5 rounded-3xl border border-black/10 bg-[#FAF8F5]/97 p-3 shadow-xl backdrop-blur-sm dark:border-white/12 dark:bg-[#111313]/97 lg:hidden z-50"
            >
              <nav className="flex flex-col gap-1">
                {links.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition-colors ${
                        active
                          ? 'bg-emerald-500/10 font-semibold text-[#00843D] dark:bg-[#1A1D1D] dark:text-[#16A05A]'
                          : 'text-neutral-700 hover:bg-neutral-100 dark:text-[#A5AAA7] dark:hover:bg-[#1A1D1D] dark:hover:text-[#F5F5F2]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-[#00843D] dark:bg-[#16A05A]" />}
                    </Link>
                  );
                })}
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;
