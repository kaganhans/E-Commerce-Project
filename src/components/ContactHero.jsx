// components/ContactHero.jsx
import React from "react";
import { CONTACT, SOCIAL_ICONS } from "../images.js";

export default function ContactHero() {
  const SOCIAL_ICONS_LIST = [
    { src: SOCIAL_ICONS.contwiter,  alt: "Twitter" },
    { src: SOCIAL_ICONS.contface,   alt: "Facebook" },
    { src: SOCIAL_ICONS.contins,    alt: "Instagram" },
    { src: SOCIAL_ICONS.contlinked, alt: "LinkedIn" },
  ];

  return (
    <section className="w-full bg-white font-['Montserrat'] flex justify-center">
      <div className="w-full mx-auto">
        {/* ===== MOBİL (lg altı) ===== */}
        <div className="lg:hidden w-full flex justify-center pt-0 pb-0">
          <div className="w-full mx-auto flex flex-col min-h-[500px]">
            <div className="w-full flex flex-col justify-center px-6 py-10 flex-shrink-0 z-20 text-center">
              <div className="w-full flex flex-col items-center justify-center mx-auto">
                <p className="text-[#252B42] text-[14px] font-bold leading-[24px] mb-8">
                  CONTACT US
                </p>

                <h1 className="text-[#252B42] text-[40px] font-bold leading-[50px] tracking-[0.2px] mb-6 max-w-[331px]">
                  Get in touch <br /> today!
                </h1>

                <p className="text-[#737373] text-[20px] leading-[30px] tracking-[0.2px] mb-10 max-w-[277px]">
                  We know how large <br />
                  objects will act, but things <br />
                  on a small scale just do <br />
                  not act that way.
                </p>

                <p className="text-[#252B42] text-[24px] font-bold leading-[32px] tracking-[0.1px] mb-1">
                  Phone : <span className="text-inherit">+451 215 215</span>
                </p>
                <p className="text-[#252B42] text-[24px] font-bold leading-[32px] tracking-[0.1px] mb-10">
                  Fax : <span className="text-inherit">+451 215 215</span>
                </p>

                <div className="flex space-x-5 justify-center w-[242px] h-[50px] mb-6">
                  {SOCIAL_ICONS_LIST.map((icon, index) => (
                    <img
                      key={index}
                      src={icon.src}
                      alt={icon.alt}
                      className="w-[30px] h-[30px] cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobil görsel */}
            <div className="w-full flex justify-center items-end relative h-auto mt-10">
              <img
                src={CONTACT[1]} // mobil görsel
                alt="İletişim Görseli"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* ===== MASAÜSTÜ (lg ve üstü) ===== */}
        <div className="hidden lg:flex w-full justify-center pb-16">
          {/* Kart oranı: 1292×619 */}
          <div className="w-full max-w-[1292px] mx-auto relative">
            <div className="relative w-full aspect-[1292/619] overflow-visible">
              {/* Grid: sol 599px, sağ 1fr */}
              <div className="absolute inset-0 grid grid-cols-[599px,1fr]">
                
                {/* SOL KOLON — ALTA SABİT + alttan 100px boşluk */}
                <div className="flex items-end">
                  <div className="w-full max-w-[599px] pl-[206px] pr-0 pb-[30px]">
                    {/* Dikey istif: bağlı aralıklar */}
                    <div className="flex flex-col gap-[32px]">
                      
                      {/* Üst etiket */}
                      <p className="text-[#252B42] text-[16px] font-bold leading-[24px]">
                        CONTACT US
                      </p>

                      {/* Başlık */}
                      <h1 className="text-[#252B42] text-[58px] font-bold leading-[80px] tracking-[0.2px] max-w-[520px]">
                        Get in touch <br /> today!
                      </h1>

                      {/* Açıklama */}
                      <p className="text-[#737373] text-[20px] leading-[30px] tracking-[0.2px] max-w-[480px]">
                        We know how large objects will act, <br />
                        but things on a small scale
                      </p>

                      {/* İletişim satırları */}
                      <div className="flex flex-col gap-[16px]">
                        <p className="text-[#252B42] text-[24px] font-bold leading-[32px] tracking-[0.1px]">
                          Phone : <span className="text-inherit">+451 215 215</span>
                        </p>
                        <p className="text-[#252B42] text-[24px] font-bold leading-[32px] tracking-[0.1px]">
                          Fax : <span className="text-inherit">+451 215 215</span>
                        </p>
                      </div>

                      {/* Sosyal ikon satırı */}
                      <div className="flex items-center w-[242px] justify-between">
                        {SOCIAL_ICONS_LIST.map((icon, i) => (
                          <img key={i} src={icon.src} alt={icon.alt} className="w-[30px] h-[30px]" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SAĞ GÖRSEL — onayladığın ölçü/pozisyon */}
                <div className="relative overflow-visible">
                  <img
                    src={CONTACT[0]} // masaüstü görsel
                    alt="İletişim Görseli"
                    loading="eager"
                    decoding="async"
                    width={571}
                    height={780}
                    className="absolute bottom-0 right-[100px] h-[630px] w-auto object-cover"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* ===== /MASAÜSTÜ ===== */}
      </div>
    </section>
  );
}
