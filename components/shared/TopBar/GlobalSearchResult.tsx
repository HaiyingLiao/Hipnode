'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';

import { globalSearch } from '@/lib/actions/search.action';
import GlobalSearchFilters from './GlobalSearchFilters';

const GlobalSearchResult = () => {
  const searchParams = useSearchParams();

  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const global = searchParams.get('global');
  const type = searchParams.get('type');

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setLoading(true);

      try {
        const res = await globalSearch({
          query: global,
          type,
        });
        setResult(JSON.parse(res));
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    // some of these should be 'slug' instead of 'id'?
    switch (type) {
      case 'post':
        return `/post/${id}`;
      case 'meetup':
        return `/meetup/${id}`;
      case 'interview':
        return `/interview/${id}`;
      case 'podcast':
        return `/podcast/${id}`;
      case 'group':
        return `/group/${id}`;
      default:
        return '/';
    }
  };

  return (
    <div className='absolute top-full z-10 -mt-3 max-w-[965px] rounded bg-white px-3 py-5 shadow-md dark:bg-darkPrimary-2 md:px-6'>
      <GlobalSearchFilters />
      <div className='my-5 h-[1px] bg-white-700 dark:bg-darkSecondary-700' />

      <div className='space-y-5'>
        {result.length > 0 && isLoading && (
          <p className='body-semibold text-darkPrimary-3 dark:text-white-700'>
            Top Match:
          </p>
        )}

        {isLoading ? (
          <div className='mb-5 flex flex-col items-center justify-center'>
            <ReloadIcon className='my-2 h-10 w-10 animate-spin text-primary' />
            <p className='body-regular'>Searching Hipnode...</p>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  href={renderLink(item.type, item.id)}
                  key={item.type + item.id + index}
                  className='text-darkSecondary-7 flex w-full cursor-pointer items-start gap-5 py-1 hover:opacity-80'
                >
                  <Image
                    src={`/assets/search/${item.type}.svg`}
                    alt='Type icon'
                    width={18}
                    height={18}
                    className='mt-1 object-contain text-darkSecondary-700'
                  />

                  <div className='flex flex-col'>
                    <p className='bodyMd line-clamp-1 text-darkSecondary-900 dark:text-white'>
                      {item.title}
                    </p>
                    <p className='bodySm-semibold font-bold capitalize text-[#7B8EC8]'>
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className='flex w-full items-center justify-center px-5'>
                <p className='text-base'>😫</p>
                <p className='body-regular px-3 py-2.5 text-darkSecondary-900 dark:text-darkSecondary-600'>
                  Sorry, no results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearchResult;
