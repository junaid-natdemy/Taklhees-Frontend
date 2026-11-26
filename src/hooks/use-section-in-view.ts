'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Tracks whether a section container is within or near the viewport so infinite
 * decorative JS animations pause automatically when scrolled offscreen.
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
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
