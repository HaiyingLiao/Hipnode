import { auth } from '@clerk/nextjs';

import { Contents } from '@/components/index';
import { programmingLevels } from '@/constants';
import { getUserByClerkId } from '@/lib/actions/user.action';
import { checkUserStage } from '@/lib/utils';

export default async function ProgrammingLevel() {
  const { userId } = auth();
  const mongoUser = await getUserByClerkId(userId!);
  console.log('here', mongoUser);
  checkUserStage('programming-level', mongoUser!.onboardingProgress);

  return (
    <section className=' h-full w-full'>
      <Contents
        path='/interest'
        position='right'
        bg='bg-white dark:bg-darkPrimary-3'
        cardBg='bg-white-800 dark:bg-darkPrimary-4 hover:bg-secondary-red-60 '
        contents={programmingLevels}
        title='Do you know how to code?'
        userClerkId={userId!}
      />
    </section>
  );
}
