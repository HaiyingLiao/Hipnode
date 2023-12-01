import {
  OptionBar,
  LeftSidebar,
  Performance,
  PostCard,
  HostMeetupCard,
  Pagination,
} from '@/components/index';
import { cardBtns, postDummyData } from '@/constants';

export default function ProfilePage() {
  return (
    <div className='flex flex-col items-start justify-center gap-6 py-[90px] lg:flex-row lg:py-[100px]'>
      <LeftSidebar />

      <div className='w-full lg:hidden'>
        <HostMeetupCard cardBtns={cardBtns} />
      </div>

      <main className='flex w-full flex-col lg:max-w-[785px]'>
        <OptionBar />
        <div>
          {postDummyData?.map((post) => (
            <PostCard
              slug={post.id.toString()}
              key={post.id}
              name={post.name}
              title={post.title}
              tags={post.tags}
              views={post.views}
              mainImage={post.mainImage}
              createdDate={post.createdDate}
              avatar={post.avatar}
              comments={post.comments}
              online={post.online}
              // isLiked={post.isLiked}
              likes={post.likes}
            />
          ))}
          <Pagination totalPages={20} />
        </div>
      </main>

      <aside className='flex w-full flex-col gap-5 lg:sticky lg:top-[100px] lg:max-w-[325px]'>
        <div className='hidden lg:block'>
          <HostMeetupCard cardBtns={cardBtns} />
        </div>

        <Performance />
      </aside>
    </div>
  );
}
