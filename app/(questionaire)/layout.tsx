import type { ReactNode } from 'react';

import { introductionItems } from '@/constants';
import { Contents } from '@/components/index';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <section className='mx-auto flex min-h-screen w-full max-w-1440 flex-col lg:flex-row'>
      <aside className='top-0 h-screen w-full lg:sticky'>
        <Contents
          position='left'
          contents={introductionItems}
          title='Tell us a little about yourself!'
          userClerkId=''
        />
      </aside>
      {children}
    </section>
  );
}
