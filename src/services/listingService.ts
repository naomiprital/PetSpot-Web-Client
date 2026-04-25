import api from '../api/axiosInstance';

const LISTING_ROUTE = '/listing';

export const fetchAllListings = async () => {
  const { data } = await api.get(LISTING_ROUTE);
  return data;
};

export const createListing = async (formData: FormData) => {
  const { data } = await api.post(LISTING_ROUTE, formData);
  return data;
};

export const toggleBoostListing = async (listingId: string) => {
  const { data } = await api.put(`${LISTING_ROUTE}/${listingId}/toggle-boost`);
  return data;
};

export const resolveListing = async (listingId: string) => {
  const { data } = await api.put(`${LISTING_ROUTE}/${listingId}`, { isResolved: true });
  return data;
};

export const deleteListing = async (listingId: string) => {
  const { data } = await api.delete(`${LISTING_ROUTE}/${listingId}`);
  return data;
};

export const updateListing = async (listingId: string, formData: FormData) => {
  const { data } = await api.put(`${LISTING_ROUTE}/${listingId}`, formData);
  return data;
};
