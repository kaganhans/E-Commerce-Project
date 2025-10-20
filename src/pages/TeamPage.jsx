
import Navbar from "../components/Navbar";
import TeamNav from "../components/TeamNav";
import ShopNav from "../components/ShopNav";
import TeamHero from "../components/TeamHero";
import TeamMeet from "../components/TeamMeet";
import TeamDay from "../components/TeamDay";
import SiteFooter from "../components/SiteFooter";

export default function TeamPage() {
  return (
    <div className="font-sans text-[#252B42]">     
      <Navbar pageType="TeamPage" /> 
      <TeamNav />
      <ShopNav hideTitle={true} pageType="team" topbgColor="#FFFFFF" />
      <TeamHero />
      <TeamMeet /> 
      //<TeamDay />//
      <SiteFooter topBgColor="#FFFFFF" />
      </div>
  );
}