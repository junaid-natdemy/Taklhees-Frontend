'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { cn } from '@/lib/utils';
import { STORY_MILESTONES } from './our-story-data';
import {
  OurStoryArchFrame,
  OurStoryMobileArchImage,
} from './our-story-arch-frame';
import {
  OurStoryBottomTransition,
  OurStorySkylineBackdrop,
} from './our-story-skyline';

/*
 * Flowing horizontal S-curve in 1000x56 coordinates.
 * Column centers sit at x = 125 (12.5%), 375 (37.5%), 625 (62.5%), 875 (87.5%).
 */
const TIMELINE_PATH =
  'M 40 30 C 75 28, 100 30, 125 30 C 210 30, 290 42, 375 38 C 460 34, 540 16, 625 20 C 710 24, 790 34, 875 30 C 915 28, 945 24, 975 20';

const TIMELINE_NODE_Y_PERCENT = [54, 68, 36, 54] as const;
const TIMELINE_PROGRESS_STOPS = [0.1, 0.37, 0.64, 0.91] as const;
const CHAPTER_SCROLL_TARGETS = [0.06, 0.36, 0.64, 0.9] as const;

function getChapterFromProgress(progress: number): number {
  if (progress < 0.24) return 0;
  if (progress < 0.5) return 1;
  if (progress < 0.76) return 2;
  return 3;
}

/* Smoothly map normalized scroll progress [0..1] onto SVG pathLength [0.10..0.91] */
function getTimelineFillFromProgress(progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  return 0.1 + Math.min(1, clamped / 0.88) * 0.81;
}

export function OurStoryJourney() {
  const baseId = useId();
  const prefersReducedMotion = useReducedMotion();

  const runwayRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mobileCardRefs = useRef<Array<HTMLElement | null>>([]);
  const programmaticScrollUntilRef = useRef<number>(0);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);

  const rawProgress = useMotionValue<number>(TIMELINE_PROGRESS_STOPS[0]);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 210,
    damping: 30,
    mass: 0.45,
  });

  const activeChapter = STORY_MILESTONES[activeIndex] ?? STORY_MILESTONES[0];

  /*
   * Desktop & Tablet scroll-driven chapter controller:
   * Only attaches scroll/resize listeners while #our-story is near or
   * inside the viewport so scrolling other sections incurs zero overhead.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const runwayEl = runwayRef.current;
    if (!runwayEl) return;

    let frameId = 0;
    let listening = false;

    const updateFromScroll = () => {
      frameId = 0;
      const runway = runwayRef.current;
      const sticky = stickyRef.current;
      if (!runway || !sticky) return;

      // Skip measurement when desktop/tablet stage is hidden (< 768px)
      if (runway.offsetParent === null) return;

      const runwayRect = runway.getBoundingClientRect();
      const stickyHeight = sticky.offsetHeight || window.innerHeight;
      const travelDistance = Math.max(1, runwayRect.height - stickyHeight);
      const progress = Math.max(0, Math.min(1, -runwayRect.top / travelDistance));

      rawProgress.set(getTimelineFillFromProgress(progress));

      if (performance.now() < programmaticScrollUntilRef.current) {
        return;
      }

      const nextChapter = getChapterFromProgress(progress);
      setActiveIndex((prev) => (prev === nextChapter ? prev : nextChapter));
    };

    const scheduleUpdate = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateFromScroll);
      }
    };

    const startListening = () => {
      if (listening) return;
      listening = true;
      updateFromScroll();
      window.addEventListener('scroll', scheduleUpdate, { passive: true });
      window.addEventListener('resize', scheduleUpdate, { passive: true });
    };

    const stopListening = () => {
      if (!listening) return;
      listening = false;
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          startListening();
        } else {
          stopListening();
        }
      },
      { rootMargin: '320px 0px' }
    );
    observer.observe(runwayEl);

    return () => {
      observer.disconnect();
      stopListening();
    };
  }, [rawProgress]);

  /*
   * Mobile vertical card observer:
   * Highlights the milestone currently centered in mobile viewport.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cards = mobileCardRefs.current.filter(Boolean) as HTMLElement[];
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-chapter-index'));
            if (!Number.isNaN(idx)) {
              setMobileActiveIndex(idx);
            }
          }
        }
      },
      {
        rootMargin: '-32% 0px -42% 0px',
        threshold: 0.1,
      }
    );

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navigateToChapter = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(
        0,
        Math.min(STORY_MILESTONES.length - 1, index)
      );
      setActiveIndex(clampedIndex);
      rawProgress.set(TIMELINE_PROGRESS_STOPS[clampedIndex] ?? 0.1);

      const runway = runwayRef.current;
      const sticky = stickyRef.current;
      if (!runway || !sticky) return;

      const runwayRect = runway.getBoundingClientRect();
      const stickyHeight = sticky.offsetHeight || window.innerHeight;
      const travelDistance = Math.max(1, runwayRect.height - stickyHeight);
      const targetProgress = CHAPTER_SCROLL_TARGETS[clampedIndex] ?? 0.06;
      const targetScrollY = Math.max(
        0,
        window.scrollY + runwayRect.top + targetProgress * travelDistance
      );

      programmaticScrollUntilRef.current =
        performance.now() + (prefersReducedMotion ? 50 : 620);

      window.scrollTo({
        top: targetScrollY,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [prefersReducedMotion, rawProgress]
  );

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const count = STORY_MILESTONES.length;
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
      navigateToChapter(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section
      id="our-story"
      aria-labelledby="our-story-heading"
      className="relative overflow-x-clip bg-[linear-gradient(180deg,#F1EEE5_0%,#F7F5EF_14%,#F7F5EF_88%,#EFECE2_100%)] transition-colors duration-300 dark:bg-[#050B08] dark:bg-none"
    >
      {/* ================= DESKTOP & TABLET STICKY SCROLL STORYTELLING (md+) ================= */}
      <div
        ref={runwayRef}
        className="relative hidden md:block md:h-[2350px] lg:h-[2600px]"
      >
        <div
          ref={stickyRef}
          className="sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden py-6 lg:py-8"
        >
          {/* Cohesive UAE Skyline & Atmospheric Backdrop Inside Sticky Stage */}
          <OurStorySkylineBackdrop />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8">
            {/* ---------- 1. COMPACT EDITORIAL INTRODUCTION ---------- */}
            <header className="mx-auto max-w-[590px] text-center">
              <div className="mb-1.5 flex items-center justify-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-[1.5px] w-7 rounded-full bg-[#C9A45C]"
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#454846] dark:text-[#929D95]">
                  OUR STORY &amp; JOURNEY
                </span>
              </div>

              <h2
                id="our-story-heading"
                className="font-serif text-[30px] font-semibold leading-[1.12] tracking-[-0.015em] text-[#222321] dark:text-[#F4F0E8] lg:text-[38px]"
              >
                A Journey Built on{' '}
                <span className="relative inline-block italic font-semibold text-[#063D29] dark:text-[#2EB04B]">
                  Trust.
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 150 12"
                    fill="none"
                    className="pointer-events-none absolute -bottom-1.5 left-0 h-2 w-full"
                  >
                    <path
                      d="M3 9.5 C 44 3, 108 2, 147 7"
                      stroke="#C9A45C"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <p className="mx-auto mt-2 max-w-[530px] text-[13.5px] leading-[1.58] text-[#4A4E4B] dark:text-[#C1C8C1] lg:text-[14.5px]">
                From a focused beginning to a growing presence across the UAE,
                our journey reflects a commitment to helping businesses move
                forward with confidence.
              </p>
            </header>

            {/* ---------- 2. TWO-COLUMN STORYTELLING COMPOSITION ---------- */}
            <div
              id={`${baseId}-panel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${activeChapter.id}`}
              className="mt-6 grid grid-cols-12 items-center gap-6 lg:mt-8 lg:gap-10"
            >
              {/* LEFT: Coordinated Chapter Typography */}
              <div className="col-span-5 min-h-[210px] lg:min-h-[240px]">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={activeChapter.id}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.16, ease: 'easeOut' }
                    }
                  >
                    {/* Chapter Indicator */}
                    <m.p
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 6 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                      }
                      className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9A45C]"
                    >
                      CHAPTER {activeChapter.chapter} / 0
                      {STORY_MILESTONES.length}
                    </m.p>

                    {/* Year Display */}
                    <m.p
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 10 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.5,
                              delay: 0.04,
                              ease: [0.22, 1, 0.36, 1],
                            }
                      }
                      className={cn(
                        'mt-1.5 font-serif font-bold leading-none tracking-tight text-[#063D29] dark:text-[#2EB04B]',
                        activeChapter.year === 'Today'
                          ? 'text-[44px] uppercase lg:text-[56px]'
                          : 'text-[50px] lg:text-[64px]'
                      )}
                    >
                      {activeChapter.year}
                    </m.p>

                    {/* Milestone Heading */}
                    <m.h3
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 10 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.52,
                              delay: 0.09,
                              ease: [0.22, 1, 0.36, 1],
                            }
                      }
                      className="mt-2.5 font-serif text-[22px] font-semibold leading-snug text-[#222321] dark:text-[#F4F0E8] lg:text-[28px]"
                    >
                      {activeChapter.title}
                    </m.h3>

                    <span
                      aria-hidden="true"
                      className="my-3 block h-[2px] w-10 rounded-full bg-[#C9A45C]"
                    />

                    {/* Milestone Narrative Copy */}
                    <m.p
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 8 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.55,
                              delay: 0.14,
                              ease: [0.22, 1, 0.36, 1],
                            }
                      }
                      className="max-w-[380px] text-[14px] leading-[1.62] text-[#4A4E4B] dark:text-[#C1C8C1] lg:text-[15px]"
                    >
                      {activeChapter.description}
                    </m.p>
                  </m.div>
                </AnimatePresence>
              </div>

              {/* RIGHT: Three-Layer UAE Sculpted Arch Photograph */}
              <div className="col-span-7">
                <OurStoryArchFrame
                  milestones={STORY_MILESTONES}
                  activeIndex={activeIndex}
                  sizes="(min-width: 1280px) 580px, (min-width: 1024px) 52vw, 54vw"
                  className="mx-auto max-w-[400px] lg:max-w-[540px] xl:max-w-[580px]"
                />
              </div>
            </div>

            {/* ---------- 3. INTEGRATED SCROLL-PROGRESS TIMELINE ---------- */}
            <div className="mt-6 lg:mt-8">
              <div className="relative w-full">
                {/* Flowing SVG S-Curve Track Behind Nodes */}
                <div className="pointer-events-none relative h-[48px] w-full">
                  <svg
                    viewBox="0 0 1000 56"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden="true"
                    className="absolute inset-0 z-0 h-full w-full"
                  >
                    {/* Inactive Muted Sage Base Track */}
                    <path
                      d={TIMELINE_PATH}
                      stroke="#A6B5A3"
                      strokeOpacity="0.48"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      className="dark:stroke-[#385244]"
                    />
                    {/* Progressive Deep Emerald Stroke Driven by Scroll */}
                    <m.path
                      d={TIMELINE_PATH}
                      stroke="#07563D"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="dark:stroke-[#2EB04B]"
                      style={{
                        pathLength: prefersReducedMotion
                          ? rawProgress
                          : smoothProgress,
                      }}
                    />
                    {/* Delicate Champagne-Gold Filament */}
                    <m.path
                      d={TIMELINE_PATH}
                      stroke="#C9A45C"
                      strokeOpacity="0.65"
                      strokeWidth="0.95"
                      strokeLinecap="round"
                      style={{
                        pathLength: prefersReducedMotion
                          ? rawProgress
                          : smoothProgress,
                      }}
                    />
                  </svg>
                </div>

                {/* Single Accessible Tablist Overlay Spanning Nodes & Compact Labels */}
                <div
                  role="tablist"
                  aria-label="Story milestones"
                  className="-mt-[48px] relative z-10 grid grid-cols-4 gap-2 text-center"
                >
                  {STORY_MILESTONES.map((chapter, index) => {
                    const isActive = activeIndex === index;
                    const isVisited = index < activeIndex;
                    const nodeTop = TIMELINE_NODE_Y_PERCENT[index] ?? 50;

                    return (
                      <button
                        key={`milestone-tab-${chapter.id}`}
                        ref={(el) => {
                          tabRefs.current[index] = el;
                        }}
                        id={`${baseId}-tab-${chapter.id}`}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`${baseId}-panel`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => navigateToChapter(index)}
                        onKeyDown={(e) => handleTabKeyDown(e, index)}
                        className="group relative flex cursor-pointer flex-col items-center rounded-xl pb-1.5 pt-[52px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07563D]"
                      >
                        {/* Curve-Aligned Milestone Node */}
                        <span
                          aria-hidden="true"
                          style={{ top: `${(nodeTop * 48) / 100}px` }}
                          className="absolute left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                        >
                          {isActive && (
                            <span className="absolute inset-0 rounded-full bg-[#C9A45C]/30 shadow-[0_0_16px_rgba(201,164,92,0.55)]" />
                          )}
                          <span
                            className={cn(
                              'relative flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300',
                              isActive
                                ? 'scale-110 border-[#C9A45C] bg-[#063D29] dark:bg-[#2EB04B]'
                                : isVisited
                                  ? 'border-[#C9A45C]/80 bg-[#07563D]/90 dark:bg-[#1B7A4B]'
                                  : 'border-[#A6B5A3] bg-[#F7F5EF] group-hover:border-[#C9A45C] dark:bg-[#0B1510]'
                            )}
                          >
                            {isActive ? (
                              <span className="h-1.5 w-1.5 rounded-full bg-[#F5DDA0]" />
                            ) : (
                              <span
                                className={cn(
                                  'h-1 w-1 rounded-full',
                                  isVisited ? 'bg-[#C9A45C]' : 'bg-[#C9A45C]/75'
                                )}
                              />
                            )}
                          </span>
                        </span>

                        {/* Compact Under-Node Year & Title */}
                        <span
                          className={cn(
                            'font-serif text-[16px] font-bold leading-tight transition-colors lg:text-[17px]',
                            isActive
                              ? 'text-[#063D29] dark:text-[#2EB04B]'
                              : 'text-[#222321]/65 group-hover:text-[#063D29] dark:text-[#929D95] dark:group-hover:text-[#F4F0E8]'
                          )}
                        >
                          {chapter.year}
                        </span>
                        <span
                          className={cn(
                            'mt-0.5 text-[11.5px] font-medium transition-colors',
                            isActive
                              ? 'text-[#222321] dark:text-[#F4F0E8]'
                              : 'text-[#4A4E4B]/75 group-hover:text-[#222321] dark:text-[#879188] dark:group-hover:text-[#C1C8C1]'
                          )}
                        >
                          {chapter.title}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            'mt-1 h-[1.5px] rounded-full bg-[#C9A45C] transition-all duration-300',
                            isActive ? 'w-7 opacity-100' : 'w-0 opacity-0'
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE DEDICATED VERTICAL CHAPTER LAYOUT (< md) ================= */}
      <div className="relative overflow-hidden pb-14 pt-10 md:hidden">
        <OurStorySkylineBackdrop />

        <div className="relative z-10 mx-auto max-w-xl px-5">
          {/* Compact Mobile Header (No Duplicate Headline Across Viewports) */}
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-[1.5px] w-6 rounded-full bg-[#C9A45C]"
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#454846] dark:text-[#929D95]">
                OUR STORY &amp; JOURNEY
              </span>
            </div>

            <p className="font-serif text-[28px] font-semibold leading-[1.12] tracking-[-0.015em] text-[#222321] dark:text-[#F4F0E8]">
              A Journey Built on{' '}
              <span className="relative inline-block italic font-semibold text-[#063D29] dark:text-[#2EB04B]">
                Trust.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 150 12"
                  fill="none"
                  className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full"
                >
                  <path
                    d="M3 9.5 C 44 3, 108 2, 147 7"
                    stroke="#C9A45C"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </p>

            <p className="mx-auto mt-2.5 max-w-[400px] text-[13.5px] leading-[1.58] text-[#4A4E4B] dark:text-[#C1C8C1]">
              From a focused beginning to a growing presence across the UAE, our
              journey reflects a commitment to helping businesses move forward
              with confidence.
            </p>
          </div>

          {/* Vertical Chapter Timeline Stack */}
          <div className="relative mt-8 space-y-9 pl-6">
            {/* Subtle Vertical Spine */}
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-[7px] top-3 w-[1.5px] bg-gradient-to-b from-[#07563D]/60 via-[#C9A45C]/55 to-[#063D29]/75"
            />

            {STORY_MILESTONES.map((milestone, index) => {
              const isInViewActive = mobileActiveIndex === index;

              return (
                <m.article
                  key={`mobile-${milestone.id}`}
                  ref={(el) => {
                    mobileCardRefs.current[index] = el;
                  }}
                  data-chapter-index={index}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="relative"
                >
                  {/* Node Marker on Vertical Journey Line */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -left-6 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors duration-300',
                      isInViewActive
                        ? 'border-[#C9A45C] bg-[#063D29] shadow-[0_0_12px_rgba(201,164,92,0.45)] dark:bg-[#2EB04B]'
                        : 'border-[#A6B5A3] bg-[#F7F5EF] dark:border-[#385244] dark:bg-[#08140F]'
                    )}
                  >
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        isInViewActive ? 'bg-[#F5DDA0]' : 'bg-[#C9A45C]/70'
                      )}
                    />
                  </span>

                  {/* Chapter Indicator Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
                      CHAPTER {milestone.chapter} / 0{STORY_MILESTONES.length}
                    </span>
                    <span
                      className={cn(
                        'h-[1.5px] w-8 rounded-full transition-colors duration-300',
                        isInViewActive ? 'bg-[#07563D] dark:bg-[#2EB04B]' : 'bg-[#A6B5A3]/40 dark:bg-[#385244]'
                      )}
                    />
                  </div>

                  {/* Year + Title */}
                  <div className="mt-1 flex items-baseline gap-2.5">
                    <span className="font-serif text-[32px] font-bold leading-none text-[#063D29] dark:text-[#2EB04B]">
                      {milestone.year}
                    </span>
                    <h3 className="font-serif text-[19px] font-semibold text-[#222321] dark:text-[#F4F0E8]">
                      {milestone.title}
                    </h3>
                  </div>

                  {/* Narrative Copy */}
                  <p className="mt-1.5 text-[13.5px] leading-[1.58] text-[#4A4E4B] dark:text-[#C1C8C1]">
                    {milestone.description}
                  </p>

                  {/* Sculpted Architectural Photo */}
                  <div className="mt-3.5">
                    <OurStoryMobileArchImage milestone={milestone} />
                  </div>
                </m.article>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= SCULPTED BOTTOM WAVE BRIDGE INTO FOOTER ================= */}
      <OurStoryBottomTransition />
    </section>
  );
}

export default OurStoryJourney;
