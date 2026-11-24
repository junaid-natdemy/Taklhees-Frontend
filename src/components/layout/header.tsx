'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
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

function UAEFlag() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-4 w-6 shrink-0 overflow-hidden rounded-[3px] border border-black/10 dark:border-white/20"
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
      className="relative inline-block h-4 w-6 shrink-0 overflow-hidden rounded-[3px] border border-black/10 dark:border-white/20"
    >
      <span className="absolute inset-x-0 top-0 h-1/3 bg-[#FF9933]" />
      <span className="absolute inset-x-0 top-1/3 flex h-1/3 items-center justify-center bg-white">
        <span className="h-1.5 w-1.5 rounded-full border border-[#000080]" />
      </span>
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[#128807]" />
    </span>
  );
}

export function Header({ country = 'ae' }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [countryOpen, setCountryOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const isUAE = country === 'ae';
  const links = NAV[country];

  const isActive = (href: string) =>
    href === `/${country}` ? pathname === href : pathname.startsWith(href);

  React.useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
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
    <header className="sticky top-0 z-50 w-full px-3 pb-1 pt-2 sm:pt-2 lg:pt-2 xl:pt-2 2xl:pt-3 sm:px-5">
      <div className="mx-auto max-w-[1140px]">
        {/* ============ ONE CONTINUOUS PILL (TAKHLEES LIQUID GLASS NAVBAR) ============ */}
        <div
          className={`relative flex h-[48px] sm:h-[50px] lg:h-[48px] xl:h-[48px] 2xl:h-[52px] items-center rounded-full pl-3 pr-2 sm:pl-4 lg:pl-5 transition-all duration-300 ${
            isUAE ? 'nav-uae-pill' : 'nav-in-pill'
          }`}
        >
          {/* Logo */}
          <Link
            href={`/${country}`}
            aria-label="Takhlees Business Home"
            className="group flex shrink-0 items-center gap-2 sm:gap-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <Image
              src="/icons/takhlees-emblem.png"
              alt="Takhlees emblem"
              width={32}
              height={32}
              priority
              className="h-7 w-7 xl:h-7.5 xl:w-7.5 2xl:h-8 2xl:w-8 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="text-right text-[11.5px] lg:text-[12px] xl:text-[12.5px] 2xl:text-[13px] font-bold text-neutral-900 dark:text-[#A5AAA7]">
                تـخـلـيـص
              </span>
              <span className="mt-0.5 text-[13.5px] lg:text-[14px] xl:text-[14.5px] 2xl:text-[15px] font-extrabold uppercase tracking-wide text-neutral-900 dark:text-[#F5F5F2]">
                TAKHLEES
              </span>
            </div>
          </Link>

          {/* Green swoosh divider (desktop only - compact) */}
          <div className="ml-1 hidden h-full w-[56px] shrink-0 lg:block xl:w-[68px] 2xl:w-[84px]" aria-hidden="true">
            <svg viewBox="0 0 150 68" preserveAspectRatio="none" fill="none" className="h-full w-full">
              <defs>
                <linearGradient id="navSwoosh" x1="0" y1="68" x2="150" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#087A43" />
                  <stop offset="1" stopColor="#16A05A" />
                </linearGradient>
              </defs>
              <path
                d="M0 68 C34 66 60 48 84 26 C102 10 128 3 150 2 C130 10 112 24 96 42 C78 62 48 70 0 68 Z"
                fill="url(#navSwoosh)"
              />
            </svg>
          </div>

          {/* Desktop nav: Single unified bar with fluid Liquid Glass active pill */}
          <nav
            className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1"
            aria-label="Main Navigation"
          >
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] xl:text-[12.5px] 2xl:text-[13px] tracking-normal transition-colors duration-200 select-none ${
                    active
                      ? 'font-semibold text-[#00843D] dark:text-[#16A05A]'
                      : 'font-medium text-neutral-700 hover:text-neutral-900 dark:text-[#A5AAA7] dark:hover:text-[#F5F5F2]'
                  }`}
                >
                  {/* Liquid Glass Water Drop on Active Link */}
                  {active && (
                    <motion.span
                      layoutId={`liquid-glass-drop-${country}`}
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                      className="absolute inset-0 z-0 rounded-full bg-gradient-to-b from-white/75 via-white/40 to-emerald-500/15 border border-emerald-600/20 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1.5px_3px_rgba(0,132,61,0.2),0_4px_12px_-2px_rgba(0,132,61,0.22)] backdrop-blur-md dark:from-white/12 dark:via-white/5 dark:to-[#16A05A]/20 dark:border-[#16A05A]/35 dark:shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(22,160,90,0.25),0_4px_16px_-2px_rgba(0,0,0,0.7)]"
                      aria-hidden="true"
                    >
                      {/* Water meniscus highlight on top curvature */}
                      <span className="pointer-events-none absolute inset-x-2.5 top-0.5 h-[40%] rounded-full bg-gradient-to-b from-white/70 to-transparent dark:from-white/20" />
                    </motion.span>
                  )}
                  {/* Subtle hover backlight on inactive links */}
                  {!active && (
                    <span
                      className="absolute inset-0 z-0 rounded-full bg-black/[0.04] opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-white/[0.05]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="relative z-10 h-3 w-3 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
            <span className="hidden h-4 w-px bg-neutral-300 dark:bg-[#303432] sm:block" />

            {/* Country selector */}
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
                <span>{isUAE ? 'UAE' : 'India'}</span>
                <ChevronDown
                  className={`h-3 w-3 opacity-70 transition-transform duration-200 ${countryOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {countryOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 z-50 mt-2 w-36 rounded-xl border border-black/[0.08] bg-[#F7F5F0] p-1 shadow-lg dark:border-[#303432] dark:bg-[#101111]"
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
                        className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                          selected
                            ? 'bg-emerald-500/10 font-semibold text-[#00843D] dark:bg-[#171717] dark:text-[#16A05A]'
                            : 'text-neutral-700 hover:bg-neutral-100 dark:text-[#A5AAA7] dark:hover:bg-[#171717] dark:hover:text-[#F5F5F2]'
                        }`}
                      >
                        {c === 'ae' ? <UAEFlag /> : <IndiaFlag />}
                        <span>{c === 'ae' ? 'UAE' : 'India'}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <ThemeToggle />

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

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="mt-2 rounded-3xl border border-black/[0.08] bg-[#F7F5F0]/95 p-3 shadow-xl backdrop-blur-md animate-in slide-in-from-top-2 dark:border-[#303432] dark:bg-[#101111]/95 lg:hidden">
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
                        ? 'bg-emerald-50 font-semibold text-[#00843D] dark:bg-[#171717] dark:text-[#16A05A]'
                        : 'text-neutral-700 hover:bg-neutral-100 dark:text-[#A5AAA7] dark:hover:bg-[#171717] dark:hover:text-[#F5F5F2]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-[#00843D] dark:bg-[#16A05A]" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;