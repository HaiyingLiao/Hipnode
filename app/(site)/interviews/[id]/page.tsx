import parse from 'html-react-parser';
import Image from 'next/image';

import Statistic from '@/components/interviews/statistic';
import { getInterviewById } from '@/lib/actions/interviews.action';
import { checkUserStage } from '@/lib/utils';

type Params = {
  params: { id: string };
};

export default async function InterviewDetail({ params: { id } }: Params) {
  await checkUserStage();
  const interview = await getInterviewById(id);

  // fetch tags from database later
  const tags = ['#technology', '#diversity', '#hr'];

  return (
    <div className='mx-auto mt-28 h-full min-h-screen w-full max-w-[785px] p-5'>
      <section className='flex w-full flex-col justify-center rounded-lg bg-white dark:bg-darkPrimary-4'>
        <Image
          className='mx-auto object-cover object-center'
          src={interview.image}
          width={785}
          height={273}
          alt='image'
        />
        <div className='p-5'>
          <div className='flex items-center gap-5'>
            <h1 className='text-lg font-normal text-darkSecondary-600'>H1</h1>
            <h2 className='py-5 text-base font-semibold text-darkSecondary-900 dark:text-white-800 md:text-[26px]'>
              {interview.title}
            </h2>
          </div>
          <section className='flex flex-wrap items-center justify-between gap-5 '>
            <Statistic
              revenue={interview.revenue}
              updates={interview.updates}
              website={interview.website}
            />
            <ul className='flex items-center gap-5'>
              {tags.map((tag) => (
                <li
                  key={tag}
                  className='text-xs font-normal text-secondary-yellow-90 md:text-base'
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>
          <article className='py-5 text-xs font-normal leading-4 text-darkSecondary-800 md:text-base'>
            {parse(interview.post)}
          </article>
        </div>
      </section>
    </div>
  );
}
