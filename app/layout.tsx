import { ClerkProvider } from '@clerk/nextjs';
// eslint-disable-next-line camelcase
import { Source_Sans_3 } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ourFileRouter } from './api/uploadthing/core';

const sourceSansPro = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  weight: ['700', '600', '400'],
});

export const metadata: Metadata = {
  title: 'Hipnode - Social Media Web Application',
  description: 'Social Media Web Application',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <ClerkProvider key={'clerk'}>
        <body
          className={`${sourceSansPro.className} bg-white-800 dark:bg-darkPrimary-2`}
        >
          <main className='max-container'>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            {children}
          </main>
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
