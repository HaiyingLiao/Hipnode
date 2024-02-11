import {
  OptionBar,
  LeftSidebar,
  Performance,
  PostCard,
  HostMeetupCard,
  Pagination,
  InterviewPostCard,
} from '@/components/index';
import { cardBtns, postDummyData } from '@/constants';
import { getProfilePosts } from '@/lib/actions/profile.action';
import { timeAgo, formatDate } from '@/lib/utils';

interface SearchParamsProps {
  searchParams: {
    type: string;
    page: string;
  };
}

export default async function ProfilePage({ searchParams }: SearchParamsProps) {
  const { type, page } = searchParams;

  const postData = await getProfilePosts(type, page);
  const posts = postData?.posts;
  const totalPages = postData?.totalPages || 1;

  return (
    <div className='flex flex-col items-start justify-center gap-6 py-[90px] lg:flex-row lg:py-[100px]'>
      <LeftSidebar />

      <div className='w-full lg:hidden'>
        <HostMeetupCard cardBtns={cardBtns} />
      </div>

      <main className='flex w-full flex-col lg:max-w-[785px]'>
        <OptionBar />
        <div>
          {posts?.map((post) => {
            switch (type) {
              case 'interviews':
                return (
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
                );
              case 'post':
                return (
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
                );
              default:
                return (
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
                );
            }
          })}

          <Pagination totalPages={totalPages} />
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
