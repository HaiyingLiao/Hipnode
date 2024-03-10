'use server';

import { getInterviewById } from './interviews.action';
import { getMeetupById } from './meetups.action';
import { getPodcastById } from './podcasts.action';

export async function getTargetPost(postType: string, id: string) {
  try {
    switch (postType) {
      case 'interviews':
        return await getInterviewById(id);
      case 'meetups':
        return await getMeetupById(id);
      case 'posts':
        // implement your logic here
        break;
      case 'podcasts':
        return await getPodcastById(id);
      default:
        break;
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
