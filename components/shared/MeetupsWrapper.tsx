import Image from 'next/image';

import { Badge } from '../ui/badge';
import { getMonth, getDay } from '@/lib/utils';
import { getMeetups } from '@/lib/actions/meetups.action';
import { PostActions } from '@/components/index';

const MeetupsWrapper = async ({
  page,
  category,
}: {
  page: number;
  category: string;
}) => {
  const meetups = await getMeetups(page, 10, category);

  return (
    <>
      {meetups.data?.map((meetupData) => (
        <section
          className='mb-4 w-full rounded-2xl bg-white p-5 shadow-md  dark:bg-darkPrimary-3'
          key={meetupData.id}
        >
          <div>
            {/* Meetup Quick Informatio */}
            <article className='flex items-center justify-between'>
              <div className='flex'>
                <Image
                  className='w-12 sm:w-20'
                  src={meetupData.image}
                  width={100}
                  height={100}
                  quality={100}
                  alt={meetupData.companyName}
                />
                <div className='flex flex-col justify-evenly px-5'>
                  <h1 className='bodyMd-semibold md:heading3 text-darkSecondary-900 dark:text-white'>
                    {meetupData.title}
                  </h1>
                  <p className='bodySm-semibold md:body-regular text-darkSecondary-800'>
                    {meetupData.companyName} - {meetupData.location}
                  </p>
                </div>
              </div>

              <time className='dark:shadow-darkShadow rounded-md border-2 border-darkSecondary-600 px-3 py-1 text-center dark:border-none md:px-4 md:py-2'>
                <p className='bodyMd-semibold sm:display-semibold uppercase text-darkSecondary-900 dark:text-white'>
                  {getMonth(meetupData.updateAt)}
                </p>
                <p className='display-semibold sm:heading1 text-secondary-blue'>
                  {getDay(meetupData.updateAt)}
                </p>
              </time>
            </article>

            {/* Description about meetup card */}
            <div className='bodyMd-regular md:body-regular my-6 text-darkSecondary-900 dark:text-white'>
              {meetupData.description}
            </div>

            <figcaption className='flex justify-between'>
              <div>
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

              <PostActions postId={meetupData.id} postType='meetups' />
            </figcaption>
          </div>
        </section>
      ))}
    </>
  );
};

export default MeetupsWrapper;
