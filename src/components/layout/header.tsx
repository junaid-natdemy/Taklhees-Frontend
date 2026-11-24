'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowUpRight, ShieldCheck, Briefcase, FileCheck, Award, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
 * Desktop Wrapping Border & Ribbon Clasp for Logo Capsule (Green)
 * Wraps completely around the Logo Capsule border and smoothly flows
 * into an S-curve ribbon that clasps onto the top-left of the Main Nav Capsule.
 */
function LogoCapsuleBorderSvg() {
  return (
    <svg
      viewBox="0 0 270 56"
      className="absolute -top-1 -left-1 w-[270px] h-[56px] overflow-visible pointer-events-none z-20 hidden lg:block"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {/* Light Mode Green Gradient */}
        <linearGradient id="gPillGradLight" x1="0" y1="28" x2="270" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00843D" />
          <stop offset="50%" stopColor="#087A43" />
          <stop offset="82%" stopColor="#00843D" />
          <stop offset="100%" stopColor="#16A05A" />
        </linearGradient>

        {/* Dark Mode Luminous Emerald Gradient */}
        <linearGradient id="gPillGradDark" x1="0" y1="28" x2="270" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#087A43" />
          <stop offset="50%" stopColor="#16A05A" />
          <stop offset="100%" stopColor="#2EB04B" />
        </linearGradient>

        {/* Ambient Drop Shadows */}
        <filter id="gPillShadowLight" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#00843D" floodOpacity="0.32" />
        </filter>
        <filter id="gPillShadowDark" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#16A05A" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* 1. Sculpted 3D Green Border wrapping around Logo Capsule (216x48 pill at x=4, y=4) */}
      <rect
        x="4"
        y="4"
        width="216"
        height="48"
        rx="24"
        strokeWidth="3.2"
        className="stroke-[url(#gPillGradLight)] dark:stroke-[url(#gPillGradDark)] filter-[url(#gPillShadowLight)] dark:filter-[url(#gPillShadowDark)]"
      />

      {/* 2. Meniscus Light Reflection along top curvature of the Logo Capsule border */}
      <path
        d="M 28 4 L 192 4"
        stroke="rgba(255,255,255,0.95)"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="dark:stroke-white/60"
      />

      {/* 3. Flowing S-Ribbon Clasp: emerges from bottom of logo border (x=184, y=52) and loops up to top-left of nav capsule (x=266, y=4) */}
      <path
        d="M 184 52 C 210 52, 224 44, 234 28 C 242 14, 252 4, 266 4 L 266 14.5 C 254 14.5, 246 24, 238 36 C 228 48, 212 52, 184 52 Z"
        className="fill-[url(#gPillGradLight)] dark:fill-[url(#gPillGradDark)] filter-[url(#gPillShadowLight)] dark:filter-[url(#gPillShadowDark)]"
      />

      {/* 4. Meniscus light highlight along outer crest of the S-Ribbon */}
      <path
        d="M 184 52 C 210 52, 224 44, 234 28 C 242 14, 252 4, 266 4"
        stroke="rgba(255,255,255,0.95)"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="dark:stroke-white/70"
      />
    </svg>
  );
}

/**
 * Desktop Wrapping Border & Ribbon Clasp for Utility Capsule (Red)
 * Wraps completely around the Utility Capsule border and extends backwards
 * into an S-curve ribbon that clasps onto the bottom-right of the Main Nav Capsule.
 */
function UtilityCapsuleBorderSvg() {
  return (
    <svg
      viewBox="0 0 262 56"
      className="absolute -top-1 -left-[54px] w-[262px] h-[56px] overflow-visible pointer-events-none z-20 hidden lg:block"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {/* Light Mode Crimson-Red Gradient */}
        <linearGradient id="rPillGradLight" x1="0" y1="28" x2="262" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E4002B" />
          <stop offset="45%" stopColor="#C2242B" />
          <stop offset="100%" stopColor="#A31C1B" />
        </linearGradient>

        {/* Dark Mode Luminous Crimson Gradient */}
        <linearGradient id="rPillGradDark" x1="0" y1="28" x2="262" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E4002B" />
          <stop offset="45%" stopColor="#C2242B" />
          <stop offset="100%" stopColor="#8A1417" />
        </linearGradient>

        {/* Ambient Drop Shadows */}
        <filter id="rPillShadowLight" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#C2242B" floodOpacity="0.32" />
        </filter>
        <filter id="rPillShadowDark" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#C2242B" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* 1. Flowing S-Ribbon Clasp: emerges from bottom-right of nav capsule (x=0, y=52) and loops up to top-left of utility capsule (x=76, y=4) */}
      <path
        d="M 0 52 C 22 52, 38 44, 48 28 C 56 14, 64 4, 78 4 L 78 14.5 C 66 14.5, 58 24, 50 36 C 40 48, 24 52, 0 52 Z"
        className="fill-[url(#rPillGradLight)] dark:fill-[url(#rPillGradDark)] filter-[url(#rPillShadowLight)] dark:filter-[url(#rPillShadowDark)]"
      />

      {/* 2. Meniscus light highlight along outer crest of the Red S-Ribbon */}
      <path
        d="M 0 52 C 22 52, 38 44, 48 28 C 56 14, 64 4, 78 4"
        stroke="rgba(255,255,255,0.95)"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="dark:stroke-white/70"
      />

      {/* 3. Sculpted 3D Red Border wrapping around Utility Capsule (204x48 pill at x=54, y=4) */}
      <rect
        x="54"
        y="4"
        width="204"
        height="48"
        rx="24"
        strokeWidth="3.2"
        className="stroke-[url(#rPillGradLight)] dark:stroke-[url(#rPillGradDark)] filter-[url(#rPillShadowLight)] dark:filter-[url(#rPillShadowDark)]"
      />

      {/* 4. Meniscus Light Reflection along top curvature of the Utility Capsule border */}
      <path
        d="M 78 4 L 234 4"
        stroke="rgba(255,255,255,0.95)"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="dark:stroke-white/60"
      />
    </svg>
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
    <header className="sticky top-0 z-50 w-full px-3 pb-1 pt-2 sm:pt-2.5 lg:pt-2 xl:pt-2.5 sm:px-5">
      <div className="mx-auto max-w-[1160px]">
        {/* ============ THREE-PART CONNECTED NAVBAR ARCHITECTURE (WRAPPING BORDER CLASP & LIQUID GLASS) ============ */}
        <div className="relative flex items-center justify-between lg:justify-center w-full">
          
          {/* ================= 1. LEFT SECTION — LOGO CAPSULE (LIQUID GLASS + WRAPPING GREEN BORDER) ================= */}
          <div className="relative z-20 flex h-[48px] shrink-0 items-center rounded-full bg-[#FAF8F5]/90 px-3.5 sm:px-4 lg:w-[216px] lg:px-4.5 backdrop-blur-2xl border-2 border-[#00843D] lg:border-0 dark:border-[#16A05A] shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.95),inset_0_-1.5px_2px_0_rgba(0,132,61,0.06),0_8px_24px_-4px_rgba(0,0,0,0.08),0_2px_6px_0_rgba(0,0,0,0.04)] dark:bg-[#111313]/92 dark:shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.16),inset_0_-1px_2px_0_rgba(0,0,0,0.6),0_12px_36px_-4px_rgba(0,0,0,0.75),0_2px_8px_0_rgba(0,0,0,0.5)] transition-all duration-300">
            {/* Desktop Sculpted Wrapping Border & S-Ribbon Clasp */}
            <LogoCapsuleBorderSvg />

            <Link
              href={`/${country}`}
              aria-label="Takhlees Business Home"
              className="relative z-10 group flex items-center gap-2 sm:gap-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
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

          {/* ================= 2. CENTER SECTION — MAIN NAVIGATION CAPSULE (LIQUID GLASS) ================= */}
          <nav
            className="relative z-10 hidden flex-1 max-w-[640px] xl:max-w-[670px] h-[48px] items-center justify-evenly rounded-full bg-[#FAF8F5]/85 px-3 lg:flex xl:px-4 backdrop-blur-2xl border border-black/[0.08] dark:border-white/12 shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.95),inset_0_-1.5px_2px_0_rgba(0,132,61,0.06),0_8px_24px_-4px_rgba(0,0,0,0.08),0_2px_6px_0_rgba(0,0,0,0.04)] dark:bg-[#111313]/90 dark:shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.16),inset_0_-1px_2px_0_rgba(0,0,0,0.6),0_12px_36px_-4px_rgba(0,0,0,0.75),0_2px_8px_0_rgba(0,0,0,0.5)] transition-all duration-300 mx-2.5 xl:mx-3"
            aria-label="Main Navigation"
          >
            {/* Clasp Overlay: Top-Left Green Clasp */}
            <svg
              viewBox="0 0 80 48"
              className="absolute top-0 left-0 w-[80px] h-[48px] pointer-events-none overflow-visible z-0"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 0 24 C 0 10, 10 0, 24 0 L 76 0"
                strokeWidth="3.2"
                className="stroke-[#00843D] dark:stroke-[#16A05A]"
                strokeLinecap="round"
              />
              <path
                d="M 14 0 L 76 0"
                stroke="rgba(255,255,255,0.95)"
                strokeWidth="1.4"
                strokeLinecap="round"
                className="dark:stroke-white/60"
              />
            </svg>

            {/* Clasp Overlay: Bottom-Right Red Clasp */}
            <svg
              viewBox="0 0 80 48"
              className="absolute bottom-0 right-0 w-[80px] h-[48px] pointer-events-none overflow-visible z-0"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 4 48 L 56 48 C 70 48, 80 38, 80 24"
                strokeWidth="3.2"
                className="stroke-[#E4002B] dark:stroke-[#E4002B]"
                strokeLinecap="round"
              />
              <path
                d="M 4 48 L 56 48"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.2"
                strokeLinecap="round"
                className="dark:stroke-white/40"
              />
            </svg>
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
                        <motion.span
                          layoutId={`liquid-glass-water-drop-${country}`}
                          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                          className="absolute inset-0 z-0 rounded-full bg-gradient-to-b from-white/95 via-white/40 to-emerald-500/15 border border-emerald-600/25 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,132,61,0.22),0_4px_14px_-2px_rgba(0,132,61,0.25)] backdrop-blur-md dark:from-white/20 dark:via-white/5 dark:to-[#16A05A]/25 dark:border-[#16A05A]/40 dark:shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(22,160,90,0.3),0_4px_16px_-2px_rgba(0,0,0,0.7),0_0_14px_-2px_rgba(22,160,90,0.35)]"
                          aria-hidden="true"
                        >
                          {/* Liquid surface tension water meniscus */}
                          <span className="pointer-events-none absolute inset-x-2 top-0.5 h-[40%] rounded-full bg-gradient-to-b from-white/80 to-transparent dark:from-white/35" />
                        </motion.span>
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
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.16 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 rounded-2xl border border-white/90 bg-[#FAF8F5]/95 p-2 shadow-2xl backdrop-blur-2xl dark:border-white/12 dark:bg-[#111313]/95 z-50"
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
                        </motion.div>
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
                    <motion.span
                      layoutId={`liquid-glass-water-drop-${country}`}
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                      className="absolute inset-0 z-0 rounded-full bg-gradient-to-b from-white/95 via-white/40 to-emerald-500/15 border border-emerald-600/25 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,132,61,0.22),0_4px_14px_-2px_rgba(0,132,61,0.25)] backdrop-blur-md dark:from-white/20 dark:via-white/5 dark:to-[#16A05A]/25 dark:border-[#16A05A]/40 dark:shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(22,160,90,0.3),0_4px_16px_-2px_rgba(0,0,0,0.7),0_0_14px_-2px_rgba(22,160,90,0.35)]"
                      aria-hidden="true"
                    >
                      {/* Liquid surface tension water meniscus */}
                      <span className="pointer-events-none absolute inset-x-2 top-0.5 h-[40%] rounded-full bg-gradient-to-b from-white/80 to-transparent dark:from-white/35" />
                    </motion.span>
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

          {/* ================= 3. RIGHT SECTION — UTILITY CAPSULE (LIQUID GLASS + WRAPPING RED BORDER) ================= */}
          <div className="relative z-20 flex h-[48px] shrink-0 items-center justify-between gap-2 sm:gap-2.5 rounded-full bg-[#FAF8F5]/90 px-3 sm:px-3.5 lg:w-[204px] lg:px-4 backdrop-blur-2xl border-2 border-[#E4002B] lg:border-0 dark:border-[#C2242B] shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.95),inset_0_-1.5px_2px_0_rgba(0,132,61,0.06),0_8px_24px_-4px_rgba(0,0,0,0.08),0_2px_6px_0_rgba(0,0,0,0.04)] dark:bg-[#111313]/92 dark:shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.16),inset_0_-1px_2px_0_rgba(0,0,0,0.6),0_12px_36px_-4px_rgba(0,0,0,0.75),0_2px_8px_0_rgba(0,0,0,0.5)] transition-all duration-300">
            {/* Desktop Sculpted Wrapping Border & S-Ribbon Clasp */}
            <UtilityCapsuleBorderSvg />
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
                  <motion.div
                    role="listbox"
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-0 z-50 mt-2 w-36 rounded-2xl border border-white/90 bg-[#FAF8F5]/98 p-1 shadow-xl backdrop-blur-2xl dark:border-white/12 dark:bg-[#111313]/98"
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
                  </motion.div>
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
              className="rounded-full p-1.5 text-neutral-800 transition-colors hover:bg-black/5 dark:text-[#F5F5F2] dark:hover:bg-white/10 lg:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE EXPANDED DRAWER ================= */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="mt-2.5 rounded-3xl border border-white/90 bg-[#FAF8F5]/98 p-3 shadow-2xl backdrop-blur-2xl dark:border-white/12 dark:bg-[#111313]/98 lg:hidden z-50"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;
