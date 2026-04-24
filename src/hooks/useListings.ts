import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  toggleBoostListing,
  createListing,
  fetchAllListings,
  resolveListing,
  updateListing,
  deleteListing,
} from '../services/listingService';
import type { NewListing } from '../types/Listing';

export const useListings = () => {
  return useQuery<NewListing[]>({
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

export const useToggleBoostListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (listingId: string) => toggleBoostListing(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};

export const useResolveListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (listingId: string) => resolveListing(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] }); // todo: invalidate user query
    },
  });
};

export const useDeleteListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (listingId: string) => deleteListing(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};

export const useUpdateListing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listingId, formData }: { listingId: string; formData: FormData }) =>
      updateListing(listingId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};
