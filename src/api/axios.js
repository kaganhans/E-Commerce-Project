// src/api/axios.js
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://workintech-fe-ecommerce.onrender.com";

const TOKEN_KEY = "token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => {
  if (t) localStorage.setItem(TOKEN_KEY, t);
};
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Public GET yolları: token göndermiyoruz
const isPublicGet = (config) => {
  const url = String(config?.url || "");
  const isGet = (config?.method || "get").toLowerCase() === "get";
  return isGet && (url.startsWith("/products") || url.startsWith("/categories"));
};

api.interceptors.request.use((config) => {
  if (isPublicGet(config)) {
    // public GET → auth header'ı kaldır
    if (config.headers?.Authorization) delete config.headers.Authorization;
    return config;
  }
  const t = getToken();
  if (t) config.headers.Authorization = t; // Bearer yok, birebir
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(err);
  }
);
