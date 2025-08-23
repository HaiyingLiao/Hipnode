import {
  Filter,
  HostMeetupCard,
  MeetupChip,
  Pagination,
  PodcastChip,
} from '@/components/index';
import { cardBtns } from '@/constants';
import { getPodcasts } from '@/lib/actions/podcasts.action';

interface SearchParamsProps {
  searchParams: {
    page: string;
    category: string;
  };
}

export default async function Podcasts({ searchParams }: SearchParamsProps) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category;
  const { data: podcasts, totalPages } = await getPodcasts(page, 16, category);

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
                  {podcasts?.map((podcast) => (
                    <PodcastChip
                      title={podcast.title}
                      post={podcast.post}
                      avatar={podcast.author.image}
                      location={podcast.location}
                      author={podcast.author.name}
                      id={podcast.id}
                      key={podcast.id}
                    />
                  ))}
                </div>
                <Pagination totalPages={totalPages} />
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
    </>
  );
}
