import Container from "./Container";
import { BRANDS } from "../images";
import { imgErr } from "../utils/imgErr";

// Prop olarak **bgColor** kabul ediyor. Varsayılan değeri null olarak bıraktım,
// bu sayede hiçbir şey geçirilmezse Tailwind'in varsayılan bg-white'ı (veya projenizin ana arka planı) kullanılır.
export default function BrandRow({ bgColor }) {
  // Brand linkleri
  const brandLinks = [
    "https://www.hoolisoftware.com/",
    "https://www.lyft.com/", 
    "https://www.google.com",
    "https://stripe.com/",
    "https://aws.amazon.com/",
    "https://www.reddit.com/"
  ];

  // **bgColor** prop'unu Tailwind'in style prop'u ile uyguluyoruz. 
  // Tailwind'in bilinmeyen özel renk kodlarını (JIT ile bile) dinamik olarak tanıması için bu en güvenli yöntemdir.
  return (
    <section 
      className={`py-8 w-full`} // py-8 (padding top/bottom 32px) korundu
      style={{ backgroundColor: bgColor }} // <<< BURADA UYGULANIYOR
    >
      {/* NOT: Eğer bu bileşen **Container** içine gömülmüşse ve Container 
        zaten max-width ve mx-auto içeriyorsa, bu yapıyı koruyun. 
        Aksi takdirde, max-w-6xl mx-auto gibi Tailwind sınıflarını buraya eklemeniz gerekebilir.
      */}
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 lg:gap-12 opacity-80">
          {BRANDS && BRANDS.map((src, i) => (
            <a 
              key={i}
              href={brandLinks[i] || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={src}
                alt={`brand-${i + 1}`}
                onError={imgErr(`BRAND ${i + 1}`)}
                // h-16 (64px), h-20 (80px), h-24 (96px) Tailwind sınıfları kullanılmış, gayet iyi.
                className="h-16 md:h-20 lg:h-24 w-auto object-contain flex-shrink-0"
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}