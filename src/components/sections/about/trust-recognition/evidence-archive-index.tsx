'use client';

/* ===================================================================
 * Evidence Archive Index V3 — Optical Liquid-Glass Capsules
 * ===================================================================
 * Left-side vertical connector timeline with champagne-gold markers
 * and true optical liquid-glass capsules matching LiquidButton's
 * bevel + refraction material.
 * Mobile uses horizontal scrollable liquid-glass pill capsules.
 * =================================================================== */

import { m, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { EvidenceCategoryKey } from './trust-recognition-data';
import { TrustCategoryIcon } from './trust-recognition-icons';

interface EvidenceArchiveIndexProps {
  categories: readonly { key: EvidenceCategoryKey; label: string }[];
  activeCategory: EvidenceCategoryKey;
  onSelect: (key: EvidenceCategoryKey) => void;
}

export function EvidenceArchiveIndex({
  categories,
  activeCategory,
  onSelect,
}: EvidenceArchiveIndexProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* Desktop: Vertically Centered Node-Line Navigation with Optical Glass Capsules */}
      <nav aria-label="Evidence categories" className="relative hidden md:block">
        {/* Continuous vertical connector line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-5 left-[9px] top-5 w-px bg-gradient-to-b from-[#C9A45C]/25 via-[#C9A45C]/60 to-[#C9A45C]/25 dark:via-white/20"
        />

        <ul
          className="relative flex flex-col gap-3.5"
          role="tablist"
          aria-orientation="vertical"
        >
          {categories.map((cat, i) => {
            const isActive = cat.key === activeCategory;

            return (
              <li key={cat.key} role="presentation">
                <m.button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`evidence-panel-${cat.key}`}
                  id={`evidence-tab-${cat.key}`}
                  onClick={() => onSelect(cat.key)}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.5,
                          delay: 0.08 + i * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                  className="group relative flex w-full items-center gap-3.5 text-left focus-visible:outline-none"
                >
                  {/* Circular marker with champagne-gold detailing */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'relative z-10 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full transition-all duration-300',
                      isActive
                        ? 'bg-[#063D29] ring-4 ring-[#C9A45C]/30 dark:bg-[#2EB04B] dark:ring-[#2EB04B]/20'
                        : 'border border-[#C9A45C]/65 bg-[#F5F1E6] group-hover:border-[#063D29]/60 dark:border-white/25 dark:bg-[#060807] dark:group-hover:border-[#2EB04B]/60'
                    )}
                  >
                    <span
                      className={cn(
                        'rounded-full transition-all duration-300',
                        isActive
                          ? 'h-2 w-2 bg-[#F5DDA0]'
                          : 'h-1.5 w-1.5 bg-[#C9A45C]/45 group-hover:bg-[#063D29]/55 dark:group-hover:bg-[#2EB04B]/60'
                      )}
                    />
                  </span>

                  {/* Optical Liquid-Glass Capsule */}
                  <span
                    className={cn(
                      'liquid-glass-refract-button relative isolate flex flex-1 items-center gap-2.5 overflow-hidden rounded-full px-4 py-2.5 transition-all duration-300',
                      isActive
                        ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.46)_0%,rgba(226,242,232,0.28)_100%)] text-[#063D29] shadow-[0_8px_22px_-6px_rgba(6,61,41,0.22),inset_2px_2px_1px_rgba(255,255,255,0.95),inset_-2px_-2px_2px_rgba(10,88,48,0.2),inset_0_0_8px_2px_rgba(255,255,255,0.28)] ring-1 ring-[#C9A45C]/55 dark:bg-[linear-gradient(135deg,rgba(16,44,30,0.88)_0%,rgba(10,28,19,0.78)_100%)] dark:text-[#2EB04B] dark:shadow-[0_10px_24px_-6px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.5)] dark:ring-[#C9A45C]/45'
                        : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.26)_0%,rgba(246,242,232,0.14)_100%)] text-[#4A4D4A] shadow-[0_4px_14px_-4px_rgba(20,16,10,0.09),inset_1.5px_1.5px_1px_rgba(255,255,255,0.85),inset_-1.5px_-1.5px_1.5px_rgba(0,0,0,0.08)] ring-1 ring-white/70 group-hover:scale-[1.02] group-hover:bg-white/40 group-hover:text-[#063D29] group-hover:ring-[#C9A45C]/45 dark:bg-[linear-gradient(135deg,rgba(11,29,21,0.72)_0%,rgba(8,20,15,0.62)_100%)] dark:text-[#C1C8C1] dark:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] dark:ring-[#C9A45C]/20 dark:group-hover:bg-[linear-gradient(135deg,rgba(15,38,27,0.84)_0%,rgba(10,26,18,0.74)_100%)] dark:group-hover:text-[#F4F0E8] dark:group-hover:ring-[#C9A45C]/35'
                    )}
                  >
                    <TrustCategoryIcon
                      category={cat.key}
                      className={cn(
                        'relative z-10 h-4 w-4 shrink-0 transition-colors duration-250',
                        isActive
                          ? 'text-[#063D29] dark:text-[#2EB04B]'
                          : 'text-[#7C7465] group-hover:text-[#063D29] dark:text-white/45 dark:group-hover:text-white/85'
                      )}
                    />
                    <span className="relative z-10 text-[13px] font-semibold leading-tight tracking-[-0.01em]">
                      {cat.label}
                    </span>
                  </span>
                </m.button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile: Horizontal Scroll Liquid-Glass Capsules */}
      <nav aria-label="Evidence categories" className="md:hidden">
        <div className="scrollbar-hide -mx-5 overflow-x-auto px-5">
          <ul
            className="flex gap-2.5 pb-1.5 pt-0.5"
            role="tablist"
            aria-orientation="horizontal"
          >
            {categories.map((cat) => {
              const isActive = cat.key === activeCategory;

              return (
                <li key={cat.key} role="presentation" className="shrink-0">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`evidence-panel-${cat.key}`}
                    id={`evidence-tab-${cat.key}`}
                    onClick={() => onSelect(cat.key)}
                    className={cn(
                      'liquid-glass-refract-button relative flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-250',
                      isActive
                        ? 'bg-[linear-gradient(135deg,rgba(6,61,41,0.92)_0%,rgba(10,107,54,0.88)_100%)] text-white shadow-[0_6px_16px_-4px_rgba(6,61,41,0.35),inset_1.5px_1.5px_1px_rgba(255,255,255,0.45),inset_-1.5px_-1.5px_2px_rgba(0,0,0,0.35)] ring-1 ring-[#C9A45C]/45 dark:bg-[linear-gradient(135deg,rgba(11,107,69,0.95)_0%,rgba(32,183,101,0.82)_100%)] dark:text-[#F4F0E8] dark:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.16)] dark:ring-[#C9A45C]/50'
                        : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.36)_0%,rgba(246,242,232,0.22)_100%)] text-[#4A4D4A] shadow-[0_4px_12px_-4px_rgba(20,16,10,0.1),inset_1.5px_1.5px_1px_rgba(255,255,255,0.85),inset_-1.5px_-1.5px_1.5px_rgba(0,0,0,0.08)] ring-1 ring-white/75 dark:bg-[linear-gradient(135deg,rgba(11,29,21,0.78)_0%,rgba(8,20,15,0.68)_100%)] dark:text-[#C1C8C1] dark:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] dark:ring-[#C9A45C]/25'
                    )}
                  >
                    <TrustCategoryIcon
                      category={cat.key}
                      className={cn(
                        'h-3.5 w-3.5',
                        isActive
                          ? 'text-[#F5DDA0] dark:text-[#F4F0E8]'
                          : 'text-[#7C7465] dark:text-[#C9A45C]/80'
                      )}
                    />
                    {cat.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
