// src/components/Showing.jsx
// Demo vitrin: SHOWING görsellerini deterministik karıştırır,
// 25'lik sayfalara böler. Üstte "Showing all ..." + (X page & Y total pages)
// Altta ortalanmış 5'lik pencere.
// 🔹 Linkler: T16 URL formatında kurulur (shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId)

import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { SHOWING } from "../images";
import { slugify } from "../utils/slug";

/* ---------- RNG + Shuffle ---------- */
const hashString = (s = "") => {
  let h = 2166136261 >>> 0; // FNV-1a
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};
const mulberry32 = (seed) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};
const shuffleWithSeed = (arr, seed) => {
  const base = Array.isArray(arr) ? arr : [];
  const rng = mulberry32(seed >>> 0);
  const a = base.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ---------- Görsel havuzu ---------- */
const buildShuffledImagePool = ({ totalItems, seed }) => {
  const items = Math.max(1, Number(totalItems) || 1);
  const src = Array.isArray(SHOWING) ? SHOWING : [];
  const pool = [];
  if (!src.length) return pool;

  while (pool.length < items) pool.push(...src);
  const trimmed = pool.slice(0, items);

  const seedNum = hashString(String(seed || "demo"));
  return shuffleWithSeed(trimmed, seedNum);
};

/* ---------- Ortalanmış 5'lik pencere ---------- */
function getWindowPages(current, total, windowSize = 5) {
  const t = Math.max(1, Number(total) || 1);
  const c = Math.max(1, Math.min(t, Number(current) || 1));
  const w = Math.max(1, Number(windowSize) || 5);
  if (t <= w) return Array.from({ length: t }, (_, i) => i + 1);
  let start = c - Math.floor(w / 2);
  let end = start + w - 1;
  if (start < 1) { start = 1; end = w; }
  if (end > t) { end = t; start = t - w + 1; }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/* ---------- Kart (showing) ---------- */
// Detaya giderken:
// 1) Link state ile thumb taşınır
// 2) Emniyet için sessionStorage'a da yazılır (DetailHero bunu okuyor)
const ProductCard = ({ imagePath, index, href }) => {
  const handleGoDetail = () => {
    try {
      sessionStorage.setItem("last_thumb", imagePath || "");
      // istersen localStorage yedeği de açabilirsin:
      // localStorage.setItem("last_thumb", imagePath || "");
    } catch {}
  };

  return (
    <Link
      to={href}
      state={{ thumb: imagePath }}      // 👈 state ile taşı
      onClick={handleGoDetail}          // 👈 emniyet kemeri
      className="w-full flex flex-col items-center text-center mb-10 relative group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      title="Demo Product"
    >
      <img
        src={imagePath}
        alt={`Ürün ${index + 1}`}
        className="w-full h-auto object-cover"
        loading="lazy"
      />
      <div className="pt-4 px-6 pb-6 bg-white w-full">
        <h3 className="text-[#252B42] text-[16px] font-bold leading-[24px] tracking-[0.1px] group-hover:text-[#23A6F0] transition-colors">
          Graphic Design
        </h3>
        <p className="text-[#737373] text-[14px] font-bold leading-[24px] tracking-[0.2px] mt-1">
          English Department
        </p>
        <div className="flex justify-center items-center mt-1 space-x-2">
          <span className="text-[#BDBDBD] text-[16px] font-bold leading-[24px] tracking-[0.1px]">
            $16.48
          </span>
          <span className="text-[#23856D] text-[16px] font-bold leading-[24px] tracking-[0.1px]">
            $6.48
          </span>
        </div>
        <div className="flex justify-center items-center mt-2 space-x-1.5">
          <div className="w-[18px] h-[18px] rounded-full bg-[#23A6F0]" />
          <div className="w-[18px] h-[18px] rounded-full bg-[#23856D]" />
          <div className="w-[18px] h-[18px] rounded-full bg-[#E77C40]" />
          <div className="w-[18px] h-[18px] rounded-full bg-[#252B42]" />
        </div>
      </div>
    </Link>
  );
};

/* ---------- Buton ---------- */
const PageBtn = ({ active, disabled, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`rounded border px-3 py-2 transition-colors ${
      disabled
        ? "cursor-not-allowed text-gray-400 bg-white"
        : active
        ? "bg-[#23A6F0] text-white"
        : "text-[#23A6F0] bg-white hover:bg-gray-50"
    }`}
  >
    {children}
  </button>
);

/* ---------- Showing ---------- */
export default function Showing({
  pageSize = 25,
  totalPages = 58,
  currentPage = 1,
  onPageChange = () => {},
  seed = "demo",
  // 🔹 ShopPage’ten geliyor: URL’yi doldurmak için gerekli rota bağlamı
  routeContext = { gender: "unisex", categorySlug: "kategori", categoryId: "0" },
}) {
  const PAGE_SIZE = Math.max(1, Number(pageSize) || 25);
  const TOTAL_PAGES = Math.max(1, Number(totalPages) || 1);
  const safePage = Math.max(1, Math.min(TOTAL_PAGES, Number(currentPage) || 1));

  const totalItems = PAGE_SIZE * TOTAL_PAGES;
  const pool = useMemo(() => buildShuffledImagePool({ totalItems, seed }), [totalItems, seed]);

  // Slice: current page (globalIndex için start lazım)
  const start = (safePage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageItems = pool.slice(start, end);

  // Scroll top
  useEffect(() => {
    if (typeof window !== "undefined" && window?.scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [safePage]);

  const windowPages = getWindowPages(safePage, TOTAL_PAGES, 5);
  const showingText = `Showing all ${totalItems} results`;
  const pageInfoText = `${safePage} page & ${TOTAL_PAGES} total page${TOTAL_PAGES > 1 ? "s" : ""}`;

  // 🔹 DEMO: her görsel için deterministik sahte detail URL üret
  const { gender, categorySlug, categoryId } = routeContext || {};
  const g = gender || "unisex";
  const catSlug = categorySlug || "kategori";
  const catId = categoryId || "0";

  const hrefForIndex = (globalIndex) => {
    const demoName = `Demo Product ${globalIndex + 1}`;
    const productNameSlug = slugify(demoName);
    const productId = globalIndex + 1; // 1,2,3... deterministik
    return `/shop/${g}/${catSlug}/${catId}/${productNameSlug}/${productId}`;
  };

  return (
    <div className="w-full font-['Montserrat'] bg-white flex justify-center">
      <div className="w-full max-w-[1440px] px-6 md:px-12 lg:px-48 py-5">
        {/* ÜST ŞERİT */}
        <div className="flex flex-col md:flex-row md:h-[58px] items-center md:justify-start justify-center gap-6 md:gap-0 text-[#737373] mb-8">
          {/* Sol: Showing + sayfa bilgisi */}
          <div className="flex items-center gap-3 text-[14px] font-bold leading-[24px] tracking-[0.2px] mb-4 md:mb-0 text-[#252B42] w-full md:w-auto">
            <span>{showingText}</span>
            <span className="text-[#737373]">{pageInfoText}</span>
          </div>

          {/* Orta: Views */}
          <div className="flex items-center gap-3 w-auto shrink-0 md:ml-[260px]">
            <span className="text-[14px] font-bold leading-[24px] tracking-[0.2px] text-[#252B42]">
              Views:
            </span>
            <div className="flex items-center gap-3">
              {/* Grid (aktif) */}
              <button
                type="button"
                aria-pressed="true"
                className="w-10 h-10 flex items-center justify-center border border-[#ECECEC] rounded-[5px] bg-white hover:bg-gray-50 focus:outline-none"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="6" height="6" rx="1.5" fill="#000000" />
                  <rect x="14" y="4" width="6" height="6" rx="1.5" fill="#000000" />
                  <rect x="4" y="14" width="6" height="6" rx="1.5" fill="#000000" />
                  <rect x="14" y="14" width="6" height="6" rx="1.5" fill="#000000" />
                </svg>
              </button>
              {/* List (pasif) */}
              <button
                type="button"
                aria-pressed="false"
                className="w-10 h-10 flex items-center justify-center border border-[#ECECEC] rounded-[5px] bg-white hover:bg-gray-50 focus:outline-none"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="10" y="6.5" width="9" height="2" rx="1" fill="#737373" />
                  <rect x="10" y="11" width="9" height="2" rx="1" fill="#737373" />
                  <rect x="10" y="15.5" width="9" height="2" rx="1" fill="#737373" />
                  <path d="M4.6 6.8 L6.0 8.2 L8.4 5.8" stroke="#737373" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4.6 11.3 L6.0 12.7 L8.4 10.3" stroke="#737373" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4.6 15.8 L6.0 17.2 L8.4 14.8" stroke="#737373" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 justify-items-center">
          {pageItems.map((path, i) => {
            const globalIndex = start + i;
            const href = hrefForIndex(globalIndex);
            return (
              <ProductCard
                key={`${safePage}-${i}`}
                imagePath={path}
                index={i}
                href={href}
              />
            );
          })}
        </div>

        {/* ALTA: SAYFALAMA (5'lik pencere) */}
        {TOTAL_PAGES > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
            <PageBtn onClick={() => onPageChange(Math.max(1, safePage - 1))} disabled={safePage === 1}>
              Önceki
            </PageBtn>

            {windowPages.map((p) => (
              <PageBtn key={p} active={p === safePage} onClick={() => onPageChange(p)}>
                {p}
              </PageBtn>
            ))}

            <PageBtn
              onClick={() => onPageChange(Math.min(TOTAL_PAGES, safePage + 1))}
              disabled={safePage === TOTAL_PAGES}
            >
              Sonraki
            </PageBtn>
          </div>
        )}
      </div>
    </div>
  );
}
