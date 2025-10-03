import Container from "./Container";
import { SOCIAL_ICONS } from "../images";

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-gray-200/70 font-['Montserrat']">
      {/* Şerit 1: Logo + Sosyal Medya */}
      <div className="bg-[#FAFAFA]">
        <Container>
          {/* MASAÜSTÜ GÖRÜNÜM - Yedek dosya stilinde */}
          <div className="hidden md:flex py-8 flex-col lg:flex-row items-center justify-between gap-4">
            <span className="text-2xl font-bold text-[#252B42]">Bandage</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={SOCIAL_ICONS.facebook} alt="Facebook" className="w-6 h-6 object-contain" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={SOCIAL_ICONS.instagram} alt="Instagram" className="w-6 h-6 object-contain" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={SOCIAL_ICONS.twitter} alt="Twitter" className="w-6 h-6 object-contain" />
              </a>
            </div>
          </div>

          {/* MOBİL GÖRÜNÜM - Mevcut kodun mobil yapısı */}
          <div className="flex md:hidden py-8 flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <span className="text-2xl font-bold text-[#252B42]">Bandage</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={SOCIAL_ICONS.facebook} alt="Facebook" className="w-6 h-6 object-contain" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={SOCIAL_ICONS.instagram} alt="Instagram" className="w-6 h-6 object-contain" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={SOCIAL_ICONS.twitter} alt="Twitter" className="w-6 h-6 object-contain" />
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Şerit 2: Link Grid */}
      <div className="bg-white border-t border-gray-200/70">
        <Container>
          {/* MASAÜSTÜ GÖRÜNÜM - Yedek dosya stilinde (grid) */}
          <div className="hidden md:grid py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
            {/* Company Info */}
            <div className="min-w-[160px]">
              <h5 className="text-[#252B42] font-bold mb-4 text-base">Company Info</h5>
              <ul className="flex flex-col gap-3 text-[#737373]">
                {['About Us', 'Carrier', 'We are hiring', 'Blog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[#23A6F0] transition-colors font-medium">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="min-w-[160px]">
              <h5 className="text-[#252B42] font-bold mb-4 text-base">Legal</h5>
              <ul className="flex flex-col gap-3 text-[#737373]">
                {['About Us', 'Carrier', 'We are hiring', 'Blog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[#23A6F0] transition-colors font-medium">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="min-w-[160px]">
              <h5 className="text-[#252B42] font-bold mb-4 text-base">Features</h5>
              <ul className="flex flex-col gap-3 text-[#737373]">
                {['Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[#23A6F0] transition-colors font-medium">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="min-w-[160px]">
              <h5 className="text-[#252B42] font-bold mb-4 text-base">Resources</h5>
              <ul className="flex flex-col gap-3 text-[#737373]">
                {['iOS & Android', 'Watch a Demo', 'Customers', 'API'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[#23A6F0] transition-colors font-medium">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get In Touch */}
            <div className="min-w-[220px]">
              <h5 className="text-[#252B42] font-bold mb-4 text-base">Get In Touch</h5>
              <form className="flex w-full mb-3">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 h-10 px-3 border border-gray-300 rounded-l outline-none focus:border-[#23A6F0] text-sm bg-white"
                  required
                />
                <button
                  type="submit"
                  className="h-10 px-4 bg-[#23A6F0] text-white rounded-r hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-[#737373] font-medium">Lorep impsum dolor amit</p>
            </div>
          </div>

          {/* MOBİL GÖRÜNÜM - Mevcut kodun mobil yapısı (flex) */}
          <div className="flex md:hidden py-10 flex-col md:grid md:grid-cols-2 lg:grid-cols-5 gap-8 text-sm items-start">
            {/* Company Info */}
            <div className="min-w-[160px]">
              <h5 className="text-[#252B42] font-bold mb-4 text-base">Company Info</h5>
              <ul className="flex flex-col gap-3 text-[#737373]">
                {['About Us', 'Carrier', 'We are hiring', 'Blog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[#23A6F0] transition-colors font-medium">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="min-w-[160px]">
              <h5 className="text-[#252B42] font-bold mb-4 text-base">Legal</h5>
              <ul className="flex flex-col gap-3 text-[#737373]">
                {['About Us', 'Carrier', 'We are hiring', 'Blog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[#23A6F0] transition-colors font-medium">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="min-w-[160px]">
              <h5 className="text-[#252B42] font-bold mb-4 text-base">Features</h5>
              <ul className="flex flex-col gap-3 text-[#737373]">
                {['Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[#23A6F0] transition-colors font-medium">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="min-w-[160px]">
              <h5 className="text-[#252B42] font-bold mb-4 text-base">Resources</h5>
              <ul className="flex flex-col gap-3 text-[#737373]">
                {['iOS & Android', 'Watch a Demo', 'Customers', 'API'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[#23A6F0] transition-colors font-medium">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get In Touch */}
            <div className="min-w-[220px]">
              <h5 className="text-[#252B42] font-bold mb-4 text-base">Get In Touch</h5>
              <form className="flex w-full mb-3">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 h-10 px-3 border border-gray-300 rounded-l outline-none focus:border-[#23A6F0] text-sm bg-white"
                  required
                />
                <button
                  type="submit"
                  className="h-10 px-4 bg-[#23A6F0] text-white rounded-r hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-[#737373] font-medium">Lorep impsum dolor amit</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Şerit 3: Alt Bilgi */}
      <div className="bg-[#FAFAFA] border-t border-gray-200/70">
        <Container>
          {/* MASAÜSTÜ GÖRÜNÜM - Yedek dosya stilinde (sola hizalı) */}
          <div className="hidden md:block py-4">
            <p className="text-sm text-[#737373] font-bold text-center lg:text-left">
              Made With Love By Finland All Right Reserved
            </p>
          </div>

          {/* MOBİL GÖRÜNÜM - Mevcut kodun mobil yapısı (ortalanmış) */}
          <div className="md:hidden py-4">
            <p className="text-sm text-[#737373] font-bold text-center">
              Made With Love By<br className="lg:hidden" /> Finland All Right Reserved
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}