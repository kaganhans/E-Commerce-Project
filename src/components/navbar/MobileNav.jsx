import { Link } from "react-router-dom";
import { useState } from "react";

export default function MobileNav({ pageType, user }) {
  const [open, setOpen] = useState(false);

  const isFullMobileMenu = pageType === "ShopPage" || pageType === "DetailPage";
  const desktopLinks = ["Home", "Shop", "About", "Blog", "Contact", "Pages"];
  const homeMobileLinks = ["Home", "Product", "Pricing", "Contact"];
  const menu = isFullMobileMenu ? desktopLinks : homeMobileLinks;

  return (
    <>
      {/* Üst şerit */}
      <div className="lg:hidden h-[72px] flex items-center justify-between">
        <Link to="/" className="text-[24px] font-bold text-[#252B42]">
          Bandage
        </Link>
        <div className="flex items-center gap-4">
          <button onClick={() => setOpen(!open)} className="p-2 text-[#252B42]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Açılır menü */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-6 absolute w-full left-0 z-50">
          <nav className="flex flex-col gap-5 text-center px-6">
            {menu.map((label) => (
              <Link
                key={label}
                to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-[30px] font-bold py-2 text-center text-[#737373] hover:text-[#252B42]"
              >
                {label}
              </Link>
            ))}
            {!user && (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="text-[#23A6F0] text-[20px] font-bold"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
