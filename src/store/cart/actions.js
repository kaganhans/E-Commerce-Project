// src/store/cart/actions.js
import {
  CART_HYDRATE,
  CART_ADD,
  CART_REMOVE,
  CART_SET_CHECKED,
  CART_CLEAR,
  CART_TOGGLE_DROPDOWN,
} from "./types";

const STORAGE_KEY = "cart_v1";
const save = (state) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
};

export const hydrateCartFromStorage = () => (dispatch) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    dispatch({ type: CART_HYDRATE, payload: JSON.parse(raw) });
  } catch {}
};

// Ürünü meta ile gönderebilirsin; fakat DetailHero zaten __from/__thumb ekleyip yolluyor.
export const addToCart = (product, count = 1) => (dispatch, getState) => {
  dispatch({ type: CART_ADD, payload: { product, count, checked: true } });
  save(getState().shoppingCart);
};

export const removeFromCart = (productId, from) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE, payload: { productId, from } });
  save(getState().shoppingCart);
};

export const setChecked = (productId, checked, from) => (dispatch, getState) => {
  dispatch({ type: CART_SET_CHECKED, payload: { productId, checked, from } });
  save(getState().shoppingCart);
};

export const clearCart = () => (dispatch, getState) => {
  dispatch({ type: CART_CLEAR });
  save(getState().shoppingCart);
};

export const toggleCartDropdown = (open) => ({
  type: CART_TOGGLE_DROPDOWN,
  payload: { open },
});

const idMatches = (p, id) => p?.id === id || p?._id === id;

export const increment = (productId, from) => (dispatch, getState) => {
  const s = getState();
  const item = s.shoppingCart.cart.find(
    (i) => idMatches(i.product, productId) && (from ? i.product.__from === from : true)
  );
  const next = (item?.count || 0) + 1;
  dispatch({ type: "CART_SET_COUNT", payload: { productId, from, count: next } });
  save(getState().shoppingCart);
};

export const decrement = (productId, from) => (dispatch, getState) => {
  const s = getState();
  const item = s.shoppingCart.cart.find(
    (i) => idMatches(i.product, productId) && (from ? i.product.__from === from : true)
  );
  const next = Math.max(0, (item?.count || 0) - 1);
  if (next === 0) {
    dispatch({ type: CART_REMOVE, payload: { productId, from } });
  } else {
    dispatch({ type: "CART_SET_COUNT", payload: { productId, from, count: next } });
  }
  save(getState().shoppingCart);
};

/** ✅ Tüm satırların checked durumunu topluca değiştirir */
export const toggleAll = (checked) => (dispatch, getState) => {
  const s = getState();
  const list = Array.isArray(s.shoppingCart?.cart) ? s.shoppingCart.cart : [];
  list.forEach((it) => {
    const pid = it?.product?.id ?? it?.product?._id;
    const from = it?.product?.__from;
    dispatch({ type: CART_SET_CHECKED, payload: { productId: pid, checked, from } });
  });
  save(getState().shoppingCart);
};
