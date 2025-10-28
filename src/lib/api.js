// src/lib/api.js
import axios from "axios";
import store from "../store";

// ⚠️ Vite proxy kullan: /api → backend'e yönlenir (vite.config.mjs'de proxy tanımlı olmalı)
const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Request: Token ekle (Redux + localStorage fallback)
api.interceptors.request.use((config) => {
  const state = store.getState();
  const reduxToken = state?.client?.token || state?.client?.authToken;
  const lsToken =
    typeof window !== "undefined" &&
    (localStorage.getItem("token") ||
      localStorage.getItem("auth_token") ||
      localStorage.getItem("jwt"));

  const token = reduxToken || lsToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// Response: Hata gözlem için basit log (isteğe bağlı)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // axios "Network Error" durumunda err.response yoktur
    if (!err.response) {
      console.error("[API NETWORK ERROR]", err.message);
    } else {
      console.error("[API ERROR]", err.response.status, err.response.data);
    }
    throw err;
  }
);

export default api;
