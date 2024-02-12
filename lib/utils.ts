import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeStamp(createdAt: Date): string {
  const now = new Date();
  const elapsedMilliseconds = now.getTime() - createdAt.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedMonths = Math.floor(elapsedDays / 30); // Assuming 30 days in a month
  const elapsedYears = Math.floor(elapsedMonths / 12); // Assuming 12 months in a year

  if (elapsedYears >= 2) {
    return `${elapsedYears} years ago`;
  } else if (elapsedYears === 1) {
    return "1 year ago";
  } else if (elapsedMonths >= 2) {
    return `${elapsedMonths} months ago`;
  } else if (elapsedMonths === 1) {
    return "1 month ago";
  } else if (elapsedDays >= 2) {
    return `${elapsedDays} days ago`;
  } else if (elapsedDays === 1) {
    return "1 day ago";
  } else if (elapsedHours >= 2) {
    return `${elapsedHours} hours ago`;
  } else if (elapsedHours === 1) {
    return "1 hour ago";
  } else if (elapsedMinutes >= 2) {
    return `${elapsedMinutes} minutes ago`;
  } else if (elapsedMinutes === 1) {
    return "1 minute ago";
  } else {
    return `${elapsedSeconds} seconds ago`;
  }
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

interface FormUrlParams {
  params: string;
  key: string;
  value: string | null;
}

// Update the search parameter we only need to update the value
export const formUrlQuery = ({ params, key, value }: FormUrlParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
};

interface RemoveKeysFromQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveKeysFromQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
};
