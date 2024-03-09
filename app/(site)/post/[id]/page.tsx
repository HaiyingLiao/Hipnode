import {
  PostStats,
  PostArticle,
  PostProfile,
  UserPostList,
  NotFound,
} from '@/components/index';
import {
  getPostById,
  getRelatedPosts,
  updateView,
} from '@/lib/actions/post.action';
import { getCreatedDate, getPostStats } from '@/lib/utils';

type URLProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: URLProps) => {
  const { post, totalComments } = await getPostById(params.id);
  if (!post) return <NotFound />;

  const [relatedPosts] = await Promise.all([
    getRelatedPosts(post.authorclerkId, post.title),
    updateView(post.id),
  ]);

  const postStats = getPostStats(post.likes.length, totalComments, post.share);

  return (
    <main className='postDetailsLeftCol'>
      <div className='flex shrink-0 flex-col gap-5 max-xl:hidden'>
        <PostStats
          stats={postStats}
          postAuthorName={post.author.name}
          postId={post?.id}
        />
        <section className='flex shrink-0 flex-col gap-1 rounded-2xl bg-white p-5 px-7 dark:bg-darkPrimary-3'>
          <p className='display-semibold text-secondary-blue-80'>
            {post?.author.name}
          </p>
          <p className='display-semibold text-darkSecondary-800'>
            Posted {getCreatedDate(new Date(post?.createdAt!)) as string}
          </p>
        </section>
      </div>

      <section className='w-full'>
        <PostArticle
          id={post.id}
          comments={post.comments ?? []}
          likes={post.likes.length}
          share={post.share}
          postHeader={post?.image}
          alt={post?.title}
          title={post?.title}
          description={post?.body}
          tags={post?.tags ?? []}
          user={post?.author.name}
          createdDate={getCreatedDate(new Date(post.createdAt)) as string}
        />
      </section>

      <div className='postDetailsRightCol'>
        <PostProfile
          avatar={post?.author.image}
          user={post?.author.name}
          joinDate={getCreatedDate(post.author.createdAt)!}
          userJob={post?.role!}
        />
        <UserPostList
          posts={relatedPosts ?? []}
          user={post?.author.name}
          id={post?.id}
        />
      </div>
    </main>
  );
};

export default Page;
