import axios from 'axios';
import { SERVER_BASE_URL } from '../../utils/consts';

const api = axios.create({
  baseURL: SERVER_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;
    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${SERVER_BASE_URL}/auth/refresh`, { refreshToken });
          const newToken = data.token || data.accessToken;
          const newRefreshToken = data.refreshToken;

          if (newToken) {
            localStorage.setItem('token', newToken);
            if (newRefreshToken) {
              localStorage.setItem('refreshToken', newRefreshToken);
            }
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        } catch (refreshError: any) {
          localStorage.clear();
          return Promise.reject(refreshError);
        }
      } else {
        localStorage.clear();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
