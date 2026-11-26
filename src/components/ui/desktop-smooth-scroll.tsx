'use client';

import * as React from 'react';

/**
 * DesktopSmoothScroll
 * Smoothly scrolls same-page hash anchor navigation while leaving wheel and
 * trackpad input untouched on the browser's hardware compositor thread.
 */
export function DesktopSmoothScroll() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const pathPart = href.slice(0, hashIndex);
      const hashId = href.slice(hashIndex + 1);
      if (!hashId) return;
      if (pathPart && pathPart !== window.location.pathname) return;

      const targetEl = document.getElementById(hashId);
      if (!targetEl) return;

      e.preventDefault();
      const top = Math.max(0, window.scrollY + targetEl.getBoundingClientRect().top - 72);
      window.history.pushState(null, '', `#${hashId}`);
      window.scrollTo({
        top,
        behavior: reducedMotionQuery.matches ? 'auto' : 'smooth',
      });
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return null;
}

export default DesktopSmoothScroll;
