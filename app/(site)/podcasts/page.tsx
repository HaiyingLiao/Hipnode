import {
  Filter,
  HostMeetupCard,
  MeetupChip,
  Pagination,
  PodcastChip,
} from '@/components/index';
import { podcastDatas } from '@/constants';
import { checkUserStage } from '@/lib/utils';

const Podcasts = async () => {
  await checkUserStage();
  const cardBtns = [
    {
      name: 'Host a Podcast',
      link: '/host-podcast',
    },
    {
      name: 'Code of Conduct',
      link: '/code-of-conduct',
    },
  ];
  return (
    <>
      <section className='flex flex-col gap-4 bg-white-700 pb-12 pt-28 dark:bg-darkPrimary-2 md:flex-row'>
        <div className='flex flex-col gap-4 lg:flex lg:flex-row '>
          <div className='flex flex-col gap-4 lg:flex-row'>
            <div className='w-full lg:hidden'>
              <HostMeetupCard cardBtns={cardBtns} />
            </div>

            <div className='flex flex-col gap-4 md:flex-row'>
              <aside className='w-full md:max-w-[210px] '>
                <Filter />
              </aside>
              <div className='w-full lg:w-5/6'>
                <div className='columns-1 md:columns-2'>
                  {podcastDatas?.map((podcast) => (
                    <PodcastChip podcastData={podcast} key={podcast.author} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='flex w-full flex-col gap-5 lg:max-w-[360px]'>
            <div className='hidden lg:block'>
              <HostMeetupCard cardBtns={cardBtns} />
            </div>
            <MeetupChip />
          </div>
        </div>
      </section>
      <Pagination totalPages={10} />
    </>
  );
};

export default Podcasts;
