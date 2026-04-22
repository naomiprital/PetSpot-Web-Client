import type { Listing } from '../components/HomePageComponents/HomePageListingCard';

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

export const onBoost = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.stopPropagation();
  // TODO: Implement boost functionality, remove user from boosts array if exists, add user to boosts array if not exists
};

export const isUserBoostedListing = (listing: Listing) => {
  const currentUserId = 'id7'; // TODO: Change to user from context
  return listing.boosts.includes(currentUserId);
};
