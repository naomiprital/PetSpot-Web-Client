import { useMutation, useQuery } from '@tanstack/react-query';
import { createListing, fetchAllListings } from '../services/listingService';

export const useListings = () => {
  return useQuery({
    queryKey: ['listings'],
    queryFn: fetchAllListings,
  });
};

export const useCreateListing = () => {
  return useMutation({
    mutationFn: createListing,
  });
};
