'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * Polaroid Line Carousel — photographic prints suspended from a curved rope.
 * Drag the line, click any print, or use keyboard arrows / nav buttons;
 * prints swing with damped spring physics and settle smoothly at centre.
 */

export type LandPalette = 'dawn' | 'alpine' | 'dusk' | 'mist';

export type Slide = {
  id?: string;
  image?: string;
  title?: string;
  caption?: string;
  alt?: string;
  href?: string;
  /** Palette and seed of the procedural exhibition plate used when `image` is empty. */
  palette?: LandPalette;
  seed?: number;
};

export type PolaroidLineCarouselProps = {
  slides?: Slide[];
  /** Height of the hanging rope stage in CSS length or px. */
  height?: number | string;
  /** Width of a print in px (scales down automatically on narrow screens). */
  cardWidth?: number;
  /** How far the rope sags in the middle, px. */
  sag?: number;
  /** How much the prints swing; 0 holds them still. */
  swing?: number;
  /** ms per print; 0 turns autoplay off. Pauses while interacting. */
  autoplay?: number;
  /** Zero-based index to start centred on. */
  initialIndex?: number;
  /** Colour of the rope. */
  string?: string;
  background?: string;
  ink?: string;
  onChange?: (index: number) => void;
  renderFooter?: (activeIndex: number, slide: Slide, controls: {
    prev: () => void;
    next: () => void;
    goTo: (index: number) => void;
    total: number;
  }) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

export function wrap(i: number, n: number): number {
  return n ? ((i % n) + n) % n : 0;
}

export function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v));
}

/** Height of a rope sagging by `sag` between (0, y0) and (w, y0), at x. */
export function stringY(x: number, w: number, y0: number, sag: number): number {
  const t = clamp(x / w, 0, 1);
  return y0 + 4 * sag * t * (1 - t);
}

/** One step of a critically damped spring toward target. */
export function springStep(
  x: number,
  v: number,
  target: number,
  dt: number,
  k = 70
): [number, number] {
  const c = 2 * Math.sqrt(k);
  const nv = v + (k * (target - x) - c * v) * dt;
  return [x + nv * dt, nv];
}

/** One step of a print's swing. */
export function swingStep(
  a: number,
  w: number,
  lineVel: number,
  dt: number,
  gain: number
): [number, number] {
  const nw = w + (-38 * a - 4.2 * w + lineVel * 0.0034 * gain) * dt;
  return [clamp(a + nw * dt, -0.6, 0.6), nw];
}

/** Index of the print nearest the centre for a line offset. */
export function nearestAt(off: number, spacing: number, n: number): number {
  return clamp(Math.round(off / spacing), 0, Math.max(0, n - 1));
}

export function pad2(n: number): string {
  return n < 10 ? '0' + n : String(n);
}

const PALETTES: Record<
  LandPalette,
  { top: string; bottom: string; sun: string; far: string; near: string; mist: string }
> = {
  dawn: {
    top: '#e7c9a5',
    bottom: '#f8efe2',
    sun: '#fff6e6',
    far: '#c9b39b',
    near: '#144731',
    mist: '250,245,236',
  },
  alpine: {
    top: '#b7c7bd',
    bottom: '#eef2ee',
    sun: '#ffffff',
    far: '#8fa698',
    near: '#0d3625',
    mist: '242,246,243',
  },
  dusk: {
    top: '#18382a',
    bottom: '#e3b982',
    sun: '#ffe8bf',
    far: '#6e7c6d',
    near: '#0b2218',
    mist: '245,222,190',
  },
  mist: {
    top: '#c7cfc8',
    bottom: '#f3f1eb',
    sun: '#ffffff',
    far: '#9fb0a4',
    near: '#18422f',
    mist: '246,244,238',
  },
};

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexRgb(h: string): [number, number, number] {
  const v = parseInt(h.replace('#', ''), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function mixRgb(a: string, b: string, t: number): string {
  const A = hexRgb(a);
  const B = hexRgb(b);
  return 'rgb(' + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',') + ')';
}

function paintLandscape(
  seed: number,
  palette: LandPalette,
  w = 1200,
  h = 900
): string {
  if (typeof document === 'undefined') return '';
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  if (!g) return '';
  const P = PALETTES[palette] ?? PALETTES.dawn;
  const r = mulberry32(seed * 104729 + 7);

  const sky = g.createLinearGradient(0, 0, 0, h * 0.72);
  sky.addColorStop(0, P.top);
  sky.addColorStop(1, P.bottom);
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h);

  const sx = w * (0.22 + r() * 0.56);
  const sy = h * (0.24 + r() * 0.16);
  const halo = g.createRadialGradient(sx, sy, 0, sx, sy, w * 0.45);
  halo.addColorStop(0, 'rgba(' + hexRgb(P.sun).join(',') + ',.85)');
  halo.addColorStop(0.1, 'rgba(' + hexRgb(P.sun).join(',') + ',.48)');
  halo.addColorStop(1, 'rgba(' + hexRgb(P.sun).join(',') + ',0)');
  g.fillStyle = halo;
  g.fillRect(0, 0, w, h);
  g.fillStyle = P.sun;
  g.beginPath();
  g.arc(sx, sy, h * 0.042, 0, Math.PI * 2);
  g.fill();

  const layers = 5;
  for (let L = 0; L < layers; L++) {
    const k = L / (layers - 1);
    const base = h * (0.44 + k * 0.38);
    const amp = h * (0.065 + k * 0.09);
    const ph = [r(), r(), r(), r()].map((v) => v * Math.PI * 2);
    const fr = [1.3 + r(), 3.1 + r() * 2, 7 + r() * 4, 17 + r() * 8];
    const ridge = (x: number) => {
      const u = x / w;
      return (
        base -
        amp *
          (0.55 * Math.sin(u * fr[0] + ph[0]) +
            0.28 * Math.sin(u * fr[1] + ph[1]) +
            0.12 * Math.abs(Math.sin(u * fr[2] + ph[2])) +
            0.05 * Math.sin(u * fr[3] + ph[3]))
      );
    };
    const mist = g.createLinearGradient(0, base - amp * 1.4, 0, base + amp * 0.4);
    mist.addColorStop(0, 'rgba(' + P.mist + ',0)');
    mist.addColorStop(1, 'rgba(' + P.mist + ',' + (0.55 - k * 0.35).toFixed(2) + ')');
    g.fillStyle = mist;
    g.fillRect(0, base - amp * 1.4, w, amp * 1.8);

    const body = g.createLinearGradient(0, base - amp, 0, h);
    body.addColorStop(0, mixRgb(P.far, P.near, Math.pow(k, 1.3)));
    body.addColorStop(1, mixRgb(P.far, P.near, Math.min(1, Math.pow(k, 1.3) + 0.18)));
    g.fillStyle = body;
    g.beginPath();
    g.moveTo(0, h);
    for (let x = 0; x <= w; x += 6) g.lineTo(x, ridge(x));
    g.lineTo(w, h);
    g.closePath();
    g.fill();
  }

  const vig = g.createRadialGradient(w / 2, h * 0.45, h * 0.3, w / 2, h / 2, w * 0.78);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,.22)');
  g.fillStyle = vig;
  g.fillRect(0, 0, w, h);

  const grain = g.getImageData(0, 0, w, h);
  const d = grain.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = (r() - 0.5) * 12;
    d[i] += v;
    d[i + 1] += v;
    d[i + 2] += v;
  }
  g.putImageData(grain, 0, 0);
  return c.toDataURL('image/jpeg', 0.88);
}

function useSlideImages(slides: Slide[]): string[] {
  const key = slides
    .map((s) => s.image || (s.palette || 'dawn') + ':' + (s.seed ?? 1))
    .join('|');
  const [painted, setPainted] = React.useState(() => slides.map(() => ''));
  React.useEffect(() => {
    setPainted(
      slides.map((s, i) =>
        s.image ? '' : paintLandscape(s.seed ?? i + 1, s.palette || 'dawn')
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return slides.map((s, i) => s.image || painted[i] || '');
}

const PL_CSS = [
  '.pl-root{position:relative;width:100%;overflow:hidden;background:var(--pl-bg);color:var(--pl-ink);user-select:none;-webkit-user-select:none;touch-action:pan-y;outline:none;cursor:grab}',
  '.pl-root[data-drag="1"]{cursor:grabbing}',
  '.pl-root:focus-visible{box-shadow:inset 0 0 0 2px var(--pl-ink)}',
  '.pl-string{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible}',
  '.pl-card{position:absolute;left:0;top:0;width:var(--pl-cw);transform-origin:50% 0;will-change:transform;cursor:pointer}',
  '.pl-print{position:relative;overflow:hidden;margin-top:11px;border-radius:14px;background:linear-gradient(135deg,rgba(255,255,255,0.42) 0%,rgba(255,253,248,0.16) 52%,rgba(201,164,92,0.12) 100%);backdrop-filter:blur(16px) saturate(165%);-webkit-backdrop-filter:blur(16px) saturate(165%);padding:9px 9px 0;border:1px solid rgba(255,255,255,0.62);box-shadow:0 16px 36px -12px rgba(11,59,40,0.20),inset 0 1.5px 1px rgba(255,255,255,0.92),inset 0 -1.5px 2px rgba(11,59,40,0.14),inset 2px 2px 3px -1px rgba(255,255,255,0.65),inset -2px -2px 4px -1px rgba(201,164,92,0.32);transition:transform .48s cubic-bezier(.22,1,.36,1),filter .48s ease,box-shadow .48s ease,border-color .48s ease}',
  '.pl-print::before{content:"";position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:radial-gradient(circle at 16% 10%,rgba(255,255,255,0.62) 0%,rgba(255,255,255,0.16) 32%,transparent 60%),linear-gradient(180deg,rgba(255,255,255,0.22) 0%,transparent 28%);z-index:2}',
  '.dark .pl-print{background:linear-gradient(135deg,rgba(255,255,255,0.12) 0%,rgba(12,38,27,0.28) 52%,rgba(201,164,92,0.10) 100%);border-color:rgba(255,255,255,0.22);box-shadow:0 20px 44px -12px rgba(0,0,0,0.72),inset 0 1.5px 1px rgba(255,255,255,0.28),inset 0 -1.5px 3px rgba(0,0,0,0.52),inset 2px 2px 4px -1px rgba(255,255,255,0.14),inset -2px -2px 4px -1px rgba(201,164,92,0.24)}',
  '.dark .pl-print::before{background:radial-gradient(circle at 16% 10%,rgba(255,255,255,0.24) 0%,rgba(201,164,92,0.08) 32%,transparent 62%),linear-gradient(180deg,rgba(255,255,255,0.08) 0%,transparent 28%)}',
  '.pl-card[data-on="1"] .pl-print{border-color:rgba(201,164,92,0.72);box-shadow:0 24px 52px -12px rgba(11,59,40,0.30),0 0 22px rgba(201,164,92,0.18),inset 0 2px 1px rgba(255,255,255,0.96),inset 0 -2px 3px rgba(11,59,40,0.16),inset 0 0 0 1px rgba(201,164,92,0.36)}',
  '.dark .pl-card[data-on="1"] .pl-print{border-color:rgba(210,180,117,0.55);box-shadow:0 26px 56px -12px rgba(0,0,0,0.84),0 0 26px rgba(46,176,75,0.16),inset 0 1.5px 1px rgba(255,255,255,0.34),inset 0 -2px 4px rgba(0,0,0,0.56),inset 0 0 0 1px rgba(210,180,117,0.30)}',
  '.pl-card[data-on="0"] .pl-print{transform:scale(.86);filter:saturate(.78) brightness(.95)}',
  '.pl-card[data-on="0"]:hover .pl-print{transform:scale(.90);filter:saturate(.94) brightness(.99)}',
  '.pl-shot{position:relative;aspect-ratio:4/3.75;overflow:hidden;border-radius:6px;background:#e6e1d6}',
  '.pl-shot img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;display:block;pointer-events:none}',
  '.pl-note{position:relative;z-index:3;padding:12px 8px 14px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:2px}',
  '.pl-note-title{font:600 15px/1.15 ui-serif,Georgia,"Times New Roman",serif;color:#0b3b28;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}',
  '.dark .pl-note-title{color:#f4f0e8}',
  '.pl-note-sub{font:500 10px/1.2 ui-sans-serif,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#7a6a4b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}',
  '.dark .pl-note-sub{color:#c9a45c}',
  '.pl-peg{position:absolute;left:50%;top:0;width:11px;height:24px;margin-left:-5.5px;border-radius:2px;background:linear-gradient(90deg,#b38c48,#e8cd8e 48%,#9d7737);box-shadow:0 3px 5px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.45);z-index:4}',
  '.pl-peg::after{content:"";position:absolute;left:4px;top:8px;width:3px;height:7px;background:rgba(68,48,18,.48);border-radius:1px}',
  '.pl-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',
  '@media (prefers-reduced-motion:reduce){.pl-print{transition:none}}',
].join('\n');

export default function PolaroidLineCarousel({
  slides = [],
  height = 460,
  cardWidth = 280,
  sag = 42,
  swing = 0.85,
  autoplay = 0,
  initialIndex = 0,
  string = '#C9A45C',
  background = 'transparent',
  ink = 'currentColor',
  onChange,
  renderFooter,
  className,
  style,
  ariaLabel = 'Featured branches carousel',
}: PolaroidLineCarouselProps) {
  const n = slides.length;
  const startIdx = clamp(initialIndex, 0, Math.max(0, n - 1));
  const srcs = useSlideImages(slides);
  const [active, setActive] = React.useState(startIdx);
  const [dragging, setDragging] = React.useState(false);
  const [size, setSize] = React.useState({ w: 1200, h: 460, cw: cardWidth });
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const pathRef = React.useRef<SVGPathElement | null>(null);
  const cards = React.useRef<(HTMLDivElement | null)[]>([]);
  const sim = React.useRef({
    off: startIdx * cardWidth * 1.08,
    vel: 0,
    target: startIdx * cardWidth * 1.08,
    a: [] as number[],
    w: [] as number[],
  });
  const drag = React.useRef<null | {
    x: number;
    off: number;
    lx: number;
    lt: number;
    v: number;
    moved: boolean;
  }>(null);
  const lastTouch = React.useRef(0);
  const activeRef = React.useRef(startIdx);
  const opts = React.useRef({ sag, swing });
  opts.current = { sag, swing };

  const spacing = size.cw * 1.08;
  const goTo = React.useCallback(
    (i: number) => {
      if (n <= 0) return;
      sim.current.target = clamp(i, 0, n - 1) * spacing;
    },
    [n, spacing]
  );

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => {
      const r = stage.getBoundingClientRect();
      const cw = Math.round(
        Math.max(210, Math.min(cardWidth, r.width * 0.68, r.height * 0.68))
      );
      setSize({ w: r.width, h: r.height, cw });
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, [cardWidth]);

  React.useEffect(() => {
    sim.current.target = activeRef.current * spacing;
    sim.current.off = activeRef.current * spacing;
  }, [spacing]);

  React.useEffect(() => {
    onChange?.(active);
  }, [active, onChange]);

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage || n === 0) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let visible = true;
    let raf = 0;
    let prev = performance.now();
    const S = sim.current;
    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      const { w, h, cw } = size;
      const y0 = Math.max(24, h * 0.08);
      const d = drag.current;
      let lineVel: number;
      if (d && d.moved) {
        lineVel = d.v * 1000;
      } else {
        const before = S.off;
        [S.off, S.vel] = springStep(S.off, S.vel, S.target, dt);
        lineVel = -(S.off - before) / Math.max(dt, 1e-3);
      }
      const o = opts.current;
      const g = reduce ? 0 : o.swing;
      const near = nearestAt(S.off, spacing, n);
      for (let i = 0; i < n; i++) {
        const el = cards.current[i];
        if (!el) continue;
        const x = w / 2 + i * spacing - S.off;
        if (x < -cw * 1.5 || x > w + cw * 1.5) {
          el.style.visibility = 'hidden';
          continue;
        }
        el.style.visibility = 'visible';
        let a = S.a[i] || 0;
        let av = S.w[i] || 0;
        [a, av] = swingStep(a, av, lineVel, dt, g);
        if (g) a += Math.sin(now / 1600 + i * 1.7) * 0.0005 * g;
        S.a[i] = a;
        S.w[i] = av;
        const y = stringY(x, w, y0, o.sag) - 6;
        el.style.transform =
          'translate(' +
          (x - cw / 2).toFixed(1) +
          'px,' +
          y.toFixed(1) +
          'px) rotate(' +
          a.toFixed(4) +
          'rad)';
        el.style.zIndex = String(i === near ? n + 1 : n - Math.abs(i - near));
      }
      pathRef.current?.setAttribute(
        'd',
        'M0 ' + y0 + ' Q' + w / 2 + ' ' + (y0 + 2 * o.sag) + ' ' + w + ' ' + y0
      );
      if (near !== activeRef.current) {
        activeRef.current = near;
        setActive(near);
      }
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(stage);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [size, spacing, n]);

  React.useEffect(() => {
    if (!autoplay || n < 2) return;
    const t = window.setInterval(() => {
      if (
        document.hidden ||
        drag.current ||
        performance.now() - lastTouch.current < autoplay
      )
        return;
      goTo(activeRef.current >= n - 1 ? 0 : activeRef.current + 1);
    }, autoplay);
    return () => window.clearInterval(t);
  }, [autoplay, n, goTo]);

  const onDown = (e: React.PointerEvent) => {
    lastTouch.current = performance.now();
    drag.current = {
      x: e.clientX,
      off: sim.current.off,
      lx: e.clientX,
      lt: e.timeStamp,
      v: 0,
      moved: false,
    };
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
      stageRef.current?.setPointerCapture(e.pointerId);
    }
    if (!d.moved) return;
    const dt = Math.max(1, e.timeStamp - d.lt);
    d.v = 0.7 * ((e.clientX - d.lx) / dt) + 0.3 * d.v;
    d.lx = e.clientX;
    d.lt = e.timeStamp;
    const max = (n - 1) * spacing;
    let off = d.off - dx;
    if (off < 0) off *= 0.35;
    if (off > max) off = max + (off - max) * 0.35;
    sim.current.off = off;
  };

  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    lastTouch.current = performance.now();
    if (!d) return;
    if (d.moved) {
      setDragging(false);
      sim.current.vel = -d.v * 1000;
      goTo(nearestAt(sim.current.off - d.v * 180, spacing, n));
      return;
    }
    const card = (e.target as HTMLElement).closest('[data-i]');
    if (card) goTo(Number(card.getAttribute('data-i')));
  };

  const step = React.useCallback(
    (dir: number) => {
      lastTouch.current = performance.now();
      goTo(clamp(activeRef.current + dir, 0, n - 1));
    },
    [goTo, n]
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
    else return;
    e.preventDefault();
  };

  const s = slides[active] || {};

  return (
    <div className={cn('w-full', className)} style={style}>
      <div
        ref={stageRef}
        className="pl-root"
        style={{
          height,
          ['--pl-bg' as string]: background,
          ['--pl-ink' as string]: ink,
          ['--pl-cw' as string]: size.cw + 'px',
        }}
        data-drag={dragging ? '1' : '0'}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <style>{PL_CSS}</style>
        <svg className="pl-string" aria-hidden="true">
          <path
            ref={pathRef}
            fill="none"
            stroke={string}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {slides.map((sl, i) => (
          <div
            key={sl.id ?? i}
            className="pl-card"
            data-i={i}
            data-on={i === active ? '1' : '0'}
            ref={(el) => {
              cards.current[i] = el;
            }}
            aria-hidden={i === active ? undefined : true}
          >
            <div className="pl-print">
              <div className="pl-shot">
                {srcs[i] ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={srcs[i]}
                    alt={sl.alt || sl.title || ''}
                    draggable={false}
                  />
                ) : null}
              </div>
              <div className="pl-note">
                <span className="pl-note-title">{sl.title || ''}</span>
                {sl.caption ? (
                  <span className="pl-note-sub">{sl.caption}</span>
                ) : null}
              </div>
            </div>
            <div className="pl-peg" />
          </div>
        ))}
        <div className="pl-sr" aria-live="polite">
          {'Branch ' + (active + 1) + ' of ' + n + (s.title ? ': ' + s.title : '')}
        </div>
      </div>

      {renderFooter ? (
        renderFooter(active, s, {
          prev: () => step(-1),
          next: () => step(1),
          goTo,
          total: n,
        })
      ) : (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous branch"
            onClick={() => step(-1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#C9A45C]/40 text-[#0B3B28] transition hover:bg-[#0B3B28] hover:text-white dark:text-[#F4F0E8] dark:hover:bg-[#C9A45C] dark:hover:text-[#050B08]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="font-mono text-xs tracking-widest text-[#545955] dark:text-[#929D95]">
            {pad2(active + 1)} / {pad2(n)}
          </span>
          <button
            type="button"
            aria-label="Next branch"
            onClick={() => step(1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#C9A45C]/40 text-[#0B3B28] transition hover:bg-[#0B3B28] hover:text-white dark:text-[#F4F0E8] dark:hover:bg-[#C9A45C] dark:hover:text-[#050B08]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
