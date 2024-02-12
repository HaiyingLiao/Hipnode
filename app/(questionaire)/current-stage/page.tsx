import { getCachedUser } from '@/lib/userCache';
import { Contents } from '@/components/index';
import { userCurrentStage } from '@/constants';

export default async function CurrentStage() {
  const user = await getCachedUser();
  if (!user) return;

  return (
    <Contents
      path='/programming-level'
      position='right'
      bg='bg-white dark:bg-darkPrimary-3'
      cardBg='bg-white-800 dark:bg-darkPrimary-4'
      contents={userCurrentStage}
      title="Which best describes the stage you're at right now?"
      userClerkId={user.id}
    />
  );
}
