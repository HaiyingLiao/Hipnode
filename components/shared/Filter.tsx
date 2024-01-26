'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { categoryData } from '@/constants/categories';
import { formUrlQuery } from '@/lib/utils';

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [values, setValues] = useState<string[]>([]);
  const [checkvalues, setCheckValues] = useState<string[]>([]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;

    localStorage.setItem(`checkbox-${value}`, String(e.target.checked));

    setValues((prevValues) => {
      if (e.target.checked) {
        return [...prevValues, value];
      } else {
        return prevValues.filter((val) => val !== value);
      }
    });
  };

  useEffect(() => {
    categoryData?.forEach((category) => {
      const isChecked = localStorage.getItem(`checkbox-${category.key}`);

      if (isChecked === 'true') {
        setCheckValues((prevValues) => [...prevValues, category.key]);
      }
    });

    if (values.length > 0) {
      const newUrl = formUrlQuery(searchParams.toString(), 'category', values);
      router.push(newUrl);
    }
  }, [values, router, searchParams]);

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
