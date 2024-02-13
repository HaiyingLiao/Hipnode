import Link from 'next/link';
import { UserButton, auth } from '@clerk/nextjs';

import ProfileDropDown from './ProfileDropDown';
import { Button } from '@/components/ui/button';
import DarkModeToggle from './DarkModeToggle';
import MessageDropDown from './MessageDropDown';

const NavProfileMenu = async () => {
  const { user } = auth();
  const isLoggedIn: boolean = !!user;

  return (
    <section className='relative flex h-[60px] shrink-0 items-center justify-between md:h-[64px]'>
      <div className='flex items-center gap-2.5 lg:gap-[15px]'>
        {isLoggedIn ? (
          <>
            <div className='profileIconContainer'>
              <MessageDropDown />
            </div>
            <UserButton afterSignOutUrl='/' />
            <div className='flex items-center justify-between gap-[5px] lg:gap-2.5'>
              <h6 className='navProfileName'>{user?.username}</h6>
              <ProfileDropDown />
            </div>
          </>
        ) : (
          <div className='flex flex-1 items-center justify-center gap-[15px] py-3 md:gap-6'>
            <Link href='/sign-up' className='signupButton'>
              Signup
            </Link>
            <Link href='/sign-in'>
              <Button className='loginButton'>Login</Button>
            </Link>
            <DarkModeToggle isTextHidden={true} />
          </div>
        )}
      </div>
    </section>
  );
};

export default NavProfileMenu;
