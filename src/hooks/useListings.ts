import { useQuery } from '@tanstack/react-query';
import { fetchAllListings } from '../services/listingService';
import type { Listing } from '../components/MainFeedListingCard';

export const useListings = () => {
  return useQuery<Listing[]>({
    queryKey: ['listings'],
    queryFn: fetchAllListings,
  });
};
