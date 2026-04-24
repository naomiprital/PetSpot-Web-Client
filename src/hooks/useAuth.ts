import { useMutation, useQueryClient } from "@tanstack/react-query";
import { googleLogin, login, logout, refreshToken, register } from "../services/AuthService";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (response: any) => {
      const user = response.user || response;
      const token = response.token || response.accessToken;
      const refreshToken = response.refreshToken;
      const userId = user._id || user.id;

      if (token) localStorage.setItem('token', token);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      if (userId) localStorage.setItem('userId', userId);

      queryClient.setQueryData(['auth'], user);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (response: any) => {
      const user = response.user || response;
      const token = response.token || response.accessToken;
      const refreshToken = response.refreshToken;
      const userId = user._id || user.id;

      if (token) localStorage.setItem('token', token);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      if (userId) localStorage.setItem('userId', userId);

      queryClient.setQueryData(['auth'], user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      queryClient.setQueryData(['auth'], null);
    },
  });
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: refreshToken,
    onSuccess: (response: any) => {
      if (response.token) localStorage.setItem('token', response.token);
      if (response.refreshToken) localStorage.setItem('refreshToken', response.refreshToken);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};

export const useGoogleAuth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ credentials, phoneNumber }: { credentials: any, phoneNumber?: string }) => 
      googleLogin(credentials, phoneNumber),
    onSuccess: (response: any) => {
      const user = response.user || response;
      const token = response.token || response.accessToken;
      const refreshToken = response.refreshToken;
      const userId = user._id || user.id;

      if (token) localStorage.setItem('token', token);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      if (userId) localStorage.setItem('userId', userId);

      queryClient.setQueryData(['auth'], user);
    },
  });
};