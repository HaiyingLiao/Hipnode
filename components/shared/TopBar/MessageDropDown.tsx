import Image from 'next/image';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { messageDropDownNav } from '@/constants';
import Notifications from './Notifications';

const MessageDropDown = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* Message Button */}
          <NavigationMenuTrigger className='messageIconContainer'>
            <Image
              src='/assets/navigation/message.svg'
              alt='Message Icon'
              width={20}
              height={20}
              className='messageIcon'
            />
          </NavigationMenuTrigger>

          {/* Message DropDown Content */}
          <NavigationMenuContent className='messageDropDownContent'>
            <h3 className='messageDropDownHeader'>Messages</h3>
            {messageDropDownNav.map((message) => (
              <NavigationMenuLink key={message.id}>
                <div className='messageNotificationContainer'>
                  {/* Avatar and Message */}
                  <div className='flex items-center justify-between gap-[7px]'>
                    <Avatar className='rounded-full bg-secondary-yellow-30 text-center'>
                      <AvatarImage
                        src={message.avatar}
                        alt='Avatar'
                        width={39}
                        height={38}
                        className='messageAvatarImage'
                      />
                      <AvatarFallback className='rounded-full !bg-secondary-yellow-30'>
                        HN
                      </AvatarFallback>
                    </Avatar>

                    {/* Notification body - name, created date, message */}
                    <div className='ml-[2px]'>
                      <div className='line-clamp-1 flex items-center justify-start'>
                        <h4 className='display-semibold mr-2 text-darkSecondary-900 dark:text-white-800'>
                          {message.name}
                        </h4>
                        <h6 className='bodyMd-regular mt-1 text-darkSecondary-800'>
                          {message.createdDate}
                        </h6>
                      </div>
                      <h6 className='bodyMd-regular line-clamp-1 text-darkSecondary-800'>
                        {message.message}
                      </h6>
                    </div>
                  </div>

                  {/* Orange Number - Number of Messages */}
                  {message.numberOfMessages > 0 && (
                    <div className='messagesNumber'>
                      <div>{message.numberOfMessages}</div>
                    </div>
                  )}
                </div>
              </NavigationMenuLink>
            ))}

            {/* 'See All in Messenger' Button */}
            <NavigationMenuLink className='flex items-center justify-center'>
              <button type='button' className='seeInMessenger'>
                See all in Messenger
              </button>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Bell Button Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className='bellIconContainer'>
            <Image
              src='/assets/navigation/bell.svg'
              alt='Notifications Icon'
              width={20}
              height={20}
              className='bellIcon'
            />
          </NavigationMenuTrigger>

          {/* Bell Button DropDown Content */}
          <NavigationMenuContent className='bellButtonDropDown !sm:p-5 !p-1'>
            {/* Message Notifications */}
            <Notifications />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MessageDropDown;
