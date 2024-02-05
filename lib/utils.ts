import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import queryString from 'query-string';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formUrlQuery = (
  params: string,
  key: string,
  value: string | null,
) => {
  const currentUrl = queryString.parse(params as string);

  currentUrl[key] = value;

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

export const timeAgo = (timestamp: Date): string => {
  const now = new Date();
  const diff = now.getTime() - new Date(timestamp).getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (days >= 1) {
    return `${days} days ago`;
  } else if (hours >= 1) {
    return `${hours} hours ago`;
  } else {
    return 'just now';
  }
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
