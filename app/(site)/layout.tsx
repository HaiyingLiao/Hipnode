import type { ReactNode } from 'react';

import { ThemeProvider } from '@/components/shared/TopBar/ThemeProvider';
import BottomBar from '@/components/shared/BottomBar';
import TopBar from '@/components/shared/TopBar/TopBar';
import NavProfileMenu from '@/components/shared/TopBar/NavProfileMenu';
import { auth } from '@clerk/nextjs';
import { getUserByClerkId } from '@/lib/actions/user.action';
import { checkUserStage } from '@/lib/utils';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = auth();
  const mongoUser = await getUserByClerkId(userId!);
  console.log('user', mongoUser);

  if (mongoUser) checkUserStage('', mongoUser.onboardingProgress);

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

        <section className='h-full w-full'>{children}</section>

        <BottomBar />
      </ThemeProvider>
    </main>
  );
}
