import type { Comment } from './Comment';
import type { User } from './User';

export const ANIMAL_TYPES = ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'horse', 'other'] as const;
export const LISTING_TYPES = ['lost', 'found'] as const;

export type AnimalType = (typeof ANIMAL_TYPES)[number];
export type ListingType = (typeof LISTING_TYPES)[number];

export const ListingTypeEnum = {
  LOST: 'lost',
  FOUND: 'found',
} as const;

export const AnimalTypeEnum = {
  DOG: 'dog',
  CAT: 'cat',
  BIRD: 'bird',
  RABBIT: 'rabbit',
  OTHER: 'other',
} as const;

export interface Listing {
  _id: string;
  listingType: ListingType;
  animalType: AnimalType;
  imageUrl?: string;
  location: string;
  lastSeen: number;
  description: string;
  comments: Comment[];
  boosts: string[];
  author: User;
  aiVisualTags?: string;
  isResolved: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
