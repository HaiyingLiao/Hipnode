import type { ReactNode } from 'react';

import { ThemeProvider } from '@/components/shared/TopBar/ThemeProvider';
import BottomBar from '@/components/shared/BottomBar';
import TopBar from '@/components/shared/TopBar/TopBar';
import NavProfileMenu from '@/components/shared/TopBar/NavProfileMenu';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <TopBar>
          <NavProfileMenu />
        </TopBar>

        <main className='h-full w-full'>{children}</main>
        <Toaster />

        <BottomBar />
      </ThemeProvider>
    </main>
  );
}
