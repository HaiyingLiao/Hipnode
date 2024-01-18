'use client';

import { ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { categoryData } from '@/constants/categories';
import { formUrlQuery } from '@/lib/utils';

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;

    const newUrl = formUrlQuery(
      searchParams.toString(),
      'category',
      value.toString(),
    );

    router.push(newUrl);
  };

  return (
    <section className='rounded-2xl bg-white p-5 dark:bg-darkPrimary-3'>
      <h3 className='heading3 text-darkSecondary-900 dark:text-white'>
        Categories
      </h3>

      {categoryData?.map((category) => (
        <aside key={category.id} className='my-3 flex justify-between'>
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
          />
        </aside>
      ))}
    </section>
  );
};

export default Filter;
