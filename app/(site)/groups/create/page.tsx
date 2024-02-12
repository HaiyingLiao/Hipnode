import { CreateGroupForm } from '@/components/index';
import { checkUserStage } from '@/lib/utils';

export default async function CreateGroup() {
  await checkUserStage('');
  return (
    <div className='mt-28 flex w-full justify-center'>
      <CreateGroupForm />
    </div>
  );
}
