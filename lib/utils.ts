import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import queryString from 'query-string';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formUrlQuery = (
  params: string,
  key: string,
  value: string | string[],
) => {
  const currentUrl = queryString.parse(params as string);

  if (Array.isArray(value)) {
    const newVal = value.join('_');
    currentUrl[key] = newVal;
  } else {
    currentUrl[key] = value;
  }

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};

export const formatDate = (originalDate: Date) => {
  const formattedDate = new Date(originalDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return formattedDate;
};
