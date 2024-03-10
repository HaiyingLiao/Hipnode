import {
  OptionBar,
  LeftSidebar,
  Performance,
  PostCard,
  HostMeetupCard,
  Pagination,
  InterviewPostCard,
  MeetupCard,
  PodcastChip,
} from '@/components/index';
import { cardBtns } from '@/constants';
import { getProfilePosts } from '@/lib/actions/profile.action';
import { timeAgo, formatDate } from '@/lib/utils';
import { SearchParamsProps } from '@/types/searchParamsProps';
import {
  Interview,
  Post,
  ProfilePostsResult,
  Meetup,
  Podcast,
} from '@/types/profilePageType';

export default async function ProfilePage({ searchParams }: SearchParamsProps) {
  const { type, page } = searchParams;

  const { data: posts, totalPages } = (await getProfilePosts(
    type,
    page,
  )) as ProfilePostsResult<Interview & Post & Meetup & Podcast>;

  return (
    <div className='flex flex-col items-start justify-center gap-6 py-[90px] lg:flex-row lg:py-[100px]'>
      <LeftSidebar />

      <div className='w-full lg:hidden'>
        <HostMeetupCard cardBtns={cardBtns} />
      </div>

      <main className='flex w-full flex-col lg:max-w-[785px] '>
        <OptionBar />
        <div>
          {posts?.map((post) => {
            switch (type) {
              case 'interviews':
                return (
                  <InterviewPostCard
                    key={post.id}
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
                    key={post.id}
                    emailAddress={post.author.email}
                    username={post.author.name}
                    title={post.title}
                    tags={post.tags}
                    views={post.views}
                    image={post.image}
                    createdAt={timeAgo(post.createdAt)}
                    avatar={post.author.image}
                    commentsLength={post.comments.length}
                    online={true}
                    id={post.id}
                    likes={post.likes}
                  />
                );
              case 'meetups':
                return (
                  <MeetupCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    companyName={post.companyName}
                    location={post.companyName}
                    description={post.description}
                    tags={post.tags}
                    image={post.image}
                    updateAt={post.updateAt}
                  />
                );
              case 'podcasts':
                return (
                  <PodcastChip
                    title={post.title}
                    post={post.post}
                    avatar={post.author.image}
                    location={post.location}
                    author={post.author.name}
                    id={post.id}
                    key={post.id}
                  />
                );
              default:
                return (
                  <PostCard
                    key={post.id}
                    emailAddress={post.author.email}
                    username={post.author.name}
                    title={post.title}
                    tags={post.tags}
                    views={post.views}
                    image={post.image}
                    createdAt={timeAgo(post.createdAt)}
                    avatar={post.author.image}
                    commentsLength={post.comments.length}
                    online={true}
                    id={post.id}
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
