import React from 'react';
import { ICONS } from '../images'; 

export default function ContactLests() {
  return (
    <div className="w-full font-['Montserrat'] bg-white flex flex-col items-center text-center px-6 pt-0 pb-16 lg:pb-20 max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center text-center w-full">
        
        {/* Ok İkonu - Üstte daha fazla boşluk */}
        <div className="mb-12 lg:mb-16">
          <img
            src={ICONS.arrow}
            alt="Arrow down"
            className="w-[70px] lg:w-[90px] h-auto"
          />
        </div>

        {/* Üst Metin - Daha fazla margin */}
        <p className="text-[#252B42] font-bold text-[16px] leading-[24px] tracking-[0.1px] mb-6 lg:mb-8">
          WE Can't WAIT TO MEET YOU
        </p>

        {/* Başlık - Responsive boyutlar ve fazla margin */}
        <h1 className="text-[#252B42] font-bold text-[40px] sm:text-[50px] lg:text-[58px] leading-[80px] tracking-[0.2px] mb-6 lg:mb-8 px-4">
          Let's Talk
        </h1>

        {/* Buton - Daha fazla üst boşluk */}
        <button className="w-[186px] h-[52px] bg-[#23A6F0] text-white font-bold text-[14px] leading-[22px] tracking-[0.2px] rounded-[5px] hover:bg-[#1a85c8] transition-all shadow-md hover:shadow-lg">
          Try it free now
        </button>
      </div>
    </div>
  );
}