'use client';

import * as React from 'react';
import { animate, useInView, useMotionValue, useReducedMotion } from 'motion/react';

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
 * AnimatedCounter — Smooth hardware-friendly count-up with tabular-nums,
 * viewport reveal trigger, and full `prefers-reduced-motion` bypass.
 */
export const AnimatedCounter = React.memo(function AnimatedCounter({
  target,
  suffix = '',
  delayMs = 0,
  className,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const prefersReduced = !!useReducedMotion();
  const motionVal = useMotionValue(prefersReduced ? target : 0);
  const [displayValue, setDisplayValue] = React.useState<string>(() =>
    numberFormatter.format(prefersReduced ? target : 0)
  );
  const hasAnimatedRef = React.useRef(false);

  React.useEffect(() => {
    if (prefersReduced) {
      setDisplayValue(numberFormatter.format(target));
      return;
    }

    if (!inView || hasAnimatedRef.current) {
      return;
    }

    hasAnimatedRef.current = true;
    const unsubscribe = motionVal.on('change', (latest) => {
      setDisplayValue(numberFormatter.format(Math.round(latest)));
    });

    let animationControls: { stop: () => void } | undefined;
    const timer = window.setTimeout(() => {
      animationControls = animate(motionVal, target, {
        duration: 1.15,
        ease: [0.22, 1, 0.36, 1],
      });
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
      animationControls?.stop();
      unsubscribe();
    };
  }, [inView, prefersReduced, target, delayMs, motionVal]);

  const staticLabel = `${numberFormatter.format(target)}${suffix}`;

  return (
    <span ref={ref} className={className} aria-label={staticLabel}>
      <span aria-hidden="true" className="tabular-nums">
        {displayValue}
        {suffix}
      </span>
    </span>
  );
});

export default AnimatedCounter;
