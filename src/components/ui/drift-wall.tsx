'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface DriftWallItem {
  image: string;
  title?: string;
  href?: string;
  featured?: boolean;
}

export interface DriftWallProps {
  items?: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  columnWidths?: number[];
  columnHeights?: number[];
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: 'up' | 'down';
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  decorative?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface ColumnMeta {
  copyHeight: number;
  copies: number;
}

const DEFAULT_ITEMS: DriftWallItem[] = [
  // Column 1 (Left): Dubai Skyline, Strategic Advisory, Corporate Typing & Partner Relations
  {
    image: '/images/driftwall/skyline-sunset.webp',
    title: 'Dubai Business Hub',
  },
  {
    image: '/images/driftwall/team-consultation.webp',
    title: 'Executive Advisory & Strategy',
  },
  {
    image: '/images/document-signing.jpg',
    title: 'Corporate PRO & Typing Clearing',
  },
  {
    image: '/images/meeting-partners.jpg',
    title: 'Government Relations & Licensing',
  },
  // Column 2 (Center Hero): Modern Towers, TAKHLEES Training Center, Highway & Infrastructure
  {
    image: '/images/driftwall/corporate-towers.webp',
    title: 'Corporate Headquarters UAE',
  },
  {
    image: '/images/driftwall/classroom-training.webp',
    title: 'TAKHLEES Executive Training Center',
    featured: true,
  },
  {
    image: '/images/driftwall/dubai-highway-night.webp',
    title: 'Dubai Financial District',
  },
  {
    image: '/images/driftwall/construction-crane.webp',
    title: 'UAE Infrastructure & Development',
  },
  // Column 3 (Right): Partnership Handshake, Industrial Freezone, Sheikh Zayed Rd & Certifications
  {
    image: '/images/driftwall/business-handshake.webp',
    title: 'Business Setup Partnership',
  },
  {
    image: '/images/driftwall/construction-crane.webp',
    title: 'Industrial & Freezone Licensing',
  },
  {
    image: '/images/driftwall/skyline-sunset.webp',
    title: 'Sheikh Zayed Road Business Center',
  },
  {
    image: '/images/driftwall/team-consultation.webp',
    title: 'ICV & ISO Certification Experts',
  },
];

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ');

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isCoarsePointer = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const columnFactor = (index: number, variance: number): number => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

export function DriftWall({
  items = DEFAULT_ITEMS,
  columns = 3,
  tileWidth = 190,
  tileHeight = 130,
  columnWidths = [170, 295, 170],
  columnHeights = [125, 180, 125],
  gap = 16,
  radius = 24,
  tilt = 13,
  turn = -17,
  roll = 0,
  perspective = 1150,
  depth = 55,
  speed = 22,
  direction = 'up',
  variance = 0.35,
  parallax = 0.45,
  pauseOnHover = true,
  lift = 42,
  fade = 0.15,
  dim = 0.98,
  grayscale = false,
  overlayColor = 'rgba(0,0,0,0)',
  className = '',
  style,
}: DriftWallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const hoveredColRef = useRef<number>(-1);
  const wallHoveredRef = useRef<boolean>(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTsRef = useRef<number | null>(null);

  const [containerHeight, setContainerHeight] = useState(500);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const [reduced, setReduced] = useState(false);
  const [useCssDrift, setUseCssDrift] = useState(false);
  const [inView, setInView] = useState(true);

  // Sync reduced motion and pointer mode (touch devices use 0ms-JS compositor CSS drift instead of freezing)
  useEffect(() => {
    setReduced(prefersReducedMotion());
    setUseCssDrift(isCoarsePointer());

    const rmQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cpQuery = window.matchMedia('(pointer: coarse)');
    const onRmChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    const onCpChange = (e: MediaQueryListEvent) => setUseCssDrift(e.matches);

    rmQuery.addEventListener('change', onRmChange);
    cpQuery.addEventListener('change', onCpChange);
    return () => {
      rmQuery.removeEventListener('change', onRmChange);
      cpQuery.removeEventListener('change', onCpChange);
    };
  }, []);

  // Performance optimization: Pause animations when offscreen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Curate column items specifically for 100% editorial visual hierarchy
  const columnItems = useMemo<DriftWallItem[][]>(() => {
    if (columns === 3 && items.length >= 12) {
      return [
        items.slice(0, 4),   // Left column: 4 items (Skyline, Advisory, PRO, Licensing)
        items.slice(4, 8),   // Center column: 4 items (Towers, TAKHLEES Center, Highway, Crane)
        items.slice(8, 12),  // Right column: 4 items (Partnership, Freezone, Sheikh Zayed, Certifications)
      ];
    }
    const cols: DriftWallItem[][] = Array.from({ length: columns }, () => []);
    items.forEach((item, i) => cols[i % columns].push(item));
    return cols.map((col) => (col.length ? col : items.slice(0, 1)));
  }, [items, columns]);

  // Even-numbered column copies (2 or 4) so CSS -50% marquee loops seamlessly on mobile GPUs
  const columnMeta = useMemo<ColumnMeta[]>(() => {
    return columnItems.map((col, c) => {
      const colHeight = columnHeights?.[c] ?? tileHeight;
      const unit = colHeight + gap;
      const copyHeight = Math.max(unit, col.length * unit);
      const halfNeeded = Math.ceil((containerHeight * 1.45) / copyHeight);
      const copies = Math.max(2, Math.min(4, halfNeeded * 2));
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap, containerHeight, columnHeights]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 500);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const baseVelocities = useMemo<number[]>(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems]);

  const applyPlaneTransform = useCallback(
    (px: number, py: number) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) ` +
        `rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth]
  );

  useLayoutEffect(() => {
    applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);
  }, [applyPlaneTransform]);

  useEffect(() => {
    if (!inView || reduced || useCssDrift) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      return;
    }

    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const maxTilt = parallax * 6;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.12);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      for (let c = 0; c < trackRefs.current.length; c++) {
        const meta = columnMeta[c];
        if (!meta) continue;
        const paused = wallHoveredRef.current && pauseOnHover;
        const factor = paused || hoveredColRef.current === c ? 0 : 1;
        const target = baseVelocities[c] * factor;

        const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
        velocitiesRef.current[c] += (target - velocitiesRef.current[c]) * ease;
        let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
        next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
        offsetsRef.current[c] = next;

        const el = trackRefs.current[c];
        if (el) el.style.transform = `translate3d(0, ${-next}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, parallax, reduced, useCssDrift, inView, applyPlaneTransform]);

  const release = useCallback((): void => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (useCssDrift) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        };
      }
      const targetEl = e.target as HTMLElement | null;
      const tile = targetEl?.closest?.('[data-tile-id]') as HTMLElement | null;
      if (!tile) return;
      const id = tile.dataset.tileId ?? null;
      if (id === activeIdRef.current) return;
      activeIdRef.current = id;
      hoveredColRef.current = Number(tile.dataset.col);
      setActiveId(id);
    },
    [parallax, reduced, useCssDrift]
  );

  const handlePointerLeaveWall = useCallback((): void => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const maskStyle =
    fade > 0
      ? `radial-gradient(ellipse 94% 92% at 50% 50%, #000 75%, transparent 100%)`
      : undefined;

  const cssVars = useMemo<CSSProperties>(
    () =>
      ({
        '--dw-tile-w': `${tileWidth}px`,
        '--dw-tile-h': `${tileHeight}px`,
        '--dw-gap': `${gap}px`,
        '--dw-radius': `${radius}px`,
        '--dw-lift': `${lift}px`,
        '--dw-dim': dim,
        '--dw-gray': grayscale ? 1 : 0,
        '--dw-overlay': overlayColor,
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 50%',
        WebkitMaskImage: maskStyle,
        maskImage: maskStyle,
        ...style,
      }) as CSSProperties,
    [tileWidth, tileHeight, gap, radius, lift, dim, grayscale, overlayColor, perspective, maskStyle, style]
  );

  const renderTile = (item: DriftWallItem, id: string, colIndex: number, isPrimaryCopy: boolean) => {
    const colH = columnHeights?.[colIndex] ?? tileHeight;
    const isFeatured = item.featured;

    return (
      <div
        key={id}
        aria-hidden={!isPrimaryCopy || undefined}
        data-tile-id={id}
        data-col={colIndex}
        style={{ height: `${colH + gap}px` }}
        className={cx(
          'group/tile relative block flex-none outline-none w-full [transform-style:preserve-3d]',
          activeId === id && 'is-active',
          isFeatured ? 'z-20 [transform:translateZ(18px)]' : 'z-10'
        )}
      >
        <span
          style={{
            borderRadius: isFeatured ? `${radius + 4}px` : `${radius}px`,
            margin: `${gap / 2}px`,
          }}
          className={cx(
            'pointer-events-none absolute inset-0 block overflow-hidden',
            isFeatured
              ? 'border-2 border-white/60 dark:border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
              : 'border border-white/50 dark:border-white/10 shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:shadow-[0_14px_36px_rgba(0,0,0,0.45)]',
            'opacity-[var(--dw-dim)] [transform:translateZ(0)]',
            'transition-[transform,opacity,box-shadow] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
            'group-[.is-active]/tile:opacity-100 group-[.is-active]/tile:[transform:translateZ(var(--dw-lift))]',
            'group-[.is-active]/tile:shadow-[0_24px_60px_-10px_rgba(0,0,0,0.3)] dark:group-[.is-active]/tile:shadow-[0_24px_60px_-10px_rgba(0,0,0,0.8)]',
            'group-focus-visible/tile:opacity-100 group-focus-visible/tile:[transform:translateZ(var(--dw-lift))]',
            'group-focus-visible/tile:shadow-[0_20px_50px_-15px_rgba(22,160,90,0.5),0_0_0_2px_rgba(22,160,90,0.8)]'
          )}
        >
          <Image
            src={item.image}
            alt={item.title ?? 'TAKHLEES UAE'}
            fill
            sizes="(max-width: 639px) 160px, 210px"
            loading={isPrimaryCopy ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            className="block h-full w-full select-none object-cover [filter:grayscale(var(--dw-gray))_saturate(1.05)] transition-[filter] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-[.is-active]/tile:[filter:grayscale(0)_saturate(1.15)]"
          />

          {/* Glossy Bevel Reflection Highlight */}
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 opacity-70"
            aria-hidden="true"
          />

          {/* Refined Label Tag on Hover */}
          {item.title && (
            <span className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-white truncate bg-neutral-900/80 px-2.5 py-1 rounded-md backdrop-blur-xs opacity-0 group-[.is-active]/tile:opacity-100 transition-opacity">
              {item.title}
            </span>
          )}
        </span>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cx('relative h-full w-full overflow-hidden select-none', className)}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="TAKHLEES Business Drifting Wall"
    >
      <div
        ref={planeRef}
        className="absolute left-1/2 top-1/2 flex cursor-pointer flex-row [transform-style:preserve-3d] [transform-origin:50%_50%] will-change-transform"
        style={{
          transform: `translate(-50%, -50%) rotateX(${tilt}deg) rotateY(${turn}deg) rotateZ(${roll}deg) translateZ(${-depth}px)`,
        }}
      >
        {columnItems.map((col, c) => {
          const colW = columnWidths?.[c] ?? tileWidth;
          const meta = columnMeta[c];
          const initialOffset = meta.copyHeight * ((c * 0.37) % 1);
          const copies = Array.from({ length: meta.copies });
          const colVel = baseVelocities[c] ?? speed;
          const halfDistance = (meta.copies / 2) * meta.copyHeight;
          const cssDurationSec = Math.max(4, Math.round((halfDistance / Math.max(8, Math.abs(colVel))) * 10) / 10);
          const cssClass = useCssDrift && !reduced
            ? colVel < 0
              ? 'animate-infinite-scroll-y-reverse'
              : 'animate-infinite-scroll-y'
            : '';

          return (
            <div
              style={{ width: `${colW + gap}px` }}
              className="relative [transform-style:preserve-3d]"
              key={`col-${c}`}
            >
              <div
                className={cx('flex flex-col [transform-style:preserve-3d] will-change-transform', cssClass)}
                style={
                  useCssDrift && !reduced
                    ? {
                        animationDuration: `${cssDurationSec}s`,
                        animationPlayState: inView ? 'running' : 'paused',
                      }
                    : {
                        transform: `translate3d(0, ${-initialOffset}px, 0)`,
                      }
                }
                ref={(el) => {
                  trackRefs.current[c] = el;
                }}
              >
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) =>
                    renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c, copyIndex === 0)
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DriftWall;