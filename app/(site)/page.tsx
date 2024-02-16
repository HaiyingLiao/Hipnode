import Image from 'next/image';

import { getCachedUser } from '@/lib/userCache';
import { popularTags, pinnedGroups, newAndPopular } from '@/constants';
import {
  PostCard,
  Pagination,
  MeetupChip,
  SidePodcasts,
  CreatePostInput,
  SidebarListItem,
} from '@/components/index';
import { getAllPosts } from '@/lib/actions/post.action';
import { timeAgo } from '@/lib/utils';
import SortMobile from '@/components/Home/SortMobile';

type URLProps = {
  searchParams: {
    page: string;
    search: string;
    sort?: 'popular' | 'newest';
    tags: string;
  };
};

export default async function Home({ searchParams }: URLProps) {
  const user = await getCachedUser();
  const page = searchParams.page ? +searchParams.page : 1;
  const { data: posts, totalPages } = await getAllPosts(
    searchParams.sort,
    page,
    10,
    '/',
    searchParams.tags,
  );

  const searchResults = posts?.filter((article) => {
    const search = searchParams.search ?? '';
    return search !== ''
      ? article.title.toLowerCase().includes(searchParams.search.toLowerCase())
      : posts;
  });

  return (
    <main className='mb-30 flex flex-row justify-center gap-7  bg-white-700 dark:bg-darkPrimary-2'>
      {/* Left Sidebar */}
      <aside className='leftSidebar no-scrollbar'>
        <section className='asideContainerSmall'>
          <ul>
            {newAndPopular.map((item) => (
              <SidebarListItem
                label={item.label}
                key={item.id}
                id={item.id}
                icon={item.icon}
                title={item.title}
                text={item.text}
                isFollowingNumberHidden={item.isFollowingNumberHidden}
                dimensionsInnerSquare={item.dimensionsInnerSquare}
                dimensionsOuterSquare={item.dimensionsOuterSquare}
              />
            ))}
          </ul>
        </section>

        <section className='asideContainerLarge'>
          <header>
            <h3 className='display-semibold mb-5 text-darkSecondary-900 dark:text-white-800'>
              Popular Tags
            </h3>
          </header>
          <ul>
            {popularTags.map((item) => (
              <SidebarListItem
                label={''}
                key={item.id}
                id={item.id}
                icon={item.icon}
                title={item.title}
                text={item.text}
                isFollowingNumberHidden={item.isFollowingNumberHidden}
                hashtag={item.hashtag}
                totalPosts={item.noOfPosts}
                bgColor={item.bgColor}
                dimensionsInnerSquare={item.dimensionsInnerSquare}
                dimensionsOuterSquare={item.dimensionsOuterSquare}
              />
            ))}
          </ul>
        </section>

        <section className='asideContainerLarge'>
          <header className='mb-5 flex items-center justify-start'>
            <h3 className='display-semibold mr-2 text-darkSecondary-900 dark:text-white-800'>
              Pinned Groups
            </h3>
            <Image
              src='/assets/leftSideBarHome/arrow-right.svg'
              alt='Right arrow'
              width={20}
              height={20}
              className='dark:contrast-200 dark:grayscale dark:invert'
            />
          </header>
          <ul>
            {pinnedGroups.map((item) => (
              <SidebarListItem
                label=''
                key={item.id}
                id={item.id}
                icon={item.icon}
                title={item.title}
                text={item.text}
                isFollowingNumberHidden={item.isFollowingNumberHidden}
                hashtag={item.hashtag}
                totalPosts={item.noOfPosts}
                bgColor={item.bgColor}
                dimensionsInnerSquare={item.dimensionsInnerSquare}
                dimensionsOuterSquare={item.dimensionsOuterSquare}
              />
            ))}
          </ul>
        </section>
      </aside>

      <section className='w-full'>
        <div className='homeMain no-scrollbar w-full'>
          <SortMobile />
          <CreatePostInput
            username={user?.username as string}
            imageUrl={user?.imageUrl as string}
          />
          <section className='mb-10'>
            <div className='pb-2'>
              {searchResults?.map((post) => (
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
              ))}
            </div>
            <Pagination totalPages={totalPages} />
          </section>
        </div>
      </section>

      <aside className='rightSidebar no-scrollbar'>
        <MeetupChip />
        <SidePodcasts />
      </aside>
    </main>
  );
}
