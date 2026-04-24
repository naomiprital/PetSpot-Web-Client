import type { Listing } from '../src/types/Listing';

export const getLocalDateTimeString = (timestamp?: number): string => {
  let date: Date;

  if (!timestamp) {
    date = new Date();
  } else {
    date = new Date(timestamp);
  }

  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

export const isUserBoostedListing = (listing: Listing, userId: string) => {
  return listing.boosts.includes(userId);
};

export const capitalizeFirstLetter = (word: string): string => {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
};
