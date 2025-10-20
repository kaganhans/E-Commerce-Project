// components/TeamMeet.jsx
import React from "react";
import { Link } from "react-router-dom";

/** Varsayılan ekip (TeamPage için 9'lu liste) */
export const MEET_MEMBERS = [
  { img: "/img/Meet-2.jpeg", username: "Gökhan Özdemir",   profession: "Project Manager" },
  { img: "/img/Meet-1.jpeg", username: "Kağanhan Soyalıç", profession: "Profession" },
  { img: "/img/Meet-3.png",  username: "Username",         profession: "Profession" },
  { img: "/img/Meet-4.png",  username: "Username",         profession: "Profession" },
  { img: "/img/Meet-5.png",  username: "Username",         profession: "Profession" },
  { img: "/img/Meet-6.png",  username: "Username",         profession: "Profession" },
  { img: "/img/Meet-7.png",  username: "Username",         profession: "Profession" },
  { img: "/img/Meet-8.png",  username: "Username",         profession: "Profession" },
  { img: "/img/Meet-9.png",  username: "Username",         profession: "Profession" },
];

const SOCIAL_ICONS = {
  facebook:  "/img/facebook.png",
  instagram: "/img/instagram.png",
  twitter:   "/img/twitter.png",
};

const SocialIcons = () => (
  <div className="mt-2 flex justify-center space-x-2">
    <a href="#" className="h-5 w-5 opacity-80 transition duration-300 hover:opacity-100">
      <img src={SOCIAL_ICONS.facebook} alt="Facebook" className="h-full w-full object-contain" />
    </a>
    <a href="#" className="h-5 w-5 opacity-80 transition duration-300 hover:opacity-100">
      <img src={SOCIAL_ICONS.instagram} alt="Instagram" className="h-full w-full object-contain" />
    </a>
    <a href="#" className="h-5 w-5 opacity-80 transition duration-300 hover:opacity-100">
      <img src={SOCIAL_ICONS.twitter} alt="Twitter" className="h-full w-full object-contain" />
    </a>
  </div>
);

/**
 * Props:
 * - members?: Array            → varsayılan: MEET_MEMBERS
 * - subtitle?: string          → desktop/tablet paragraf metni (tek cümle)
 * - subtitleLines?: string[]   → mobilde her eleman ayrı satır (ör. 4 satır)
 * - subtitleBreakAfter?: string→ DESKTOP için bu kelimeden sonra <br/> koy (örn: "between")
 * - cardHref?: string          → kart/ görsele tıklayınca gidilecek rota (örn: "/team")
 * - forceThreeCols?: boolean   → true ise sm breakpoint'inde 3 sütun dener
 *
 * Not: tailwind.config.js → theme.extend.fontFamily.sans = ['Montserrat','sans-serif']
 */
export default function TeamMeet({
  members = MEET_MEMBERS,
  subtitle,
  subtitleLines,
  subtitleBreakAfter,
  cardHref,                  // ✅ eklendi
  forceThreeCols = false,
}) {
  const subtitleBase =
    "mx-auto mb-16 max-w-[640px] text-center text-[#737373] text-[14px] leading-[20px] tracking-[0.2px] font-normal";

  // Desktop/tablet paragraf metni: subtitle varsa onu; yoksa lines'ı tekleştir
  const desktopSubtitle =
    subtitle ?? (Array.isArray(subtitleLines) ? subtitleLines.join(" ") : "");

  // Masaüstünde 'between' sonrası zorunlu kırılım
  let deskFirst = null, deskSecond = null;
  if (desktopSubtitle && subtitleBreakAfter) {
    const idx = desktopSubtitle.indexOf(subtitleBreakAfter);
    if (idx !== -1) {
      const cut = idx + subtitleBreakAfter.length;
      deskFirst = desktopSubtitle.slice(0, cut).trimEnd();
      deskSecond = desktopSubtitle.slice(cut).trimStart();
    }
  }

  // Kartı opsiyonel olarak Link sarmalayıcı ile render eden yardımcı
  const CardWrapper = ({ to, label, children }) => {
    if (!to) return <>{children}</>;
    return (
      <Link
        to={to}
        aria-label={label}
        className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A7CC7] rounded-xl"
      >
        {children}
      </Link>
    );
  };

  return (
    <section className="flex w-full justify-center bg-white py-16 font-sans">
      <div className="mx-auto w-full px-4 md:px-8 lg:max-w-[1023px]">
        {/* Başlık */}
        <h2 className="mb-4 text-center text-[#252B42] font-bold tracking-[0.2px]
                       text-[32px] leading-[40px] sm:text-[36px] sm:leading-[44px] lg:text-[40px] lg:leading-[50px]">
          Meet Our Team
        </h2>

        {/* Alt başlık: mobilde 4 satır, tablet/desktop’ta 'between' sonrası 2 satır */}
        {(subtitle || (subtitleLines && subtitleLines.length > 0)) && (
          <>
            {/* Mobil: 4 satır (sadece mobilde görünür) */}
            <p className={`${subtitleBase} block sm:hidden`}>
              {Array.isArray(subtitleLines) && subtitleLines.length > 0 ? (
                subtitleLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < subtitleLines.length - 1 && <br />}
                  </span>
                ))
              ) : (
                subtitle
              )}
            </p>

            {/* Tablet/Desktop: 'between' kelimesinden sonra kır */}
            {desktopSubtitle && (
              <p className={`${subtitleBase} hidden sm:block`}>
                {deskFirst ? (
                  <>
                    <span>{deskFirst}</span>
                    <br />
                    <span>{deskSecond}</span>
                  </>
                ) : (
                  desktopSubtitle
                )}
              </p>
            )}
          </>
        )}

        {/* Grid: 1 → 2 → 3; desktop'ta sabit kolon ve gap */}
        <div
          className={[
            "grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-6",
            "lg:[grid-template-columns:318px_329px_329px] lg:gap-y-10 lg:gap-x-[23.5px]",
            forceThreeCols ? "sm:grid-cols-3" : "",
          ].join(" ")}
        >
          {members.map((m, i) => (
            <article
              key={m.img ?? i}
              className={[
                "flex h-[383px] w-full flex-col items-center bg-white text-center",
                cardHref ? "cursor-pointer" : ""
              ].join(" ")}
            >
              {/* Görsel (ve kart) tıklanabilir */}
              <CardWrapper to={cardHref} label={`${m.username} profiline git`}>
                <div className="mb-6 h-[240px] w-full overflow-hidden rounded-xl shadow-md transition-transform duration-200 hover:scale-[1.01]">
                  <img
                    src={m.img}
                    alt={m.username}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardWrapper>

              {/* İsim */}
              <h3 className="mb-1 text-[16px] leading-[24px] tracking-[0.1px] font-bold text-[#252B42]">
                {m.username}
              </h3>

              {/* Meslek */}
              <p className="mb-3 text-[14px] leading-[24px] tracking-[0.2px] font-bold text-[#737373]">
                {m.profession}
              </p>

              <SocialIcons />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
