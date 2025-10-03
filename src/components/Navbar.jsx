import Container from "./Container";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const active = "HomePage"; 

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200/70 font-['Montserrat']">
      <Container>
        {/* MASAÜSTÜ GÖRÜNÜM - Yedek dosya stilinde */}
        <div className="hidden lg:grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-6">
          
          {/* Logo — 108x32 kutuya saygı: min-w + sabit yükseklik (kesme yok) */}
          <a
            href="#"
            className="
              inline-flex items-center
              min-w-[108px] h-[32px]
              text-[24px] leading-[32px] tracking-[0.1px] font-bold
              text-[#252B42] whitespace-nowrap
            "
          >
            Bandage
          </a>

          {/* Menü */}
          <nav className="min-w-0">
            <ul className="flex justify-center items-center gap-8 whitespace-nowrap">
              {["Home", "Shop", "About", "Blog", "Contact", "Pages"].map((label) => {
                const isActive = label === active;
                const isShop = label === "Shop";
                return (
                  <li key={label} className="flex items-center gap-2">
                    <a
                      href="#"
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "text-[14px] tracking-[0.2px]",
                        isShop && isActive
                          ? "font-medium leading-[28px] text-[#252B42]" // Shop özel
                          : `font-bold leading-[24px] ${isActive ? "text-[#252B42]" : "text-[#737373] hover:text-[#23A6F0]"}`
                      ].join(" ")}
                    >
                      {label}
                    </a>

                    {/* Shop oku */}
                    {isShop && (
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke={isActive ? "#252B42" : "#737373"} strokeWidth="2" aria-hidden="true"
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
            <a
              href="#"
              className="flex items-center gap-2 text-[#23A6F0] text-[14px] leading-[24px] tracking-[0.2px] font-bold"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
              </svg>
              Login / Register
            </a>

            {/* Arama */}
            <a href="#" aria-label="Search" className="text-[#23A6F0]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </a>

            {/* Sepet + sayı (12px) */}
            <a href="#" aria-label="Cart" className="flex items-center gap-1 text-[#23A6F0]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="text-[12px] leading-[24px] tracking-[0.2px] font-bold text-[#23A6F0]">1</span>
            </a>

            {/* Favori + sayı (12px) */}
            <a href="#" aria-label="Favorites" className="flex items-center gap-1 text-[#23A6F0]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
              <span className="text-[12px] leading-[24px] tracking-[0.2px] font-bold text-[#23A6F0]">1</span>
            </a>
          </div>
        </div>

        {/* MOBİL GÖRÜNÜM - Mevcut kodun mobil yapısı */}
        <div className="lg:hidden h-[72px] flex items-center justify-between">
          {/* Logo - SOL TARAF */}
          <a href="#" className="text-[24px] font-bold text-[#252B42]">
            Bandage
          </a>

          {/* ORTA: Menü - TAM ORTADA */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex items-center gap-8">
              {["Home", "Product", "Pricing", "Contact"].map((label) => {
                const isActive = label === active;
                return (
                  <li key={label}>
                    <a
                      href="#"
                      className={`text-[16px] font-bold tracking-wide ${
                        isActive 
                          ? "text-[#252B42] border-b-2 border-[#252B42] pb-1" 
                          : "text-[#737373] hover:text-[#252B42]"
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* SAĞ TARAF: Desktop - Login/Register */}
          <div className="hidden md:flex items-center">
            <a href="#" className="text-[16px] font-bold tracking-wide text-[#23A6F0]">
              Login / Register
            </a>
          </div>

          {/* MOBILE: Iconlar + Hamburger - SİYAH RENK */}
          <div className="flex md:hidden items-center gap-4">
            {/* User Icon - BÜYÜK */}
            <button className="text-black hover:text-gray-700">
              <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
            </button>

            {/* Search Icon */}
            <button className="text-black hover:text-gray-700">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
            
            {/* Cart Icon */}
            <button className="text-black hover:text-gray-700">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
            </button>
            
            {/* Hamburger Menu */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-black"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - ORTALANMIŞ ve BÜYÜK FONT */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-6">
            <nav className="flex flex-col gap-5 text-center">
              {["Home", "Product", "Pricing", "Contact"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className={`text-[18px] font-bold py-4 ${
                    label === active 
                      ? "text-[#252B42] bg-blue-50" 
                      : "text-[#737373] hover:text-[#252B42] hover:bg-gray-50"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}