import Sidebar from '@/components/group/Sidebar/Sidebar';
import {
  GroupPostCard,
  MeetupChip,
  Pagination,
  SidePodcasts,
  SidebarMobile,
} from '@/components/index';
import { checkUserStage } from '@/lib/utils';

export default async function Group() {
  await checkUserStage();
  return (
    <div className='mt-28 flex h-full w-full flex-col items-center justify-between gap-5 overflow-hidden bg-white-800 dark:bg-darkPrimary-2 lg:h-screen lg:flex-row'>
      <aside className='h-full w-full max-w-[250px] rounded-lg bg-white dark:bg-darkPrimary-3 max-lg:max-w-full lg:sticky lg:top-0'>
        <SidebarMobile />
        <Sidebar />
      </aside>
      <section className='no-scrollbar h-full w-full overflow-y-auto lg:h-screen'>
        <div className='flex flex-wrap justify-center gap-5'>
          {[1, 2, 3, 4, 5, 6].map((post) => (
            <GroupPostCard key={post} />
          ))}
        </div>
        <Pagination totalPages={10} />
      </section>
      <div className='no-scrollbar flex h-full min-w-[285px] flex-col gap-5 overflow-y-auto max-lg:min-w-full lg:sticky lg:top-0 lg:h-screen '>
        <MeetupChip />
        <SidePodcasts />
      </div>
    </div>
  );
}
