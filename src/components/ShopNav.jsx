import { Link } from "react-router-dom";

export default function ShopNav({ hideTitle = false, pageType = "", topbgColor = "#FAFAFA" }) {
  const isTeamPage = pageType === "team";

  return (
    <div
      className={`w-full h-[92px] flex font-['Montserrat'] ${
        isTeamPage ? "items-center justify-center" : "items-center justify-center"
      }`}
      style={{ backgroundColor: topbgColor }}
    >
      <div
        className={`w-full max-w-[1049px] h-11 flex ${
          isTeamPage
            ? "items-center justify-center" // Team: ortalı
            : "flex-col items-center justify-center md:flex-row md:justify-between"
        } px-4 sm:px-0`}
      >
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
          }`}
        >
          {/* Home */}
          <Link to="/" className="text-[#252B42] hover:text-gray-600 transition-colors">Home</Link>
          <span className="text-[#BDBDBD] font-normal mx-1">&gt;</span>

          {isTeamPage ? (
            // Home > About > Team
            <>
              <Link to="/about" className="text-[#252B42] hover:text-gray-600 transition-colors">About</Link>
              <span className="text-[#BDBDBD] font-normal mx-1">&gt;</span>
              <span className="text-[#252B42] opacity-70">Team</span>
            </>
          ) : (
            // Shop (veya Detail akışı)
            <>
              {hideTitle ? (
                <>
                  <Link to="/shop" className="text-[#252B42] hover:text-gray-600 transition-colors">Shop</Link>
                </>
              ) : (
                <span className="text-[#252B42] opacity-70">Shop</span>
              )}

              {hideTitle && pageType === "detail" && (
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
