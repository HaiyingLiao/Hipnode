import Link from 'next/link';

import { interests } from '@/constants';
import InterestItem from './InterestItem';

export default function Wrapper() {
  return (
    <>
      <div className='mt-5 flex w-full flex-wrap gap-5'>
        {interests.map((interest) => (
          <InterestItem key={interest} interest={interest} />
        ))}
      </div>
      <Link
        href='/'
        className='mt-5 block w-min rounded bg-secondary-red-60 px-10 py-3 text-white-700'
      >
        Next
      </Link>
    </>
  );
}
