// App.jsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
