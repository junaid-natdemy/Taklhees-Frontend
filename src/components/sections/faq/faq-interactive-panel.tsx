'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  FileCheck2,
  LayoutGrid,
  Plane,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  FAQ_PAGE_SIZE,
  paginateFaqItems,
  type FaqCategoryId,
} from './faq-data';

const CATEGORY_ICONS: Record<FaqCategoryId, typeof LayoutGrid> = {
  general: LayoutGrid,
  'company-setup': Building2,
  'pro-services': ShieldCheck,
  visas: Plane,
  documentation: FileCheck2,
};

const LIQUID_GLASS_BEVEL =
  'shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.34),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.3),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.18),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.18),0_0_14px_rgba(255,255,255,0.2)] dark:shadow-[0_0_8px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.16),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.42),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.26),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.26),0_0_12px_rgba(0,0,0,0.2)]';

export function FaqInteractivePanel() {
  const baseId = useId();
  const [activeCategory, setActiveCategory] = useState<FaqCategoryId>('general');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItemId, setSelectedItemId] = useState<string>('gen-foreign-investor');

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const categoryItems = FAQ_ITEMS.filter(
    (item) => item.category === activeCategory
  );
  const pagination = paginateFaqItems(categoryItems, currentPage, FAQ_PAGE_SIZE);
  const activeItem =
    pagination.items.find((item) => item.id === selectedItemId) ??
    pagination.items[0] ??
    FAQ_ITEMS[0];

  const selectCategory = (categoryId: FaqCategoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
    const firstInCategory = FAQ_ITEMS.find((item) => item.category === categoryId);
    if (firstInCategory) {
      setSelectedItemId(firstInCategory.id);
    }
  };

  const handlePageChange = (nextPage: number) => {
    const nextPagination = paginateFaqItems(categoryItems, nextPage, FAQ_PAGE_SIZE);
    setCurrentPage(nextPagination.currentPage);
    if (nextPagination.items[0]) {
      setSelectedItemId(nextPagination.items[0].id);
    }
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const count = FAQ_CATEGORIES.length;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % count;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + count) % count;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = count - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const target = FAQ_CATEGORIES[nextIndex];
      if (target) {
        selectCategory(target.id);
        tabRefs.current[nextIndex]?.focus();
      }
    }
  };

  const activeTabId = `${baseId}-tab-${activeCategory}`;
  const activePanelId = `${baseId}-panel-${activeCategory}`;
  const ActiveIcon = CATEGORY_ICONS[activeItem.category];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[34px_20px_38px_22px/24px_34px_22px_30px] border border-[#C99726]/35 bg-[linear-gradient(152deg,rgba(255,254,250,0.78)_0%,rgba(247,243,233,0.68)_54%,rgba(232,243,236,0.64)_100%)] p-3.5 ring-1 ring-inset ring-white/75 backdrop-blur-md dark:border-[#16A05A]/30 dark:bg-[linear-gradient(152deg,rgba(14,28,20,0.82)_0%,rgba(9,19,14,0.74)_58%,rgba(7,22,15,0.8)_100%)] dark:ring-white/12 sm:p-4 lg:p-5',
        LIQUID_GLASS_BEVEL
      )}
    >
      {/* Subtle Top Specular & Emerald/Champagne Glass Reflections */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/95 to-transparent dark:via-white/35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(229,193,88,0.16)_0%,rgba(8,122,66,0.08)_50%,transparent_75%)]"
      />

      {/* ================= FROSTED-GLASS CAPSULE CATEGORY NAVIGATION ================= */}
      <div
        role="tablist"
        aria-label="FAQ categories"
        className="relative z-10 flex items-center gap-0.5 overflow-x-auto rounded-full border border-[#087A42]/15 bg-white/70 p-1 ring-1 ring-inset ring-white/80 dark:border-white/12 dark:bg-[#07110C]/75 dark:ring-white/10 lg:justify-between [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {FAQ_CATEGORIES.map((category, index) => {
          const Icon = CATEGORY_ICONS[category.id];
          const isActive = activeCategory === category.id;
          const tabId = `${baseId}-tab-${category.id}`;
          const panelId = `${baseId}-panel-${category.id}`;

          return (
            <button
              key={category.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectCategory(category.id)}
              onKeyDown={(e) => handleTabKeyDown(e, index)}
              className={cn(
                'inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-full px-2.5 py-1.5 text-[11.5px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087A42] dark:focus-visible:ring-[#2EB04B] xl:gap-1.5 xl:px-3 xl:text-[12px]',
                isActive
                  ? 'bg-[#065E32] text-white shadow-[0_6px_16px_-4px_rgba(6,94,50,0.45)] dark:bg-[#16A05A] dark:text-[#041A0E]'
                  : 'text-[#2C332F] hover:bg-white/80 hover:text-[#065E32] dark:text-[#D7E2DB] dark:hover:bg-white/[0.08] dark:hover:text-white'
              )}
            >
              <Icon
                className={cn(
                  'h-3.5 w-3.5 shrink-0',
                  isActive
                    ? 'text-white dark:text-[#041A0E]'
                    : 'text-[#087A42] dark:text-[#2EB04B]'
                )}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="whitespace-nowrap">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= ZERO-JUMP SPOTLIGHT ANSWER + COMPACT QUESTION LIST ================= */}
      <div
        id={activePanelId}
        role="tabpanel"
        aria-labelledby={activeTabId}
        className="relative z-10 mt-3"
      >
        {/* Top Spotlight Answer Card (Exact Fixed Height — 0px Jump) */}
        <div
          aria-live="polite"
          className="flex h-[146px] flex-col justify-center overflow-hidden rounded-[22px_14px_24px_16px/16px_22px_14px_20px] border border-[#087A42]/32 bg-[linear-gradient(145deg,rgba(235,246,239,0.95)_0%,rgba(250,248,242,0.92)_100%)] p-3.5 shadow-[0_8px_22px_-12px_rgba(8,122,66,0.16)] ring-1 ring-inset ring-white/85 dark:border-[#16A05A]/42 dark:bg-[linear-gradient(145deg,rgba(14,38,25,0.94)_0%,rgba(9,24,16,0.9)_100%)] dark:ring-white/10 sm:h-[132px] sm:p-4"
        >
          <div
            key={activeItem.id}
            className="flex items-start gap-3 animate-in fade-in duration-150 motion-reduce:animate-none"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#087A42]/20 bg-white/90 text-[#065E32] dark:border-[#16A05A]/30 dark:bg-[#071910] dark:text-[#2EB04B]"
            >
              <ActiveIcon className="h-4 w-4" strokeWidth={2} />
            </span>

            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-semibold leading-snug text-[#171717] dark:text-white sm:text-[15px]">
                {activeItem.question}
              </h3>

              <p className="mt-1.5 text-[12.5px] leading-[1.58] text-[#3B423E] dark:text-[#DCE6DF] sm:text-[13px]">
                {activeItem.answer}
              </p>
            </div>
          </div>
        </div>

        {/* Fixed-Height Question Selector Area (0px Resize Across Categories) */}
        <div className="mt-2.5 flex h-[234px] flex-col justify-between">
          <div
            role="listbox"
            aria-label="Select a question to view its answer"
            className="space-y-1.5"
          >
          {pagination.items.map((item) => {
            const isSelected = activeItem.id === item.id;
            const ItemIcon = CATEGORY_ICONS[item.category];

            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => setSelectedItemId(item.id)}
                className={cn(
                  'group/row flex h-[42px] w-full cursor-pointer items-center justify-between gap-3 rounded-[16px_12px_18px_12px/14px_12px_14px_12px] border px-3.5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087A42] dark:focus-visible:ring-[#2EB04B]',
                  isSelected
                    ? 'border-[#065E32]/45 bg-[#065E32]/[0.08] text-[#065E32] dark:border-[#16A05A]/45 dark:bg-[#16A05A]/15 dark:text-[#6EE7A8]'
                    : 'border-[#087A42]/10 bg-white/82 text-[#171717] hover:border-[#087A42]/28 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white/90 dark:hover:border-white/20 dark:hover:bg-white/[0.08]'
                )}
              >
                <span className="flex min-w-0 flex-1 items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-colors',
                      isSelected
                        ? 'border-[#065E32]/25 bg-[#065E32] text-white dark:border-[#16A05A]/40 dark:bg-[#16A05A] dark:text-[#041A0E]'
                        : 'border-[#087A42]/12 bg-[#F4F6F4] text-[#087A42] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#2EB04B]'
                    )}
                  >
                    {isSelected ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                    ) : (
                      <ItemIcon className="h-3.5 w-3.5" strokeWidth={1.9} />
                    )}
                  </span>
                  <span className="truncate text-[12.5px] font-semibold leading-snug sm:text-[13px]">
                    {item.question}
                  </span>
                </span>

                <ChevronRight
                  className={cn(
                    'h-4 w-4 shrink-0 transition-transform duration-150',
                    isSelected
                      ? 'translate-x-0.5 text-[#065E32] dark:text-[#6EE7A8]'
                      : 'text-[#6A726D] group-hover/row:translate-x-0.5 group-hover/row:text-[#065E32] dark:text-white/45 dark:group-hover/row:text-white/80'
                  )}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>

        {/* ================= FROSTED-GLASS DATA-DRIVEN PAGINATION ================= */}
        {pagination.totalPages > 1 && (
          <nav
            aria-label={`${activeCategory} FAQ pagination`}
            className="mt-3 flex items-center justify-center gap-2.5"
          >
            <button
              type="button"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevious}
              aria-label="Previous FAQ page"
              className={cn(
                'group/prev inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-[#C99726]/35 bg-white/78 px-3.5 text-[12px] font-semibold text-[#065E32] transition-all duration-200 hover:border-[#087A42]/55 hover:bg-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:bg-[#101C16]/85 dark:text-[#6EE7A8] dark:hover:border-[#2EB04B]/60',
                LIQUID_GLASS_BEVEL
              )}
            >
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover/prev:-translate-x-0.5 group-disabled/prev:translate-x-0"
                aria-hidden="true"
              />
              <span>Previous</span>
            </button>

            <span
              aria-live="polite"
              className="inline-flex h-8 min-w-[64px] items-center justify-center rounded-full border border-[#087A42]/20 bg-white/72 px-3 text-center text-[12px] font-semibold tabular-nums text-[#1C1C1C] ring-1 ring-inset ring-white/75 dark:border-[#2EB04B]/25 dark:bg-[#101C16]/75 dark:text-white/90 dark:ring-white/10"
            >
              {pagination.currentPage} of {pagination.totalPages}
            </span>

            <button
              type="button"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNext}
              aria-label="Next FAQ page"
              className={cn(
                'group/next inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-[#087A42]/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(232,245,237,0.88)_100%)] px-3.5 text-[12px] font-semibold text-[#065E32] transition-all duration-200 hover:border-[#087A42] hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#2EB04B]/45 dark:bg-[linear-gradient(135deg,rgba(16,32,24,0.9)_0%,rgba(11,26,18,0.85)_100%)] dark:text-[#6EE7A8] dark:hover:border-[#2EB04B]',
                LIQUID_GLASS_BEVEL
              )}
            >
              <span>Next</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover/next:translate-x-0.5 group-disabled/next:translate-x-0"
                aria-hidden="true"
              />
            </button>
          </nav>
        )}
        </div>
      </div>

      {/* ================= INTEGRATED BOTTOM ACTION AREA ================= */}
      <div className="relative z-10 mt-3 flex flex-col items-start justify-between gap-2.5 border-t border-[#087A42]/12 pt-3 dark:border-white/10 sm:flex-row sm:items-center">
        <Link
          href="/ae/services"
          className="group/all inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#065E32] transition-colors hover:text-[#043D20] focus-visible:outline-none focus-visible:underline dark:text-[#2EB04B]"
        >
          <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
          <span>View All FAQs</span>
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover/all:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>

        <Link
          href="/ae/contact"
          className="group/help flex items-center gap-2.5 rounded-full border border-[#087A42]/14 bg-white/75 py-1 pl-1.5 pr-3.5 ring-1 ring-inset ring-white/75 transition-colors hover:border-[#087A42]/30 hover:bg-white dark:border-white/12 dark:bg-white/[0.05] dark:ring-white/5"
        >
          <div className="flex -space-x-2">
            <Image
              src="/images/leadership/ramshad-ashraf-portrait.webp"
              alt="Ramshad Ashraf, Managing Director at Takhlees"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full border-2 border-[#FAF8F2] object-cover dark:border-[#0B1510]"
            />
            <Image
              src="/images/leadership/sadique-manalaya-portrait.webp"
              alt="Sadique Manalaya, CEO at Takhlees"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full border-2 border-[#FAF8F2] object-cover dark:border-[#0B1510]"
            />
          </div>
          <div className="text-left">
            <p className="text-[11.5px] font-semibold leading-tight text-[#171717] group-hover/help:text-[#065E32] dark:text-white dark:group-hover/help:text-[#2EB04B]">
              Need a personalized answer?
            </p>
            <p className="text-[11px] leading-tight text-[#525654] dark:text-[#BCC8C0]">
              Our experts are here to help.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
