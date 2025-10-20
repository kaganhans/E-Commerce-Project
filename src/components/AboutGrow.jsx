// src/components/AboutGrow.jsx
import React from "react";
import { Grow } from "../images.js"; // export const Grow = ["/img/Grow-1.png"];

export default function AboutGrow() {
  const img = Grow?.[0] ?? "/img/Grow-1.png";

  return (
    <section className="w-full bg-white font-['Montserrat'] flex justify-center">
      {/* ====== DESKTOP (lg ve üstü) — 1440x640, sağ görsel 590x640 ====== */}
      <div className="hidden lg:grid w-full max-w-[1440px] h-[640px] grid-cols-[850px,590px]">
        {/* Sol mavi panel */}
        <div className="bg-[#2A7CC7] text-white flex items-center">
          <div className="w-full max-w-[520px] mx-auto px-6 sm:px-10 lg:pl-[80px]">
            {/* h5 — 16/24, 0.1px */}
            <p className="text-[16px] leading-[24px] tracking-[0.1px] font-bold mb-6">
              WORK WITH US
            </p>

            {/* h2 — 40/50, 0.2px */}
            <h2 className="font-bold text-white text-[40px] leading-[50px] tracking-[0.2px] mb-6">
              Now Let’s grow Yours
            </h2>

            {/* paragraph — 14/20, 0.2px */}
            <p className="text-white text-[14px] leading-[20px] tracking-[0.2px] mb-8 max-w-[460px]">
              The gradual accumulation of information about atomic and
              small-scale behavior during the first quarter of the 20th
              century
            </p>

            {/* Button (outlined) */}
            <button
              type="button"
              className="inline-flex items-center justify-center
                         h-[52px] px-8 rounded-md border border-white
                         text-white text-[14px] font-bold tracking-[0.2px]
                         hover:bg-white/10 transition-colors"
            >
              Button
            </button>
          </div>
        </div>

        {/* Sağ görsel 590×640 */}
        <div className="relative w-[590px] h-[640px] overflow-hidden">
          <img
            src={img}
            alt="Grow with us"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* ====== MOBILE/TABLET (lg altı) — SADECE METİN, GÖRSEL YOK ====== */}
      <div className="lg:hidden w-full bg-[#2A7CC7] text-white">
        <div className="max-w-[480px] mx-auto px-6 py-16 text-center">
          {/* h5 — 16/24 */}
          <p className="text-[16px] leading-[24px] tracking-[0.1px] font-bold mb-8">
            WORK WITH US
          </p>

          {/* h2 — 40/50, çok satır */}
          <h2 className="font-bold text-white text-[40px] leading-[50px] tracking-[0.2px] mb-8">
            Now Let’s
            <br /> grow Yours
          </h2>

          {/* paragraf — 14/20, çok satır */}
          <p className="text-white text-[14px] leading-[20px] tracking-[0.2px] mb-8">
            The gradual accumulation of<br /> information about atomic and
            <br /> small-scale behavior during the<br /> first quarter of the 20th
          </p>

          <button
            type="button"
            className="inline-flex h-[48px] px-6 items-center justify-center
                       rounded-md border border-white text-white text-[14px]
                       font-bold tracking-[0.2px] hover:bg-white/10 transition-colors"
          >
            Button
          </button>
        </div>
      </div>
    </section>
  );
}
