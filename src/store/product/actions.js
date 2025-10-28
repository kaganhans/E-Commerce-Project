// src/store/product/actions.js
import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  APPEND_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  // T16
  SET_PRODUCT_DETAIL,
  SET_PRODUCT_DETAIL_LOADING,
  CLEAR_PRODUCT_DETAIL,
} from "./actionTypes";

export const setCategories = (items) => ({ type: SET_CATEGORIES, payload: items });

export const setProducts = (items) => ({ type: SET_PRODUCT_LIST, payload: items });
export const appendProducts = (items) => ({ type: APPEND_PRODUCT_LIST, payload: items });
export const setTotal = (n) => ({ type: SET_TOTAL, payload: n });
export const setFetchState = (s) => ({ type: SET_FETCH_STATE, payload: s });
export const setLimit  = (n) => ({ type: SET_LIMIT, payload: n });
export const setOffset = (n) => ({ type: SET_OFFSET, payload: n });
export const setFilter = (f) => ({ type: SET_FILTER, payload: f });

// 🔹 Detay
export const setProductDetail = (p) => ({ type: SET_PRODUCT_DETAIL, payload: p });
export const setProductDetailLoading = (b) => ({ type: SET_PRODUCT_DETAIL_LOADING, payload: b });
export const clearProductDetail = () => ({ type: CLEAR_PRODUCT_DETAIL });
