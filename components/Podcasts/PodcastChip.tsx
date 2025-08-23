'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import Link from 'next/link';
import parse from 'html-react-parser';

import { PostActions } from '@/components/index';

interface PodcastChipProps {
  title: string;
  post: string;
  avatar: string;
  location: string;
  author: string;
  id: string;
}

const PodcastChip = ({
  title,
  post,
  avatar,
  location,
  author,
  id,
}: PodcastChipProps) => {
  return (
    <div className='mb-3 flex min-h-[220px] w-full flex-col justify-between rounded-2xl bg-white p-5 transition-all hover:shadow-md dark:bg-darkPrimary-3'>
      <div className='flex items-center justify-between'>
        <Link
          href={`/podcasts/${id}`}
          className='heading3 mb-2.5 text-darkSecondary-900 dark:text-white'
        >
          {title}
        </Link>
        <PostActions postId={id} postType='podcasts' />
      </div>

      <p className='body-regular line-clamp-3 text-darkSecondary-800 dark:text-white-700'>
        {parse(post)}
      </p>

      <div className='flex items-center'>
        <Avatar>
          <AvatarImage
            className='w-8 rounded-full'
            src={avatar}
            alt='user-ava'
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='ml-2.5'>
          <h4 className='body-semibold text-darkSecondary-900 dark:text-white'>
            {author}
          </h4>
          <p className='bodySm-regular text-darkSecondary-800'>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default PodcastChip;
