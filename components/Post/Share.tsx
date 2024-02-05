'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
} from '@/components/ui/dialog';
import { sharePost } from '@/lib/actions/post.action';
import { PostStatsType } from '@/types/post';
import { copyText, shareOptionData } from '@/lib/utils';

type SharePostProps = {
  stat: PostStatsType;
  isOpen: boolean;
  setIsIopen: Dispatch<SetStateAction<boolean>>;
  postId: string;
};

export default function SharePost({
  stat,
  isOpen,
  setIsIopen,
  postId,
}: SharePostProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { user } = useUser();

  const handleCopytext = (text: string) => {
    copyText(text);
    setIsChecked(true);

    setTimeout(() => setIsChecked(false), 2000);
  };

  const shareOptions = shareOptionData(
    user?.emailAddresses[0].emailAddress as string,
    `${process.env.NEXT_PUBLIC_SITE_URL}${window?.location.pathname}`,
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsIopen}>
      <DialogTrigger asChild>
        <div className='flex cursor-pointer items-center gap-3'>
          <div className='flex aspect-square w-8 items-center justify-center !rounded-2xl bg-secondary-red-10 p-1.5 dark:bg-darkPrimary-3'>
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
        </div>
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-[30px] rounded-3xl bg-white p-5 dark:bg-darkPrimary-2 sm:max-w-[600px]'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold'>Share With</h3>
            <DialogClose>
              <Image
                className='dark:invert'
                src={'/assets/posts/close.svg'}
                width={30}
                height={30}
                alt={'close icon'}
              />
            </DialogClose>
          </div>
        </DialogHeader>
        <div className='flex flex-wrap items-center justify-center gap-5'>
          {shareOptions.map((option) =>
            option.path ? (
              <Link
                rel='canonical'
                onClick={() => sharePost(postId, window.location.pathname)}
                target='_blank'
                href={option.path}
                key={option.label}
                className='group'
              >
                <div className='ease flex h-12 w-12 items-center justify-center rounded-full bg-secondary-red-10 grayscale transition-all duration-300 group-hover:grayscale-0 dark:bg-darkPrimary-4 dark:grayscale-0 dark:group-hover:bg-secondary-red-10 md:h-[68px] md:w-[68px]'>
                  <Image
                    className='dark:grayscale dark:group-hover:grayscale-0'
                    src={option.icon}
                    width={20}
                    height={20}
                    alt={option.label}
                  />
                </div>
                <p className='pt-2 text-center text-sm font-semibold capitalize text-darkSecondary-800 group-hover:text-secondary-red-80'>
                  {option.label}
                </p>
              </Link>
            ) : (
              <button
                onClick={() => sharePost(postId, window.location.pathname)}
                key={option.label}
              >
                <div className='ease flex h-12 w-12 items-center justify-center rounded-full bg-secondary-red-10 grayscale transition-all duration-300 group-hover:grayscale-0 dark:bg-darkPrimary-4 dark:grayscale-0 dark:group-hover:bg-secondary-red-10 md:h-[68px] md:w-[68px]'>
                  <Image
                    className='dark:grayscale dark:group-hover:grayscale-0'
                    src={option.icon}
                    width={20}
                    height={20}
                    alt={option.label}
                  />
                </div>
                <p className='pt-2 text-center text-sm font-semibold capitalize text-darkSecondary-800 group-hover:text-secondary-red-80'>
                  {option.label}
                </p>
              </button>
            ),
          )}
        </div>
        <p className='text-center text-xs font-semibold text-darkSecondary-800'>
          or share with link
        </p>
        <div className='w-full rounded-2xl bg-white-700 p-5 dark:bg-darkPrimary-4'>
          <div className='flex items-center justify-between gap-2'>
            <p className='truncate text-sm font-semibold text-darkSecondary-800'>
              {process.env.NEXT_PUBLIC_SITE_URL}/post/{postId}
            </p>
            <button
              onClick={(e) => {
                handleCopytext(
                  `${process.env.NEXT_PUBLIC_SITE_URL}/post/${postId}`,
                );
              }}
            >
              {isChecked ? (
                <CheckIcon color='#FF4401' className='h-[30px] w-[30px]' />
              ) : (
                <Image
                  src={'/assets/posts/copy.svg'}
                  width={30}
                  height={30}
                  alt='copy'
                />
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
