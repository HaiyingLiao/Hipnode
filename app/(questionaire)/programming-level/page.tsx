import { getCachedUser } from '@/lib/userCache';
import { Contents } from '@/components/index';
import { programmingLevels } from '@/constants';
import { checkUserStage } from '@/lib/utils';

export default async function ProgrammingLevel() {
  await checkUserStage('programming-level');
  const user = await getCachedUser();
  if (!user) return;

  return (
    <section className=' h-full w-full'>
      <Contents
        path='/interest'
        position='right'
        bg='bg-white dark:bg-darkPrimary-3'
        cardBg='bg-white-800 dark:bg-darkPrimary-4 hover:bg-secondary-red-60 '
        contents={programmingLevels}
        title='Do you know how to code?'
        userClerkId={user.id}
      />
    </section>
  );
}
