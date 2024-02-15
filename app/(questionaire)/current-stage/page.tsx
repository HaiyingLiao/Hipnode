import { auth } from '@clerk/nextjs';

import { Contents } from '@/components/index';
import { userCurrentStage } from '@/constants';
import { getUserByClerkId } from '@/lib/actions/user.action';
import { checkUserStage } from '@/lib/utils';

async function CurrentStage() {
  const { userId } = auth();
  const mongoUser = await getUserByClerkId(userId!);
  checkUserStage('current-stage', mongoUser!.onboardingProgress);

  return (
    <Contents
      path='/programming-level'
      position='right'
      bg='bg-white dark:bg-darkPrimary-3'
      cardBg='bg-white-800 dark:bg-darkPrimary-4'
      contents={userCurrentStage}
      title="Which best describes the stage you're at right now?"
      userClerkId={userId!}
    />
  );
}

export default CurrentStage;
