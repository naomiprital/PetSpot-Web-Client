import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createListing, fetchAllListings } from '../services/listingService';

export const useListings = () => {
  return useQuery({
    queryKey: ['listings'],
    queryFn: fetchAllListings,
  });
};

export const useCreateListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};
