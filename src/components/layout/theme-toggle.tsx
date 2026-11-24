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