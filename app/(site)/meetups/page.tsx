import {
  Filter,
  HostMeetupCard,
  MeetupsWrapper,
  SidePodcasts,
} from '@/components/index';
import { checkUserStage } from '@/lib/utils';

const Page = async () => {
  await checkUserStage();
  const cardBtns = [
    {
      name: 'Host a Meetup',
      link: '/host-meetup',
    },
    {
      name: 'Code of Conduct',
      link: '/code-of-conduct',
    },
  ];

  return (
    <section className='flex flex-col gap-4 bg-white-700 dark:bg-darkPrimary-2 md:flex-row'>
      <main className='flex flex-col gap-4 lg:flex lg:flex-row '>
        <div className='flex flex-col gap-4 lg:flex-row'>
          <div className='w-full lg:hidden'>
            <HostMeetupCard cardBtns={cardBtns} />
          </div>

          <div className='flex flex-col gap-4 md:flex-row'>
            <aside className='w-full md:max-w-[210px]'>
              <Filter />
            </aside>
            <div className='w-full lg:w-5/6'>
              <MeetupsWrapper />
            </div>
          </div>
        </div>

        <div className='flex w-full flex-col gap-5 lg:max-w-[360px]'>
          <div className='hidden lg:block'>
            <HostMeetupCard cardBtns={cardBtns} />
          </div>
          <SidePodcasts />
        </div>
      </main>
    </section>
  );
};

export default Page;
