import { Link } from 'react-router-dom';

export default function ShopNav() {
  return (
  <div
      className="w-full h-[92px] bg-[#FAFAFA] flex items-center justify-center font-['Montserrat']"
    >
      <div
        className="w-full max-w-[1049px] h-11 flex flex-col items-center justify-center md:flex-row md:justify-between px-4 sm:px-0"
      >
        <div className="flex items-center mb-2 md:mb-0">
          <h2
            className="text-[#252B42] text-2xl font-bold leading-8 tracking-tighter text-center md:text-left"
          >
            Shop
          </h2>
        </div>
        <nav
          className="flex items-center justify-center 
                     text-sm font-bold leading-6 tracking-wider
                     space-x-2"
        >
          {/* Home Linki */}
          <Link
            to="/"
            className="text-[#252B42] hover:text-gray-600 transition-colors"
          >
            Home
          </Link>

          {/* Ayırıcı (>) */}
          <span className="text-[#BDBDBD] font-normal mx-1">
            &gt;
          </span>

          {/* Shop Metni (Aktif Sayfa) */}
          <span
            className="text-[#252B42] opacity-70"
          >
            Shop
          </span>
        </nav>
      </div>
    </div>
  );
}
