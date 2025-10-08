// src/components/Bestseller.jsx (DÜĞME SADECE MOBİLDE)

import React, { useState } from 'react';
import { BEST } from '../images';

// Başlangıçta mobil için kaç ürün gösterileceği
const INITIAL_PRODUCTS_COUNT = 4;
// Her seferinde kaç ürün daha ekleneceği
const PRODUCTS_TO_LOAD = 4;

export default function Bestseller() {
  // Görünür ürün sayısını tutan state. Bu sadece mobil/tablet görünümünü etkileyecek.
  const [visibleCount, setVisibleCount] = useState(INITIAL_PRODUCTS_COUNT);

  // Stil Sabitleri
  const TITLE_COLOR = 'text-[#252B42]';
  const TEXT_COLOR = 'text-[#737373]';
  const LIGHT_TEXT_COLOR = 'text-[#BDBDBD]';
  const SUCCESS_COLOR = 'text-[#23856D]';
  const DIVIDER_COLOR = 'bg-[#ECECEC]';
  const PRIMARY_COLOR = 'text-[#23A6F0]';

  const ALL_PRODUCT_DATA = BEST.map((src, index) => ({
    id: index + 1,
    title: 'Graphic Design',
    department: 'English Department',
    oldPrice: '$16.48',
    newPrice: '$6.48',
    imageSrc: src,
  }));

  // Tüm ürünlerin gösterilip gösterilmediğini kontrol et (Mobilde düğmenin görünmesi için)
  const hasMore = visibleCount < ALL_PRODUCT_DATA.length;

  // Daha fazla ürün yükleme işlevi
  const handleLoadMore = () => {
    setVisibleCount(prevCount =>
      Math.min(prevCount + PRODUCTS_TO_LOAD, ALL_PRODUCT_DATA.length)
    );
  };

  // Ürün Kartı Bileşeni (Aynı kaldı)
  const ProductCard = ({ product }) => (
    <div className="flex flex-col w-full max-w-[348px] lg:max-w-[238px] bg-white rounded-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="w-full h-[427px] lg:h-[280px] overflow-hidden">
        <img
          src={product.imageSrc}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col items-center text-center p-6 space-y-2 flex-grow">
        <h3 className={`${TITLE_COLOR} text-base font-bold tracking-[0.1px]`}>
          {product.title}
        </h3>
        <p className={`${TEXT_COLOR} text-sm font-bold tracking-[0.2px]`}>
          {product.department}
        </p>
        <div className="flex space-x-2 pt-2">
          <span className={`${LIGHT_TEXT_COLOR} text-base font-bold`}>
            {product.oldPrice}
          </span>
          <span className={`${SUCCESS_COLOR} text-base font-bold`}>
            {product.newPrice}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full font-['Montserrat'] bg-[#FAFAFA] flex justify-center py-20">
      <div className="w-full max-w-[1440px] px-6 md:px-12 lg:px-48">
        {/* Başlık ve Çizgi (Değişmedi) */}
        <h2
          className={`${TITLE_COLOR} text-[24px] font-bold leading-[32px] tracking-[0.1px] mb-8 text-center lg:text-left`}
        >
          BESTSELLER PRODUCTS
        </h2>
        <div
          className={`w-full max-w-[1042px] h-[2px] ${DIVIDER_COLOR} mx-auto mb-16`}
        ></div>

        {/* --- ÜRÜN IZGARASI --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-10 justify-items-center">
          {ALL_PRODUCT_DATA.map((product, index) => {
            // Mobil görünürlük kontrolü
            const isHiddenOnMobile = index >= visibleCount;

            return (
              <div
                key={product.id}
                // Mobilde gizle, ancak large (lg) ve üzeri ekranlarda tekrar göster.
                // sm:block ekleyerek tabletlerde de default olarak görünmesini sağlıyoruz.
                className={`
                  w-full flex justify-center
                  ${isHiddenOnMobile ? 'hidden lg:block' : ''}
                `}
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>

        {/* --- DAHA FAZLA YÜKLE DÜĞMESİ --- */}
        {/* lg:hidden: Düğmeyi sadece mobil ve tablet ekranlarda göster (large'da gizle) */}
        {hasMore && (
          <div className="flex justify-center mt-12 lg:hidden">
            <button
              onClick={handleLoadMore}
              className={`
                border border-[2px] border-[#23A6F0] rounded-[5px]
                ${PRIMARY_COLOR} text-sm font-bold tracking-[0.2px]
                px-10 py-3 transition-colors hover:bg-[#23A6F0] hover:text-white
              `}
            >
              LOAD MORE PRODUCTS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
