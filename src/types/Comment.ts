import type { User } from './User';

export interface Comment {
  _id?: string;
  listingId: string;
  commentText: string;
  author: User;
  createdAt?: Date;
  updatedAt?: Date;
}
