import Container from "./Container";
import { SERVICES_ICONS } from "../images";
import { imgErr } from "../utils/imgErr";

// Servis verileri
const servicesData = [
  { 
    title: "Easy Wins", 
    icon: SERVICES_ICONS?.easyWins || '/icon-easy.png', 
    desc: "Get your best looking smile now!" 
  },
  { 
    title: "Concrete", 
    icon: SERVICES_ICONS?.concrete || '/icon-concrete.png', 
    desc: "Defalcate is most focused in helping you discover your most beautiful smile" 
  },
  { 
    title: "Hack Growth", 
    icon: SERVICES_ICONS?.hackGrowth || '/icon-growth.png', 
    desc: "Overcame any hurdle or any other problem." 
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-white font-['Montserrat']">
      <Container>
        {/* Üst Başlık Alanı */}
        <div className="flex flex-col items-center text-center gap-3 mb-8 md:mb-12">
          {/* Masaüstü: #23A6F0, Mobil: #737373 */}
          <span className="text-[14px] font-bold text-[#737373] md:text-[#23A6F0] tracking-wider uppercase">
            Featured Products
          </span>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#252B42] leading-tight md:leading-[50px]">
            THE BEST SERVICES
          </h2>
          {/* Masaüstü: tek satır, Mobil: iki satır */}
          <div className="text-[14px] text-[#737373]">
            <div className="md:hidden">
              <div>Problems trying to resolve</div>
              <div>the conflict between</div>
            </div>
            <div className="hidden md:block max-w-[246px] leading-6">
              Problems trying to resolve the conflict between
            </div>
          </div>
        </div>

        {/* MASAÜSTÜ GÖRÜNÜM - Yedek dosya stilinde */}
        <div className="hidden md:flex flex-wrap justify-center gap-8">
          {servicesData.map((s) => (
            <div 
              key={s.title} 
              className="w-[315px] h-[274px] flex flex-col items-center text-center gap-6 p-8 rounded-lg hover:shadow-lg transition-shadow"
            >
              {/* İkon - arkaplan OLMADAN direk icon */}
              <img 
                src={s.icon} 
                alt={s.title} 
                onError={imgErr(`SERVICE ${s.title}`)} 
                className="w-[72px] h-[72px]" 
              />
              
              {/* Başlık */}
              <h4 className="text-[24px] font-bold text-[#252B42] leading-8 tracking-tight">
                {s.title}
              </h4>
              
              {/* Açıklama - tek satırda */}
              <p className="text-[14px] text-[#737373] leading-6 max-w-[225px]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* MOBİL GÖRÜNÜM - Mevcut kodun mobil yapısı */}
        <div className="flex md:hidden flex-col justify-center gap-6">
          {servicesData.map((s) => (
            <div 
              key={s.title} 
              className="w-full flex flex-col items-center text-center gap-4 p-6 rounded-lg border border-gray-100"
            >
              <img 
                src={s.icon} 
                alt={s.title} 
                onError={imgErr(`SERVICE ${s.title}`)} 
                className="w-16 h-16"
              />
              
              <h4 className="text-[20px] font-bold text-[#252B42]">
                {s.title}
              </h4>
              
              {/* Açıklama - satırlara bölünmüş */}
              <div className="text-[14px] text-[#737373] font-bold leading-relaxed">
                {s.desc.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}