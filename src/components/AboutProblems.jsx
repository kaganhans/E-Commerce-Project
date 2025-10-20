// src/components/AboutProblems.jsx
import React from "react";

export default function AboutProblems({
  eyebrow = "Problems trying",
  title = "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.",
  description = "Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics",
}) {
  // ----- Masaüstü başlık: 3 satır (desert | ' do ' | kalan) -----
  const FIRST_BREAK_AFTER = "desert";
  const SECOND_BREAK_TOKEN = " do ";
  let t1 = title, t2 = "", t3 = "";
  const i1 = title.indexOf(FIRST_BREAK_AFTER);
  if (i1 !== -1) {
    const cut1 = i1 + FIRST_BREAK_AFTER.length;
    const after1 = title.slice(cut1);
    const i2rel = after1.indexOf(SECOND_BREAK_TOKEN);
    if (i2rel !== -1) {
      const cut2 = cut1 + i2rel + SECOND_BREAK_TOKEN.length;
      t1 = title.slice(0, cut1).trimEnd();
      t2 = title.slice(cut1, cut2).trim();
      t3 = title.slice(cut2).trimStart();
    } else {
      t1 = title.slice(0, cut1).trimEnd();
      t2 = title.slice(cut1).trimStart();
    }
  }

  // ----- Masaüstü paragraf: 'realms of' sonrası 2 satır -----
  const P_BREAK = "realms of";
  let pBefore = description, pAfter = "";
  const j = description.indexOf(P_BREAK);
  if (j !== -1) {
    const cut = j + P_BREAK.length;
    pBefore = description.slice(0, cut).trimEnd();
    pAfter = description.slice(cut).trimStart();
  }

  return (
    <section className="w-full font-sans bg-white">
      {/* --------- MOBİL --------- */}
      <div className="block sm:hidden px-6 pt-6 pb-12 text-center">
        {/* Eyebrow */}
        <p className="mb-6 text-[16px] leading-[24px] tracking-[0.2px] text-[#E74040]">
          {eyebrow}
        </p>

        {/* Başlık: mobilde 4 satır */}
        <h3 className="text-[#252B42] font-bold tracking-[0.1px] text-[32px] leading-[42px]">
          <span className="block">Met minim Mollie non</span>
          <span className="block">desert Alamo est sit</span>
          <span className="block">cliquey dolor do met</span>
          <span className="block">sent.</span>
        </h3>

        {/* Paragraf: tam istediğin 3 satır */}
        <p className="mt-10 mx-auto max-w-[360px] text-[#737373] text-[16px] leading-[24px] tracking-[0.2px]">
          <span className="block">Problems trying to resolve the conflict</span>
          <span className="block">between the two major realms of</span>
          <span className="block">Classical physics: Newtonian mechanics</span>
        </p>
      </div>

      {/* --------- MASAÜSTÜ --------- */}
      <div className="hidden sm:grid w-full place-content-center">
        {/* 1440×236 kanvas, iki eşit kolon */}
        <div className="w-[1440px] h-[236px] grid grid-cols-[720px_720px] items-center">
          {/* Sol sütun */}
          <div className="pl-[228px]">
            <p className="mb-3 text-[14px] leading-[20px] tracking-[0.2px] text-[#E74040]">
              {eyebrow}
            </p>
            <h3 className="max-w-[560px] text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42]">
              {i1 === -1 ? (
                title
              ) : (
                <>
                  <span className="whitespace-nowrap">{t1}</span>
                  <br />
                  <span className="whitespace-nowrap">{t2}</span>
                  {t3 && (
                    <>
                      <br />
                      <span className="whitespace-nowrap">{t3}</span>
                    </>
                  )}
                </>
              )}
            </h3>
          </div>

          {/* Sağ sütun */}
          <div className="pr-[228px]">
            <p className="max-w-[560px] text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
              {j === -1 ? (
                description
              ) : (
                <>
                  <span className="whitespace-nowrap">{pBefore}</span>
                  <br />
                  <span>{pAfter}</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
