// src/pages/DetailPage.jsx
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import ShopNav from "../components/ShopNav";
import DetailHero from "../components/DetailHero";
import Quick from "../components/Quick";
import Bestseller from "../components/Bestseller";
import BrandRow from "../components/BrandRow";
import SiteFooter from "../components/SiteFooter";

import { fetchProductById } from "../store/product/thunks";

export default function DetailPage() {
  const { productId, productNameSlug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productDetail, productDetailLoading } = useSelector((s) => s.product || {});

  // Demo’dan geliyorsak (ör: /demo-product-11/11) veya productId yoksa → fetch yapma
  const isDemoRoute = useMemo(() => {
    const demoSlug = (productNameSlug || "").toLowerCase();
    const idNum = Number(productId);
    return demoSlug.startsWith("demo-product") || !idNum || Number.isNaN(idNum);
  }, [productNameSlug, productId]);

  useEffect(() => {
    if (!isDemoRoute && productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId, isDemoRoute]);

  const back = () => navigate(-1);

  return (
    <div className="font-sans text-[#252B42]">
      <TopBar bgColor="#23856D" />
      <Navbar pageType="DetailPage" />
      <ShopNav hideTitle={true} pageType="detail" />

      <div className="mx-auto max-w-[1200px] px-4 py-6">
        {/* Geri butonu artık ShopNav’a taşındı, isteyen burada da kullanabilir */}
        {/* <button onClick={back} className="mb-4 rounded border px-4 py-2 hover:bg-gray-50">← Geri</button> */}

        {/* 1) DEMO rotada her zaman demo vitrin detayı göster */}
        {isDemoRoute && <DetailHero />}

        {/* 2) API rotası: yükleniyorsa spinner */}
        {!isDemoRoute && productDetailLoading && (
          <div className="py-16 text-center">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#23A6F0]" />
            <div className="mt-3 text-gray-600">Yükleniyor…</div>
          </div>
        )}

        {/* 3) API rotası: veri geldiyse, product’ı DetailHero’ya entegre etmek istersen
               burada prop geçebilirsin (şimdilik demo UI kullanıyoruz) */}
        {!isDemoRoute && !productDetailLoading && productDetail && (
          <DetailHero /* product={productDetail} */ />
        )}

        {/* 4) API rotası: istek başarısız / ürün yok → demo arayüzüne nazik fallback */}
        {!isDemoRoute && !productDetailLoading && !productDetail && (
          <DetailHero />
        )}
      </div>

      <Quick />
      <Bestseller />
      <BrandRow bgColor="#FAFAFA" />
      <SiteFooter topBgColor="#FFFFFF" />
    </div>
  );
}
