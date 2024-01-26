'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteInterviewById } from '@/lib/actions/interviews.action';

export default function SeeMore({ postId }: { postId: string }) {
  const deletePost = async (id: string) => {
    try {
      await deleteInterviewById(id);
    } catch (error) {}
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image src='more.svg' alt='see more icon' width={20} height={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-10 border border-darkSecondary-600 bg-white-800 p-2 dark:border-darkSecondary-900 dark:bg-darkPrimary-4 md:mr-20'>
        <DropdownMenuItem>
          <Link href={`/edit-post/${postId}`} className='flex gap-2'>
            <Image
              src='edit.svg'
              alt='see more icon'
              className='dark:brightness-0 dark:invert'
              width={15}
              height={15}
            />
            <p className='body-semibold text-darkSecondary-900 dark:text-white-800'>
              Edit post
            </p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='flex cursor-pointer gap-2'
          onClick={() => deletePost(postId)}
        >
          <Image src='trash.svg' alt='see more icon' width={15} height={15} />
          <p className='body-semibold text-secondary-red'>Delete post</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
