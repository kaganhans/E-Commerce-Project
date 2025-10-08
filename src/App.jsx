// App.jsx - Sadeleştirilmiş ve Optimize Edilmiş Versiyon
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import DetailPage from "./pages/DetailPage.jsx"; // İçe aktarımı zaten mevcuttu.

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
         <Route path="/detail" element={<DetailPage />} />
    </Routes>
  );
}