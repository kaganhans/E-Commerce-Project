import Container from "./Container";
import { LOVE } from "../images";
import { imgErr } from "../utils/imgErr";

export default function LoveSection() {
  return (
    <section className="py-16 bg-white">
      <Container>
        {/* Masaüstü: Resimler SOLDA - İçerik SAĞDA | Mobil: İçerik ÜSTTE - Resimler ALTA */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8">
          
          {/* RESİMLER - Masaüstü: Sol | Mobil: Alt */}
          <div className="flex-1 flex gap-4 lg:gap-6 justify-center lg:justify-start order-2 lg:order-1">
            <img 
              src={LOVE[0]} 
              alt="happy-1" 
              onError={imgErr("LOVE 1")} 
              className="w-[158px] h-[363px] lg:w-[217px] lg:h-[495px] object-cover rounded-[8px]"
            />
            <img 
              src={LOVE[1]} 
              alt="happy-2" 
              onError={imgErr("LOVE 2")} 
              className="w-[204px] h-[363px] lg:w-[280px] lg:h-[498px] object-cover rounded-[8px]"
            />
          </div>
          
          {/* İÇERİK - Masaüstü: Sağ | Mobil: Üst */}
          <div className="flex-1 flex flex-col justify-center gap-6 order-1 lg:order-2">
            {/* FEATURED PRODUCTS */}
            <span className="text-sm font-bold text-[#23A6F0] tracking-widest uppercase">
              FEATURED PRODUCTS
            </span>
            
            {/* We love what we do - Mobilde iki satır, masaüstünde tek satır */}
            <h3 className="text-[40px] font-bold text-[#252B42] leading-[50px] tracking-[0.2px] lg:tracking-normal">
              <span className="lg:hidden">We love<br />what we do</span>
              <span className="hidden lg:inline">We love what we do</span>
            </h3>
            
            {/* AÇIKLAMA - Mobilde küçük font, masaüstünde normal font */}
            <div className="flex flex-col gap-6 text-[#737373]">
              {/* Mobil: Küçük font ve satırlara bölünmüş */}
              <div className="lg:hidden">
                <div className="text-[14px] leading-[20px] tracking-[0.2px] font-normal">
                  <div>Problems trying to resolve the</div>
                  <div>conflict between the two major</div>
                  <div>realms of Classical physics:</div>
                  <div>Newtonian mechanics</div>
                </div>
              </div>
              
              {/* Masaüstü: Normal font ve paragraf */}
              <div className="hidden lg:block">
                <p className="text-base leading-7">
                  Problems trying to resolve the conflict between 
                  the two major realms of Classical physics: 
                  Newtonian mechanics.
                </p>
              </div>

              {/* Mobil: Küçük font ve satırlara bölünmüş */}
              <div className="lg:hidden">
                <div className="text-[14px] leading-[20px] tracking-[0.2px] font-normal">
                  <div>Problems trying to resolve the</div>
                  <div>conflict between the two major</div>
                  <div>realms of Classical physics:</div>
                  <div>Newtonian mechanics</div>
                </div>
              </div>
              
              {/* Masaüstü: Normal font ve paragraf */}
              <div className="hidden lg:block">
                <p className="text-base leading-7">
                  Problems trying to resolve the conflict between 
                  the two major realms of Classical physics; 
                  Newtonian mechanics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}