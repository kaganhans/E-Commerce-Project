import Container from "./Container";
import { PRODUCTS } from "../images";
import { imgErr } from "../utils/imgErr";
import { useState } from "react";

// Eğer PRODUCTS tanımlı değilse, placeholder array (10 ürün)
const defaultProducts = Array(10).fill('/placeholder-product.jpg');

export default function ProductGrid() {
  const productsToUse = PRODUCTS || defaultProducts;
  const [visibleCount, setVisibleCount] = useState(5); // Başlangıçta 5 ürün göster
  
  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 5); // Her tıklamada 5 ürün daha ekle
  };

  const hasMoreProducts = visibleCount < productsToUse.length;
  
  return (
    <section className="py-12">
      <Container>
        {/* Başlık Alanı */}
        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <span className="text-sm text-[#737373] tracking-[0.2px]">Featured Products</span>
          {/* MASAÜSTÜ: Tek satır, MOBİL: İki satır */}
          <h2 className="text-[28px] md:text-2xl font-bold tracking-[0.1px] leading-[30px]">
            <span className="md:hidden">BESTSELLER<br />PRODUCTS</span>
            <span className="hidden md:inline">BESTSELLER PRODUCTS</span>
          </h2>
          <p className="text-sm text-[#737373] max-w-[347px] tracking-[0.2px] leading-[20px]">
            Problems trying to resolve<br className="md:hidden" /> the conflict between
          </p>
        </div>

        {/* MASAÜSTÜ GÖRÜNÜM - Yedek dosya stilinde (5 sütun) */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {productsToUse.map((src, idx) => (
            <article key={`desktop-${idx}`} className="flex flex-col w-[183px] h-[400px]">
              <div className="h-[235px] flex items-center justify-center bg-gray-50">
                <img 
                  src={src} 
                  alt={`product-${idx+1}`} 
                  onError={imgErr(`PRODUCT ${idx+1}`)} 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>
              <div className="flex flex-col gap-1 mt-3 p-4 flex-1 justify-center">
                <h4 className="text-base font-bold text-center leading-6 tracking-[0.1px]">Graphic Design</h4>
                <p className="text-sm text-[#737373] text-center leading-6 tracking-[0.2px] mt-1">English Department</p>
                <div className="flex justify-center items-baseline gap-2 mt-2">
                  <span className="text-sm line-through text-[#BDBDBD] tracking-[0.2px]">$16.48</span>
                  <span className="text-sm text-[#23856D] font-bold tracking-[0.2px]">$6.48</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* MOBİL GÖRÜNÜM - Mevcut kodun mobil yapısı (ilk 5 + load more ile gelenler) */}
        <div className="grid md:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-[5px] md:px-0">
          {productsToUse.slice(0, visibleCount).map((src, idx) => (
            <article 
              key={`mobile-${idx}`} 
              className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow w-full"
            >
              {/* Resim Alanı */}
              <div className="h-[350px] md:h-[300px] lg:h-[320px] flex items-center justify-center bg-white p-6 border-b border-gray-100">
                <img 
                  src={src} 
                  alt={`product-${idx+1}`} 
                  onError={imgErr(`PRODUCT ${idx+1}`)} 
                  className="max-w-full max-h-full object-contain scale-125" 
                />
              </div>
              
              {/* İçerik Alanı */}
              <div className="flex flex-col gap-3 p-6 text-center">
                <h4 className="text-[18px] md:text-[16px] font-bold text-[#252B42]">
                  Graphic Design
                </h4>
                <p className="text-[16px] md:text-[14px] text-[#737373]">
                  English Department
                </p>
                <div className="flex justify-center items-baseline gap-3 mt-3">
                  <span className="text-[16px] md:text-[14px] line-through text-[#BDBDBD]">
                    $16.48
                  </span>
                  <span className="text-[16px] md:text-[14px] text-[#23856D] font-bold">
                    $6.48
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* LOAD MORE BUTTON - Sadece daha fazla ürün varsa göster */}
        {hasMoreProducts && (
          <div className="mt-8 md:mt-8 flex justify-center">
            <button 
              onClick={loadMore}
              className="h-[52px] w-[256px] rounded-md border-2 border-[#23A6F0] text-[#23A6F0] text-sm font-bold hover:bg-[#23A6F0] hover:text-white transition-colors tracking-[0.2px] leading-[22px]"
            >
              LOAD MORE PRODUCTS
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}