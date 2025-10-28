// src/store/product/thunks.js
import { api } from "../../api/axios";
import {
  setFetchState,
  setCategories,
  setProducts,
  appendProducts,
  setTotal,
  // T16
  setProductDetail,
  setProductDetailLoading,
} from "./actions";

/* ------------ KATEGORİLER ------------ */
const toGenderSlug = (g = "") => {
  const s = String(g || "").toLowerCase();
  if (["female", "kadın", "kadin", "women", "woman"].includes(s)) return "kadin";
  if (["male", "erkek", "men", "man"].includes(s)) return "erkek";
  return "unisex";
};
const normalizeCategories = (data = []) =>
  (data || []).map((c) => ({
    id: c.id ?? c.category_id ?? c._id,
    name: c.name ?? c.title ?? c.category_name ?? "",
    image: c.image ?? c.img ?? null,
    rating: Number(c.rating ?? c.rate ?? 0),
    genderSlug: toGenderSlug(c.gender || c.gender_code || c.sex),
  }));

export const fetchCategoriesIfNeeded = () => async (dispatch, getState) => {
  const { product } = getState();
  if (product?.categories?.length) return;
  try {
    dispatch(setFetchState("FETCHING"));
    const { data } = await api.get("/categories");
    dispatch(setCategories(normalizeCategories(data)));
    dispatch(setFetchState("FETCHED"));
  } catch (err) {
    console.error("Kategori çekilemedi:", err?.response || err);
    dispatch(setFetchState("FAILED"));
  }
};

/* ------------ ÜRÜN LİSTESİ (T14/T15) ------------ */
const normalizeProducts = (data = []) =>
  (data || []).map((p) => ({
    id: p.id ?? p.product_id ?? p._id,
    title: p.title ?? p.name ?? "Product",
    description: p.description ?? "",
    price: Number(p.price ?? 0),
    image:
      p.image ||
      p.thumbnail ||
      (Array.isArray(p.images) && p.images.length > 0 ? p.images[0]?.url : null),
    images: Array.isArray(p.images) ? p.images : (p.image ? [{ url: p.image, index: 0 }] : []),
    rating: Number(p.rating ?? p.rate ?? 0),
    category_id: p.category_id ?? p.categoryId,
  }));

export const fetchProducts =
  ({ limit = 25, offset = 0, category, sort, filter, append = false } = {}) =>
  async (dispatch) => {
    dispatch(setFetchState("FETCHING"));

    const params = { limit: Number(limit), offset: Number(offset) };
    if (category) params.category = category;
    if (sort) params.sort = sort;
    if (filter) params.filter = filter;

    try {
      const { data } = await api.get("/products", { params });
      const total = data?.total ?? 0;
      const items = normalizeProducts(data?.products ?? data ?? []);
      if (append) dispatch(appendProducts(items));
      else dispatch(setProducts(items));
      dispatch(setTotal(total));
      dispatch(setFetchState("FETCHED"));
    } catch (err) {
      const status = err?.response?.status;
      if (status === 404 || status === 204) {
        if (!append) dispatch(setProducts([]));
        dispatch(setTotal(0));
        dispatch(setFetchState("FETCHED"));
        return;
      }
      console.error("Products fetch failed:", err?.response || err);
      if (!append) dispatch(setProducts([]));
      dispatch(setTotal(0));
      dispatch(setFetchState("FAILED"));
    }
  };

/* ------------ 🔹 ÜRÜN DETAY (T16) ------------ */
const normalizeProductDetail = (p = {}) => ({
  id: p.id ?? p.product_id ?? p._id,
  name: p.name ?? p.title ?? "Product",
  description: p.description ?? "",
  price: Number(p.price ?? 0),
  stock: Number(p.stock ?? 0),
  category_id: p.category_id ?? p.categoryId,
  rating: Number(p.rating ?? p.rate ?? 0),
  sell_count: Number(p.sell_count ?? 0),
  images: Array.isArray(p.images) ? p.images : (p.image ? [{ url: p.image, index: 0 }] : []),
});

export const fetchProductById = (productId) => async (dispatch) => {
  if (!productId) return;
  try {
    dispatch(setProductDetailLoading(true));
    const { data } = await api.get(`/products/${productId}`);
    dispatch(setProductDetail(normalizeProductDetail(data)));
  } catch (err) {
    console.error("Product detail fetch failed:", err?.response || err);
    dispatch(setProductDetail(null));
  } finally {
    dispatch(setProductDetailLoading(false));
  }
};
