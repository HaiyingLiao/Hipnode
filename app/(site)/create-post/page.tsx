import { currentUser } from '@clerk/nextjs';

import { CreatePost } from '@/components/index';

export default async function CreatePostPage() {
  const user = await currentUser();

  return (
    <section className='mx-auto my-[90px] w-full rounded-2xl bg-white p-5 dark:bg-darkPrimary-3 md:max-w-[900px] md:p-[30px] lg:my-[100px]'>
      <CreatePost authorclerkId={user?.id} />
    </section>
  );
}
