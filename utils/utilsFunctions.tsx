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

export const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return '';
  const cleaned = phoneNumber.replace(/\D/g, '');

  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
};


export const cleanPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/\D/g, '');
};

