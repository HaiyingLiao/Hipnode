import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import queryString from 'query-string';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formUrlQuery = (
  params: string,
  key: string,
  value: string | string[] | null,
) => {
  const currentQuery = queryString.parse(params as string);

  if (Array.isArray(value)) {
    const newVal = value.join('_');
    currentQuery[key] = newVal;
  } else {
    currentQuery[key] = value;
  }

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentQuery,
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

export function removeKeysFromQuery(params: string, keysToRemove: string[]) {
  const currentUrl = queryString.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
}
