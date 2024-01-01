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

export default async function Interviews() {
  const { interviews, totalPages } = await getInterviews(1, 10, 'remote');

  return (
    <div className='mt-28 flex h-full w-full flex-col gap-5 lg:flex-row '>
      <section className=' w-full max-w-[210px] max-lg:max-w-full lg:sticky lg:top-28 lg:h-screen'>
        <Filter />
      </section>
      <div className='flex flex-wrap gap-5'>
        <section className='w-full max-w-[700px] space-y-5 pb-5 max-[1350px]:max-w-full'>
          {interviews.map((post) => (
            <InterviewPostCard
              key={post.title}
              image={post.image}
              createdAt={formatDate(post.createdAt)}
              name={post.author.name}
              authorImage={post.author.image}
              captions={post.post.slice(0, 80)}
            />
          ))}
          <Pagination totalPages={totalPages} />
        </section>

        <section className='no-scrollbar w-full space-y-5 max-[1350px]:min-w-full lg:sticky lg:top-28 lg:h-screen lg:max-w-[325px] lg:overflow-y-auto'>
          <HostMeetupCard cardBtns={interviewCards} />
          <SidePodcasts />
        </section>
      </div>
    </div>
  );
}
