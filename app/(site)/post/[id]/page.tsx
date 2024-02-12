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
// import { getUserByPostAuthor } from '@/lib/actions/user.action';
import { checkUserStage, getCreatedDate, getPostStats } from '@/lib/utils';

type URLProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: URLProps) => {
  await checkUserStage('');
  const { post, totalComments } = await getPostById(params.id);
  if (!post) return <NotFound />;

  const [relatedPosts, postAuthor] = await Promise.all([
    getRelatedPosts(post.authorName, post.title),
    // getUserByPostAuthor(post.authorEmail),
    updateView(post.id),
  ]);
  const postStats = getPostStats(post.likes.length, totalComments, post.share);

  return (
    <main className='postDetailsLeftCol'>
      <div className='flex shrink-0 flex-col gap-5 max-xl:hidden'>
        <PostStats
          stats={postStats}
          postAuthorName={post.authorName}
          postId={post?.id}
        />
        <section className='flex shrink-0 flex-col gap-1 rounded-2xl bg-white p-5 px-7 dark:bg-darkPrimary-3'>
          <p className='display-semibold text-secondary-blue-80'>
            {post?.authorName}
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
          // @ts-ignore
          postHeader={post?.postImage}
          alt={post?.title}
          title={post?.title}
          description={post?.body}
          tags={post?.tags ?? []}
          user={post?.authorName}
          createdDate={getCreatedDate(new Date(post.createdAt)) as string}
        />
      </section>

      <div className='postDetailsRightCol'>
        <PostProfile
          avatar={post?.avatar!}
          user={post?.authorName!}
          // @ts-ignore
          joinDate={getCreatedDate(postAuthor.createdAt)!}
          userJob={post?.role!}
        />
        <UserPostList
          posts={relatedPosts ?? []}
          user={post?.authorName!}
          id={post?.id}
        />
      </div>
    </main>
  );
};

export default Page;
