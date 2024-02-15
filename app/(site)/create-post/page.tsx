import { auth } from '@clerk/nextjs';

import { CreatePost } from '@/components/index';
import { checkUserStage } from '@/lib/utils';
import { getUserByClerkId } from '@/lib/actions/user.action';

export default async function CreatePostPage() {
  const { userId } = auth();
  const mongoUser = await getUserByClerkId(userId!);
  checkUserStage('current-stage', mongoUser!.onboardingProgress);

  return (
    <section className='mx-auto my-[90px] w-full rounded-2xl bg-white p-5 dark:bg-darkPrimary-3 md:max-w-[900px] md:p-[30px] lg:my-[100px]'>
      <CreatePost authorclerkId={userId!} />
    </section>
  );
}
