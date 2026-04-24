import api from "../api/axiosInstance";

export const getUser = async (userId: string) => {
  const response = await api.get(`/user/${userId}`);
  return response.data;
}