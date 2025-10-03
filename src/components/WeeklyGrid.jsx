import Container from "./Container";
import { WEEKLY } from "../images";
import { imgErr } from "../utils/imgErr";

export default function WeeklyGrid() {
  return (
    <section className="py-8">
      <Container>
        {/* MASAÜSTÜ GÖRÜNÜM - Yedek dosya stilinde */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sol büyük - 2 satır kaplayacak */}
          <div className="relative overflow-hidden lg:row-span-2 min-h-[400px]">
            <img
              src={WEEKLY[0]}
              alt="Top Product Left"
              onError={imgErr("WEEKLY LEFT")}
              className="w-full h-full object-cover"
            />
            <div className="absolute left-0 bottom-0 text-white flex flex-col gap-5 bg-[rgb(45,139,192)]/75 p-8 md:p-12 w-full max-w-sm">
              <div>
                <h3 className="text-2xl font-bold leading-8 tracking-[0.1px]">
                  Top Product Of
                </h3>
                <h3 className="text-2xl font-bold leading-8 tracking-[0.1px]">
                  the Week
                </h3>
              </div>
              <a
                className="inline-flex w-fit h-12 px-8 items-center justify-center border border-white text-white text-sm font-semibold tracking-widest hover:bg-white hover:text-[rgb(45,139,192)] transition-colors"
                href="#"
              >
                EXPLORE ITEMS
              </a>
            </div>
          </div>

          {/* Sağ üst */}
          <div className="relative overflow-hidden min-h-[190px]">
            <img
              src={WEEKLY[1]}
              alt="Top Product Right 1"
              onError={imgErr("WEEKLY RIGHT 1")}
              className="w-full h-full object-cover"
            />
            <div className="absolute left-0 bottom-0 text-white flex flex-col gap-4 bg-[rgb(45,139,192)]/75 p-6 w-full max-w-xs">
              <h3 className="text-xl font-normal leading-[30px] tracking-[0.2px] max-w-[260px]">
                Top Product Of the Week
              </h3>
              <a
                className="inline-flex w-fit h-10 px-5 items-center justify-center border border-white text-white text-xs font-semibold tracking-widest hover:bg-white hover:text-[rgb(45,139,192)] transition-colors"
                href="#"
              >
                EXPLORE ITEMS
              </a>
            </div>
          </div>

          {/* Sağ alt */}
          <div className="relative overflow-hidden min-h-[190px]">
            <img
              src={WEEKLY[2]}
              alt="Top Product Right 2"
              onError={imgErr("WEEKLY RIGHT 2")}
              className="w-full h-full object-cover"
            />
            <div className="absolute left-0 bottom-0 text-white flex flex-col gap-4 bg-[rgb(45,139,192)]/75 p-6 w-full max-w-xs">
              <h3 className="text-xl font-normal leading-[30px] tracking-[0.2px] max-w-[260px]">
                Top Product Of the Week
              </h3>
              <a
                className="inline-flex w-fit h-10 px-5 items-center justify-center border border-white text-white text-xs font-semibold tracking-widest hover:bg-white hover:text-[rgb(45,139,192)] transition-colors"
                href="#"
              >
                EXPLORE ITEMS
              </a>
            </div>
          </div>
        </div>

        {/* MOBİL GÖRÜNÜM - Mevcut kodun mobil yapısı */}
        <div className="flex lg:hidden flex-col lg:grid lg:grid-cols-2 gap-6">
          {/* 1. Kart - 345x556 (daha uzun) */}
          <div className="relative overflow-hidden min-h-[600px] lg:min-h-[400px] lg:row-span-2">
            <img
              src={WEEKLY[0]}
              alt="Top Product 1"
              onError={imgErr("WEEKLY 1")}
              className="w-full h-full object-cover object-top scale-125 lg:scale-100 lg:object-center"
            />
            <div className="absolute left-0 bottom-0 text-white flex flex-col gap-5 bg-[rgb(45,139,192)]/75 p-8 w-full">
              <div>
                <h3 className="text-2xl font-bold leading-8 tracking-[0.1px]">
                  Top Product Of
                </h3>
                <h3 className="text-2xl font-bold leading-8 tracking-[0.1px]">
                  the Week
                </h3>
              </div>
              <a
                className="inline-flex w-fit h-12 px-8 items-center justify-center border border-white text-white text-sm font-semibold tracking-widest hover:bg-white hover:text-[rgb(45,139,192)] transition-colors"
                href="#"
              >
                EXPLORE ITEMS
              </a>
            </div>
          </div>

          {/* 2. Kart - 344x398 */}
          <div className="relative overflow-hidden min-h-[398px] lg:min-h-[190px]">
            {/* Mobil resim */}
            <img
              src={WEEKLY[3]}
              alt="Top Product 2 Mobile"
              onError={imgErr("WEEKLY 2 MOBILE")}
              className="w-full h-full object-cover lg:hidden"
            />
            {/* Masaüstü resim */}
            <img
              src={WEEKLY[1]}
              alt="Top Product 2 Desktop"
              onError={imgErr("WEEKLY 2 DESKTOP")}
              className="w-full h-full object-cover hidden lg:block"
            />
            <div className="absolute left-0 bottom-0 text-white flex flex-col gap-5 bg-[rgb(45,139,192)]/75 p-8 w-full">
              <div>
                <h3 className="text-2xl font-bold leading-8 tracking-[0.1px]">
                  Top Product Of
                </h3>
                <h3 className="text-2xl font-bold leading-8 tracking-[0.1px]">
                  the Week
                </h3>
              </div>
              <a
                className="inline-flex w-fit h-12 px-8 items-center justify-center border border-white text-white text-sm font-semibold tracking-widest hover:bg-white hover:text-[rgb(45,139,192)] transition-colors"
                href="#"
              >
                EXPLORE ITEMS
              </a>
            </div>
          </div>

          {/* 3. Kart - 344x398 */}
          <div className="relative overflow-hidden min-h-[398px] lg:min-h-[190px]">
            {/* Mobil resim */}
            <img
              src={WEEKLY[4]}
              alt="Top Product 3 Mobile"
              onError={imgErr("WEEKLY 3 MOBILE")}
              className="w-full h-full object-cover lg:hidden"
            />
            {/* Masaüstü resim */}
            <img
              src={WEEKLY[2]}
              alt="Top Product 3 Desktop"
              onError={imgErr("WEEKLY 3 DESKTOP")}
              className="w-full h-full object-cover hidden lg:block"
            />
            <div className="absolute left-0 bottom-0 text-white flex flex-col gap-5 bg-[rgb(45,139,192)]/75 p-8 w-full">
              <div>
                <h3 className="text-2xl font-bold leading-8 tracking-[0.1px]">
                  Top Product Of
                </h3>
                <h3 className="text-2xl font-bold leading-8 tracking-[0.1px]">
                  the Week
                </h3>
              </div>
              <a
                className="inline-flex w-fit h-12 px-8 items-center justify-center border border-white text-white text-sm font-semibold tracking-widest hover:bg-white hover:text-[rgb(45,139,192)] transition-colors"
                href="#"
              >
                EXPLORE ITEMS
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}