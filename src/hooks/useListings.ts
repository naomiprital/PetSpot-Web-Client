import { useQuery } from '@tanstack/react-query';
import { fetchAllListings } from '../services/listingService';

export const useListings = () => {
  return useQuery({
    queryKey: ['listings'],
    queryFn: fetchAllListings,
  });
};
