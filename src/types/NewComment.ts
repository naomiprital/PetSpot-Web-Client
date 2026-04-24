import type { User } from "./User";

export interface NewComment {
  _id?: string;
  listingId: string;
  commentText: string;
  author: User;
  createdAt?: Date;
  updatedAt?: Date;
}