import type { NewComment } from "./NewComment";
import type { User } from "./User";

export const ANIMAL_TYPES = ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'horse', 'other'] as const;
export const LISTING_TYPES = ['lost', 'found'] as const;

type AnimalType = (typeof ANIMAL_TYPES)[number];
type ListingType = (typeof LISTING_TYPES)[number];

export interface NewListing {
  _id?: string;
  listingType: ListingType;
  animalType: AnimalType;
  imageUrl?: string;
  location: string;
  lastSeen: number;
  description: string;
  comments: NewComment[];
  boosts: string[];
  author: User;
  aiVisualTags?: string;
  isResolved: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}