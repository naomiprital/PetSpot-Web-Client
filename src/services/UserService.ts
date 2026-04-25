import api from "../api/axiosInstance";

const USER_ROUTE = '/user';

export const getUser = async (userId: string) => {
  const response = await api.get(`${USER_ROUTE}/${userId}`);
  return response.data;
};

export const editProfile = async (userId: string, formData: FormData) => {
  const response = await api.put(`${USER_ROUTE}/${userId}`, formData);
  return response.data;
};