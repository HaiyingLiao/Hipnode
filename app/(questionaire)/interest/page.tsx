import { auth } from '@clerk/nextjs';

import { InterestWrapper } from '@/components/index';
import { checkUserStage } from '@/lib/utils';
import { getUserByClerkId } from '@/lib/actions/user.action';

export default async function Introduce() {
  const { userId } = auth();
  const mongoUser = await getUserByClerkId(userId!);
  checkUserStage('interest', mongoUser!.onboardingProgress);
  console.log('here', mongoUser);

  return (
    <section className='flex min-h-full w-full flex-col items-center justify-center bg-white p-5 dark:bg-darkPrimary-3 lg:max-w-720'>
      <div className='w-full max-w-442'>
        <h2 className='py-10 text-lg font-semibold text-darkSecondary-900 dark:text-white-800 md:text-3xl md:font-bold'>
          What types of businesses are you most interested in running?
        </h2>
        <p className='text-base font-semibold text-secondary-blue-80'>
          Choose as many as you like.
        </p>
        <InterestWrapper userClerkId={userId!} />
      </div>
    </section>
  );
}
