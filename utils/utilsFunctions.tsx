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
    email: 'picturesbynaomi@gmail.com',
    password: '$2b$10$qXSa.P0jtlVI3mhmz9tWy.PeR8NV1CNetmSugHSrKDdk2zsfsYb1O',
    firstName: 'Naomi2',
    lastName: 'Prital2',
    phoneNumber: '0533373387',
    imageUrl: '/uploads/image-1776948682259-188875750.jpg',
    refreshToken: [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWViOWRhOGUwNmVjZDhlYzY0YjNmNzIiLCJpYXQiOjE3NzcwNDkwMDAsImV4cCI6MTc3NzEzNTQwMH0.n-9ohZDCzAdresy2BauX1vh6_U6LRQ0uD-Ydewhl5-U',
    ],
    createdAt: {
      $date: '2026-04-24T16:43:20.433Z',
    },
    updatedAt: {
      $date: '2026-04-24T16:43:20.494Z',
    },
    __v: 0,
    _id: '69eb9da8e06ecd8ec64b3f72',
  }; // todo: change to real user
  return listing.boosts.includes(mockCurrentUser._id);
};

export const isUserBoostedListingOld = (listing: Listing) => {
  const currentUserId = 'id7'; // TODO: Change to user from context
  return listing.boosts.includes(currentUserId);
};

export const capitalizeFirstLetter = (word: string): string => {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
};
