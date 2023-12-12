'use client';

import { useState } from 'react';
import Image from 'next/image';

import Card from './Card';
import SidebarItem from './Item';
import { sidebarContents } from '@/constants';

export default function Mobile() {
  const [selectedContent, setSelectedContent] = useState<
    (typeof sidebarContents)[0]
  >(sidebarContents[0]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClick = (content: (typeof sidebarContents)[0]) => {
    setSelectedContent(content);
    setIsExpanded(false);
  };

  return (
    <div className='relative flex w-full flex-col !rounded-2xl bg-white p-5 dark:bg-darkPrimary-3 lg:hidden'>
      {selectedContent ? (
        <div className='flex items-center justify-between rounded-2xl bg-secondary-yellow-10 px-3 py-4'>
          <Card
            icon={selectedContent.icon}
            text={selectedContent.text}
            title={selectedContent.label}
            style='text-darkPrimary-2'
          />
          <button onClick={() => setIsExpanded((prev) => !prev)}>
            <Image
              src='/assets/icons/arrow-down.svg'
              width={20}
              height={20}
              className={`ease transition-all duration-500 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              alt='arrow down icon'
            />
          </button>
        </div>
      ) : (
        <div className='flex items-center justify-between rounded-xl bg-secondary-yellow-10 px-3 py-2'>
          <Card
            icon={sidebarContents[0].icon}
            text={sidebarContents[0].text}
            title={sidebarContents[0].label}
          />
          <button onClick={() => setIsExpanded((prev) => !prev)}>
            <Image
              src='/assets/icons/arrow-down.svg'
              width={20}
              height={20}
              className={`ease transition-all duration-500 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              alt='arrow down icon'
            />
          </button>
        </div>
      )}
      <div
        className={`ease absolute left-0 z-10 w-full flex-col overflow-hidden bg-white-800 py-3 transition-all duration-500 dark:bg-darkPrimary-3 dark:px-3 [&>*:not(:first-child)]:mt-5  ${
          isExpanded ? 'top-28 flex' : '-top-full hidden'
        }`}
      >
        {sidebarContents.map((content) => (
          <div key={content.label} onClick={() => handleClick(content)}>
            <SidebarItem content={content} selectedContent={content} />
          </div>
        ))}
      </div>
    </div>
  );
}
