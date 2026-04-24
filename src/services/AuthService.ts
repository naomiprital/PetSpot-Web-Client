import type { CredentialResponse } from '@react-oauth/google';
import api from '../api/axiosInstance';
import type { User } from '../types/User';

const AUTH_ROUTE = '/auth';

export const login = async (userData: Pick<User, 'email' | 'password'>) => {
  const { data } = await api.post<User>(`${AUTH_ROUTE}/login`, userData);
  return data;
};

export const register = async (userData: FormData) => {
  const { data } = await api.post(`${AUTH_ROUTE}/register`, userData);
  return data;
};
export const logout = async () => {
  await api.post(`${AUTH_ROUTE}/logout`);
};

export const refreshToken = async (refreshToken: string) => {
  const { data } = await api.post(`${AUTH_ROUTE}/refresh`, { refreshToken });
  return data;
};

export const googleLogin = async (credentials: CredentialResponse, phoneNumber: string) => {
  const { data } = await api.post<User>(`${AUTH_ROUTE}/google`, { credentials, phoneNumber });
  return data;
};
