// Hero.jsx
import Container from "./Container";
import { HERO_SRC } from "../images";
import { Link } from "react-router-dom"; // 👈 eklendi

const imgErr = (label) => (e) =>
  console.warn(`Görsel bulunamadı [${label}]:`, e.currentTarget.src);

export default function Hero() {
  return (
    <section className="w-full font-['Montserrat']">
      {/* MASAÜSTÜ GÖRÜNÜM */}
      <div className="hidden lg:block w-full pt-6 pb-10">
        <div className="w-full overflow-x-auto">
          <div className="relative mx-auto w-[1292px] min-w-[1292px] h-[622px]">
            <div className="absolute inset-y-0 left-[130px] right-[130px] rounded-[10px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#96E9FB] to-[#ABECD6]" />
            </div>

            <div className="absolute inset-0 grid grid-cols-[548px_1fr] pt-[96px] pb-[96px] pl-[206px] pr-0 items-start z-10">
              <div className="flex flex-col gap-4 max-w-[548px]">
                <span className="text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#2A7CC7] whitespace-nowrap mt-[80px]">
                  SUMMER 2020
                </span>

                <h1 className="text-[40px] leading-[50px] tracking-[0.2px] font-bold text-[#252B42]">
                  NEW COLLECTION
                </h1>

                <p className="text-[20px] leading-[30px] text-[#737373] font-medium max-w-[440px]">
                  We know how large objects will act,
                  <br /> but things on a small scale.
                </p>

                {/* MASAÜSTÜ: Link ile SPA navigasyonu */}
                <Link
                  to="/shop"
                  className="
                    inline-flex items-center justify-center text-center
                    w-[221px] h-[62px] px-[26px] rounded-[5px]
                    bg-[#23A6F0] text-white
                    font-bold text-[20px] leading-[24px] tracking-[0.1px]
                    whitespace-nowrap hover:bg-blue-600 transition-colors"
                  aria-label="Shop sayfasına git"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>

            <img
              src={HERO_SRC}
              alt="Hero"
              onError={imgErr("HERO")}
              className="
                absolute bottom-0 right-[45px]
                h-[622.5px] w-auto object-contain
                select-none z-20 pointer-events-none
              "
            />
          </div>
        </div>
      </div>

      {/* MOBİL GÖRÜNÜM */}
      <div className="lg:hidden w-full py-16">
        <Container>
          <div className="bg-gradient-to-r from-[#96E9FB] to-[#ABECD6] rounded-2xl p-6 md:p-8 lg:p-12 mx-4 md:mx-0">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
                <span className="text-[14px] font-bold text-[#2A7CC7] tracking-[0.2px] leading-[24px]">
                  SUMMER 2020
                </span>

                <h1 className="text-[40px] md:text-[58px] font-bold text-[#252B42] leading-[50px] md:leading-[80px] tracking-[0.2px]">
                  NEW COLLECTION
                </h1>

                <p className="text-[20px] text-[#737373] font-medium max-w-md mx-auto lg:mx-0 leading-[30px] tracking-[0.2px]">
                  We know how large objects<br />
                  will act, but things on a<br />
                  small scale.
                </p>

                {/* MOBİL: Link ile SPA navigasyonu */}
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center w-[221px] h-[62px] bg-[#23A6F0] text-white font-bold text-[20px] leading-[24px] tracking-[0.1px] rounded-[5px] mx-auto lg:mx-0 hover:bg-blue-600 transition-colors"
                  aria-label="Shop sayfasına git"
                >
                  SHOP NOW
                </Link>
              </div>

              <div className="flex-1 flex justify-center">
                <img
                  src={HERO_SRC}
                  alt="New Collection"
                  onError={imgErr("HERO")}
                  className="w-full max-w-md lg:max-w-lg h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
