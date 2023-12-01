import Image from 'next/image';
import Link from 'next/link';

import { socialIcons } from '@/constants';
import ContactBtns from './ContactBtns';
import Following from './Following';

const LeftSidebar = () => {
  return (
    <aside className='w-full rounded-2xl bg-white text-center dark:bg-darkPrimary-3 lg:sticky lg:top-[100px] lg:w-[210px]'>
      <div className="h-[106px] w-full rounded-t-2xl bg-[url('../public/left-sidebar-bg.svg')]" />
      <div className='px-5 py-[30px]'>
        <div className='relative'>
          <div className='flexCenter absolute inset-x-0 -top-24 mx-auto h-[130px] w-[130px] rounded-full border-4 border-white bg-secondary-yellow-30 dark:border-darkPrimary-3'>
            <Image
              src='user-avatar.svg'
              alt='user-img'
              width={90}
              height={90}
            />
          </div>
        </div>

        <h1 className='heading1-semibold mt-[44px] text-darkSecondary dark:text-white'>
          AR. Jakir
        </h1>
        <h2 className='display-regular text-darkSecondary-900 dark:text-darkSecondary-800'>
          User Interface Designer
        </h2>

        <ContactBtns />

        <p className='body-semibold text-darkSecondary-900 dark:text-white-700'>
          33 Followers • 501 Points
        </p>

        <Following />

        <p className='body-semibold text-darkSecondary-800 dark:text-darkSecondary-800'>
          Hey there... I&apos;m AR Jakir! I&apos;m here to learn from and
          support the other members of this community!
        </p>

        <div className='flexCenter mt-5 flex-row gap-5 md:flex-col'>
          <div className='flexCenter gap-[10px]'>
            <Image
              src='left-sidebar-web.svg'
              alt='link-img'
              width={20}
              height={20}
              className='h-5 w-5 dark:brightness-0 dark:invert md:h-3.5 md:w-3.5'
            />
            <Link
              href='www.uikit.to'
              className='body-semibold text-darkSecondary-900 dark:text-white-700'
            >
              www.uikit.to
            </Link>
          </div>

          <div className='flexCenter gap-2.5'>
            {socialIcons.map((icon) => (
              <Image
                key={icon.label}
                src={icon.path}
                alt={icon.label}
                width={16}
                height={16}
                className='dark:brightness-0 dark:invert'
              />
            ))}
          </div>
        </div>

        <div className='mx-auto my-[30px] max-w-[170px] border-b-[1px] border-white-800 dark:border-darkSecondary-800' />

        <p className='body-semibold text-darkSecondary-800 dark:text-white-700'>
          joined 2 years ago
        </p>
      </div>
    </aside>
  );
};

export default LeftSidebar;
