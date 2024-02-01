'use server';

import { getInterviews } from './interviews.action';

export async function getProfilePosts(postType: string, page: string) {
  try {
    switch (postType) {
      case 'interviews':
        return await getInterviews(Number(page), 10);
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
