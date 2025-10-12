
import Navbar from "../components/Navbar";
import ContactHero from "../components/ContactHero";
import ContactHelp from "../components/ContactHelp";
import ContactLests from "../components/ContactLests";
import SiteFooter from "../components/SiteFooter";

export default function ContactPage() {
  return (
    <div className="font-sans text-[#252B42]">
      
       
      <Navbar pageType="ContactPage" />
      <ContactHero /> 
      <ContactHelp />
      <ContactLests /> 
      <SiteFooter topBgColor="#FFFFFF" />
      </div>
  );
}