import Image from 'next/image';
import Link from 'next/link';

import { getPodcasts } from '@/lib/actions/podcasts.action';

const SidePodcasts = async () => {
  const { data: podcasts } = await getPodcasts();

  return (
    <section className='w-full self-center rounded-2xl bg-white p-5 pb-2.5 dark:bg-darkPrimary-3'>
      <Link
        href='/podcasts'
        className='display-semibold flex items-center pb-2.5 text-darkSecondary-900 dark:text-white-800'
      >
        Podcasts
        <Image
          className='ml-2'
          src='icons/rightArr.svg'
          alt='rightArr'
          width={12}
          height={12}
        />
      </Link>

      {podcasts?.map((item) => (
        <section key={item.id} className='my-2.5 flex w-full items-start gap-3'>
          <Image
            className='shadow-postCardImgShadow h-16 w-16 shrink-0 rounded-lg object-cover'
            src={item.image}
            alt={item.title}
            width={64}
            height={64}
          />

          <div className='min-w-0 flex-1'>
            <p className='bodyMd-semibold line-clamp-2 text-darkSecondary-900 dark:text-white-800'>
              {item.title}
            </p>
            <p className='bodySm-regular mt-1 text-darkSecondary-800'>
              {item.author.name}
            </p>
          </div>

          <div className='flex shrink-0 items-center'>
            <Image
              src='icons/rightArr.svg'
              width={16}
              height={16}
              alt='rightArr'
              className='opacity-60'
            />
          </div>
        </section>
      ))}
    </section>
  );
};

export default SidePodcasts;
