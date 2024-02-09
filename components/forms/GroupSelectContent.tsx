import Image from 'next/image';

import { sidebarContents } from '@/constants';
import { SelectItem } from '@/components/ui/select';

const GroupSelectContent = () => {
  return (
    <div className='flex w-full flex-col gap-3 p-3 dark:bg-darkPrimary-3 md:flex-row'>
      {sidebarContents.map((content, i) => (
        <div
          className='mb-2 flex flex-col items-start space-y-5'
          key={content.label}
        >
          <div
            className={`h-full !w-full flex-1 rounded-lg ${content.bgColour} p-3`}
          >
            <div className=' flex items-center gap-2'>
              <Image
                className='aspect-auto object-contain'
                src={content.icon}
                alt='growth icon'
                width={20}
                height={20}
              />
              <h2 className='text-lg font-semibold text-darkSecondary-900'>
                {content.label}
              </h2>
            </div>
            <p className='text-left text-xs text-darkSecondary-800'>
              {content.text}
            </p>
          </div>

          <div className='flex w-full max-w-[150px] flex-col items-start gap-3'>
            {content.items.map((item, i) => (
              <div
                className={`mb-3 inline-flex h-full  items-center justify-start gap-x-2 truncate rounded-lg`}
                key={item.title}
              >
                <Image
                  className='aspect-auto bg-transparent object-cover'
                  src={item.icon}
                  width={34}
                  height={34}
                  alt={item.title}
                />
                <div className=' text-left'>
                  <SelectItem value={item.title} className='cursor-pointer'>
                    {item.title}
                  </SelectItem>

                  <p className='truncate text-left text-10 text-darkSecondary-800'>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}

            <button className='w-max rounded-full bg-secondary-purple-20 px-2 py-[2px] text-9 font-semibold text-secondary-purple'>
              See all
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupSelectContent;
