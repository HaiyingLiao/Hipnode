'use server';

import { getInterviewById } from './interviews.action';
import { getMeetupById } from './meetups.action';
import { getPodcastById } from './podcasts.action';
import { getPostById } from './post.action';

export async function getTargetPost(postType: string, id: string) {
  try {
    switch (postType) {
      case 'interviews':
        return await getInterviewById(id);
      case 'meetups':
        return await getMeetupById(id);
      case 'post':
        return await getPostById(id);
      case 'podcasts':
        return await getPodcastById(id);
      default:
        break;
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
