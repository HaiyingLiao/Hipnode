import {
  Filter,
  HostMeetupCard,
  MeetupsWrapper,
  Pagination,
  SidePodcasts,
} from '@/components/index';
import { cardBtns } from '@/constants';
import { checkUserStage } from '@/lib/utils';

export default async function Meetups() {
  await checkUserStage('');

  return (
    <section className='mt-28 flex flex-col gap-4 bg-white-700 dark:bg-darkPrimary-2 md:flex-row'>
      <div className='flex flex-col gap-4 lg:flex lg:flex-row '>
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
              <Pagination totalPages={10} />
            </div>
          </div>
        </div>

        <aside className='flex w-full flex-col gap-5 lg:max-w-[360px]'>
          <div className='hidden lg:block'>
            <HostMeetupCard cardBtns={cardBtns} />
          </div>
          <SidePodcasts />
        </aside>
      </div>
    </section>
  );
}
