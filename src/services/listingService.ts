import api from '../api/axiosInstance';

export const fetchAllListings = async () => {
  const { data } = await api.get('/listing');
  return data;
};

export const createListing = async (formData: FormData) => {
  const { data } = await api.post('/listing', formData);
  return data;
};
