// src/components/DetailHero.jsx
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleCartDropdown } from "../store/cart/actions";
import { useLocation } from "react-router-dom";
import { DETAY, ICONS, COLORS } from "../images";

const COLOR_OPTIONS_PATHS = [COLORS.blue, COLORS.green, COLORS.orange, COLORS.black];

const StarRating = ({ rating = 5, reviews = 10 }) => (
  <div className="flex items-center gap-2">
    {[...Array(5)].map((_, i) => (
      <img
        key={i}
        src={ICONS.star}
        alt="star"
        className={`w-4 h-4 ${i < rating ? "opacity-100" : "opacity-30"}`}
      />
    ))}
    <span className="text-[#737373] text-[14px] font-bold tracking-[0.2px]">
      {reviews} Reviews
    </span>
  </div>
);

const onImgErr = (label) => (e) =>
  console.warn(`Görsel bulunamadı [${label}]:`, e?.currentTarget?.src);

/**
 * product prop gelirse onu kullanır.
 * Gelmezse store.product.productDetail'i dener.
 * Görsel düzeni yedektekiyle aynıdır.
 */
export default function DetailHero({ product: productProp }) {
  const productFromStore = useSelector(
    (s) => s.product?.productDetail || s.product?.product
  );
  const product = productProp || productFromStore;

  // ▶ Liste (showing) kartından Link ile gelen görsel
  const location = useLocation();
  const stateThumb = location?.state?.thumb || null;

  // ▶ Ek emniyet: Kartta tıklanan görseli sessionStorage'ta da tutuyoruz
  let ssThumb = null;
  try {
    ssThumb = sessionStorage.getItem("last_thumb") || null;
  } catch {}

  // API ana görseli (varsa)
  const apiMainImage = useMemo(() => {
    const list = product?.images;
    if (!Array.isArray(list) || !list.length) return product?.image || null;
    const first = list.find((x) => x?.index === 0) || list[0];
    return first?.url || product?.image || null;
  }, [product]);

  // Yedek DEMO görsellerle birleşik liste (layout aynı)
  const IMAGES = [apiMainImage, DETAY?.[0], DETAY?.[1]].filter(Boolean);

  const [mainIndex, setMainIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const hasMany = IMAGES.length > 1;
  const prev = () =>
    hasMany && setMainIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  const next = () => hasMany && setMainIndex((i) => (i + 1) % IMAGES.length);

  const dispatch = useDispatch();

  // 🔹 Sepete yazılacak açıklama metni (üründe varsa onu, yoksa kısa fallback)
  const descText =
    (product?.description ||
      product?.shortDescription ||
      product?.details ||
      "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.") + "";

  // Sepete atılacak ürün objesini güvenli hale getir
  const safeProductForCart = useMemo(() => {
    if (product?.id != null || product?._id != null) {
      // Orijinal üründe açıklama alanları yoksa enjekte et
      return {
        ...product,
        description: product?.description ?? descText,
        shortDescription: product?.shortDescription ?? descText,
      };
    }
    // Demo/idsiz durum için minimal obje
    return {
      id: `tmp-${IMAGES[0] || "0"}`,
      name: product?.name || product?.title || "Floating Phone",
      price: product?.price ?? 1139.33,
      images: product?.images ?? [{ url: IMAGES[0], index: 0 }].filter(Boolean),
      image: product?.image ?? IMAGES[0] ?? undefined,
      description: descText,
      shortDescription: descText,
    };
  }, [product, IMAGES, descText]);

  // ✅ thumb önceliği: 1) state.thumb  2) sessionStorage.last_thumb  3) detayda seçili görsel  4) api ana görsel
  const resolveThumb = () =>
    stateThumb || ssThumb || IMAGES[mainIndex] || apiMainImage || "";

  const handleAddToCart = () => {
    const thumbUrl = resolveThumb();
    const fromPath = location.pathname;

    const productWithMeta = {
      ...safeProductForCart,
      // açıklama alanlarını garantiye al
      description: safeProductForCart.description ?? descText,
      shortDescription: safeProductForCart.shortDescription ?? descText,
      name: safeProductForCart.name || product?.name || product?.title || "Ürün",
      __from: safeProductForCart.__from || fromPath,
      __thumb: thumbUrl,
    };

    dispatch(addToCart(productWithMeta, 1));
    dispatch(toggleCartDropdown(true));

    // thumb tek seferlikti; temizleyelim
    try {
      sessionStorage.removeItem("last_thumb");
    } catch {}
  };

  return (
    <div className="w-full font-['Montserrat'] bg-[#FAFAFA] flex justify-start">
      {/* dış konteyner — masaüstünde geniş */}
      <div className="w-full max-w-[1760px] px-0 md:pl-0 md:pr-10 lg:pl-0 lg:pr-16">
        {/* lg: yan yana; mobil: üst üste (görsel önce) */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[506px_minmax(640px,1fr)] lg:gap-16 lg:items-start">
          {/* SOL (GÖRSEL) */}
          <div className="order-1 w-full lg:w-[506px]">
            <div className="relative w-full h-[348px] sm:h-[400px] lg:h-[450px] overflow-hidden">
              {IMAGES.length ? (
                <img
                  src={IMAGES[mainIndex]}
                  alt={product?.name || "Ürün Görseli"}
                  onError={onImgErr("DETAY_MAIN")}
                  className="block w-full h-full object-cover object-center select-none"
                  draggable={false}
                />
              ) : (
                <div className="grid place-items-center w-full h-full text-sm text-[#737373]">
                  Görsel bulunamadı
                </div>
              )}

              {hasMany && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[44px] h-[72px] flex items-center justify-center outline-none"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                    aria-label="Önceki görsel"
                  >
                    <img
                      src={ICONS.chevronLeft}
                      alt=""
                      className="w-[24px] h-[44px] pointer-events-none"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[44px] h-[72px] flex items-center justify-center outline-none"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                    aria-label="Sonraki görsel"
                  >
                    <img
                      src={ICONS.chevronRight}
                      alt=""
                      className="w-[24px] h-[44px] pointer-events-none"
                    />
                  </button>
                </>
              )}
            </div>

            {hasMany && (
              <div className="flex items-start pt-4 pb-6">
                <div className="flex gap-4">
                  {IMAGES.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setMainIndex(i)}
                      aria-current={i === mainIndex ? "true" : undefined}
                      className={`w-[124px] h-[92px] overflow-hidden rounded-[6px] border ${
                        i === mainIndex ? "border-[#23A6F0]" : "border-gray-200"
                      }`}
                      title="Önizlemeyi göster"
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <img
                        src={src}
                        alt={`Ürün Önizlemesi ${i + 1}`}
                        onError={onImgErr("DETAY_THUMB")}
                        className={`w-full h-full object-cover object-center ${
                          i === mainIndex ? "brightness-95" : ""
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SAĞ (METİN) */}
          <div className="order-2 min-w-0 overflow-visible lg:pr-4">
            <h1 className="text-[#252B42] text-[28px] lg:text-[32px] font-bold leading-tight tracking-[-0.5px]">
              {product?.name || "Floating Phone"}
            </h1>

            <div className="mt-2">
              <StarRating rating={Math.round(product?.rating || 5)} reviews={10} />
            </div>

            <div className="mt-4 text-[#252B42] text-[24px] lg:text-[28px] font-extrabold leading-[1.2]">
              {product?.price != null ? `$${product.price}` : "$1,139.33"}
            </div>

            <div className="mt-3 text-[16px] font-bold tracking-[0.2px]">
              <span className="text-[#737373] mr-1">Availability :</span>
              <span className="text-[#23A6F0]">
                {(product?.stock ?? 1) > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Açıklama: desktop 3 satır, mobile 5 satır */}
            <div className="mt-5 text-[#737373] text-[16px] leading-[28px] tracking-[0.2px]">
              <span className="hidden lg:inline">
                Met minim Mollie non desert Alamo est sit cliquey dolor
                <br />
                do met sent. RELIT official consequent door ENIM RELIT Mollie.
                <br />
                Excitation venial consequent sent nostrum met.
              </span>
              <span className="block lg:hidden">
                Met minim Mollie non desert
                <br />
                Alamo est sit cliquey dolor do
                <br />
                met sent. RELIT official consequent
                <br />
                door ENIM RELIT Mollie. Excitation
                <br />
                venial consequent sent nostrum met.
              </span>
            </div>

            <hr className="mt-6 border-t border-[#E6E6E6]" />

            <div className="flex gap-3 mt-6 mb-6">
              {COLOR_OPTIONS_PATHS.map((path, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColorIndex(index)}
                  className="w-[32px] h-[32px] rounded-full overflow-hidden ring-2 ring-transparent data-[active=true]:ring-[#BDBDBD]"
                  data-active={selectedColorIndex === index}
                  title={`Renk ${index + 1}`}
                >
                  <img
                    src={path}
                    alt={`Renk ${index + 1}`}
                    onError={onImgErr("COLOR")}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 py-1">
              <button
                onClick={handleAddToCart}
                className="h-[48px] px-5 bg-[#23A6F0] text-white text-[14px] font-bold rounded hover:bg-opacity-90 transition-colors"
              >
                Sepete Ekle
              </button>

              {/* küçük sepet ikonundan da ekleme */}
              <button
                onClick={handleAddToCart}
                className="w-[44px] h-[44px] flex items-center justify-center border border-[#ECECEC] rounded-full hover:bg-gray-100"
                aria-label="Sepete ekle"
                title="Sepete ekle"
              >
                <img src={ICONS.shop} alt="" className="w-[40px] h-[40px]" />
              </button>

              <button
                className="w-[44px] h-[44px] flex items-center justify-center border border-[#ECECEC] rounded-full hover:bg-gray-100"
                title="Favorilere ekle"
                aria-label="Favorilere ekle"
              >
                <img src={ICONS.like} alt="" className="w-[40px] h-[40px]" />
              </button>

              <button
                className="w-[44px] h-[44px] flex items-center justify-center border border-[#ECECEC] rounded-full hover:bg-gray-100"
                title="Görüntüle"
                aria-label="Görüntüle"
              >
                <img src={ICONS.eye} alt="" className="w-[40px] h-[40px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
