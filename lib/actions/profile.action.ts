'use server';

import { getInterviews } from './interviews.action';

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
        // implement your logic here
        break;
      case 'podcasts':
        // implement your logic here
        break;
      default:
      // return posts data here
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
