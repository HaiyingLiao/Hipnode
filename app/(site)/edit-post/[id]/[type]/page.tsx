import { EditPost } from '@/components/index';
import { getTargetPost } from '@/lib/actions/editForm.action';
import {
  HomePostType,
  InterviewType,
  MeeupType,
  PodcastType,
} from '@/types/editForm';

export default async function EditPostPage({
  params,
}: {
  params: { id: string; type: string };
}) {
  const { id, type } = params;

  const {
    image,
    title,
    post,
    revenue,
    updates,
    website,
    category,
    tags,
    authorclerkId,
    companyName,
    description,
    audio,
  } = (await getTargetPost(type, id)) as InterviewType &
    MeeupType &
    PodcastType &
    HomePostType;

  return (
    <section className='mx-auto my-[90px] w-full rounded-2xl bg-white p-5 dark:bg-darkPrimary-3 md:max-w-[900px] md:p-[30px] lg:my-[100px]'>
      {type === 'interviews' ? (
        <EditPost
          image={image}
          title={title}
          post={post}
          revenue={revenue}
          updates={updates}
          website={website}
          category={category}
          tags={tags}
          authorclerkId={authorclerkId}
          createType={type}
          postId={id}
        />
      ) : type === 'meetups' ? (
        <EditPost
          image={image}
          title={title}
          post={description}
          category={category}
          tags={tags}
          authorclerkId={authorclerkId}
          createType={type}
          postId={id}
          companyName={companyName}
        />
      ) : type === 'podcasts' ? (
        <EditPost
          image={image}
          title={title}
          post={post}
          category={category}
          authorclerkId={authorclerkId}
          createType={type}
          postId={id}
          audio={audio}
        />
      ) : type === 'post' ? (
        <EditPost
          image={post.image}
          title={post.title}
          post={post.body}
          authorclerkId={post.authorclerkId}
          createType={type}
          postId={id}
          tags={post.tags}
        />
      ) : (
        ''
      )}
    </section>
  );
}
