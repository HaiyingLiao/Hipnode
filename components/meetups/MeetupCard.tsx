import Image from 'next/image';

import { Badge } from '../ui/badge';
import { getMonth, getDay } from '@/lib/utils';
import { PostActions } from '@/components/index';

interface MeetupCardProps {
  id: string;
  title: string;
  companyName: string;
  location: string;
  description: string;
  tags: string[];
  image: string;
  updateAt: Date;
}

export default function MeetupCard({
  id,
  title,
  companyName,
  location,
  description,
  tags,
  image,
  updateAt,
}: MeetupCardProps) {
  return (
    <div className='mb-3 w-full rounded-2xl bg-white p-5 shadow-md dark:bg-darkPrimary-3'>
      {/* Meetup Quick Informatio */}
      <article className='flex items-center justify-between'>
        <div className='flex'>
          <Image
            className='w-12 sm:w-20'
            src={image}
            width={100}
            height={100}
            quality={100}
            alt={companyName}
          />
          <div className='flex flex-col justify-evenly px-5'>
            <h1 className='bodyMd-semibold md:heading3 text-darkSecondary-900 dark:text-white'>
              {title}
            </h1>
            <p className='bodySm-semibold md:body-regular text-darkSecondary-800'>
              {companyName} - {location}
            </p>
          </div>
        </div>

        <time className='dark:shadow-darkShadow rounded-md border-2 border-darkSecondary-600 px-3 py-1 text-center dark:border-none md:px-4 md:py-2'>
          <p className='bodyMd-semibold sm:display-semibold uppercase text-darkSecondary-900 dark:text-white'>
            {getMonth(updateAt)}
          </p>
          <p className='display-semibold sm:heading1 text-secondary-blue'>
            {getDay(updateAt)}
          </p>
        </time>
      </article>

      {/* Description about meetup card */}
      <div className='bodyMd-regular md:body-regular my-6 text-darkSecondary-900 dark:text-white'>
        {description}
      </div>

      <figcaption className='flex justify-between'>
        <div>
          {tags?.map((tag) => (
            <Badge
              key={tag}
              className='bodyXs-semibold md:bodyMd-semibold mr-2.5 bg-white-700 text-darkSecondary-700 dark:bg-darkPrimary-4'
              variant='secondary'
            >
              {tag}
            </Badge>
          ))}
        </div>

        <PostActions postId={id} postType='meetups' />
      </figcaption>
    </div>
  );
}
