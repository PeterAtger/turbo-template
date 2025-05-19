'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';
import ReduxProvider from '@/redux/redux-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ReduxProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          {children}
        </NextThemesProvider>
      </ReduxProvider>
    </ClerkProvider>
  );
}
