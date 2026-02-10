import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // fine to keep if you also use cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // <-- use your real key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
