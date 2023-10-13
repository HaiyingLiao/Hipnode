import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <main className='h-full w-full'>{children}</main>;
}
