'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import ContentCard from './Card';
import {
  updateBusinessStage,
  updateCodingLevel,
} from '@/lib/actions/onboarding.action';

type ContentsTypes = {
  background: string;
  icon?: string;
  alt?: string;
  text: string;
};

type HeroContentsProps = {
  title: string;
  contents: ContentsTypes[];
  bg?: string;
  cardBg?: string;
  position: 'left' | 'right';
  path?: string;
  userClerkId: string;
};

export default function HeroContents({
  contents,
  title,
  bg,
  cardBg,
  position,
  path,
  userClerkId,
}: HeroContentsProps) {
  const searchParams = useSearchParams();
  const answerParams = searchParams.get('answer');

  const handleClick = async () => {
    if (!answerParams) return;

    const updateFunction =
      path === '/programming-level' ? updateBusinessStage : updateCodingLevel;
    await updateFunction(userClerkId, answerParams as string);
  };

  return (
    <section
      className={cn(
        'flex min-h-screen h-full lg:sticky top-0 w-full flex-col items-center justify-center bg-white-800 dark:bg-darkPrimary-2 p-5 lg:max-w-720',
        bg,
      )}
    >
      <div className='w-full max-w-442'>
        <h2 className='text-lg font-semibold text-darkSecondary-900 dark:text-white-800 md:text-3xl md:font-bold'>
          {title}
        </h2>
        <div className='flex h-full w-full flex-col items-start gap-5 pt-10'>
          {contents.map((content) => (
            <ContentCard
              key={content.text}
              {...content}
              position={position}
              cardBg={cardBg!}
              userClerkId={userClerkId}
            />
          ))}
          {position === 'right' && answerParams && (
            <Link
              onClick={handleClick}
              href={path!}
              className='mt-5 block w-min rounded bg-secondary-red-60 px-10 py-3 text-white-700'
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
