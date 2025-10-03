import Container from "./Container";
import { BRANDS } from "../images";
import { imgErr } from "../utils/imgErr";

export default function BrandRow() {
  // Brand linkleri - sen düzenleyebilirsin
  const brandLinks = [
    "https://www.hoolisoftware.com/",
    "https://www.lyft.com/", 
    "https://www.google.com",
    "https://stripe.com/",
    "https://aws.amazon.com/",
    "https://www.reddit.com/"
  ];

  return (
    <section className="py-8">
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
                className="h-16 md:h-20 lg:h-24 w-auto object-contain flex-shrink-0"
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}