import api from '../api/axiosInstance';

export const fetchAllListings = async () => {
  const { data } = await api.get('/listing');
  return data;
};
