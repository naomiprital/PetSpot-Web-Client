import type { Listing } from '../src/components/MainFeedListingCard';

export const onBoost = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.stopPropagation();
  // TODO: Implement boost functionality, remove user from boosts array if exists, add user to boosts array if not exists
};

export const isUserBoostedListing = (listing: Listing) => {
  const currentUserId = 'id7'; // TODO: Change to user from context
  return listing.boosts.includes(currentUserId);
};
