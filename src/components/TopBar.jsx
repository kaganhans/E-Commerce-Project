import Container from "./Container";
import { SOCIAL_ICONS } from "../images";

export default function TopBar() {
  return (
    <div className="bg-[#252B42] text-white hidden md:flex">
      <Container>
        <div className="h-10 flex items-center justify-between font-sans font-bold text-[14px] leading-[24px] tracking-[0.2px]">
          
          {/* Sol: Telefon + E-posta */}
          <div className="flex items-center gap-6 opacity-90 shrink-0 whitespace-nowrap">
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.15 9.81 19.79 19.79 0 0 1 .08 1.18 2 2 0 0 1 2.06 0h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.8a2 2 0 0 1-.45 2.11L6 7a16 16 0 0 0 7 7l.37-.27a2 2 0 0 1 2.11-.45c.9.31 1.84.53 2.8.66A2 2 0 0 1 22 16.92z"/>
              </svg>
              (225) 555-0118
            </span>

            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              michelle.rivera@example.com
            </span>
          </div>

          {/* Orta: mesaj */}
          <p className="flex-1 min-w-0 text-center opacity-90 whitespace-nowrap">
            Follow Us and get a chance to win 80% off
          </p>

          {/* Sağ: Follow Us + sosyal ikonlar */}
          <div className="flex items-center gap-3 opacity-90 shrink-0 whitespace-nowrap">
            <span>Follow Us :</span>

            <div className="flex items-center gap-3">
              {SOCIAL_ICONS && (
                <>
                  <a href="#" aria-label="Instagram" className="inline-flex">
                    <img
                      src={SOCIAL_ICONS.instagramtb}
                      alt="Instagram"
                      className="w-[26px] h-[26px] object-contain"
                    />
                  </a>

                  <a href="#" aria-label="YouTube" className="inline-flex">
                    <img
                      src={SOCIAL_ICONS.youtubetb}
                      alt="YouTube"
                      className="w-[26px] h-[26px] object-contain"
                    />
                  </a>

                  <a href="#" aria-label="Facebook" className="inline-flex">
                    <img
                      src={SOCIAL_ICONS.facebooktb}
                      alt="Facebook"
                      className="w-[26px] h-[26px] object-contain"
                    />
                  </a>

                  <a href="#" aria-label="Twitter" className="inline-flex">
                    <img
                      src={SOCIAL_ICONS.twittertb}
                      alt="Twitter"
                      className="w-[26px] h-[26px] object-contain"
                    />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}