// src/components/AboutHero.jsx
import React from "react";
import { AboHero } from "../images.js";

export default function AboutHero() {
  const DESKTOP_IMG = AboHero?.[0] ?? "/img/About-Hero.png";
  const MOBILE_IMG  = AboHero?.[1] ?? "/img/About-Hero-mobil.png";

  return (
    <section className="w-full bg-white font-['Montserrat'] pt-0">
      {/* ====== MOBİL (lg altı) – SADECE AboHero[1] ====== */}
      <div className="lg:hidden w-full flex flex-col items-center justify-center py-8">
        {/* Metin */}
        <div className="w-full max-w-[418px] px-4 flex flex-col items-center text-center">
          <h1 className="text-[#252B42] text-[28px] font-extrabold leading-[36px] tracking-[0.2px] w-full">
            ABOUT US
          </h1>

          <p className="mt-4 text-[#737373] text-[16px] leading-[24px] tracking-[0.2px] w-full">
            <span className="block">We know how large</span>
            <span className="block">objects will act, but things</span>
            <span className="block">on a small scale just do</span>
            <span className="block">not act that way.</span>
          </p>

          <button
            type="button"
            className="mt-6 inline-flex h-[52px] w-[193px] items-center justify-center rounded-[12px]
                       bg-[#2A7CC7] text-white font-bold text-[16px] leading-[24px] tracking-[0.2px] shadow-sm"
          >
            Get Quote Now
          </button>
        </div>

        {/* Görsel – mobil */}
        <div className="w-full max-w-[418px] px-4 mt-24">
          <img
            src={MOBILE_IMG}
            alt="About hero (mobile)"
            className="w-full h-auto object-contain"
            loading="eager"
            decoding="async"
            width={418}
            height={590}
            sizes="(max-width: 1024px) 418px, 720px"
          />
        </div>
      </div>

      {/* ====== MASAÜSTÜ (lg ve üstü) – SADECE AboHero[0] ====== */}
      <div className="hidden lg:flex w-full justify-center pb-16">
        <div className="w-full max-w-[1292px] mx-auto relative">
          <div className="relative w-full lg:h-[640px] xl:h-[720px]">
            <img
              src={DESKTOP_IMG}
              alt="About hero (desktop)"
              loading="eager"
              decoding="async"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto object-contain z-10"
            />

            <div className="absolute inset-0 grid grid-cols-[599px,1fr] z-20">
              <div className="flex items-center">
                <div className="w-full max-w-[599px] pl-[206px] pr-0">
                  <div className="flex flex-col gap-[24px]">
                    <p className="text-[#252B42] text-[16px] font-bold leading-[24px] tracking-[0.1px]">
                      ABOUT COMPANY
                    </p>
                    <h1 className="text-[#252B42] text-[58px] font-bold leading-[80px] tracking-[0.2px] max-w-[520px]">
                      ABOUT US
                    </h1>
                    <p className="text-[#737373] text-[20px] leading-[30px] tracking-[0.2px] max-w-[520px]">
                      We know how large objects will act, <br />
                      but things on a small scale
                    </p>
                    <button
                      type="button"
                      className="inline-flex h-[52px] w-[193px] items-center justify-center rounded-[12px]
                                 bg-[#2A7CC7] text-white font-bold text-[16px] leading-[24px] tracking-[0.2px] shadow-sm"
                    >
                      Get Quote Now
                    </button>
                  </div>
                </div>
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
      {/* ====== /MASAÜSTÜ ====== */}
    </section>
  );
}
