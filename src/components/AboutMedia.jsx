// src/components/AboutMedia.jsx
import React from "react";
import { Media } from "../images.js"; // export const Media = ["/img/video-1.png"]

export default function AboutMedia() {
  const stats = [
    { value: "15K",  label: "Happy Customers" },
    { value: "150K", label: "Monthly Visitors" },
    { value: "15",   label: "Countries Worldwide" },
    { value: "100+", label: "Top Partners" },
  ];

  const videoImg = Media?.[0] ?? "/img/video-1.png";

  return (
    <section className="w-full pt-0 pb-16 font-sans text-[#252B42]">
      <div className="mx-auto w-full px-4 md:px-8">
        {/* --------- METRICS --------- */}
        {/* Mobil: her biri 240x104 kutu (bordersız) */}
        <div className="flex flex-col items-center space-y-8 lg:hidden">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex h-[104px] w-[240px] flex-col items-center justify-center text-center"
            >
              <div className="text-[32px] leading-[40px] font-bold">{s.value}</div>
              <div className="mt-2 text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Masaüstü: sabit 1050×264 px konteyner (bordersız kartlar) */}
        <div className="hidden lg:flex w-full justify-center">
          <div className="flex h-[264px] w-[1050px] items-center justify-center">
            <div className="grid grid-cols-4 gap-x-[30px]">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="flex h-[104px] w-[240px] flex-col items-center justify-center text-center"
                >
                  <div className="text-[32px] leading-[40px] font-bold">{s.value}</div>
                  <div className="mt-2 text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --------- VIDEO --------- */}
        <div className="mt-12">
          {/* Mobil: sabit 307×316 px */}
          <div className="relative mx-auto overflow-hidden rounded-2xl shadow-lg w-[307px] h-[316px] lg:hidden">
            <img
              src={videoImg}
              alt="Brand story video"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              aria-label="Play video"
              onClick={() => console.log("Play clicked")}
              className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#2A7CC7] shadow-md transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A7CC7]/70"
            >
              <span
                className="ml-0.5 block"
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "9px solid transparent",
                  borderBottom: "9px solid transparent",
                  borderLeft: "14px solid white",
                }}
              />
            </button>
          </div>

          {/* Masaüstü: sabit 989×540 px */}
          <div className="relative mx-auto hidden overflow-hidden rounded-2xl shadow-lg lg:block w-[989px] h-[540px]">
            <img
              src={videoImg}
              alt="Brand story video"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              aria-label="Play video"
              onClick={() => console.log("Play clicked")}
              className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#2A7CC7] shadow-md transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A7CC7]/70"
            >
              <span
                className="ml-0.5 block"
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  borderLeft: "16px solid white",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
