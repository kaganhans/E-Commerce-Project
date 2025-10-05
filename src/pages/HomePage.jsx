import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BrandRow from "../components/BrandRow";
import WeeklyGrid from "../components/WeeklyGrid";
import ProductGrid from "../components/ProductGrid";
import LoveSection from "../components/LoveSection";
import Services from "../components/Services";
import FeaturedPosts from "../components/FeaturedPosts";
import SiteFooter from "../components/SiteFooter";

export default function HomePage() {
  return (
    <div className="font-sans text-[#252B42]">
      <TopBar />
      {/* GÜNCELLENDİ: Navbar'a sayfa türü prop'u eklendi */}
      <Navbar pageType="Home" /> 
      <Hero />
      <BrandRow />
      <WeeklyGrid />
      <ProductGrid />
      <LoveSection />
      <Services />
      <FeaturedPosts />
      <SiteFooter />
    </div>
  );
}