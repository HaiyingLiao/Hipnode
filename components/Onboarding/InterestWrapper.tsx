'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { interests } from '@/constants';
import { formUrlQuery } from '@/lib/utils';
import { Button } from '../ui/button';
import { updateBusinessTypes } from '@/lib/actions/onboarding.action';

export default function InterestWrapper({
  userClerkId,
}: {
  userClerkId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const answerParams = searchParams.get('answer')?.split('_');

  const [answers, setAnswers] = useState<string[]>(answerParams || []);

  const handleClick = (item: string) => {
    if (!answers.includes(item)) {
      setAnswers((prev) => [...(prev || []), item]);
    } else {
      setAnswers((prev) => (prev ? prev.filter((val) => val !== item) : []));
    }
  };

  const handleDataUpdate = async () => {
    await updateBusinessTypes(userClerkId, answers);
  };

  useEffect(() => {
    if (answers.length > 0) {
      const newUrl = formUrlQuery(searchParams.toString(), 'answer', answers);
      router.push(newUrl);
    } else if (answers.length === 0) {
      const newUrl = formUrlQuery(searchParams.toString(), 'answer', null);
      router.push(newUrl);
    }
  }, [answers, router, searchParams]);

  return (
    <>
      <div className='mt-5 flex w-full flex-wrap gap-5'>
        {interests.map((interest) => (
          <Button
            onClick={() => handleClick(interest)}
            key={interest}
            className={`bg-white-700 text-lg font-semibold text-darkSecondary-900 hover:!bg-secondary-red-60 hover:text-white dark:bg-darkPrimary-4 dark:text-white-800 ${
              answers.includes(interest) && 'bg-secondary-red-60 !text-white'
            }`}
          >
            {interest}
          </Button>
        ))}
      </div>

      {answerParams && (
        <Link
          onClick={handleDataUpdate}
          href='/'
          className='mt-5 block w-min rounded bg-secondary-red-60 px-10 py-3 text-white-700'
        >
          Next
        </Link>
      )}
    </>
  );
}
