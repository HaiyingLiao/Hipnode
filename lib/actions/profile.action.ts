'use server';
import { currentUser } from '@clerk/nextjs/server';

import { getInterviewsByUser } from './interviews.action';
import { getPostsByUser } from './post.action';
import { getMeetupsByUser } from './meetups.action';
import { getPodcastsByUser } from './podcasts.action';

export async function getProfilePosts(postType: string, page: string) {
  const currentPage = page ? Number(page) : 1;
  const user = await currentUser();
  if (!user) return;

  try {
    switch (postType) {
      case 'interviews':
        return await getInterviewsByUser(currentPage, 10, user.id);
      case 'meetups':
        return await getMeetupsByUser(currentPage, 10, user.id);
      case 'posts':
        return await getPostsByUser('popular', currentPage, 10, user.id);
      case 'podcasts':
        return await getPodcastsByUser(currentPage, 10, user.id);
      default:
        return await getPostsByUser('popular', currentPage, 10, user.id);
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
