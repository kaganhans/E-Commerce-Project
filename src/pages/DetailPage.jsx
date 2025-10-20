import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import ShopNav from "../components/ShopNav";
import DetailHero from "../components/DetailHero";
import Quick from "../components/Quick";
import Bestseller from "../components/Bestseller"
import BrandRow from "../components/BrandRow"; 
import SiteFooter from "../components/SiteFooter";

export default function DetailPage() {
  return (
    <div className="font-sans text-[#252B42]">
      <TopBar bgColor="#23856D" />
      <Navbar pageType="DetailPage" />
      <ShopNav hideTitle={true} pageType="detail" />
      <DetailHero />
      <Quick />
      <Bestseller />
      <BrandRow bgColor="#FAFAFA" />
      <SiteFooter topBgColor="#FFFFFF" />
      </div>
  );
}