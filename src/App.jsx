// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyTokenIfPresent } from "./store/client/thunks";
import { hydrateCartFromStorage } from "./store/cart/actions";

// Sayfalar
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import CartPage from "./pages/CartPage.jsx";

// T20
import CreateOrderPage from "./pages/CreateOrderPage.jsx";

// 🔒 ProtectedRoute: Redux + localStorage kontrolü
function ProtectedRoute({ children }) {
  const location = useLocation();

  // Redux’ta kullanıcı var mı? (senin reducer’ında token alanı yok, user var)
  const user = useSelector((s) => s.client?.user);

  // localStorage fallback (hangi anahtarı kullanıyorsan buraya ekleyebilirsin)
  const lsToken =
    (typeof window !== "undefined" &&
      (localStorage.getItem("token") ||
        localStorage.getItem("auth_token") ||
        localStorage.getItem("jwt"))) ||
    null;

  const isAuthed = !!user || !!lsToken;

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

export default function App() {
  const dispatch = useDispatch();
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current && import.meta.env.DEV) return;
    ranRef.current = true;

    // Uygulama açılışında kullanıcıyı hydrate et
    dispatch(verifyTokenIfPresent());
    // Sepeti localStorage’dan yükle
    dispatch(hydrateCartFromStorage());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/shop" element={<ShopPage />} />
      <Route path="/shop/:gender/:categorySlug/:categoryId" element={<ShopPage />} />
      <Route
        path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
        element={<DetailPage />}
      />

      <Route path="/cart" element={<CartPage />} />

      {/* T20: Create Order (Adres Adımı) */}
      <Route
        path="/create-order"
        element={
          <ProtectedRoute>
            <CreateOrderPage />
          </ProtectedRoute>
        }
      />

      <Route path="/detail" element={<Navigate to="/shop" replace />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* <Route path="*" element={<HomePage />} /> */}
    </Routes>
  );
}
