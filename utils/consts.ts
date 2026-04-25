export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:8080';

export const ListingTypeEnum = {
  LOST: 'lost',
  FOUND: 'found',
} as const;

export const AnimalsEnum = {
  DOG: 'dog',
  CAT: 'cat',
  BIRD: 'bird',
  RABBIT: 'rabbit',
  OTHER: 'other',
} as const;

export const StatusEnum = {
  OPEN: 'open',
  RESOLVED: 'resolved',
} as const;