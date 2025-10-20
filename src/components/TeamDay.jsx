// components/TeamDay.jsx
import React from "react";

export const SOCIAL_ICONS = {
  facebook: "/img/facebook.png",
  instagram: "/img/instagram.png",
  twitter: "/img/twitter.png",
  contlinked: "/img/Cont-linkedin.png",
};

const SocialIcons = () => (
  <div className="flex justify-center gap-8 mt-10 sm:mt-12">
    <img src={SOCIAL_ICONS.twitter}    alt="Twitter"  className="w-8 h-8 object-contain" />
    <img src={SOCIAL_ICONS.facebook}   alt="Facebook" className="w-8 h-8 object-contain" />
    <img src={SOCIAL_ICONS.instagram}  alt="Instagram"className="w-8 h-8 object-contain" />
    <img src={SOCIAL_ICONS.contlinked} alt="LinkedIn" className="w-8 h-8 object-contain" />
  </div>
);

const TeamDay = () => {
  return (
    <section className="w-full bg-white font-['Montserrat'] flex justify-center py-14 sm:py-16 lg:py-20">
      <div className="w-full text-center px-6 sm:px-8 max-w-[640px] lg:max-w-[980px] mx-auto">

        {/* Başlık — 700 / 40px / 50px / 0.2px */}
        <h2 className="mx-auto mb-8 text-[#252B42] font-bold tracking-[0.2px] text-[40px] leading-[50px]">
          Start your
          <br className="lg:hidden" />  14 days free trial
        </h2>

        {/* Paragraf — 400 / 14px / 20px / 0.2px */}
        <p
          className="
            mx-auto mb-10
            text-[#737373] font-normal tracking-[0.2px]
            text-[14px] leading-[20px]
            max-w-[330px] sm:max-w-[420px] lg:max-w-[740px]
          "
        >
          Met minim Mollie non desert Alamo est sit cliquey dolor
          {/* ↓ Masaüstünde 'dolor'dan sonra satır kır */}
          <br className="hidden lg:block" />
          {" "}do met sent. RELIT official consequent.
        </p>

        {/* Buton */}
        <a
          href="#"
          className="
            inline-flex items-center justify-center
            bg-[#23A6F0] text-white font-bold tracking-[0.2px]
            text-[14px] leading-[22px]
            rounded-[8px]
            h-[56px] px-10 w-full max-w-[300px] mx-auto
            hover:opacity-90 transition
          "
        >
          Try it free now
        </a>

        <SocialIcons />
      </div>
    </section>
  );
};

export default TeamDay;
