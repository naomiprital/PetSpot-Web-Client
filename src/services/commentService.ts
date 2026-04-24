import api from '../api/axiosInstance';

const COMMENT_ROUTE = '/comment';

export const addComment = async (listingId: string, commentText: string) => {
  const { data } = await api.post(`${COMMENT_ROUTE}/${listingId}`, { commentText });
  return data;
};
