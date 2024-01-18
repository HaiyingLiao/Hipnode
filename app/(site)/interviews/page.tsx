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

interface SearchParamsProps {
  searchParams: {
    page: string;
    category: string;
  };
}

export default async function Interviews({ searchParams }: SearchParamsProps) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category;
  const { interviews, totalPages } = await getInterviews(page, 10, category);

  return (
    <div className='mt-28 flex h-full w-full flex-col gap-5 lg:flex-row '>
      <section className=' w-full max-w-[210px] max-lg:max-w-full lg:sticky lg:top-28 lg:h-screen'>
        <Filter />
      </section>

      <div className='flex flex-wrap gap-5'>
        <section className='space-y-5 pb-5 max-[1350px]:w-full lg:max-w-[700px]'>
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

        <section className='no-scrollbar space-y-5 max-[1350px]:min-w-full lg:sticky lg:top-28 lg:h-screen lg:max-w-[325px] lg:overflow-y-auto'>
          <HostMeetupCard cardBtns={interviewCards} />
          <SidePodcasts />
        </section>
      </div>
    </div>
  );
}
