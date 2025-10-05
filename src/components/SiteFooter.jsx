import Container from "./Container";
import { SOCIAL_ICONS } from "../images";

// Link sütunları için veri yapısı
const LinkColumns = [
  { title: 'Company Info', links: ['About Us', 'Carrier', 'We are hiring', 'Blog'] },
  { title: 'Legal', links: ['About Us', 'Carrier', 'We are hiring', 'Blog'] }, // Aynı linkler kullanılmış, isteğiniz üzerine korundu
  { title: 'Features', links: ['Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support'] },
  { title: 'Resources', links: ['iOS & Android', 'Watch a Demo', 'Customers', 'API'] },
];

// Prop olarak 'topBgColor' kabul ediyor ve varsayılan değeri koruyor.
export default function SiteFooter({ topBgColor = "#FAFAFA" }) { 
  
  const brandLinks = [
    // Bu linklerin burada olmadığını varsayarak, eğer varsa kodunuza ekleyin.
  ];

  return (
    // 1. Çizgi: Footer'ın sayfa ile ayrıldığı EN ÜST ÇİZGİ kaldırıldı (border-t kaldırıldı)
    <footer className="mt-12 font-montserrat">
      
      {/* Şerit 1: Logo + Sosyal Medya */}
      {/* Prop'tan gelen rengi style ile uyguluyoruz. */}
      <div style={{ backgroundColor: topBgColor }}> 
        <Container>
          
          {/* MASAÜSTÜ GÖRÜNÜM (md:flex) */}
          {/* Çizgi Buraya Taşındı: Container genişliğinde bir alt çizgi (border-b) eklendi */}
          <div className="hidden md:flex py-8 items-center justify-between gap-4 border-b border-gray-200/70">
            <span className="text-2xl font-bold text-[#252B42]">Bandage</span>
            
            <div className="flex items-center gap-6">
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={SOCIAL_ICONS.facebook} alt="Facebook" className="w-6 h-6 object-contain" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={SOCIAL_ICONS.instagram} alt="Instagram" className="w-6 h-6 object-contain" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={SOCIAL_ICONS.twitter} alt="Twitter" className="w-6 h-6 object-contain" />
              </a>
            </div>
          </div>

          {/* MOBİL GÖRÜNÜM (md:hidden) */}
          {/* Çizgi Buraya Taşındı: Container genişliğinde bir alt çizgi (border-b) eklendi */}
          <div className="flex md:hidden py-8 flex-col items-start justify-between gap-4 border-b border-gray-200/70"> 
            <span className="text-2xl font-bold text-[#252B42]">Bandage</span>
            
            <div className="flex items-center gap-6">
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={SOCIAL_ICONS.facebook} alt="Facebook" className="w-6 h-6 object-contain" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={SOCIAL_ICONS.instagram} alt="Instagram" className="w-6 h-6 object-contain" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={SOCIAL_ICONS.twitter} alt="Twitter" className="w-6 h-6 object-contain" />
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Şerit 2: Link Grid (bg-white korundu) */}
      <div className="bg-white"> 
        <Container>
          {/* MASAÜSTÜ/MOBİL DÜZENLEME: 
             - Varsayılan (Mobil) grid-cols-1 olarak ayarlandı (alt alta tek sıra).
             - sm:grid-cols-2 ile küçük tabletlerde 2 sütun.
             - md:grid-cols-3 ve lg:grid-cols-5 ile masaüstü görünümü geri getirildi.
          */}
          <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm md:gap-8 lg:gap-12">
            
            {/* Link Blokları: Tekrar eden yapılar temizlendi */}
            {LinkColumns.map((col, colIndex) => (
              <div key={colIndex} className="min-w-[160px]">
                <h5 className="text-[#252B42] font-bold mb-4 text-base">{col.title}</h5>
                <ul className="flex flex-col gap-3 text-[#737373]">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-[#23A6F0] transition-colors font-medium">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* Get In Touch (Abonelik Formu) - Özel alan */}
            {/* Mobil görünümde tek sütunda kalması için col-span sınıfları düzenlendi */}
            <div className="min-w-[220px] col-span-1 lg:col-span-1"> 
              <h5 className="text-[#252B42] font-bold mb-4 text-base">Get In Touch</h5>
              <form className="flex w-full mb-3">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 h-10 px-3 border border-gray-300 rounded-l outline-none focus:border-[#23A6F0] text-sm bg-white"
                  required
                />
                <button
                  type="submit"
                  className="h-10 px-4 bg-[#23A6F0] text-white rounded-r hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-[#737373] font-medium">Lorep impsum dolor amit</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Şerit 3: Alt Bilgi */}
      <div className="bg-[#FAFAFA]">
        <Container>
          {/* Yükseklik düzenlemesi: py-6 kullanıldı. */}
          <div className="py-6"> 
            <p className="text-sm text-[#737373] font-bold text-center lg:text-left">
              Made With Love By Finland All Right Reserved
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
