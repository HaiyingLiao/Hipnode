'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { categoryData } from '@/constants/categories';
import { formUrlQuery } from '@/lib/utils';

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categories = searchParams.get('category')?.split('_');

  const [checkvalues, setCheckValues] = useState<string[]>(categories || []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;

    if (e.target.checked) {
      setCheckValues((prevValues) => [...(prevValues || []), value]);
    } else if (checkvalues?.length === 1 && checkvalues[0] === value) {
      setCheckValues([]);
    } else {
      setCheckValues((prevValues) =>
        prevValues ? prevValues.filter((val) => val !== value) : [],
      );
    }
  };

  useEffect(() => {
    if (checkvalues.length > 0) {
      const newUrl = formUrlQuery(
        searchParams.toString(),
        'category',
        checkvalues,
      );
      router.push(newUrl);
    } else if (checkvalues.length === 0) {
      const newUrl = formUrlQuery(searchParams.toString(), 'category', null);
      router.push(newUrl);
    }
  }, [checkvalues, router, searchParams]);

  return (
    <aside className='rounded-2xl bg-white p-5 dark:bg-darkPrimary-3'>
      <h3 className='heading3 text-darkSecondary-900 dark:text-white'>
        Categories
      </h3>

      {categoryData?.map((category) => (
        <div key={category.id} className='my-3 flex justify-between'>
          <label
            className='bodyMd-semibold text-darkSecondary-800 '
            htmlFor={category.item}
          >
            {category.item}
          </label>
          <input
            className='customCheckbox'
            type='checkbox'
            id={category.item}
            onChange={(e) => handleChange(e)}
            value={category.key}
            checked={checkvalues.includes(category.key)}
          />
        </div>
      ))}
    </aside>
  );
};

export default Filter;
