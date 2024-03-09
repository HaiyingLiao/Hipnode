import {
  Filter,
  HostMeetupCard,
  Pagination,
  SidePodcasts,
  MeetupCard,
} from '@/components/index';
import { cardBtns } from '@/constants';
import { getMeetups } from '@/lib/actions/meetups.action';

interface SearchParamsProps {
  searchParams: {
    page: string;
    category: string;
  };
}

export default async function Meetups({ searchParams }: SearchParamsProps) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category;
  const { data: meetups, totalPages } = await getMeetups(page, 10, category);

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
              <section className='flex flex-col gap-3'>
                {meetups?.map((meetupData) => (
                  <MeetupCard
                    key={meetupData.id}
                    id={meetupData.id}
                    title={meetupData.title}
                    companyName={meetupData.companyName}
                    location={meetupData.companyName}
                    description={meetupData.description}
                    tags={meetupData.tags}
                    image={meetupData.image}
                    updateAt={meetupData.updateAt}
                  />
                ))}
              </section>
              <Pagination totalPages={totalPages} />
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
