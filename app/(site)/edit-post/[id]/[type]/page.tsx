import { EditPost } from '@/components/index';
import { getTargetPost } from '@/lib/actions/editForm.action';
import { InterviewType, MeeupType } from '@/types/editForm';

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
  } = (await getTargetPost(type, id)) as InterviewType & MeeupType;

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
      ) : (
        ''
      )}
    </section>
  );
}
