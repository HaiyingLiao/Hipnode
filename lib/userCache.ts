import { currentUser } from '@clerk/nextjs/server';
import { unstable_cache } from 'next/cache';

export const getCachedUser = unstable_cache(
  async () => currentUser(),
  ['my-app-user'],
);
