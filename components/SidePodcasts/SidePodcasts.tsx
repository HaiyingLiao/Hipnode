import Image from 'next/image';
import Link from 'next/link';

import { getPodcasts } from '@/lib/actions/podcasts.action';

const SidePodcasts = async () => {
  const { data: podcasts } = await getPodcasts();

  return (
    <section className='w-full self-center rounded-2xl bg-white p-5 pb-2.5 dark:bg-darkPrimary-3'>
      <Link
        href='/podcasts'
        className='display-semibold flex items-baseline pb-2.5 text-darkSecondary-900 dark:text-white-800'
      >
        Podcasts
        <Image
          className='ml-2'
          src='icons/rightArr.svg'
          alt='rightArr'
          width={12}
          height={10}
        />
      </Link>

      {podcasts?.map((item) => (
        <section
          key={item.id}
          className='my-2.5 flex w-full items-center justify-between'
        >
          <Image
            className='shadow-postCardImgShadow'
            src={item.image}
            alt={item.title}
            width={100}
            height={100}
          />

          <div className='px-3'>
            <p className='bodyMd-semibold text-darkSecondary-900 dark:text-white-800'>
              {item.title}
            </p>
            <p className='bodySm-regular pt-1.5 text-darkSecondary-800'>
              {item.author.name}
            </p>
          </div>

          <div>
            <Image
              src='icons/rightArr.svg'
              width={20}
              height={20}
              alt='rightArr'
            />
          </div>
        </section>
      ))}
    </section>
  );
};

export default SidePodcasts;
