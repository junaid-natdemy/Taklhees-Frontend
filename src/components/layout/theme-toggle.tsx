'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { LiquidToggle, NimbusToggleIcons } from '@/components/ui/liquid-glass-toggle';

export const ThemeToggle = React.memo(function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
      setTheme(currentIsDark ? 'light' : 'dark');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resolvedTheme, theme, setTheme]);

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
    <div className="flex items-center">
      <LiquidToggle
        size={26}
        tone={isDark ? 'dark' : 'light'}
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        icons={{ off: NimbusToggleIcons.sun, on: NimbusToggleIcons.moon }}
        label="Toggle light and dark theme"
        sound={true}
      />
    </div>
  );
});

export default ThemeToggle;