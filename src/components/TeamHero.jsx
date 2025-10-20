import React from 'react';

// Resim dizisinin doğru yolları kullandığından emin olun
const INNOVATION = [
    "/img/Innovation-1.png",    // 0: Masaüstü Büyük (700x530)
    "/img/Innovation-2.png",    // 1: Masaüstü Küçük 1 (361x260)
    "/img/Innovation-3.png",    // 2: Masaüstü Küçük 2
    "/img/Innovation-4.png",    // 3: Masaüstü Küçük 3
    "/img/Innovation-5.png",    // 4: Masaüstü Küçük 4
    "/img/Innovation-1_mob.png",// 5: Mobil Büyük (413x530)
    "/img/Innovation-2_mob.png",// 6: Mobil Küçük 1 (204x260)
    "/img/Innovation-3_mob.png",// 7: Mobil Küçük 2 (204x260)
    "/img/Innovation-4_mob.png",// 8: Mobil Küçük 3 (204x260)
    "/img/Innovation-5_mob.png",// 9: Mobil Küçük 4 (204x260)
];

const TeamHero = () => {
  
  // Masaüstü Boyutları (Değişmedi)
  const largeWidth = 700;
  const largeHeight = 530;
  const smallWidth = 361;
  const smallHeight = 260;
  
  // Mobil Boyutları (Yeni)
  const mobLargeWidth = 413;
  const mobLargeHeight = 530;
  const mobSmallWidth = 204;
  const mobSmallHeight = 260;
  
  // Mobil Kapsayıcı Genişliği: 413px
  const mobContainerWidth = mobLargeWidth; 

  return (
    <section className="w-full py-0 lg:py-4 bg-white flex justify-center">
        
        {/*
        ===== MASAÜSTÜ GRID YAPISI (LG ve Üstü) - Değişmedi
        */}
        <div 
          className="hidden lg:grid grid-cols-[700px_minmax(0,1fr)] gap-4 mx-auto"
          style={{ width: `${largeWidth + 16 + smallWidth * 2 + 16}px` }} 
        >
            {/* ... Masaüstü İçeriği ... */}
            {/* 1. BÜYÜK RESİM (Index: 0) */}
            <div className="overflow-hidden rounded-lg" style={{ width: `${largeWidth}px`, height: `${largeHeight}px` }}>
                <img src={INNOVATION[0]} alt="Büyük Ana Resim" className="w-full h-full object-cover" />
            </div>

            {/* 2. KÜÇÜK RESİM GRUBU (Indexler: 1, 2, 3, 4) */}
            <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="overflow-hidden rounded-lg" style={{ width: `${smallWidth}px`, height: `${smallHeight}px` }}>
                        <img src={INNOVATION[index]} alt={`Küçük Resim ${index}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>

        {/*
        ===================================================================
        ===== MOBİL YAPI (LG Altı) - YENİ PİKSEL ÖLÇÜLERİ UYGULANDI
        ===================================================================
        */}
        <div 
            className="lg:hidden flex flex-col items-center mx-auto"
            style={{ width: `${mobContainerWidth}px` }} // Mobil ana kapsayıcıyı 413px genişliğe sabitledik
        >
            {/* 1. BÜYÜK MOBİL RESİM (Index: 5) */}
            <div 
                className="w-full overflow-hidden rounded-lg mb-4"
                style={{ height: `${mobLargeHeight}px` }}
            >
                <img 
                    src={INNOVATION[5]} 
                    alt="Mobil Büyük Resim" 
                    className="w-full h-full object-cover" 
                />
            </div>
            
            {/* 2. KÜÇÜK MOBİL RESİMLER GRUBU (Grid: 2 Sütun) */}
            <div className="grid grid-cols-2 gap-4 w-full"> 
                {/* Mobil resimleri 6. indexten başlatıyoruz (6, 7, 8, 9) */}
                {[6, 7, 8, 9].map((index) => ( 
                    <div 
                        key={index}
                        className="overflow-hidden rounded-lg"
                        style={{ height: `${mobSmallHeight}px` }} // Genişlik %50 olacak, yüksekliği sabitledik
                    >
                        <img 
                            src={INNOVATION[index]} 
                            alt={`Mobil Küçük Resim ${index - 5}`} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                ))}
            </div>

        </div>

    </section>
  );
};

export default TeamHero;