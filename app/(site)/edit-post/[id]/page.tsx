import { EditPost } from '@/components/index';
import { getInterviewById } from '@/lib/actions/interviews.action';

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const editingInterview = await getInterviewById(params.id);
  const { title, post, revenue, updates, website, category, tags, authorId } =
    editingInterview;
  const createType = 'interviews';

  return (
    <section className='mx-auto my-[90px] w-full rounded-2xl bg-white p-5 dark:bg-darkPrimary-3 md:max-w-[900px] md:p-[30px] lg:my-[100px]'>
      <EditPost
        title={title}
        post={post}
        revenue={revenue}
        updates={updates}
        website={website}
        category={category}
        tags={tags}
        authorId={authorId}
        createType={createType}
        postId={params.id}
      />
    </section>
  );
}
