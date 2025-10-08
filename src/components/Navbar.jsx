import Container from "./Container";
import { useState } from "react";
import { Link } from "react-router-dom";

// Dinamik 'pageType' prop'unu kabul edecek şekilde güncellendi.
export default function Navbar({ pageType = "Home" }) {
  const [isOpen, setIsOpen] = useState(false);

  // ShopPage ve DetailPage için uzun menü ve ikon bloğunu kullan
  const isFullMobileMenu = pageType === "ShopPage" || pageType === "DetailPage";

  // HomePage ve diğer kısa menü sayfalarının mobil linkleri
  const homeMobileLinks = ["Home", "Product", "Pricing", "Contact"];

  // Masaüstü/Uzun mobil menü linkleri
  const desktopLinks = ["Home", "Shop", "About", "Blog", "Contact", "Pages"];

  // Hangi link listesini kullanacağımızı belirle
  const mobileLinks = isFullMobileMenu ? desktopLinks : homeMobileLinks;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200/70 font-['Montserrat']">
      <Container>
        {/* MASAÜSTÜ GÖRÜNÜM */}
        <div className="hidden lg:grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="inline-flex items-center min-w-[108px] h-[32px] text-[24px] leading-[32px] tracking-[0.1px] font-bold text-[#252B42] whitespace-nowrap"
          >
            Bandage
          </Link>

          {/* Menü */}
          <nav className="min-w-0">
            <ul className="flex justify-center items-center gap-8 whitespace-nowrap">
              {desktopLinks.map((label) => {
                const isActive =
                  label.toLowerCase() === pageType.toLowerCase().replace("page", "");
                const isShop = label === "Shop";
                return (
                  <li key={label} className="flex items-center gap-2">
                    <Link
                      to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "text-[14px] tracking-[0.2px] transition-colors",
                        isShop && isActive
                          ? "font-medium leading-[28px] text-[#252B42]"
                          : `font-bold leading-[24px] ${
                              isActive ? "text-[#252B42]" : "text-[#737373] hover:text-[#23A6F0]"
                            }`,
                      ].join(" ")}
                    >
                      {label}
                    </Link>
                    {/* Shop oku */}
                    {isShop && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isActive ? "#252B42" : "#737373"}
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sağ aksiyonlar */}
          <div className="flex items-center gap-6 shrink-0 whitespace-nowrap">
            {/* Login / Register */}
            <Link
              to="/login"
              className="flex items-center gap-2 text-[#23A6F0] text-[14px] leading-[24px] tracking-[0.2px] font-bold"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
              </svg>
              Login / Register
            </Link>
            {/* Arama */}
            <Link to="/search" aria-label="Search" className="text-[#23A6F0]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Link>
            {/* Sepet + sayı */}
            <Link to="/cart" aria-label="Cart" className="flex items-center gap-1 text-[#23A6F0]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="text-[12px] leading-[24px] tracking-[0.2px] font-bold text-[#23A6F0]">
                1
              </span>
            </Link>
            {/* Favori + sayı */}
            <Link
              to="/favorites"
              aria-label="Favorites"
              className="flex items-center gap-1 text-[#23A6F0]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
              <span className="text-[12px] leading-[24px] tracking-[0.2px] font-bold text-[#23A6F0]">
                1
              </span>
            </Link>
          </div>
        </div>

        {/* MOBİL GÖRÜNÜM - ÜST ÇUBUK */}
        <div className="lg:hidden h-[72px] flex items-center justify-between">
          {/* Logo - Sol */}
          <Link to="/" className="text-[24px] font-bold text-[#252B42]">
            Bandage
          </Link>

          {/* Sağ ikonlar & hamburger */}
          <div className="flex items-center gap-4">
            {/* Home gibi kısa menülerde üstte 3 ikon görünür */}
            {!isFullMobileMenu && (
              <>
                {/* User */}
                <Link to="/login" aria-label="Login" className="text-[#252B42] hover:text-[#23A6F0]">
                  <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                </Link>
                {/* Search */}
                <Link to="/search" aria-label="Search" className="text-[#252B42] hover:text-[#23A6F0]">
                  <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </Link>
                {/* Cart */}
                <Link to="/cart" aria-label="Cart" className="text-[#252B42] hover:text-[#23A6F0]">
                  <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </Link>
              </>
            )}

            {/* Hamburger (her zaman) */}
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#252B42]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Açılır İçerik */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-6 absolute w-full left-0 z-50">
            <nav className="flex flex-col gap-5 text-center px-6">
              {/* Menü Linkleri - Dinamik Liste */}
              {mobileLinks.map((label) => {
                const isActive =
                  label.toLowerCase() === pageType.toLowerCase().replace("page", "");
                const linkClasses = [
                  "text-[30px] font-bold py-2 text-center",
                  isActive ? "text-[#252B42]" : "text-[#737373] hover:text-[#252B42]",
                ].join(" ");
                return (
                  <Link
                    key={label}
                    to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className={linkClasses}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* DetailPage veya ShopPage ise dikey ikon bloğu */}
              {isFullMobileMenu && (
                <div className="flex flex-col items-center gap-6 pt-10 px-6">
                  {/* Login / Register */}
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 text-[#23A6F0] text-[20px] font-bold"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="7" r="4" />
                      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
                    </svg>
                    Login / Register
                  </Link>

                  {/* Aksiyon ikonları */}
                  <div className="flex flex-col items-center gap-6">
                    {/* Arama */}
                    <Link to="/search" aria-label="Search" className="text-[#23A6F0]">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </Link>
                    {/* Sepet + sayı */}
                    <Link to="/cart" aria-label="Cart" className="flex items-center gap-1 text-[#23A6F0]">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <span className="text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#23A6F0]">
                        1
                      </span>
                    </Link>
                    {/* Favori + sayı */}
                    <Link to="/favorites" aria-label="Favorites" className="flex items-center gap-1 text-[#23A6F0]">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                      </svg>
                      <span className="text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#23A6F0]">
                        1
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
