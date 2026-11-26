'use client';

import * as React from 'react';

/**
 * DesktopSmoothScroll
 * Native-window.scrollY-synced exponential lerp smooth scroller for fine-pointer desktop devices.
 * Preserves native IntersectionObserver (whileInView), sticky/fixed header geometry,
 * keyboard navigation, scrollbar dragging, Find-in-Page, and mobile/touch momentum.
 */
export function DesktopSmoothScroll() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(pointer: fine)');

    const isEligible = () =>
      !reducedMotionQuery.matches &&
      finePointerQuery.matches &&
      window.innerWidth > 1024;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let lastWrittenY = window.scrollY;
    let lastWriteTime = 0;
    let rafId: number | null = null;
    let lastTs: number | null = null;

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const stopLoop = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      lastTs = null;
    };

    const canChildScroll = (el: HTMLElement | null, deltaY: number): boolean => {
      let node: HTMLElement | null = el;
      while (node && node !== document.body && node !== document.documentElement) {
        const style = window.getComputedStyle(node);
        const overflowY = style.overflowY;
        const isScrollable = overflowY === 'auto' || overflowY === 'scroll';
        if (isScrollable && node.scrollHeight > node.clientHeight + 1) {
          const atTop = node.scrollTop <= 0;
          const atBottom =
            node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
          if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) {
            return true;
          }
        }
        node = node.parentElement;
      }
      return false;
    };

    const writeScroll = (y: number) => {
      lastWrittenY = y;
      lastWriteTime = performance.now();
      window.scrollTo({ top: y, behavior: 'instant' });
    };

    const tick = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = Math.min(0.033, Math.max(0.001, (ts - lastTs) / 1000));
      lastTs = ts;

      const diff = targetY - currentY;
      if (Math.abs(diff) < 0.25) {
        currentY = targetY;
        if (Math.abs(currentY - lastWrittenY) >= 0.25) {
          writeScroll(currentY);
        }
        stopLoop();
        return;
      }

      // Exponential decay tuned for crisp, zero-lag desktop glide
      const decay = 13.5;
      currentY += diff * (1 - Math.exp(-decay * dt));

      if (Math.abs(currentY - lastWrittenY) >= 0.5) {
        writeScroll(currentY);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafId === null) {
        lastTs = null;
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isEligible()) return;
      if (e.ctrlKey || e.metaKey || e.defaultPrevented) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      let deltaY = e.deltaY;
      if (e.deltaMode === 1) deltaY *= 18; // Line mode -> px
      else if (e.deltaMode === 2) deltaY *= window.innerHeight * 0.85; // Page mode

      if (Math.abs(deltaY) < 0.1) return;
      if (canChildScroll(e.target as HTMLElement | null, deltaY)) return;

      e.preventDefault();

      // Re-sync if native scroll drifted while idle
      if (rafId === null) {
        currentY = window.scrollY;
        targetY = window.scrollY;
        lastWrittenY = window.scrollY;
      }

      targetY = Math.max(0, Math.min(getMaxScroll(), targetY + deltaY));
      startLoop();
    };

    const handleNativeScroll = () => {
      // Ignore asynchronous scroll events triggered by our own writeScroll()
      if (rafId !== null) {
        const elapsed = performance.now() - lastWriteTime;
        if (elapsed < 64 || Math.abs(window.scrollY - lastWrittenY) <= 3) {
          return;
        }
      }
      // Sync immediately on external scrollbar drag, keyboard scroll, or hash jumps
      stopLoop();
      currentY = window.scrollY;
      targetY = window.scrollY;
      lastWrittenY = window.scrollY;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'PageDown' ||
        e.key === 'PageUp' ||
        e.key === 'Home' ||
        e.key === 'End' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === ' '
      ) {
        stopLoop();
        currentY = window.scrollY;
        targetY = window.scrollY;
        lastWrittenY = window.scrollY;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Yield immediately if user clicks near the browser scrollbar
      if (e.clientX >= document.documentElement.clientWidth - 2) {
        stopLoop();
        currentY = window.scrollY;
        targetY = window.scrollY;
        lastWrittenY = window.scrollY;
      }
    };

    const handleResize = () => {
      const max = getMaxScroll();
      targetY = Math.min(targetY, max);
      currentY = Math.min(currentY, max);
    };

    const handleAnchorClick = (e: MouseEvent) => {
      if (!isEligible()) return;
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
      if (rafId === null) {
        currentY = window.scrollY;
        lastWrittenY = window.scrollY;
      }
      const rect = targetEl.getBoundingClientRect();
      targetY = Math.max(0, Math.min(getMaxScroll(), window.scrollY + rect.top - 72));
      window.history.pushState(null, '', `#${hashId}`);
      startLoop();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('click', handleAnchorClick);

    return () => {
      stopLoop();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleNativeScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return null;
}

export default DesktopSmoothScroll;
