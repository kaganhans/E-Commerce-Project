import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import ShopNav from "../components/ShopNav";
import ShopHero from "../components/ShopHero";
import Showing from "../components/Showing";
import BrandRow from "../components/BrandRow"; 
import SiteFooter from "../components/SiteFooter";

export default function ShopPage() {
  return (
    <div className="font-sans text-[#252B42]">
      <TopBar bgColor="#23856D" />
      <Navbar pageType="ShopPage" />
      <ShopNav/>
      <ShopHero/>
      <Showing/>
      <BrandRow bgColor="#FAFAFA" />
      <SiteFooter topBgColor="#FFFFFF" />
      </div>
  );
}