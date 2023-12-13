'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ProfileDropDown from './ProfileDropDown';
import { Button } from '@/components/ui/button';
import DarkModeToggle from './DarkModeToggle';
import MessageDropDown from './MessageDropDown';

const NavProfileMenu = () => {
  const { isSignedIn, user } = useUser();

  return (
    <section className='relative flex h-[60px] shrink-0 items-center justify-between md:h-[64px]'>
      <div className='flex items-center gap-2.5 lg:gap-[15px]'>
        {isSignedIn ? (
          <>
            <div className='profileIconContainer'>
              <MessageDropDown />
            </div>
            <Avatar className='navProfileAvatarContainer rounded-lg'>
              <AvatarImage
                src={user?.imageUrl}
                alt='Avatar'
                width={39}
                height={38}
                className='navProfileAvatarImage'
              />
              <AvatarFallback className='rounded-lg'>HN</AvatarFallback>
            </Avatar>
            <div className='flex items-center justify-between gap-[5px] lg:gap-2.5'>
              <h6 className='navProfileName truncate'>
                {user?.username ??
                  user.firstName ??
                  user.lastName ??
                  user.emailAddresses[0].emailAddress}{' '}
              </h6>
              <ProfileDropDown />
            </div>
          </>
        ) : (
          <div className='flex flex-1 items-center justify-center gap-[15px] py-3 md:gap-6'>
            <Link href='#' className='signupButton'>
              Signup
            </Link>
            <Link href='#'>
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
