// ---------------------------------------------
// src/api/products.js (YENİ)
// ---------------------------------------------
import axios from "./axios";


export async function fetchProductsApi({ category, sort, filter }) {
const params = {};
if (category) params.category = String(category);
if (sort) params.sort = sort; // "price:desc" vb.
if (filter) params.filter = filter; // serbest metin


const { data } = await axios.get("/products", { params });
return data; // dizi döndüğü varsayımıyla
}


// ---------------------------------------------
// src/utils/useProductSearch.js (YENİ)
// URL query paramlarını tek yerden yönetir ve diğerlerini korur
// ---------------------------------------------
import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";


export function useProductSearch() {
const [searchParams, setSearchParams] = useSearchParams();


const filter = searchParams.get("filter") ?? "";
const sort = searchParams.get("sort") ?? "";


const setParam = useCallback((key, value) => {
setSearchParams(prev => {
const next = new URLSearchParams(prev);
if (value === undefined || value === null || value === "") next.delete(key);
else next.set(key, value);
return next;
}, { replace: true });
}, [setSearchParams]);


return useMemo(() => ({
filter,
sort,
setFilter: (v) => setParam("filter", v),
setSort: (v) => setParam("sort", v),
searchParams,
}), [filter, sort, setParam, searchParams]);
}