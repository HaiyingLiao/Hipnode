'use server';

import { getInterviews } from './interviews.action';
import { getAllPosts } from './post.action';

export async function getProfilePosts(postType: string, page: string) {
  const currentPage = page ? Number(page) : 1;

  try {
    switch (postType) {
      case 'interviews':
        return await getInterviews(currentPage, 10);
      case 'meetups':
        // implement your logic here
        break;
      case 'posts':
        return await getAllPosts('popular', currentPage, 10, '/');
      case 'podcasts':
        // implement your logic here
        break;
      default:
        return await getAllPosts('popular', currentPage, 10, '/');
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
