'use client';

import { useState } from 'react';

import { AiOutlineCheck, AiOutlineComment } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { FaRegHeart } from 'react-icons/fa';
import { GoMention } from 'react-icons/go';

import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { notifications } from '@/constants';
import NotificationItem from './NotificationItem';

const Notifications = () => {
  const [isSeen, setIsSeen] = useState(false);

  const reactions = notifications.filter(
    (notification) => notification.type === 'reaction',
  );
  const comments = notifications.filter(
    (notification) => notification.type === 'comment',
  );
  const mentions = notifications.filter(
    (notification) => notification.type === 'mention',
  );

  const tabs = [
    {
      value: 'allNotifications',
      data: notifications,
    },
    { value: 'reactions', data: reactions },
    { value: 'comments', data: comments },
    { value: 'mentions', data: mentions },
  ];

  return (
    <div className='sm:p-4'>
      <header className='notificationsDropDownContainer'>
        {/* Dynamic Header */}
        <h3 className='display-semibold md:heading3 px-1.5 text-darkSecondary-900 dark:text-white-800'>
          {notifications.length} Notifications
        </h3>

        {/* Mark All Read Button */}
        <button
          type='button'
          className='markAsSeenButton'
          onClick={() => setIsSeen((prevState) => !prevState)}
        >
          <span className='display-semibold mr-2.5 text-secondary-blue-80'>
            <AiOutlineCheck size={20} />
          </span>
          {isSeen ? 'Mark All Unread' : 'Mark All Read'}
        </button>
      </header>

      {/* Tabs */}
      <Tabs defaultValue='allNotifications' className='w-full'>
        <TabsList className='tabList'>
          {/* All Notifications Tab */}
          <TabsTrigger value='allNotifications' className='tabContainer'>
            All notifications
          </TabsTrigger>

          {/* Reactions Tab */}
          <TabsTrigger value='reactions' className='tabContainer'>
            <FaRegHeart size={20} className='mr-2' />
            Reactions
          </TabsTrigger>

          {/* Comments Tab */}
          <TabsTrigger value='comments' className='tabContainer'>
            <AiOutlineComment size={20} className='mr-2' />
            Comments
          </TabsTrigger>

          {/* Mentions Tab */}
          <TabsTrigger value='mentions' className='tabContainer'>
            <GoMention size={20} className='mr-2' />
            Mentions
          </TabsTrigger>

          {/* Create Post Tab */}
          <TabsTrigger value='createPost' className='tabContainer'>
            <BsPencilSquare size={18} />
          </TabsTrigger>
        </TabsList>

        {/* Content for each tab */}
        {tabs.map((tab) => (
          <TabsContent value={tab.value} key={tab.value}>
            {tab.data.length === 0 ? (
              <p className='emptyNotificationsText'>Nothing to show!</p>
            ) : (
              tab.data.map((notification) => (
                <NavigationMenuLink key={notification.id}>
                  <NotificationItem
                    name={notification.name}
                    avatar={notification.avatar}
                    typeIcon={notification.typeIcon}
                    typeText={notification.typeText}
                    text={notification.text}
                    title={notification.title}
                    date={notification.date}
                    time={notification.time}
                    isSeen={isSeen}
                  />
                </NavigationMenuLink>
              ))
            )}
          </TabsContent>
        ))}

        {/* Create Post Tab */}
        <TabsContent value='createPost'>
          <p className='emptyNotificationsText'>Create a Post...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
