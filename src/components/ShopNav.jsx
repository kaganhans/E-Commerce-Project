// src/components/ShopNav.jsx
import { Link, useNavigate } from "react-router-dom";

export default function ShopNav({
  hideTitle = false,
  pageType = "",
  topbgColor = "#FAFAFA",
}) {
  const isTeamPage = pageType === "team";
  const isDetailPage = pageType === "detail";
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div
      className={`w-full h-[92px] flex font-['Montserrat'] items-center justify-center`}
      style={{ backgroundColor: topbgColor }}
    >
      <div
        className={`relative w-full max-w-[1049px] h-11 flex ${
          isTeamPage
            ? "items-center justify-center"
            : "flex-col items-center justify-center md:flex-row md:justify-between"
        } px-4 sm:px-0`}
      >
        {/* 🔙 Geri - sadece detail sayfasında görünür, yerleşimi bozmasın diye absolute */}
        {isDetailPage && (
          <button
            type="button"
            onClick={goBack}
            className="
              hidden md:inline-flex
              absolute left-0 top-1/2 -translate-y-1/2
              items-center gap-2
              rounded-md border px-3 py-2
              text-[14px] font-semibold
              hover:bg-gray-50
            "
            aria-label="Geri"
            title="Geri"
          >
            ← Geri
          </button>
        )}

        {/* Sol Başlık (Shop sayfasında görünecek, Team sayfasında gizli) */}
        {!hideTitle && !isTeamPage && (
          <div className="flex items-center mb-2 md:mb-0">
            <h2 className="text-[#252B42] text-2xl font-bold leading-8 tracking-tighter text-center md:text-left">
              Shop
            </h2>
          </div>
        )}

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className={`flex items-center text-sm font-bold leading-6 tracking-wider ${
            isTeamPage ? "justify-center" : "justify-center md:justify-end"
          } w-full`}
        >
          {/* Home */}
          <Link to="/" className="text-[#252B42] hover:text-gray-600 transition-colors">
            Home
          </Link>
          <span className="text-[#BDBDBD] font-normal mx-1">&gt;</span>

          {isTeamPage ? (
            // Home > About > Team
            <>
              <Link to="/about" className="text-[#252B42] hover:text-gray-600 transition-colors">
                About
              </Link>
              <span className="text-[#BDBDBD] font-normal mx-1">&gt;</span>
              <span className="text-[#252B42] opacity-70">Team</span>
            </>
          ) : (
            // Shop (veya Detail akışı)
            <>
              {hideTitle ? (
                <>
                  <Link to="/shop" className="text-[#252B42] hover:text-gray-600 transition-colors">
                    Shop
                  </Link>
                </>
              ) : (
                <span className="text-[#252B42] opacity-70">Shop</span>
              )}

              {hideTitle && isDetailPage && (
                <>
                  <span className="text-[#BDBDBD] font-normal mx-1">&gt;</span>
                  <span className="text-[#252B42] opacity-70">Detail</span>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
