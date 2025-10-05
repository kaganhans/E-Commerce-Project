// App.jsx - Sadeleştirilmiş ve Optimize Edilmiş Versiyon
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
    </Routes>
  );
}