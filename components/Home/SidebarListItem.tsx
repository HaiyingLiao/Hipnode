'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { formUrlQuery } from '@/lib/utils';
interface SidebarListItemProps {
  id: number;
  icon: string;
  title: string;
  text: string;
  isFollowingNumberHidden?: boolean;
  bgColor?: string;
  hashtag?: boolean;
  totalPosts?: number;
  dimensionsOuterSquare?: number;
  dimensionsInnerSquare?: number;
  label: string;
}

const colors: {
  [key: string]: string;
} = {
  yellow: 'bg-secondary-yellow-10 dark:bg-[#594F43]',
  red: 'bg-secondary-red-10 dark:bg-[#473E3B]',
  blue: 'bg-secondary-blue-10 dark:bg-[#444F5F]',
  green: 'bg-secondary-green-10 dark:bg-[#335248]',
  purple: 'bg-secondary-purple-10 dark:bg-[#46475B]',
  transparent: 'bg-transparent',
};

const dimensions: { [key: string]: string } = {
  32: 'h-[32px] w-[32px]',
  28: 'h-[28px] w-[28px]',
  20: 'h-[20px] w-[20px]',
};

const SidebarListItem = ({
  id,
  icon,
  title,
  text,
  isFollowingNumberHidden = true,
  bgColor,
  totalPosts,
  hashtag = false,
  dimensionsOuterSquare,
  dimensionsInnerSquare,
  label,
}: SidebarListItemProps) => {
  const params = useSearchParams();
  const path = formUrlQuery(params.toString(), 'sort', label ?? '');
  const sort = params.get('sort');

  return (
    <li key={id} className='mb-2.5 w-full'>
      {!label || label === 'following' ? (
        <button
          className={`asideListItemLink ${
            sort === label ? 'bg-white-800 dark:bg-darkPrimary-4' : ''
          }`}
        >
          <div
            className={`asideImageDiv ${bgColor && colors[bgColor]} ${
              dimensionsOuterSquare && dimensions[dimensionsOuterSquare]
            }`}
          >
            <Image
              src={icon}
              alt='Icon'
              width={32}
              height={32}
              className={`${
                dimensionsInnerSquare && dimensions[dimensionsInnerSquare]
              }`}
            />
          </div>

          <div>
            <div className='flex items-center gap-[6px]'>
              <h6
                className={`bodyMd-semibold dark:text-white ${
                  hashtag ? 'text-darkSecondary-800' : 'text-darkSecondary-900'
                }`}
              >
                {hashtag ? `#${title}` : title}
              </h6>
              <p
                className={`${
                  isFollowingNumberHidden ? 'hidden' : ''
                } asideFollowingNumber`}
              >
                24
              </p>
            </div>
            <p className='bodyXs-regular text-darkSecondary-800'>
              {totalPosts} {text}
            </p>
          </div>
        </button>
      ) : (
        <Link
          href={label !== 'following' ? `/${path}` : '#'}
          className={`asideListItemLink ${
            sort === label ? 'bg-white-800 dark:bg-darkPrimary-4' : ''
          }`}
        >
          <div
            className={`asideImageDiv ${bgColor && colors[bgColor]} ${
              dimensionsOuterSquare && dimensions[dimensionsOuterSquare]
            }`}
          >
            <Image
              src={icon}
              alt='Icon'
              width={32}
              height={32}
              className={`${
                dimensionsInnerSquare && dimensions[dimensionsInnerSquare]
              }`}
            />
          </div>

          <div>
            <div className='flex items-center gap-[6px]'>
              <h6
                className={`bodyMd-semibold dark:text-white ${
                  hashtag ? 'text-darkSecondary-800' : 'text-darkSecondary-900'
                }`}
              >
                {hashtag ? `#${title}` : title}
              </h6>
              <p
                className={`${
                  isFollowingNumberHidden ? 'hidden' : ''
                } asideFollowingNumber`}
              >
                24
              </p>
            </div>
            <p className='bodyXs-regular text-darkSecondary-800'>
              {totalPosts} {text}
            </p>
          </div>
        </Link>
      )}
    </li>
  );
};

export default SidebarListItem;
