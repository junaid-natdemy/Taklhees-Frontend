'use client';

import { useEffect, useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { useTheme } from 'next-themes';

export interface ThemeImageProps extends Omit<ImageProps, 'src' | 'className'> {
  lightSrc: string;
  darkSrc: string;
  lightClassName?: string;
  darkClassName?: string;
  className?: string;
}

/**
 * Renders only the currently active theme's image so light and dark themes
 * never preload or eagerly download hidden duplicate backdrop assets.
 */
export function ThemeImage({
  lightSrc,
  darkSrc,
  lightClassName,
  darkClassName,
  className,
  alt = '',
  ...props
}: ThemeImageProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <Image
      src={isDark ? darkSrc : lightSrc}
      alt={alt}
      className={[className, isDark ? darkClassName : lightClassName]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}
