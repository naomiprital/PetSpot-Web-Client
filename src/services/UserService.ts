import api from "../api/axiosInstance";

export const getUser = async (userId: string) => {
  const response = await api.get(`/user/${userId}`);
  return response.data;
}

export const editProfile = async (userId: string, formData: FormData) => {
  const response = await api.put(`/user/${userId}`, formData);
  return response.data;
}