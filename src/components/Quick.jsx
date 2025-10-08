// src/components/Quick.jsx

import React, { useState } from 'react';
// >>> NOT: Lütfen kendi projenizdeki doğru import yollarını kullanın <<<
// Varsayalım ki 'images' dosyasından QUICK dizisi içeriği geliyor.
import { QUICK } from '../images'; 

// Bileşendeki sekme isimleri
const TABS = [
    { name: "Description", count: null },
    { name: "Additional Information", count: null },
    { name: "Reviews", count: 0 },
];

const QUICK_IMAGE_PATH = QUICK[0]; 

export default function Quick() {
    const [activeTab, setActiveTab] = useState('Description');
    
    // Genel metin stilleri
    const TEXT_COLOR = 'text-[#737373]'; 
    const TITLE_COLOR = 'text-[#252B42]'; 

    // Açıklama metni sabiti
    const DESCRIPTION_TEXT = "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.";
    
    // Tekrarlayan madde işareti öğesi
    const ListItem = ({ item }) => (
        <li className="flex items-start">
            {/* Oku işareti: Metinle aynı renk (#737373) */}
            <span className={`w-4 h-4 mt-[5px] mr-2 ${TEXT_COLOR} font-bold`}>{'>'}</span> 
            <span className={`${TEXT_COLOR} text-[14px] font-bold leading-[24px] tracking-[0.2px]`}>
                the quick fox jumps over the {item}
            </span>
        </li>
    );

    const renderContent = () => {
        if (activeTab !== 'Description') {
            return (
                <div className="py-12 text-center text-lg text-gray-500">
                    {activeTab} içeriği buraya gelecek.
                </div>
            );
        }

        // --- DESCRIPTION (AÇIKLAMA) SEKME İÇERİĞİ ---
        
        // Ana Konteyner: Mobil cihazlarda tam genişlik, büyük ekranlarda max 1056px
        // Mobil tasarımda içerik ortalanmalı, bu yüzden mx-auto kalır.
        return (
            <div className="w-full max-w-[1056px] mx-auto flex flex-col lg:flex-row gap-8 py-12">
                
                {/* SOL KISIM: GÖRSEL */}
                {/* Mobilde tam genişlik (w-full), içerik ortalanır. */}
                <div className="flex-shrink-0 w-full lg:w-[332px] flex justify-center lg:justify-start">
                    {/* Görselin max genişliğini 332px olarak sınırlıyoruz. */}
                    <div className="w-full max-w-[332px] h-[392px] rounded-lg overflow-hidden">
                        <img 
                            src={QUICK_IMAGE_PATH} 
                            alt="Açıklama Görseli"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* SAĞ KISIM: METİN BLOKLARI (lg:flex-row yapısı masaüstünü korur) */}
                {/* Mobilde varsayılan olarak dikey (flex-col) olacaktır. */}
                <div className="flex flex-col lg:flex-row gap-8 w-full">
                    
                    {/* BİRİNCİ KOLON: PARAGRAFLAR */}
                    {/* Mobilde w-full, içerik max 332px genişliğinde ortalanır. */}
                    <div className="flex-shrink-0 w-full lg:w-[332px] max-w-[332px] mx-auto lg:mx-0"> 
                        
                        <h2 className={`${TITLE_COLOR} text-[24px] font-bold leading-[32px] tracking-[0.1px] mb-8`}>
                            the quick fox jumps over
                        </h2>

                        <div className="flex flex-col space-y-4 w-full">
                            {/* Paragraflar (3 adet) */}
                            {[...Array(3)].map((_, index) => (
                                <p key={index} className={`${TEXT_COLOR} text-[14px] font-normal leading-[20px] tracking-[0.2px]`}>
                                    {DESCRIPTION_TEXT}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* İKİNCİ KOLON: MADDELER */}
                    {/* Mobilde w-full, içerik max 332px genişliğinde ortalanır. */}
                    <div className="w-full max-w-[332px] mx-auto lg:mx-0">
                        
                        {/* Maddeler Bloğu 1 */}
                        <h3 className={`${TITLE_COLOR} text-[24px] font-bold leading-[32px] tracking-[0.1px] mb-6`}>
                            the quick fox jumps over
                        </h3>
                        <ul className="space-y-4 mb-10">
                            {['lazy dog', 'lazy dog', 'lazy dog', 'lazy dog'].map((item, index) => (
                                <ListItem key={index} item={item} />
                            ))}
                        </ul>
                        
                        {/* Maddeler Bloğu 2 */}
                        <h3 className={`${TITLE_COLOR} text-[24px] font-bold leading-[32px] tracking-[0.1px] mb-6`}>
                            the quick fox jumps over
                        </h3> 
                        <ul className="space-y-4">
                            {['lazy dog', 'lazy dog', 'lazy dog'].map((item, index) => (
                                <ListItem key={index} item={item} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full font-['Montserrat'] bg-white flex justify-center pt-24 pb-12">
            
            <div className="w-full max-w-[1440px] px-6 md:px-12 lg:px-48">
                
                {/* --- SEKME NAVİGASYONU --- */}
                <div className="flex justify-center border-b border-[#ECECEC] mb-12">
                    {TABS.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`
                                ${TEXT_COLOR} text-[14px] leading-[24px] tracking-[0.2px] 
                                pb-4 px-6 md:px-10 transition-colors
                                
                                ${activeTab === tab.name 
                                    ? `font-semibold text-[#23A6F0]` 
                                    : `font-bold hover:text-[#23A6F0]` 
                                }
                            `}
                        >
                            {tab.name}
                            {tab.count !== null && 
                                <span 
                                    className={`ml-1 font-bold ${tab.name === 'Reviews' ? 'text-[#23856D]' : TEXT_COLOR}`}
                                >
                                    ({tab.count})
                                </span>
                            }
                        </button>
                    ))}
                </div>

                {/* --- SEKME İÇERİĞİ --- */}
                {renderContent()}
            </div>
        </div>
    );
}