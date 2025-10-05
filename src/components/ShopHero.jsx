import { CLOTHS } from "../images";

export default function ShopHero() {
  return (
    // Ana Konteyner: bg-[#FAFAFA] korundu. font-montserrat kullanıldı.
    // pb-8 (32px) alt boşluk korundu.
    <div className="w-full bg-[#FAFAFA] font-['Montserrat'] pt-0 pb-8"> 
      
      {/* İç konteyner: mx-auto ile ortalandı, responsive padding eklendi. */}
      <div className="max-w-[1088px] mx-auto px-4"> {/* **px-4** ekledim: Küçük ekranlar için kenar boşluğu */}
        
        {/* Grid konteyneri: 
            grid-cols-1: MOBİLDE (0px) tek sütunlu. Bu, attığınız görseldeki dikey listeyi sağlar.
            sm:grid-cols-3: Tablet boyutunda 3 sütun.
            md:grid-cols-5: Masaüstünde 5 sütun.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 items-start"> 
          
          {CLOTHS.map((cloth, index) => (
            // Tek bir grid öğesi
            <div key={index} className="relative w-full"> 
              
              <div className="relative">
                <img
                  src={cloth}
                  alt={`CLOTHS ${index + 1}`}
                  // **w-full** ile ebeveyn grid sütununu doldurur.
                  className="w-full h-full object-cover" 
                />
                
                {/* Yazılar resmin ortasında */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 
                    className="text-white text-base leading-6 tracking-tight font-bold"
                  >
                    CLOTHS
                  </h3>
                  <p 
                    className="text-white text-sm leading-5 tracking-wider font-normal mt-1"
                  >
                    5 items
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
