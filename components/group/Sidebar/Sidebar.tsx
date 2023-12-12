'use client';

import Image from 'next/image';
import { useState } from 'react';

import SidebarItem from './Item';
import { sidebarContents } from '@/constants';
import { GroupSidebar } from '@/types/group-sidebar';

export default function Sidebar() {
  const [selectedContent, setSelectedContent] = useState<GroupSidebar | null>(
    null,
  );

  const handleSelectedContent = () => {
    if (selectedContent) return setSelectedContent(null);
    return undefined;
  };

  return (
    <aside className='no-scrollbar hidden h-full w-full items-start justify-start gap-2.5 overflow-y-auto rounded-2xl bg-white p-2.5 dark:bg-gray-800 lg:flex lg:h-screen'>
      <div className='flex w-full flex-col items-start justify-start gap-5'>
        {selectedContent && (
          <button
            className='flex h-9 w-9 items-center justify-center rounded-full bg-white-800 dark:bg-darkPrimary-4'
            onClick={handleSelectedContent}
          >
            <Image
              className='dark:invert'
              src={'/assets/icons/back.svg'}
              width={20}
              alt='back icon'
              height={20}
            />
          </button>
        )}
        {selectedContent ? (
          <SidebarItem
            content={selectedContent}
            selectedContent={selectedContent}
          />
        ) : (
          sidebarContents.map((content) => (
            <SidebarItem
              selectedContent={selectedContent}
              key={content.label}
              content={content}
              handleCLick={() => setSelectedContent(content)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
