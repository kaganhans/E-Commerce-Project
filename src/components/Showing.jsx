// Showing.jsx (grid rx=1.5, list #737373 + 3 tik, hizalar korunuyor)

import { SHOWING, VIEWS } from '../images';
import React, { useState, useEffect } from 'react';

// ProductCard Bileşeni
const ProductCard = ({ imagePath, index }) => (
  <div className="w-full flex flex-col items-center text-center mb-10 relative">
    <img
      src={imagePath}
      alt={`Ürün ${index + 1}`}
      className="w-full h-auto object-cover"
    />
    <div className="pt-4 px-6 pb-6 bg-white w-full">
      <h3 className="text-[#252B42] text-[16px] font-bold leading-[24px] tracking-[0.1px]">
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
  </div>
);

// Sabitler
const PRODUCTS_PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(SHOWING.length / PRODUCTS_PER_PAGE);

// Yardımcı (Sayfalama) sınıfları
const getPageButtonClass = (pageNumber, currentPage) =>
  `py-3 w-[45px] flex items-center justify-center h-[50px] transition-colors 
   ${currentPage === pageNumber
      ? 'bg-[#23A6F0] text-white border-0'
      : 'bg-white text-[#23A6F0] border-l border-r border-[#ECECEC] hover:bg-gray-50'
    }`;

const getNavigationButtonClass = (isActive) =>
  `py-3 px-5 transition-colors h-[50px] 
   ${isActive
      ? 'text-[#23A6F0] bg-white hover:bg-gray-50'
      : 'text-[#BDBDBD] bg-white hover:bg-gray-50'
   }`;

export default function Showing() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 640);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= TOTAL_PAGES) setCurrentPage(page);
  };

  // Ürün dilimleme
  let startIndex, endIndex;
  let productsToShow = SHOWING;

  const showingText = `Showing all ${SHOWING.length} results`;

  if (isMobile) {
    startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    endIndex = startIndex + PRODUCTS_PER_PAGE;
    productsToShow = SHOWING.slice(startIndex, endIndex);
  }

  return (
    <div className="w-full font-['Montserrat'] bg-white flex justify-center">
      <div className="w-full max-w-[1440px] px-6 md:px-12 lg:px-48 py-5">
        {/* --- 1. FİLTRE VE SONUÇ ÇUBUĞU --- */}
        <div className="flex flex-col md:flex-row md:h-[58px] items-center md:justify-start justify-center gap-6 md:gap-0 text-[#737373] mb-8">
          
          {/* Sol: Showing */}
          <div className="text-[14px] font-bold leading-[24px] tracking-[0.2px] mb-4 md:mb-0 text-[#252B42] w-full text-center md:w-auto md:text-left shrink-0">
            {showingText}
          </div>

          {/* Orta: Views — soluna 260px */}
          <div className="flex items-center gap-3 w-auto shrink-0 md:ml-[260px]">
            <span className="text-[14px] font-bold leading-[24px] tracking-[0.2px] text-[#252B42]">
              Views:
            </span>

            <div className="flex items-center gap-3">
              {/* Grid (aktif) — köşeleri yuvarlatılmış dolu kareler */}
              <button
                type="button"
                aria-pressed="true"
                className="w-10 h-10 flex items-center justify-center border border-[#ECECEC] rounded-[5px] bg-white hover:bg-gray-50 focus:outline-none"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4"  y="4"  width="6" height="6" rx="1.5" fill="#000000" />
                  <rect x="14" y="4"  width="6" height="6" rx="1.5" fill="#000000" />
                  <rect x="4"  y="14" width="6" height="6" rx="1.5" fill="#000000" />
                  <rect x="14" y="14" width="6" height="6" rx="1.5" fill="#000000" />
                </svg>
              </button>

              {/* List (pasif) — #737373, solda 3 nokta + sağda 3 çizgi + 3 tik */}
              <button
                type="button"
                aria-pressed="false"
                className="w-10 h-10 flex items-center justify-center border border-[#ECECEC] rounded-[5px] bg-white hover:bg-gray-50 focus:outline-none"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  
                  {/* sağdaki kısa çizgiler */}
                  <rect x="10" y="6.5"  width="9" height="2" rx="1" fill="#737373" />
                  <rect x="10" y="11"   width="9" height="2" rx="1" fill="#737373" />
                  <rect x="10" y="15.5" width="9" height="2" rx="1" fill="#737373" />
                  {/* üç satıra tik */}
                  <path d="M4.6 6.8 L6.0 8.2 L8.4 5.8"  stroke="#737373" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M4.6 11.3 L6.0 12.7 L8.4 10.3" stroke="#737373" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M4.6 15.8 L6.0 17.2 L8.4 14.8" stroke="#737373" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sağ: Popularity + Filter — soluna 230px */}
          <div className="flex w-full sm:w-auto justify-center md:ml-[230px] space-x-[20px]">
            <select className="h-[50px] px-3 py-1.5 border border-[#BDBDBD] rounded bg-white text-[14px] font-bold leading-[24px] tracking-[0.2px] w-[141px] flex-shrink-0">
              <option>Popularity</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
            </select>
            <button className="h-[50px] bg-[#23A6F0] text-white text-[14px] font-bold leading-[24px] tracking-[0.2px] py-1.5 px-4 rounded hover:bg-opacity-80 transition-colors w-[94px] flex-shrink-0">
              Filter
            </button>
          </div>
        </div>

        {/* --- 2. ÜRÜN GRİDİ --- */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 justify-items-center">
            {productsToShow.map((path, index) => (
              <ProductCard
                key={isMobile ? startIndex + index : index}
                imagePath={path}
                index={isMobile ? startIndex + index : index}
              />
            ))}
          </div>
        </div>

        {/* --- 3. SAYFALAMA --- */}
        <div className="flex justify-center mt-12">
          {isMobile ? (
            <div className="flex rounded-[5px] overflow-hidden text-[14px] font-bold leading-[24px] tracking-[0.2px] border border-[#ECECEC]">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={getNavigationButtonClass(currentPage > 1) + (currentPage === 1 ? ' cursor-not-allowed' : '')}
                disabled={currentPage === 1}
              >
                First
              </button>
              {[...Array(TOTAL_PAGES)].map((_, pageIndex) => (
                <button
                  key={pageIndex + 1}
                  onClick={() => handlePageChange(pageIndex + 1)}
                  className={getPageButtonClass(pageIndex + 1, currentPage)}
                >
                  <span className="">{pageIndex + 1}</span>
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={getNavigationButtonClass(currentPage < TOTAL_PAGES) + (currentPage === TOTAL_PAGES ? ' cursor-not-allowed' : '')}
                disabled={currentPage === TOTAL_PAGES}
              >
                Next
              </button>
            </div>
          ) : (
            <div className="flex rounded-[5px] overflow-hidden text-[14px] font-bold leading-[24px] tracking-[0.2px] border border-[#ECECEC]">
              <button className="text-[#BDBDBD] bg-white py-3 px-5 transition-colors h-[50px]">First</button>
              <button className="text-[#23A6F0] bg-white py-3 w-[45px] flex items-center justify-center transition-colors h-[50px] border-l border-r border-[#ECECEC] hover:bg-gray-50">
                <span className="">1</span>
              </button>
              <button className="bg-[#23A6F0] text-white py-3 w-[45px] flex items-center justify-center h-[50px]">
                <span className="">2</span>
              </button>
              <button className="text-[#23A6F0] bg-white py-3 w-[45px] flex items-center justify-center transition-colors h-[50px] border-l border-r border-[#ECECEC] hover:bg-gray-50">
                <span className="">3</span>
              </button>
              <button className="text-[#23A6F0] bg-white py-3 px-5 transition-colors h-[50px] hover:bg-gray-50">Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
