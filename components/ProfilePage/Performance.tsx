import Image from 'next/image';

import { demoPerformance } from '@/constants';

const Performance = () => {
  return (
    <div className='flex flex-col items-start gap-2.5 rounded-2xl bg-white p-5 dark:bg-darkPrimary-3'>
      <h1 className='heading3 text-darkSecondary dark:text-white'>
        Performance
      </h1>
      <p className='display-regular text-darkSecondary-800 dark:text-white-700'>
        Showing data from the last 30 days
      </p>

      {demoPerformance.map((performance, i) => (
        <div key={i} className='flex w-full items-start justify-between'>
          <Image src={performance.img} alt='user-img' width={50} height={50} />

          {performance.data.map((data) => (
            <div key={data.title}>
              <h2 className='display-regular text-darkSecondary-800 dark:text-white-700'>
                {data.title}
              </h2>
              <p className='body-semibold text-darkSecondary-900 dark:text-darkSecondary-800'>
                {data.content}
              </p>
            </div>
          ))}
        </div>
      ))}

      <button className='body-semibold text-secondary-blue dark:text-secondary-blueBlack-80'>
        See More
      </button>
    </div>
  );
};

export default Performance;
