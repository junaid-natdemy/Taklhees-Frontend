'use client';

import * as React from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from 'next-themes';
import { LiquidToggle, NimbusToggleIcons } from '@/components/ui/liquid-glass-toggle';

type DocumentWithViewTransition = Document & {
  startViewTransition?: (updateCallback: () => void) => {
    ready?: Promise<void>;
    finished: Promise<void>;
    skipTransition?: () => void;
  };
};

const VERTEX_COUNT = 56;

function buildLiquidPolygon(
  cx: number,
  cy: number,
  baseRadius: number,
  phase: number,
  amplitude: number
): string {
  if (baseRadius <= 0) {
    return `polygon(${Array.from({ length: VERTEX_COUNT }, () => `${cx}px ${cy}px`).join(', ')})`;
  }

  const points: string[] = [];
  for (let i = 0; i < VERTEX_COUNT; i++) {
    const theta = (i / VERTEX_COUNT) * Math.PI * 2;
    const wave =
      Math.sin(theta * 3 + phase) * 0.52 +
      Math.cos(theta * 5 - phase * 1.35) * 0.31 +
      Math.sin(theta * 8 + phase * 2.1) * 0.17;
    const r = Math.max(0, baseRadius * (1 + wave * amplitude));
    const px = Math.round(cx + Math.cos(theta) * r);
    const py = Math.round(cy + Math.sin(theta) * r);
    points.push(`${px}px ${py}px`);
  }

  return `polygon(${points.join(', ')})`;
}

export const ThemeToggle = React.memo(function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [enableSound, setEnableSound] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const activeTransitionRef = React.useRef<{ skipTransition?: () => void } | null>(null);

  React.useEffect(() => {
    setMounted(true);
    setEnableSound(window.matchMedia('(pointer: fine)').matches);
  }, []);

  const applyThemeWithLiquid = React.useCallback(
    (nextTheme: 'light' | 'dark') => {
      if (typeof document === 'undefined') {
        setTheme(nextTheme);
        return;
      }

      // Never drop user clicks: skip any in-flight transition cleanly
      if (activeTransitionRef.current) {
        activeTransitionRef.current.skipTransition?.();
        activeTransitionRef.current = null;
        React.startTransition(() => {
          setTheme(nextTheme);
        });
        return;
      }

      const doc = document as DocumentWithViewTransition;
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (!doc.startViewTransition || prefersReducedMotion) {
        React.startTransition(() => {
          setTheme(nextTheme);
        });
        return;
      }

      const rect = containerRef.current?.getBoundingClientRect();
      const x = Math.round(rect ? rect.left + rect.width / 2 : window.innerWidth - 48);
      const y = Math.round(rect ? rect.top + rect.height / 2 : 36);
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      const dir = nextTheme === 'dark' ? 1 : -1;

      const keyframes: Keyframe[] = [
        { clipPath: buildLiquidPolygon(x, y, 0, 0, 0), offset: 0 },
        { clipPath: buildLiquidPolygon(x, y, maxRadius * 0.28, dir * 0.9, 0.34), offset: 0.25 },
        { clipPath: buildLiquidPolygon(x, y, maxRadius * 0.62, dir * 1.9, 0.36), offset: 0.58 },
        { clipPath: buildLiquidPolygon(x, y, maxRadius * 0.95, dir * 2.8, 0.24), offset: 0.84 },
        { clipPath: buildLiquidPolygon(x, y, maxRadius * 1.35, dir * 3.4, 0), offset: 1 },
      ];

      // Defer 1 frame so the toggle thumb responds instantaneously with zero input lag
      requestAnimationFrame(() => {
        const transition = doc.startViewTransition?.(() => {
          flushSync(() => {
            setTheme(nextTheme);
          });
        });

        if (!transition) {
          setTheme(nextTheme);
          return;
        }

        activeTransitionRef.current = transition;

        const runGpuAnim = () => {
          document.documentElement.animate(keyframes, {
            duration: 1200,
            easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
            fill: 'both',
            pseudoElement: '::view-transition-new(root)',
          });
        };

        if (transition.ready) {
          transition.ready.then(runGpuAnim).catch(() => {});
        } else {
          runGpuAnim();
        }

        transition.finished.finally(() => {
          if (activeTransitionRef.current === transition) {
            activeTransitionRef.current = null;
          }
        });
      });
    },
    [setTheme]
  );

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      if (event.key !== 't' && event.key !== 'T') return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      const currentIsDark = (resolvedTheme || theme) === 'dark';
      applyThemeWithLiquid(currentIsDark ? 'light' : 'dark');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resolvedTheme, theme, applyThemeWithLiquid]);

  if (!mounted) {
    return (
      <span
        className="inline-block w-[55px] h-[26px] rounded-full bg-neutral-200/50 dark:bg-white/10"
        aria-hidden="true"
      />
    );
  }

  const isDark = (resolvedTheme || theme) === 'dark';

  return (
    <div ref={containerRef} className="flex items-center">
      <LiquidToggle
        size={26}
        tone={isDark ? 'dark' : 'light'}
        checked={isDark}
        onCheckedChange={(checked) => {
          applyThemeWithLiquid(checked ? 'dark' : 'light');
        }}
        icons={{ off: NimbusToggleIcons.sun, on: NimbusToggleIcons.moon }}
        label="Toggle light and dark theme"
        sound={enableSound}
      />
    </div>
  );
});

export default ThemeToggle;