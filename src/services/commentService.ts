import api from '../api/axiosInstance';

export const addComment = async (listingId: string, commentText: string) => {
  const { data } = await api.post(`/comment/${listingId}`, { commentText });
  return data;
};
