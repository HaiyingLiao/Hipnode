'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { currentUser } from '@clerk/nextjs';

import { cn, formUrlQuery } from '@/lib/utils';
import { updateBusinessStage } from '@/lib/actions/onboarding.action';
import { text } from 'stream/consumers';

type ContentCardProps = {
  background: string;
  icon?: string;
  alt?: string;
  text: string;
  position: 'left' | 'right';
  cardBg: string;
  userId: string;
};

export default function ContentCard({
  background,
  cardBg,
  position,
  text,
  alt,
  icon,
  userId,
}: ContentCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const answerParams = searchParams.get('answer');

  const [active, setActive] = useState(answerParams || '');

  const handleAnswerClick = async (item: string) => {
    let newUrl = '';

    if (active === item) {
      setActive('');
      if (newUrl === '') {
        newUrl = formUrlQuery(searchParams.toString(), 'answer', null);

        router.push(newUrl, { scroll: false });
      }
    } else {
      setActive(item);
      newUrl = formUrlQuery(
        searchParams.toString(),
        'answer',
        item.toLowerCase(),
      );
    }

    router.push(newUrl, { scroll: false });

    if (newUrl.includes('current-stage?answer')) {
      await updateBusinessStage(answerParams as string, userId);
    }
  };

  return (
    <div
      className={cn(
        `group flex h-full w-full max-w-500 items-center justify-start gap-6 rounded-lg bg-white p-5 dark:bg-darkPrimary-3 cursor-pointer ${
          position === 'right' ? 'hover:!bg-secondary-red-60' : ''
        }`,
        cardBg,
        `${
          answerParams === text.toLowerCase()
            ? 'bg-secondary-red-60 !text-white'
            : ''
        }`,
      )}
    >
      {icon && (
        <div
          className={cn(
            `flex aspect-square w-10 h-10 md:h-60 md:w-60 items-center justify-center rounded-lg dark:bg-darkPrimary-4`,
            background,
          )}
        >
          <Image
            className='h-5 w-5 object-contain'
            src={icon}
            width={50}
            height={50}
            alt={alt ?? ''}
          />
        </div>
      )}
      <p
        className={`text-sm font-semibold leading-5 text-darkSecondary-900  dark:text-white-800 md:text-lg ${
          position === 'right' ? 'group-hover:text-white' : ''
        }`}
        onClick={() => handleAnswerClick(text)}
      >
        {text}
      </p>
    </div>
  );
}
