// DetailHero.jsx
import React, { useState } from "react";
import { DETAY, ICONS, COLORS } from "../images";

const COLOR_OPTIONS_PATHS = [COLORS.blue, COLORS.green, COLORS.orange, COLORS.black];

const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center space-x-2">
    {[...Array(5)].map((_, i) => (
      <img
        key={i}
        src={ICONS.star}
        alt="Star"
        className={`w-4 h-4 ${i < rating ? "opacity-100" : "opacity-30"}`}
      />
    ))}
    <span className="text-[#737373] text-[14px] font-bold leading-[24px] tracking-[0.2px]">
      {reviews} Reviews
    </span>
  </div>
);

const onImgErr = (label) => (e) =>
  console.warn(`Görsel bulunamadı [${label}]:`, e?.currentTarget?.src);

export default function DetailHero() {
  // sadece mevcut görseller (detay-3 yok)
  const IMAGES = [DETAY?.[0], DETAY?.[1]].filter(Boolean);
  const [mainIndex, setMainIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const hasMany = IMAGES.length > 1;
  const prev = () =>
    hasMany && setMainIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  const next = () =>
    hasMany && setMainIndex((i) => (i + 1) % IMAGES.length);

  return (
    <div className="w-full font-['Montserrat'] bg-[#FAFAFA] flex justify-center py-0">
      <div className="w-full max-w-[1440px] px-6 md:px-12 lg:px-48">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* SOL: Görseller */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            {/* Ana görsel */}
            <div className="relative w-full h-[348px] lg:w-[506px] lg:h-[546px] overflow-hidden rounded">
              {IMAGES.length ? (
                <img
                  src={IMAGES[mainIndex]}
                  alt="Ürün Görseli"
                  onError={onImgErr("DETAY_MAIN")}
                  className="
                    w-full h-full object-cover object-center
                    transition-transform duration-500 ease-out
                    will-change-transform hover:scale-[1.02]
                  "
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-sm text-[#737373]">
                  Görsel bulunamadı
                </div>
              )}

              {hasMany && (
                <>
                  {/* Sol ok — 24px içerden, ok görseli ~24x44 */}
                  <button
                    type="button"
                    onClick={prev}
                    className="
                      absolute left-[24px] top-1/2 -translate-y-1/2
                      outline-none focus:outline-none focus:ring-0 focus-visible:outline-none
                      select-none
                      w-[44px] h-[72px] flex items-center justify-center
                    "
                    style={{ WebkitTapHighlightColor: "transparent" }}
                    aria-label="Önceki görsel"
                  >
                    <img
                      src={ICONS.chevronLeft}
                      alt=""
                      className="w-[24px] h-[44px] pointer-events-none"
                    />
                  </button>

                  {/* Sağ ok — 24px içerden, ok görseli ~24x44 */}
                  <button
                    type="button"
                    onClick={next}
                    className="
                      absolute right-[24px] top-1/2 -translate-y-1/2
                      outline-none focus:outline-none focus:ring-0 focus-visible:outline-none
                      select-none
                      w-[44px] h-[72px] flex items-center justify-center
                    "
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

            {/* Küçük görseller (taşmadan sığar + aktif olana blur) */}
            <div className="flex flex-col items-start pt-4 pb-6 lg:px-0 lg:pt-6 lg:pb-0">
              <div className="flex space-x-4">
                {IMAGES.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMainIndex(i)}
                    aria-current={i === mainIndex ? "true" : undefined}
                    className={`
                      w-[100px] h-[75px] overflow-hidden rounded-[6px]
                      border ${i === mainIndex ? "border-[#23A6F0]" : "border-gray-200"}
                      focus:outline-none focus:ring-0 focus-visible:outline-none
                      transition-transform duration-300 ease-out hover:scale-[1.05]
                    `}
                    title="Önizlemeyi göster"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <img
                      src={src}
                      alt={`Ürün Önizlemesi ${i + 1}`}
                      onError={onImgErr("DETAY_THUMB")}
                      className={`
                        w-full h-full object-cover object-center
                        transition duration-300
                        ${i === mainIndex ? "blur-[1.5px]" : ""}
                      `}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SAĞ: Bilgiler */}
          <div className="w-full lg:w-1/2 pb-6 lg:p-0 lg:pl-6">
            <h1 className="text-[#252B42] text-[20px] font-normal leading-[30px] tracking-[0.2px] mb-2">
              Floating Phone
            </h1>

            <StarRating rating={4} reviews={10} />

            <h2 className="text-[#252B42] text-[24px] font-bold leading-[32px] tracking-[0.1px] mt-6 mb-2">
              $1,139.33
            </h2>

            <div className="text-[14px] font-bold leading-[24px] tracking-[0.2px] mb-6">
              <span className="text-[#737373] mr-1">Availability :</span>
              <span className="text-[#23A6F0]">In Stock</span>
            </div>

            <p className="text-[#737373] text-[14px] font-normal leading-[20px] tracking-[0.2px] mb-4">
              Met minim Mollie non desert<br />
              Alamo est sit cliquey dolor do<br />
              met sent. RELIT official consequent<br />
              door ENIM RELIT Mollie. Excitation<br />
              venial consequent sent nostrum met.
            </p>

            <hr className="border-t border-[#BDBDBD] mb-4" />

            <div className="flex space-x-2 mb-8">
              {COLOR_OPTIONS_PATHS.map((path, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedColorIndex(index)}
                  className="w-[30px] h-[30px] rounded-full overflow-hidden cursor-pointer"
                  title={`Renk ${index + 1}`}
                >
                  <img
                    src={path}
                    alt={`Renk Seçeneği ${index + 1}`}
                    onError={onImgErr("COLOR")}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-3 py-1">
              <button className="w-[148px] h-[44px] bg-[#23A6F0] text-white text-[14px] font-bold leading-[24px] tracking-[0.2px] rounded hover:bg-opacity-80 transition-colors flex-shrink-0">
                Select Options
              </button>
              <button className="w-[40px] h-[40px] flex items-center justify-center border border-[#ECECEC] rounded-full text-[#252B42] hover:bg-gray-100 transition-colors" title="Favorilere ekle" aria-label="Favorilere ekle">
                <img src={ICONS.like} alt="" className="w-[40px] h-[40px]" />
              </button>
              <button className="w-[40px] h-[40px] flex items-center justify-center border border-[#ECECEC] rounded-full text-[#252B42] hover:bg-gray-100 transition-colors" title="Sepete ekle" aria-label="Sepete ekle">
                <img src={ICONS.shop} alt="" className="w-[40px] h-[40px]" />
              </button>
              <button className="w-[40px] h-[40px] flex items-center justify-center border border-[#ECECEC] rounded-full text-[#252B42] hover:bg-gray-100 transition-colors" title="Karşılaştır" aria-label="Karşılaştır">
                <img src={ICONS.eye} alt="" className="w-[40px] h-[40px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
