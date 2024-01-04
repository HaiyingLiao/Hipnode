'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { Input } from '../../ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import GlobalSearchResult from './GlobalSearchResult';

interface SearchBarProps {
  showSearchBar: boolean;
  setShowSearchBar: (cb: (value: boolean) => boolean) => void;
}

const Searchbar = ({ showSearchBar, setShowSearchBar }: SearchBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('global');

  const [search, setSearch] = useState(query || '');
  const [isOpen, setIsOpen] = useState(query || false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery(searchParams.toString(), 'global', search);

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery(searchParams.toString(), [
            'global',
            'type',
          ]);

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, query]);

  return (
    <div ref={searchContainerRef} className='w-full'>
      <div
        className={`${showSearchBar ? 'block' : 'hidden sm:block'} searchbar`}
      >
        <Input
          type='text'
          id='text'
          placeholder='Type here to search...'
          className='no-focus searchbar_input'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === '' && isOpen) setIsOpen(false);
          }}
        />

        <div className='sm:hidden'>
          <AiOutlineClose
            className='closeIcon !dark:text-secondary-purple-20 !text-darkSecondary-800'
            onClick={() => setShowSearchBar((showSearchBar) => !showSearchBar)}
          />
        </div>

        <Image
          src='/assets/navigation/search.svg'
          alt='Search Icon'
          width={20}
          height={20}
          className='searchBarIcon'
        />
      </div>
      {isOpen && <GlobalSearchResult />}
    </div>
  );
};

export default Searchbar;
