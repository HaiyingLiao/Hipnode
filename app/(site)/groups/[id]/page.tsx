import PostCard from '@/components/shared/PostCard';
import {
  Explore,
  GroupAbout,
  GroupActiveMembers,
  GroupAdmins,
  GroupBanner,
  GroupRecentMedia,
  HostMeetupCard,
  Pagination,
} from '@/components/index';
import { checkUserStage } from '@/lib/utils';

const cardBtns = [
  {
    name: 'Create Group',
    link: '/',
  },
  {
    name: 'Code of Conduct',
    link: '/code-of-conduct',
  },
];

export default async function GroupDetail() {
  await checkUserStage('');
  return (
    <div className='mt-24 h-full min-h-full w-full p-5'>
      <div className='flex w-full justify-between gap-5 max-lg:flex-wrap'>
        <aside className='top-0 hidden h-full max-h-screen w-full max-w-[210px] gap-5 overflow-y-auto lg:sticky lg:flex lg:flex-col'>
          <GroupAbout />
          <GroupAdmins />
          {/* <PopularTags /> */}
        </aside>
        <section className=' w-full grow '>
          <GroupBanner />
          <Explore />
          {[1, 2, 3, 4].map((p) => (
            <div key={p} className='w-full'>
              <PostCard
                id='/slug'
                avatar='/assets/images/user-avatar.svg'
                // comments={5}
                createdAt={'12/10/2024'}
                authorName='Wira'
                emailAddress='wira@gmail.com'
                // likes={23}
                postImage='/assets/images/profile.svg'
                username='wira'
                tags={['finance', 'crypto', 'bitcoin']}
                title='Bitcoin has tumbled from its record high of $58,000 after words from three wise men and women...'
                views={333}
                styles='max-w-full'
              />
            </div>
          ))}
          <Pagination totalPages={20} />
          <div className='flex flex-wrap gap-5 lg:hidden'>
            <GroupAbout />
            <GroupAdmins />
            {/* <PopularTags /> */}
          </div>
        </section>
        <aside className='flex h-full w-full max-w-[325px] flex-col gap-5 overflow-y-auto max-lg:max-w-full  lg:sticky lg:top-0'>
          <HostMeetupCard cardBtns={cardBtns} />
          <GroupActiveMembers />
          <GroupRecentMedia />
        </aside>
      </div>
    </div>
  );
}
