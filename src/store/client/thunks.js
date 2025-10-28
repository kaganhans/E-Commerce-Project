// src/store/client/thunks.js
import { api, getToken, setToken, clearToken } from "../../api/axios";
import { setRoles, setUser } from "./actions";

// Rolleri bir kez çek
export const getRolesIfNeeded = () => async (dispatch, getState) => {
  const { roles } = getState().client || {};
  if (roles?.length) return;
  try {
    const { data } = await api.get("/roles");
    dispatch(setRoles(data || []));
  } catch {}
};

// Login — başarılıysa user'ı Redux'a, token'ı opsiyonel olarak localStorage'a yaz
export const login =
  ({ email, password, remember }) =>
  async (dispatch) => {
    try {
      const { data } = await api.post("/login", { email, password });
      const user = data?.user || data?.data?.user || { email, name: data?.name };
      const token = data?.token || data?.accessToken || data?.data?.token;

      if (remember && token) setToken(token); // Bearer prefix'i olmadan raw token saklıyoruz
      dispatch(setUser(user));
      return { ok: true, user };
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Giriş başarısız. Bilgileri kontrol edin.";
      return { ok: false, error: msg };
    }
  };

// Uygulama açılışında token varsa user'ı hydrate et
export const verifyTokenIfPresent = () => async (dispatch) => {
  const token = getToken();
  if (!token) return; // token yoksa sessizce çık

  try {
    // Interceptor Authorization'ı token'dan dolduruyor
    const { data } = await api.get("/verify");
    const user = data?.user || data; // bazı API'lar doğrudan user döndürür
    dispatch(setUser(user));

    // Backend yeni token döndürüyorsa yenile
    const newToken = data?.token || data?.accessToken;
    if (newToken) setToken(newToken);
  } catch {
    // token geçersiz → temizle
    clearToken();
  }
};
