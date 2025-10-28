// src/pages/ShopPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import ShopNav from "../components/ShopNav";
import ShopHero from "../components/ShopHero";
import Showing from "../components/Showing";
import BrandRow from "../components/BrandRow";
import SiteFooter from "../components/SiteFooter";

import { fetchProducts } from "../store/product/thunks";
import { setLimit } from "../store/product/actions";
import { slugify } from "../utils/slug";

// ---------- KONTROL: DEMO vitrin (Showing) mi, API grid mi? ----------
const USE_DEMO_SHOWING = true; // 👈 Showing yapısını KESİNLİKLE korumak için true

// T14: sıralama seçenekleri
const SORT_OPTIONS = ["price:asc", "price:desc", "rating:asc", "rating:desc"];

// Başlık makyajı
const pretty = (s = "") => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function ShopPage() {
  const dispatch = useDispatch();

  // Rota: /shop/:gender/:categorySlug/:categoryId
  const { gender, categorySlug, categoryId } = useParams();

  // QS: filter + sort + page (Showing için de kullanıyoruz)
  const [searchParams, setSearchParams] = useSearchParams();
  const filterQS = searchParams.get("filter") ?? "";
  const sortQS   = searchParams.get("sort")   ?? "";
  const pageQS   = Number(searchParams.get("page") || 1);

  // UI controlled
  const [filterInput, setFilterInput] = useState(filterQS);
  const [sortSelect,  setSortSelect]  = useState(sortQS);

  // Store (API grid için; demo Showing açıkken sadece state temizliği için dokunuyoruz)
  const { products, limit, offset } = useSelector((s) => s.product || { products: [], limit: 25, offset: 0 });

  // URL query yazıcı (diğer parametreleri korur)
  const setParam = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === undefined || value === null || value === "" || Number.isNaN(value)) next.delete(key);
      else next.set(key, String(value));
      return next;
    }, { replace: true });
  };

  // T14: filtre/sort uygula → page=1
  const applyFilter = () => { setParam("filter", filterInput.trim()); setParam("page", 1); };
  const applySort   = () => { setParam("sort",   sortSelect);        setParam("page", 1); };

  // UI <- URL senkron
  useEffect(() => {
    setFilterInput(filterQS);
    setSortSelect(sortQS);
  }, [filterQS, sortQS]);

  // Başlık
  const title = useMemo(() => {
    const g = gender === "kadin" ? "Kadın" : gender === "erkek" ? "Erkek" : (gender || "Shop");
    const cat = categorySlug ? pretty(categorySlug) : "Kategori";
    return `${g} / ${cat}`;
  }, [gender, categorySlug]);

  // ---------- API FETCH (Sadece USE_DEMO_SHOWING === false iken) ----------
  useEffect(() => {
    if (USE_DEMO_SHOWING) return; // demo modda API çağrısı yapma
    const params = {
      limit: Number(limit) || 25,
      offset: Number(offset) || 0,
      category: categoryId || undefined,
      sort: sortQS || undefined,
      filter: filterQS || undefined,
      append: false,
    };
    dispatch(fetchProducts(params));
  }, [dispatch, limit, offset, categoryId, sortQS, filterQS]);

  useEffect(() => {
    if (!limit) dispatch(setLimit(25));
  }, [dispatch, limit]);

  // ---------- DEMO Showing için seed + sayfa ----------
  const TOTAL_PAGES = 58;
  const PAGE_SIZE   = 25;
  const currentPage = Math.max(1, Math.min(TOTAL_PAGES, pageQS));
  const seedKey     = `${gender || "all"}-${categorySlug || "all"}-${categoryId || "0"}-${filterQS}-${sortQS}`;

  // ---------- API grid link yardımcı (USE_DEMO_SHOWING false ise kullanılır) ----------
  const buildDetailHref = (p) => {
    const productId = p.id ?? p.product_id ?? p._id;
    const productName = p.title || p.name || "product";
    const productNameSlug = slugify(productName);

    const g = gender || "unisex";
    const catSlug = categorySlug || slugify(p.category_name || "kategori");
    const catId = categoryId || p.category_id || p.categoryId || "0";

    return `/shop/${g}/${catSlug}/${catId}/${productNameSlug}/${productId}`;
  };

  return (
    <div className="font-sans text-[#252B42]">
      <TopBar bgColor="#23856D" />
      <Navbar pageType="ShopPage" />
      <ShopNav hideTitle={false} />
      <ShopHero showCategories={false} />

      {/* --- T14 Kontrol Çubuğu (URL günceller) --- */}
      <div className="mx-auto my-6 max-w-[1292px] px-4">
        <div className="mb-2 text-xl font-semibold">{title}</div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Filter */}
          <div className="flex items-center gap-2">
            <input
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              placeholder="Filtre (örn: siyah)"
              className="h-10 w-64 rounded-xl border px-3"
            />
            <button onClick={applyFilter} className="h-10 rounded-xl border px-4">
              Filtrele
            </button>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <select
              value={sortSelect}
              onChange={(e) => setSortSelect(e.target.value)}
              className="h-10 rounded-xl border px-3"
            >
              <option value="">Sırala…</option>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <button onClick={applySort} className="h-10 rounded-xl border px-4">
              Uygula
            </button>
          </div>
        </div>
      </div>

      {/* ---------- GÖRÜNÜM SEÇİMİ ---------- */}
      {USE_DEMO_SHOWING ? (
        // ✅ Showing yapısı aynen korunur + rota bağlamı geçildi
        <Showing
          pageSize={PAGE_SIZE}
          totalPages={TOTAL_PAGES}
          currentPage={currentPage}
          onPageChange={(page) => setParam("page", page)}
          seed={seedKey}
          routeContext={{ gender, categorySlug, categoryId }} // 👈 EN ÖNEMLİ SATIR
        />
      ) : (
        // API grid (istersen ileride aç)
        Array.isArray(products) && products.length > 0 ? (
          <div className="mx-auto max-w-[1292px] px-4 pb-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => {
                const productId = p.id ?? p.product_id ?? p._id;
                if (!productId) return null;
                const detailHref = buildDetailHref(p);
                return (
                  <Link
                    key={productId}
                    to={detailHref}
                    className="block cursor-pointer group rounded-2xl border p-3 hover:shadow-lg transition"
                    title={p.title || p.name}
                  >
                    <img
                      src={
                        p.image ||
                        (Array.isArray(p.images) && p.images[0]?.url) ||
                        "https://via.placeholder.com/600x600?text=Product"
                      }
                      alt={p.title || p.name}
                      className="w-full aspect-square object-cover rounded-xl group-hover:opacity-95"
                    />
                    <div className="mt-3 text-sm font-semibold line-clamp-1">
                      {p.title || p.name || "Product"}
                    </div>
                    <div className="text-[#23856D] font-bold">
                      {(Number(p.price) || 0).toLocaleString("tr-TR")} ₺
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null
      )}

      <BrandRow bgColor="#FAFAFA" />
      <SiteFooter topBgColor="#FFFFFF" />
    </div>
  );
}
