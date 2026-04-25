import { googleLogin, refreshToken } from '../services/AuthService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout, register } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (response: any) => {
      const user = response.user || response;
      const userId = user._id || user.id;

      if (userId) {
        localStorage.setItem('userId', userId);
      }

      queryClient.setQueryData(['auth'], user);
      navigate('/', { replace: true });
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (response: any) => {
      const user = response.user || response;
      const userId = user._id || user.id;

      if (userId) {
        localStorage.setItem('userId', userId);
      }

      queryClient.setQueryData(['auth'], user);
      navigate('/', { replace: true });
    },
  });
};
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      localStorage.removeItem('userId');
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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (user: any) => {
      const userId = user._id || user.id;

      if (userId) localStorage.setItem('userId', userId);

      queryClient.setQueryData(['auth'], user);

      navigate('/', { replace: true });
    },
  });
};
