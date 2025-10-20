// src/pages/AboutPage.jsx
import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import AboutProblems from "../components/AboutProblems";
import AboutMedia from "../components/AboutMedia";
import TeamMeet from "../components/TeamMeet";
import BrandRow from "../components/BrandRow";
import AboutGrow from "../components/AboutGrow.jsx"
import SiteFooter from "../components/SiteFooter";

const ABOUT_MEMBERS = [
  { img: "/img/Meet-6.png", username: "Username", profession: "Profession" },
  { img: "/img/Meet-7.png", username: "Username", profession: "Profession" },
  { img: "/img/Meet-4.png", username: "Username", profession: "Profession" },
];

const SUBTITLE_LINES = [
  "Problems trying to resolve",
  "the conflict between the two major",
  "realms of Classical physics:",
  "Newtonian mechanics",
];

const SUBTITLE_ONE_LINE =
  "Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics";

export default function AboutPage() {
  return (
    <div className="font-['Montserrat'] text-[#252B42]">
      <Navbar pageType="AboutPage" /> 

      <AboutHero />
      <AboutProblems />
      <AboutMedia />

      <TeamMeet
        members={ABOUT_MEMBERS}
        subtitleLines={SUBTITLE_LINES}
        subtitle={SUBTITLE_ONE_LINE}
        subtitleBreakAfter="between"
        cardHref="/team"
      />

      <BrandRow
  bgColor="#F9F9F9"
  showAboutHeading={true}  // başlık + alt yazı
  useAboutSizing={true}    // maketteki “buton” ölçüleri
/>
<AboutGrow />

      <SiteFooter topBgColor="#FFFFFF" />
    </div>
  );
}
