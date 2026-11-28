'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { LayoutGrid } from 'lucide-react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import {
  BRANCHES,
  formatBranchSequence,
} from '@/features/branches/branches-data';
import {
  BranchDirectoryToolbar,
  type BranchFilterValue,
  type BranchSortValue,
} from './directory/branch-directory-toolbar';
import { BranchNavigator } from './directory/branch-navigator';
import { BranchCardGallery } from './directory/branch-card-gallery';
import { BranchEmptyState } from './directory/branch-empty-state';

const PAGE_SIZE = 5;

export function BranchDirectorySection() {
  const prefersReducedMotion = useReducedMotion();

  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] =
    useState<BranchFilterValue>('all');
  const [sortBy, setSortBy] = useState<BranchSortValue>('default');
  const [viewMode, setViewMode] = useState<'navigator' | 'expanded'>(
    'navigator'
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedBranchId, setSelectedBranchId] = useState(
    () => BRANCHES[0]?.id ?? ''
  );

  const sectionRef = useRef<HTMLElement | null>(null);

  // Remembers navigator page index across expand/collapse when results are unchanged
  const savedNavigatorState = useRef<{
    page: number;
    matchingAtExpand: number;
  } | null>(null);

  const featuredCount = useMemo(
    () => BRANCHES.filter((b) => b.isFeatured).length,
    []
  );

  const filteredBranches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BRANCHES.filter((branch) => {
      if (selectedFilter === 'featured' && !branch.isFeatured) return false;
      if (!q) return true;
      return (
        branch.name.toLowerCase().includes(q) ||
        branch.locationLabel.toLowerCase().includes(q) ||
        (branch.phone ? branch.phone.toLowerCase().includes(q) : false) ||
        (branch.email ? branch.email.toLowerCase().includes(q) : false)
      );
    });
  }, [query, selectedFilter]);

  const sortedBranches = useMemo(() => {
    if (sortBy === 'default') return filteredBranches;
    const copy = [...filteredBranches];
    copy.sort((a, b) =>
      sortBy === 'name-asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    return copy;
  }, [filteredBranches, sortBy]);

  const matchingCount = sortedBranches.length;
  const totalPages = Math.max(1, Math.ceil(matchingCount / PAGE_SIZE));
  const safePageIndex = Math.min(pageIndex, totalPages - 1);
  const startOffset = safePageIndex * PAGE_SIZE;
  const endOffset = Math.min(matchingCount, startOffset + PAGE_SIZE);

  const visibleBranches =
    viewMode === 'expanded'
      ? sortedBranches
      : sortedBranches.slice(startOffset, endOffset);

  const remainingAfterCount = Math.max(0, matchingCount - endOffset);
  const nextCount = Math.min(PAGE_SIZE, remainingAfterCount);
  const hasPrevPage = viewMode === 'navigator' && safePageIndex > 0;
  const hasNextPage = viewMode === 'navigator' && remainingAfterCount > 0;

  const activeSelectedId = visibleBranches.some(
    (b) => b.id === selectedBranchId
  )
    ? selectedBranchId
    : (visibleBranches[0]?.id ?? sortedBranches[0]?.id ?? '');

  const hasActiveFilters =
    query.trim().length > 0 ||
    selectedFilter !== 'all' ||
    sortBy !== 'default';

  const handleQueryChange = (next: string) => {
    setQuery(next);
    setPageIndex(0);
  };

  const handleFilterChange = (next: BranchFilterValue) => {
    setSelectedFilter(next);
    setPageIndex(0);
  };

  const handleSortChange = (next: BranchSortValue) => {
    setSortBy(next);
    setPageIndex(0);
  };

  const handleReset = () => {
    setQuery('');
    setSelectedFilter('all');
    setSortBy('default');
    setPageIndex(0);
  };

  const handlePrevPage = () => {
    setPageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setPageIndex((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const scrollToSectionTop = () => {
    sectionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const handleExpandAll = () => {
    savedNavigatorState.current = {
      page: safePageIndex,
      matchingAtExpand: matchingCount,
    };
    setViewMode('expanded');
    scrollToSectionTop();
  };

  const handleShowLess = () => {
    const saved = savedNavigatorState.current;
    if (saved && saved.matchingAtExpand === matchingCount) {
      setPageIndex(saved.page);
    } else {
      setPageIndex(0);
    }
    setViewMode('navigator');
    scrollToSectionTop();
  };

  const showAllLabel = hasActiveFilters
    ? `Show All ${matchingCount} Matching ${
        matchingCount === 1 ? 'Branch' : 'Branches'
      }`
    : `Show All ${matchingCount} Branches`;

  const rangeStart = matchingCount > 0 ? formatBranchSequence(startOffset + 1) : '00';
  const rangeEnd = matchingCount > 0 ? formatBranchSequence(endOffset) : '00';
  const totalFormatted = formatBranchSequence(matchingCount);
  const progressPercent =
    matchingCount > 0 ? Math.round((endOffset / matchingCount) * 100) : 0;

  return (
    <section
      ref={sectionRef}
      id="branch-directory"
      aria-labelledby="branch-directory-heading"
      className="relative overflow-hidden bg-[#FAF9F5] pb-14 pt-12 transition-colors duration-300 dark:bg-[#050B08] md:pb-16 md:pt-14 lg:pb-20 lg:pt-16"
    >
      {/* ================= LAYERED ARCHITECTURAL ENVIRONMENT ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      >
        <div
          className={
            viewMode === 'expanded'
              ? 'absolute inset-x-0 bottom-0 h-[520px]'
              : 'absolute inset-0'
          }
        >
          <Image
            src="/images/dubai-skyline-hero-light.webp"
            alt=""
            fill
            loading="lazy"
            unoptimized
            sizes="100vw"
            className={
              viewMode === 'expanded'
                ? 'object-cover object-bottom opacity-[0.34] dark:hidden'
                : 'object-cover object-bottom opacity-[0.48] dark:hidden'
            }
          />
          <Image
            src="/images/dubai-skyline-hero-dark.webp"
            alt=""
            fill
            loading="lazy"
            unoptimized
            sizes="100vw"
            className={
              viewMode === 'expanded'
                ? 'hidden object-cover object-bottom opacity-[0.36] dark:block'
                : 'hidden object-cover object-bottom opacity-[0.48] dark:block'
            }
          />
          {viewMode === 'expanded' ? (
            <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#FAF9F5] to-transparent dark:from-[#050B08]" />
          ) : null}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_48%,rgba(20,103,54,0.10)_0%,rgba(201,164,92,0.12)_38%,rgba(250,249,245,0.52)_80%)] dark:bg-[radial-gradient(ellipse_at_72%_48%,rgba(46,176,75,0.14)_0%,rgba(201,164,92,0.08)_38%,rgba(5,11,8,0.68)_80%)]" />
      </div>

      {/* ================= TOP ORGANIC ARCHITECTURAL WAVE ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 overflow-hidden leading-none"
      >
        <svg
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          className="block h-[32px] w-full sm:h-[40px] md:h-[48px]"
        >
          <path
            d="M0,0 L1440,0 L1440,16 C1140,42 780,6 420,30 C210,44 90,26 0,14 Z"
            className="fill-[#0B3B28] dark:fill-[#072419]"
          />
          <path
            d="M0,14 C90,26 210,44 420,30 C780,6 1140,42 1440,16"
            fill="none"
            stroke="#C9A45C"
            strokeOpacity="0.65"
            strokeWidth="1.4"
          />
        </svg>
      </div>

      {/* ================= DIRECTORY CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[7%]">
        <AnimatePresence mode="wait" initial={false}>
          {viewMode === 'navigator' ? (
            <m.div
              key="mode-navigator"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
              }
              className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12"
            >
              {/* LEFT COLUMN: Editorial Heading, Liquid-Glass Toolbar, Editorial Counter & Show All */}
              <div className="lg:sticky lg:top-24 lg:col-span-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.23em] text-[#146736] dark:text-[#2EB04B]">
                    OUR BRANCHES
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-[1.5px] w-12 rounded-full bg-gradient-to-r from-[#146736]/75 via-[#C9A45C] to-[#C2242B]/70 dark:from-[#2EB04B]/80 dark:via-[#D2B475] dark:to-[#C2242B]/80"
                  />
                </div>

                <h2
                  id="branch-directory-heading"
                  className="font-serif text-[32px] font-semibold leading-[1.08] tracking-[-0.015em] text-[#0B3B28] dark:text-[#F4F0E8] sm:text-[38px] lg:text-[42px]"
                >
                  Explore All
                  <br />
                  Takhlees{' '}
                  <span className="relative inline-block text-[#B88E44] dark:text-[#D2B475]">
                    Branches
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 180 12"
                      fill="none"
                      className="pointer-events-none absolute -bottom-1.5 left-0 h-2.5 w-full"
                    >
                      <path
                        d="M3 9.5 C 52 2.5, 130 2, 177 7"
                        stroke="#C9A45C"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h2>

                <p className="mt-3.5 max-w-[440px] text-[14.5px] leading-[1.62] text-[#3F4441] dark:text-[#C9D1CA] sm:text-[15.5px]">
                  Browse our complete network of 17 branches and find the
                  location that best suits your needs.
                </p>

                {/* Shared Liquid-Glass Search, Filter & Sort Toolbar */}
                <div className="mt-6">
                  <BranchDirectoryToolbar
                    query={query}
                    onQueryChange={handleQueryChange}
                    selectedFilter={selectedFilter}
                    onFilterChange={handleFilterChange}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                    totalCount={BRANCHES.length}
                    featuredCount={featuredCount}
                    hasActiveFilters={hasActiveFilters}
                    onReset={handleReset}
                    layout="stacked"
                  />
                </div>

                {/* Editorial Branch Counter & Liquid-Glass Show All Control */}
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#C9A45C]/30 pt-5">
                  <div aria-live="polite" className="min-w-0 shrink-0">
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                      <span className="font-serif text-[23px] font-semibold leading-none tracking-tight text-[#0B3B28] dark:text-[#F4F0E8] sm:text-[25px]">
                        {rangeStart}–{rangeEnd}
                      </span>
                      <span className="h-[1px] w-3 bg-[#C9A45C]/70" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#545955] dark:text-[#A4B0A8]">
                        OF {totalFormatted}{' '}
                        {hasActiveFilters ? 'MATCHES' : 'LOCATIONS'}
                      </span>
                    </div>
                    <div className="mt-2 h-[2px] w-28 overflow-hidden rounded-full bg-[#C9A45C]/25">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#0B3B28] to-[#C9A45C] transition-all duration-300 dark:from-[#2EB04B] dark:to-[#E6C98A]"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {matchingCount > 0 ? (
                    <LiquidButton
                      type="button"
                      variant="emerald"
                      size="lg"
                      onClick={handleExpandAll}
                      className="h-10 shrink-0 gap-1.5 whitespace-nowrap border border-[#C9A45C]/50 bg-[#0A6B36]/90 px-4 text-[12.5px] font-semibold backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.42),0_12px_28px_-8px_rgba(6,61,41,0.45)] hover:bg-[#085C2E]/95 dark:border-[#C9A45C]/50 dark:bg-[#0B6B45]/85 dark:hover:bg-[#0E7F52]/90"
                    >
                      <LayoutGrid className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{showAllLabel}</span>
                    </LiquidButton>
                  ) : null}
                </div>
              </div>

              {/* RIGHT COLUMN: Sculpted Liquid-Glass Vertical Navigator */}
              <div className="lg:col-span-7">
                {matchingCount > 0 ? (
                  <BranchNavigator
                    branches={visibleBranches}
                    pageIndex={safePageIndex}
                    selectedBranchId={activeSelectedId}
                    onSelectBranch={setSelectedBranchId}
                    hasPrevPage={hasPrevPage}
                    hasNextPage={hasNextPage}
                    nextCount={nextCount}
                    remainingAfterCount={remainingAfterCount}
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                    comingSoonSlots={Math.max(
                      0,
                      PAGE_SIZE - visibleBranches.length
                    )}
                  />
                ) : (
                  <BranchEmptyState query={query} onReset={handleReset} />
                )}
              </div>
            </m.div>
          ) : (
            <m.div
              key="mode-expanded"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
              }
              className="mx-auto max-w-[1100px]"
            >
              {/* Expanded Mode Editorial Heading */}
              <div className="mx-auto max-w-[580px] text-center">
                <div className="mb-2 flex items-center justify-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-[1.5px] w-7 rounded-full bg-gradient-to-r from-transparent to-[#C2242B]/80 dark:to-[#C9A45C]"
                  />
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.23em] text-[#146736] dark:text-[#2EB04B]">
                    OUR BRANCHES
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-[1.5px] w-7 rounded-full bg-gradient-to-l from-transparent to-[#146736]/75 dark:to-[#C9A45C]"
                  />
                </div>

                <h2
                  id="branch-directory-heading"
                  className="font-serif text-[28px] font-semibold leading-[1.08] tracking-[-0.015em] text-[#0B3B28] dark:text-[#F4F0E8] sm:text-[32px] lg:text-[36px]"
                >
                  Explore All Takhlees{' '}
                  <span className="relative inline-block text-[#B88E44] dark:text-[#D2B475]">
                    Branches
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 180 12"
                      fill="none"
                      className="pointer-events-none absolute -bottom-1.5 left-0 h-2.5 w-full"
                    >
                      <path
                        d="M3 9.5 C 52 2.5, 130 2, 177 7"
                        stroke="#C9A45C"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h2>

                <p className="mx-auto mt-2.5 max-w-[480px] text-[13.5px] leading-[1.55] text-[#3F4441] dark:text-[#C9D1CA] sm:text-[14.5px]">
                  Browse our complete network of 17 branches and find the
                  location that best suits your needs.
                </p>
              </div>

              {/* Shared Liquid-Glass Toolbar (Inline in Expanded Mode) */}
              <div className="mt-5">
                <BranchDirectoryToolbar
                  query={query}
                  onQueryChange={handleQueryChange}
                  selectedFilter={selectedFilter}
                  onFilterChange={handleFilterChange}
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                  totalCount={BRANCHES.length}
                  featuredCount={featuredCount}
                  hasActiveFilters={hasActiveFilters}
                  onReset={handleReset}
                  layout="inline"
                />
              </div>

              {/* Expanded Gallery or Empty State */}
              <div className="mt-5">
                {matchingCount > 0 ? (
                  <BranchCardGallery
                    branches={sortedBranches}
                    selectedBranchId={activeSelectedId}
                    onSelectBranch={setSelectedBranchId}
                    onShowLess={handleShowLess}
                    comingSoonSlots={
                      !hasActiveFilters && sortedBranches.length % 4 !== 0
                        ? 4 - (sortedBranches.length % 4)
                        : 0
                    }
                  />
                ) : (
                  <BranchEmptyState query={query} onReset={handleReset} />
                )}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= BOTTOM SCULPTED EMERALD & CHAMPAGNE WAVES ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden leading-none"
      >
        <svg
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          className="block h-[40px] w-full sm:h-[48px] md:h-[58px]"
        >
          <defs>
            <linearGradient
              id="sec3BottomWaveLight"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#083623" />
              <stop offset="50%" stopColor="#146736" />
              <stop offset="100%" stopColor="#083623" />
            </linearGradient>
            <linearGradient
              id="sec3BottomWaveDark"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#051D14" />
              <stop offset="50%" stopColor="#0D4A31" />
              <stop offset="100%" stopColor="#051D14" />
            </linearGradient>
          </defs>

          <path
            d="M0,32 C340,8 700,56 1080,22 C1260,6 1370,18 1440,28 L1440,72 L0,72 Z"
            className="fill-[#0B3B28]/10 dark:fill-[#146736]/20"
          />
          <path
            d="M0,46 C360,22 740,62 1130,34 C1295,22 1385,34 1440,40 L1440,72 L0,72 Z"
            fill="url(#sec3BottomWaveLight)"
            className="dark:hidden"
          />
          <path
            d="M0,46 C360,22 740,62 1130,34 C1295,22 1385,34 1440,40 L1440,72 L0,72 Z"
            fill="url(#sec3BottomWaveDark)"
            className="hidden dark:block"
          />
          <path
            d="M0,46 C360,22 740,62 1130,34 C1295,22 1385,34 1440,40"
            fill="none"
            stroke="#C9A45C"
            strokeOpacity="0.82"
            strokeWidth="1.65"
          />
        </svg>
      </div>
    </section>
  );
}

export default BranchDirectorySection;
