'use client';

import { optionBar } from '@/constants';
import { formUrlQuery } from '@/lib/utils';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const OptionBar = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const router = useRouter();

  const handleClick = (option: string) => {
    const newUrl = formUrlQuery(
      searchParams.toString(),
      'type',
      option.toLowerCase(),
      pathName,
    );
    router.push(newUrl);
  };

  return (
    <div className='no-scrollbar mb-3 inline-flex w-full items-start justify-between overflow-x-scroll rounded-[20px] bg-white px-[15px] py-2.5 dark:bg-darkPrimary-3 md:px-[30px] md:py-[19px]'>
      {optionBar.map((option) => (
        <button
          key={option}
          onClick={() => handleClick(option)}
          className={
            'heading3 rounded-3xl px-5 py-2 text-darkSecondary-800 focus:bg-secondary-red-80 focus:text-white focus:outline-none dark:text-white-700'
          }
          autoFocus={type ? type === option.toLowerCase() : true}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionBar;
