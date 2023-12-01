import Image from 'next/image';

import { podcasts } from '@/constants';
import { PodcastsCard } from '../index';

const SidePodcasts = () => {
  return (
    <section className='w-full self-center rounded-2xl bg-white p-5 pb-2.5 dark:bg-darkPrimary-3'>
      <h3 className='display-semibold flex items-baseline pb-2.5 text-darkSecondary-900 dark:text-white-800'>
        Podcasts
        <Image
          className='ml-2'
          src='icons/rightArr.svg'
          alt='rightArr'
          width={12}
          height={10}
        />
      </h3>

      {podcasts?.map((item) => (
        <PodcastsCard
          key={item.id}
          cardData={{
            img: item.image,
            alt: item.title,
            title: item.title,
            author: item.author,
          }}
        />
      ))}
    </section>
  );
};

export default SidePodcasts;
