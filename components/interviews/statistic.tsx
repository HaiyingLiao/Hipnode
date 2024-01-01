import Image from 'next/image';
import Link from 'next/link';

type statisticProps = {
  revenue: number;
  updates: number;
  website: string;
};

export default function Statistic({
  revenue,
  updates,
  website,
}: statisticProps) {
  return (
    <div className='flex items-center justify-start gap-5 lg:gap-[25px]'>
      <div>
        <p className='text-sm font-bold leading-snug text-darkSecondary-900 dark:text-white-800'>
          {`$${revenue}k/mo`}
        </p>
        <span className='block text-xs font-normal leading-18 text-neutral-400'>
          Revenue
        </span>
      </div>

      <div className='h-[30px] w-[1px] bg-darkSecondary-800 dark:bg-darkSecondary-600' />

      <div>
        <p className='text-sm font-bold leading-snug text-darkSecondary-900 dark:text-white-800'>
          {updates}
        </p>
        <span className='block text-xs font-normal leading-18 text-neutral-400'>
          Updates
        </span>
      </div>

      <div className='h-[30px] w-[1px] bg-darkSecondary-800  dark:bg-darkSecondary-600' />

      <div className='inline-flex flex-col items-start justify-start'>
        <Image
          className='invert dark:invert-0'
          src={'/assets/icons/web.svg'}
          width={20}
          height={20}
          alt='web icon'
        />
        <Link
          className='text-xs font-normal leading-18 text-neutral-400'
          href={website}
        >
          Website
        </Link>
      </div>
    </div>
  );
}
