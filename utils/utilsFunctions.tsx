import type { Listing } from '../src/components/MainFeedListingCard';
import type { NewListing } from '../src/types/Listing';

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

export const onBoost = async (event: React.MouseEvent<HTMLButtonElement>) => {
  event.stopPropagation();
  // TODO: Implement boost functionality, remove user from boosts array if exists, add user to boosts array if not exists
};

export const isUserBoostedListing = (listing: NewListing) => {
  const mockCurrentUser = {
    email: 'test@petspot.com',
    firstName: 'EditTest',
    lastName: 'User',
    imageUrl: '/uploads/image-1776958285085-255795376.jpg',
    phoneNumber: '0505555555',
    createdAt: '2026-04-24T15:09:10.000Z',
    updatedAt: '2026-04-24T15:09:10.000Z',
    __v: 0,
    _id: '69ea15caf50dc5ada02bc866',
  }; // todo: change to real user
  return listing.boosts.includes(mockCurrentUser._id);
};

export const isUserBoostedListingOld = (listing: Listing) => {
  const currentUserId = 'id7'; // TODO: Change to user from context
  return listing.boosts.includes(currentUserId);
};
