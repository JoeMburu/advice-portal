import axios from 'axios';
import { tokenStorage } from '../auth/tokenStorage';

const API_BASE = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// let isRefreshing = false;
// let queue = [];

// function subscribe(cb) {
//   queue.push(cb);
// }

// function publish(newToken) {
//   queue.forEach((cb) => cb(newToken));
//   queue = [];
// }

// async function refreshAccessToken() {
//   const refresh = tokenStorage.getRefresh();
//   if (!refresh) throw new Error("No refresh token");

//   // IMPORTANT: use a plain axios (not axiosInstance) so we don't loop interceptors
//   const res = await axios.post("/api/token/refresh/", { refresh });
//   const newAccess = res.data.access;

//   tokenStorage.setAccess(newAccess);
//   return newAccess;
// }

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const accessToken = tokenStorage.getAccess();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenStorage.getRefresh();

      try {
        const response = await axios.post(`${API_BASE}/api/v1/accounts/token/refresh/`, {
          refresh: refreshToken,
        });

        // Update the access token in localStorage
        tokenStorage.setAccess(response.data.access);
        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        // If refresh fails, clear tokens and redirect to login
        console.error('Token refresh failed:', error);
        tokenStorage.clear();
        //window.location.href = '/login';
      }
 
    }
    return Promise.reject(error);
  }
);  

export default axiosInstance;