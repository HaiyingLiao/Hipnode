import { CreatePost } from '@/components/index';
import { getCachedUser } from '@/lib/userCache';

export default async function CreatePostPage() {
  const user = await getCachedUser();

  return (
    <section className='mx-auto my-[90px] w-full rounded-2xl bg-white p-5 dark:bg-darkPrimary-3 md:max-w-[900px] md:p-[30px] lg:my-[100px]'>
      <CreatePost authorclerkId={user?.id} />
    </section>
  );
}
