import Link from 'next/link';
import Image from 'next/image';

import {
  Pagination,
  PostCard,
  SidebarListItem,
  SidePodcasts,
  MeetupChip,
} from '@/components/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  postDummyData,
  newAndPopular,
  newAndPopularMobile,
  pinnedGroups,
  popularTags,
} from '@/constants';

type URLProps = {
  searchParams: {
    page: string;
    search: string;
  };
};

export default function Home({ searchParams }: URLProps) {
  // Test functions - will re-write this when querying from server
  let postsThatIncludeQuery = postDummyData.filter((article) =>
    article.title.includes(searchParams.search),
  );

  if (postsThatIncludeQuery.length === 0) {
    postsThatIncludeQuery = postDummyData;
  }

  const MAX_POSTS_PER_PAGE = 5;
  const maxNumberOfPages = Math.ceil(
    postsThatIncludeQuery.length / MAX_POSTS_PER_PAGE,
  );
  const currentPage = Number(searchParams.page || '1');
  const startIndex = (currentPage - 1) * MAX_POSTS_PER_PAGE;
  const endIndex = currentPage * MAX_POSTS_PER_PAGE;
  const activePosts = postsThatIncludeQuery.slice(startIndex, endIndex);

  return (
    <main className='mb-30 flex flex-row justify-center gap-7 bg-white-700 dark:bg-darkPrimary-2'>
      {/* Left Sidebar */}
      <aside className='leftSidebar'>
        <section className='asideContainerSmall'>
          <ul>
            {newAndPopular.map((item) => (
              <SidebarListItem
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
                key={item.id}
                id={item.id}
                icon={item.icon}
                title={item.title}
                text={item.text}
                isFollowingNumberHidden={item.isFollowingNumberHidden}
                hashtag={item.hashtag}
                noOfPosts={item.noOfPosts}
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
                key={item.id}
                id={item.id}
                icon={item.icon}
                title={item.title}
                text={item.text}
                isFollowingNumberHidden={item.isFollowingNumberHidden}
                hashtag={item.hashtag}
                noOfPosts={item.noOfPosts}
                bgColor={item.bgColor}
                dimensionsInnerSquare={item.dimensionsInnerSquare}
                dimensionsOuterSquare={item.dimensionsOuterSquare}
              />
            ))}
          </ul>
        </section>
      </aside>

      {/* Middle Section */}
      <section>
        <div className='homeMain'>
          {/* Only on Mobile */}
          <ul className='asideContainerSmall mb-5 flex pr-4 md:hidden'>
            {newAndPopularMobile.map((item) => (
              <li key={item.id} className='w-full'>
                <Link href='/' className='asideListItemLink justify-center'>
                  <div className='asideImageDiv h-[28px] w-[28px] p-1'>
                    <Image src={item.icon} alt='Icon' width={15} height={15} />
                  </div>

                  <div>
                    <div className='flex items-center gap-[6px]'>
                      <h6 className='bodyXs-semibold sm:bodyMd-semibold text-darkSecondary-900 dark:text-white'>
                        {item.title}
                      </h6>
                      <p
                        className={`${
                          item.isFollowingNumberHidden ? 'hidden' : ''
                        } asideFollowingNumber px-[3px]`}
                      >
                        24
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <section className='barContainer'>
            <Avatar className='avatarCreatePostMobile'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>HN</AvatarFallback>
            </Avatar>
            <Input
              type='text'
              placeholder="Let's share what's going on in your mind..."
              className='barInput bodySm-regular md:body-regular'
            />
            <Button className='barButton'>Create Post</Button>
          </section>

          <section className='mb-10 max-w-2xl'>
            <div className='pb-2'>
              {activePosts?.map((post) => (
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
                  likes={post.likes}
                />
              ))}
            </div>
            <Pagination totalPages={maxNumberOfPages} />
          </section>
        </div>
      </section>

      {/* Right Sidebar */}
      <aside className='rightSidebar'>
        <MeetupChip />
        <SidePodcasts />
      </aside>
    </main>
  );
}
