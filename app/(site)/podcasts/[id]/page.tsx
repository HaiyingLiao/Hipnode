import Image from 'next/image';

import { getPodcastById } from '@/lib/actions/podcasts.action';
import { AudioSection } from '@/components/index';
import parse from 'html-react-parser';

const Podcast = async ({ params: { id } }: { params: { id: string } }) => {
  const { audio, author, title, post } = await getPodcastById(id);

  return (
    <div className='max-container  w-full pb-10 pt-28 md:w-4/6'>
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
          <AudioSection audio={audio} author={author.name} />
        </div>
      </section>

      <section className='my-5 rounded-2xl bg-white p-5 dark:bg-darkPrimary-3'>
        <h1 className='heading1-semibold text-darkSecondary-900 dark:text-white'>
          {`#243 – ${title}`}
        </h1>

        <div className='pt-5 text-darkSecondary-800 '>
          <h3 className='display-semibold'>EPISODE DETAILS</h3>
          <p className='display-regular py-6'>{parse(post)}</p>
        </div>
      </section>
    </div>
  );
};

export default Podcast;
