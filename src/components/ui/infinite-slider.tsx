'use client';

import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * InfiniteSlider — GPU-accelerated continuous vertical or horizontal marquee.
 * Supports alternating direction (`reverse`), individual hover pause/slow-down,
 * and automatic static fallback when `prefers-reduced-motion: reduce` is enabled.
 */
export function InfiniteSlider({
  children,
  gap = 20,
  speed = 32,
  speedOnHover,
  direction = 'vertical',
  reverse = false,
  pauseOnHover = true,
  className,
}: InfiniteSliderProps) {
  const prefersReduced = !!useReducedMotion();
  const [isHovered, setIsHovered] = React.useState(false);

  const isVertical = direction === 'vertical';
  // Duration scales inversely with speed parameter to match 21st.dev InfiniteSlider ergonomics
  const baseDurationSec = Math.max(12, Math.round((1200 / Math.max(10, speed)) * 10) / 10);
  const effectiveDurationSec =
    isHovered && speedOnHover && speedOnHover > 0
      ? Math.max(16, Math.round((1200 / speedOnHover) * 10) / 10)
      : baseDurationSec;

  const shouldPause = pauseOnHover && isHovered && !speedOnHover;

  return (
    <div
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'flex w-full',
          isVertical ? 'flex-col' : 'flex-row w-max',
          !prefersReduced &&
            (isVertical
              ? reverse
                ? 'animate-infinite-scroll-y-reverse'
                : 'animate-infinite-scroll-y'
              : reverse
                ? 'animate-infinite-scroll-x-reverse'
                : 'animate-infinite-scroll-x')
        )}
        style={{
          gap: `${gap}px`,
          animationDuration: `${effectiveDurationSec}s`,
          animationPlayState: shouldPause ? 'paused' : 'running',
        }}
      >
        <div
          className={cn('flex shrink-0', isVertical ? 'flex-col' : 'flex-row')}
          style={{ gap: `${gap}px` }}
        >
          {children}
        </div>
        {!prefersReduced && (
          <div
            aria-hidden="true"
            className={cn('flex shrink-0', isVertical ? 'flex-col' : 'flex-row')}
            style={{ gap: `${gap}px` }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default InfiniteSlider;
