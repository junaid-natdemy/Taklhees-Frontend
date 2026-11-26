'use client';

import { startTransition, useEffect, useState, type RefObject } from 'react';

/**
 * Tracks whether a section container is within or near the viewport using
 * low-priority state transitions so scrolling never blocks the main thread.
 */
export function useSectionInView(
  ref: RefObject<HTMLElement | null>,
  rootMargin = '140px'
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting;
        startTransition(() => setInView(next));
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
