/* eslint-disable no-useless-catch */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import queryString from 'query-string';
import Filter from 'bad-words';
import { redirect } from 'next/navigation';

import { getUserByClerkId } from './actions/user.action';

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

const roundDown = (value: number) => Math.floor(value);

export const getCreatedDate = (createdAt: Date) => {
  try {
    const now = Date.now();
    const diff = now - new Date(createdAt).getTime();

    const diffInSeconds = diff / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInWeeks = diffInDays / 7;
    const diffInMonths = diffInDays / 30;
    const diffInYears = diffInDays / 365;

    switch (true) {
      case diffInSeconds < 60:
        return 'just now';
      case diffInMinutes < 60:
        return `${roundDown(diffInMinutes)} ${
          roundDown(diffInMinutes) > 1 ? 'minutes' : 'minute'
        } ago`;
      case diffInHours < 24:
        return `${roundDown(diffInHours)} ${
          roundDown(diffInHours) > 1 ? 'hours' : 'hour'
        } ago`;
      case diffInDays < 7:
        return `${roundDown(diffInDays)} ${
          roundDown(diffInDays) > 1 ? 'days' : 'day'
        } ago`;
      case diffInWeeks < 4:
        return `${roundDown(diffInWeeks)} ${
          roundDown(diffInWeeks) > 1 ? 'weeks' : 'week'
        } ago`;
      case diffInMonths < 12:
        return `${roundDown(diffInMonths)} ${
          roundDown(diffInMonths + 1) > 1 ? 'months' : 'month'
        } ago`;
      default:
        return `${roundDown(diffInYears)} ${
          roundDown(diffInYears) > 1 ? 'years' : 'year'
        } ago`;
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const filterImage = async (file: File) => {
  try {
    // eslint-disable-next-line camelcase
    const X_RapidAPI_KEY = process.env.NEXT_PUBLIC_X_RapidAPI_KEY;
    // eslint-disable-next-line camelcase
    const X_RapidAPI_HOST = process.env.NEXT_PUBLIC_X_RapidAPI_HOST;

    // eslint-disable-next-line camelcase
    if (!X_RapidAPI_KEY || !X_RapidAPI_HOST || !file) return;

    const data = new FormData();
    data.append('image', file, file.name);

    const options = {
      method: 'POST',
      headers: {
        // eslint-disable-next-line camelcase
        'X-RapidAPI-Key': X_RapidAPI_KEY,
        // eslint-disable-next-line camelcase
        'X-RapidAPI-Host': X_RapidAPI_HOST,
      },
      body: data,
    };
    const getResult = await fetch(
      'https://nsfw-images-detection-and-classification.p.rapidapi.com/adult-content-file',
      options,
    );
    const result = await getResult.json();

    return result;
  } catch (error) {
    throw error;
  }
};

export const filterWords = (word: string) => {
  const filter = new Filter();
  // @ts-ignore
  const isContainBadWords = filter.list.includes(word);
  return isContainBadWords;
};

export const getPostStats = (
  likes: number,
  totalComments: number,
  totalShare: number,
) => {
  return [
    {
      icon: '/assets/posts/orange-heart-square.svg',
      alt: 'hearth icon',
      value: likes,
      label: 'Hearts',
    },
    {
      icon: '/assets/posts/comment.svg',
      alt: 'chat icon',
      value: totalComments,
      label: 'Comments',
    },
    {
      icon: '/assets/posts/share.svg',
      alt: 'share icon',
      value: totalShare,
      label: 'Share',
    },
  ];
};

export const getUserCountry = async () => {
  try {
    const response1 = await fetch('https://api.ipify.org/?format=json');
    const { ip } = await response1.json();

    const response2 = await fetch(`https://ipapi.co/${ip}/json/`);
    const locationData = await response2.json();
    return locationData;
  } catch (error) {
    throw error;
  }
};

export const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const shareOptionData = (email: string, postUrl: string) => {
  return [
    {
      label: 'instagram',
      icon: '/assets/posts/instagram.svg',
      path: 'https://instagram.com',
    },
    {
      label: 'twitter',
      icon: '/assets/posts/twitter.svg',
      path: `https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20post%20${postUrl}`,
    },
    {
      label: 'linkedln',
      icon: '/assets/posts/linkedln.svg',
      path: 'https://www.linkedin.com/feed',
    },
    {
      label: 'e-mail',
      icon: '/assets/posts/email.svg',
      path: `mailto:${email}?body=Checkout%20this%20amazing%20post:${postUrl}`,
    },
  ];
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

export const checkUserStage = async (currentPage: String) => {
  const user = await getUserByClerkId();
  console.log(user?.onboardingProgress);
  if (user?.onboardingProgress === '') {
    currentPage !== 'current-stage' && redirect('/current-stage');
  } else if (user?.onboardingProgress === 'Business Stage') {
    currentPage !== 'programming-level' && redirect('/programming-level');
  } else if (user?.onboardingProgress === 'Coding Level') {
    currentPage !== 'interest' && redirect('/interest');
  }
};

export const getMonth = (originalDate: Date) => {
  // Create a Date object from the given timestamp
  const date = new Date(originalDate);

  // Get the month and convert it to the shortened month name
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];

  return month;
};

export const getDay = (originalDate: Date) => {
  // Create a Date object from the given timestamp
  const date = new Date(originalDate);

  // Get the day of the month
  const day = date.getDate();

  return day;
};
