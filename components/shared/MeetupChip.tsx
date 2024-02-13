import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '../ui/badge';
import { getMeetups } from '@/lib/actions/meetups.action';
import { getMonth, getDay } from '@/lib/utils';

const MeetupChip = async () => {
  const meetups = await getMeetups();

  return (
    <section className='w-full self-center rounded-2xl bg-white p-5 pb-2.5 dark:bg-darkPrimary-3'>
      <Link
        href='/meetups'
        className='display-semibold mb-5 flex items-baseline
        pb-2.5 text-darkSecondary-900 dark:text-white-800'
      >
        Meetups
        <Image
          className='ml-2'
          src='icons/rightArr.svg'
          alt='rightArr'
          width={12}
          height={10}
        />
      </Link>

      {meetups.data?.map((meetupData) => (
        <section className='mb-5 flex' key={meetupData.companyName}>
          <time className='dark:shadow-darkShadow mr-[14px] flex flex-col justify-center rounded-md border-[1px] border-darkSecondary-600 px-2.5 py-1 text-center dark:border-none dark:bg-darkPrimary-4'>
            <p className='bodyMd-semibold sm:display-semibold uppercase text-darkSecondary-900 dark:text-white'>
              {getMonth(meetupData.updateAt)}
            </p>
            <p className='display-semibold sm:heading1 text-secondary-blue'>
              {getDay(meetupData.updateAt)}
            </p>
          </time>

          <main className='overflow-hidden'>
            <p className='bodyMd-semibold sm:display-semibold truncate text-darkSecondary-900 dark:text-white'>
              {meetupData.title}
            </p>

            <div className='flex'>
              <Image
                className='mr-1.5 w-4 rounded-full'
                width={100}
                height={100}
                src={meetupData.image}
                alt='user-ava'
              />

              <p className='bodySm-semibold md:body-regular mt-0.5 text-darkSecondary-800'>
                {meetupData.companyName} - {meetupData.location}
              </p>
            </div>

            <div className='mt-2.5 flex flex-wrap gap-2'>
              {meetupData.tags?.map((tag) => (
                <Badge
                  key={tag}
                  className='bodyXs-semibold md:bodyMd-semibold mr-2.5 bg-white-700 text-darkSecondary-700 dark:bg-darkPrimary-4'
                  variant='secondary'
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </main>
        </section>
      ))}
    </section>
  );
};

export default MeetupChip;
