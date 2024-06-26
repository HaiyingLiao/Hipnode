import {
  Filter,
  Pagination,
  SidePodcasts,
  HostMeetupCard,
  InterviewPostCard,
} from '@/components/index';
import { interviewCards } from '@/constants';
import { getInterviews } from '@/lib/actions/interviews.action';
import { formatDate } from '@/lib/utils';
import { SearchParamsProps } from '@/types/searchParamsProps';

export default async function Interviews({
  searchParams,
}: {
  searchParams: Pick<SearchParamsProps['searchParams'], 'category' | 'page'>;
}) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category;
  const { data: interviews, totalPages } = await getInterviews(
    page,
    10,
    category,
  );

  return (
    <div className='mt-28 flex h-full w-full flex-col gap-5 lg:flex-row '>
      <aside className=' w-full max-w-[210px] max-lg:max-w-full lg:sticky lg:top-28 lg:h-screen'>
        <Filter />
      </aside>

      <div className='flex flex-wrap gap-5'>
        <section className=' pb-5 max-[1350px]:w-full lg:max-w-[700px]'>
          {interviews.map((post) => (
            <InterviewPostCard
              key={post.title}
              image={post.image}
              createdAt={formatDate(post.createdAt)}
              name={post.author.name}
              authorImage={post.author.image}
              captions={post.title}
              revenue={post.revenue}
              updates={post.updates}
              website={post.website}
              id={post.id}
            />
          ))}
          <Pagination totalPages={totalPages} />
        </section>

        <aside className='no-scrollbar space-y-5 max-[1350px]:min-w-full lg:sticky lg:top-28 lg:h-screen lg:max-w-[325px] lg:overflow-y-auto'>
          <HostMeetupCard cardBtns={interviewCards} />
          <SidePodcasts />
        </aside>
      </div>
    </div>
  );
}
