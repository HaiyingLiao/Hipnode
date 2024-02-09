'use client';

import Image from 'next/image';
import { useState } from 'react';

import Report from './Report';
import { SharePost } from '../index';
import { PostStatsType } from '@/types/post';

type PostStatsProps = {
  stats: PostStatsType[];
  postAuthorName: string;
  postId: string;
};

const PostStats = ({ stats, postAuthorName, postId }: PostStatsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='flex w-full shrink-0 gap-2.5 rounded-2xl bg-white p-5 px-7 dark:bg-darkPrimary-3'>
      <ul className='flex shrink-0 flex-col gap-5'>
        {stats.map((stat, index) => (
          <li key={index}>
            <div className='flex items-center justify-start gap-3.5'>
              {stat.label === 'Share' ? (
                <SharePost
                  isOpen={isOpen}
                  postId={postId}
                  setIsIopen={setIsOpen}
                  stat={stat}
                />
              ) : (
                <>
                  <div
                    className={`flex aspect-square items-center justify-center rounded-[6px]  p-1.5 dark:bg-darkPrimary-4 ${
                      stat.label === 'Hearts'
                        ? '!bg-secondary-red-10'
                        : 'bg-secondary-red-10 dark:bg-darkPrimary-4 '
                    }`}
                  >
                    <Image
                      src={stat.icon}
                      alt={stat.alt}
                      width={20}
                      height={20}
                      className='object-contain'
                    />
                  </div>
                  <p className='display-regular text-darkSecondary-800'>
                    {stat.value} {stat.label}
                  </p>
                </>
              )}
            </div>
          </li>
        ))}
        <li className='w-full cursor-pointer'>
          <Report user={postAuthorName} postId={postId} />
        </li>
      </ul>
    </div>
  );
};

export default PostStats;
