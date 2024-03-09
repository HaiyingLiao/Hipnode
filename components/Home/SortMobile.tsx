'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

import { newAndPopularMobile } from '@/constants';
import { formUrlQuery } from '@/lib/utils';

export default function SortMobile() {
  const params = useSearchParams();
  const pathName = usePathname();
  const sort = params.get('sort');

  const path = (label: string) => {
    return formUrlQuery(
      params.toString(),
      'sort',
      label ?? '#',
      pathName,
    ) as string;
  };

  return (
    <ul className='asideContainerSmall mb-5 flex pr-4 md:hidden'>
      {newAndPopularMobile.map((item) => (
        <li key={item.id} className='w-full'>
          {item.label === 'following' ? (
            <button
              className={`asideListItemLink justify-center ${
                sort === item.label ? 'bg-white-800 dark:bg-darkPrimary-4' : ''
              }`}
            >
              <div className='asideImageDiv h-[28px] w-[28px] p-1'>
                <Image src={item.icon} alt='Icon' width={15} height={15} />
              </div>

              <div>
                <div className='flex items-center gap-[6px]'>
                  <h6 className='bodyXs-semibold sm:bodyMd-semibold text-darkSecondary-900 dark:text-white'>
                    {item.title}
                  </h6>
                  <p
                    className={`${
                      item.isFollowingNumberHidden ? 'hidden' : ''
                    } asideFollowingNumber px-[3px]`}
                  >
                    24
                  </p>
                </div>
              </div>
            </button>
          ) : (
            <Link
              href={path(item.label)}
              className={`asideListItemLink justify-center ${
                sort === item.label ? 'bg-white-800 dark:bg-darkPrimary-4' : ''
              }`}
            >
              <div className='asideImageDiv h-[28px] w-[28px] p-1'>
                <Image src={item.icon} alt='Icon' width={15} height={15} />
              </div>

              <div>
                <div className='flex items-center gap-[6px]'>
                  <h6 className='bodyXs-semibold sm:bodyMd-semibold text-darkSecondary-900 dark:text-white'>
                    {item.title}
                  </h6>
                  <p
                    className={`${
                      item.isFollowingNumberHidden ? 'hidden' : ''
                    } asideFollowingNumber px-[3px]`}
                  >
                    24
                  </p>
                </div>
              </div>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
