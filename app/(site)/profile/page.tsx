import {
  OptionBar,
  LeftSidebar,
  Performance,
  PostCard,
  HostMeetupCard,
  Pagination,
  InterviewPostCard,
} from '@/components/index';
import { cardBtns } from '@/constants';
import { getProfilePosts } from '@/lib/actions/profile.action';
import { timeAgo, formatDate } from '@/lib/utils';
import { SearchParamsProps } from '@/types/searchParamsProps';
import { Interview, Post, ProfilePostsResult } from '@/types/profilePageType';

/**
 * ProfilePostsResult<T> is a generic type that takes in a type T and
 * Returns an object with a data property of type T[] and a totalPages property of type number
 *
 * T is a union type of Interview and Post. We used & to create a new type that is a combination of Interview and Post.
 * If we use | instead of &, the type of data will be Interview[] | Post[] which kinda doesn't work as in JSX we're using
 * switch case and passing the data to different fields to different components. So typescript will throw an error.
 *
 * To avoid that, we use & and specify that ProfilePostResult is a combination of Interview and Post.
 *
 * We don't know the type of data that will be returned from the getProfilePosts function. It could be an array of Interview
 * or Post. So we use a generic type to handle both cases and return the data and totalPages properties.
 *
 * Learn more about generic types here: https://www.typescriptlang.org/docs/handbook/2/generics.html
 * Blog post: https://prismic.io/blog/typescript-generics
 */

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Pick<SearchParamsProps['searchParams'], 'type' | 'page'>;
}) {
  const { type, page } = searchParams;

  const { data: posts, totalPages } = (await getProfilePosts(
    type,
    page,
  )) as ProfilePostsResult<Interview & Post>;

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
                    // comments={post.comments}
                    online={true}
                    id={post.id}
                    likes={post.likes}
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
                    // comments={post.comments}
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
