import { SignIn } from '@clerk/nextjs';

import { Contents } from '@/components/index';
import { signInContents } from '@/constants';

export default function Signin() {
  return (
    <>
      <Contents
        position='left'
        title='Sign in to Hipnode.'
        contents={signInContents}
      />
      <div className='flex w-full items-center justify-center dark:bg-darkPrimary-3'>
        <SignIn />;
      </div>
    </>
  );
}
