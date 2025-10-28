import { Link } from "react-router-dom";
import ShopDropdown from "./ShopDropdown";
import UserMenu from "./UserMenu";
import CartButton from "./CartButton";
import { genderOf, showName } from "./navUtils";
import { useMemo, useState } from "react";

export default function DesktopNav({ pageType, categories, user, onLogout, cartItems }) {
  const [openShop, setOpenShop] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const showBecomeMember =
    pageType === "ContactPage" || pageType === "TeamPage" || pageType === "AboutPage";

  const desktopLinks = ["Home", "Shop", "About", "Blog", "Contact", "Pages"];
  const contactPageLinks = ["Home", "Product", "Pricing", "Contact"];
  const currentDesktopLinks = showBecomeMember ? contactPageLinks : desktopLinks;

  const womenCats = useMemo(
    () =>
      (Array.isArray(categories?.items) ? categories.items : categories)
        ?.filter((c) => genderOf(c) === "kadin")
        .sort((a, b) => showName(a).localeCompare(showName(b))) || [],
    [categories]
  );
  const menCats = useMemo(
    () =>
      (Array.isArray(categories?.items) ? categories.items : categories)
        ?.filter((c) => genderOf(c) === "erkek")
        .sort((a, b) => showName(a).localeCompare(showName(b))) || [],
    [categories]
  );

  return (
    <div className="hidden lg:grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-6">
      {/* Logo */}
      <Link
        to="/"
        className="inline-flex items-center min-w-[108px] h-[32px] text-[24px] font-bold text-[#252B42]"
      >
        Bandage
      </Link>

      {/* Menü */}
      <nav className="min-w-0">
        <ul className="flex justify-center items-center gap-8 whitespace-nowrap">
          {currentDesktopLinks.map((label) => {
            const isActive =
              label.toLowerCase() === pageType.toLowerCase().replace("page", "");
            const isShop = label === "Shop";
            return (
              <li
                key={label}
                className="relative flex items-center gap-2"
                onMouseEnter={() => isShop && setOpenShop(true)}
                onMouseLeave={() => isShop && setOpenShop(false)}
              >
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

                {isShop && !showBecomeMember && (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenShop((v) => !v)}
                      className="p-1 -ml-1"
                      aria-label="Toggle shop menu"
                      aria-expanded={openShop}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#252B42" : "#737373"} strokeWidth="2" aria-hidden="true">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <ShopDropdown
                      open={openShop}
                      womenCats={womenCats}
                      menCats={menCats}
                      onClose={() => setOpenShop(false)}
                    />
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sağ blok: kullanıcı + arama + sepet + favori */}
      <div className="flex items-center gap-6 shrink-0">
        <UserMenu user={user} open={openUserMenu} setOpen={setOpenUserMenu} onLogout={onLogout} />

        <Link to="/search" aria-label="Search" className="text-[#23A6F0]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </Link>

        <CartButton items={cartItems} />

        <Link to="/favorites" aria-label="Favorites" className="flex items-center gap-1 text-[#23A6F0]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          <span className="text-[12px] font-bold text-[#23A6F0]">1</span>
        </Link>
      </div>
    </div>
  );
}
