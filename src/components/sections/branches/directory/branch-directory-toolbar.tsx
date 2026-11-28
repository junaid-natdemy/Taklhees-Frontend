'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  MapPin,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type BranchFilterValue = 'all' | 'featured';
export type BranchSortValue = 'default' | 'name-asc' | 'name-desc';

const SORT_OPTIONS: readonly { value: BranchSortValue; label: string }[] = [
  { value: 'default', label: 'Default Order' },
  { value: 'name-asc', label: 'Name: A–Z' },
  { value: 'name-desc', label: 'Name: Z–A' },
];

interface BranchDirectoryToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  selectedFilter: BranchFilterValue;
  onFilterChange: (value: BranchFilterValue) => void;
  sortBy: BranchSortValue;
  onSortChange: (value: BranchSortValue) => void;
  totalCount: number;
  featuredCount: number;
  hasActiveFilters: boolean;
  onReset: () => void;
  layout?: 'stacked' | 'inline';
}

export function BranchDirectoryToolbar({
  query,
  onQueryChange,
  selectedFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  totalCount,
  featuredCount,
  hasActiveFilters,
  onReset,
  layout = 'stacked',
}: BranchDirectoryToolbarProps) {
  const isInline = layout === 'inline';
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sortOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSortOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sortOpen]);

  const activeSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label ?? 'Default Order';

  return (
    <div
      className={cn(
        'flex flex-col gap-3.5',
        isInline && 'lg:flex-row lg:items-center lg:justify-between lg:gap-4'
      )}
    >
      {/* Bespoke Liquid-Glass Search Surface */}
      <div
        className={cn(
          'group/search relative w-full',
          isInline ? 'lg:max-w-[330px]' : 'max-w-full'
        )}
      >
        <label htmlFor="branch-directory-search" className="sr-only">
          Search Takhlees branches
        </label>
        <div className="relative flex items-center rounded-full border border-[#C9A45C]/55 bg-gradient-to-r from-white/40 via-[#FAF9F5]/25 to-white/35 shadow-[0_12px_28px_-14px_rgba(11,59,40,0.18),inset_0_1.5px_1px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(11,59,40,0.08)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:border-[#C9A45C]/80 hover:from-white/50 focus-within:border-[#18A86A]/75 focus-within:bg-white/60 focus-within:shadow-[0_14px_32px_-12px_rgba(8,123,75,0.28),0_0_0_3px_rgba(24,168,106,0.16),inset_0_1.5px_1px_rgba(255,255,255,0.98)] dark:border-[#C9A45C]/35 dark:from-white/[0.06] dark:via-[#0B2218]/35 dark:to-white/[0.04] dark:shadow-[0_14px_32px_-12px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.18)] dark:focus-within:border-[#E6C98A]/75 dark:focus-within:bg-[#0A2218]/80 dark:focus-within:shadow-[0_16px_34px_-12px_rgba(0,0,0,0.75),0_0_0_3px_rgba(24,168,106,0.22)]">
          <Search
            className="pointer-events-none ml-4 h-4 w-4 shrink-0 text-[#087B4B] transition-colors group-focus-within/search:text-[#18A86A] dark:text-[#C9A45C] dark:group-focus-within/search:text-[#E6C98A]"
            aria-hidden="true"
          />
          <input
            id="branch-directory-search"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search branch by name..."
            className="h-11 w-full appearance-none border-0 bg-transparent pl-3 pr-10 text-[13.5px] font-medium text-[#0B3B28] shadow-none outline-none ring-0 ring-offset-0 placeholder:text-[#5B645E] focus:border-0 focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-[#F4F0E8] dark:placeholder:text-[#8E9B92] [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              aria-label="Clear branch search"
              className="mr-2 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[#545955] transition hover:bg-[#087B4B]/12 hover:text-[#063D2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A86A] dark:text-[#929D95] dark:hover:bg-white/10 dark:hover:text-[#F4F0E8]"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Liquid-Glass Filter, Sort & Clear Filters Controls (Single Row) */}
      <div
        className={cn(
          'flex flex-nowrap items-center gap-1.5 sm:gap-2',
          isInline && 'lg:justify-end'
        )}
      >
        <div
          role="group"
          aria-label="Filter branches"
          className="flex flex-nowrap items-center gap-1.5 sm:gap-2"
        >
          <button
            type="button"
            aria-pressed={selectedFilter === 'all'}
            onClick={() => onFilterChange('all')}
            className={cn(
              'inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-[11.5px] font-semibold backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A86A] sm:px-3.5 sm:text-[12px]',
              selectedFilter === 'all'
                ? 'border-[#E6C98A]/75 bg-gradient-to-r from-[#063D2B]/95 via-[#087B4B]/90 to-[#063D2B]/95 text-[#FAF9F5] shadow-[0_10px_24px_-8px_rgba(8,123,75,0.48),inset_0_1px_0_rgba(255,255,255,0.34)] dark:border-[#E6C98A]/60 dark:from-[#063D2B]/95 dark:via-[#087B4B]/90 dark:to-[#063D2B]/95'
                : 'border-[#C9A45C]/50 bg-white/35 text-[#063D2B] shadow-[0_6px_16px_-10px_rgba(11,59,40,0.14),inset_0_1px_0_rgba(255,255,255,0.92)] hover:border-[#C9A45C]/80 hover:bg-white/55 dark:border-[#C9A45C]/30 dark:bg-white/[0.05] dark:text-[#D4DBD5] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] dark:hover:border-[#C9A45C]/55'
            )}
          >
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>All Locations ({totalCount})</span>
          </button>

          <button
            type="button"
            aria-pressed={selectedFilter === 'featured'}
            onClick={() => onFilterChange('featured')}
            className={cn(
              'inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-[11.5px] font-semibold backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A86A] sm:px-3.5 sm:text-[12px]',
              selectedFilter === 'featured'
                ? 'border-[#E6C98A]/75 bg-gradient-to-r from-[#063D2B]/95 via-[#087B4B]/90 to-[#063D2B]/95 text-[#FAF9F5] shadow-[0_10px_24px_-8px_rgba(8,123,75,0.48),inset_0_1px_0_rgba(255,255,255,0.34)] dark:border-[#E6C98A]/60 dark:from-[#063D2B]/95 dark:via-[#087B4B]/90 dark:to-[#063D2B]/95'
                : 'border-[#C9A45C]/50 bg-white/35 text-[#063D2B] shadow-[0_6px_16px_-10px_rgba(11,59,40,0.14),inset_0_1px_0_rgba(255,255,255,0.92)] hover:border-[#C9A45C]/80 hover:bg-white/55 dark:border-[#C9A45C]/30 dark:bg-white/[0.05] dark:text-[#D4DBD5] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] dark:hover:border-[#C9A45C]/55'
            )}
          >
            <span>Featured ({featuredCount})</span>
          </button>
        </div>

        {/* Custom Takhlees Liquid-Glass Sort Dropdown */}
        <div ref={sortRef} className="relative shrink-0">
          <button
            type="button"
            id="branch-directory-sort"
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            aria-label={`Sort branches: ${activeSortLabel}`}
            onClick={() => setSortOpen((prev) => !prev)}
            className={cn(
              'inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-[11.5px] font-semibold backdrop-blur-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18A86A] sm:px-3.5 sm:text-[12px]',
              sortOpen || sortBy !== 'default'
                ? 'border-[#E6C98A]/75 bg-gradient-to-r from-[#063D2B]/95 via-[#087B4B]/90 to-[#063D2B]/95 text-[#FAF9F5] shadow-[0_10px_24px_-8px_rgba(8,123,75,0.48),inset_0_1px_0_rgba(255,255,255,0.34)]'
                : 'border-[#C9A45C]/45 bg-white/45 text-[#063D2B] shadow-[0_6px_16px_-10px_rgba(11,59,40,0.16),inset_0_1px_0_rgba(255,255,255,0.88)] hover:border-[#C9A45C]/75 hover:bg-white/70 dark:border-[#C9A45C]/25 dark:bg-white/[0.06] dark:text-[#E5EAE6] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] dark:hover:border-[#C9A45C]/55'
            )}
          >
            <ArrowUpDown className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{activeSortLabel}</span>
            <ChevronDown
              className={cn(
                'h-3 w-3 shrink-0 transition-transform duration-200',
                sortOpen && 'rotate-180'
              )}
              aria-hidden="true"
            />
          </button>

          {sortOpen ? (
            <div
              role="listbox"
              aria-labelledby="branch-directory-sort"
              className="absolute right-0 top-11 z-40 min-w-[172px] overflow-hidden rounded-2xl border border-[#C9A45C]/55 bg-[#FAF9F5]/95 p-1.5 shadow-[0_18px_40px_-12px_rgba(11,59,40,0.28),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl backdrop-saturate-150 dark:border-[#C9A45C]/40 dark:bg-[#081C14]/95 dark:shadow-[0_20px_42px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)]"
            >
              {SORT_OPTIONS.map((option) => {
                const isSelected = sortBy === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSortChange(option.value);
                      setSortOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[12px] font-semibold transition-all duration-200',
                      isSelected
                        ? 'bg-gradient-to-r from-[#063D2B] to-[#087B4B] text-[#FAF9F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]'
                        : 'text-[#063D2B] hover:bg-[#087B4B]/10 dark:text-[#E5EAE6] dark:hover:bg-white/[0.08]'
                    )}
                  >
                    <span>{option.label}</span>
                    {isSelected ? (
                      <Check
                        className="h-3.5 w-3.5 shrink-0 text-[#E6C98A]"
                        aria-hidden="true"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* Conditional Icon-Only Red Clear Filters Action */}
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onReset}
            aria-label="Clear filters"
            title="Clear filters"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#C2242B]/40 bg-[#C2242B]/10 text-[#C2242B] shadow-[0_6px_16px_-10px_rgba(194,36,43,0.35),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md transition-all duration-300 hover:border-[#C2242B]/75 hover:bg-[#C2242B]/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2242B] dark:border-[#C2242B]/45 dark:bg-[#C2242B]/15 dark:text-[#F26D73] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] dark:hover:border-[#C2242B]/75 dark:hover:bg-[#C2242B]/25"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
