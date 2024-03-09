'use client';

import { useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { formUrlQuery } from '@/lib/utils';
import { GlobalSearchFilters } from '@/constants/filters';

const GlobalFilters = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get('type');

  const [active, setActive] = useState(typeParams || '');

  const handleTypeClick = (item: string) => {
    let newUrl = '';

    if (active === item) {
      setActive('');
      newUrl = formUrlQuery(searchParams.toString(), 'type', null, pathName);

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      newUrl = formUrlQuery(
        searchParams.toString(),
        'type',
        item.toLowerCase(),
        pathName,
      );
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className='flex items-center gap-5'>
      <p className='body-semibold hidden text-darkPrimary-3 dark:text-white-700 md:block'>
        Type:
      </p>
      <div className='flex gap-2'>
        {GlobalSearchFilters.map((item) => (
          <button
            type='button'
            key={item.value}
            className={`md:bodySm-semibold rounded-2xl p-2 text-[8px] capitalize md:px-5 ${
              active === item.value
                ? 'bg-primary text-white dark:text-white-700'
                : 'bg-white-700 text-darkSecondary-900 hover:text-primary dark:bg-darkPrimary-4 dark:text-white dark:hover:text-primary'
            }`}
            onClick={() => handleTypeClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
