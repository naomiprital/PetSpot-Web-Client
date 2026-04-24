import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../services/commentService';
import { toast } from 'react-toastify';
import type { NewListing } from '../types/Listing';

const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listingId, commentText }: { listingId: string; commentText: string }) =>
      addComment(listingId, commentText),
    onSuccess: (newComment, variables) => {
      queryClient.setQueryData(['listings'], (oldListings: NewListing[] | undefined) => {
        if (!oldListings) return [];

        return oldListings.map((listing) => {
          if (listing._id === variables.listingId) {
            return {
              ...listing,
              comments: [...listing.comments, newComment],
            };
          }
          return listing;
        });
      });
      toast.success('Comment added successfully!');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Failed to add comment');
    },
  });
};

export default useCreateComment;
