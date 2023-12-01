'use client';

import { AiOutlineCaretDown } from 'react-icons/ai';
import { Separator } from '@radix-ui/react-separator';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { loggedIn } from '@/constants';
import DarkModeToggle from './DarkModeToggle';

const ProfileDropDown = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* Arrow Button */}
          <NavigationMenuTrigger className='pl-1 dark:bg-darkPrimary-3 dark:hover:bg-darkPrimary-3'>
            <AiOutlineCaretDown className='profileDropDownArrow' />
          </NavigationMenuTrigger>

          {/* Dropdown */}
          <NavigationMenuContent className='cursor-pointer bg-white dark:bg-darkPrimary-3'>
            {loggedIn.map((link) => (
              <NavigationMenuLink
                key={link.label}
                href={link.route}
                className='mb-4 flex items-center hover:text-primary'
              >
                <link.IconComponent className='mr-2' />
                <h6 className='display-semibold mr-2'>{link.label}</h6>
              </NavigationMenuLink>
            ))}

            <Separator className='mx-auto mt-5 dark:bg-white-800' />

            <DarkModeToggle />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ProfileDropDown;
