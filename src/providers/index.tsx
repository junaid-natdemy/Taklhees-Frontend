'use client';

import * as React from 'react';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { Toaster } from 'sonner';
import { LazyMotion, domAnimation } from 'motion/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <LazyMotion features={domAnimation}>
          {children}
          <Toaster richColors position="top-right" />
        </LazyMotion>
      </QueryProvider>
    </ThemeProvider>
  );
}
