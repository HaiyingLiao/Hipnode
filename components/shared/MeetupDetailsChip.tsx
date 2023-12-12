import Image from 'next/image';

import { meetupsData } from '@/constants';
import { Badge } from '../ui/badge';

const MeetupDetailsChip = () => {
  return (
    <>
      {meetupsData?.map((meetupData) => (
        <section className='mb-5 flex' key={meetupData.companyName}>
          <time className='dark:shadow-darkShadow mr-[14px] flex flex-col justify-center rounded-md border-[1px] border-darkSecondary-600 px-2.5 py-1 text-center dark:border-none dark:bg-darkPrimary-4'>
            <p className='bodyMd-semibold sm:display-semibold uppercase text-darkSecondary-900 dark:text-white'>
              {meetupData.month}
            </p>
            <p className='display-semibold sm:heading1 text-secondary-blue'>
              {meetupData.day}
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
    </>
  );
};

export default MeetupDetailsChip;
