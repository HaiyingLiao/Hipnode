import { postDummyData } from '@/constants';
import {
  PostStats,
  PostArticle,
  PostProfile,
  UserPostList,
  NotFound,
} from '@/components/index';

type URLProps = {
  params: {
    id: string;
  };
};

const Page = ({ params }: URLProps) => {
  const post = postDummyData.find((post) => `${post.id}` === params.id);

  if (!post) return <NotFound />;

  return (
    <main className='postDetailsLeftCol'>
      <div className='flex shrink-0 flex-col gap-5 max-xl:hidden'>
        <PostStats />
        <section className='flex shrink-0 flex-col gap-1 rounded-2xl bg-white p-5 px-7 dark:bg-darkPrimary-3'>
          <p className='display-semibold text-secondary-blue-80'>
            {post?.name}
          </p>
          <p className='display-semibold text-darkSecondary-800'>
            Posted {post?.createdDate}
          </p>
        </section>
      </div>

      <section>
        <PostArticle
          postHeader={post?.mainImage}
          alt={post?.title}
          title={post?.title}
          description={''}
          tags={post?.tags}
          user={post?.name}
          createdDate={post?.createdDate}
        />
      </section>

      <div className='postDetailsRightCol'>
        <PostProfile
          avatar={post?.avatar}
          user={post?.name}
          joinDate={post?.createdDate}
          userJob={''}
        />
        <UserPostList user={post?.name} id={post?.id} />
      </div>
    </main>
  );
};

export default Page;
