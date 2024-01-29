import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import ContentCard from './Card';

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
};

export default async function HeroContents({
  contents,
  title,
  bg,
  cardBg,
  position,
  path,
}: HeroContentsProps) {
  // const user = await currentUser();
  // if (!user) return;
  const user = { id: '65b4ac09393361a92bd49f7a' };

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
              userId={user.id}
            />
          ))}
          {position === 'right' && (
            <Link
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
