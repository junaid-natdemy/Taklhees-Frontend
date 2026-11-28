'use client';

import { RotateCcw, SearchX } from 'lucide-react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

interface BranchEmptyStateProps {
  query: string;
  onReset: () => void;
}

export function BranchEmptyState({ query, onReset }: BranchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#C9A45C]/30 bg-white/75 px-6 py-14 text-center shadow-[0_14px_34px_-16px_rgba(11,59,40,0.16)] backdrop-blur-md dark:border-[#C9A45C]/25 dark:bg-[#0B1D15]/75">
      <div className="grid h-12 w-12 place-items-center rounded-full border border-[#C9A45C]/40 bg-[#FAF9F5] text-[#0B3B28] dark:bg-[#06110C] dark:text-[#C9A45C]">
        <SearchX className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-serif text-[22px] font-semibold text-[#0B3B28] dark:text-[#F4F0E8]">
        No Matching Branches Found
      </h3>
      <p className="mt-2 max-w-[380px] text-[14px] leading-relaxed text-[#495057] dark:text-[#B8C2BA]">
        {query.trim()
          ? `No Takhlees branches matched "${query.trim()}". Try another branch name or reset your active filters.`
          : 'No Takhlees branches matched your current filter selection.'}
      </p>
      <LiquidButton
        type="button"
        variant="emerald"
        size="lg"
        onClick={onReset}
        className="mt-6 h-10 border border-[#C9A45C]/45 bg-[#0A6B36]/90 px-5 text-[13px] font-semibold"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Clear Search &amp; Filters</span>
      </LiquidButton>
    </div>
  );
}
