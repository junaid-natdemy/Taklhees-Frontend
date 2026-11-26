'use client';

import * as React from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  delayMs?: number;
  className?: string;
}

const numberFormatter = new Intl.NumberFormat('en-AE', {
  useGrouping: false,
  maximumFractionDigits: 0,
});

/**
 * AnimatedCounter — Zero-re-render DOM-direct count-up using single requestAnimationFrame
 * easing loop, early viewport trigger, and full `prefers-reduced-motion` bypass.
 */
export const AnimatedCounter = React.memo(function AnimatedCounter({
  target,
  suffix = '',
  delayMs = 0,
  className,
}: AnimatedCounterProps) {
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const valueRef = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '120px' });
  const prefersReduced = !!useReducedMotion();
  const hasAnimatedRef = React.useRef(false);

  const staticLabel = `${numberFormatter.format(target)}${suffix}`;

  React.useEffect(() => {
    const el = valueRef.current;
    if (!el) return;

    if (prefersReduced) {
      el.textContent = numberFormatter.format(target);
      return;
    }

    if (!inView || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    let rafId = 0;
    const clampedDelay = Math.min(delayMs, 120);
    const durationMs = 460;

    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / durationMs);
        // Cubic ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = numberFormatter.format(current);
        if (progress < 1) {
          rafId = window.requestAnimationFrame(tick);
        }
      };
      rafId = window.requestAnimationFrame(tick);
    }, clampedDelay);

    return () => {
      window.clearTimeout(timer);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [inView, prefersReduced, target, delayMs]);

  return (
    <span ref={containerRef} className={className} aria-label={staticLabel}>
      <span aria-hidden="true" className="tabular-nums">
        <span ref={valueRef}>
          {prefersReduced ? numberFormatter.format(target) : '0'}
        </span>
        {suffix}
      </span>
    </span>
  );
});

export default AnimatedCounter;
