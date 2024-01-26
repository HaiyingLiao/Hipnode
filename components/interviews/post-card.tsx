import Image from 'next/image';
import Link from 'next/link';

import { Statistic, SeeMore } from '@/components/index';

type InterviewPostCardProps = {
  authorImage: string;
  name: string;
  createdAt: string;
  captions: string;
  image: string;
  revenue: number;
  updates: number;
  website: string;
  id: string;
};

export default function InterviewsPostCard({
  authorImage,
  captions,
  createdAt,
  image,
  name,
  revenue,
  updates,
  website,
  id,
}: InterviewPostCardProps) {
  return (
    <div className='flex w-full flex-col gap-2.5 rounded-2xl bg-white p-5 dark:bg-darkPrimary-4 max-lg:max-w-full'>
      <div className='flex w-full items-start justify-between gap-[30px]'>
        <div className='flex w-full flex-col gap-5'>
          <header className='flex justify-between'>
            <div className='flex items-center gap-4'>
              <Image
                className='h-11 w-11 rounded-full'
                src={authorImage}
                alt='author image'
                width={44}
                height={44}
              />
              <div className='flex flex-col'>
                <h3 className='text-sm font-semibold leading-normal text-darkSecondary-900 dark:text-white-800 md:text-base'>
                  {name}
                </h3>
                <p className='text-xs font-normal leading-snug text-neutral-400 md:text-sm'>
                  {createdAt}
                </p>
              </div>
            </div>

            <SeeMore postId={id} />
          </header>
          <Image
            alt='post'
            width={280}
            height={180}
            className='block w-full rounded-lg object-contain lg:hidden'
            src={'/assets/images/illustration.png'}
          />
          <p className='text-base font-semibold leading-relaxed text-darkSecondary-900 dark:text-white-800 md:text-lg'>
            {captions}
          </p>
          <div className='flex w-full flex-wrap items-center justify-between gap-5'>
            <Statistic revenue={revenue} updates={updates} website={website} />
            <Link
              className=' flex items-center justify-center gap-2.5 rounded !bg-secondary-blue px-[14px] py-2'
              href={`/interviews/${id}`}
            >
              <span className='text-sm font-semibold leading-snug text-white'>
                Full Details
              </span>
            </Link>
          </div>
        </div>
        <Image
          alt='post'
          width={280}
          height={180}
          className='hidden h-[180px] w-[280px] rounded-lg lg:block'
          src={image}
        />
      </div>
    </div>
  );
}
