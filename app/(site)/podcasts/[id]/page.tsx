import Image from 'next/image';
import React from 'react';

import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { checkUserStage } from '@/lib/utils';

const Podcast = async () => {
  await checkUserStage('');
  return (
    <main className='max-container  w-full pb-10 pt-28 md:w-4/6'>
      <section className='rounded-2xl bg-white p-5 dark:bg-darkPrimary-3'>
        <div className='flex w-full flex-col md:flex-row'>
          <aside className='relative flex'>
            <Image
              className='z-10 rounded-lg'
              src='/images/songThumb.png'
              alt='thumb'
              width={150}
              height={150}
            />
            <Image
              className='relative -left-3 z-0 md:-left-8'
              src='/images/diskLight.svg'
              alt='disk'
              width={130}
              height={130}
            />
          </aside>
          <div className='grow'>
            <p className='bodyMd-regular text-darkSecondary-900 dark:text-white'>
              Hipnod • Episode 243
            </p>
            <h3 className='heading3 text-darkSecondary-900 dark:text-white'>
              by Courtland Allen
            </h3>
            <div className='flex items-center py-4'>
              <Progress value={33} className='mr-5 h-2.5' />
              <p className='body-semibold grow whitespace-nowrap text-darkSecondary-900 dark:text-white'>
                00:00 | 63:37
              </p>
            </div>
            <div className='flex'>
              <Button className='!hover:bg-secondary-blue-90 display-semibold rounded-[20px] !bg-secondary-blue !text-white'>
                <Image
                  className='mr-2'
                  src='/icons/playIcon.svg'
                  width={16}
                  height={16}
                  alt='playIcon'
                />
                Play Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className='my-5 rounded-2xl bg-white p-5 dark:bg-darkPrimary-3'>
        <h1 className='heading1-semibold text-darkSecondary-900 dark:text-white'>
          #243 – Mental Health and Bootstrapping in 2022 with Rob Walling of
          TinySeed
        </h1>

        <div className='pt-5 text-darkSecondary-800 '>
          <h3 className='display-semibold'>EPISODE DETAILS</h3>
          <p className='display-regular py-6'>
            In this episode I&apos;m chat with Rob Walling (@robwalling) about a
            wide range of topics including metal health, how to find a business
            idea and the relevance of bootstrapping today.
          </p>
          <h3 className='display-semibold'>SHOW NOTES</h3>
          <p className='display-regular'>
            In this episode I&apos;m chat with Rob Walling about a wide range of
            topics including metal health, how to find a business idea and the
            relevance of bootstrapping today.
          </p>
          <ul className='display-regular list-inside list-disc break-words py-6 pl-3'>
            <li>Follow Rob on Twitter: https://twitter.com/robwalling</li>
            <li>Apply to TinySeed: https://tinyseed.com/apply </li>
            <li>
              Listen to Startups for the Rest of Us:
              https://www.startupsfortherestofus.com/
            </li>
          </ul>
          <h3 className='display-semibold'>WHAT IS INDIE HACKERS?</h3>
          <p>
            Courtland Allen interviews the ambitious indie hackers who are
            turning their ideas and side projects into profitable online
            businesses. Explore the latest strategies and tools founders are
            using to capitalize on new opportunities, escape the 9-to-5 grind,
            and create their own personal revenue-generating machines. The
            future is indie!
          </p>
        </div>
      </section>
    </main>
  );
};

export default Podcast;
