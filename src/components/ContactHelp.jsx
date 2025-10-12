// components/ContactHelp.jsx

import React from 'react';
// ICONS objesi images.js dosyasından import ediliyor
import { ICONS } from '../images'; 

// İkon rengi için kullanacağımız mavi renk kodu
const PRIMARY_BLUE = "#23A6F0";

const HELP_CARDS = [
    {
        // Sol Kart (Telefon ikonu)
        titleLine1: "georgia.young@example.com",
        titleLine2: "georgia.young@ple.com",
        supportText: "Get Support",
        buttonText: "Submit Request",
        iconSrc: ICONS.tel, 
        isPrimary: false, 
    },
    {
        // Orta (Koyu) Kart (Konum ikonu)
        titleLine1: "georgia.young@example.com",
        titleLine2: "georgia.young@ple.com",
        supportText: "Get Support",
        buttonText: "Submit Request",
        iconSrc: ICONS.knm, 
        isPrimary: true, // Koyu arka plan için
    },
    {
        // Sağ Kart (Mail ikonu)
        titleLine1: "georgia.young@example.com",
        titleLine2: "georgia.young@ple.com",
        supportText: "Get Support",
        buttonText: "Submit Request",
        iconSrc: ICONS.mail, 
        isPrimary: false,
    },
];


const HelpCard = ({ titleLine1, titleLine2, supportText, buttonText, iconSrc, isPrimary }) => {
    
    // Kart Yüksekliği Düzeltildi: Masaüstünde (lg:) tüm kartlar 403px yüksekliğinde.
    const cardClasses = isPrimary 
        ? "bg-[#252B42] text-white p-10 lg:p-[50px] shadow-xl flex flex-col items-center justify-center w-full max-w-[327px] h-[333px] lg:h-[403px] transition-all duration-300 relative"
        : "bg-white text-[#252B42] p-10 lg:p-[50px] flex flex-col items-center justify-center w-full max-w-[328px] h-[333px] lg:max-w-[328px] lg:h-[403px] transition-all duration-300 hover:shadow-xl";
    
    const titleClasses = "text-[16px] font-bold leading-[24px] tracking-[0.1px] mb-1 text-center";
    const supportClasses = "text-[16px] font-bold leading-[24px] tracking-[0.1px] mb-4 text-center";
    
    const buttonClasses = isPrimary 
        ? "text-[#23A6F0] border-[#23A6F0] bg-transparent hover:bg-[#23A6F0] hover:text-white font-medium"
        : "text-[#23A6F0] border-[#23A6F0] bg-white hover:bg-[#23A6F0] hover:text-white font-bold";

    return (
        <div className={`text-center ${cardClasses}`}>
            <img 
                src={iconSrc} 
                alt={supportText} 
                className="w-[72px] h-[72px] mb-8"
                style={{ 
                    // İkon rengini mavi yapmak için filtre, gerçek ikonlarınız için bu stile ihtiyacınız olmayabilir
                    filter: 'brightness(0) saturate(100%) invert(58%) sepia(89%) saturate(2595%) hue-rotate(175deg) brightness(98%) contrast(91%)'
                }}
            />

            <p className={`${titleClasses} ${isPrimary ? 'text-white' : 'text-[#252B42]'}`}>
                {titleLine1}
            </p>
            {titleLine2 && (
                <p className={`${titleClasses} mb-4 ${isPrimary ? 'text-white' : 'text-[#252B42]'}`}>
                    {titleLine2}
                </p>
            )}

            <p className={`${supportClasses} ${isPrimary ? 'text-white' : 'text-[#252B42]'}`}>
                {supportText}
            </p>
            
            <button 
                className={`
                    mt-4 
                    
                    // Mobil Ölçüler (Metin taşması için sabit genişlik kaldırıldı)
                    py-[10px] px-[20px] 
                    border border-solid rounded-[5px] 
                    h-[44px] 
                    
                    // Masaüstü (lg) Ölçüleri
                    lg:py-3 lg:px-6 
                    lg:border-2 lg:rounded-full 
                    lg:w-[193px] lg:h-[54px] 
                    
                    no-underline focus:outline-none focus:ring-2 focus:ring-[#23A6F0] focus:ring-offset-2
                    transition-colors ${buttonClasses} 
                    
                    // Metin Stilleri (line-height 24px) ve Tek Satır Güvenliği
                    text-[14px] font-bold leading-[24px] tracking-[0.2px] 
                    whitespace-nowrap 
                `}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default function ContactHelp() {
    return (
        <div className="w-full font-['Montserrat'] bg-[#FAFAFA] lg:bg-white flex flex-col items-center text-center py-20 md:py-24 lg:pt-10 lg:pb-40">
            
            <div className="max-w-[650px] mb-16 px-6">
                <p className="text-[#252B42] text-[14px] font-bold leading-[24px] tracking-[0.2px] mb-3">
                    VISIT OUR OFFICE
                </p>
                
                <h2 className="text-[#252B42] text-[40px] font-bold leading-[50px] tracking-[0.2px]">
                    We help small businesses <br />
                    with big ideas
                </h2>
            </div>

            <div className="w-full max-w-[1074px] mx-auto flex flex-col lg:flex-row justify-center items-center lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-[30px] px-6">
                {HELP_CARDS.map((card, index) => (
                    <HelpCard 
                        key={index} 
                        {...card} 
                    />
                ))}
            </div>
        </div>
    );
}