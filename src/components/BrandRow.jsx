// src/components/BrandRow.jsx
import Container from "./Container";
import { BRANDS } from "../images";
import { imgErr } from "../utils/imgErr";

/**
 * Props
 * - bgColor?: string
 * - showAboutHeading?: boolean  -> About'ta başlık + alt yazı ve özel mobil düzen
 * - heading?: string
 * - subtitle?: string
 */
export default function BrandRow({
  bgColor,
  showAboutHeading = false,
  heading = "Big Companies Are Here",
  // burada tutuyoruz ama md+ için iki satıra biz böleceğiz
  subtitle = "Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics",
}) {
  const brandLinks = [
    "https://www.hoolisoftware.com/",
    "https://www.lyft.com/",
    "https://www.google.com",
    "https://stripe.com/",
    "https://aws.amazon.com/",
    "https://www.reddit.com/",
  ];

  return (
    <section
      className={`w-full ${showAboutHeading ? "py-16" : "py-8"}`}
      style={{ backgroundColor: bgColor }}
    >
      <Container>
        {/* ===== Başlık + alt yazı (sadece About) ===== */}
        {showAboutHeading && (
          <div className="font-['Montserrat'] text-center mb-10">
            {/* Mobil: 3 satır başlık */}
            <h2 className="text-[#252B42] font-bold tracking-[0.2px] md:hidden text-[40px] leading-[50px]">
              <span className="block">Big</span>
              <span className="block">Companies</span>
              <span className="block">Are Here</span>
            </h2>

            {/* Desktop/Tablet: tek satır başlık */}
            <h2 className="hidden md:block text-[#252B42] font-bold tracking-[0.2px] text-[58px] leading-[80px]">
              {heading}
            </h2>

            {/* Alt yazı */}
            <p className="mt-4 text-[#737373] tracking-[0.2px] md:text-[20px] md:leading-[30px] text-[14px] leading-[20px]">
              {/* Mobil: 3 satır */}
              <span className="md:hidden">
                Problems trying to resolve the conflict
                <br />
                between the two major realms of Classical
                <br />
                physics: Newtonian mechanics
              </span>

              {/* Masaüstü/Tablet: between'den sonra satır kır */}
              <span className="hidden md:inline">
                Problems trying to resolve the conflict between
                <br className="hidden md:block" />
                the two major realms of Classical physics: Newtonian mechanics
              </span>
            </p>
          </div>
        )}

        {/* ===== Masaüstü: 6 kolon tek satır ===== */}
        <div className="hidden lg:grid grid-cols-6 place-items-center gap-x-14 opacity-80">
          {BRANDS?.map((src, i) => (
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
                className="max-h-[72px] w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </a>
          ))}
        </div>

        {/* ===== Mobil/Tablet ===== */}
        {showAboutHeading ? (
          // About mobil: tek sütun, alt alta
          <div className="lg:hidden flex flex-col items-center gap-10 opacity-80">
            {BRANDS?.map((src, i) => (
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
                  className="h-[72px] w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>
        ) : (
          // Diğer sayfalar: 2×3 grid
          <div className="grid grid-cols-2 sm:grid-cols-3 place-items-center gap-y-8 gap-x-10 lg:hidden opacity-80">
            {BRANDS?.map((src, i) => (
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
                  className="max-h-[60px] sm:max-h-[64px] w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
