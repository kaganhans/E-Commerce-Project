// src/store/product/reducer.js
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

const initialState = {
  categories: [],
  fetchState: "IDLE",   // IDLE | FETCHING | FETCHED | FAILED
  products: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: "",

  // 🔹 T16
  productDetail: null,
  productDetailLoading: false,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload ?? [] };

    case SET_PRODUCT_LIST:
      return { ...state, products: action.payload ?? [] };

    case APPEND_PRODUCT_LIST:
      return { ...state, products: [...state.products, ...(action.payload ?? [])] };

    case SET_TOTAL:
      return { ...state, total: Number(action.payload) || 0 };

    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload || "IDLE" };

    case SET_LIMIT:
      return { ...state, limit: Number(action.payload) || state.limit };

    case SET_OFFSET:
      return { ...state, offset: Number(action.payload) || 0 };

    case SET_FILTER:
      return { ...state, filter: action.payload ?? "" };

    // 🔹 T16
    case SET_PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload ?? null };

    case SET_PRODUCT_DETAIL_LOADING:
      return { ...state, productDetailLoading: !!action.payload };

    case CLEAR_PRODUCT_DETAIL:
      return { ...state, productDetail: null, productDetailLoading: false };

    default:
      return state;
  }
}
