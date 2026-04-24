export const StatusEnum = {
  LOST: 'Lost',
  FOUND: 'Found',
} as const;

export const AnimalsEnum = {
  DOG: 'Dog',
  CAT: 'Cat',
  BIRD: 'Bird',
  RABBIT: 'Rabbit',
  OTHER: 'Other',
} as const;

export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:8080';
